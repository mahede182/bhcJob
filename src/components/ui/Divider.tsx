import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontSizes } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

interface DividerProps {
  text?: string;
}

export default function Divider({ text = "OR" }: DividerProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>{text}</Text>
      <View style={styles.line} />
    </View>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 16,
    },
    line: {
      flex: 1,
      height: 1,
      backgroundColor: colors.border,
    },
    text: {
      marginHorizontal: 12,
      fontSize: FontSizes.md,
      color: colors.textSecondary,
      fontWeight: "500",
    },
  });
