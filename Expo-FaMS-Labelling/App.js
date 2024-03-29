// External imports
import {useEffect, useState} from 'react';
import * as Notifications from 'expo-notifications';
import NetInfo from '@react-native-community/netinfo';

// Internal imports
import HomeNavigation from './src/navigation/HomeNavigation';
import { UserContext, ConnectionContext } from './src/contexts';
import { initOfflineData, sendData } from './src/utils/localStorage';

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

  useEffect( () => {
    // init offline data
    if (isConnected) {
      const fetchData = async () => {

        const initDataPromise = initOfflineData()
          .catch(err => {
            console.log("Error during init offline data: \n", err);
            setIsConnected(false);
          });

        const sendDataPromise = sendData()
          .catch(err => {
            console.log("Error during sending data: \n", err);
            setIsConnected(false);
          });

        await Promise
          .race([ initDataPromise, sendDataPromise])
          .then(json => console.log('fetch delivered to server'))
          .catch(err => console.error('Cannot connect to server'))
      }
      
      fetchData()
        .catch(err => {
          console.log("Error during fetchind data: \n", err);
        });
    }
    
  }, [isConnected]);

  return (
    <UserContext.Provider value={{userId, setUserId}}>
      <ConnectionContext.Provider value={{isConnected, setIsConnected}}>
        <HomeNavigation>
        </HomeNavigation>
      </ConnectionContext.Provider>
    </UserContext.Provider>
  );
}