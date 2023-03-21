// External imports
import { StyleSheet, Text, View } from 'react-native';

// Internal imports
import HomeNavigation from './navigation/HomeNavigation';


export default function App() {
  return (
    <HomeNavigation>
    </HomeNavigation>
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
