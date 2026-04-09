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
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logOut, selectCurrentUser } from "@/store/slices/authSlice";
import { storage } from "@/utils/storage";
import Toast from "react-native-toast-message";

export default function ProfileScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

  const handleSignOut = async () => {
    try {
      await storage.clearAll();
      dispatch(logOut());
      Toast.show({
        type: "info",
        text1: "Signed Out",
        text2: "You have been signed out successfully.",
      });
      router.replace("/sign-in");
    } catch {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Something went wrong during sign out",
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
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Unable to open blog link",
        });
      }
    } catch {}
  };

  const handleEditProfile = () => {
    // Navigate to edit profile
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.profileInfo}>
            <View style={styles.avatarWrapper}>
              <Ionicons name="person" size={40} color={COLORS.primary} />
            </View>
            <View style={styles.nameSection}>
              <Text style={styles.name}>{user?.name || "Guest User"}</Text>
              <Text style={styles.email}>
                {user?.email || user?.phone || "No email provided"}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.editButton}
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
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Applied</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Interviews</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Offers</Text>
          </View>
        </View>

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
  statsRow: {
    flexDirection: "row",
    paddingHorizontal: Spacing.four,
    gap: 16,
    marginTop: -20,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: BorderRadius.lg,
    alignItems: "center",
    ...Shadows.md,
  },
  statValue: {
    fontSize: FontSizes.xl,
    fontWeight: "800",
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.gray500,
    marginTop: 4,
    textTransform: "uppercase",
  },
  menuContainer: {
    marginTop: Spacing.five,
    paddingHorizontal: Spacing.four,
    gap: 4,
  },
});
