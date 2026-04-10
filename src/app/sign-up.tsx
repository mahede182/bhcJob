import Button from "@/components/ui/Button";
import DatePickerField from "@/components/ui/DatePickerField";
import Divider from "@/components/ui/Divider";
import DropdownField from "@/components/ui/DropdownField";
import Header from "@/components/ui/Header";
import Input from "@/components/ui/Input";
import { GENDER } from "@/constants/data";
import {
  BorderRadius,
  COLORS,
  FontSizes,
  Shadows,
  Spacing,
} from "@/constants/theme";
import { useRouter } from "expo-router";
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

import { BlueTop } from "@/components/ui/BlueTop";
import { useRegisterMutation } from "@/store/api/authApi";
import { showToast } from "@/utils/toast";

import { type SignUpForm } from "@/@types/auth.type";
import { useTheme } from "@/hooks/useTheme";

export default function SignUpScreen() {
  const router = useRouter();
  const [register, { isLoading: loading }] = useRegisterMutation();
  const [form, setForm] = useState<SignUpForm>({
    name: "",
    phone: "",
    gender: "",
    email: "",
    passport_number: "",
    password: "",
    confirm_password: "",
  });
  const [dob, setDob] = useState<Date | null>(null);
  const { colors } = useTheme();

  const updateField = (field: keyof typeof form) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSignUp = async () => {
    if (!form.phone || !form.password || !form.name || !form.gender) {
      showToast({
        type: "error",
        title: "Error",
        message: "Please fill in all required fields including Gender",
      });
      return;
    }

    if (form.password !== form.confirm_password) {
      showToast({
        type: "error",
        title: "Error",
        message: "Passwords do not match",
      });
      return;
    }

    try {
      const response = await register({
        ...form,
        dob: dob?.toISOString().split("T")[0],
      }).unwrap();

      if (response.status) {
        showToast({
          type: "success",
          title: "Account Created",
          message: "Please verify your phone number",
        });
        router.push({
          pathname: "/verify-otp",
          params: { phone: form.phone },
        });
      } else {
        // Handle application-level errors (status: false)
        const errorData = response.error;
        let errorMessage = "Registration failed";

        if (errorData) {
          // Extract the first error message from the validation object
          const firstKey = Object.keys(errorData)[0];
          if (firstKey && Array.isArray(errorData[firstKey])) {
            errorMessage = errorData[firstKey][0];
          }
        }

        showToast({
          type: "error",
          title: "Registration Failed",
          message: errorMessage,
        });
      }
    } catch (error: any) {
      showToast({
        type: "error",
        title: "Network Error",
        message: error?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Header actionLabel="Sign In" actionRoute="/sign-in" />
        <BlueTop />
        <View style={styles.cardWrapper}>
          <Animated.View
            entering={FadeInDown.duration(600)}
            style={[styles.card, { backgroundColor: colors.surface }]}
          >
            <Input
              label="Full Name"
              required
              placeholder="Enter your full name"
              icon="person-outline"
              value={form.name}
              onChangeText={updateField("name")}
            />

            <Input
              label="Mobile Number"
              required
              placeholder="01XXXXXXXXX"
              icon="phone-portrait-outline"
              keyboardType="phone-pad"
              value={form.phone}
              onChangeText={updateField("phone")}
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
                  onChange={updateField("gender")}
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
              onChangeText={updateField("email")}
            />

            <Input
              label="Passport Number"
              placeholder="Enter passport number"
              required
              icon="card-outline"
              value={form.passport_number}
              onChangeText={updateField("passport_number")}
            />

            <Input
              label="Password"
              required
              placeholder="Create a password"
              icon="lock-closed-outline"
              secureTextEntry
              value={form.password}
              onChangeText={updateField("password")}
            />

            <Input
              label="Confirm Password"
              required
              placeholder="Repeat your password"
              icon="lock-closed-outline"
              secureTextEntry
              value={form.confirm_password}
              onChangeText={updateField("confirm_password")}
            />

            <Button
              title="Sign Up"
              onPress={handleSignUp}
              loading={loading}
              style={{ marginTop: 10 }}
            />

            <Divider />

            <View style={styles.switchRow}>
              <Text
                style={[styles.switchText, { color: colors.textSecondary }]}
              >
                Already have an account?{" "}
              </Text>
              <TouchableOpacity onPress={() => router.push("/sign-in")}>
                <Text style={[styles.switchLink, { color: colors.primary }]}>
                  Sign In
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
  cardWrapper: {
    paddingHorizontal: Spacing.four,
    marginTop: -20,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BorderRadius.xl,
    padding: 20,
    ...Shadows.md,
  },
  row: {
    flexDirection: "row",
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  switchText: {
    fontSize: FontSizes.md,
    color: COLORS.gray600,
  },
  switchLink: {
    fontSize: FontSizes.md,
    color: COLORS.primary,
    fontWeight: "700",
  },
});
