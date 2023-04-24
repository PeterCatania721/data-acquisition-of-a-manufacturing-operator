import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeNavigation from './src/navigation/HomeNavigation.js';
import LoginPage from './src/screens/LoginScreen.js';
import LogoutPage from './src/screens/LogoutScreen.js';


export default function App() {
  return (

<LoginPage/>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
