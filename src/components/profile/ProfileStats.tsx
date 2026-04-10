import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  BorderRadius,
  COLORS,
  FontSizes,
  Shadows,
  Spacing,
} from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { type ProfileStatsProps } from "@/@types/profile.type";

export default function ProfileStats({ stats }: ProfileStatsProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.statsRow}>
      {stats.map((item) => (
        <View
          key={item.key}
          style={[styles.statCard, { backgroundColor: colors.surface }]}
        >
          <Text style={[styles.statValue, { color: colors.primary }]}>
            {item.value}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            {item.label}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  statsRow: {
    flexDirection: "row",
    paddingHorizontal: Spacing.four,
    gap: 16,
    marginTop: -20,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: BorderRadius.lg,
    alignItems: "center",
    ...Shadows.md,
  },
  statValue: {
    fontSize: FontSizes.xl,
    fontWeight: "800",
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.gray500,
    marginTop: 4,
    textTransform: "uppercase",
  },
});
