import { BorderRadius, COLORS, FontSizes, Shadows, Spacing } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SAVED_JOBS = [
  { id: 1, title: 'Senior UX Designer', company: 'Google', location: 'Mountain View, CA', salary: '$120k - $180k' }
];

export default function FavoriteScreen() {
  return (
    <View style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Favorites</Text>
          <Text style={styles.subtitle}>2 saved jobs</Text>
        </View>

        <View style={styles.list}>
          {SAVED_JOBS.map((job) => (
            <TouchableOpacity key={job.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.companyIcon}>
                  <Ionicons name="business-outline" size={24} color={COLORS.primary} />
                </View>
                <View style={styles.headerInfo}>
                  <Text style={styles.jobTitle}>{job.title}</Text>
                  <Text style={styles.companyName}>{job.company}</Text>
                </View>
                <TouchableOpacity>
                  <Ionicons name="heart" size={22} color={COLORS.error} />
                </TouchableOpacity>
              </View>
              <View style={styles.cardFooter}>
                <View style={[styles.badge, { backgroundColor: COLORS.primaryLight }]}>
                  <Text style={[styles.badgeText, { color: COLORS.primary }]}>{job.salary}</Text>
                </View>
                <View style={[styles.badge, { backgroundColor: COLORS.gray100 }]}>
                  <Text style={[styles.badgeText, { color: COLORS.gray600 }]}>{job.location}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {SAVED_JOBS.length === 0 && (
          <View style={styles.empty}>
            <Ionicons name="heart-dislike-outline" size={60} color={COLORS.gray200} />
            <Text style={styles.emptyText}>No favorite jobs yet</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8F9FA' },
  header: {
    paddingTop: 60,
    paddingHorizontal: Spacing.four,
    backgroundColor: COLORS.primary,
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    ...Shadows.sm,
  },
  title: { fontSize: FontSizes.xxl, fontWeight: '800', color: COLORS.white },
  subtitle: { fontSize: FontSizes.md, color: COLORS.gray200, marginTop: 4 },
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
  cardHeader: { flexDirection: 'row', alignItems: 'flex-start' },
  companyIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: COLORS.gray50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerInfo: { flex: 1, marginLeft: 16 },
  jobTitle: { fontSize: FontSizes.lg, fontWeight: '700', color: COLORS.gray900 },
  companyName: { fontSize: FontSizes.sm, color: COLORS.gray500, marginTop: 2 },
  cardFooter: { flexDirection: 'row', marginTop: 16, gap: 8 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  badgeText: { fontSize: 10, fontWeight: '700' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 100 },
  emptyText: { fontSize: FontSizes.lg, color: COLORS.gray400, marginTop: 16, fontWeight: '600' },
});
