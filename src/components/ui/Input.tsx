import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  type TextInputProps,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontSizes, BorderRadius, Spacing } from "@/constants/theme";

import { type InputProps } from "@/@types/ui.type";
import { useTheme } from "@/hooks/useTheme";

export default function Input({
  label,
  required,
  icon,
  error,
  secureTextEntry,
  ...rest
}: InputProps) {
  const [secure, setSecure] = useState(secureTextEntry ?? false);
  const { colors } = useTheme();

  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>
      <View style={[styles.inputContainer, error ? styles.inputError : null]}>
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color={colors.icon}
            style={styles.icon}
          />
        )}
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.icon}
          secureTextEntry={secure}
          {...rest}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setSecure(!secure)} hitSlop={8}>
            <Ionicons
              name={secure ? "eye-off-outline" : "eye-outline"}
              size={20}
              color={colors.icon}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      marginBottom: Spacing.three,
    },
    label: {
      fontSize: FontSizes.md,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 8,
    },
    required: {
      color: colors.error,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1.5,
      borderColor: colors.border,
      borderRadius: BorderRadius.lg,
      backgroundColor: colors.inputBg,
      paddingHorizontal: 16,
      height: 54,
    },
    inputError: {
      borderColor: colors.error,
    },
    icon: {
      marginRight: 12,
    },
    input: {
      flex: 1,
      fontSize: FontSizes.md,
      color: colors.text,
      fontWeight: "500",
    },
    errorText: {
      fontSize: FontSizes.sm,
      color: colors.error,
      marginTop: 6,
      fontWeight: "500",
    },
  });
