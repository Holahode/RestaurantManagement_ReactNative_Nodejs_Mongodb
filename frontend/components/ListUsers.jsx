import { View, Text, ScrollView, StyleSheet, TouchableHighlight, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { MyContext } from '../App';
import axios from 'axios';

export default function ListUsers() {
    const { data, setData, owner, setOwner } = useContext(MyContext);

    const Nav = useNavigation();

    const deleteUser = async () => {
        await axios.delete(`http://localhost:4000/owners/${owner._id}`);
        const remain = data.filter(item => item._id != owner._id)
        setOwner({});
        setData(remain);
        Nav.navigate('login');
    }

    const editUser = () => {
        Nav.navigate('edit-users', owner);
    }

    const addUsers = () => {
        Nav.navigate('add-users');
    }

    const logOut = () => {
        Nav.navigate('login');
        setOwner({});
    }




    return (
        // <SafeAreaView>
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.headerView}>
                    <Text style={styles.header}>LIST OF USERS</Text>
                    <TouchableHighlight style={{ alignSelf: 'flex-end' }} onPress={addUsers}>
                        <Text style={styles.button}>Create new account</Text>
                    </TouchableHighlight>
                </View>

                {/* {data.map((item) => ( */}
                <View style={styles.text}>

                    <View style={styles.details}>
                        <Text style={styles.text0}>
                            <Text style={{ color: 'red', fontWeight: 'bold' }}>Email: </Text>
                            {owner.email}
                        </Text>
                        <Text style={styles.text0}>
                            <Text style={{ color: 'red', fontWeight: 'bold' }}>Phone: </Text>
                            {owner.phone}
                        </Text>
                        <Text style={styles.text0}>
                            <Text style={{ color: 'red', fontWeight: 'bold' }}>Name: </Text>
                            {owner.name}
                        </Text>
                        <Text style={styles.text0}>
                            <Text style={{ color: 'red', fontWeight: 'bold' }}>Password: </Text>
                            {owner.password}
                        </Text>
                        <Text style={styles.text0}>
                            <Text style={{ color: 'red', fontWeight: 'bold' }}>Address: </Text>
                            {owner.address}
                        </Text>
                    </View>

                    <TouchableHighlight
                        style={styles.touchable}
                        onPress={() => editUser()}
                    >
                        <Text style={styles.button}>Edit</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.touchable}
                        onPress={() => deleteUser(owner.email)}
                    >
                        <Text style={styles.button}>Delete</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.touchable}
                        onPress={logOut}
                    >
                        <Text style={styles.button}>Logout</Text>
                    </TouchableHighlight>
                </View>
                {/* ))} */}
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