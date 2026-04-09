import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, FontSizes, Spacing } from "@/constants/theme";

import { type SectionHeaderProps } from "@/@types/ui.type";

export default function SectionHeader({
  title,
  onViewAll,
}: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {onViewAll && (
        <TouchableOpacity onPress={onViewAll}>
          <Text style={styles.viewAll}>View All →</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
    color: COLORS.gray900,
  },
  viewAll: {
    fontSize: FontSizes.sm,
    color: COLORS.primary,
    fontWeight: "600",
  },
});
