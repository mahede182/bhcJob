import { COLORS, FontSizes, Shadows, Spacing } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Linking,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { changeLanguage, LanguageCode, LANGUAGES } from "@/localization/i18n";
import {
  setTheme,
  THEME_STORAGE_KEY,
  ThemeMode,
} from "@/store/slices/themeSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ProfileStats from "@/components/profile/ProfileStats";
import MenuItem from "@/components/ui/MenuItem";
import { BLOG } from "@/constants/api";
import { PROFILE_STATS } from "@/constants/data";
import { useTheme } from "@/hooks/useTheme";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logOut, selectCurrentUser } from "@/store/slices/authSlice";
import { storage } from "@/utils/storage";
import { showToast } from "@/utils/toast";

export default function ProfileScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const { colors, themeMode } = useTheme();
  const { t, i18n } = useTranslation();
  const [langModalVisible, setLangModalVisible] = useState(false);
  const [themeModalVisible, setThemeModalVisible] = useState(false);

  const THEME_OPTIONS: { code: ThemeMode; name: string; icon: string }[] = [
    { code: "light", name: t("theme.light"), icon: "sunny-outline" },
    { code: "dark", name: t("theme.dark"), icon: "moon-outline" },
    { code: "system", name: t("theme.system"), icon: "phone-portrait-outline" },
  ];

  const handleSignOut = async () => {
    try {
      await storage.clearAll();
      dispatch(logOut());
      showToast({
        type: "info",
        title: t("profile.logout"),
        message: t("profile.logoutSuccess"),
      });
      router.replace("/sign-in");
    } catch {
      showToast({
        type: "error",
        title: t("common.error"),
        message: t("profile.logoutError"),
      });
    }
  };

  const handleOpenBlog = async () => {
    try {
      const url = BLOG;
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        showToast({
          type: "error",
          title: t("common.error"),
          message: t("profile.blogError"),
        });
      }
    } catch {
      showToast({
        type: "error",
        title: t("common.error"),
        message: t("profile.blogError"),
      });
    }
  };

  const handleEditProfile = () => {
    // Navigate to edit profile
  };

  const handleLanguagePress = () => {
    setLangModalVisible(true);
  };

  const handleThemePress = () => {
    setThemeModalVisible(true);
  };

  const handleSelectTheme = async (mode: ThemeMode) => {
    dispatch(setTheme(mode));
    await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
    setThemeModalVisible(false);
    showToast({
      type: "success",
      title: t("common.success"),
      message: t("theme.themeChanged"),
    });
  };

  const handleSelectLanguage = async (lang: LanguageCode) => {
    await changeLanguage(lang);
    setLangModalVisible(false);
    showToast({
      type: "success",
      title: t("common.success"),
      message: t("profile.languageChanged"),
    });
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Header */}
        <View style={[styles.header, { backgroundColor: colors.primary }]}>
          <View style={styles.profileInfo}>
            <View
              style={[
                styles.avatarWrapper,
                {
                  backgroundColor: COLORS.primaryLight,
                  borderColor: COLORS.white,
                },
              ]}
            >
              <Ionicons name="person" size={40} color={COLORS.primary} />
            </View>
            <View style={styles.nameSection}>
              <Text style={styles.name}>
                {user?.name || t("profile.guestUser")}
              </Text>
              <Text style={styles.email}>
                {user?.email || user?.phone || t("profile.noEmail")}
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.editButton, { backgroundColor: COLORS.gray100 }]}
              onPress={handleEditProfile}
            >
              <Ionicons
                name="create-outline"
                size={20}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Section */}
        <ProfileStats stats={PROFILE_STATS} />

        {/* Menu Section */}
        <View style={styles.menuContainer}>
          <MenuItem
            icon="document-text-outline"
            title={t("profile.myResume")}
          />
          <MenuItem icon="bookmark-outline" title={t("profile.savedJobs")} />
          <MenuItem
            icon="color-palette-outline"
            title={t("common.theme")}
            onPress={handleThemePress}
          />
          <MenuItem
            icon="language-outline"
            title={t("common.language")}
            onPress={handleLanguagePress}
          />
          <MenuItem
            icon="help-circle-outline"
            title={t("profile.helpCenter")}
          />
          <MenuItem
            icon="newspaper-outline"
            title={t("profile.blog")}
            onPress={handleOpenBlog}
          />
          <MenuItem
            icon="log-out-outline"
            title={t("common.logout")}
            color={COLORS.error}
            onPress={handleSignOut}
          />
        </View>
      </ScrollView>

      {/* Language Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={langModalVisible}
        onRequestClose={() => setLangModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[styles.modalContent, { backgroundColor: colors.surface }]}
          >
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                {t("common.language")}
              </Text>
              <TouchableOpacity onPress={() => setLangModalVisible(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
            {LANGUAGES.map((lang) => (
              <Pressable
                key={lang.code}
                style={[
                  styles.langItem,
                  i18n.language === lang.code && {
                    backgroundColor: colors.surfaceSelected,
                  },
                ]}
                onPress={() => handleSelectLanguage(lang.code)}
              >
                <Text style={[styles.langName, { color: colors.text }]}>
                  {lang.name}
                </Text>
                {i18n.language === lang.code && (
                  <Ionicons name="checkmark" size={20} color={colors.primary} />
                )}
              </Pressable>
            ))}
          </View>
        </View>
      </Modal>

      {/* Theme Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={themeModalVisible}
        onRequestClose={() => setThemeModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[styles.modalContent, { backgroundColor: colors.surface }]}
          >
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                {t("common.theme")}
              </Text>
              <TouchableOpacity onPress={() => setThemeModalVisible(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
            {THEME_OPTIONS.map((option) => (
              <Pressable
                key={option.code}
                style={[
                  styles.langItem,
                  themeMode === option.code && {
                    backgroundColor: colors.surfaceSelected,
                  },
                ]}
                onPress={() => handleSelectTheme(option.code)}
              >
                <Ionicons
                  name={option.icon as any}
                  size={20}
                  color={colors.primary}
                  style={{ marginRight: 12 }}
                />
                <Text style={[styles.langName, { color: colors.text }]}>
                  {option.name}
                </Text>
                {themeMode === option.code && (
                  <Ionicons name="checkmark" size={20} color={colors.primary} />
                )}
              </Pressable>
            ))}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: Spacing.four,
    paddingBottom: 30,
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    ...Shadows.sm,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: COLORS.white,
    ...Shadows.sm,
  },
  nameSection: {
    flex: 1,
    marginLeft: 20,
  },
  name: {
    fontSize: FontSizes.xxl,
    fontWeight: "800",
    color: COLORS.white,
    letterSpacing: -0.5,
  },
  email: {
    fontSize: FontSizes.md,
    color: COLORS.gray200,
    marginTop: 2,
    fontWeight: "500",
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.gray100,
    alignItems: "center",
    justifyContent: "center",
  },
  menuContainer: {
    marginTop: Spacing.five,
    paddingHorizontal: Spacing.four,
    gap: 4,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: FontSizes.xl,
    fontWeight: "700",
  },
  langItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    gap: 12,
  },
  langName: {
    flex: 1,
    fontSize: FontSizes.md,
    fontWeight: "500",
  },
});
