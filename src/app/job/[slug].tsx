import JobCard from "@/components/home/JobCard";
import Header from "@/components/ui/Header";
import { getImageUrl } from "@/constants/api";
import {
  BorderRadius,
  COLORS,
  FontSizes,
  Shadows,
  Spacing,
} from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { useGetJobBySlugQuery, useGetJobsQuery } from "@/store/api/jobsApi";
import { AppLogger } from "@/utils/AppLogger";
import { formatSalary } from "@/utils/job";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import RenderHtml from "react-native-render-html";
import { SafeAreaView } from "react-native-safe-area-context";

export default function JobDetailsScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { data: job, isLoading } = useGetJobBySlugQuery(slug as string, {
    skip: !slug,
  });
  const { data: allJobs } = useGetJobsQuery({});
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  AppLogger.d(slug);
  const recommendedJobs = useMemo(() => {
    if (!allJobs || !job) return [];
    return allJobs.filter((j) => j.id !== job.id).slice(0, 5);
  }, [allJobs, job]);

  if (isLoading || !job) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <Header showBack title="Job Details" />
        <View style={styles.center}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </SafeAreaView>
    );
  }

  const salaryStr = formatSalary(job.min_salary, job.max_salary, job.currency);

  const htmlTagsStyles: any = {
    p: {
      color: colors.textSecondary,
      fontSize: 14,
      lineHeight: 22,
      marginVertical: 8,
    },
    li: { color: colors.textSecondary, fontSize: 14, lineHeight: 22 },
    span: { color: colors.textSecondary },
    strong: { color: colors.text, fontWeight: "700" },
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Header showBack title="Job Details" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Top Card */}
        <View style={[styles.topCard, { backgroundColor: colors.surface }]}>
          <View style={styles.topCardRow}>
            <View style={styles.topCardInfo}>
              <Text style={[styles.jobTitle, { color: colors.text }]}>
                {job.job_title}
              </Text>
              <Text
                style={[styles.companyName, { color: colors.textSecondary }]}
              >
                {job.company_name}
              </Text>
            </View>
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
          </View>
          <View style={styles.salaryBox}>
            <Text style={[styles.salaryLabel, { color: colors.text }]}>
              Salary: {salaryStr.primary}
            </Text>
            <Text style={[styles.salarySub, { color: colors.textSecondary }]}>
              ({salaryStr.secondary})
            </Text>
          </View>

          {/* Quick Benefits from Job Card logic or specific benefits */}
          {job.benefits && job.benefits.length > 0 && (
            <View style={styles.quickBenefitsRow}>
              <Text style={[styles.quickBenefitTitle, { color: colors.text }]}>
                Benefits Provided:
              </Text>
              <View style={styles.quickBenefitsList}>
                {job.benefits.slice(0, 4).map((b) => (
                  <View key={b.id} style={styles.quickBenefitItem}>
                    <Ionicons
                      name="checkmark-circle"
                      size={16}
                      color={COLORS.primary}
                    />
                    <Text
                      style={[
                        styles.quickBenefitText,
                        { color: colors.textSecondary },
                      ]}
                      numberOfLines={1}
                    >
                      {b.name}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          <TouchableOpacity
            style={[styles.applyBtn, { backgroundColor: COLORS.primary }]}
            activeOpacity={0.8}
          >
            <Text style={styles.applyBtnText}>Apply Now</Text>
          </TouchableOpacity>
        </View>

        {/* Company Overview */}
        {job.company.desc && (
          <View style={[styles.section, { backgroundColor: colors.surface }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Company Overview
            </Text>
            <RenderHtml
              contentWidth={width - 40}
              source={{ html: job.company.desc }}
              tagsStyles={htmlTagsStyles}
            />
          </View>
        )}

        {/* Job Description */}
        {job.job_desc && (
          <View style={[styles.section, { backgroundColor: colors.surface }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Job Description
            </Text>
            <RenderHtml
              contentWidth={width - 40}
              source={{ html: job.job_desc }}
              tagsStyles={htmlTagsStyles}
            />
          </View>
        )}

        {/* Job Responsibility */}
        {job.job_requirement && (
          <View style={[styles.section, { backgroundColor: colors.surface }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Job Responsibility
            </Text>
            <RenderHtml
              contentWidth={width - 40}
              source={{ html: job.job_requirement }}
              tagsStyles={htmlTagsStyles}
            />
          </View>
        )}

        {/* Additional Requirements */}
        {job.recruitment_process && (
          <View style={[styles.section, { backgroundColor: colors.surface }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Additional Requirements
            </Text>
            <RenderHtml
              contentWidth={width - 40}
              source={{ html: job.recruitment_process }}
              tagsStyles={htmlTagsStyles}
            />
          </View>
        )}

        {/* Other Benefits */}
        {job.benefits && job.benefits.length > 0 && (
          <View style={[styles.section, { backgroundColor: colors.surface }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Other Benefits
            </Text>
            {job.benefits.map((b) => (
              <View key={b.id} style={styles.bulletRow}>
                <Ionicons
                  name="checkbox"
                  size={18}
                  color={COLORS.primary}
                  style={styles.bulletIcon}
                />
                <Text
                  style={[styles.bulletText, { color: colors.textSecondary }]}
                >
                  {b.name}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Key Information */}
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Job Information
          </Text>

          <View style={styles.infoGridRow}>
            <Ionicons
              name="time-outline"
              size={20}
              color={colors.textSecondary}
            />
            <Text style={[styles.infoGridTitle, { color: colors.text }]}>
              Working Hours:{" "}
            </Text>
            <Text
              style={[styles.infoGridValue, { color: colors.textSecondary }]}
            >
              {job.working_hours ? `${job.working_hours} hours/day` : "N/A"}
            </Text>
          </View>

          <View style={styles.infoGridRow}>
            <Ionicons
              name="person-outline"
              size={20}
              color={colors.textSecondary}
            />
            <Text style={[styles.infoGridTitle, { color: colors.text }]}>
              Gender:{" "}
            </Text>
            <Text
              style={[styles.infoGridValue, { color: colors.textSecondary }]}
            >
              {job.gender || "Any"}
            </Text>
          </View>

          <View style={styles.infoGridRow}>
            <Ionicons
              name="calendar-outline"
              size={20}
              color={colors.textSecondary}
            />
            <Text style={[styles.infoGridTitle, { color: colors.text }]}>
              Age Requirement:{" "}
            </Text>
            <Text
              style={[styles.infoGridValue, { color: colors.textSecondary }]}
            >
              {job.min_age} - {job.max_age} Years
            </Text>
          </View>

          <View style={styles.infoGridRow}>
            <Ionicons
              name="school-outline"
              size={20}
              color={colors.textSecondary}
            />
            <Text style={[styles.infoGridTitle, { color: colors.text }]}>
              Vacancy:{" "}
            </Text>
            <Text
              style={[styles.infoGridValue, { color: colors.textSecondary }]}
            >
              {job.vacancy}
            </Text>
          </View>

          <View style={styles.infoGridRow}>
            <Ionicons
              name="briefcase-outline"
              size={20}
              color={colors.textSecondary}
            />
            <Text style={[styles.infoGridTitle, { color: colors.text }]}>
              Employment Status:{" "}
            </Text>
            <Text
              style={[styles.infoGridValue, { color: colors.textSecondary }]}
            >
              {job.employment_type?.replace("_", " ")}
            </Text>
          </View>

          {job.experience && (
            <View style={styles.infoGridRow}>
              <Ionicons
                name="star-outline"
                size={20}
                color={colors.textSecondary}
              />
              <Text style={[styles.infoGridTitle, { color: colors.text }]}>
                Experience:{" "}
              </Text>
              <Text
                style={[styles.infoGridValue, { color: colors.textSecondary }]}
              >
                {job.experience}
              </Text>
            </View>
          )}

          {/* Skills */}
          {job.hard_skills && job.hard_skills.length > 0 && (
            <View style={{ marginTop: 12 }}>
              <Text style={[styles.infoSubTitle, { color: colors.text }]}>
                Hard Skills:
              </Text>
              <View style={styles.tagsContainer}>
                {job.hard_skills.map((s) => (
                  <View
                    key={s.id}
                    style={[
                      styles.tag,
                      {
                        backgroundColor: colors.surfaceSelected,
                        borderColor: colors.border,
                      },
                    ]}
                  >
                    <Text
                      style={[styles.tagText, { color: colors.textSecondary }]}
                    >
                      {s.name}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {job.soft_skills && job.soft_skills.length > 0 && (
            <View style={{ marginTop: 12 }}>
              <Text style={[styles.infoSubTitle, { color: colors.text }]}>
                Soft Skills:
              </Text>
              <View style={styles.tagsContainer}>
                {job.soft_skills.map((s) => (
                  <View
                    key={s.id}
                    style={[
                      styles.tag,
                      {
                        backgroundColor: colors.surfaceSelected,
                        borderColor: colors.border,
                      },
                    ]}
                  >
                    <Text
                      style={[styles.tagText, { color: colors.textSecondary }]}
                    >
                      {s.name}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {job.languages && job.languages.length > 0 && (
            <View style={{ marginTop: 12 }}>
              <Text style={[styles.infoSubTitle, { color: colors.text }]}>
                Languages:
              </Text>
              <View style={styles.tagsContainer}>
                {job.languages.map((l) => (
                  <View
                    key={l.id}
                    style={[
                      styles.tag,
                      {
                        backgroundColor: colors.surfaceSelected,
                        borderColor: colors.border,
                      },
                    ]}
                  >
                    <Text
                      style={[styles.tagText, { color: colors.textSecondary }]}
                    >
                      {l.name}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* Recommended Jobs */}
        {recommendedJobs.length > 0 && (
          <View style={styles.recommendedSection}>
            <Text style={[styles.recommendedTitle, { color: colors.text }]}>
              Recommended Jobs for You
            </Text>
            {recommendedJobs.map((rj, idx) => (
              <JobCard key={rj.id} job={rj} index={idx} />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingBottom: 100 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  topCard: {
    padding: Spacing.four,
    marginHorizontal: Spacing.four,
    marginTop: Spacing.four,
    borderRadius: BorderRadius.xl,
    ...Shadows.sm,
  },
  topCardRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: Spacing.three,
  },
  topCardInfo: { flex: 1, paddingRight: 10 },
  jobTitle: { fontSize: FontSizes.xl, fontWeight: "800", marginBottom: 4 },
  companyName: { fontSize: FontSizes.md, fontWeight: "600" },
  logoWrapper: {
    width: 50,
    height: 50,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    padding: 2,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  logoImage: { width: "100%", height: "100%" },
  salaryBox: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: Spacing.three,
  },
  salaryLabel: { fontSize: FontSizes.md, fontWeight: "700" },
  salarySub: { fontSize: FontSizes.sm, marginLeft: 4 },
  applyBtn: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: BorderRadius.md,
    alignItems: "center",
    marginTop: Spacing.three,
  },
  applyBtnText: {
    color: COLORS.white,
    fontSize: FontSizes.md,
    fontWeight: "700",
  },
  quickBenefitsRow: { marginBottom: Spacing.three },
  quickBenefitTitle: {
    fontSize: FontSizes.sm,
    fontWeight: "600",
    marginBottom: 6,
  },
  quickBenefitsList: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  quickBenefitItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "47%",
    gap: 4,
  },
  quickBenefitText: { fontSize: FontSizes.xs, flex: 1 },
  section: {
    marginTop: Spacing.four,
    marginHorizontal: Spacing.four,
    padding: Spacing.four,
    borderRadius: BorderRadius.xl,
    ...Shadows.sm,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "800",
    marginBottom: Spacing.three,
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
    gap: 10,
  },
  bulletIcon: { marginTop: 2 },
  bulletText: { flex: 1, fontSize: 14, lineHeight: 22 },
  infoGridRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  infoGridTitle: {
    fontSize: FontSizes.sm,
    fontWeight: "600",
    marginLeft: 8,
    width: 140,
  },
  infoGridValue: { fontSize: FontSizes.sm, fontWeight: "500", flex: 1 },
  infoSubTitle: { fontSize: FontSizes.sm, fontWeight: "700", marginBottom: 8 },
  tagsContainer: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  tagText: { fontSize: FontSizes.xs, fontWeight: "600" },
  recommendedSection: {
    marginTop: Spacing.five,
  },
  recommendedTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "800",
    marginHorizontal: Spacing.four,
    marginBottom: Spacing.four,
  },
});
