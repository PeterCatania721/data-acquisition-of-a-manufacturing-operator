// External imports
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity,  Dimensions} from 'react-native';

const { width } = Dimensions.get('window');
const viewWidth = width * 0.95;


function HomeScreen({ navigation, route}) {
    const { id } = route.params;
    const idLabel = `Il tuo ID: ${id}`;

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.idLabel}>Il tuo Id: <Text style={styles.boldText}>{id}</Text></Text> 
            </View>
            <View style={styles.buttonCountainer}>
                <TouchableOpacity
                    style={[styles.button, {backgroundColor: '#FF7F00'}]}
                    onPress={() => navigation.navigate('Fatica')}
                >
                    <Text style={styles.buttonText}>Quanto sei stanco?</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

// style for big buttons that navigate to other screens
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonCountainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    idLabel: {
        fontSize: 30,
        textAlign: 'center',
        marginTop: 20,
        width: viewWidth,
    },
    boldText: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
})

export default HomeScreen;