import React from 'react';
import { View, Text, Image } from 'react-native';
import { Tabs, Redirect } from 'expo-router';

import { colors } from '@/styles/colors';

import icons from "../../../constants/icons";

const TabIcon = ({ icon, color, name, focused }: { icon: any, color: string, name: string, focused: boolean }) => {
    return (
        <View className='items-center justify-center gap-1'>
            <Image 
                source={ icon } 
                resizeMode='contain'
                tintColor={color}
                className='size-6'
            />
            <Text className={`${ focused ? 'font-semibold' : "font-normal" } text-xs`} style={{ color: color }}>
                { name }
            </Text>
        </View>
    )
}

export default function Auth() {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: "#FFA001",
                tabBarInactiveTintColor: "#CDCDE0",
                tabBarStyle: {
                    backgroundColor: colors.primary,
                    paddingTop: 10,
                    borderTopWidth: 1,
                    borderTopColor: "#232533",
                    height: 84
                }
            }}
        >
            <Tabs.Screen 
                name='home'
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon 
                            icon={ icons.home }
                            color={color}
                            name="Home"
                            focused={focused}
                        />
                    )
                }}
            />
            <Tabs.Screen 
                name='create'
                options={{
                    title: "Create",
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon 
                            icon={ icons.plus }
                            color={color}
                            name="Create"
                            focused={focused}
                        />
                    )
                }}
            />
            <Tabs.Screen 
                name='bookmark'
                options={{
                    title: "Bookmark",
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon 
                            icon={ icons.bookmark }
                            color={color}
                            name="Bookmark"
                            focused={focused}
                        />
                    )
                }}
            />
            <Tabs.Screen 
                name='profile'
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon 
                            icon={ icons.profile }
                            color={color}
                            name="Profile"
                            focused={focused}
                        />
                    )
                }}
            />
        </Tabs>
    )
}