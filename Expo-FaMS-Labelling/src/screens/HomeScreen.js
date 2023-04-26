// External imports
import {React, useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity,  Dimensions} from 'react-native';
import axios from 'axios';

// Intrenal imports
import {normalize} from '../utils/resizingUtils';
import ConfirmationModal from '../components/modals/ConfirmationModal';
import {getTasksInProgress, closeTask} from '../utils/requestManager';

// Global variables
const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');
const viewWidth = '95%';
const defaultTaskValue = 'Nessuna';

function HomeScreen({ navigation, route}) {
    const { userId } = route.params;

    const [currentTask, setCurrentTask] = useState(defaultTaskValue);
    const [terminateCurrentTaskModalVisible, setTerminateCurrentTaskModalVisible] = useState(false);

    useEffect(() => {
        const back = navigation.addListener('focus', () => {
            getTasksInProgress(userId)
                .then(tasks => {
                    if (tasks.length > 0) {
                        setCurrentTask(tasks[0].nameTask);
                    }
                })
            .catch(err =>{ 
                console.log("Error during get current task in progress: ",err); 
            });
        });
    
        return back;
    }, [navigation]);

    const handleTaskCompleted = () => {
        if (currentTask == defaultTaskValue) {
            
        } else {
            setTerminateCurrentTaskModalVisible(true);
        }
    }

    function handleTerminateCurrentTaskConfirm(){
        closeTask(userId)
        .then(res => {
            setCurrentTask('Nessuna');
        })
        .catch(err => { 
            console.log("Error during terminaing task: ",err); 
        });

        setTerminateCurrentTaskModalVisible(false);
    }

    function handleTerminateCurrentTaskCancel(){
        setTerminateCurrentTaskModalVisible(false);
    }

    return (
        <View style={styles.container}>
            <ConfirmationModal 
            title={"Vuoi Terminare:" }
            visible={terminateCurrentTaskModalVisible} 
            onConfirm={handleTerminateCurrentTaskConfirm} 
            onCancel={handleTerminateCurrentTaskCancel}
            >
                <Text style={styles.descriptionText}>
                {currentTask + " ?"}
                </Text>
            </ConfirmationModal>

            <View style={styles.topContainer}>
                <Text style={styles.topTextLabel}>Il tuo Id: <Text style={styles.boldText}>{userId}</Text></Text> 
            </View>
            <View style={styles.topContainer}>
                <Text style={styles.topTextLabel}>Attività in Esecuzione: <Text style={styles.boldText}>{currentTask}</Text></Text> 
            </View>
            <View style={styles.buttonCountainer}>
                <TouchableOpacity
                    style={[styles.button, {backgroundColor: '#FF7F00'}]}
                    onPress={() => navigation.navigate('Fatica', {userId: userId})}
                >
                    <Text style={styles.buttonText}>Quanto sei stanco?</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, {backgroundColor: '#6D986B'}]}
                    onPress={currentTask == defaultTaskValue ? 
                        () => navigation.navigate('StartTaskScreen', {userId: userId, currentTask: currentTask}) : 
                        () => handleTaskCompleted()}
                >
                    <Text style={styles.buttonText}>{currentTask == defaultTaskValue ? "Inizia Task" : "Termina Task"  }</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        
    },
    buttonCountainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    button: {
        width: viewWidth,
        height: '30%',
        justifyContent: 'center',
        backgroundColor: '#4CAF50',
        borderRadius: 10,
        marginVertical: 10,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: normalize(28, SCREEN_WIDTH),
        fontWeight: 'bold',
        textAlign: 'center',
    },
    topContainer: {
        alignItems: 'center',
        //justifyContent: 'top',
        width: '100%',
    },
    topTextLabel: {
        fontSize: normalize(12, SCREEN_WIDTH),
        textAlign: 'left',
        marginTop: 5,
        width: viewWidth,
    },
    boldText: {
        fontSize: normalize(12, SCREEN_WIDTH),
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
})

export default HomeScreen;