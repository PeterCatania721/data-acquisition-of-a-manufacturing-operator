// External imports
import { StyleSheet, Text, View } from 'react-native';

// Internal imports
import NavigationTabs from './NavigationTabs';


export default function App() {
  return (
    <View>
      <Text>Welcome to my React Native app!</Text>
      <NavigationTabs />
    </View>
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
