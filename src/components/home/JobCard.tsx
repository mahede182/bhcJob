import type { Job } from "@/@types/api.type";
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
import Animated, { FadeInDown } from "react-native-reanimated";

import { type JobCardProps } from "@/@types/jobs.type";

export default function JobCard({ job, index }: JobCardProps) {
  const salaryText = job.max_salary
    ? `${job.currency}${job.min_salary} - ${job.max_salary}`
    : `${job.currency}${job.min_salary}`;

  return (
    <Animated.View entering={FadeInDown.delay(index * 100).duration(500)}>
      <TouchableOpacity style={styles.container} activeOpacity={0.7}>
        <View style={styles.header}>
          <View style={styles.logoWrapper}>
            <Image
              source={getImageUrl("company-image", job.company.image)}
              style={styles.logoImage}
              contentFit="contain"
            />
          </View>
          <View style={styles.headerTitleRow}>
            <Text style={styles.jobTitle} numberOfLines={2}>
              {job.job_title}
            </Text>
            <Text style={styles.companyName}>{job.company_name}</Text>
          </View>
          <TouchableOpacity style={styles.heartIcon}>
            <Ionicons name="heart-outline" size={20} color={COLORS.gray400} />
          </TouchableOpacity>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Ionicons
              name="location-outline"
              size={14}
              color={COLORS.gray500}
            />
            <Text style={styles.infoText}>{job.country.name}</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="time-outline" size={14} color={COLORS.gray500} />
            <Text style={styles.infoText}>
              {job.employment_type === "full_time"
                ? "Full Time"
                : job.employment_type}
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.salaryBadge}>
            <Text style={styles.salaryText}>{salaryText}</Text>
          </View>
          {job.is_hot === 1 && (
            <View style={styles.hotBadge}>
              <Ionicons name="flame" size={12} color="#EF4444" />
              <Text style={styles.hotText}>HOT</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: BorderRadius.xl,
    padding: 20,
    marginHorizontal: Spacing.four,
    marginBottom: 16,
    ...Shadows.md,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  logoWrapper: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    backgroundColor: COLORS.gray50,
    borderWidth: 1,
    borderColor: COLORS.gray100,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  logoImage: {
    width: "100%",
    height: "100%",
  },
  headerTitleRow: {
    flex: 1,
    marginLeft: 16,
    marginRight: 8,
  },
  jobTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "800",
    color: COLORS.gray900,
    lineHeight: 22,
    marginBottom: 4,
  },
  companyName: {
    fontSize: FontSizes.md,
    fontWeight: "600",
    color: COLORS.gray600,
  },
  heartIcon: {
    padding: 4,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  infoText: {
    fontSize: FontSizes.sm,
    color: COLORS.gray500,
    fontWeight: "500",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: COLORS.gray50,
    paddingTop: 16,
  },
  salaryBadge: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BorderRadius.sm,
  },
  salaryText: {
    fontSize: FontSizes.sm,
    fontWeight: "700",
    color: COLORS.primary,
  },
  hotBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF2F2",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
    gap: 4,
  },
  hotText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#EF4444",
  },
});
