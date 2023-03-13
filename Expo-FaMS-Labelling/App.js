// External imports
import { StyleSheet, Text, View } from 'react-native';

// Internal imports
import NavigationTabs from './NavigationTabs';

export default function App() {
  return (
    <NavigationTabs />
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
