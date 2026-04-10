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
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { type JobCardProps } from "@/@types/jobs.type";
import { useTheme } from "@/hooks/useTheme";
import { formatDeadline, formatFoodAllowance, formatSalary } from "@/utils/job";

export default function JobCard({ job, index }: JobCardProps) {
  const { colors } = useTheme();
  const router = useRouter();

  const salary = formatSalary(job.min_salary, job.max_salary, job.currency);
  const food = formatFoodAllowance(
    job.food_option,
    job.food_amount,
    job.currency,
  );
  const deadline = formatDeadline(job.expiry);

  const handleView = () => {
    router.push(`/job/${job.slug}`);
  };

  const handleApply = () => {
    // TODO: Navigate to apply screen / open apply modal
  };

  return (
    <Animated.View entering={FadeInDown.delay(index * 100).duration(500)}>
      <View style={[styles.container, { backgroundColor: colors.surface }]}>
        {/* Header: Title + Bookmark */}
        <View style={styles.titleRow}>
          <Text
            style={[styles.jobTitle, { color: colors.text }]}
            numberOfLines={2}
          >
            {job.job_title}
          </Text>
          <TouchableOpacity style={styles.bookmarkBtn}>
            <Ionicons name="star-outline" size={20} color={colors.icon} />
          </TouchableOpacity>
        </View>

        {/* Company Row */}
        <View style={styles.companyRow}>
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
              source={getImageUrl("company-image", job.company.image)}
              style={styles.logoImage}
              contentFit="contain"
            />
          </View>
          <Text style={[styles.companyName, { color: colors.textSecondary }]}>
            {job.company_name}
          </Text>
        </View>

        {/* Salary & Food Info Box */}
        <View
          style={[
            styles.infoBox,
            {
              backgroundColor: colors.primary + "0D",
              borderColor: colors.primary + "30",
            },
          ]}
        >
          <View style={styles.infoLine}>
            <Text style={[styles.infoLabel, { color: colors.text }]}>
              Salary: {salary.primary}
            </Text>
            <Text style={[styles.infoSub, { color: colors.textSecondary }]}>
              ({salary.secondary})
            </Text>
          </View>
          {food && (
            <View style={styles.infoLine}>
              <Text style={[styles.infoLabel, { color: colors.success }]}>
                {food.primary}
              </Text>
              <Text style={[styles.infoSub, { color: colors.textSecondary }]}>
                ({food.secondary})
              </Text>
            </View>
          )}
        </View>

        {/* Tags Row: Type + Country */}
        <View style={styles.tagsRow}>
          <View
            style={[styles.tag, { backgroundColor: colors.surfaceSelected }]}
          >
            <Ionicons
              name="airplane-outline"
              size={12}
              color={colors.primary}
            />
            <Text style={[styles.tagText, { color: colors.text }]}>
              {job.type?.toUpperCase() || "OVERSEAS"}
            </Text>
          </View>
          <View
            style={[styles.tag, { backgroundColor: colors.surfaceSelected }]}
          >
            <Ionicons
              name="location-outline"
              size={12}
              color={colors.primary}
            />
            <Text style={[styles.tagText, { color: colors.text }]}>
              {job.country?.name?.toUpperCase() || "—"}
            </Text>
          </View>
        </View>

        {/* Deadline */}
        {deadline && (
          <View style={styles.deadlineRow}>
            <Ionicons name="time-outline" size={14} color={colors.error} />
            <Text style={[styles.deadlineText, { color: colors.text }]}>
              Application Deadline:{" "}
              <Text style={{ fontWeight: "700" }}>{deadline}</Text>
            </Text>
          </View>
        )}

        {/* Action Buttons: View + Apply Now */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.viewBtn, { borderColor: colors.primary }]}
            activeOpacity={0.7}
            onPress={handleView}
          >
            <Text style={[styles.viewBtnText, { color: colors.primary }]}>
              View
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.applyBtn, { backgroundColor: colors.primary }]}
            activeOpacity={0.7}
            onPress={handleApply}
          >
            <Text style={styles.applyBtnText}>Apply Now</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  jobTitle: {
    flex: 1,
    fontSize: FontSizes.lg,
    fontWeight: "800",
    color: COLORS.gray900,
    lineHeight: 22,
    marginRight: 8,
  },
  bookmarkBtn: {
    padding: 4,
  },
  companyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  logoWrapper: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.md,
    backgroundColor: COLORS.gray100,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  logoImage: {
    width: "100%",
    height: "100%",
  },
  companyName: {
    fontSize: FontSizes.md,
    fontWeight: "600",
    color: COLORS.gray600,
    marginLeft: 10,
  },
  infoBox: {
    borderRadius: BorderRadius.md,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 14,
    borderWidth: 1,
    gap: 4,
  },
  infoLine: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 4,
  },
  infoLabel: {
    fontSize: FontSizes.sm,
    fontWeight: "700",
    color: COLORS.gray900,
  },
  infoSub: {
    fontSize: FontSizes.xs,
    fontWeight: "500",
    color: COLORS.gray500,
  },
  tagsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: COLORS.gray100,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: BorderRadius.sm,
  },
  tagText: {
    fontSize: FontSizes.xs,
    fontWeight: "700",
    color: COLORS.gray800,
    letterSpacing: 0.5,
  },
  deadlineRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 16,
  },
  deadlineText: {
    fontSize: FontSizes.sm,
    fontWeight: "500",
    color: COLORS.gray700,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 12,
  },
  viewBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderRadius: BorderRadius.md,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  viewBtnText: {
    fontSize: FontSizes.md,
    fontWeight: "700",
    color: COLORS.primary,
  },
  applyBtn: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: BorderRadius.md,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  applyBtnText: {
    fontSize: FontSizes.md,
    fontWeight: "700",
    color: COLORS.white,
  },
});
