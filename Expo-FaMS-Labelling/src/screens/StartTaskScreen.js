// External imports
import React, {useState, useEffect} from 'react';
import { Text, TextInput, View, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import Accordion from 'react-native-collapsible/Accordion';

// Internal imports
import ConfirmationModal from '../components/modals/ConfirmationModal';
import { getTaskByGroup, startTask } from '../utils/requestManager';


const styles = StyleSheet.create({
  button: {
      flex: 1,
      backgroundColor: '#9DC08B',
      padding: 20,
      marginVertical: 10,
      borderRadius: 10,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
      marginTop: '-25%',
  },
  firstButtonLabel: {
    fontSize: 20,
    color: 'rgba(0,0,0,0.8)',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: '50%',
    textDecorationLine: 'underline',
  },
  buttonText: {
      fontSize: 20,
      color: '#212',
      fontWeight: 'bold',
      textAlign: 'center',
  },
});

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

          {index === 0 && <Text style={[buttonTextStyle, styles.firstButtonLabel]}>Attività Corrente</Text>}
          <Text style={buttonTextStyle}>{item.nameTask}</Text>

        </TouchableOpacity>
      </View>

    );
};

function StartTaskScreen({ navigation, route}) {
  const {userId} = route.params;

  const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);
  const [clickedItemId, setClickedItemId] = useState('');
  const [activeSections, setActiveSections] = useState([]);
  const [submitUnexpectedActivity, setSubmitUnexpectedActivity] = useState(false);
  const [newUnexpectedActivity, setNewUnexpectedActivity] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTaskByGroup('Manufacturer Operator')
      .then((tasks) => {
        setTasks(tasks);
        setClickedItemId(tasks[0]._id);
      })
      .catch((error) => console.log(error));
  }, [navigation]);

  function handleTaskPress(item){
    setClickedItemId(item._id);
    setConfirmationModalVisible(true);
  }

  function handleModalConfirm(){
    setConfirmationModalVisible(false);
    setSubmitUnexpectedActivity(false);
    startTask(userId, tasks.find((task) => task._id === clickedItemId).nameTask)
      .then((response) => {
        navigation.navigate('Home', {userId: userId});
      })
      .catch((error) => console.log(error));
  }

  function handleModalCancel(){
    setConfirmationModalVisible(false);
    setSubmitUnexpectedActivity(false);
  }

  function handleCreateUnexpectedActivity(){
    setSubmitUnexpectedActivity(true);
    setConfirmationModalVisible(true);
  }

  const SECTIONS = [
    {
      title: 'Nuova Attività',
    },
  ];

  _renderContent = (section) => {
    return (
      <View style={styles.content}>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.unuxpectedActivityInput}
            placeholder="Fare ..."
            multiline={true}
            numberOfLines={4}
            onChangeText={(text) => setNewUnexpectedActivity(text)}
          />

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleCreateUnexpectedActivity}
          >
            <Text style={styles.submitButtonText}>Inizia</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  _renderHeader = (section) => {
    return (
      <View style={[styles.header, styles.activeSectionContainer]}>
        <Text style={styles.headerText}>{section.title}</Text>
      </View>
    );
  };

  _updateSections = (activeSections) => {
    setActiveSections(activeSections);
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
    sectionTitle: {
      fontWeight: 'bold',
      fontSize: 16,
    },
    header: {
      backgroundColor: '#e74c3c',
      padding: 10,
      marginTop: 20,
    },
    headerText: {
      fontWeight: 'bold',
      fontSize: 20,
    },
    content: {
      borderColor: '#e74c3c',
      borderWidth: 7,
      padding: 10,
      marginBottom: 10, 
      borderBottomStartRadius: 10,
      borderBottomEndRadius: 10,
    },
    contentText: {
      fontSize: 20,
    },
    activeSectionContainer: {
      backgroundColor: '#e74c3c',
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      borderBottomRightRadius: activeSections.length === 0 ? 10 : 0,
      borderBottomLeftRadius: activeSections.length === 0 ? 10 : 0,
    },
    sectionsContainer: {
      backgroundColor: 'white',
    },
    sectionTitle: {
      backgroundColor: 'white',
    },
    submitButton: {
      backgroundColor: '#b93f30',
      padding: 10,
      borderRadius: 10,
      marginTop: 20,
    },
    submitButtonText: {
      fontSize: 20,
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    unuxpectedActivityInput: {
      backgroundColor: '#f2f2f2',
      padding: 10,
      borderRadius: 10,
      fontSize: 20,
      textAlignVertical: 'top',
    },
  });  

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
              {tasks.length > 0 && clickedItemId ? tasks.find(item => item._id === clickedItemId).nameTask : ''}
            </Text>
          </ConfirmationModal>
          

          <Accordion
            sections={SECTIONS}
            activeSections={activeSections}
            //renderSectionTitle={this._renderSectionTitle}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
            onChange={this._updateSections}
            sectionContainerStyle={styles.sectionsContainer}
            sectionTitleStyle={styles.sectionTitle}
            headerStyle={styles.header}
            contentStyle={styles.content}
            activeSectionContainerStyle={styles.activeSectionContainer}
          />

          <FlatList
            contentContainerStyle={styles.flatList}
            data={tasks}
            renderItem={({ item, index }) => 
              <NextTaskListItem item={item} index={index} onTaskPress={() => handleTaskPress(item)} />}
            keyExtractor={(item) => item._id.toString()}
          />
          
      </View>
    </>
  );
}

export default StartTaskScreen;