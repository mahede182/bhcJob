import { useColorScheme } from "react-native";
import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import { Colors } from "@/constants/theme";
import { useAppSelector } from "@/store/hooks";
import { selectThemeMode } from "@/store/slices/themeSlice";
import { useMemo } from "react";

export const useTheme = () => {
  const scheme = useColorScheme();
  const themeMode = useAppSelector(selectThemeMode);

  const isDark = useMemo(() => {
    if (themeMode === "system") {
      return scheme === "dark";
    }
    return themeMode === "dark";
  }, [themeMode, scheme]);

  const colors = isDark ? Colors.dark : Colors.light;

  const navTheme = useMemo(() => {
    const baseTheme = isDark ? DarkTheme : DefaultTheme;
    return {
      ...baseTheme,
      colors: {
        ...baseTheme.colors,
        primary: colors.primary,
        background: colors.background,
        card: colors.surface,
        text: colors.text,
        border: colors.border,
        notification: colors.error,
      },
      fonts: baseTheme.fonts || {
        regular: { fontFamily: "System", fontWeight: "400" },
        medium: { fontFamily: "System", fontWeight: "500" },
        bold: { fontFamily: "System", fontWeight: "700" },
        heavy: { fontFamily: "System", fontWeight: "800" },
      },
    };
  }, [isDark, colors]);

  return {
    isDark,
    colors,
    themeMode,
    navTheme,
  };
};
