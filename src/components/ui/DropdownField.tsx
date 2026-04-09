import { BorderRadius, FontSizes, Shadows } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { type DropdownFieldProps } from "@/@types/ui.type";
import { useTheme } from "@/hooks/useTheme";

export default function DropdownField({
  label,
  value,
  options,
  onChange,
  required,
  placeholder = "Select option",
  icon = "chevron-down-outline",
}: DropdownFieldProps) {
  const [visible, setVisible] = useState(false);
  const { colors } = useTheme();

  const styles = createStyles(colors);

  const selectedLabel = options.find((o) => o.value === value)?.label;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>
      <TouchableOpacity
        style={styles.inputWrapper}
        onPress={() => setVisible(true)}
      >
        <Ionicons
          name="people-outline"
          size={18}
          color={colors.icon}
          style={styles.icon}
        />
        <Text style={[styles.text, !value && styles.placeholder]}>
          {selectedLabel || placeholder}
        </Text>
        <Ionicons name="chevron-down" size={16} color={colors.icon} />
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade">
        <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
          <View style={styles.dropdown}>
            <Text style={styles.dropdownTitle}>{label}</Text>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.option,
                    item.value === value && styles.optionSelected,
                  ]}
                  onPress={() => {
                    onChange(item.value);
                    setVisible(false);
                  }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      item.value === value && styles.optionTextSelected,
                    ]}
                  >
                    {item.label}
                  </Text>
                  {item.value === value && (
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color={colors.primary}
                    />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      marginBottom: 16,
    },
    label: {
      fontSize: FontSizes.sm,
      fontWeight: "600",
      color: colors.textSecondary,
      marginBottom: 6,
    },
    required: {
      color: colors.error,
    },
    inputWrapper: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.inputBg,
      borderRadius: BorderRadius.md,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 14,
      height: 48,
    },
    icon: {
      marginRight: 10,
    },
    text: {
      fontSize: FontSizes.md,
      color: colors.text,
      flex: 1,
    },
    placeholder: {
      color: colors.icon,
    },
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.45)",
      justifyContent: "center",
      paddingHorizontal: 32,
    },
    dropdown: {
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.xl,
      padding: 20,
      maxHeight: 320,
      ...Shadows.lg,
    },
    dropdownTitle: {
      fontSize: FontSizes.lg,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 16,
    },
    option: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 14,
      paddingHorizontal: 12,
      borderRadius: BorderRadius.md,
      marginBottom: 4,
    },
    optionSelected: {
      backgroundColor: colors.surfaceSelected,
    },
    optionText: {
      fontSize: FontSizes.md,
      color: colors.textSecondary,
      fontWeight: "500",
    },
    optionTextSelected: {
      color: colors.primary,
      fontWeight: "700",
    },
  });
