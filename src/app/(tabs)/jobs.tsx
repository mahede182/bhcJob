import type { Job } from '@/@types/api';
import JobCard from '@/components/home/JobCard';
import Header from '@/components/ui/Header';
import { API } from '@/constants/api';
import { COLORS, FontSizes, Shadows, Spacing } from '@/constants/theme';
import { useFetch } from '@/hooks/useFetch';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function JobsScreen() {
  const { data: jobs, loading } = useFetch<Job[]>(API.jobs);

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <View style={styles.content}>
        <View style={styles.titleSection}>
          <View style={styles.titleRow}>
            <View>
              <Text style={styles.title}>All Jobs</Text>
              <Text style={styles.subtitle}>{jobs?.length || 0} positions available</Text>
            </View>
            <TouchableOpacity style={styles.filterButton}>
              <Ionicons name="options-outline" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {loading ? (
          <ActivityIndicator color={COLORS.primary} style={{ marginTop: 40 }} />
        ) : (
          <FlatList
            data={jobs}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => <JobCard job={item} index={index} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    flex: 1,
  },
  titleSection: {
    paddingHorizontal: Spacing.four,
    paddingVertical: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.sm,
    borderWidth: 1,
    borderColor: COLORS.gray100,
  },
  title: {
    fontSize: FontSizes.xxl,
    fontWeight: '800',
    color: COLORS.gray900,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: FontSizes.md,
    color: COLORS.gray500,
    marginTop: 4,
    fontWeight: '500',
  },
  listContainer: {
    paddingBottom: 120,
  },
});
