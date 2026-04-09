import { Slot, Stack, useRouter, useSegments } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { useHydrate } from "@/hooks/useHydrate";
import { useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

function RootLayoutContent() {
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  const isFirstLaunch = useAppSelector((state) => state.app.isFirstLaunch);
  const segments = useSegments();
  const router = useRouter();

  useHydrate();

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) return;

    const inTabsGroup = segments[0] === "(tabs)";
    const isOnboarding = segments[0] === "onboarding";
    const isAuthPage =
      segments[0] === "sign-in" ||
      segments[0] === "sign-up" ||
      segments[0] === "verify-otp";

    if (isFirstLaunch) {
      if (!isOnboarding) router.replace("/onboarding");
    } else {
      if (!isAuthenticated) {
        if (!isAuthPage) router.replace("/sign-in");
      } else {
        if (
          isAuthPage ||
          isOnboarding ||
          segments.length === 0 ||
          segments[0] === "index"
        ) {
          router.replace("/(tabs)");
        }
      }
    }
  }, [isAuthenticated, isLoading, isFirstLaunch, segments]);

  if (isLoading) {
    return null; // Or a custom splash screen
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
      <Stack.Screen name="verify-otp" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RootLayoutContent />
        <Toast />
      </GestureHandlerRootView>
    </Provider>
  );
}
