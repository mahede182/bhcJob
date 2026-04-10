import {
  BorderRadius,
  COLORS,
  FontSizes,
  Shadows,
  Spacing,
} from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import Header from "@/components/ui/Header";
import Input from "@/components/ui/Input";
import { useTheme } from "@/hooks/useTheme";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { BlueTop } from "@/components/ui/BlueTop";
import { useLoginMutation } from "@/store/api/authApi";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/store/slices/authSlice";
import { storage } from "@/utils/storage";
import { showToast } from "@/utils/toast";

export default function SignInScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading: loading }] = useLoginMutation();
  const { colors } = useTheme();
  const { t } = useTranslation();

  const handleSignIn = async () => {
    if (!phone || !password) {
      showToast({
        type: "error",
        title: t("common.error"),
        message: t("auth.pleaseEnterPhonePassword"),
      });
      return;
    }

    try {
      const response = await login({ phone, password }).unwrap();

      if (response.status && response.data) {
        const { token, user } = response.data;

        if (token) await storage.saveToken(token);
        if (user) await storage.saveUser(user);

        dispatch(setCredentials({ user, token }));

        showToast({
          type: "success",
          title: t("common.welcomeBack"),
          message: t("auth.loginSuccess"),
        });
        router.replace("/(tabs)");
      } else {
        let errorMessage = response.message || t("auth.invalidCredentials");
        if (response.error) {
          const firstKey = Object.keys(response.error)[0];
          if (firstKey && Array.isArray(response.error[firstKey])) {
            errorMessage = response.error[firstKey][0];
          }
        }

        showToast({
          type: "error",
          title: t("auth.loginFailed"),
          message: errorMessage,
        });
      }
    } catch (error: any) {
      showToast({
        type: "error",
        title: t("auth.networkError"),
        message: error?.data?.message || t("auth.somethingWentWrong"),
      });
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Header actionLabel={t("auth.signUp")} actionRoute="/sign-up" />

        <BlueTop />

        <View style={styles.cardWrapper}>
          <Animated.View
            entering={FadeInDown.duration(600)}
            style={[styles.card, { backgroundColor: colors.surface }]}
          >
            {/* User Icon */}
            <View style={styles.avatarRow}>
              <View
                style={[
                  styles.avatar,
                  { backgroundColor: colors.surfaceSelected },
                ]}
              >
                <Ionicons name="person" size={24} color={colors.primary} />
              </View>
              <Text style={[styles.cardTitle, { color: colors.text }]}>
                {t("auth.signIn")}
              </Text>
            </View>

            <Input
              label={t("auth.mobileNumber")}
              placeholder="01XXXXXXXXX"
              icon="phone-portrait-outline"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />

            <Input
              label={t("auth.password")}
              placeholder={t("auth.password")}
              icon="lock-closed-outline"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.forgotRow}>
              <Text style={[styles.forgotText, { color: colors.primary }]}>
                {t("auth.forgotPassword")}
              </Text>
            </TouchableOpacity>

            <Button
              title={t("auth.signIn").toUpperCase()}
              onPress={handleSignIn}
              loading={loading}
            />

            <Divider />

            <View style={styles.switchRow}>
              <Text
                style={[styles.switchText, { color: colors.textSecondary }]}
              >
                {t("auth.dontHaveAccount")}{" "}
              </Text>
              <TouchableOpacity onPress={() => router.push("/sign-up")}>
                <Text style={[styles.switchLink, { color: colors.primary }]}>
                  {t("auth.signUp")}
                </Text>
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
    backgroundColor: "#F8F9FA",
  },
  scroll: {
    flex: 1,
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
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.gray100,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: FontSizes.xxl,
    fontWeight: "800",
    color: COLORS.gray900,
    letterSpacing: -0.5,
  },
  forgotRow: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  forgotText: {
    fontSize: FontSizes.sm,
    color: COLORS.primary,
    fontWeight: "600",
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  switchText: {
    fontSize: FontSizes.sm,
    color: COLORS.gray600,
  },
  switchLink: {
    fontSize: FontSizes.sm,
    color: COLORS.primary,
    fontWeight: "700",
  },
});
