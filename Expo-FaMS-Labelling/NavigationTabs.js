// External imports
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Internal imports
import HomeScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen';

const Tab = createBottomTabNavigator();

export default function NavigationTabs() {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
}
