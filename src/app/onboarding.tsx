import Button from '@/components/ui/Button';
import { COLORS, FontSizes, Spacing } from '@/constants/theme';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animated.View entering={FadeInUp.delay(200).duration(800)} style={styles.logoWrapper}>
          <Image
            source={require('@/assets/logo.png')}
            style={styles.logo}
            contentFit="contain"
          />
        </Animated.View>
        <Animated.Text entering={FadeInDown.delay(600).duration(800)} style={styles.title}>
          Welcome to BHC Jobs
        </Animated.Text>

        <Animated.Text entering={FadeInDown.delay(800).duration(800)} style={styles.description}>
          Build your profile, explore and apply to your favourite jobs and get contracted by employers immediately.
        </Animated.Text>

        <Animated.View entering={FadeInDown.delay(1000).duration(800)} style={styles.footer}>
          <Button
            title="Get Started"
            onPress={() => router.push('/sign-in')}
            style={styles.button}
          />

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push('/sign-up')}
          >
            <Text style={styles.secondaryButtonText}>
              New here? <Text style={styles.linkText}>Create Account</Text>
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: Spacing.five,
  },
  graphicContainer: {
    flex: 1.2,
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  logoWrapper: {
    width: 200,
    height: 60,
    marginBottom: 40,
    zIndex: 2,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  illustrationWrapper: {
    width: width * 0.8,
    height: width * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle1: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    position: 'absolute',
    top: -20,
    left: -10,
  },
  circle2: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    position: 'absolute',
    bottom: 0,
    right: 10,
  },
  square: {
    width: 120,
    height: 120,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    transform: [{ rotate: '45deg' }],
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    paddingTop: 36,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: COLORS.gray900,
    textAlign: 'center',
    lineHeight: 38,
    letterSpacing: -0.8,
  },
  description: {
    fontSize: FontSizes.md,
    color: COLORS.gray500,
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  footer: {
    marginTop: 'auto',
    marginBottom: Platform.OS === 'ios' ? 40 : 30,
    width: '100%',
    gap: 16,
  },
  button: {
    width: '100%',
  },
  secondaryButton: {
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: FontSizes.sm,
    color: COLORS.gray600,
  },
  linkText: {
    color: COLORS.primary,
    fontWeight: '700',
  },
});
