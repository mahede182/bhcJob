import { COLORS, Shadows } from "@/constants/theme";
import React from "react";
import { StyleSheet, View } from "react-native";

export const BlueTop = () => <View style={styles.blueTop} />;

const styles = StyleSheet.create({
  blueTop: {
    height: 100,
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    ...Shadows.sm,
  },
});
