import { StyleSheet, View, Text, TextInput, Button, TouchableHighlight } from "react-native";
import { useContext, useState } from "react";
import { MyContext } from "../App";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import uuid from "react-native-uuid"

export default function AddNotes() {
    const { owner, setOwner } = useContext(MyContext);
    const [temp, setTemp] = useState({
        code: uuid.v1(),
        date: new Date().toLocaleDateString(),
        header: "",
        comment: "",
    });

    const Nav = useNavigation();

    const addNoteTo = async () => {
        // const newNote = [...owner.notes];
        // newNote.push(temp);
        // setNote(newNote);
        await axios.post(`http://localhost:4000/owners/${owner._id}/notes`, temp);
        const newOwner = { ...owner };
        newOwner.notes.push(temp);
        setOwner(newOwner);
        Nav.goBack();
    }


    return (
        <View >

            <TextInput
                value={temp.header}
                placeholder="Write your header here..."
                onChangeText={text => { setTemp({ ...temp, header: text }) }}
                style={styles.input}
            />

            <TextInput
                value={temp.comment}
                placeholder="Leave your comment here..."
                onChangeText={text => { setTemp({ ...temp, comment: text }) }}
                style={styles.input}
            />

            <View style={{ paddingTop: 30, marginBottom: 30 }}>
                <TouchableHighlight onPress={addNoteTo}>
                    <Text style={styles.touchable}>Submit</Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        // backgroundColor: '#fff',
        alignItems: 'center',
        borderWidth: 1,
        width: 750,
        alignSelf: 'center'
    },

    headerView: {
        borderWidth: 1,
        padding: 10,
        width: 700,
        backgroundColor: 'lightblue'

    },
    text: {
        borderWidth: 1,
        width: 700,
        padding: 10,
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
        borderColor: 'orange',
        borderWidth: 1,
        borderRadius: 5,
        width: 200,
        alignSelf: 'center',
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
    root: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 20,
    },
    button: {
        paddingHorizontal: 10,
    },
    addCourse: {
        fontSize: 25,
        color: '#444',
        textAlign: 'center',
        margin: 20,
    },
    input: {
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 3,
    }
});