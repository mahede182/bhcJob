import {
  BorderRadius,
  COLORS,
  FontSizes,
  Shadows,
  Spacing,
} from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { type HeaderProps } from "@/@types/ui.type";
import { useTheme } from "@/hooks/useTheme";
import { useAppDispatch } from "@/store/hooks";
import { THEME_STORAGE_KEY, setTheme } from "@/store/slices/themeSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Header({
  actionLabel,
  actionRoute,
  showBack,
}: HeaderProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { colors, isDark } = useTheme();

  const toggleTheme = () => {
    const nextTheme = isDark ? "light" : "dark";
    dispatch(setTheme(nextTheme));
    AsyncStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        {showBack ? (
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => router.push("/")}
            style={styles.logoContainer}
          >
            <Image
              source={require("@/assets/logo.png")}
              style={styles.logoImage}
              contentFit="contain"
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.darkModeIcon} onPress={toggleTheme}>
          <Ionicons
            name={isDark ? "sunny-outline" : "moon-outline"}
            size={18}
            color={colors.primary}
          />
        </TouchableOpacity>
        {actionLabel && (
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.primary }]}
            onPress={() => actionRoute && router.push(actionRoute as any)}
          >
            <Ionicons
              name="person-circle-outline"
              size={20}
              color={COLORS.white}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.four,
    paddingVertical: 14,
    backgroundColor: COLORS.white,
    ...Shadows.sm,
  },
  logoContainer: {
    height: 32,
    width: 120,
  },
  leftSection: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    padding: 4,
    marginLeft: -4,
  },
  logoImage: {
    width: "100%",
    height: "100%",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    borderRadius: BorderRadius.full,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  actionText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: FontSizes.sm,
  },
  darkModeIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.gray100,
    alignItems: "center",
    justifyContent: "center",
  },
});
