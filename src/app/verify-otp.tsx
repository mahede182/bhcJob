import Button from "@/components/ui/Button";
import Header from "@/components/ui/Header";
import { BorderRadius, COLORS, FontSizes, Shadows } from "@/constants/theme";
import { useVerifyOtpMutation } from "@/store/api/authApi";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/store/slices/authSlice";
import { storage } from "@/utils/storage";
import { showToast } from "@/utils/toast";

import { type VerifyOtpParams } from "@/@types/auth.type";
import { useTheme } from "@/hooks/useTheme";

export default function VerifyOtpScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const inputRef = useRef<TextInput>(null);
  const [verifyOtp, { isLoading: loading }] = useVerifyOtpMutation();
  const { phone } = useLocalSearchParams<VerifyOtpParams>();
  const [otp, setOtp] = useState("");
  const { colors } = useTheme();

  const handleVerify = async () => {
    if (otp.length < 4) {
      showToast({
        type: "error",
        title: "Error",
        message: "Please enter the complete 4-digit OTP",
      });
      return;
    }

    try {
      const response = await verifyOtp({ phone, otp }).unwrap();

      if (response.status && response.data) {
        const { token, user } = response.data;

        if (token) await storage.saveToken(token);
        if (user) await storage.saveUser(user);

        dispatch(setCredentials({ user, token }));

        showToast({
          type: "success",
          title: "Verified",
          message: "Phone verified successfully!",
        });
        setTimeout(() => router.replace("/(tabs)"), 800);
      } else {
        let errorMessage = response.message || "Invalid OTP code";

        if (response.error) {
          const firstKey = Object.keys(response.error)[0];
          if (firstKey && Array.isArray(response.error[firstKey])) {
            errorMessage = response.error[firstKey][0];
          }
        }

        showToast({
          type: "error",
          title: "Verification Failed",
          message: errorMessage,
        });
      }
    } catch (error: any) {
      showToast({
        type: "error",
        title: "Network Error",
        message:
          error?.data?.message || "Something went wrong during verification.",
      });
    }
  };

  const renderOtpBoxes = () => {
    return (
      <View style={styles.otpGrid}>
        {[0, 1, 2, 3].map((index) => {
          const isFocused = otp.length === index;
          const hasValue = otp.length > index;
          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              onPress={() => inputRef.current?.focus()}
              style={[
                styles.otpBox,
                { backgroundColor: colors.inputBg },
                hasValue && [
                  styles.otpBoxFilled,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                ],
                isFocused && [
                  styles.otpBoxFocused,
                  {
                    borderColor: colors.primary,
                    backgroundColor: colors.surface,
                  },
                ],
              ]}
            >
              <Text
                style={[
                  styles.otpText,
                  { color: colors.textMuted },
                  hasValue && [styles.otpTextFilled, { color: colors.primary }],
                ]}
              >
                {otp[index] || ""}
              </Text>
              {isFocused && (
                <Animated.View
                  entering={FadeInDown}
                  style={[
                    styles.focusIndicator,
                    { backgroundColor: colors.primary },
                  ]}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Header actionLabel="Sign In" actionRoute="/sign-in" showBack />

        <View style={styles.content}>
          <Animated.View
            entering={FadeInUp.delay(200).duration(800)}
            style={styles.illustrationWrap}
          >
            <View
              style={[styles.iconCircle, { backgroundColor: colors.primary }]}
            >
              <Ionicons
                name="shield-checkmark"
                size={40}
                color={COLORS.white}
              />
            </View>
            <View
              style={[
                styles.pulseBox,
                { backgroundColor: COLORS.primaryLight },
              ]}
            />
          </Animated.View>

          <View style={styles.headerTextWrap}>
            <Text style={[styles.title, { color: colors.text }]}>
              Verification Code
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              We have sent the OTP verification code to{"\n"}
              <Text style={[styles.phoneText, { color: colors.primary }]}>
                {phone}
              </Text>
            </Text>
          </View>

          <Animated.View
            entering={FadeInDown.delay(400).duration(800)}
            style={[styles.card, { backgroundColor: colors.background }]}
          >
            <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>
              Enter OTP
            </Text>

            {renderOtpBoxes()}

            <TextInput
              ref={inputRef}
              value={otp}
              onChangeText={(text) => setOtp(text.replace(/[^0-9]/g, ""))}
              keyboardType="number-pad"
              maxLength={4}
              style={styles.hiddenInput}
              autoFocus
            />

            <Button
              title="Verify & Continue"
              onPress={handleVerify}
              loading={loading}
              style={styles.button}
            />

            <View style={styles.footer}>
              <Text
                style={[styles.resendText, { color: colors.textSecondary }]}
              >
                Didn&apos;t receive code?
              </Text>
              <TouchableOpacity disabled={loading}>
                <Text style={[styles.resendBold, { color: colors.primary }]}>
                  Resend
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
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: "center",
    paddingTop: 20,
  },
  illustrationWrap: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    ...Shadows.lg,
  },
  pulseBox: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primaryLight,
    opacity: 0.3,
  },
  headerTextWrap: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: COLORS.gray900,
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: FontSizes.md,
    color: COLORS.gray600,
    textAlign: "center",
    lineHeight: 22,
  },
  phoneText: {
    color: COLORS.primary,
    fontWeight: "700",
  },
  card: {
    width: "100%",
    backgroundColor: "#F8F9FA",
    paddingVertical: 10,
  },
  inputLabel: {
    fontSize: FontSizes.sm,
    fontWeight: "700",
    color: COLORS.gray600,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 20,
    textAlign: "center",
  },
  otpGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  otpBox: {
    width: 65,
    height: 70,
    borderRadius: BorderRadius.lg,
    backgroundColor: COLORS.gray100,
    borderWidth: 1.5,
    borderColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    ...Shadows.sm,
  },
  otpBoxFocused: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
    ...Shadows.md,
  },
  otpBoxFilled: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.gray200,
  },
  otpText: {
    fontSize: 26,
    fontWeight: "800",
    color: COLORS.gray400,
  },
  otpTextFilled: {
    color: COLORS.primary,
  },
  focusIndicator: {
    position: "absolute",
    bottom: 12,
    width: 20,
    height: 3,
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
  hiddenInput: {
    position: "absolute",
    opacity: 0,
    width: 0,
    height: 0,
  },
  button: {
    height: 58,
    borderRadius: 18,
    ...Shadows.md,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 32,
    gap: 8,
  },
  resendText: {
    fontSize: FontSizes.md,
    color: COLORS.gray600,
  },
  resendBold: {
    fontSize: FontSizes.md,
    color: COLORS.primary,
    fontWeight: "800",
  },
});
