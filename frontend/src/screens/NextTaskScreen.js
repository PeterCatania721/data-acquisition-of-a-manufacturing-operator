// External imports
import React, {useState} from 'react';
import { Text, View, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';


// Internal imports
import ConfirmationModal from '../components/modals/ConfirmationModal';

function NextTaskListItem({ item, index, onTaskPress}){
    const buttonStyle = index === 0 ? styles.firstButton : styles.button;
    const buttonTextStyle = index === 0 ? styles.firstButtonText : styles.buttonText;

    // calculate the height of the first element
    const windowHeight = Dimensions.get('window').height;
    const elementHeight = windowHeight * 0.5;

    return (
      <View>
        <TouchableOpacity 
          onPress={onTaskPress}  
          style={[buttonStyle, index === 0 && {height: elementHeight}]}>

          <Text style={buttonTextStyle}>{item.title}</Text>

        </TouchableOpacity>
      </View>

    );
};

function NextTaskScreen() {
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);
  const [clickedItemId, setClickedItemId] = useState(1);

  const data = [
      { id: 1, title: 'pulire filtro dell\'aria della ventilazione nord' },
      { id: 2, title: 'produzione cushinetti 250mm' },
      { id: 3, title: 'pakaging degli scarti di produzione ' },
      { id: 4, title: 'Pulizia pavimenti' },
      { id: 5, title: 'Supervisionare tornio verticale' },
      { id: 6, title: 'Produzione super manafold' },
      { id: 7, title: 'Supervisionamento automazione viti' },
  ];

  function handleTaskPress(item){
    setClickedItemId(item.id);
    setConfirmationModalVisible(true);
  }

  function handleModalConfirm(){
    setConfirmationModalVisible(false);
  }

  function handleModalCancel(){
    setConfirmationModalVisible(false);
  }

  return (
    <>
      <BlurView 
        intensity={confirmationModalVisible && 75} 
        tint="dark" 
        style={styles.absoluteBlurView}/>

      <View style={styles.container}>

          <ConfirmationModal 
            title="Attività Corrente:"
            visible={confirmationModalVisible} 
            onConfirm={handleModalConfirm} 
            onCancel={handleModalCancel}
          >
            <Text style={styles.descriptionText}>
              {data.find(item => item.id === clickedItemId).title}
            </Text>
          </ConfirmationModal>

          <FlatList
            contentContainerStyle={styles.flatList}
            data={data}
            renderItem={({ item, index }) => 
              <NextTaskListItem item={item} index={index} onTaskPress={() => handleTaskPress(item)} />}
            keyExtractor={(item) => item.id.toString()}
          />
          
      </View>
    </>
  );
}

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
    position: 'relative',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  flatList: {
      backgroundColor: 'transparent',
  },
  button: {
      flex: 1,
      backgroundColor: '#9DC08B',
      padding: 20,
      marginVertical: 10,
      borderRadius: 10,
  },
  firstButton: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#609966',
      paddingHorizontal: 20,
      marginVertical: 10,
      borderRadius: 10,
  },
  firstButtonText: {
      fontSize: 25,
      color: '#000',
      fontWeight: '800',
      textAlign: 'center',
  },
  buttonText: {
      fontSize: 20,
      color: '#212',
      fontWeight: 'bold',
      textAlign: 'center',
  },
  descriptionText: {
    fontSize: 30,
    marginTop: 10,
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
  },
});

  export default NextTaskScreen;