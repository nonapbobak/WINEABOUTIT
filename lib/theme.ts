export const colors = {
  // Primary wine palette
  wine: '#722F37',
  wineLight: '#A0404A',
  wineDark: '#4A1E24',
  wineMuted: '#C8848A',

  // Accent
  gold: '#C5A028',
  goldLight: '#E8C547',
  goldDark: '#9A7A18',

  // Grape / purple (used for ratings)
  grape: '#6B2D8B',
  grapeLight: '#9B5DB5',

  // Backgrounds
  cream: '#FDF8F0',
  ivory: '#F5ECD7',
  parchment: '#EDD9A3',

  // Text
  textPrimary: '#1A0A0F',
  textSecondary: '#6B4F52',
  textMuted: '#9E8385',
  textInverse: '#FFFFFF',

  // UI surfaces
  white: '#FFFFFF',
  surface: '#FFFFFF',
  surfaceAlt: '#F9F2EA',
  border: '#E8D5D7',
  borderLight: '#F0E8EA',

  // Status
  success: '#5B8A5A',
  successLight: '#E8F5E8',
  error: '#C0392B',
  errorLight: '#FDECEA',
  warning: '#E67E22',

  // Tab bar
  tabBarBackground: '#4A1E24',
  tabActive: '#C5A028',
  tabInactive: '#9E8385',

  // Overlay
  overlay: 'rgba(26, 10, 15, 0.5)',
  overlayLight: 'rgba(26, 10, 15, 0.2)',
};

export const typography = {
  sizes: {
    xs: 11,
    sm: 13,
    base: 15,
    md: 17,
    lg: 20,
    xl: 24,
    '2xl': 28,
    '3xl': 34,
    '4xl': 42,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  '3xl': 48,
  '4xl': 64,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: colors.wineDark,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: colors.wineDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: colors.wineDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 8,
  },
};
