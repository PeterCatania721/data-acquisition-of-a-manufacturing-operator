// External imports
import React, { useState, useEffect, useContext } from 'react';
import { View, Dimensions, TouchableOpacity, Text, StyleSheet, Animated} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Intrenal imports
import {normalize} from '../utils/resizingUtils';
import {fetchUsers, createUser} from '../utils/requestManager';
import { UserContext } from '../contexts.js';
import Constants from '../utils/constants.js';

// Global variables
const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');
const {
  LOGGED_USER_KEY,
  UUID_REGEX,
} = Constants;


function LoginPage ({ navigation }) {
  const {userId, setUserId} = useContext(UserContext);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [invalidId, setInvalidId] = useState(false);
  const [errorInvalidID, setErrorInvalidID] = useState(null);
  
  // when the screen is focused again, execute logout
  useEffect(() => {
    const logout = navigation.addListener('focus', () => {
      // Screen was agin  focused do something
      AsyncStorage.removeItem(LOGGED_USER_KEY);
      setUserId(null);

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
        setUserId(res);
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
  useEffect( () => {
    if (userId !== null && userId !== undefined) {
      AsyncStorage.setItem(LOGGED_USER_KEY, userId);
      navigation.navigate('Home');
    }
  }, [userId]);

  const handleLogin = () => {
    if (value === null || errorInvalidID !== null) {
      setErrorInvalidID(errorInvalidID === null ? "Seleziona un ID!" : errorInvalidID);
      return;
    }
    setInvalidId(false);

    // update logged user
    setUserId(value);

    createUser(value)
      .then(id => {
        navigation.navigate('Home', {userId: value});
      })
      .catch(err => {throw err});
  }

  const handleRegister = () => {
    //post create user, and than update users
    createUser(null)
      .then(id => {
        setUserId(id);
      })
      .catch(err => {throw err});
  }

  const handleSearch = (text) => {
    // put only the check right to the custom id if id is valid
    setValue(UUID_REGEX.test(text) ? text : null);
  }

  const verifyId = (id) => {
    const isInvalid = !UUID_REGEX.test(id);

    if(id === null || id === undefined || id === "") {
      setErrorInvalidID("Seleziona un ID!");
    } else if (isInvalid) {
      setErrorInvalidID("ID non valido!");
    } else {
      setErrorInvalidID(null);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scegli il tuo ID</Text>

      {errorInvalidID !== null && <Text style={styles.errorMsg}>{errorInvalidID}</Text> }

      <DropDownPicker
        zIndex={1000}
        style={[styles.IdDropdown, invalidId && styles.invalidId]}
        dropDownContainerStyle={[styles.IdDropdown]}
        language="IT"
        open={open}
        value={value}
        items={items}
        searchable={true}
        onChangeSearchText={handleSearch}
        onChangeValue={() => {verifyId(value)}}
        addCustomItem={true}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder='Iserisci il tuo ID'
        searchPlaceholder='Il tuo ID...'
        textStyle={ { fontSize: normalize(20, SCREEN_WIDTH)} }
        mode="SIMPLE"
        listMode="SCROLLVIEW"

        labelStyle={[invalidId && styles.invalidId]}
        labelContainerStyle={ invalidId && styles.invalidId }


        placeholderStyle={ invalidId && styles.invalidId }

        selectedItemLabelStyle={{ fontWeight: "bold"}}
        listItemLabelStyle={styles.idItemLabel}
        itemSeparator={true}
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
    zIndex: -1,
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
  idItemLabel: {
    fontSize: normalize(25, SCREEN_WIDTH),
    paddingVertical: 2,
    height: 50,
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