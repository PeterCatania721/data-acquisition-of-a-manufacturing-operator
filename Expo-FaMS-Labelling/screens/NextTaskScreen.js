// External imports
import React, {useState} from 'react';
import { Text, View, FlatList, Modal, TouchableOpacity, StyleSheet,Pressable, Dimensions } from 'react-native';

function NextTaskListItem({ item, index }){
    const buttonStyle = index === 0 ? styles.firstButton : styles.button;
    const buttonTextStyle = index === 0 ? styles.firstButtonText : styles.buttonText;

    // calculate the height of the first element
    const windowHeight = Dimensions.get('window').height;
    const elementHeight = windowHeight * 0.5;

    function handlePress(){
        console.log('pressed: ' + item.title);

    }

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View>
        <Modal 
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Conferma operazione?</Text>
            <View style={styles.buttonContainer}>
            <Pressable
              style={[styles.button1, styles.buttonOpen]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Conferma task</Text>
            </Pressable>
            <Pressable
              style={[styles.button1, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Esci</Text>
            </Pressable>
            </View>
          </View>
        </View>
      </Modal>

        <TouchableOpacity onPress={() => setModalVisible(true)}  style={[buttonStyle, index === 0 && {height: elementHeight}]}>
        <Text style={buttonTextStyle}>{item.title}</Text>
      </TouchableOpacity>
        </View>

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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
        
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: '10%',
      },
      modalView: {
        
        width:'80%',
        height:'50%',
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        
      },
      button1: {
        
        width:'30%',
        height:'300%',
        borderRadius: 10,
        elevation: 80,
        
      },
      buttonOpen: {
        backgroundColor: '#00b347',
      },
      buttonClose: {
        backgroundColor: '#cc0000',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        verticalAlign: 'middle',
       
      },
      modalText: {
        fontSize: 30,
        paddingTop:'10%',
        paddingBottom: '10%',
        textAlign: 'center',
      },
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
    },
    buttonText: {
        fontSize: 20,
        color: '#212',
        fontWeight: 'bold',
        textAlign: 'center',
    },
  });

  export default NextTaskScreen;