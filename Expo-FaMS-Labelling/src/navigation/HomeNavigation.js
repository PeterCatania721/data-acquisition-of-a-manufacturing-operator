// External imports
import { NavigationContainer } from '@react-navigation/native';
import { HeaderTitle } from '@react-navigation/elements';
import { createStackNavigator } from '@react-navigation/stack';
import {React} from 'react';
import {StyleSheet, Dimensions} from 'react-native';

// Internal imports
import { LoginScreen, HomeScreen, NextTaskScreen, FatigueDoubleListScreen, StartTaskScreen } from '../screens/index';
import {normalize} from '../utils/resizingUtils';

// Global variables
const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');
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
                        headerBackTitle: 'logout',
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
                            Attività
                          </HeaderTitle>
                        ),
                    }}
                />

                <Stack.Screen 
                    name="StartTaskScreen" 
                    component={StartTaskScreen} 
                    options={{
                        headerTitle: props => (
                          <HeaderTitle style={styles.headerTitle}>
                            Inizia Attività
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
        fontSize: normalize(23, SCREEN_WIDTH),
    },
});

export default HomeNavigation;