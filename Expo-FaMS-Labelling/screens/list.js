import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, View,StatusBar} from 'react-native';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
    
     textAlign: 'center',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 60,
    },
  });


const FlatListBasics = ({navigation}) => {
    const onPressItem = () => {
      navigation.navigate('NewPage');
    };
  

  return (
    <View style={styles.container}>
      <FlatList
        data={[
          {key: '10', color: '#FF0000'},
          {key: '9', color: '#FF1300'},
          {key: '8', color: '#FF6600'},
          {key: '7', color: '#FF9900'},
          {key: '6', color: '#FFCC00'},
          {key: '5', color: '#FFFF00'},
          {key: '4', color: '#FFFF00'},
          {key: '3', color: '#FFFF00'},
          {key: '2', color: '#FFFF00'},
          {key: '1', color: '#FFFF00'},
        ]}
        //renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}

        renderItem={({ item }) => (
            <View style={[styles.item, { backgroundColor: item.color }]}>
              <Text style={styles.item}>{item.key}</Text>
            </View>
          )}
      />
    </View>
  );
};

export default FlatListBasics;