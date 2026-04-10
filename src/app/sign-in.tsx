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
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { BlueTop } from "@/components/ui/BlueTop";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/store/slices/authSlice";
import { useLoginMutation } from "@/store/api/authApi";
import { storage } from "@/utils/storage";
import Toast from "react-native-toast-message";

export default function SignInScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading: loading }] = useLoginMutation();

  const handleSignIn = async () => {
    if (!phone || !password) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please enter phone and password",
      });
      return;
    }

    try {
      const response = await login({ phone, password }).unwrap();

      if (response.status && response.data) {
        const { token, user } = response.data;

        // Save to Secure Storage for persistence
        if (token) await storage.saveToken(token);
        if (user) await storage.saveUser(user);

        // Update Redux state for immediate access
        dispatch(setCredentials({ user, token }));

        Toast.show({
          type: "success",
          text1: "Welcome back!",
          text2: "Login successful",
        });
        router.replace("/(tabs)");
      } else {
        let errorMessage = response.message || "Invalid credentials";
        if (response.error) {
          const firstKey = Object.keys(response.error)[0];
          if (firstKey && Array.isArray(response.error[firstKey])) {
            errorMessage = response.error[firstKey][0];
          }
        }

        Toast.show({
          type: "error",
          text1: "Login Failed",
          text2: errorMessage,
        });
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Network Error",
        text2: error?.data?.message || "Something went wrong during login",
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Header actionLabel="Sign Up" actionRoute="/sign-up" />

        <BlueTop />

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

            <Button title="SIGN IN" onPress={handleSignIn} loading={loading} />

            <Divider />

            <View style={styles.switchRow}>
              <Text style={styles.switchText}>
                Don&apos;t have an account?{" "}
              </Text>
              <TouchableOpacity onPress={() => router.push("/sign-up")}>
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
    backgroundColor: COLORS.primaryLight,
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
