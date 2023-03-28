// External imports
import React, {useState} from 'react';
import { Text, View, FlatList, Modal, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

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
    console.log('pressed: ' + item.title);
    setConfirmationModalVisible(true);
  }

  function handleModalConfirm(){
    console.log('confirmed');
    setConfirmationModalVisible(false);
  }

  function handleModalCancel(){
    console.log('cancelled');
    setConfirmationModalVisible(false);
  }

  return (
      <View style={styles.container}>
          <ConfirmationModal 
            title="Conferma attività"
            visible={confirmationModalVisible} 
            onConfirm={handleModalConfirm} 
            onCancel={handleModalCancel}
          >
            <Text style={styles.descriptionText}>Pulire Vetro</Text>
          </ConfirmationModal>

          <FlatList
            contentContainerStyle={styles.flatList}
            data={data}
            renderItem={({ item, index }) => 
              <NextTaskListItem item={item} index={index} onTaskPress={() => handleTaskPress(item)} />}
            keyExtractor={(item) => item.id.toString()}
          />
      </View>
  );
}

const styles = StyleSheet.create({
  modalMainContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    actionButtonsConatainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      width:'80%',
      height:'50%',
      backgroundColor: 'white',
      borderRadius: 20,
      padding: '5%',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalTitle: {
      fontSize: 30,
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
    actionButton: {
      flex: 1,
      borderRadius: 10,
      height: '100%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonOpen: {
      marginRight: 10,
      backgroundColor: '#00b347',
    },
    buttonClose: {
      marginLeft: 10,
      backgroundColor: '#cc0000',
    },
    icon: {
      color: 'white',
      fontSize: 50,
    },
    container: {
      flex: 1,
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