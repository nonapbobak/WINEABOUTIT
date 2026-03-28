import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '@/lib/theme';

interface GrapeRatingProps {
  rating: number; // 1-5
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onRate?: (rating: number) => void;
  showLabel?: boolean;
}

const GRAPE = '🍇';

const ratingLabels: Record<number, string> = {
  1: 'Not for me',
  2: 'Decent',
  3: 'Enjoyable',
  4: 'Really Good',
  5: 'Extraordinary',
};

const sizes = {
  sm: { emoji: 14, gap: 1, label: typography.sizes.xs },
  md: { emoji: 20, gap: 2, label: typography.sizes.sm },
  lg: { emoji: 28, gap: 4, label: typography.sizes.base },
};

export function GrapeRating({
  rating,
  size = 'md',
  interactive = false,
  onRate,
  showLabel = false,
}: GrapeRatingProps) {
  const { emoji, gap, label } = sizes[size];

  return (
    <View style={styles.container}>
      <View style={[styles.grapes, { gap }]}>
        {[1, 2, 3, 4, 5].map((grape) => (
          <TouchableOpacity
            key={grape}
            disabled={!interactive}
            onPress={() => onRate?.(grape)}
            activeOpacity={interactive ? 0.7 : 1}
          >
            <Text
              style={[
                styles.grape,
                { fontSize: emoji },
                grape > rating && styles.grapeEmpty,
              ]}
            >
              {GRAPE}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {showLabel && rating > 0 && (
        <Text style={[styles.label, { fontSize: label }]}>
          {ratingLabels[Math.round(rating)]}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  grapes: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  grape: {
    opacity: 1,
  },
  grapeEmpty: {
    opacity: 0.25,
  },
  label: {
    color: colors.textSecondary,
    fontWeight: typography.weights.medium,
  },
});
