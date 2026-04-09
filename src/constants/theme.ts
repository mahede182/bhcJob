import "@/global.css";
import { Platform } from "react-native";

export const COLORS = {
  primary: "#3b82f6",
  primaryDark: "#2F68C4",
  primaryLight: "#e5e7eb",
  primaryGradientStart: "#4DA3F5",
  primaryGradientEnd: "#208AEF",
  white: "#FFFFFF",
  black: "#000000",
  gray50: "#F9FAFB",
  gray100: "#F3F4F6",
  gray200: "#E5E7EB",
  gray300: "#D1D5DB",
  gray400: "#9CA3AF",
  gray500: "#6B7280",
  gray600: "#4B5563",
  gray700: "#374151",
  gray800: "#1F2937",
  gray900: "#111827",
  border: "#E5E7EB",
  inputBg: "#F9FAFB",
  error: "#EF4444",
  success: "#22C55E",
  footerBg: "#1E3A5F",
  glassBg: "rgba(255, 255, 255, 0.7)",
  glassBorder: "rgba(255, 255, 255, 0.3)",
} as const;

export const GlassTokens = {
  background: "rgba(255, 255, 255, 0.6)",
  border: "rgba(255, 255, 255, 0.4)",
  blur: 20,
} as const;

export const Shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const Colors = {
  light: {
    background: "#FCFDFD",
    surface: COLORS.white,
    surfaceSelected: COLORS.gray100,
    text: COLORS.gray900,
    textSecondary: COLORS.gray600,
    textMuted: COLORS.gray400,
    border: COLORS.gray200,
    primary: COLORS.primary,
    primaryDark: COLORS.primaryDark,
    error: COLORS.error,
    success: COLORS.success,
    icon: COLORS.gray400,
    inputBg: COLORS.inputBg,
  },
  dark: {
    background: COLORS.black,
    surface: "#191919",
    surfaceSelected: "#1E1E1E",
    text: COLORS.white,
    textSecondary: COLORS.gray400,
    textMuted: COLORS.gray600,
    border: "#2C2C2C",
    primary: COLORS.primary,
    primaryDark: COLORS.primaryDark,
    error: COLORS.error,
    success: COLORS.success,
    icon: COLORS.gray500,
    inputBg: "#1E1E1E",
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "var(--font-display)",
    serif: "var(--font-serif)",
    rounded: "var(--font-rounded)",
    mono: "var(--font-mono)",
  },
});

export const FontSizes = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 22,
  hero: 28,
} as const;

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BorderRadius = {
  sm: 6,
  md: 10,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 480;
