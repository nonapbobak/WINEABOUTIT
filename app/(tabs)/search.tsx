import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows } from '@/lib/theme';
import { GrapeRating } from '@/components/GrapeRating';
import type { WineType } from '@/types';

const MOCK_WINES = [
  {
    id: '1',
    name: 'Caymus Special Selection',
    winery: 'Caymus Vineyards',
    vintage: 2021,
    type: 'red' as WineType,
    region: 'Napa Valley',
    country: 'USA',
    average_rating: 4.8,
    rating_count: 1243,
    price_usd: 185,
    description: 'Rich and full-bodied with velvety tannins and notes of dark cherry, cassis, and vanilla.',
  },
  {
    id: '2',
    name: 'Sancerre Blanc',
    winery: 'Henri Bourgeois',
    vintage: 2022,
    type: 'white' as WineType,
    region: 'Loire Valley',
    country: 'France',
    average_rating: 4.4,
    rating_count: 892,
    price_usd: 38,
    description: 'Crisp and mineral-driven with bright citrus and floral notes.',
  },
  {
    id: '3',
    name: 'Barolo DOCG',
    winery: 'Giacomo Conterno',
    vintage: 2018,
    type: 'red' as WineType,
    region: 'Piedmont',
    country: 'Italy',
    average_rating: 4.9,
    rating_count: 567,
    price_usd: 220,
    description: 'The king of Italian wines. Tar, roses, and incredible structure.',
  },
  {
    id: '4',
    name: 'Billecart-Salmon Brut Rosé',
    winery: 'Billecart-Salmon',
    vintage: null,
    type: 'sparkling' as WineType,
    region: 'Champagne',
    country: 'France',
    average_rating: 4.7,
    rating_count: 2108,
    price_usd: 95,
    description: 'Elegant and refined with delicate berry notes and fine persistent bubbles.',
  },
];

const TRENDING = ['Napa Cab', 'Provence Rosé', 'Barolo', 'Champagne', 'Burgundy'];

const TYPE_COLORS: Record<string, string> = {
  red: '#8B1A1A',
  white: '#C8A84B',
  'rosé': '#E8A0A0',
  sparkling: '#5BA3C9',
  dessert: '#C8784B',
  fortified: '#8B5E3C',
};

const TYPE_LABELS: Record<string, string> = {
  red: 'Red', white: 'White', 'rosé': 'Rosé', sparkling: 'Sparkling', dessert: 'Dessert', fortified: 'Fortified',
};

export default function SearchScreen() {
  const [query, setQuery] = useState('');

  const filtered = query.length > 1
    ? MOCK_WINES.filter(
        (w) =>
          w.name.toLowerCase().includes(query.toLowerCase()) ||
          w.winery.toLowerCase().includes(query.toLowerCase()) ||
          w.region.toLowerCase().includes(query.toLowerCase())
      )
    : MOCK_WINES;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore Wines</Text>
        <Text style={styles.headerSubtitle}>Rate, review & discover bottles</Text>

        {/* Search bar */}
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

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          !query ? (
            <View style={styles.trendingSection}>
              <Text style={styles.sectionTitle}>🔥 Trending</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.trendingRow}
              >
                {TRENDING.map((t) => (
                  <TouchableOpacity
                    key={t}
                    style={styles.trendingChip}
                    onPress={() => setQuery(t)}
                  >
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
              {/* Wine image placeholder */}
              <View style={[styles.wineImage, { backgroundColor: typeColor + '18' }]}>
                <Text style={styles.wineEmoji}>🍷</Text>
              </View>

              {/* Info */}
              <View style={styles.wineInfo}>
                <View style={styles.wineNameRow}>
                  <Text style={styles.wineName} numberOfLines={1}>{item.name}</Text>
                  <View style={[styles.typePill, { backgroundColor: typeColor + '20' }]}>
                    <Text style={[styles.typePillText, { color: typeColor }]}>
                      {TYPE_LABELS[item.type]}
                    </Text>
                  </View>
                </View>
                <Text style={styles.winery}>{item.winery}</Text>
                <Text style={styles.region}>{item.region}, {item.country}{item.vintage ? ` · ${item.vintage}` : ''}</Text>

                <View style={styles.ratingRow}>
                  <GrapeRating rating={item.average_rating} size="sm" />
                  <Text style={styles.ratingCount}>
                    {item.average_rating.toFixed(1)} ({item.rating_count.toLocaleString()} reviews)
                  </Text>
                </View>

                <View style={styles.actionRow}>
                  {item.price_usd && (
                    <Text style={styles.price}>${item.price_usd}</Text>
                  )}
                  <TouchableOpacity style={styles.reviewBtn}>
                    <Text style={styles.reviewBtnText}>Rate & Review</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buyBtn}>
                    <Text style={styles.buyBtnText}>Buy</Text>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  header: {
    backgroundColor: colors.wine,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  headerTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.white,
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: typography.sizes.sm,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: spacing.lg,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: typography.sizes.base,
    color: colors.textPrimary,
    padding: 0,
  },
  list: {
    padding: spacing.xl,
    paddingBottom: 100,
  },
  trendingSection: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  trendingRow: {
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  trendingChip: {
    backgroundColor: colors.wine + '15',
    borderWidth: 1,
    borderColor: colors.wine + '30',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  trendingChipText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.wine,
  },
  wineItem: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  wineImage: {
    width: 72,
    height: 100,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  wineEmoji: {
    fontSize: 32,
  },
  wineInfo: {
    flex: 1,
    gap: 3,
  },
  wineNameRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.xs,
    justifyContent: 'space-between',
  },
  wineName: {
    flex: 1,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  typePill: {
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
    flexShrink: 0,
  },
  typePillText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
  },
  winery: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.textSecondary,
  },
  region: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  ratingCount: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  price: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.wine,
    marginRight: 'auto',
  },
  reviewBtn: {
    backgroundColor: colors.cream,
    borderWidth: 1,
    borderColor: colors.wine,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  reviewBtnText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
    color: colors.wine,
  },
  buyBtn: {
    backgroundColor: colors.wine,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  buyBtnText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
    color: colors.white,
  },
  empty: {
    alignItems: 'center',
    paddingTop: spacing['4xl'],
  },
  emptyEmoji: {
    fontSize: 48,
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
});
