// External imports
import React, { useState } from 'react';
import { View, Dimensions, TouchableOpacity, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

// Intrenal imports
import {normalize} from '../utils/resizingUtils';

// Global variables
const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

function LoginPage ({ navigation }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: '1ce9eb44-0188-4b4b-829c-d1b72972e657', value: '1ce9eb44-0188-4b4b-829c-d1b72972e657'},
    {label: '34af5bca-be06-4f1f-a2bb-f228546fc558', value: '34af5bca-be06-4f1f-a2bb-f228546fc558'},
    {label: '6591c7f4-26a7-4e03-80fe-176a33f77ca4', value: '6591c7f4-26a7-4e03-80fe-176a33f77ca4'},
    {label: 'a9975884-1dbb-41af-a4c1-fc03b57c90e9', value: 'a9975884-1dbb-41af-a4c1-fc03b57c90e9'},
    {label: 'c453a020-1a2f-47aa-8ab3-a9600b535d24', value: 'c453a020-1a2f-47aa-8ab3-a9600b535d24'},
    {label: '8f7156a8-0c8e-4f05-9304-eed97a50d6d3', value: '8f7156a8-0c8e-4f05-9304-eed97a50d6d3'},
    {label: 'd4c25336-114d-4663-8034-77caa1eb5da5', value: 'd4c25336-114d-4663-8034-77caa1eb5da5'},
    {label: 'd6f9879b-9834-40f2-a435-11ccf3447ce3', value: 'd6f9879b-9834-40f2-a435-11ccf3447ce3'},
    {label: '0bdf6073-fd2c-4232-8c8b-cec09e192595', value: '0bdf6073-fd2c-4232-8c8b-cec09e192595'},
    {label: 'f1e368ad-76bb-403e-b2c4-32f73f300508', value: 'f1e368ad-76bb-403e-b2c4-32f73f300508'},
  ]);
  const [invalidId, setInvalidId] = useState(false);

  const handleLogin = () => {
    console.log(value);
    if (value === null) {
      setInvalidId(true);
      return;
    } else {
      setInvalidId(false);
    }

    navigation.navigate('Home', {id: value});
  }

  const handleRegister = () => {
    
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
          style={styles.button} 
          onPress={handleRegister}
        >
          <Text style={styles.buttonText}>Registrati</Text>
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
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: normalize(40, SCREEN_WIDTH),
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