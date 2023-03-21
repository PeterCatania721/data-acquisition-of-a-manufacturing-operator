import React, { useState } from 'react';
import { Text, View, Modal, Button } from 'react-native';

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleConfirm = () => {
    setModalVisible(false);
    onConfirm();
  };

  const handleCancel = () => {
    setModalVisible(false);
    onCancel();
  };

  return (
    <View>
      <Button title="Confirm" onPress={() => setModalVisible(true)} />
      <Modal visible={modalVisible} animationType="slide">
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>{message}</Text>
          <Button title="Confirm" onPress={handleConfirm} />
          <Button title="Cancel" onPress={handleCancel} />
        </View>
      </Modal>
    </View>
  );
};

export default ConfirmModal;