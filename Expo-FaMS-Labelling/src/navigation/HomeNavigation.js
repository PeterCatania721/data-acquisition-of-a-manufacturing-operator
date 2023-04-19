// External imports
import { NavigationContainer } from '@react-navigation/native';
import { HeaderTitle } from '@react-navigation/elements';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet} from 'react-native';

// Internal imports
import { LoginScreen, HomeScreen, NextTaskScreen, FatigueDoubleListScreen } from '../screens/index';

const Stack = createStackNavigator();

function HomeNavigation() {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen 
                    name="Login" 
                    component={LoginScreen} 
                    options={{
                        headerTitle: props => (
                          <HeaderTitle style={styles.headerTitle}>
                            Login
                          </HeaderTitle>
                        ),

                    }}
                />

                <Stack.Screen 
                    name="Home" 
                    component={HomeScreen} 
                    options={{
                        headerTitle: props => (
                          <HeaderTitle style={styles.headerTitle}>
                            Home
                          </HeaderTitle>
                        ),

                    }}
                />

                <Stack.Screen 
                    name="Fatica" 
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
                            Attivita Corrente
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

export default HomeNavigation;