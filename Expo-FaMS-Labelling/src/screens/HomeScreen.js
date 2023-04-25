// External imports
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity,  Dimensions} from 'react-native';

// Intrenal imports
import {normalize} from '../utils/resizingUtils';

// Global variables
const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');
const viewWidth = '95%';

function HomeScreen({ navigation, route}) {
    const { id } = route.params;

    const handleTaskCompleted = () => {
        navigation.navigate('Home');
    }

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.topTextLabel}>Il tuo Id: <Text style={styles.boldText}>{id}</Text></Text> 
            </View>
            <View style={styles.topContainer}>
                <Text style={styles.topTextLabel}>Attività in Esecuzione: <Text style={styles.boldText}>Pulire Filtro Aria</Text></Text> 
            </View>
            <View style={styles.buttonCountainer}>
                <TouchableOpacity
                    style={[styles.button, {backgroundColor: '#FF7F00'}]}
                    onPress={() => navigation.navigate('Fatica')}
                >
                    <Text style={styles.buttonText}>Quanto sei stanco?</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, {backgroundColor: '#6D986B'}]}
                    onPress={() => handleTaskCompleted()}
                >
                    <Text style={styles.buttonText}>Attivita Terminata?</Text>
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
})

export default HomeScreen;