import {
  type TextInputProps,
  type TouchableOpacityProps,
  type ViewProps,
} from "react-native";
import { type Ionicons } from "@expo/vector-icons";

export interface InputProps extends TextInputProps {
  label: string;
  required?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  error?: string;
  secureTextEntry?: boolean;
}

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: "primary" | "outline" | "ghost";
  loading?: boolean;
}

export interface MenuItemProps extends TouchableOpacityProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  color?: string;
}

export interface HeaderProps extends ViewProps {
  title?: string;
  actionLabel?: string;
  actionRoute?: string;
  showBack?: boolean;
}

export interface SectionHeaderProps extends ViewProps {
  title: string;
  onViewAll?: () => void;
}

export interface DatePickerFieldProps extends ViewProps {
  label: string;
  value: Date | null;
  onChange: (date: Date) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
}

export interface DropdownOption {
  label: string;
  value: string;
}

export interface DropdownFieldProps extends ViewProps {
  label: string;
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  icon?: string;
}
