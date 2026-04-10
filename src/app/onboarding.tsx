import Button from "@/components/ui/Button";
import { APP_INITIALIZED } from "@/constants/config";
import { COLORS, FontSizes, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { useAppDispatch } from "@/store/hooks";
import { setFirstLaunch } from "@/store/slices/appSlice";
import { isIOS } from "@/utils/device";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const { t } = useTranslation();

  const handleFinishOnboarding = async (
    targetRoute: "/sign-in" | "/sign-up",
  ) => {
    await AsyncStorage.setItem(APP_INITIALIZED, "1");
    dispatch(setFirstLaunch(false));
    router.push(targetRoute);
  };

  const handleGetStarted = () => handleFinishOnboarding("/sign-in");
  const handleCreateAccount = () => handleFinishOnboarding("/sign-up");

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.content}>
        <Animated.View
          entering={FadeInUp.delay(200).duration(800)}
          style={styles.logoWrapper}
        >
          <Image
            source={require("@/assets/logo.png")}
            style={styles.logo}
            contentFit="contain"
          />
        </Animated.View>
        <Animated.Text
          entering={FadeInDown.delay(600).duration(800)}
          style={[styles.title, { color: colors.text }]}
        >
          {t("home.welcome")}
        </Animated.Text>

        <Animated.Text
          entering={FadeInDown.delay(800).duration(800)}
          style={[styles.description, { color: colors.textSecondary }]}
        >
          {t("onboarding.description")}
        </Animated.Text>

        <Animated.View
          entering={FadeInDown.delay(1000).duration(800)}
          style={styles.footer}
        >
          <Button
            title={t("onboarding.getStarted")}
            onPress={handleGetStarted}
            style={styles.button}
          />

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleCreateAccount}
          >
            <Text
              style={[styles.secondaryButtonText, { color: colors.textMuted }]}
            >
              {t("onboarding.newHere")}{" "}
              <Text style={[styles.linkText, { color: colors.primary }]}>
                {t("onboarding.createAccountPrompt")}
              </Text>
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: Spacing.five,
  },
  logoWrapper: {
    width: 200,
    height: 60,
    marginBottom: 40,
    zIndex: 2,
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    paddingTop: 36,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
    color: COLORS.gray900,
    textAlign: "center",
    lineHeight: 38,
    letterSpacing: -0.8,
  },
  description: {
    fontSize: FontSizes.md,
    color: COLORS.gray500,
    textAlign: "center",
    marginTop: 16,
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  footer: {
    marginTop: "auto",
    marginBottom: isIOS ? 40 : 30,
    width: "100%",
    gap: 16,
  },
  button: {
    width: "100%",
  },
  secondaryButton: {
    alignItems: "center",
  },
  secondaryButtonText: {
    fontSize: FontSizes.sm,
    color: COLORS.gray600,
  },
  linkText: {
    color: COLORS.primary,
    fontWeight: "700",
  },
});
