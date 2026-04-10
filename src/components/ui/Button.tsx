import { BorderRadius, COLORS, FontSizes, Shadows } from "@/constants/theme";
import React from "react";
import { ActivityIndicator, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { type ButtonProps } from "@/@types/ui.type";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

export default function Button({
  title,
  onPress,
  variant = "primary",
  loading,
  style,
}: ButtonProps) {
  const isPrimary = variant === "primary";
  const isOutline = variant === "outline";
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onPressIn = () => {
    scale.value = withSpring(0.96);
  };

  const onPressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <AnimatedTouchableOpacity
      style={[
        styles.base,
        isPrimary && styles.primary,
        isOutline && styles.outline,
        variant === "ghost" && styles.ghost,
        animatedStyle,
        style,
      ]}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? COLORS.white : COLORS.primary} />
      ) : (
        <Text
          style={[
            styles.text,
            isPrimary && styles.primaryText,
            (isOutline || variant === "ghost") && styles.outlineText,
          ]}
        >
          {title}
        </Text>
      )}
    </AnimatedTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 16,
    borderRadius: BorderRadius.lg,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    ...Shadows.sm,
  },
  primary: {
    backgroundColor: COLORS.primary,
  },
  outline: {
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  ghost: {
    backgroundColor: "transparent",
    ...Shadows.sm, // remove shadow for ghost? actually user wants modern.
    shadowOpacity: 0,
    elevation: 0,
  },
  text: {
    fontSize: FontSizes.md,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  primaryText: {
    color: COLORS.white,
  },
  outlineText: {
    color: COLORS.primary,
  },
});
