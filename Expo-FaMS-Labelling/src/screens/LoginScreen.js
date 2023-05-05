// External imports
import React, { useState, useEffect, useContext } from 'react';
import { View, Dimensions, TouchableOpacity, Text, StyleSheet, Animated} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Intrenal imports
import {normalize} from '../utils/resizingUtils';
import {fetchUsers, createUser} from '../utils/requestManager';
import { UserContext, ConnectionContext} from '../contexts.js';
import Constants from '../utils/constants.js';
import {getOfflineUsers} from '../utils/localStorage';

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
  const {isConnected} = useContext(ConnectionContext);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [errorInvalidID, setErrorInvalidId] = useState(null);
  
  // when the screen is focused again, execute logout
  useEffect(() => {
    const logout = navigation.addListener('focus', () => {
      // Screen was agin  focused do something
      AsyncStorage.removeItem(LOGGED_USER_KEY);

      if (isConnected) {
        fetchUsers()
          .then(users => {
            setItems(users);
          })
          .catch(err => {
            console.log("Error during fetch users: ", err);
          });
      } else {
        getOfflineUsers()
          .then(users => {
            setItems(users ? users : []);
          })
          .catch(err => {
            console.log("Error during get offline users: ", err);
          });
      }
    });

    setUserId(null);
    setErrorInvalidId(null);

    return logout;
  }, [navigation, isConnected]);

  // on mount, get users from db
  useEffect(() => {
    // get logged user from async storage
    AsyncStorage.getItem(LOGGED_USER_KEY)
      .then(res => {
        if (res !== null) {
          setUserId(res);
        }
      })

  }, []);

  // when logged user is changed, save it in async storage
  // ang go to home screen
  useEffect( () => {
    if (userId) {
      AsyncStorage.setItem(LOGGED_USER_KEY, userId);
      navigation.navigate('Home');
    }
  }, [userId]);

  const handleLogin = () => {
    if (value === null || errorInvalidID !== null) {
      setErrorInvalidId(errorInvalidID === null ? "Seleziona un ID!" : errorInvalidID);
      return;
    }
    setErrorInvalidId(null);

    // update logged user
    setUserId(value);

    createUser(value)
      .then(navigation.navigate('Home', {userId: value}))
      .catch(err => {throw err});
  }

  const handleRegister = () => {
    //post create user, and than update users
    createUser()
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
      setErrorInvalidId("Seleziona un ID!");
    } else if (isInvalid) {
      setErrorInvalidId("ID non valido!");
    } else {
      setErrorInvalidId(null);
    }
  }

  return (
    <>
      <View style={styles.topContainer}>
          <Text style={styles.topTextLabel}>Connessione Internet: <Text style={styles.boldText}>{isConnected ? "connesso" : "non conneso"}</Text></Text> 
      </View>
      <View style={styles.container}>
        

        <Text style={styles.title}>Scegli il tuo ID</Text>

        {(errorInvalidID !== null ) && <Text style={styles.errorMsg}>{errorInvalidID}</Text> }

        <DropDownPicker
          zIndex={1000}
          style={[styles.IdDropdown, errorInvalidID !== null && styles.invalidId]}
          dropDownContainerStyle={[styles.IdDropdown]}
          language="IT"
          open={open}
          value={value}
          items={items}
          searchable={true}
          onChangeSearchText={handleSearch}
          onChangeValue={() => {verifyId(value)}}
          addCustomItem={isConnected}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder='Iserisci il tuo ID'
          searchPlaceholder='Il tuo ID...'
          textStyle={ { fontSize: normalize(18, SCREEN_HEIGHT)} }
          mode="SIMPLE"
          listMode="FLATLIST"
          //dropDownComponent={FlatList}
          

          scrollViewProps={{
            nestedScrollEnabled: true,
            showsVerticalScrollIndicator: true,
            showsHorizontalScrollIndicator: true,
            persistentScrollbar: true,
            decelerationRate: "fast",
            scrollEnabled: true,
            automaticallyAdjustsScrollIndicatorInsets: true,
            contentContainerStyle: { flexGrow: 1, justifyContent: 'center', zIndex: 1000},
          }}

          labelStyle={[errorInvalidID !== null && styles.invalidId]}
          labelContainerStyle={ errorInvalidID !== null && styles.invalidId }
          placeholderStyle={ errorInvalidID !== null && styles.invalidId }
          DropDownPicker={styles.IdDropdownPicker}

          selectedItemLabelStyle={{ fontWeight: "bold"}}
          listItemLabelStyle={styles.idItemLabel}
          listItemContainerStyle={styles.idItemContainer}
          itemSeparator={true}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, errorInvalidID !== null && styles.disabledButton]} 
            onPress={handleLogin}
            disabled={errorInvalidID !== null}
          >
            <Text style={styles.buttonText}>Accedi</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.buttonRegister, !isConnected && styles.disabledButton]} 
            onPress={handleRegister}
            disabled={!isConnected}
          >
            <Text style={[styles.buttonText,styles.buttonTextRegister, !isConnected && styles.disabledText]}>Registrati</Text>
          </TouchableOpacity>
        </View>

      </View>
    </>
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
  buttonContainer: {
    zIndex: -100,
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
    fontSize: normalize(30, SCREEN_HEIGHT),
  },
  buttonTextRegister: {
    color: 'blue',
  },
  IdDropdown: {
    zIndex: 1000,
  },
  IdDropdownPicker: {
    zIndex: 1000,
  },
  idItemLabel: {
    fontSize: normalize(16, SCREEN_HEIGHT),
  },
  idItemContainer: {
    height: SCREEN_HEIGHT * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
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
  topContainer: {
    alignItems: 'center',
    width: '100%',
  },
  topTextLabel: {
    fontSize: normalize(12, SCREEN_HEIGHT),
    textAlign: 'left',
    marginTop: 5,
  },
  boldText: {
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: 'grey',
    borderColor: 'grey',
    disabled: true,
  },
  disabledText: {
    color: 'white',
  },
  disabledDropdown: {
    backgroundColor: 'grey',
    borderColor: 'white',
    disabled: true,
  },
}); 

export default LoginPage;