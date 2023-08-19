import { StyleSheet, View, Text, TextInput, Button, TouchableHighlight } from "react-native";
import { useContext, useState } from "react";
import { MyContext } from "../App";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import uuid from "react-native-uuid";
import axios from 'axios';

export default function AddFoods() {
    const { data, setData, owner, setOwner } = useContext(MyContext);
    const [food, setFood] = useState({
        _id: uuid.v1(),
        name: "",
        origin: "",
        price: 0,
        date: new Date().toLocaleDateString(),
        image: null
    });
    const [image, setImage] = useState(null);
    const Nav = useNavigation();

    const handlePick = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            aspect: [4, 3],
            quality: 1,
        });
        setFood({ ...food, image: result.assets[0].uri })
    };

    const addFoodTo = async () => {
        const newData = [...data];
        newData.push(food);
        setData(newData);
        await axios.post(`http://localhost:4000/owners/${owner._id}/foods`, food);
        const newOwner = { ...owner };
        newOwner.foods.push(food);
        setOwner(newOwner);
        Nav.goBack();
    }

    return (
        <View >

            <TextInput
                value={food.name}
                placeholder="Food's name"
                onChangeText={text => { setFood({ ...food, name: text }) }}
                style={styles.input}
            />

            <TextInput
                value={food.origin}
                placeholder="Food's origion"
                onChangeText={text => { setFood({ ...food, origin: text }) }}
                style={styles.input}
            />

            <TextInput
                value={food.price}
                placeholder="Food's price"
                onChangeText={text => { setFood({ ...food, price: text }) }}
                style={styles.input}
            />
            <View style={{ paddingTop: 30, marginBottom: 30 }}>
                <Text style={styles.touchable}>
                    <Button title="Pick an image from camera roll" onPress={handlePick} />
                    {image && <Image source={{ uri: image }} />}</Text>

                <TouchableHighlight onPress={addFoodTo}>
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