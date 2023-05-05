// External imports
import React, {useState, useEffect, useContext} from 'react';
import { Text, TextInput, View, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';

// Internal imports
import ConfirmationModal from '../components/modals/ConfirmationModal';
import { getTaskByGroup, startTask } from '../utils/requestManager';
import { UserContext, ConnectionContext } from '../contexts.js';
import { saveStartTask, getOfflineGroupTasksByGroup} from '../utils/localStorage';


const styles = StyleSheet.create({
  button: {
      flex: 1,
      backgroundColor: '#9DC08B',
      padding: 20,
      marginVertical: 10,
      borderRadius: 10,
  },
  buttonText: {
      fontSize: 20,
      color: '#212',
      fontWeight: 'bold',
      textAlign: 'center',
  },
});

function NextTaskListItem({ item, index, onTaskPress}){

    // calculate the height of the first element
    const windowHeight = Dimensions.get('window').height;
    const elementHeight = windowHeight * 0.5;

    return (
      <View>
        <TouchableOpacity 
          onPress={onTaskPress}  
          style={[styles.button]}>

          <Text style={styles.buttonText}>{item.nameTask}</Text>

        </TouchableOpacity>
      </View>

    );
};

function StartTaskScreen({ navigation}) {
  const {userId} = useContext(UserContext);
  const {isConnected} = useContext(ConnectionContext);

  const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);
  const [clickedItemId, setClickedItemId] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (isConnected) {
      getTaskByGroup('Manufacturer Operator')
        .then((tasks) => {
          if (tasks && tasks.length > 0) {
            setTasks(tasks);
            setClickedItemId(tasks[0]._id);
          } else {
            setTasks([]);
            setClickedItemId(null);
          }
        })
        .catch((error) => console.log("error"));
    } else {
      getOfflineGroupTasksByGroup('Manufacturer Operator')
        .then((tasks) => {
          if (tasks && tasks.length > 0) {
            setTasks(tasks);
            setClickedItemId(tasks[0]._id);
          } else {
            setTasks([]);
            setClickedItemId(null);
          }
        })
        .catch((error) => console.log(error));
    }
  }, [navigation]);

  function handleTaskPress(item){
    if (item) {
      setClickedItemId(item._id);
      setConfirmationModalVisible(true);
    }
  }

  async function handleModalConfirm(){
    if (tasks !== null && tasks !== undefined && tasks.length > 0) {
      setConfirmationModalVisible(false);
      const currentTask = tasks.find((task) => task._id === clickedItemId).nameTask;

      if (currentTask !== null && currentTask !== undefined) {
        const responce = await saveStartTask(currentTask, isConnected)
          .then(() => {
            if (!isConnected) {
              navigation.navigate('Home');
            }
          })
          .catch((error) => console.log(error));

        if(isConnected) {
          startTask(userId, currentTask)
            .then((response) => {
              navigation.navigate('Home');
            })
            .catch((error) => console.log(error));
        } 
      }
    }
  }

  function handleModalCancel(){
    setConfirmationModalVisible(false);
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
    descriptionText: {
      fontSize: 30,
      marginTop: 10,
      marginBottom: 20,
      padding: 10,
      borderRadius: 10,
      backgroundColor: '#f2f2f2',
    },
  });  

  const isDescriptionVisible = 
    clickedItemId !== null && clickedItemId !== undefined && 
    tasks !== null && tasks !== undefined && tasks.length > 0;

  return (
    <>
      <BlurView 
        intensity={confirmationModalVisible && 75} 
        tint="dark" 
        style={styles.absoluteBlurView}/>

      <View style={styles.container}>

          <ConfirmationModal 
            title={"Prossima Attività"}
            visible={confirmationModalVisible} 
            onConfirm={handleModalConfirm} 
            onCancel={handleModalCancel}
          >
            <Text style={styles.descriptionText}>
              { isDescriptionVisible ? tasks.find(item => item._id === clickedItemId).nameTask : ''}
            </Text>
          </ConfirmationModal>
        

          <FlatList
            contentContainerStyle={styles.flatList}
            data={tasks ? tasks : []}
            renderItem={({ item, index }) => 
              <NextTaskListItem item={item} index={index} onTaskPress={() => handleTaskPress(item)} />}
            keyExtractor={(item) => item._id.toString()}
          />
          
      </View>
    </>
  );
}

export default StartTaskScreen;