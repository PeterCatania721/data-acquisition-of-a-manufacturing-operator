// External imports
import React,{useState} from 'react';
import { View,StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native';
import { BlurView } from 'expo-blur';

// Internal imports
import ConfirmationModal from '../components/modals/ConfirmationModal';
import { TextInput } from 'react-native-gesture-handler';

const fatigueValues = [
  {key: '10', color: '#FF0000'},
  {key: '8', color: '#FF3200'},
  {key: '6', color: '#FF6600'},
  {key: '4', color: '#FF9900'},
  {key: '2', color: '#FFCC00'},
  {key: '9', color: '#FF1900'},
  {key: '7', color: '#FF4C00'},
  {key: '5', color: '#FF7F00'},
  {key: '3', color: '#FFB200'},
  {key: '1', color: '#FFFC00'},
  {key: '0', color: '#FFFFAA'},
];

function FatigueListItem({ item, onFatiguePress}){

  return (
    <TouchableOpacity 
      onPress={() => onFatiguePress(item)} 
      style={[styles.item , {backgroundColor: item.color}]}
    >
      <Text style={styles.itemText}>{item.key}</Text>
    </TouchableOpacity>
  );
}

function FatigueDoubleListScreen({ navigation }) {
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);
  const [clickedFatigueKey, setClickedFatigueKey] = useState(0);
  const [optionaText, setOptionalText] = React.useState('');

  function handleFatiguePress(item){
    setClickedFatigueKey(item.key);
    setConfirmationModalVisible(true);
  }

  function handleModalConfirm(){
    setConfirmationModalVisible(false);
    //go to the screen with task list
    navigation.navigate('NextTaskScreen');
  }

  function handleModalCancel(){
    setConfirmationModalVisible(false);
    setOptionalText('');
  }

  // calculate the height of the first element
  const windowHeight = Dimensions.get('window').height;
  const oddItemHeight = windowHeight * (1 / Math.ceil(fatigueValues.length / 2));

  // Check if the length of the fatigueValues array is odd
  const isOdd = fatigueValues.length % 2 === 1;

  const half = isOdd ? Math.floor(fatigueValues.length / 2) : fatigueValues.length / 2;
  
  const leftColumn = fatigueValues.slice(0, half).map((item) => (
    <FatigueListItem onFatiguePress={handleFatiguePress} key={item.key} item={item} />
  ));
  const rightColumn = fatigueValues.slice(half,fatigueValues.length-1).map((item) => (
    <FatigueListItem onFatiguePress={handleFatiguePress} key={item.key} item={item} />
  ));

  if(isOdd)
    return (
      <>
        <BlurView 
        intensity={confirmationModalVisible && 75} 
        tint="dark" 
        style={styles.absoluteBlurView}/>

        <View style={styles.container}>
          <ConfirmationModal 
            title="Fatica Percepita:"
            visible={confirmationModalVisible} 
            onConfirm={handleModalConfirm} 
            onCancel={handleModalCancel}
          >
            <Text style={styles.descriptionText}>
              {fatigueValues.find(item => item.key == clickedFatigueKey).key}
            </Text>
            <TextInput 
              style={styles.input} 
              onChangeText={setOptionalText} 
              value={optionaText} 
              placeholder="Commento Opzionale ..."
            />

          </ConfirmationModal>
          
          <View style={styles.columnsContainer}>
            <View style={styles.column}>
            {leftColumn}
            </View>
            <View style={styles.column}>
              {rightColumn}
            </View>
          </View>
          <View style={[styles.oddItemContainer,{height: oddItemHeight}]}>
            <FatigueListItem 
              style={styles.oddItem} 
              item={fatigueValues[fatigueValues.length-1]}
              onFatiguePress={handleFatiguePress} 
            />
          </View>
        </View>
      </>
    );

  return (
    <>
      <BlurView 
        intensity={confirmationModalVisible && 75} 
        tint="dark" 
        style={styles.absoluteBlurView}/>

      <View style={styles.container}>
        
        <View style={styles.column}>
          {leftColumn}
        </View>
        <View style={styles.column}>
          {rightColumn}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  absoluteBlurView: {
    position: 'absolute',
    
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
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
      borderTopColor: '#bfbf40',
      borderTopWidth: 1,
      borderColor: '#bfbf40',
      borderWidth: 1,
      width: '100%',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 4,
  },
  itemText: {
      fontSize: 40,
  },
  descriptionText: {
    fontSize: 30,
    marginTop: 10,
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
  },
  input: {
    height: 50,
    fontSize: 25,
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
    width: '100%',
  }
});

export default FatigueDoubleListScreen;