import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, FlatList,
  ScrollView, Dimensions, Modal, TextInput, ActivityIndicator, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { GrapeRating } from '@/components/GrapeRating';
import { colors, typography, spacing, borderRadius, shadows } from '@/lib/theme';
import type { Wine } from '@/types';

const { width } = Dimensions.get('window');
const POST_IMAGE_HEIGHT = width * 0.75;

const BG_COLORS = ['#1A0A0F', '#2C2C4A', '#1A2A1A', '#2A1A0A', '#1A1A2A', '#2A0A0A'];

interface LivePost {
  id: string;
  user_id: string;
  caption: string | null;
  rating: number | null;
  like_count: number;
  comment_count: number;
  created_at: string;
  profile: { id: string; username: string; display_name: string; avatar_url: string | null } | null;
  wine: { id: string; name: string; winery: string; vintage: number | null; type: string } | null;
  is_liked: boolean;
  is_saved: boolean;
}

function timeAgo(date: string) {
  const secs = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (secs < 60) return `${secs}s`;
  if (secs < 3600) return `${Math.floor(secs / 60)}m`;
  if (secs < 86400) return `${Math.floor(secs / 3600)}h`;
  return `${Math.floor(secs / 86400)}d`;
}

// ── Create Post Modal ─────────────────────────────────────────────────────────
function CreatePostModal({
  visible, onClose, userId, onPosted,
}: { visible: boolean; onClose: () => void; userId: string | null; onPosted: () => void }) {
  const [caption, setCaption] = useState('');
  const [rating, setRating] = useState(0);
  const [wineQuery, setWineQuery] = useState('');
  const [wineResults, setWineResults] = useState<Wine[]>([]);
  const [selectedWine, setSelectedWine] = useState<Wine | null>(null);
  const [searching, setSearching] = useState(false);
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    if (wineQuery.length < 1) { setWineResults([]); return; }
    const t = setTimeout(async () => {
      setSearching(true);
      const { data } = await supabase.from('wines').select('*')
        .or(`name.ilike.%${wineQuery}%,winery.ilike.%${wineQuery}%`).limit(8);
      setWineResults((data as Wine[]) ?? []);
      setSearching(false);
    }, 300);
    return () => clearTimeout(t);
  }, [wineQuery]);

  async function handlePost() {
    if (!userId) return;
    if (!caption.trim() && !selectedWine) {
      Alert.alert('Add something', 'Write a caption or tag a wine to post.');
      return;
    }
    setPosting(true);
    const { error } = await supabase.from('posts').insert({
      user_id: userId,
      wine_id: selectedWine?.id ?? null,
      caption: caption.trim() || null,
      rating: rating > 0 ? rating : null,
      media_urls: [],
      media_type: 'photo',
    });
    setPosting(false);
    if (error) { Alert.alert('Error', error.message); return; }
    onPosted();
    handleClose();
  }

  function handleClose() {
    setCaption(''); setRating(0); setWineQuery('');
    setWineResults([]); setSelectedWine(null);
    onClose();
  }

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={handleClose} />
      <View style={styles.modalSheet}>
        <View style={styles.modalHandle} />
        <Text style={styles.modalTitle}>Share a Pour 🍷</Text>

        {/* Wine tag */}
        {selectedWine ? (
          <View style={styles.selectedWineRow}>
            <Text style={styles.selectedWineEmoji}>🍷</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.selectedWineName}>{selectedWine.name}</Text>
              <Text style={styles.selectedWineWinery}>{selectedWine.winery}</Text>
            </View>
            <TouchableOpacity onPress={() => { setSelectedWine(null); setWineQuery(''); }}>
              <Ionicons name="close-circle" size={20} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.searchBar}>
            <Ionicons name="wine-outline" size={16} color={colors.textMuted} />
            <TextInput
              style={styles.searchInput}
              placeholder="Tag a wine (optional)..."
              placeholderTextColor={colors.textMuted}
              value={wineQuery}
              onChangeText={setWineQuery}
            />
            {searching && <ActivityIndicator size="small" color={colors.wine} />}
          </View>
        )}

        {wineResults.length > 0 && !selectedWine && (
          <ScrollView style={styles.wineResults} keyboardShouldPersistTaps="handled">
            {wineResults.map((w) => (
              <TouchableOpacity key={w.id} style={styles.wineResultItem}
                onPress={() => { setSelectedWine(w); setWineQuery(''); setWineResults([]); }}>
                <Text style={styles.wineResultName}>{w.name}</Text>
                <Text style={styles.wineResultSub}>{w.winery} · {w.vintage ?? 'NV'}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {/* Caption */}
        <TextInput
          style={styles.captionInput}
          placeholder="What are you drinking? Where? With who? ✨"
          placeholderTextColor={colors.textMuted}
          value={caption}
          onChangeText={setCaption}
          multiline
          maxLength={280}
        />

        {/* Rating */}
        <Text style={styles.ratingLabel}>Rate this wine</Text>
        <View style={{ alignItems: 'center', marginBottom: spacing.lg }}>
          <GrapeRating rating={rating} size="lg" interactive onRate={setRating} showLabel />
        </View>

        <TouchableOpacity style={[styles.postBtn, posting && { opacity: 0.6 }]} onPress={handlePost} disabled={posting}>
          {posting
            ? <ActivityIndicator color={colors.white} />
            : <Text style={styles.postBtnText}>Post to Feed</Text>}
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

// ── Main Screen ───────────────────────────────────────────────────────────────
export default function DiscoverScreen() {
  const { userId } = useAuth();
  const [posts, setPosts] = useState<LivePost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const { data: postsData, error } = await supabase
      .from('posts')
      .select('*, profile:profiles(id,username,display_name,avatar_url), wine:wines(id,name,winery,vintage,type)')
      .order('created_at', { ascending: false })
      .limit(30);

    if (error || !postsData) { setLoading(false); return; }

    // Check which posts the current user has liked
    let likedIds = new Set<string>();
    let savedIds = new Set<string>();
    if (userId) {
      const [{ data: likes }, { data: saved }] = await Promise.all([
        supabase.from('post_likes').select('post_id').eq('user_id', userId),
        supabase.from('saved_wines').select('wine_id'),
      ]);
      likedIds = new Set(likes?.map((l: { post_id: string }) => l.post_id) ?? []);
      savedIds = new Set(saved?.map((s: { wine_id: string }) => s.wine_id) ?? []);
    }

    setPosts(postsData.map((p: LivePost) => ({
      ...p,
      is_liked: likedIds.has(p.id),
      is_saved: p.wine ? savedIds.has(p.wine.id) : false,
    })));
    setLoading(false);
  }, [userId]);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  async function toggleLike(post: LivePost) {
    if (!userId) return;
    const nowLiked = !post.is_liked;
    // Optimistic update
    setPosts((prev) => prev.map((p) => p.id === post.id
      ? { ...p, is_liked: nowLiked, like_count: p.like_count + (nowLiked ? 1 : -1) }
      : p));
    if (nowLiked) {
      await supabase.from('post_likes').insert({ post_id: post.id, user_id: userId });
      await supabase.from('posts').update({ like_count: post.like_count + 1 }).eq('id', post.id);
    } else {
      await supabase.from('post_likes').delete().eq('post_id', post.id).eq('user_id', userId);
      await supabase.from('posts').update({ like_count: post.like_count - 1 }).eq('id', post.id);
    }
  }

  async function toggleSave(post: LivePost) {
    if (!userId || !post.wine) return;
    const nowSaved = !post.is_saved;
    setPosts((prev) => prev.map((p) => p.id === post.id ? { ...p, is_saved: nowSaved } : p));
    if (nowSaved) {
      await supabase.from('saved_wines').insert({ user_id: userId, wine_id: post.wine!.id });
    } else {
      await supabase.from('saved_wines').delete().eq('user_id', userId).eq('wine_id', post.wine!.id);
    }
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerLogo}>🍇 Wine About It</Text>
        <TouchableOpacity style={styles.notifBtn}>
          <Ionicons name="notifications-outline" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.center}><ActivityIndicator size="large" color={colors.wine} /></View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyFeed}>
              <Text style={styles.emptyEmoji}>🍾</Text>
              <Text style={styles.emptyTitle}>No posts yet</Text>
              <Text style={styles.emptySub}>Be the first to share a pour!</Text>
              <TouchableOpacity style={styles.emptyBtn} onPress={() => setShowCreateModal(true)}>
                <Text style={styles.emptyBtnText}>Share a Wine</Text>
              </TouchableOpacity>
            </View>
          }
          renderItem={({ item: post, index }) => {
            const bgColor = BG_COLORS[index % BG_COLORS.length];
            return (
              <View style={styles.post}>
                {/* Header */}
                <View style={styles.postHeader}>
                  <View style={styles.postAvatar}>
                    <Text style={styles.postAvatarEmoji}>👤</Text>
                  </View>
                  <View style={styles.postUserInfo}>
                    <Text style={styles.postDisplayName}>
                      {post.profile?.display_name ?? 'Wine Lover'}
                    </Text>
                    <Text style={styles.postMeta}>
                      @{post.profile?.username ?? 'unknown'} · {timeAgo(post.created_at)}
                    </Text>
                  </View>
                  {post.user_id !== userId && (
                    <TouchableOpacity style={styles.followBtn}>
                      <Text style={styles.followBtnText}>Follow</Text>
                    </TouchableOpacity>
                  )}
                </View>

                {/* Image area */}
                <View style={[styles.postImage, { backgroundColor: bgColor, height: POST_IMAGE_HEIGHT }]}>
                  <Text style={styles.postImageEmoji}>🍷</Text>
                  {post.wine && (
                    <LinearGradient colors={['transparent', 'rgba(0,0,0,0.75)']} style={styles.postOverlay}>
                      <Text style={styles.postWineName}>{post.wine.name}</Text>
                      <Text style={styles.postWinery}>{post.wine.winery}{post.wine.vintage ? ` · ${post.wine.vintage}` : ''}</Text>
                      {post.rating ? <GrapeRating rating={post.rating} size="sm" /> : null}
                    </LinearGradient>
                  )}
                </View>

                {/* Actions */}
                <View style={styles.postActions}>
                  <TouchableOpacity style={styles.actionBtn} onPress={() => toggleLike(post)}>
                    <Ionicons name={post.is_liked ? 'heart' : 'heart-outline'} size={26} color={post.is_liked ? colors.error : colors.textPrimary} />
                    <Text style={styles.actionCount}>{post.like_count.toLocaleString()}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionBtn}>
                    <Ionicons name="chatbubble-outline" size={24} color={colors.textPrimary} />
                    <Text style={styles.actionCount}>{post.comment_count}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionBtn}>
                    <Ionicons name="arrow-redo-outline" size={24} color={colors.textPrimary} />
                  </TouchableOpacity>
                  <View style={{ flex: 1 }} />
                  <TouchableOpacity style={styles.actionBtn} onPress={() => toggleSave(post)}>
                    <Ionicons name={post.is_saved ? 'bookmark' : 'bookmark-outline'} size={24} color={post.is_saved ? colors.gold : colors.textPrimary} />
                  </TouchableOpacity>
                  {post.wine && (
                    <TouchableOpacity style={styles.wantBtn}>
                      <Text style={styles.wantBtnText}>+ Pop List</Text>
                    </TouchableOpacity>
                  )}
                </View>

                {post.caption ? (
                  <View style={styles.postCaption}>
                    <Text style={styles.captionText}>
                      <Text style={styles.captionUsername}>{post.profile?.username ?? 'user'} </Text>
                      {post.caption}
                    </Text>
                  </View>
                ) : null}

                <View style={styles.postDivider} />
              </View>
            );
          }}
        />
      )}

      <TouchableOpacity style={[styles.fab, shadows.lg]} activeOpacity={0.85} onPress={() => setShowCreateModal(true)}>
        <LinearGradient colors={[colors.wine, colors.wineDark]} style={styles.fabGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <Ionicons name="camera" size={24} color={colors.white} />
        </LinearGradient>
      </TouchableOpacity>

      <CreatePostModal
        visible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        userId={userId}
        onPosted={() => { fetchPosts(); Alert.alert('Posted! 🍷', 'Your pour is now live.'); }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: spacing.xl, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.borderLight },
  headerLogo: { fontSize: typography.sizes.lg, fontWeight: typography.weights.extrabold, color: colors.wine, letterSpacing: -0.5 },
  notifBtn: { position: 'relative' },
  post: { backgroundColor: colors.white },
  postHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.lg, paddingVertical: spacing.md, gap: spacing.sm },
  postAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.cream, justifyContent: 'center', alignItems: 'center' },
  postAvatarEmoji: { fontSize: 22 },
  postUserInfo: { flex: 1 },
  postDisplayName: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: colors.textPrimary },
  postMeta: { fontSize: typography.sizes.xs, color: colors.textMuted },
  followBtn: { paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderRadius: borderRadius.full, borderWidth: 1.5, borderColor: colors.wine },
  followBtnText: { fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.wine },
  postImage: { width: '100%', justifyContent: 'center', alignItems: 'center', position: 'relative' },
  postImageEmoji: { fontSize: 80 },
  postOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: spacing.lg, paddingTop: spacing.xl, paddingBottom: spacing.md, gap: 4 },
  postWineName: { fontSize: typography.sizes.md, fontWeight: typography.weights.bold, color: colors.white },
  postWinery: { fontSize: typography.sizes.sm, color: 'rgba(255,255,255,0.8)', marginBottom: spacing.xs },
  postActions: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.md, paddingVertical: spacing.sm, gap: spacing.xs },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, padding: spacing.xs },
  actionCount: { fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.textPrimary },
  wantBtn: { backgroundColor: colors.cream, borderWidth: 1, borderColor: colors.wine + '40', paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: borderRadius.full },
  wantBtnText: { fontSize: typography.sizes.xs, fontWeight: typography.weights.semibold, color: colors.wine },
  postCaption: { paddingHorizontal: spacing.lg, paddingBottom: spacing.md },
  captionText: { fontSize: typography.sizes.sm, color: colors.textPrimary, lineHeight: 20 },
  captionUsername: { fontWeight: typography.weights.bold },
  postDivider: { height: 6, backgroundColor: colors.cream },
  fab: { position: 'absolute', bottom: spacing.xl, right: spacing.xl, borderRadius: borderRadius.full, overflow: 'hidden' },
  fabGradient: { width: 56, height: 56, justifyContent: 'center', alignItems: 'center' },
  emptyFeed: { alignItems: 'center', paddingTop: 80, paddingHorizontal: spacing.xl },
  emptyEmoji: { fontSize: 64, marginBottom: spacing.lg },
  emptyTitle: { fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: spacing.sm },
  emptySub: { fontSize: typography.sizes.base, color: colors.textMuted, marginBottom: spacing.xl },
  emptyBtn: { backgroundColor: colors.wine, paddingHorizontal: spacing.xl, paddingVertical: spacing.md, borderRadius: borderRadius.full },
  emptyBtnText: { color: colors.white, fontWeight: typography.weights.bold, fontSize: typography.sizes.md },
  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' },
  modalSheet: { backgroundColor: colors.surface, borderTopLeftRadius: borderRadius.xl, borderTopRightRadius: borderRadius.xl, padding: spacing.xl, paddingBottom: 40 },
  modalHandle: { width: 40, height: 4, backgroundColor: colors.border, borderRadius: 2, alignSelf: 'center', marginBottom: spacing.lg },
  modalTitle: { fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: spacing.lg },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.cream, borderWidth: 1, borderColor: colors.border, borderRadius: borderRadius.md, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, gap: spacing.sm, marginBottom: spacing.sm },
  searchInput: { flex: 1, fontSize: typography.sizes.base, color: colors.textPrimary, padding: 0 },
  wineResults: { maxHeight: 160, marginBottom: spacing.md },
  wineResultItem: { paddingVertical: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.borderLight },
  wineResultName: { fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.textPrimary },
  wineResultSub: { fontSize: typography.sizes.xs, color: colors.textMuted },
  selectedWineRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.cream, borderRadius: borderRadius.md, padding: spacing.md, marginBottom: spacing.md, gap: spacing.sm },
  selectedWineEmoji: { fontSize: 24 },
  selectedWineName: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: colors.textPrimary },
  selectedWineWinery: { fontSize: typography.sizes.xs, color: colors.textMuted },
  captionInput: { backgroundColor: colors.cream, borderWidth: 1, borderColor: colors.border, borderRadius: borderRadius.md, paddingHorizontal: spacing.md, paddingVertical: spacing.md, fontSize: typography.sizes.base, color: colors.textPrimary, height: 96, textAlignVertical: 'top', marginBottom: spacing.md },
  ratingLabel: { fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.textSecondary, marginBottom: spacing.md },
  postBtn: { backgroundColor: colors.wine, borderRadius: borderRadius.md, paddingVertical: spacing.md, alignItems: 'center' },
  postBtnText: { color: colors.white, fontSize: typography.sizes.md, fontWeight: typography.weights.bold },
});
