// External imports
import React, {useState} from 'react';
import { Text, View, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const realm = await Realm.open({
    path: "realm-files/myrealm",
    schema: [TaskSchema],
  });

function NextTaskListItem({ item, index }){
    const buttonStyle = index === 0 ? styles.firstButton : styles.button;
    const buttonTextStyle = index === 0 ? styles.firstButtonText : styles.buttonText;

    // calculate the height of the first element
    const windowHeight = Dimensions.get('window').height;
    const elementHeight = windowHeight * 0.5;



    function handlePress(){
        console.log('pressed: ' + item.title);
        let task1, task2;
        realm.write(() => {
          task1 = realm.create("Task", {
            _id: 1,
            name: "go grocery shopping",
            status: "Open",
          });
          task2 = realm.create("Task", {
            _id: 2,
            name: "go exercise",
            status: "Open",
          });
          console.log(`created two tasks: ${task1.name} & ${task2.name}`);
        });
    }

    return (
      <TouchableOpacity onPress={handlePress} style={[buttonStyle, index === 0 && {height: elementHeight}]}>
        <Text style={buttonTextStyle}>{item.title}</Text>
      </TouchableOpacity>
    );
};

function NextTaskScreen() {
    const data = [
        { id: 1, title: 'pulire filtro dell\'aria della ventilazione nord' },
        { id: 2, title: 'produzione cushinetti 250mm' },
        { id: 3, title: 'pakaging degli scarti di produzione ' },
        { id: 4, title: 'Pulizia pavimenti' },
        { id: 5, title: 'Supervisionare tornio verticale' },
        { id: 6, title: 'Produzione super manafold' },
        { id: 7, title: 'Supervisionamento automazione viti' },
    ];

    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={styles.flatList}
                data={data}
                renderItem={({ item, index }) => <NextTaskListItem item={item} index={index}/>}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 10,
    },
    flatList: {
        backgroundColor: 'transparent',
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        paddingHorizontal: 20,
        marginVertical: 10,
        borderRadius: 10,
    },
    firstButtonText: {
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
  });

  export default NextTaskScreen;