import Button from '@/components/ui/Button';
import DatePickerField from '@/components/ui/DatePickerField';
import Divider from '@/components/ui/Divider';
import DropdownField from '@/components/ui/DropdownField';
import Header from '@/components/ui/Header';
import Input from '@/components/ui/Input';
import { GENDER } from '@/constants/data';
import { BorderRadius, COLORS, FontSizes, Shadows, Spacing } from '@/constants/theme';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignUpScreen() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    gender: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [dob, setDob] = useState<Date | null>(null);

  const updateField = (field: keyof typeof form) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSignUp = () => {
    // Temporary: just navigate to tabs
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <Header actionLabel="Sign In" actionRoute="/sign-in" />

        <View style={styles.titleSection}>
          <Text style={styles.welcomeText}>Create Account</Text>
        </View>

        {/* Form Card */}
        <View style={styles.cardWrapper}>
          <Animated.View entering={FadeInDown.duration(600)} style={styles.card}>
            <Input
              label="Full Name"
              required
              placeholder="Enter your full name"
              icon="person-outline"
              value={form.fullName}
              onChangeText={updateField('fullName')}
            />

            <Input
              label="Mobile Number"
              required
              placeholder="01XXXXXXXXX"
              icon="phone-portrait-outline"
              keyboardType="phone-pad"
              value={form.phone}
              onChangeText={updateField('phone')}
            />

            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <DatePickerField
                  label="Date of Birth"
                  value={dob}
                  onChange={setDob}
                  placeholder="Select date"
                />
              </View>
              <View style={{ width: 16 }} />
              <View style={{ flex: 1 }}>
                <DropdownField
                  label="Gender"
                  value={form.gender}
                  options={GENDER}
                  onChange={updateField('gender')}
                  placeholder="Select"
                />
              </View>
            </View>

            <Input
              label="Email Address"
              placeholder="example@mail.com"
              icon="mail-outline"
              keyboardType="email-address"
              autoCapitalize="none"
              value={form.email}
              onChangeText={updateField('email')}
            />

            <Input
              label="Password"
              required
              placeholder="Create a password"
              icon="lock-closed-outline"
              secureTextEntry
              value={form.password}
              onChangeText={updateField('password')}
            />

            <Input
              label="Confirm Password"
              required
              placeholder="Repeat your password"
              icon="lock-closed-outline"
              secureTextEntry
              value={form.confirmPassword}
              onChangeText={updateField('confirmPassword')}
            />

            <Button
              title="Register Now"
              onPress={handleSignUp}
              style={{ marginTop: 10 }}
            />

            <Divider />

            <View style={styles.switchRow}>
              <Text style={styles.switchText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/sign-in')}>
                <Text style={styles.switchLink}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  titleSection: {
    paddingHorizontal: Spacing.four,
    paddingTop: 20,
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: FontSizes.xxl * 1.2,
    fontWeight: '800',
    color: COLORS.gray900,
    letterSpacing: -1,
  },
  cardWrapper: {
    paddingHorizontal: Spacing.four,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BorderRadius.xl,
    padding: 20,
    ...Shadows.md,
  },
  cardTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: COLORS.gray800,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
    paddingLeft: 12,
  },
  row: {
    flexDirection: 'row',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchText: {
    fontSize: FontSizes.md,
    color: COLORS.gray500,
  },
  switchLink: {
    fontSize: FontSizes.md,
    color: COLORS.primary,
    fontWeight: '700',
  },
});
