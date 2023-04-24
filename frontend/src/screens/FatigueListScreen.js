import React from 'react';
import { View,StyleSheet, Text, TouchableOpacity } from 'react-native';

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
  {key: '1', color: '#FFFC00'},
  {key: '0', color: '#FFFF00'},
];

function FatigueListItem({ item }){

  function handlePress(){
    console.log('pressed: ' + item.key);
  }

  return (
    <TouchableOpacity onPress={handlePress} style={[styles.item , {backgroundColor: item.color}]}>
      <Text style={styles.itemText}>{item.key}</Text>
    </TouchableOpacity>
  );
}

function FatigueListScreen() {
  const items = data.map((item) => (
    <FatigueListItem key={item.key} item={item} />
  ));

  return (
    <View style={styles.container}>
      {items}
    </View>
  );
};

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
      borderTopColor: 'gray',
      borderTopWidth: 0,
      width: '100%',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 4,
  },
  itemText: {
      fontSize: 40,
  },
})

export default FatigueListScreen;