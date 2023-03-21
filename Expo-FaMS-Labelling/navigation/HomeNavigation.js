// External imports
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

// Internal imports
import { HomeScreen, NextTaskScreen, FatigueScreen } from '../screens/index';
import styles from '../styles';

const Stack = createStackNavigator();

export default function NavigationTabs() {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="FatigueScreen" component={FatigueScreen} />
                <Stack.Screen name="NextTaskScreen" component={NextTaskScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}