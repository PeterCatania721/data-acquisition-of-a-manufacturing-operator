// External imports
import React from 'react';
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const renderItem = ({ item, index }) => {
    const buttonStyle = index === 0 ? styles.firstButton : styles.button;

    return (
      <TouchableOpacity style={buttonStyle}>
        <Text style={styles.buttonText}>{item.title}</Text>
      </TouchableOpacity>
    );
};

function NextTaskScreen() {
    const data = [
        { id: 1, title: 'Very very very very very very very very very very very very long text' },
        { id: 2, title: 'Button 2' },
        { id: 3, title: 'Button 3' },
        { id: 4, title: 'Button 4' },
        { id: 5, title: 'Button 5' },
        { id: 6, title: 'Button 6' },
        { id: 7, title: 'Button 7' },
    ];

    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={styles.flatList}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    flatList: {
        flexGrow: 1,
    },
    button: {
        flex: 1,
        backgroundColor: 'blue',
        padding: 20,
        marginVertical: 10,
        borderRadius: 10,
    },
    firstButton: {
        flex: 1,
        backgroundColor: 'red',
        paddingVertical: 100,
        paddingHorizontal: 20,
        marginVertical: 10,
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
  });

  export default NextTaskScreen;