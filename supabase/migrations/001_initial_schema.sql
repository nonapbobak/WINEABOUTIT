-- =============================================
-- Wine About It - Initial Database Schema
-- =============================================

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- =============================================
-- PROFILES
-- Extends Supabase's built-in auth.users table
-- =============================================
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  username text unique not null,
  display_name text not null,
  avatar_url text,
  bio text,
  location text,
  follower_count integer default 0 not null,
  following_count integer default 0 not null,
  wines_tried integer default 0 not null,
  cellar_value numeric(10,2) default 0 not null,
  is_premium boolean default false not null,
  created_at timestamptz default now() not null
);

-- Make profiles publicly readable (usernames, display names, avatars)
alter table public.profiles enable row level security;
create policy "Profiles are viewable by everyone" on public.profiles for select using (true);
create policy "Users can update their own profile" on public.profiles for update using (auth.uid() = id);

-- Auto-create a profile when a user signs up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, username, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', 'user_' || substr(new.id::text, 1, 8)),
    coalesce(new.raw_user_meta_data->>'display_name', 'Wine Lover')
  );
  return new;
end;
$$;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- =============================================
-- WINES
-- Master wine database (shared across all users)
-- =============================================
create table public.wines (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  winery text not null,
  vintage integer check (vintage >= 1800 and vintage <= extract(year from now()) + 2),
  type text not null check (type in ('red', 'white', 'rosé', 'sparkling', 'dessert', 'fortified')),
  region text not null,
  country text not null,
  description text,
  image_url text,
  average_rating numeric(3,2) default 0 check (average_rating >= 0 and average_rating <= 5),
  rating_count integer default 0,
  price_usd numeric(10,2),
  purchase_url text,
  created_by uuid references public.profiles(id),
  created_at timestamptz default now() not null
);

alter table public.wines enable row level security;
create policy "Wines are viewable by everyone" on public.wines for select using (true);
create policy "Authenticated users can add wines" on public.wines for insert with check (auth.uid() is not null);

-- =============================================
-- CELLAR ITEMS
-- A user's personal wine collection
-- =============================================
create table public.cellar_items (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  wine_id uuid references public.wines(id) on delete cascade not null,
  quantity integer default 1 check (quantity >= 0),
  purchase_price numeric(10,2),
  purchase_date date,
  notes text,
  drink_by date,
  location text, -- e.g., "Shelf 3", "Wine Fridge"
  created_at timestamptz default now() not null,
  unique(user_id, wine_id)
);

alter table public.cellar_items enable row level security;
create policy "Users can view their own cellar" on public.cellar_items for select using (auth.uid() = user_id);
create policy "Users can manage their own cellar" on public.cellar_items for all using (auth.uid() = user_id);

-- =============================================
-- MEMORIES
-- Special drinking moments logged by users
-- =============================================
create table public.memories (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  wine_id uuid references public.wines(id) on delete cascade not null,
  cellar_item_id uuid references public.cellar_items(id) on delete set null,
  date_enjoyed date not null default current_date,
  rating integer check (rating >= 1 and rating <= 5),
  notes text,
  photo_urls text[] default '{}',
  created_at timestamptz default now() not null
);

alter table public.memories enable row level security;
create policy "Users can view their own memories" on public.memories for select using (auth.uid() = user_id);
create policy "Users can manage their own memories" on public.memories for all using (auth.uid() = user_id);

-- =============================================
-- WINE RATINGS
-- Community ratings & reviews
-- =============================================
create table public.wine_ratings (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  wine_id uuid references public.wines(id) on delete cascade not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  review text,
  created_at timestamptz default now() not null,
  unique(user_id, wine_id)
);

alter table public.wine_ratings enable row level security;
create policy "Ratings are viewable by everyone" on public.wine_ratings for select using (true);
create policy "Users can manage their own ratings" on public.wine_ratings for all using (auth.uid() = user_id);

-- Auto-update wine average_rating when a rating is added/changed
create or replace function public.update_wine_rating()
returns trigger language plpgsql security definer as $$
begin
  update public.wines
  set
    average_rating = (select avg(rating) from public.wine_ratings where wine_id = coalesce(new.wine_id, old.wine_id)),
    rating_count   = (select count(*) from public.wine_ratings where wine_id = coalesce(new.wine_id, old.wine_id))
  where id = coalesce(new.wine_id, old.wine_id);
  return new;
end;
$$;
create trigger on_rating_change
  after insert or update or delete on public.wine_ratings
  for each row execute procedure public.update_wine_rating();

-- =============================================
-- POSTS
-- Social feed posts (photos & videos)
-- =============================================
create table public.posts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  wine_id uuid references public.wines(id) on delete set null,
  caption text,
  media_urls text[] default '{}',
  media_type text default 'photo' check (media_type in ('photo', 'video')),
  rating integer check (rating >= 1 and rating <= 5),
  like_count integer default 0,
  comment_count integer default 0,
  created_at timestamptz default now() not null
);

alter table public.posts enable row level security;
create policy "Posts are viewable by everyone" on public.posts for select using (true);
create policy "Users can manage their own posts" on public.posts for all using (auth.uid() = user_id);

-- =============================================
-- POST LIKES
-- =============================================
create table public.post_likes (
  id uuid primary key default uuid_generate_v4(),
  post_id uuid references public.posts(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  created_at timestamptz default now() not null,
  unique(post_id, user_id)
);

alter table public.post_likes enable row level security;
create policy "Likes are viewable by everyone" on public.post_likes for select using (true);
create policy "Users can manage their own likes" on public.post_likes for all using (auth.uid() = user_id);

-- =============================================
-- FOLLOWS
-- User follows
-- =============================================
create table public.follows (
  id uuid primary key default uuid_generate_v4(),
  follower_id uuid references public.profiles(id) on delete cascade not null,
  following_id uuid references public.profiles(id) on delete cascade not null,
  created_at timestamptz default now() not null,
  unique(follower_id, following_id),
  check (follower_id != following_id)
);

alter table public.follows enable row level security;
create policy "Follows are viewable by everyone" on public.follows for select using (true);
create policy "Users can manage their own follows" on public.follows for all using (auth.uid() = follower_id);

-- =============================================
-- SAVED WINES (Pop List / Wishlist)
-- =============================================
create table public.saved_wines (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  wine_id uuid references public.wines(id) on delete cascade not null,
  created_at timestamptz default now() not null,
  unique(user_id, wine_id)
);

alter table public.saved_wines enable row level security;
create policy "Users can view their own saved wines" on public.saved_wines for select using (auth.uid() = user_id);
create policy "Users can manage their own saved wines" on public.saved_wines for all using (auth.uid() = user_id);

-- =============================================
-- BADGES
-- =============================================
create table public.badges (
  id uuid primary key default uuid_generate_v4(),
  name text unique not null,
  description text not null,
  icon text not null,
  requirement text not null
);

create table public.user_badges (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  badge_id uuid references public.badges(id) on delete cascade not null,
  earned_at timestamptz default now() not null,
  unique(user_id, badge_id)
);

alter table public.badges enable row level security;
alter table public.user_badges enable row level security;
create policy "Badges are viewable by everyone" on public.badges for select using (true);
create policy "User badges are viewable by everyone" on public.user_badges for select using (true);

-- Seed badges
insert into public.badges (name, description, icon, requirement) values
  ('First Pour', 'Logged your first wine', '🍷', 'Log 1 wine'),
  ('Cellar Starter', 'Added 10 wines to your cellar', '🏰', 'Add 10 cellar items'),
  ('Globe Trotter', 'Tried wines from 10 countries', '🌍', 'Rate wines from 10 countries'),
  ('Critic', 'Left 25 reviews', '⭐', 'Write 25 reviews'),
  ('Wine Passport', 'Stamped 15 wine regions', '🗺️', 'Try wines from 15 regions'),
  ('Cellar King', 'Collection value over $10,000', '👑', 'Cellar value exceeds $10,000'),
  ('Pop Lister', 'Add 50 wines to your Pop List', '🎯', 'Save 50 wines'),
  ('Influencer', 'Get 1,000 likes on your posts', '📸', 'Accumulate 1,000 post likes');
