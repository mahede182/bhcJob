import {
  BorderRadius,
  COLORS,
  FontSizes,
  Shadows,
  Spacing,
} from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SAVED_JOBS = [
  {
    id: 1,
    title: "Senior UX Designer",
    company: "Google",
    location: "Mountain View, CA",
    salary: "$120k - $180k",
  },
];

export default function FavoriteScreen() {
  const { colors } = useTheme();
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={[styles.header, { backgroundColor: colors.primary }]}>
          <Text style={styles.title}>Your Favorites</Text>
          <Text style={styles.subtitle}>1 saved jobs</Text>
        </View>

        <View style={styles.list}>
          {SAVED_JOBS.map((job) => (
            <TouchableOpacity
              key={job.id}
              style={[
                styles.card,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
            >
              <View style={styles.cardHeader}>
                <View
                  style={[
                    styles.companyIcon,
                    { backgroundColor: colors.surfaceSelected },
                  ]}
                >
                  <Ionicons
                    name="business-outline"
                    size={24}
                    color={colors.primary}
                  />
                </View>
                <View style={styles.headerInfo}>
                  <Text style={[styles.jobTitle, { color: colors.text }]}>
                    {job.title}
                  </Text>
                  <Text
                    style={[
                      styles.companyName,
                      { color: colors.textSecondary },
                    ]}
                  >
                    {job.company}
                  </Text>
                </View>
                <TouchableOpacity>
                  <Ionicons name="heart" size={22} color={colors.error} />
                </TouchableOpacity>
              </View>
              <View style={styles.cardFooter}>
                <View
                  style={[
                    styles.badge,
                    { backgroundColor: colors.primary + "15" },
                  ]}
                >
                  <Text style={[styles.badgeText, { color: colors.primary }]}>
                    {job.salary}
                  </Text>
                </View>
                <View
                  style={[
                    styles.badge,
                    { backgroundColor: colors.surfaceSelected },
                  ]}
                >
                  <Text
                    style={[styles.badgeText, { color: colors.textSecondary }]}
                  >
                    {job.location}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {SAVED_JOBS.length === 0 && (
          <View style={styles.empty}>
            <Ionicons
              name="heart-dislike-outline"
              size={60}
              color={colors.textMuted}
            />
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>
              No favorite jobs yet
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  header: {
    paddingTop: 60,
    paddingHorizontal: Spacing.four,
    backgroundColor: COLORS.primary,
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    ...Shadows.sm,
  },
  title: { fontSize: FontSizes.xxl, fontWeight: "800", color: COLORS.white },
  subtitle: { color: COLORS.white, fontSize: FontSizes.md, marginTop: 4 },
  list: { padding: Spacing.four },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BorderRadius.lg,
    padding: 16,
    marginBottom: 16,
    ...Shadows.sm,
    borderWidth: 1,
    borderColor: COLORS.gray100,
  },
  cardHeader: { flexDirection: "row", alignItems: "flex-start" },
  companyIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: COLORS.gray50,
    alignItems: "center",
    justifyContent: "center",
  },
  headerInfo: { flex: 1, marginLeft: 16 },
  jobTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "700",
    color: COLORS.gray900,
  },
  companyName: { fontSize: FontSizes.sm, color: COLORS.gray500, marginTop: 2 },
  cardFooter: { flexDirection: "row", marginTop: 16, gap: 8 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  badgeText: { fontSize: 10, fontWeight: "700" },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  emptyText: {
    fontSize: FontSizes.lg,
    color: COLORS.gray400,
    marginTop: 16,
    fontWeight: "600",
  },
});
