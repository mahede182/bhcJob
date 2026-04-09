import { FontSizes, Spacing } from "@/constants/theme";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { type SectionHeaderProps } from "@/@types/ui.type";
import { useTheme } from "@/hooks/useTheme";

export default function SectionHeader({
  title,
  onViewAll,
}: SectionHeaderProps) {
  const { colors } = useTheme();

  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      {onViewAll && (
        <TouchableOpacity onPress={onViewAll}>
          <Text style={styles.viewAll}>View All →</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: Spacing.three,
      marginBottom: Spacing.two,
    },
    title: {
      fontSize: FontSizes.xl,
      fontWeight: "700",
      color: colors.black,
    },
    viewAll: {
      fontSize: FontSizes.sm,
      color: colors.primary,
      fontWeight: "600",
    },
  });
