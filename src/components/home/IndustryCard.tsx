import type { Industry } from "@/@types/api.type";
import { getImageUrl } from "@/constants/api";
import { BorderRadius, COLORS, FontSizes, Shadows } from "@/constants/theme";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";

import { type IndustryCardProps } from "@/@types/jobs.type";
import { useTheme } from "@/hooks/useTheme";

export default function IndustryCard({ industry, index }: IndustryCardProps) {
  const { colors } = useTheme();

  return (
    <Animated.View entering={FadeInRight.delay(index * 100).duration(500)}>
      <TouchableOpacity
        style={[
          styles.container,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
        activeOpacity={0.8}
      >
        <View style={styles.imageWrapper}>
          <Image
            source={getImageUrl("industry-image", industry.image)}
            style={styles.image}
            contentFit="cover"
          />
        </View>
        <View style={styles.content}>
          <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
            {industry.name}
          </Text>
          <Text
            style={[
              styles.count,
              {
                color: colors.primary,
                backgroundColor: colors.surfaceSelected,
              },
            ]}
          >
            {industry.jobs_count} Jobs
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: BorderRadius.lg,
    padding: 12,
    marginRight: 16,
    width: 140,
    ...Shadows.sm,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  imageWrapper: {
    width: "100%",
    height: 80,
    borderRadius: BorderRadius.md,
    overflow: "hidden",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "60%",
    height: "60%",
  },
  content: {
    alignItems: "flex-start",
  },
  name: {
    fontSize: FontSizes.sm,
    fontWeight: "700",
    color: COLORS.gray900,
    marginBottom: 2,
  },
  count: {
    fontSize: 10,
    fontWeight: "600",
    color: COLORS.primary,
    backgroundColor: COLORS.gray100,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
});
