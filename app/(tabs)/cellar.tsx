import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  FlatList, Dimensions, Modal, TextInput, ActivityIndicator, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { GrapeRating } from '@/components/GrapeRating';
import { colors, typography, spacing, borderRadius, shadows } from '@/lib/theme';
import type { Wine, WineType } from '@/types';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - spacing.xl * 2 - spacing.md) / 2;

const TYPE_COLORS: Record<string, string> = {
  red: '#8B1A1A', white: '#C8A84B', 'rosé': '#E8A0A0',
  sparkling: '#7EC8E3', dessert: '#C8784B', fortified: '#8B5E3C',
};

const FILTERS: { label: string; value: WineType | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: '🔴 Red', value: 'red' },
  { label: '⚪ White', value: 'white' },
  { label: '🌸 Rosé', value: 'rosé' },
  { label: '✨ Sparkling', value: 'sparkling' },
  { label: '🍯 Dessert', value: 'dessert' },
];

interface CellarItemWithWine {
  id: string;
  wine_id: string;
  quantity: number;
  purchase_price: number | null;
  wine: Wine;
}

// ── Add Wine Modal ────────────────────────────────────────────────────────────
function AddWineModal({
  visible, onClose, userId, onAdded,
}: { visible: boolean; onClose: () => void; userId: string | null; onAdded: () => void }) {
  const [step, setStep] = useState<'search' | 'details'>('search');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Wine[]>([]);
  const [selectedWine, setSelectedWine] = useState<Wine | null>(null);
  const [quantity, setQuantity] = useState('1');
  const [price, setPrice] = useState('');
  const [notes, setNotes] = useState('');
  const [location, setLocation] = useState('');
  const [searching, setSearching] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (query.length < 1) { setResults([]); return; }
    const t = setTimeout(async () => {
      setSearching(true);
      const { data } = await supabase
        .from('wines').select('*')
        .or(`name.ilike.%${query}%,winery.ilike.%${query}%`)
        .limit(10);
      setResults((data as Wine[]) ?? []);
      setSearching(false);
    }, 300);
    return () => clearTimeout(t);
  }, [query]);

  function selectWine(wine: Wine) {
    setSelectedWine(wine);
    setPrice(wine.price_usd ? String(wine.price_usd) : '');
    setStep('details');
  }

  async function handleSave() {
    if (!selectedWine || !userId) return;
    setSaving(true);
    const qty = parseInt(quantity, 10) || 1;

    const { data: existing } = await supabase
      .from('cellar_items').select('id, quantity')
      .eq('user_id', userId).eq('wine_id', selectedWine.id).single();

    const { error } = existing
      ? await supabase.from('cellar_items')
          .update({ quantity: existing.quantity + qty })
          .eq('id', existing.id)
      : await supabase.from('cellar_items').insert({
          user_id: userId, wine_id: selectedWine.id, quantity: qty,
          purchase_price: price ? parseFloat(price) : null,
          notes: notes || null, location: location || null,
        });

    setSaving(false);
    if (error) { Alert.alert('Error', error.message); return; }
    onAdded();
    handleClose();
  }

  function handleClose() {
    setStep('search'); setQuery(''); setResults([]);
    setSelectedWine(null); setQuantity('1'); setPrice('');
    setNotes(''); setLocation('');
    onClose();
  }

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={handleClose} />
      <View style={styles.modalSheet}>
        <View style={styles.modalHandle} />

        {step === 'search' ? (
          <>
            <Text style={styles.modalTitle}>Add Wine to Cellar</Text>
            <View style={styles.searchBar}>
              <Ionicons name="search" size={16} color={colors.textMuted} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search by wine name or winery..."
                placeholderTextColor={colors.textMuted}
                value={query}
                onChangeText={setQuery}
                autoFocus
              />
              {searching && <ActivityIndicator size="small" color={colors.wine} />}
            </View>

            {results.length > 0 ? (
              <ScrollView style={styles.searchResults} keyboardShouldPersistTaps="handled">
                {results.map((wine) => (
                  <TouchableOpacity key={wine.id} style={styles.searchResultItem} onPress={() => selectWine(wine)}>
                    <View style={[styles.resultDot, { backgroundColor: TYPE_COLORS[wine.type] + '40' }]}>
                      <Text style={{ fontSize: 20 }}>🍷</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.resultName}>{wine.name}</Text>
                      <Text style={styles.resultSub}>{wine.winery} · {wine.vintage ?? 'NV'}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            ) : query.length > 0 && !searching ? (
              <View style={styles.noResults}>
                <Text style={styles.noResultsText}>No wines found for "{query}"</Text>
                <Text style={styles.noResultsSub}>Try searching by winery or region</Text>
              </View>
            ) : null}
          </>
        ) : (
          <>
            <TouchableOpacity onPress={() => setStep('search')} style={styles.backBtn}>
              <Ionicons name="chevron-back" size={20} color={colors.wine} />
              <Text style={styles.backBtnText}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{selectedWine?.name}</Text>
            <Text style={styles.modalSubtitle}>{selectedWine?.winery} · {selectedWine?.vintage ?? 'NV'}</Text>

            <View style={styles.modalRow}>
              <View style={[styles.modalField, { flex: 1 }]}>
                <Text style={styles.modalLabel}>Bottles</Text>
                <TextInput
                  style={styles.modalInput} value={quantity}
                  onChangeText={setQuantity} keyboardType="number-pad" placeholder="1"
                  placeholderTextColor={colors.textMuted}
                />
              </View>
              <View style={[styles.modalField, { flex: 2 }]}>
                <Text style={styles.modalLabel}>Price per Bottle</Text>
                <TextInput
                  style={styles.modalInput} value={price}
                  onChangeText={setPrice} keyboardType="decimal-pad" placeholder="$0.00"
                  placeholderTextColor={colors.textMuted}
                />
              </View>
            </View>
            <View style={styles.modalField}>
              <Text style={styles.modalLabel}>Storage Location</Text>
              <TextInput
                style={styles.modalInput} value={location}
                onChangeText={setLocation} placeholder='e.g. "Wine fridge", "Rack 2"'
                placeholderTextColor={colors.textMuted}
              />
            </View>
            <View style={styles.modalField}>
              <Text style={styles.modalLabel}>Notes</Text>
              <TextInput
                style={[styles.modalInput, { height: 72, textAlignVertical: 'top' }]}
                value={notes} onChangeText={setNotes} multiline
                placeholder="Occasion, where you got it, thoughts..."
                placeholderTextColor={colors.textMuted}
              />
            </View>
            <TouchableOpacity style={[styles.modalBtn, saving && { opacity: 0.6 }]} onPress={handleSave} disabled={saving}>
              {saving
                ? <ActivityIndicator color={colors.white} />
                : <Text style={styles.modalBtnText}>Add to My Cellar 🍷</Text>}
            </TouchableOpacity>
          </>
        )}
      </View>
    </Modal>
  );
}

// ── Main Screen ───────────────────────────────────────────────────────────────
export default function CellarScreen() {
  const { userId } = useAuth();
  const [cellar, setCellar] = useState<CellarItemWithWine[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<WineType | 'all'>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchCellar = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('cellar_items')
      .select('*, wine:wines(*)')
      .eq('user_id', userId)
      .gt('quantity', 0)
      .order('created_at', { ascending: false });
    if (!error && data) setCellar(data as CellarItemWithWine[]);
    setLoading(false);
  }, [userId]);

  useEffect(() => { fetchCellar(); }, [fetchCellar]);

  const filtered = activeFilter === 'all'
    ? cellar
    : cellar.filter((item) => item.wine?.type === activeFilter);

  const totalValue = cellar.reduce((sum, item) =>
    sum + (item.purchase_price ?? 0) * item.quantity, 0);
  const totalBottles = cellar.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <LinearGradient colors={[colors.wineDark, colors.wine]} style={styles.header} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerLabel}>My Cellar</Text>
            <Text style={styles.headerTitle}>Personal Collection</Text>
          </View>
          <TouchableOpacity style={styles.addBtn} onPress={() => setShowAddModal(true)}>
            <Ionicons name="add" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{totalBottles}</Text>
            <Text style={styles.statLabel}>Bottles</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>${totalValue.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Est. Value</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>{cellar.length}</Text>
            <Text style={styles.statLabel}>Unique Wines</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll} contentContainerStyle={styles.filterContent}>
        {FILTERS.map((f) => (
          <TouchableOpacity key={f.value} style={[styles.filterChip, activeFilter === f.value && styles.filterChipActive]} onPress={() => setActiveFilter(f.value)}>
            <Text style={[styles.filterChipText, activeFilter === f.value && styles.filterChipTextActive]}>{f.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {loading ? (
        <View style={styles.center}><ActivityIndicator size="large" color={colors.wine} /></View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.gridRow}
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const typeColor = TYPE_COLORS[item.wine?.type ?? 'red'] ?? colors.wine;
            return (
              <TouchableOpacity style={[styles.cellarCard, shadows.md, { width: CARD_WIDTH }]} activeOpacity={0.85}>
                <View style={[styles.bottleArea, { backgroundColor: typeColor + '18' }]}>
                  <Text style={styles.bottleEmoji}>🍷</Text>
                  <View style={[styles.qtyBadge, { backgroundColor: typeColor }]}>
                    <Text style={styles.qtyText}>x{item.quantity}</Text>
                  </View>
                </View>
                <View style={styles.cellarCardInfo}>
                  <Text style={styles.cellarWineName} numberOfLines={2}>{item.wine?.name}</Text>
                  <Text style={styles.cellarWinery} numberOfLines={1}>{item.wine?.winery}</Text>
                  <View style={styles.cellarMeta}>
                    <Text style={styles.cellarVintage}>{item.wine?.vintage ?? 'NV'}</Text>
                    <GrapeRating rating={item.wine?.average_rating ?? 0} size="sm" />
                  </View>
                  {item.purchase_price ? (
                    <Text style={styles.cellarValue}>
                      ${(item.purchase_price * item.quantity).toLocaleString()} total
                    </Text>
                  ) : null}
                </View>
              </TouchableOpacity>
            );
          }}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyEmoji}>🍾</Text>
              <Text style={styles.emptyTitle}>Your cellar is empty</Text>
              <Text style={styles.emptySubtitle}>Tap + to add your first bottle</Text>
            </View>
          }
        />
      )}

      <TouchableOpacity style={[styles.fab, shadows.lg]} activeOpacity={0.85} onPress={() => setShowAddModal(true)}>
        <LinearGradient colors={[colors.gold, colors.goldDark]} style={styles.fabGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <Ionicons name="add" size={28} color={colors.white} />
        </LinearGradient>
      </TouchableOpacity>

      <AddWineModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        userId={userId}
        onAdded={() => { fetchCellar(); Alert.alert('Added! 🍷', 'Wine added to your cellar.'); }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { paddingHorizontal: spacing.xl, paddingTop: spacing.md, paddingBottom: spacing.xl },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.xl },
  headerLabel: { fontSize: typography.sizes.xs, fontWeight: typography.weights.semibold, color: 'rgba(255,255,255,0.6)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 2 },
  headerTitle: { fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, color: colors.white },
  addBtn: { width: 40, height: 40, borderRadius: borderRadius.full, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  statsRow: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: borderRadius.lg, padding: spacing.md },
  stat: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: typography.sizes.lg, fontWeight: typography.weights.bold, color: colors.white, marginBottom: 2 },
  statLabel: { fontSize: typography.sizes.xs, color: 'rgba(255,255,255,0.65)' },
  statDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.2)', marginVertical: spacing.xs },
  filterScroll: { maxHeight: 52 },
  filterContent: { paddingHorizontal: spacing.xl, paddingVertical: spacing.sm, gap: spacing.sm },
  filterChip: { paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderRadius: borderRadius.full, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border },
  filterChipActive: { backgroundColor: colors.wine, borderColor: colors.wine },
  filterChipText: { fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.textSecondary },
  filterChipTextActive: { color: colors.white },
  grid: { padding: spacing.xl, paddingBottom: 100 },
  gridRow: { justifyContent: 'space-between', marginBottom: spacing.md },
  cellarCard: { backgroundColor: colors.surface, borderRadius: borderRadius.lg, overflow: 'hidden' },
  bottleArea: { height: 120, justifyContent: 'center', alignItems: 'center' },
  bottleEmoji: { fontSize: 48 },
  qtyBadge: { position: 'absolute', top: spacing.sm, right: spacing.sm, paddingHorizontal: spacing.xs, paddingVertical: 2, borderRadius: borderRadius.full },
  qtyText: { fontSize: typography.sizes.xs, fontWeight: typography.weights.bold, color: colors.white },
  cellarCardInfo: { padding: spacing.sm },
  cellarWineName: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: 2 },
  cellarWinery: { fontSize: typography.sizes.xs, color: colors.textSecondary, marginBottom: spacing.xs },
  cellarMeta: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 },
  cellarVintage: { fontSize: typography.sizes.xs, color: colors.textMuted },
  cellarValue: { fontSize: typography.sizes.xs, fontWeight: typography.weights.semibold, color: colors.gold, marginTop: 2 },
  empty: { flex: 1, alignItems: 'center', paddingTop: spacing['4xl'] },
  emptyEmoji: { fontSize: 56, marginBottom: spacing.md },
  emptyTitle: { fontSize: typography.sizes.lg, fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: spacing.xs },
  emptySubtitle: { fontSize: typography.sizes.sm, color: colors.textMuted },
  fab: { position: 'absolute', bottom: spacing.xl, right: spacing.xl, borderRadius: borderRadius.full, overflow: 'hidden' },
  fabGradient: { width: 56, height: 56, justifyContent: 'center', alignItems: 'center' },
  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' },
  modalSheet: { backgroundColor: colors.surface, borderTopLeftRadius: borderRadius.xl, borderTopRightRadius: borderRadius.xl, padding: spacing.xl, paddingBottom: 40, maxHeight: '85%' },
  modalHandle: { width: 40, height: 4, backgroundColor: colors.border, borderRadius: 2, alignSelf: 'center', marginBottom: spacing.lg },
  modalTitle: { fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: spacing.xs },
  modalSubtitle: { fontSize: typography.sizes.sm, color: colors.textSecondary, marginBottom: spacing.lg },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.cream, borderWidth: 1, borderColor: colors.border, borderRadius: borderRadius.md, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, gap: spacing.sm, marginBottom: spacing.md },
  searchInput: { flex: 1, fontSize: typography.sizes.base, color: colors.textPrimary, padding: 0 },
  searchResults: { maxHeight: 280 },
  searchResultItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.borderLight, gap: spacing.sm },
  resultDot: { width: 44, height: 44, borderRadius: borderRadius.md, justifyContent: 'center', alignItems: 'center' },
  resultName: { fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.textPrimary },
  resultSub: { fontSize: typography.sizes.xs, color: colors.textMuted },
  noResults: { paddingVertical: spacing.xl, alignItems: 'center' },
  noResultsText: { fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.textSecondary },
  noResultsSub: { fontSize: typography.sizes.xs, color: colors.textMuted, marginTop: 4 },
  backBtn: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  backBtnText: { fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.wine },
  modalRow: { flexDirection: 'row', gap: spacing.md },
  modalField: { marginBottom: spacing.md },
  modalLabel: { fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.textSecondary, marginBottom: spacing.xs },
  modalInput: { backgroundColor: colors.cream, borderWidth: 1, borderColor: colors.border, borderRadius: borderRadius.md, paddingHorizontal: spacing.md, paddingVertical: spacing.md, fontSize: typography.sizes.base, color: colors.textPrimary },
  modalBtn: { backgroundColor: colors.wine, borderRadius: borderRadius.md, paddingVertical: spacing.md, alignItems: 'center', marginTop: spacing.sm },
  modalBtnText: { color: colors.white, fontSize: typography.sizes.md, fontWeight: typography.weights.bold },
});
