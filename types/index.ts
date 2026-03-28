export type WineType = 'red' | 'white' | 'rosé' | 'sparkling' | 'dessert' | 'fortified';

export interface Wine {
  id: string;
  name: string;
  winery: string;
  vintage: number | null;
  type: WineType;
  region: string;
  country: string;
  description: string | null;
  image_url: string | null;
  average_rating: number;
  rating_count: number;
  price_usd: number | null;
  purchase_url: string | null;
  created_at: string;
}

export interface CellarItem {
  id: string;
  user_id: string;
  wine_id: string;
  wine?: Wine;
  quantity: number;
  purchase_price: number | null;
  purchase_date: string | null;
  notes: string | null;
  drink_by: string | null;
  location: string | null;
  created_at: string;
}

export interface Memory {
  id: string;
  user_id: string;
  wine_id: string;
  wine?: Wine;
  cellar_item_id: string | null;
  date_enjoyed: string;
  rating: number; // 1-5
  notes: string | null;
  photo_urls: string[];
  created_at: string;
}

export interface Post {
  id: string;
  user_id: string;
  profile?: Profile;
  wine_id: string | null;
  wine?: Wine;
  caption: string;
  media_urls: string[];
  media_type: 'photo' | 'video';
  rating: number | null; // 1-5 grape rating
  like_count: number;
  comment_count: number;
  is_liked?: boolean;
  is_saved?: boolean;
  created_at: string;
}

export interface Profile {
  id: string;
  username: string;
  display_name: string;
  avatar_url: string | null;
  bio: string | null;
  location: string | null;
  follower_count: number;
  following_count: number;
  wines_tried: number;
  cellar_value: number;
  is_following?: boolean;
  created_at: string;
}

export interface WineRating {
  id: string;
  user_id: string;
  wine_id: string;
  rating: number; // 1-5
  review: string | null;
  created_at: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: string;
  earned_at?: string;
}

export interface SavedWine {
  id: string;
  user_id: string;
  wine_id: string;
  wine?: Wine;
  created_at: string;
}
