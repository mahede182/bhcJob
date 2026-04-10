import Input from "@/components/ui/Input";
import {
  BorderRadius,
  COLORS,
  FontSizes,
  Shadows,
  Spacing,
} from "@/constants/theme";
import { useDebounce } from "@/hooks/useDebounce";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CATEGORIES = [
  { id: 1, name: "Technology", icon: "laptop-outline" },
  { id: 2, name: "Design", icon: "color-palette-outline" },
  { id: 3, name: "Marketing", icon: "megaphone-outline" },
  { id: 4, name: "Finance", icon: "cash-outline" },
  { id: 5, name: "Management", icon: "people-outline" },
  { id: 6, name: "Writing", icon: "create-outline" },
];

const RECENT_SEARCHES = [
  "Software Engineer",
  "Product Designer",
  "Remote Jobs",
];

export default function SearchScreen() {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 500);
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <Text style={styles.title}>{t("search.findJobs")}</Text>
        <Input
          label=""
          placeholder={t("search.searchPlaceholder")}
          icon="search-outline"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Recent Searches */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t("search.recentSearches")}
          </Text>
          <View style={styles.recentList}>
            {RECENT_SEARCHES.map((search) => (
              <TouchableOpacity key={search} style={styles.recentItem}>
                <Ionicons
                  name="time-outline"
                  size={16}
                  color={colors.textMuted}
                />
                <Text
                  style={[styles.recentText, { color: colors.textSecondary }]}
                >
                  {search}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Categories Grid */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t("search.jobCategories")}
          </Text>
          <View style={styles.grid}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.gridItem,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                ]}
              >
                <View
                  style={[
                    styles.iconWrapper,
                    { backgroundColor: colors.primary + "15" },
                  ]}
                >
                  <Ionicons
                    name={cat.icon as any}
                    size={24}
                    color={colors.primary}
                  />
                </View>
                <Text style={[styles.catName, { color: colors.text }]}>
                  {cat.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
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
  title: {
    fontSize: FontSizes.xxl,
    fontWeight: "800",
    color: COLORS.white,
    marginBottom: 16,
  },
  section: { padding: Spacing.four },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "700",
    color: COLORS.gray900,
    marginBottom: 16,
  },
  recentList: { gap: 12 },
  recentItem: { flexDirection: "row", alignItems: "center", gap: 10 },
  recentText: {
    fontSize: FontSizes.md,
    color: COLORS.gray600,
    fontWeight: "500",
  },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 16 },
  gridItem: {
    width: "47%",
    padding: 20,
    borderRadius: BorderRadius.lg,
    alignItems: "center",
    ...Shadows.sm,
    borderWidth: 1,
    borderColor: COLORS.gray100,
  },
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  catName: { fontSize: FontSizes.sm, fontWeight: "600", color: COLORS.gray800 },
});
