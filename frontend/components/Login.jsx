import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, SafeAreaView, TextInput, StyleSheet, TouchableHighlight } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useContext } from "react";
import { MyContext } from "../App";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();


export default function Login() {
    const [user, setUser] = useState({ userName: "", password: "" });
    const [error, setError] = useState(false);
    const { data, setData, owner, setOwner } = useContext(MyContext);
    const Nav = useNavigation();

    const onLogin = async () => {
        const rst = await axios.post(`http://localhost:4000/owners/login`, user);
        if (rst.data.success) {
            await AsyncStorage.setItem('token', rst.data.token);
            setOwner(rst.data.currentUser);
            Nav.navigate('main-page');

        } else {
            setError(!error);
        }
        setUser({ userName: "", password: "" });
    }

    const signUp = () => {
        Nav.navigate('add-users');
        setUser({ userName: "", password: "" });
    }


    return (

        <SafeAreaView>

            <View style={styles.container}>

                <TextInput
                    value={user.userName}
                    placeholder="Enter UserName here ..."
                    onChangeText={text => { setUser({ ...user, userName: text }) }}
                    style={styles.TextInput}
                />

                <TextInput
                    value={user.password}
                    placeholder="Enter PassWord here ..."
                    keyboardType="number-pad"
                    onChangeText={text => { setUser({ ...user, password: text }) }}
                    style={styles.TextInput}
                />

                {error ? <> <Text style={{ color: 'red', fontSize: 20, textAlign: 'center' }}>Wrong userName or/and passWord.</Text>
                    <Text style={{ color: 'red', fontSize: 20, textAlign: 'center' }}>Please try again!</Text>
                </> : null}

                <TouchableHighlight style={styles.touchable} onPress={onLogin}>
                    <Text style={styles.button}>Login</Text>
                </TouchableHighlight>

                <TouchableHighlight onPress={signUp}>
                    <View>
                        <Text style={styles.msg}>If you don't have account, click the below link to create new account</Text>
                        <Text style={styles.button}>Create new account</Text>
                    </View>
                </TouchableHighlight>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightblue',
        alignItems: 'center',
        marginTop: 100,
        width: 500,
        padding: 40,
        borderWidth: 3,
        borderRadius: 15,
        borderColor: 'gray',
        alignSelf: 'center'
    },
    touchable: {
        padding: 10,
        marginTop: 30,
        borderColor: 'orange',
        backgroundColor: 'lightgray',
        borderWidth: 1,
        borderRadius: 15,
        width: 100,
        alignSelf: 'center',
        textAlign: 'center',
    },
    button: {
        color: 'blue',
        fontSize: 18,
        alignSelf: "center"
    },
    TextInput: {
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: 'orange',
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 15,
        width: 250,
        textAlign: 'center'
    },

    msg: {
        paddingTop: 40,
        fontSize: 10,
        alignSelf: 'center'
    }
});
