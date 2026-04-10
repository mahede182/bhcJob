import {
  BorderRadius,
  COLORS,
  FontSizes,
  Shadows,
  Spacing,
} from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import MenuItem from "@/components/ui/MenuItem";
import { BLOG } from "@/constants/api";
import { PROFILE_STATS } from "@/constants/data";
import ProfileStats from "@/components/profile/ProfileStats";
import { useTheme } from "@/hooks/useTheme";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logOut, selectCurrentUser } from "@/store/slices/authSlice";
import { storage } from "@/utils/storage";
import { showToast } from "@/utils/toast";

export default function ProfileScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const { colors } = useTheme();

  const handleSignOut = async () => {
    try {
      await storage.clearAll();
      dispatch(logOut());
      showToast({
        type: "info",
        title: "Signed Out",
        message: "You have been signed out successfully.",
      });
      router.replace("/sign-in");
    } catch {
      showToast({
        type: "error",
        title: "Error",
        message: "Something went wrong during sign out",
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
          title: "Error",
          message: "Unable to open blog link",
        });
      }
    } catch {
      showToast({
        type: "error",
        title: "Error",
        message: "Unable to open blog link",
      });
    }
  };

  const handleEditProfile = () => {
    // Navigate to edit profile
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
              <Text style={styles.name}>{user?.name || "Guest User"}</Text>
              <Text style={styles.email}>
                {user?.email || user?.phone || "No email provided"}
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
          <MenuItem icon="document-text-outline" title="My Resume" />
          <MenuItem icon="bookmark-outline" title="Saved Jobs" />
          <MenuItem icon="notifications-outline" title="Job Alerts" />
          <MenuItem icon="settings-outline" title="Settings" />
          <MenuItem icon="help-circle-outline" title="Help Center" />
          <MenuItem
            icon="newspaper-outline"
            title="Blog"
            onPress={handleOpenBlog}
          />
          <MenuItem
            icon="log-out-outline"
            title="Sign Out"
            color={COLORS.error}
            onPress={handleSignOut}
          />
        </View>
      </ScrollView>
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
});
