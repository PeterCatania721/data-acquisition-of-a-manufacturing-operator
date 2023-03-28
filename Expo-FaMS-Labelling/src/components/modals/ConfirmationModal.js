// External imports
import React from 'react';
import {Text, View, Modal, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

function ConfirmationModal({visible, onConfirm, onCancel}){
  return (
    <Modal 
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={() => {
      Alert.alert('Modal has been closed.');
      setModalVisible(!modalVisible);
    }}>
      <View style={styles.modalMainContainer}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Prossima Attivita:</Text>
          <Text style={styles.descriptionText}>Pulire Vetro</Text>

          <View style={styles.actionButtonsConatainer}>
            <TouchableOpacity
              style={[styles.actionButton, styles.buttonOpen]}
              onPress={onConfirm}>
              <Icon name="check" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.buttonClose]}
              onPress={onCancel}>
              <Icon name="x" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

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
});

export default ConfirmationModal;