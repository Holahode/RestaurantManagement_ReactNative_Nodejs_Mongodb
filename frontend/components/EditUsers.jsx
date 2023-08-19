import { StyleSheet, View, Text, TextInput, TouchableHighlight } from "react-native";
import { useContext, useState } from "react";
import { MyContext } from "../App";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function EditUsers({ route }) {
    const fromEdit = route.params;
    const { owner, setOwner } = useContext(MyContext);

    const [tempEdit, setTempEdit] = useState({
        email: fromEdit.email,
        phone: fromEdit.phone,
        name: fromEdit.name,
        password: fromEdit.password,
        address: fromEdit.address,
    });
    const Nav = useNavigation();

    const editUserTo = async () => {

        const newOwner = { ...owner };
        newOwner.phone = tempEdit.phone;
        newOwner.name = tempEdit.name;
        newOwner.password = tempEdit.password;
        newOwner.address = tempEdit.address;

        await axios.put(`http://localhost:4000/owners/${owner._id}`, tempEdit);
        setOwner(newOwner);
        Nav.goBack();
    }


    return (
        <View >

            <TextInput
                value={tempEdit.phone}
                placeholder="Phone..."
                onChangeText={text => { setTempEdit({ ...tempEdit, phone: text }) }}
                style={styles.input}
            />

            <TextInput
                value={tempEdit.name}
                placeholder="Name..."
                onChangeText={text => { setTempEdit({ ...tempEdit, name: text }) }}
                style={styles.input}
            />

            <TextInput
                value={tempEdit.password}
                placeholder="Password..."
                onChangeText={text => { setTempEdit({ ...tempEdit, password: text }) }}
                style={styles.input}
            />

            <TextInput
                value={tempEdit.address}
                placeholder="Address..."
                onChangeText={text => { setTempEdit({ ...tempEdit, address: text }) }}
                style={styles.input}
            />

            <View style={{ paddingTop: 30, marginBottom: 30 }}>
                <TouchableHighlight onPress={editUserTo}>
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