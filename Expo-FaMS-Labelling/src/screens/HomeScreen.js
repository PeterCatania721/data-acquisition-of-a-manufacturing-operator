// External imports
import {React, useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity,  Dimensions} from 'react-native';
import axios from 'axios';

// Intrenal imports
import {normalize} from '../utils/resizingUtils';
import ConfirmationModal from '../components/modals/ConfirmationModal';

// Global variables
const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');
const viewWidth = '95%';

function HomeScreen({ navigation, route}) {
    const { userId } = route.params;
    const [currentTask, setCurrentTask] = useState('Nessuna');
    const [terminateCurrentTaskModalVisible, setTerminateCurrentTaskModalVisible] = useState(false);

    useEffect(() => {
        const back = navigation.addListener('focus', () => {
            axios.get(`http://localhost:4000/api/v1/${userId}/getTaskInProgress`)
            .then(res => {
                let tasks = res.data.tasks;
                if (tasks !== null && tasks !== undefined && tasks.length > 0) {
                    setCurrentTask(tasks[0].nameTask);
                }
            })
            .catch(err => console.log(err));
        });
    
        return back;
    }, [navigation]);

    const handleTaskCompleted = () => {
        setTerminateCurrentTaskModalVisible(true);
    }

    function handleTerminateCurrentTaskConfirm(){
        axios.post(`http://localhost:4000/api/v1/${userId}/closeTask`)
        .then(res => {
            console.log(res);
            setCurrentTask('Nessuna');
        })
        .catch(err => console.log(err));

        setTerminateCurrentTaskModalVisible(false);
    }

    function handleTerminateCurrentTaskCancel(){
        setTerminateCurrentTaskModalVisible(false);
    }

    return (
        <View style={styles.container}>
            <ConfirmationModal 
            title="Vuoi Terminare:"
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
                    onPress={() => handleTaskCompleted()}
                >
                    <Text style={styles.buttonText}>Termina Task</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, {backgroundColor: '#6D1111'}]}
                    onPress={() => handleTaskCompleted()}
                >
                    <Text style={styles.buttonText}>Inizia Nuova </Text>
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
        justifyContent: 'top',
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