import { View, Text, ScrollView, SafeAreaView, StyleSheet, Button, TouchableHighlight, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useContext, useState } from 'react';
import { MyContext } from '../App';
import axios from 'axios';


export default function ListNotes() {
    const { owner, setOwner } = useContext(MyContext);
    // const [note, setNote] = useState(owner.notes);
    let note = owner.notes;
    const Nav = useNavigation();

    const deleteNote = async (code) => {
        const rst = note.filter(item => item.code !== code);
        await axios.delete(`http://localhost:4000/owners/${owner._id}/notes/${code}`);
        const newOwner = { ...owner };
        newOwner.notes = rst;
        setOwner(newOwner);
        // setNote(rst);
    }

    const editNote = (item) => {
        Nav.navigate('edit-notes', item);
    }

    const addNote = () => {
        Nav.navigate('add-notes');
    }
    return (
        // <SafeAreaView>
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.headerView}>
                    <Text style={styles.header}>LIST OF NOTES</Text>
                    <TouchableHighlight style={styles.touchableAdd} onPress={addNote}>
                        <Text style={styles.button}>Add Note</Text>
                    </TouchableHighlight>
                </View>

                {note.map((item) => (
                    <View key={item.code} style={styles.text}>
                        <View>
                            <View style={styles.details}>
                                <Text style={styles.text0}>
                                    <Text style={{ color: 'red', fontWeight: 'bold' }}>Code: </Text>
                                    {item.code}
                                </Text>
                                <Text style={styles.text0}>
                                    <Text style={{ color: 'red', fontWeight: 'bold' }}>Header: </Text>
                                    {item.header}
                                </Text>
                                <Text style={styles.text0}>
                                    <Text style={{ color: 'red', fontWeight: 'bold' }}>Comment: </Text>
                                    {item.comment}
                                </Text>
                                <Text style={styles.text0}>
                                    <Text style={{ color: 'red', fontWeight: 'bold' }}>Date: </Text>
                                    {item.date}
                                </Text>
                            </View>
                        </View>
                        <TouchableHighlight
                            style={styles.touchable}
                            onPress={() => editNote(item)}
                        >
                            <Text style={styles.button}>Edit</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.touchable}
                            onPress={() => deleteNote(item.code)}
                        >
                            <Text style={styles.button}>Delete</Text>
                        </TouchableHighlight>
                    </View>
                ))}
            </View>
        </ScrollView>
        // </SafeAreaView>

    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#fff',
        alignItems: 'center',
        borderWidth: 1,
        width: 400,
        alignSelf: 'center'
    },

    headerView: {
        borderWidth: 1,
        padding: 10,
        width: 400,
        backgroundColor: 'lightblue'

    },
    text: {
        borderWidth: 1,
        width: 400,
        padding: 10,
        backgroundColor: 'skyblue'
    },

    text0: {
        display: 'flex',
        justifyContent: 'flex-start',
        fontSize: 15,
        textAlign: 'center',
        // backgroundColor: '#f5f5dc',
    },

    header: {
        alignSelf: 'center',
        color: 'brown',
        textDecorationLine: 'underline',
        paddingBottom: 10,
        fontSize: 15,
        fontWeight: 'bold'
    },

    touchable: {
        flex: 1,
        borderColor: 'orange',
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'flex-end',
        marginRight: 10,
    },

    touchableAdd: {
        borderColor: 'orange',
        borderWidth: 1,
        borderRadius: 5,
        width: 90,
        marginRight: 10,
        alignSelf: 'flex-end',
    },

    button: {
        color: 'blue',
        fontSize: 15,
        textAlign: 'center',
    },
});