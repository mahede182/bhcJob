import { BorderRadius, FontSizes, Shadows } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { type MenuItemProps } from "@/@types/ui.type";
import { useTheme } from "@/hooks/useTheme";

export default function MenuItem({
  icon,
  title,
  color,
  onPress,
}: MenuItemProps) {
  const { colors } = useTheme();
  const iconColor = color || colors.text;

  const styles = createStyles(colors);
  return (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.menuItemLeft}>
        <View style={styles.menuIconWrapper}>
          <Ionicons name={icon} size={20} color={iconColor} />
        </View>
        <Text style={[styles.menuTitle, { color: iconColor }]}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.icon} />
    </TouchableOpacity>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    menuItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: colors.surface,
      padding: 16,
      borderRadius: BorderRadius.lg,
      marginBottom: 8,
      ...Shadows.sm,
    },
    menuItemLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
    },
    menuIconWrapper: {
      width: 36,
      height: 36,
      borderRadius: 10,
      backgroundColor: colors.surfaceSelected,
      alignItems: "center",
      justifyContent: "center",
    },
    menuTitle: {
      fontSize: FontSizes.md,
      fontWeight: "600",
    },
  });
