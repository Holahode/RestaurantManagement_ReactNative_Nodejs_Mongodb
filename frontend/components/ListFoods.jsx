import { View, Text, ScrollView, SafeAreaView, StyleSheet, Button, TouchableHighlight, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect } from 'react';
import { MyContext } from '../App';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ListFoods() {
    const { setData, owner, setOwner } = useContext(MyContext);
    let food = owner.foods;
    const rst = food.filter(item => item._id)
    const Nav = useNavigation();

    useEffect(() => {
        const getMongoData = async () => {
            const tkn = await AsyncStorage.getItem('token');
            const mongoData = await axios.get(`http://localhost:4000/owners`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${tkn}`
                    }
                },
            );
            setData(mongoData.data);
        }
        getMongoData();
    }, [])




    const deleteFood = async (_id) => {
        const remain = rst.filter(item => item._id !== _id);
        await axios.delete(`http://localhost:4000/owners/${owner._id}/foods/${_id}`);
        const newOwner = { ...owner };
        newOwner.foods = remain;
        setOwner(newOwner);
        setData(remain);
    }

    const editFood = (item) => {
        Nav.navigate('edit-food', item);
    }

    const addFood = () => {
        Nav.navigate('add-food');
    }
    return (
        // <SafeAreaView>
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.headerView}>
                    <Text style={styles.header}>LIST OF FOODS</Text>
                    <TouchableHighlight style={styles.touchableAdd} onPress={addFood}>
                        <Text style={styles.button}>Add Food</Text>
                    </TouchableHighlight>
                </View>

                {food.map((item) => (
                    <View key={item._id} style={styles.text}>
                        <View>
                            <Image
                                source={item.image}
                                style={{ width: 200, height: 160, alignSelf: 'center' }}
                            />
                            <View style={styles.details}>
                                <Text style={styles.text0}>
                                    <Text style={{ color: 'red', fontWeight: 'bold' }}>Name: </Text>
                                    {item.name}
                                </Text>
                                <Text style={styles.text0}>
                                    <Text style={{ color: 'red', fontWeight: 'bold' }}>Origin: </Text>
                                    {item.origin}
                                </Text>
                                <Text style={styles.text0}>
                                    <Text style={{ color: 'red', fontWeight: 'bold' }}>Price: </Text>
                                    {item.price}
                                </Text>
                                <Text style={styles.text0}>
                                    <Text style={{ color: 'red', fontWeight: 'bold' }}>Date: </Text>
                                    {item.date}
                                </Text>
                            </View>
                        </View>
                        <TouchableHighlight
                            style={styles.touchable}
                            onPress={() => editFood(item)}
                        >
                            <Text style={styles.button}>Edit</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.touchable}
                            onPress={() => deleteFood(item._id)}
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
        padding: 15.5,
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



