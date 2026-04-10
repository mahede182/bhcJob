import type { Company } from "@/@types/api.type";
import { getImageUrl } from "@/constants/api";
import {
  BorderRadius,
  COLORS,
  FontSizes,
  Shadows,
  Spacing,
} from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInLeft } from "react-native-reanimated";

import { type CompanyCardProps } from "@/@types/jobs.type";
import { useTheme } from "@/hooks/useTheme";

export default function CompanyCard({ company, index }: CompanyCardProps) {
  const { colors } = useTheme();

  return (
    <Animated.View entering={FadeInLeft.delay(index * 100).duration(500)}>
      <TouchableOpacity
        style={[
          styles.container,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
        activeOpacity={0.7}
      >
        <View
          style={[
            styles.logoWrapper,
            {
              backgroundColor: colors.surfaceSelected,
              borderColor: colors.border,
            },
          ]}
        >
          <Image
            source={getImageUrl("company-image", company.image)}
            style={styles.logoImage}
            contentFit="contain"
          />
        </View>
        <View style={styles.info}>
          <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
            {company.name}
          </Text>
          <View style={styles.badgeRow}>
            <View
              style={[
                styles.badge,
                { backgroundColor: colors.surfaceSelected },
              ]}
            >
              <Text style={[styles.badgeText, { color: colors.textSecondary }]}>
                {company.jobs_count} Positions
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.chevron}>
          <Ionicons name="chevron-forward" size={18} color={colors.icon} />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: BorderRadius.xl,
    padding: 16,
    marginHorizontal: Spacing.four,
    marginBottom: 12,
    ...Shadows.sm,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  logoWrapper: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    backgroundColor: COLORS.gray100,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  logoImage: {
    width: "80%",
    height: "80%",
  },
  info: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: FontSizes.lg,
    fontWeight: "700",
    color: COLORS.gray900,
    marginBottom: 4,
  },
  badgeRow: {
    flexDirection: "row",
  },
  badge: {
    backgroundColor: COLORS.gray100,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.gray600,
  },
  chevron: {
    marginLeft: 8,
  },
});
