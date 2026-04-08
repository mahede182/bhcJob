import { BorderRadius, COLORS, FontSizes, Shadows, Spacing } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Button from '@/components/ui/Button';
import Divider from '@/components/ui/Divider';
import Header from '@/components/ui/Header';
import Input from '@/components/ui/Input';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignInScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // Temporary: just navigate to tabs
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Header actionLabel="Sign Up" actionRoute="/sign-up" />

        {/* Blue accent top */}
        <View style={styles.blueTop} />

        {/* Login Card */}
        <View style={styles.cardWrapper}>
          <Animated.View
            entering={FadeInDown.duration(600)}
            style={styles.card}
          >
            {/* User Icon */}
            <View style={styles.avatarRow}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={24} color={COLORS.primary} />
              </View>
              <Text style={styles.cardTitle}>Sign In</Text>
            </View>

            <Input
              label="Mobile Number"
              placeholder="01XXXXXXXXX"
              icon="phone-portrait-outline"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              icon="lock-closed-outline"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.forgotRow}>
              <Text style={styles.forgotText}>Forgot Your Password?</Text>
            </TouchableOpacity>

            <Button title="SIGN IN" onPress={handleSignIn} />

            <Divider />

            <View style={styles.switchRow}>
              <Text style={styles.switchText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/sign-up')}>
                <Text style={styles.switchLink}>Sign Up</Text>
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
  scroll: {
    flex: 1,
  },
  blueTop: {
    height: 100,
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    ...Shadows.sm,
  },
  cardWrapper: {
    paddingHorizontal: Spacing.four,
    marginTop: -20,
    marginBottom: Spacing.four,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BorderRadius.xl,
    padding: 24,
    ...Shadows.md,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: FontSizes.xxl,
    fontWeight: '800',
    color: COLORS.gray900,
    letterSpacing: -0.5,
  },
  forgotRow: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotText: {
    fontSize: FontSizes.sm,
    color: COLORS.primary,
    fontWeight: '600',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  switchText: {
    fontSize: FontSizes.sm,
    color: COLORS.gray600,
  },
  switchLink: {
    fontSize: FontSizes.sm,
    color: COLORS.primary,
    fontWeight: '700',
  },
});
