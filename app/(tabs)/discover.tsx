import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, spacing, borderRadius, shadows } from '@/lib/theme';
import { GrapeRating } from '@/components/GrapeRating';

const { width } = Dimensions.get('window');
const POST_IMAGE_HEIGHT = width * 0.75;

// Mock social feed data
const MOCK_STORIES = [
  { id: '1', user: 'you', avatar: '👤', isYou: true },
  { id: '2', user: 'sarah_sips', avatar: '👩', hasNew: true },
  { id: '3', user: 'napa_nick', avatar: '👨', hasNew: true },
  { id: '4', user: 'bordeaux_belle', avatar: '👩‍🦰', hasNew: false },
  { id: '5', user: 'sommelier_sam', avatar: '🧑', hasNew: true },
];

const MOCK_POSTS = [
  {
    id: '1',
    user: { username: 'sarah_sips', display_name: 'Sarah Thompson', avatar: '👩' },
    wine: { name: 'Whispering Angel Rosé', winery: 'Château d\'Esclans', vintage: 2023 },
    caption: 'Sunday vibes with my favorite Provence rosé 🌸 Nothing beats a crisp glass on the patio. Who else is rosé all day? 🥂',
    rating: 4,
    likes: 248,
    comments: 32,
    saves: 18,
    isLiked: false,
    isSaved: false,
    timeAgo: '2h',
    emoji: '🌸',
    bgColor: '#F8E8E8',
  },
  {
    id: '2',
    user: { username: 'napa_nick', display_name: 'Nick Castellano', avatar: '👨' },
    wine: { name: 'Opus One 2019', winery: 'Opus One Winery', vintage: 2019 },
    caption: 'Finally cracked open this beauty for date night. Worth every penny. The dark cherry and cedar notes are absolutely stunning 🖤',
    rating: 5,
    likes: 1024,
    comments: 87,
    saves: 203,
    isLiked: true,
    isSaved: false,
    timeAgo: '5h',
    emoji: '🖤',
    bgColor: '#1A0A0F',
  },
  {
    id: '3',
    user: { username: 'sommelier_sam', display_name: 'Sam Rivera', avatar: '🧑' },
    wine: { name: 'Dom Pérignon 2015', winery: 'Moët & Chandon', vintage: 2015 },
    caption: 'Celebrating 10 years in the wine industry the only way I know how 🥂✨ This vintage is everything. P&K toast if you know you know.',
    rating: 5,
    likes: 3210,
    comments: 194,
    saves: 512,
    isLiked: false,
    isSaved: true,
    timeAgo: '12h',
    emoji: '✨',
    bgColor: '#2C2C4A',
  },
];

export default function DiscoverScreen() {
  const [posts, setPosts] = useState(MOCK_POSTS);

  function toggleLike(postId: string) {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  }

  function toggleSave(postId: string) {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, isSaved: !p.isSaved } : p
      )
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerLogo}>🍇 Wine About It</Text>
        <TouchableOpacity style={styles.notifBtn}>
          <Ionicons name="notifications-outline" size={24} color={colors.textPrimary} />
          <View style={styles.notifDot} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* Stories row */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.storiesRow}
              style={styles.storiesScroll}
            >
              {MOCK_STORIES.map((story) => (
                <TouchableOpacity key={story.id} style={styles.story} activeOpacity={0.8}>
                  <View style={[styles.storyRing, story.hasNew && styles.storyRingActive]}>
                    <View style={styles.storyAvatar}>
                      <Text style={styles.storyAvatarEmoji}>{story.avatar}</Text>
                    </View>
                  </View>
                  <Text style={styles.storyName} numberOfLines={1}>
                    {story.isYou ? 'Your Story' : story.user}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.feedDivider} />
          </>
        }
        renderItem={({ item: post }) => (
          <View style={styles.post}>
            {/* Post header */}
            <View style={styles.postHeader}>
              <View style={styles.postAvatar}>
                <Text style={styles.postAvatarEmoji}>{post.user.avatar}</Text>
              </View>
              <View style={styles.postUserInfo}>
                <Text style={styles.postDisplayName}>{post.user.display_name}</Text>
                <Text style={styles.postMeta}>@{post.user.username} · {post.timeAgo}</Text>
              </View>
              <TouchableOpacity style={styles.followBtn}>
                <Text style={styles.followBtnText}>Follow</Text>
              </TouchableOpacity>
            </View>

            {/* Post image */}
            <View style={[styles.postImage, { backgroundColor: post.bgColor, height: POST_IMAGE_HEIGHT }]}>
              <Text style={styles.postImageEmoji}>{post.emoji}</Text>
              {/* Wine info overlay */}
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.7)']}
                style={styles.postOverlay}
              >
                <Text style={styles.postWineName}>{post.wine.name}</Text>
                <Text style={styles.postWinery}>{post.wine.winery} · {post.wine.vintage}</Text>
                <GrapeRating rating={post.rating} size="sm" />
              </LinearGradient>
            </View>

            {/* Actions */}
            <View style={styles.postActions}>
              <TouchableOpacity style={styles.actionBtn} onPress={() => toggleLike(post.id)}>
                <Ionicons
                  name={post.isLiked ? 'heart' : 'heart-outline'}
                  size={26}
                  color={post.isLiked ? colors.error : colors.textPrimary}
                />
                <Text style={styles.actionCount}>{post.likes.toLocaleString()}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionBtn}>
                <Ionicons name="chatbubble-outline" size={24} color={colors.textPrimary} />
                <Text style={styles.actionCount}>{post.comments}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionBtn}>
                <Ionicons name="arrow-redo-outline" size={24} color={colors.textPrimary} />
              </TouchableOpacity>

              {/* Spacer */}
              <View style={{ flex: 1 }} />

              <TouchableOpacity style={styles.actionBtn} onPress={() => toggleSave(post.id)}>
                <Ionicons
                  name={post.isSaved ? 'bookmark' : 'bookmark-outline'}
                  size={24}
                  color={post.isSaved ? colors.gold : colors.textPrimary}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.wantBtn}>
                <Text style={styles.wantBtnText}>+ Pop List</Text>
              </TouchableOpacity>
            </View>

            {/* Caption */}
            <View style={styles.postCaption}>
              <Text style={styles.captionText}>
                <Text style={styles.captionUsername}>{post.user.username} </Text>
                {post.caption}
              </Text>
            </View>

            <View style={styles.postDivider} />
          </View>
        )}
      />

      {/* FAB: New Post */}
      <TouchableOpacity style={[styles.fab, shadows.lg]} activeOpacity={0.85}>
        <LinearGradient
          colors={[colors.wine, colors.wineDark]}
          style={styles.fabGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Ionicons name="camera" size={24} color={colors.white} />
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  headerLogo: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.extrabold,
    color: colors.wine,
    letterSpacing: -0.5,
  },
  notifBtn: {
    position: 'relative',
  },
  notifDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.error,
    borderWidth: 1.5,
    borderColor: colors.white,
  },
  storiesScroll: {
    backgroundColor: colors.white,
  },
  storiesRow: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  story: {
    alignItems: 'center',
    width: 68,
    gap: spacing.xs,
  },
  storyRing: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: colors.border,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyRingActive: {
    borderColor: colors.wine,
    borderWidth: 2.5,
  },
  storyAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.cream,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyAvatarEmoji: {
    fontSize: 28,
  },
  storyName: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  feedDivider: {
    height: 4,
    backgroundColor: colors.cream,
  },
  post: {
    backgroundColor: colors.white,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.cream,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postAvatarEmoji: {
    fontSize: 22,
  },
  postUserInfo: {
    flex: 1,
  },
  postDisplayName: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  postMeta: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
  },
  followBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    borderWidth: 1.5,
    borderColor: colors.wine,
  },
  followBtnText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.wine,
  },
  postImage: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  postImageEmoji: {
    fontSize: 80,
  },
  postOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
    gap: 4,
  },
  postWineName: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.white,
  },
  postWinery: {
    fontSize: typography.sizes.sm,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: spacing.xs,
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.xs,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: spacing.xs,
  },
  actionCount: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.textPrimary,
  },
  wantBtn: {
    backgroundColor: colors.cream,
    borderWidth: 1,
    borderColor: colors.wine + '40',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  wantBtnText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
    color: colors.wine,
  },
  postCaption: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  captionText: {
    fontSize: typography.sizes.sm,
    color: colors.textPrimary,
    lineHeight: 20,
  },
  captionUsername: {
    fontWeight: typography.weights.bold,
  },
  postDivider: {
    height: 6,
    backgroundColor: colors.cream,
  },
  fab: {
    position: 'absolute',
    bottom: spacing.xl,
    right: spacing.xl,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  fabGradient: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
