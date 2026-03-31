import React from "react"
import {Tabs} from "expo-router"
import {Ionicons} from "@expo/vector-icons";

export default function TabLayout()
{
    return <Tabs
    screenOptions={{
        tabBarActiveTintColor: '#00a7ff',
        headerShown: false,
        tabBarInactiveTintColor: '#808080'
    }}>
        <Tabs.Screen
            name={'index'}
            options={{
                title: 'Training',
                tabBarIcon: ({color, size}) => (
                    <Ionicons name='fitness' size={size} color={color}/>
                )
            }}
        />

        <Tabs.Screen
            name={'stats'}
            options={{
                title: 'Stats',
                tabBarIcon: ({color, size}) => (
                    <Ionicons name='stats-chart' size={size} color={color}/>
                )
            }}
        />

        <Tabs.Screen
            name={'profile'}
            options={{
                title: 'Profile',
                tabBarIcon: ({color, size}) => (
                    <Ionicons name='person' size={size} color={color}/>
                )
            }}
        />
    </Tabs>
}