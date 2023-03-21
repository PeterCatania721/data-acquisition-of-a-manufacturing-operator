import React from 'react';
import { View,StyleSheet, Text } from 'react-native';

const data = [
  {key: '10', color: '#FF0000'},
  {key: '9', color: '#FF1900'},
  {key: '8', color: '#FF3200'},
  {key: '7', color: '#FF4C00'},
  {key: '6', color: '#FF6600'},
  {key: '5', color: '#FF7F00'},
  {key: '4', color: '#FF9900'},
  {key: '3', color: '#FFB200'},
  {key: '2', color: '#FFCC00'},
  {key: '1', color: '#FFFF00'},
];


const styles = StyleSheet.create({
    container: {
        flex: 1, 
        flexDirection: "column",
    },
    item: {
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        boxShadow: '0px 2px 2px rgba(0,0,0,0.2)',
    },
    itemText: {
        fontSize: 40,
    },
})

export default function FatigueScreen() {
  const items = data.map(item => (
    <View key={item.key} style={[styles.item , {backgroundColor: item.color}]}>
      <Text style={styles.itemText}>{item.key}</Text>
    </View>
  ));

  return (
    <View style={styles.container}>
      {items}
    </View>
  );



};