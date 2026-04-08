import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, type TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FontSizes, BorderRadius, Spacing } from '@/constants/theme';

interface InputProps extends Omit<TextInputProps, 'style'> {
  label: string;
  required?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  error?: string;
  secureTextEntry?: boolean;
}

export default function Input({ label, required, icon, error, secureTextEntry, ...rest }: InputProps) {
  const [secure, setSecure] = useState(secureTextEntry ?? false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>
      <View style={[styles.inputContainer, error ? styles.inputError : null]}>
        {icon && <Ionicons name={icon} size={20} color={COLORS.gray400} style={styles.icon} />}
        <TextInput
          style={styles.input}
          placeholderTextColor={COLORS.gray400}
          secureTextEntry={secure}
          {...rest}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setSecure(!secure)} hitSlop={8}>
            <Ionicons name={secure ? 'eye-off-outline' : 'eye-outline'} size={20} color={COLORS.gray400} />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.three,
  },
  label: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: COLORS.gray800,
    marginBottom: 8,
  },
  required: {
    color: COLORS.error,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.gray200,
    borderRadius: BorderRadius.lg,
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    height: 54,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: FontSizes.md,
    color: COLORS.gray900,
    fontWeight: '500',
  },
  errorText: {
    fontSize: FontSizes.sm,
    color: COLORS.error,
    marginTop: 6,
    fontWeight: '500',
  },
});
