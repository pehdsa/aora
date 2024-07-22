import React from 'react';
import { View, Text } from 'react-native';
import { Stack } from 'expo-router';
import { colors } from '@/styles/colors';


export default function Auth() {
    return (
        <Stack
            screenOptions={{
                contentStyle: {
                    backgroundColor: colors.primary
                }
            }}
        >            
            <Stack.Screen name="sign-in" options={{ headerShown: false }} />
            <Stack.Screen name="sign-up" options={{ headerShown: false }} />
        </Stack>
    )
}