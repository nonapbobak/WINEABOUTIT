import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  FlatList, ScrollView, Modal, ActivityIndicator, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { GrapeRating } from '@/components/GrapeRating';
import { colors, typography, spacing, borderRadius, shadows } from '@/lib/theme';
import type { Wine } from '@/types';

const TRENDING = ['Napa Cab', 'Provence Rosé', 'Barolo', 'Champagne', 'Burgundy'];

const TYPE_COLORS: Record<string, string> = {
  red: '#8B1A1A', white: '#C8A84B', 'rosé': '#E8A0A0',
  sparkling: '#5BA3C9', dessert: '#C8784B', fortified: '#8B5E3C',
};
const TYPE_LABELS: Record<string, string> = {
  red: 'Red', white: 'White', 'rosé': 'Rosé',
  sparkling: 'Sparkling', dessert: 'Dessert', fortified: 'Fortified',
};

// ── Add to Cellar modal ──────────────────────────────────────────────────────
function AddToCellarModal({
  wine, visible, onClose, userId,
}: { wine: Wine | null; visible: boolean; onClose: () => void; userId: string | null }) {
  const [quantity, setQuantity] = useState('1');
  const [price, setPrice] = useState('');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  async function handleAdd() {
    if (!wine || !userId) return;
    setSaving(true);
    const qty = parseInt(quantity, 10) || 1;

    const { data: existing } = await supabase
      .from('cellar_items')
      .select('id, quantity')
      .eq('user_id', userId)
      .eq('wine_id', wine.id)
      .single();

    const { error } = existing
      ? await supabase.from('cellar_items')
          .update({ quantity: existing.quantity + qty })
          .eq('id', existing.id)
      : await supabase.from('cellar_items').insert({
          user_id: userId,
          wine_id: wine.id,
          quantity: qty,
          purchase_price: price ? parseFloat(price) : null,
          notes: notes || null,
        });

    setSaving(false);
    if (error) { Alert.alert('Error', error.message); return; }
    Alert.alert('Added! 🍷', `${wine.name} is now in your cellar.`);
    setQuantity('1'); setPrice(''); setNotes('');
    onClose();
  }

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={onClose} />
      <View style={styles.modalSheet}>
        <View style={styles.modalHandle} />
        <Text style={styles.modalTitle}>Add to Cellar</Text>
        {wine && (
          <Text style={styles.modalWineName}>{wine.name} {wine.vintage ? `· ${wine.vintage}` : ''}</Text>
        )}

        <View style={styles.modalRow}>
          <View style={[styles.modalField, { flex: 1 }]}>
            <Text style={styles.modalLabel}>Quantity</Text>
            <TextInput
              style={styles.modalInput}
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="number-pad"
              placeholder="1"
              placeholderTextColor={colors.textMuted}
            />
          </View>
          <View style={[styles.modalField, { flex: 2 }]}>
            <Text style={styles.modalLabel}>Purchase Price (optional)</Text>
            <TextInput
              style={styles.modalInput}
              value={price}
              onChangeText={setPrice}
              keyboardType="decimal-pad"
              placeholder="$0.00"
              placeholderTextColor={colors.textMuted}
            />
          </View>
        </View>

        <View style={styles.modalField}>
          <Text style={styles.modalLabel}>Notes (optional)</Text>
          <TextInput
            style={[styles.modalInput, { height: 72, textAlignVertical: 'top' }]}
            value={notes}
            onChangeText={setNotes}
            placeholder="Where did you get it? Any thoughts?"
            placeholderTextColor={colors.textMuted}
            multiline
          />
        </View>

        <TouchableOpacity
          style={[styles.modalBtn, saving && { opacity: 0.6 }]}
          onPress={handleAdd}
          disabled={saving}
        >
          {saving
            ? <ActivityIndicator color={colors.white} />
            : <Text style={styles.modalBtnText}>Add to My Cellar 🍷</Text>}
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

// ── Rate & Review modal ──────────────────────────────────────────────────────
function RateModal({
  wine, visible, onClose, userId,
}: { wine: Wine | null; visible: boolean; onClose: () => void; userId: string | null }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [saving, setSaving] = useState(false);

  async function handleRate() {
    if (!wine || !userId || rating === 0) {
      Alert.alert('Pick a rating', 'Tap a grape to rate this wine.');
      return;
    }
    setSaving(true);
    const { error } = await supabase.from('wine_ratings').upsert({
      user_id: userId,
      wine_id: wine.id,
      rating,
      review: review || null,
    });
    setSaving(false);
    if (error) { Alert.alert('Error', error.message); return; }
    Alert.alert('Rated! 🍇', 'Your review has been saved.');
    setRating(0); setReview('');
    onClose();
  }

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={onClose} />
      <View style={styles.modalSheet}>
        <View style={styles.modalHandle} />
        <Text style={styles.modalTitle}>Rate & Review</Text>
        {wine && <Text style={styles.modalWineName}>{wine.name}</Text>}

        <View style={styles.ratingCenter}>
          <GrapeRating rating={rating} size="lg" interactive onRate={setRating} showLabel />
        </View>

        <View style={styles.modalField}>
          <Text style={styles.modalLabel}>Your Review (optional)</Text>
          <TextInput
            style={[styles.modalInput, { height: 96, textAlignVertical: 'top' }]}
            value={review}
            onChangeText={setReview}
            placeholder="What did you think? Flavors, occasion, food pairing..."
            placeholderTextColor={colors.textMuted}
            multiline
          />
        </View>

        <TouchableOpacity
          style={[styles.modalBtn, saving && { opacity: 0.6 }]}
          onPress={handleRate}
          disabled={saving}
        >
          {saving
            ? <ActivityIndicator color={colors.white} />
            : <Text style={styles.modalBtnText}>Submit Review</Text>}
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

// ── Main Screen ──────────────────────────────────────────────────────────────
export default function SearchScreen() {
  const { userId } = useAuth();
  const [query, setQuery] = useState('');
  const [wines, setWines] = useState<Wine[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedWine, setSelectedWine] = useState<Wine | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRateModal, setShowRateModal] = useState(false);

  const fetchWines = useCallback(async (q: string) => {
    setLoading(true);
    const query_builder = supabase.from('wines').select('*').order('average_rating', { ascending: false }).limit(30);
    const { data, error } = q.length > 1
      ? await query_builder.or(`name.ilike.%${q}%,winery.ilike.%${q}%,region.ilike.%${q}%,country.ilike.%${q}%`)
      : await query_builder;
    if (!error && data) setWines(data as Wine[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchWines('');
  }, [fetchWines]);

  useEffect(() => {
    const timer = setTimeout(() => fetchWines(query), 300);
    return () => clearTimeout(timer);
  }, [query, fetchWines]);

  function openAddModal(wine: Wine) { setSelectedWine(wine); setShowAddModal(true); }
  function openRateModal(wine: Wine) { setSelectedWine(wine); setShowRateModal(true); }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore Wines</Text>
        <Text style={styles.headerSubtitle}>Rate, review & discover bottles</Text>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color={colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search wines, wineries, regions..."
            placeholderTextColor={colors.textMuted}
            value={query}
            onChangeText={setQuery}
            returnKeyType="search"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={18} color={colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {loading ? (
        <View style={styles.center}><ActivityIndicator size="large" color={colors.wine} /></View>
      ) : (
        <FlatList
          data={wines}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            !query ? (
              <View style={styles.trendingSection}>
                <Text style={styles.sectionTitle}>🔥 Trending</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.trendingRow}>
                  {TRENDING.map((t) => (
                    <TouchableOpacity key={t} style={styles.trendingChip} onPress={() => setQuery(t)}>
                      <Text style={styles.trendingChipText}>{t}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <Text style={styles.sectionTitle}>🌟 Popular Right Now</Text>
              </View>
            ) : null
          }
          renderItem={({ item }) => {
            const typeColor = TYPE_COLORS[item.type] ?? colors.wine;
            return (
              <TouchableOpacity style={[styles.wineItem, shadows.sm]} activeOpacity={0.85}>
                <View style={[styles.wineImage, { backgroundColor: typeColor + '18' }]}>
                  <Text style={styles.wineEmoji}>🍷</Text>
                </View>
                <View style={styles.wineInfo}>
                  <View style={styles.wineNameRow}>
                    <Text style={styles.wineName} numberOfLines={1}>{item.name}</Text>
                    <View style={[styles.typePill, { backgroundColor: typeColor + '20' }]}>
                      <Text style={[styles.typePillText, { color: typeColor }]}>{TYPE_LABELS[item.type]}</Text>
                    </View>
                  </View>
                  <Text style={styles.winery}>{item.winery}</Text>
                  <Text style={styles.region}>{item.region}, {item.country}{item.vintage ? ` · ${item.vintage}` : ''}</Text>
                  <View style={styles.ratingRow}>
                    <GrapeRating rating={item.average_rating} size="sm" />
                    <Text style={styles.ratingCount}>
                      {Number(item.average_rating).toFixed(1)} ({item.rating_count.toLocaleString()})
                    </Text>
                  </View>
                  <View style={styles.actionRow}>
                    {item.price_usd && <Text style={styles.price}>${item.price_usd}</Text>}
                    <TouchableOpacity style={styles.reviewBtn} onPress={() => openRateModal(item)}>
                      <Text style={styles.reviewBtnText}>Rate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buyBtn} onPress={() => openAddModal(item)}>
                      <Text style={styles.buyBtnText}>+ Cellar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyEmoji}>🔍</Text>
              <Text style={styles.emptyTitle}>No wines found</Text>
              <Text style={styles.emptySubtitle}>Try a different search term</Text>
            </View>
          }
        />
      )}

      <AddToCellarModal
        wine={selectedWine}
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        userId={userId}
      />
      <RateModal
        wine={selectedWine}
        visible={showRateModal}
        onClose={() => setShowRateModal(false)}
        userId={userId}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    backgroundColor: colors.wine,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  headerTitle: { fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, color: colors.white, marginBottom: 2 },
  headerSubtitle: { fontSize: typography.sizes.sm, color: 'rgba(255,255,255,0.7)', marginBottom: spacing.lg },
  searchBar: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white,
    borderRadius: borderRadius.full, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, gap: spacing.sm,
  },
  searchInput: { flex: 1, fontSize: typography.sizes.base, color: colors.textPrimary, padding: 0 },
  list: { padding: spacing.xl, paddingBottom: 100 },
  trendingSection: { marginBottom: spacing.md },
  sectionTitle: { fontSize: typography.sizes.md, fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: spacing.md },
  trendingRow: { gap: spacing.sm, marginBottom: spacing.xl },
  trendingChip: {
    backgroundColor: colors.wine + '15', borderWidth: 1, borderColor: colors.wine + '30',
    paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderRadius: borderRadius.full,
  },
  trendingChipText: { fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.wine },
  wineItem: {
    flexDirection: 'row', backgroundColor: colors.surface,
    borderRadius: borderRadius.lg, padding: spacing.md, marginBottom: spacing.md, gap: spacing.md,
  },
  wineImage: { width: 72, height: 100, borderRadius: borderRadius.md, justifyContent: 'center', alignItems: 'center', flexShrink: 0 },
  wineEmoji: { fontSize: 32 },
  wineInfo: { flex: 1, gap: 3 },
  wineNameRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.xs, justifyContent: 'space-between' },
  wineName: { flex: 1, fontSize: typography.sizes.md, fontWeight: typography.weights.bold, color: colors.textPrimary },
  typePill: { paddingHorizontal: spacing.xs, paddingVertical: 2, borderRadius: borderRadius.full, flexShrink: 0 },
  typePillText: { fontSize: typography.sizes.xs, fontWeight: typography.weights.semibold },
  winery: { fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.textSecondary },
  region: { fontSize: typography.sizes.xs, color: colors.textMuted },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginTop: spacing.xs },
  ratingCount: { fontSize: typography.sizes.xs, color: colors.textMuted },
  actionRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.xs },
  price: { fontSize: typography.sizes.md, fontWeight: typography.weights.bold, color: colors.wine, marginRight: 'auto' },
  reviewBtn: {
    backgroundColor: colors.cream, borderWidth: 1, borderColor: colors.wine,
    paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: borderRadius.sm,
  },
  reviewBtnText: { fontSize: typography.sizes.xs, fontWeight: typography.weights.semibold, color: colors.wine },
  buyBtn: {
    backgroundColor: colors.wine, paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs, borderRadius: borderRadius.sm,
  },
  buyBtnText: { fontSize: typography.sizes.xs, fontWeight: typography.weights.semibold, color: colors.white },
  empty: { alignItems: 'center', paddingTop: spacing['4xl'] },
  emptyEmoji: { fontSize: 48, marginBottom: spacing.md },
  emptyTitle: { fontSize: typography.sizes.lg, fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: spacing.xs },
  emptySubtitle: { fontSize: typography.sizes.sm, color: colors.textMuted },
  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' },
  modalSheet: {
    backgroundColor: colors.surface, borderTopLeftRadius: borderRadius.xl, borderTopRightRadius: borderRadius.xl,
    padding: spacing.xl, paddingBottom: 40,
  },
  modalHandle: { width: 40, height: 4, backgroundColor: colors.border, borderRadius: 2, alignSelf: 'center', marginBottom: spacing.lg },
  modalTitle: { fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: spacing.xs },
  modalWineName: { fontSize: typography.sizes.sm, color: colors.textSecondary, marginBottom: spacing.lg },
  modalRow: { flexDirection: 'row', gap: spacing.md },
  modalField: { marginBottom: spacing.md },
  modalLabel: { fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.textSecondary, marginBottom: spacing.xs },
  modalInput: {
    backgroundColor: colors.cream, borderWidth: 1, borderColor: colors.border,
    borderRadius: borderRadius.md, paddingHorizontal: spacing.md, paddingVertical: spacing.md,
    fontSize: typography.sizes.base, color: colors.textPrimary,
  },
  modalBtn: {
    backgroundColor: colors.wine, borderRadius: borderRadius.md,
    paddingVertical: spacing.md, alignItems: 'center', marginTop: spacing.sm,
  },
  modalBtnText: { color: colors.white, fontSize: typography.sizes.md, fontWeight: typography.weights.bold },
  ratingCenter: { alignItems: 'center', paddingVertical: spacing.xl },
});
