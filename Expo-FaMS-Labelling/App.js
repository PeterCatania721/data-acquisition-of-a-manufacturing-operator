// External imports
import {useEffect, useState} from 'react';
import * as Notifications from 'expo-notifications';
import NetInfo from '@react-native-community/netinfo';

// Internal imports
import HomeNavigation from './src/navigation/HomeNavigation';
import { UserContext, ConnectionContext } from './src/contexts';


export default function App() {
  const [userId, setUserId] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Request permission to send push notification
    Notifications.requestPermissionsAsync().then((status) => {
      //console.log('Permission status:', status);
    });

    // Get if the user is connected to the internet
    const unsubscribe = NetInfo.addEventListener(state => {
        //console.log("Connection type", state.type);
        //console.log("Is connected?", state.isConnected);
        setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{userId, setUserId}}>
      <ConnectionContext.Provider value={{isConnected, setIsConnected}}>
        <HomeNavigation>
        </HomeNavigation>
      </ConnectionContext.Provider>
    </UserContext.Provider>
  );
}