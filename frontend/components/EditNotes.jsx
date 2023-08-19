import { StyleSheet, View, Text, TextInput, Button, TouchableHighlight } from "react-native";
import { useContext, useState } from "react";
import { MyContext } from "../App";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";


export default function EditNotes({ route }) {
    const fromEdit = route.params;
    const { owner, setOwner } = useContext(MyContext);
    const [tempEdit, setTempEdit] = useState({
        code: fromEdit.code,
        date: fromEdit.data,
        header: fromEdit.header,
        comment: fromEdit.comment,
    });
    const Nav = useNavigation();

    const editNoteTo = async () => {
        await axios.put(`http://localhost:4000/owners/${owner._id}/notes/${tempEdit.code}`, tempEdit);
        const newOwner = { ...owner };

        for (let each of newOwner.notes) {
            if (each.code === tempEdit.code) {
                each.header = tempEdit.header;
                each.comment = tempEdit.comment;
            }
        }
        setOwner(newOwner);
        Nav.goBack();
    }


    return (
        <View >

            <TextInput
                value={tempEdit.header}
                placeholder="Write a header here..."
                onChangeText={text => { setTempEdit({ ...tempEdit, header: text }) }}
                style={styles.input}
            />

            <TextInput
                value={tempEdit.comment}
                placeholder="leave your comments"
                onChangeText={text => { setTempEdit({ ...tempEdit, comment: text }) }}
                style={styles.input}
            />

            <View style={{ paddingTop: 30, marginBottom: 30 }}>
                <TouchableHighlight onPress={editNoteTo}>
                    <Text style={styles.touchable}>Update</Text>
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