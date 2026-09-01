import { Tabs } from 'expo-router';
import React from 'react';
import { Footprints, BarChart3, User } from 'lucide-react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { 
          backgroundColor: '#0F172A', 
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: '#22C55E', // أخضر نيون
        tabBarInactiveTintColor: '#94A3B8', // رمادي
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'الرئيسية',
          tabBarIcon: ({ color, size }) => (
            <Footprints size={size || 24} color={color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="History"
        options={{
          title: 'السجل',
          tabBarIcon: ({ color, size }) => (
            <BarChart3 size={size || 24} color={color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="Profile"
        options={{
          title: 'الملف الشخصي',
          tabBarIcon: ({ color, size }) => (
            <User size={size || 24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}