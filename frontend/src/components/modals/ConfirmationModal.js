// External imports
import React, {useState} from 'react';
import {Text, View, Modal, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

function ConfirmationModal({title, children, visible, onConfirm, onCancel}){
  const [actionButtonWidth, setActionButtonWidth] = useState(null);

  function handleActionButtonLayout(e) {
    setActionButtonWidth(e.nativeEvent.layout.width);
  }

  return (
    <View>
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
            <Text style={styles.modalTitle}>{title}</Text>

            {children}

            <View style={styles.actionButtonsConatainer}>

              <TouchableOpacity
                style={[styles.actionButton, styles.buttonOpen, {maxHeight: actionButtonWidth}]}
                onPress={onConfirm}
                onLayout={handleActionButtonLayout}>

                <Icon name="check" style={styles.icon} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.buttonClose, {maxHeight: actionButtonWidth}]}
                onPress={onCancel}>

                <Icon name="x" style={styles.icon} />
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalMainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurContainer: {
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
    width:'100%',
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