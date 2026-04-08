import { BorderRadius, COLORS, FontSizes, Shadows, Spacing } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Toast from 'react-native-toast-message';

export default function ProfileScreen() {
  const router = useRouter();

  const handleSignOut = () => {
    Toast.show({
      type: 'info',
      text1: 'Signed Out',
      text2: 'You have been signed out successfully.',
    });
    router.replace('/sign-in');
  };

  return (
    <View style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.profileInfo}>
            <View style={styles.avatarWrapper}>
              <Ionicons name="person" size={40} color={COLORS.primary} />
            </View>
            <View style={styles.nameSection}>
              <Text style={styles.name}>John Doe</Text>
              <Text style={styles.email}>john.doe@example.com</Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="create-outline" size={20} color={COLORS.primary} />
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
            icon="log-out-outline"
            title="Sign Out"
            color={COLORS.error}
            onPress={handleSignOut}
          />
        </View>
      </ScrollView>
    </View>
  );
}

function MenuItem({
  icon,
  title,
  color = COLORS.gray900,
  onPress
}: {
  icon: any,
  title: string,
  color?: string,
  onPress?: () => void
}) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        <View style={styles.menuIconWrapper}>
          <Ionicons name={icon} size={20} color={color} />
        </View>
        <Text style={[styles.menuTitle, { color }]}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={COLORS.gray300} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F8F9FA',
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
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
    fontWeight: '800',
    color: COLORS.white,
    letterSpacing: -0.5,
  },
  email: {
    fontSize: FontSizes.md,
    color: COLORS.gray200,
    marginTop: 2,
    fontWeight: '500',
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.four,
    gap: 16,
    marginTop: -20,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    ...Shadows.md,
  },
  statValue: {
    fontSize: FontSizes.xl,
    fontWeight: '800',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.gray500,
    marginTop: 4,
    textTransform: 'uppercase',
  },
  menuContainer: {
    marginTop: Spacing.five,
    paddingHorizontal: Spacing.four,
    gap: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: BorderRadius.lg,
    marginBottom: 8,
    ...Shadows.sm,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  menuIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.gray50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTitle: {
    fontSize: FontSizes.md,
    fontWeight: '600',
  },
});
