import { BorderRadius, COLORS, Spacing } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray400,
        tabBarLabel: () => null,
        tabBarStyle: {
          position: 'absolute',
          marginHorizontal: Spacing.four,
          bottom: Platform.OS === 'ios' ? 30 : 24,
          left: 20,
          right: 20,
          height: 64,
          borderRadius: BorderRadius.lg,
          backgroundColor: 'rgba(255, 255, 255, 0.96)',
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.1,
          shadowRadius: 20,
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.3)',
          paddingBottom: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size + 4} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={size + 4} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="jobs"
        options={{
          tabBarIcon: ({ color, size }) => (
            <View style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: color === COLORS.primary ? "#fff" : COLORS.primary,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: -20,
              elevation: 4,
              shadowColor: COLORS.primary,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
            }}>
              <Ionicons
                name="briefcase"
                size={24}
                color={color === COLORS.primary ? COLORS.primary : '#FFF'}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" size={size + 4} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size + 4} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
