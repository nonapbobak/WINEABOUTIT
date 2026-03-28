import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows } from '@/lib/theme';
import { GrapeRating } from '@/components/GrapeRating';
import type { WineType } from '@/types';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - spacing.xl * 2 - spacing.md) / 2;

// Mock data to show what the UI will look like
const MOCK_CELLAR = [
  {
    id: '1',
    wine: { name: 'Opus One', winery: 'Opus One Winery', vintage: 2019, type: 'red' as WineType, region: 'Napa Valley', country: 'USA' },
    quantity: 3,
    purchase_price: 385,
    rating: 5,
  },
  {
    id: '2',
    wine: { name: 'Cloudy Bay Sauvignon Blanc', winery: 'Cloudy Bay', vintage: 2023, type: 'white' as WineType, region: 'Marlborough', country: 'New Zealand' },
    quantity: 6,
    purchase_price: 28,
    rating: 4,
  },
  {
    id: '3',
    wine: { name: 'Whispering Angel', winery: 'Château d\'Esclans', vintage: 2023, type: 'rosé' as WineType, region: 'Provence', country: 'France' },
    quantity: 4,
    purchase_price: 32,
    rating: 4,
  },
  {
    id: '4',
    wine: { name: 'Dom Pérignon', winery: 'Moët & Chandon', vintage: 2015, type: 'sparkling' as WineType, region: 'Champagne', country: 'France' },
    quantity: 2,
    purchase_price: 240,
    rating: 5,
  },
];

const FILTERS: { label: string; value: WineType | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: '🔴 Red', value: 'red' },
  { label: '⚪ White', value: 'white' },
  { label: '🌸 Rosé', value: 'rosé' },
  { label: '✨ Sparkling', value: 'sparkling' },
  { label: '🍯 Dessert', value: 'dessert' },
];

const TYPE_COLORS: Record<string, string> = {
  red: '#8B1A1A',
  white: '#C8A84B',
  'rosé': '#E8A0A0',
  sparkling: '#7EC8E3',
  dessert: '#C8784B',
  fortified: '#8B5E3C',
};

const totalValue = MOCK_CELLAR.reduce(
  (sum, item) => sum + (item.purchase_price ?? 0) * item.quantity,
  0
);
const totalBottles = MOCK_CELLAR.reduce((sum, item) => sum + item.quantity, 0);

export default function CellarScreen() {
  const [activeFilter, setActiveFilter] = useState<WineType | 'all'>('all');

  const filtered = activeFilter === 'all'
    ? MOCK_CELLAR
    : MOCK_CELLAR.filter((item) => item.wine.type === activeFilter);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Header */}
      <LinearGradient
        colors={[colors.wineDark, colors.wine]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerLabel}>My Cellar</Text>
            <Text style={styles.headerTitle}>Personal Collection</Text>
          </View>
          <TouchableOpacity style={styles.addBtn}>
            <Ionicons name="add" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>

        {/* Stats */}
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
            <Text style={styles.statValue}>{MOCK_CELLAR.length}</Text>
            <Text style={styles.statLabel}>Unique Wines</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Filter tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
        contentContainerStyle={styles.filterContent}
      >
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f.value}
            style={[styles.filterChip, activeFilter === f.value && styles.filterChipActive]}
            onPress={() => setActiveFilter(f.value)}
          >
            <Text style={[styles.filterChipText, activeFilter === f.value && styles.filterChipTextActive]}>
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Wine Grid */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const typeColor = TYPE_COLORS[item.wine.type] ?? colors.wine;
          return (
            <TouchableOpacity
              style={[styles.cellarCard, shadows.md, { width: CARD_WIDTH }]}
              activeOpacity={0.85}
            >
              {/* Bottle placeholder */}
              <View style={[styles.bottleArea, { backgroundColor: typeColor + '18' }]}>
                <Text style={styles.bottleEmoji}>🍷</Text>
                <View style={[styles.qtyBadge, { backgroundColor: typeColor }]}>
                  <Text style={styles.qtyText}>x{item.quantity}</Text>
                </View>
              </View>
              <View style={styles.cellarCardInfo}>
                <Text style={styles.cellarWineName} numberOfLines={2}>
                  {item.wine.name}
                </Text>
                <Text style={styles.cellarWinery} numberOfLines={1}>
                  {item.wine.winery}
                </Text>
                <View style={styles.cellarMeta}>
                  <Text style={styles.cellarVintage}>{item.wine.vintage}</Text>
                  <GrapeRating rating={item.rating} size="sm" />
                </View>
                {item.purchase_price && (
                  <Text style={styles.cellarValue}>
                    ${(item.purchase_price * item.quantity).toLocaleString()} total
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🍾</Text>
            <Text style={styles.emptyTitle}>Your cellar is empty</Text>
            <Text style={styles.emptySubtitle}>Add your first bottle to get started</Text>
          </View>
        }
      />

      {/* FAB */}
      <TouchableOpacity style={[styles.fab, shadows.lg]} activeOpacity={0.85}>
        <LinearGradient
          colors={[colors.gold, colors.goldDark]}
          style={styles.fabGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Ionicons name="add" size={28} color={colors.white} />
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  header: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xl,
  },
  headerLabel: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.white,
  },
  addBtn: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.white,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: typography.sizes.xs,
    color: 'rgba(255,255,255,0.65)',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginVertical: spacing.xs,
  },
  filterScroll: {
    maxHeight: 52,
  },
  filterContent: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChipActive: {
    backgroundColor: colors.wine,
    borderColor: colors.wine,
  },
  filterChipText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.textSecondary,
  },
  filterChipTextActive: {
    color: colors.white,
  },
  grid: {
    padding: spacing.xl,
    paddingBottom: 100,
  },
  gridRow: {
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  cellarCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  bottleArea: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottleEmoji: {
    fontSize: 48,
  },
  qtyBadge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  qtyText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    color: colors.white,
  },
  cellarCardInfo: {
    padding: spacing.sm,
  },
  cellarWineName: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  cellarWinery: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  cellarMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  cellarVintage: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
  },
  cellarValue: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
    color: colors.gold,
    marginTop: 2,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    paddingTop: spacing['4xl'],
  },
  emptyEmoji: {
    fontSize: 56,
    marginBottom: spacing.md,
  },
  emptyTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  emptySubtitle: {
    fontSize: typography.sizes.sm,
    color: colors.textMuted,
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
