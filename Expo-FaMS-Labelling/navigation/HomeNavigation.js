// External imports
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { HeaderTitle } from '@react-navigation/elements';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Internal imports
import { HomeScreen, NextTaskScreen, FatigueDoubleListScreen } from '../screens/index';

const Stack = createStackNavigator();

function NavigationTabs() {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen 
                    name="FatigueScreen" 
                    component={FatigueDoubleListScreen} 
                    options={{
                        headerTitle: props => (
                          <HeaderTitle style={styles.headerTitle}>
                            Fatica Percepita
                          </HeaderTitle>
                        ),
                    }}
                />

                <Stack.Screen 
                    name="NextTaskScreen" 
                    component={NextTaskScreen} 
                    options={{
                        headerTitle: props => (
                          <HeaderTitle style={styles.headerTitle}>
                            Fatica Percepita
                          </HeaderTitle>
                        ),
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    headerTitle: {
        color: 'black',
        fontSize: 24,
    },
});

export default NavigationTabs;