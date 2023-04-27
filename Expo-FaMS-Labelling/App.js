import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import NetInfo from '@react-native-community/netinfo';

export default function App() {

  const [data, setData] = useState(null);

  NetInfo.addEventListener(state => {
    if (state.isConnected) {
      console.log('Il dispositivo è connesso a internet');
    } else {
      console.log('Il dispositivo non è connesso a internet');
    }
  });

    
  React.useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
    });
    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>ciao</Text>
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
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});