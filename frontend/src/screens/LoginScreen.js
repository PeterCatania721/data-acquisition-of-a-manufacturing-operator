import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import axios from 'axios';




function get(){


}

const LoginPage = (navigation) => {

  const [userId, setUserId] = useState('');

  /*
  const handleGenerateUid = () => {
    //const newUserId = uuidv4();
    const newUserId = '123456789';
    setUserId(newUserId);
  };
  */

  _storeData = async (value) => {
    try {
      await AsyncStorage.setItem(
        'TASKS',
        value,
      );
    } catch (error) {
      // Error saving data
    }
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('TASKS');
      if (value !== null) {
        // We have data!!
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  getAllKeys = async () => {
    let keys = []
    try {
      keys = await AsyncStorage.getAllKeys()
    } catch(e) {
      // read key error
    }
  
    console.log(keys)
    // example console.log result:
    // ['@MyApp_user', '@MyApp_key']
  }
  getMultiple = async () => {

    let values
    try {
      values = await AsyncStorage.multiGet(['@MyApp_user', '@MyApp_key'])
    } catch(e) {
      // read error
    }
    console.log(values)
  
    // example console.log output:
    // [ ['@MyApp_user', 'myUserValue'], ['@MyApp_key', 'myKeyValue'] ]
  }




  const [id, setId] = useState('');



  const handleLogin = () => {

    const user = axios.get('http://localhost:4000/api/v1/getUser');
    console.log(user._id);

   axios.post('http://localhost:4000/api/v1/createUser');

   // _storeData(id);
   // _retrieveData();
   // getAllKeys();

    // qui puoi aggiungere la logica per il login
   // console.log(`Login con id: ${id}`);

    
  }

  const handleClearText = () => {
     setUserId('');
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Accedi</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 16,
    padding: 8,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});



export default LoginPage;
