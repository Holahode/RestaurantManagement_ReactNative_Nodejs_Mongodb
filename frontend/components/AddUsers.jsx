import { StyleSheet, View, Text, TextInput, Button, TouchableHighlight } from "react-native";
import { useContext, useState } from "react";
import { MyContext } from "../App";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';

export default function AddUsers() {
    const { owner, setOwner } = useContext(MyContext);
    const [temp, setTemp] = useState({ email: "", phone: "", name: "", password: "", address: "", notes: [], foods: [] });
    const Nav = useNavigation();

    const addUser = async () => {
        // setUser(temp);
        await axios.post(`http://localhost:4000/owners`, temp);
        Nav.goBack();
    }


    return (
        <View >

            <TextInput
                value={temp.email}
                placeholder="Your email here..."
                onChangeText={text => { setTemp({ ...temp, email: text }) }}
                style={styles.input}
            />

            <TextInput
                value={temp.phone}
                placeholder="Your phone here..."
                onChangeText={text => { setTemp({ ...temp, phone: text }) }}
                style={styles.input}
            />

            <TextInput
                value={temp.name}
                placeholder="Your name here..."
                onChangeText={text => { setTemp({ ...temp, name: text }) }}
                style={styles.input}
            />

            <TextInput
                value={temp.password}
                placeholder="Your password here..."
                onChangeText={text => { setTemp({ ...temp, password: text }) }}
                style={styles.input}
            />
            <TextInput
                value={temp.address}
                placeholder="Your address here..."
                onChangeText={text => { setTemp({ ...temp, address: text }) }}
                style={styles.input}
            />

            <View style={{ paddingTop: 30, marginBottom: 30 }}>
                <TouchableHighlight onPress={addUser}>
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