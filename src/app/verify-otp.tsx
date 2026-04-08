import Button from "@/components/ui/Button";
import Header from "@/components/ui/Header";
import Input from "@/components/ui/Input";
import { API } from "@/constants/api";
import {
  BorderRadius,
  COLORS,
  FontSizes,
  Shadows,
  Spacing,
} from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import Toast from "react-native-toast-message";

export default function VerifyOtpScreen() {
  const router = useRouter();
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!otp) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please enter the OTP",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(API.verifyOtp, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp }),
      });
      const data = await response.json();

      if (response.ok) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Phone verified successfully!",
        });
        setTimeout(() => router.push("/sign-in"), 1500);
      } else {
        Toast.show({
          type: "error",
          text1: "Verification Failed",
          text2: data.message || "Invalid OTP",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Header actionLabel="Sign In" actionRoute="/sign-in" />

        <View style={styles.cardWrapper}>
          <Animated.View
            entering={FadeInDown.duration(600)}
            style={styles.card}
          >
            <View style={styles.iconCircle}>
              <Ionicons
                name="shield-checkmark-outline"
                size={32}
                color={COLORS.primary}
              />
            </View>
            <Text style={styles.title}>Verify Phone</Text>
            <Text style={styles.subtitle}>Enter the OTP sent to {phone}</Text>

            <Input
              label="OTP Code"
              placeholder="Enter 4 digit code"
              icon="key-outline"
              keyboardType="number-pad"
              maxLength={4}
              value={otp}
              onChangeText={setOtp}
            />

            <Button
              title="Verify & Continue"
              onPress={handleVerify}
              loading={loading}
              style={{ marginTop: 20 }}
            />

            <TouchableOpacity style={styles.resend} disabled={loading}>
              <Text style={styles.resendText}>
                Didn&apos;t receive code?{" "}
                <Text style={styles.resendBold}>Resend</Text>
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  cardWrapper: {
    padding: Spacing.four,
    flex: 1,
    justifyContent: "center",
    marginTop: -40,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BorderRadius.xl,
    padding: 24,
    ...Shadows.md,
    alignItems: "center",
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: FontSizes.xxl,
    fontWeight: "800",
    color: COLORS.gray900,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: FontSizes.md,
    color: COLORS.gray500,
    textAlign: "center",
    marginBottom: 24,
  },
  resend: { marginTop: 20 },
  resendText: { fontSize: FontSizes.sm, color: COLORS.gray500 },
  resendBold: { color: COLORS.primary, fontWeight: "700" },
});
