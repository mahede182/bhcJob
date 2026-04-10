import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { FontSizes, BorderRadius } from "@/constants/theme";

import { type DatePickerFieldProps } from "@/@types/ui.type";
import { useTheme } from "@/hooks/useTheme";
import { isIOS, isAndroid } from "@/utils/device";

export default function DatePickerField({
  label,
  value,
  onChange,
  required,
  placeholder = "Select date",
}: DatePickerFieldProps) {
  const [show, setShow] = useState(false);
  const { colors, isDark } = useTheme();

  const styles = createStyles(colors);

  const handleChange = (_event: DateTimePickerEvent, selectedDate?: Date) => {
    if (isAndroid) {
      setShow(false);
    }
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  const formatDate = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>
      <TouchableOpacity
        style={styles.inputWrapper}
        onPress={() => setShow(true)}
      >
        <Ionicons
          name="calendar-outline"
          size={18}
          color={colors.icon}
          style={styles.icon}
        />
        <Text style={[styles.text, !value && styles.placeholder]}>
          {value ? formatDate(value) : placeholder}
        </Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={value || new Date(2000, 0, 1)}
          mode="date"
          display={isIOS ? "spinner" : "default"}
          onChange={handleChange}
          maximumDate={new Date()}
          themeVariant={isDark ? "dark" : "light"}
        />
      )}
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
  });
