import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@/lib/supabase';
import { colors, typography, spacing, borderRadius, shadows } from '@/lib/theme';

// Mock profile data
const MOCK_PROFILE = {
  display_name: 'Alex Vino',
  username: 'alex_vino',
  bio: 'Passionate about Burgundy, Champagne & discovering hidden gems 🍷',
  location: 'New York, NY',
  followers: 1204,
  following: 342,
  wines_tried: 187,
  cellar_value: 8240,
};

const BADGES = [
  { id: '1', icon: '🍷', name: 'First Pour', description: 'Logged your first wine', earned: true },
  { id: '2', icon: '🏰', name: 'Cellar Starter', description: 'Added 10 wines to your cellar', earned: true },
  { id: '3', icon: '🌍', name: 'Globe Trotter', description: 'Tried wines from 10 countries', earned: true },
  { id: '4', icon: '⭐', name: 'Critic', description: 'Left 25 reviews', earned: true },
  { id: '5', icon: '🗺️', name: 'Wine Passport', description: 'Stamped 15 wine regions', earned: false },
  { id: '6', icon: '👑', name: 'Cellar King', description: 'Collection value over $10,000', earned: false },
  { id: '7', icon: '🎯', name: 'Pop Lister', description: 'Add 50 wines to your Pop List', earned: false },
  { id: '8', icon: '📸', name: 'Influencer', description: 'Get 1,000 likes on your posts', earned: false },
];

const RECENT_ACTIVITY = [
  { id: '1', icon: '🍷', text: 'Rated Opus One 2019', sub: '5 grapes · 2 days ago' },
  { id: '2', icon: '📸', text: 'Posted a photo with Whispering Angel', sub: '248 likes · 3 days ago' },
  { id: '3', icon: '🏰', text: 'Added Dom Pérignon 2015 to cellar', sub: '5 days ago' },
  { id: '4', icon: '🎯', text: 'Added Barolo to Pop List', sub: '1 week ago' },
];

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<'activity' | 'badges'>('activity');

  async function handleSignOut() {
    Alert.alert('Sign out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: () => supabase.auth.signOut(),
      },
    ]);
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Profile header */}
        <LinearGradient
          colors={[colors.wineDark, colors.wine]}
          style={styles.profileHeader}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <TouchableOpacity style={styles.settingsBtn} onPress={handleSignOut}>
            <Ionicons name="settings-outline" size={22} color={colors.white} />
          </TouchableOpacity>

          {/* Avatar */}
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarEmoji}>👤</Text>
            </View>
            <TouchableOpacity style={styles.editAvatarBtn}>
              <Ionicons name="camera" size={14} color={colors.white} />
            </TouchableOpacity>
          </View>

          <Text style={styles.displayName}>{MOCK_PROFILE.display_name}</Text>
          <Text style={styles.username}>@{MOCK_PROFILE.username}</Text>
          <Text style={styles.bio}>{MOCK_PROFILE.bio}</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={14} color="rgba(255,255,255,0.7)" />
            <Text style={styles.location}>{MOCK_PROFILE.location}</Text>
          </View>

          {/* Follow stats */}
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{MOCK_PROFILE.followers.toLocaleString()}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>{MOCK_PROFILE.following}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>{MOCK_PROFILE.wines_tried}</Text>
              <Text style={styles.statLabel}>Wines Tried</Text>
            </View>
          </View>

          {/* Edit profile button */}
          <TouchableOpacity style={styles.editProfileBtn}>
            <Text style={styles.editProfileBtnText}>Edit Profile</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Cellar value card */}
        <View style={[styles.valueCard, shadows.md]}>
          <View style={styles.valueCardLeft}>
            <Text style={styles.valueCardLabel}>Cellar Est. Value</Text>
            <Text style={styles.valueCardAmount}>${MOCK_PROFILE.cellar_value.toLocaleString()}</Text>
          </View>
          <View style={styles.valueCardRight}>
            <Text style={styles.valueCardTrend}>↑ 12.4%</Text>
            <Text style={styles.valueCardTrendLabel}>this year</Text>
          </View>
          <View style={styles.valueGrapeIcon}>
            <Text style={{ fontSize: 32 }}>🍇</Text>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'activity' && styles.tabActive]}
            onPress={() => setActiveTab('activity')}
          >
            <Text style={[styles.tabText, activeTab === 'activity' && styles.tabTextActive]}>
              Activity
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'badges' && styles.tabActive]}
            onPress={() => setActiveTab('badges')}
          >
            <Text style={[styles.tabText, activeTab === 'badges' && styles.tabTextActive]}>
              Badges
            </Text>
          </TouchableOpacity>
        </View>

        {/* Activity tab */}
        {activeTab === 'activity' && (
          <View style={styles.section}>
            {RECENT_ACTIVITY.map((item) => (
              <View key={item.id} style={styles.activityItem}>
                <Text style={styles.activityIcon}>{item.icon}</Text>
                <View style={styles.activityInfo}>
                  <Text style={styles.activityText}>{item.text}</Text>
                  <Text style={styles.activitySub}>{item.sub}</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
              </View>
            ))}
          </View>
        )}

        {/* Badges tab */}
        {activeTab === 'badges' && (
          <View style={styles.section}>
            <View style={styles.badgesGrid}>
              {BADGES.map((badge) => (
                <View
                  key={badge.id}
                  style={[
                    styles.badgeCard,
                    shadows.sm,
                    !badge.earned && styles.badgeCardLocked,
                  ]}
                >
                  <Text style={[styles.badgeIcon, !badge.earned && styles.badgeIconLocked]}>
                    {badge.earned ? badge.icon : '🔒'}
                  </Text>
                  <Text style={[styles.badgeName, !badge.earned && styles.badgeTextLocked]}>
                    {badge.name}
                  </Text>
                  <Text style={[styles.badgeDesc, !badge.earned && styles.badgeTextLocked]}>
                    {badge.description}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  scroll: {
    paddingBottom: 100,
  },
  profileHeader: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
    alignItems: 'center',
  },
  settingsBtn: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.lg,
    padding: spacing.xs,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: spacing.md,
    marginTop: spacing.md,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  avatarEmoji: {
    fontSize: 48,
  },
  editAvatarBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.gold,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  displayName: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.white,
    marginBottom: 2,
  },
  username: {
    fontSize: typography.sizes.sm,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: spacing.sm,
  },
  bio: {
    fontSize: typography.sizes.sm,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: spacing.lg,
  },
  location: {
    fontSize: typography.sizes.xs,
    color: 'rgba(255,255,255,0.7)',
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    width: '100%',
    marginBottom: spacing.md,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.white,
  },
  statLabel: {
    fontSize: typography.sizes.xs,
    color: 'rgba(255,255,255,0.65)',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginVertical: spacing.xs,
  },
  editProfileBtn: {
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.5)',
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
  },
  editProfileBtnText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.white,
  },
  valueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    margin: spacing.xl,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    overflow: 'hidden',
  },
  valueCardLeft: {
    flex: 1,
  },
  valueCardLabel: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  valueCardAmount: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.extrabold,
    color: colors.textPrimary,
  },
  valueCardRight: {
    alignItems: 'flex-end',
    marginRight: spacing.sm,
  },
  valueCardTrend: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.success,
  },
  valueCardTrendLabel: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
  },
  valueGrapeIcon: {
    opacity: 0.15,
    position: 'absolute',
    right: -8,
    bottom: -8,
  },
  tabs: {
    flexDirection: 'row',
    marginHorizontal: spacing.xl,
    marginBottom: spacing.lg,
    backgroundColor: colors.ivory,
    borderRadius: borderRadius.md,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: borderRadius.sm,
  },
  tabActive: {
    backgroundColor: colors.surface,
    ...shadows.sm,
  },
  tabText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.textMuted,
  },
  tabTextActive: {
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  section: {
    paddingHorizontal: spacing.xl,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    gap: spacing.md,
    ...shadows.sm,
  },
  activityIcon: {
    fontSize: 24,
  },
  activityInfo: {
    flex: 1,
  },
  activityText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  activitySub: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  badgeCard: {
    width: '47%',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    gap: spacing.xs,
  },
  badgeCardLocked: {
    backgroundColor: colors.cream,
    opacity: 0.6,
  },
  badgeIcon: {
    fontSize: 32,
    marginBottom: spacing.xs,
  },
  badgeIconLocked: {
    opacity: 0.4,
  },
  badgeName: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  badgeDesc: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
    textAlign: 'center',
  },
  badgeTextLocked: {
    color: colors.textMuted,
  },
});
