// External imports
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.button, {backgroundColor: '#FF7F00'}]}
                onPress={() => navigation.navigate('FatigueScreen')}
            >
                <Text style={styles.buttonText}>Quanto sei stanco?</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, {backgroundColor: '#609966'}]}
                onPress={() => navigation.navigate('NextTaskScreen')}
            >
                <Text style={styles.buttonText}>Prossima Task</Text>
            </TouchableOpacity>
        </View>
    );
}


// style for big buttons that navigate to other screens
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      button: {
        width: '80%',
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
})

export default HomeScreen;