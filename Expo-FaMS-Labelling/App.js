// Internal imports
import HomeNavigation from './src/navigation/HomeNavigation';
import {useEffect, useState} from 'react';
import * as Notifications from 'expo-notifications';
import { UserContext } from './src/contexts';


export default function App() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Request permission to send push notification
    Notifications.requestPermissionsAsync().then((status) => {
      console.log('Permission status:', status);
    });
  }, []);

  return (
    <UserContext.Provider value={{userId, setUserId}}>
      <HomeNavigation>
      </HomeNavigation>
    </UserContext.Provider>
  );
}