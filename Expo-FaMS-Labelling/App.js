// External imports
import { StyleSheet, Text, View } from 'react-native';

// Internal imports
import NavigationTabs from './navigation/NavigationTabs';
import HomeNavigation from './navigation/HomeNavigation';
import ConfirmModal from './screens/ConfirmModel';


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
