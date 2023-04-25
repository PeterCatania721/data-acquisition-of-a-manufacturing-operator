// External imports
import React, { useState, useEffect, useRef} from 'react';
import { View, Dimensions, TouchableOpacity, Text, StyleSheet, Animated} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Intrenal imports
import {normalize} from '../utils/resizingUtils';
import {fetchUsers, createUser} from '../utils/requestManager';

// Global variables
const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');
const LOGGED_USER_KEY = 'loggedUser';

function LoginPage ({ navigation }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [invalidId, setInvalidId] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);
  
  // when the screen is focused again, execute logout
  useEffect(() => {
    const logout = navigation.addListener('focus', () => {
      // Screen was agin  focused do something
      AsyncStorage.removeItem(LOGGED_USER_KEY);
      setLoggedUser(null);
      setValue(null);

      fetchUsers()
        .then(users => {
          setItems(users);
        })
        .catch(err => {throw err});
    });
    return logout;
  }, [navigation]);

  // on mount, get users from db
  useEffect(() => {
    // get logged user from async storage
    AsyncStorage.getItem(LOGGED_USER_KEY)
    .then(res => {
      if (res !== null) {
        setLoggedUser(res);
      }
    })

    fetchUsers()
      .then(users => {
        setItems(users);
      })
      .catch(err => {throw err});

  }, []);

  // when logged user is changed, save it in async storage
  // ang go to home screen
  useEffect(() => {
    if (loggedUser !== null && loggedUser !== undefined) {
      AsyncStorage.setItem(LOGGED_USER_KEY, loggedUser);
      navigation.navigate('Home', {userId: loggedUser});
    }
  }, [loggedUser]);

  const handleLogin = () => {
    if (value === null) {
      setInvalidId(true);
      return;
    }
    setInvalidId(false);

    // update logged user
    setLoggedUser(value);

    navigation.navigate('Home', {id: value});
  }

  const handleRegister = () => {
    //post create user, and than update users
    createUser()
      .then(userId => {
        setLoggedUser(userId);
      })
      .catch(err => {throw err});
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scegli il tuo ID</Text>

      {invalidId && <Text style={styles.errorMsg}>Seleziona un ID!</Text> }

      <DropDownPicker
        style={[styles.IdDropdown, invalidId && styles.invalidId]}
        dropDownContainerStyle={[styles.IdDropdown]}
        language="IT"
        open={open}
        value={value}
        items={items}
        searchable={true}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        textStyle={ { fontSize: normalize(20, SCREEN_WIDTH)} }
        mode="SIMPLE"
        listMode="SCROLLVIEW"

        labelStyle={ invalidId && styles.invalidId }
        labelContainerStyle={ invalidId && styles.invalidId }

        placeholderStyle={ invalidId && styles.invalidId }

        selectedItemLabelStyle={{ fontWeight: "bold" }}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Accedi</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.buttonRegister]} 
          onPress={handleRegister}
        >
          <Text style={[styles.buttonText,styles.buttonTextRegister]}>Registrati</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    fleyDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    width: '95%',
  },
  title: {
    fontSize: normalize(40, SCREEN_WIDTH),
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
  buttonContainer: {
    width: '100%',
    height: '20%',
    justifyContent: 'center',
    marginTop: 32,
  },
  button: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonRegister: {
    backgroundColor: 'white',
    borderColor: 'blue',
    borderWidth: 7,
    color: 'black',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: normalize(40, SCREEN_WIDTH),
  },
  buttonTextRegister: {
    color: 'blue',
  },
  IdDropdown: {
    width: '100%',
  },
  invalidId: {
    borderColor: "rgba(255, 0, 0, 0.5)",
  },
  errorMsg: {
    color: "red",
    fontSize: normalize(15, SCREEN_WIDTH),
    fontWeight: "bold",
    marginBottom: 8,
  },
}); 

export default LoginPage;