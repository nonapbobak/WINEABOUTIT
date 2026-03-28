import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '@/lib/theme';
import { GrapeRating } from './GrapeRating';
import type { Wine } from '@/types';

const WINE_TYPE_COLORS: Record<string, string> = {
  red: '#8B1A1A',
  white: '#D4B04A',
  'rosé': '#E8A0A0',
  sparkling: '#7EC8E3',
  dessert: '#C8A84B',
  fortified: '#8B5E3C',
};

const WINE_TYPE_LABELS: Record<string, string> = {
  red: 'Red',
  white: 'White',
  'rosé': 'Rosé',
  sparkling: 'Sparkling',
  dessert: 'Dessert',
  fortified: 'Fortified',
};

interface WineCardProps {
  wine: Wine;
  onPress?: () => void;
  onAddToCellar?: () => void;
  onSave?: () => void;
  compact?: boolean;
}

export function WineCard({ wine, onPress, onAddToCellar, onSave, compact = false }: WineCardProps) {
  const typeColor = WINE_TYPE_COLORS[wine.type] ?? colors.wine;
  const typeLabel = WINE_TYPE_LABELS[wine.type] ?? wine.type;

  if (compact) {
    return (
      <TouchableOpacity style={[styles.compact, shadows.sm]} onPress={onPress} activeOpacity={0.85}>
        <View style={[styles.compactImageContainer, { backgroundColor: typeColor + '20' }]}>
          {wine.image_url ? (
            <Image source={{ uri: wine.image_url }} style={styles.compactImage} />
          ) : (
            <Text style={styles.bottleEmoji}>🍷</Text>
          )}
        </View>
        <View style={styles.compactInfo}>
          <Text style={styles.wineName} numberOfLines={1}>{wine.name}</Text>
          <Text style={styles.winery} numberOfLines={1}>{wine.winery}</Text>
          <View style={styles.compactMeta}>
            <View style={[styles.typeBadge, { backgroundColor: typeColor + '20' }]}>
              <Text style={[styles.typeBadgeText, { color: typeColor }]}>{typeLabel}</Text>
            </View>
            {wine.vintage && (
              <Text style={styles.vintage}>{wine.vintage}</Text>
            )}
          </View>
        </View>
        <GrapeRating rating={wine.average_rating} size="sm" />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={[styles.card, shadows.md]} onPress={onPress} activeOpacity={0.85}>
      <View style={[styles.imageContainer, { backgroundColor: typeColor + '15' }]}>
        {wine.image_url ? (
          <Image source={{ uri: wine.image_url }} style={styles.image} />
        ) : (
          <Text style={styles.bottleEmojiLg}>🍷</Text>
        )}
        <View style={[styles.typeBadge, styles.typeBadgeAbsolute, { backgroundColor: typeColor }]}>
          <Text style={styles.typeBadgeTextWhite}>{typeLabel}</Text>
        </View>
      </View>
      <View style={styles.info}>
        <Text style={styles.wineName} numberOfLines={2}>{wine.name}</Text>
        <Text style={styles.winery}>{wine.winery}</Text>
        <Text style={styles.region}>{wine.region}, {wine.country}</Text>
        <View style={styles.footer}>
          <GrapeRating rating={wine.average_rating} size="sm" />
          <Text style={styles.ratingCount}>({wine.rating_count})</Text>
          {wine.price_usd && (
            <Text style={styles.price}>${wine.price_usd}</Text>
          )}
        </View>
        <View style={styles.actions}>
          {onAddToCellar && (
            <TouchableOpacity style={styles.actionBtn} onPress={onAddToCellar}>
              <Text style={styles.actionBtnText}>+ Cellar</Text>
            </TouchableOpacity>
          )}
          {onSave && (
            <TouchableOpacity style={[styles.actionBtn, styles.actionBtnSecondary]} onPress={onSave}>
              <Text style={styles.actionBtnTextSecondary}>♡ Save</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  imageContainer: {
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bottleEmojiLg: {
    fontSize: 64,
  },
  typeBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: borderRadius.full,
  },
  typeBadgeAbsolute: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
  },
  typeBadgeText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
  },
  typeBadgeTextWhite: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
    color: colors.white,
  },
  info: {
    padding: spacing.md,
  },
  wineName: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  winery: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    fontWeight: typography.weights.medium,
  },
  region: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
    marginTop: 2,
    marginBottom: spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  ratingCount: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
  },
  price: {
    marginLeft: 'auto',
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.wine,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionBtn: {
    flex: 1,
    backgroundColor: colors.wine,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  actionBtnSecondary: {
    backgroundColor: colors.cream,
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionBtnText: {
    color: colors.white,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
  },
  actionBtnTextSecondary: {
    color: colors.wine,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
  },
  // Compact variant
  compact: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    marginBottom: spacing.sm,
    gap: spacing.md,
  },
  compactImageContainer: {
    width: 52,
    height: 52,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  compactImage: {
    width: 52,
    height: 52,
    borderRadius: borderRadius.md,
    resizeMode: 'cover',
  },
  bottleEmoji: {
    fontSize: 24,
  },
  compactInfo: {
    flex: 1,
    gap: 2,
  },
  compactMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: 2,
  },
  vintage: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
  },
});
