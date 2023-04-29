// Internal imports
import HomeNavigation from './src/navigation/HomeNavigation';
import {useEffect} from 'react';
import * as Notifications from 'expo-notifications';


export default function App() {
  useEffect(() => {
    // Request permission to send push notification
    Notifications.requestPermissionsAsync().then((status) => {
      console.log('Permission status:', status);
    });
  }, []);

  return (
      <HomeNavigation>
      </HomeNavigation>
  );
}