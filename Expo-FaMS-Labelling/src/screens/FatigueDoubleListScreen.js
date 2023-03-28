import React from 'react';
import { View,StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native';

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
  {key: '0', color: '#FFFFAA'},
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

function FatigueDoubleListScreen() {
  // calculate the height of the first element
  const windowHeight = Dimensions.get('window').height;
  const oddItemHeight = windowHeight * (1 / Math.ceil(data.length / 2));

  // Check if the length of the data array is odd
  const isOdd = data.length % 2 === 1;

  const half = isOdd ? Math.floor(data.length / 2) : data.length / 2;
  
  const leftColumn = data.slice(0, half).map((item) => (
    <FatigueListItem key={item.key} item={item} />
  ));
  const rightColumn = data.slice(half,data.length-1).map((item) => (
    <FatigueListItem key={item.key} item={item} />
  ));

  if(isOdd)
    return (
      <View style={styles.container}>
        <View style={styles.columnsContainer}>
          <View style={styles.column}>
          {leftColumn}
          </View>
          <View style={styles.column}>
            {rightColumn}
          </View>
        </View>
        <View style={[styles.oddItemContainer,{height: oddItemHeight}]}>
          <FatigueListItem style={styles.oddItem} item={data[data.length-1]} />
        </View>
      </View>
    );

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        {leftColumn}
      </View>
      <View style={styles.column}>
        {rightColumn}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,   
  },
  columnsContainer: {
    flex: 1,
    flexDirection: "row",
  },
  column: {
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
});

export default FatigueDoubleListScreen;