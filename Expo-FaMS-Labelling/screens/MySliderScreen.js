import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function VerticalSlider() {
  const [value, setValue] = useState(0);

  const handleValueChange = (value) => {
    setValue(value);
  }

  const handlePress = () => {
    console.log(value);
  }

  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="#00ff00"
          maximumTrackTintColor="#000000"
          thumbTintColor="#ffffff"
          step={1}
          value={value}
          onValueChange={handleValueChange}
          vertical
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Stampa valore</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  sliderContainer: {
    width: 200,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '270deg'}],
  },
  slider: {
    width: 300,
    height: 40,
    transform: [{ rotate: '180deg'}],
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#0080ff',
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
  },
});
