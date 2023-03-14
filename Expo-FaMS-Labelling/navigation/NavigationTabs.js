// External imports
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

// Internal imports
import { HomeScreen, SettingsScreen } from '../screens/index';
import styles from '../styles';

const Tab = createBottomTabNavigator();

export default function NavigationTabs() {

    return (
        <NavigationContainer>
            <SafeAreaView style={styles.safeArea}>
                <Tab.Navigator
                    screenOptions={{
                        activeTintColor: 'tomato',
                        inactiveTintColor: 'gray',
                        labelStyle: {
                            fontSize: 12,
                            fontWeight: 'bold',
                        },
                        style: {
                            backgroundColor: 'white',
                        },
                    }}
                >
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="ios-home" color={color} size={size} />
                        ),
                        screenOptions: {
                            headerShown: false,
                        },
                    }}
                />
                <Tab.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="ios-settings" color={color} size={size} />
                        ),
                    }}
                />
                </Tab.Navigator>
            </SafeAreaView>
        </NavigationContainer>
    );
}