import { COLORS, FontSizes, Shadows, Spacing } from "@/constants/theme";
import { useGetCompaniesQuery } from "@/store/api/companiesApi";
import { useGetIndustriesQuery } from "@/store/api/industriesApi";
import { useGetJobsQuery } from "@/store/api/jobsApi";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Header from "@/components/ui/Header";
import Input from "@/components/ui/Input";
import SectionHeader from "@/components/ui/SectionHeader";

import CompanyCard from "@/components/home/CompanyCard";
import IndustryCard from "@/components/home/IndustryCard";
import JobCard from "@/components/home/JobCard";
import { useTheme } from "@/hooks/useTheme";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/slices/authSlice";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const user = useAppSelector(selectCurrentUser);
  const { data: industries, isLoading: indLoading } = useGetIndustriesQuery({});
  const { data: jobs, isLoading: jobsLoading } = useGetJobsQuery({});
  const { data: companies, isLoading: compLoading } = useGetCompaniesQuery({});
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView
        style={[styles.scroll, { backgroundColor: colors.background }]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        <Header
          actionLabel={
            user ? `Hi, ${(user.name || "User").split(" ")[0]}` : "Sign In"
          }
          actionRoute={user ? "/profile" : "/sign-in"}
        />

        {/* Modern Search Row */}
        <View style={styles.searchSection}>
          <Text style={styles.welcomeText}>Find your dream job</Text>
          <Input
            label=""
            placeholder="Search job title or company"
            icon="search-outline"
          />
        </View>

        {/* Popular Industries */}
        <View style={styles.section}>
          <SectionHeader title="Popular Category" />
          {indLoading ? (
            <ActivityIndicator color={colors.primary} style={{ padding: 20 }} />
          ) : (
            <FlatList
              data={industries}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item, index }) => (
                <IndustryCard industry={item} index={index} />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            />
          )}
        </View>

        {/* Recommended Jobs */}
        <View style={styles.section}>
          <SectionHeader title="Recommended Jobs" />
          {jobsLoading ? (
            <ActivityIndicator color={colors.primary} style={{ padding: 20 }} />
          ) : (
            jobs
              ?.slice(0, 5)
              .map((job, index) => (
                <JobCard key={job.id} job={job} index={index} />
              ))
          )}
        </View>

        {/* Popular Companies */}
        <View style={styles.section}>
          <SectionHeader title="Top Companies" />
          {compLoading ? (
            <ActivityIndicator color={colors.primary} style={{ padding: 20 }} />
          ) : (
            companies?.map((company, index) => (
              <CompanyCard key={company.id} company={company} index={index} />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scroll: {
    flex: 1,
  },
  searchSection: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.two,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    ...Shadows.sm,
  },
  welcomeText: {
    fontSize: FontSizes.xxl,
    fontWeight: "800",
    color: COLORS.white,
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  section: {
    marginTop: Spacing.five,
  },
  horizontalList: {
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.two,
  },
});
