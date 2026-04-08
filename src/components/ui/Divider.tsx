import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FontSizes } from '@/constants/theme';

interface DividerProps {
  text?: string;
}

export default function Divider({ text = 'OR' }: DividerProps) {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>{text}</Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  text: {
    marginHorizontal: 12,
    fontSize: FontSizes.md,
    color: COLORS.gray400,
    fontWeight: '500',
  },
});
