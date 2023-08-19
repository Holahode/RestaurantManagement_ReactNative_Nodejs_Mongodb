import { StyleSheet, View, Text, TextInput, Button, TouchableHighlight } from "react-native";
import { useContext, useState } from "react";
import { MyContext } from "../App";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";

export default function EditFoods({ route }) {
    const fromEdit = route.params;
    const { data, setData, owner, setOwner } = useContext(MyContext);
    const [tempEdit, setTempEdit] = useState({
        _id: fromEdit._id,
        name: fromEdit.name,
        origin: fromEdit.origin,
        price: fromEdit.price,
        date: fromEdit.data,
        image: fromEdit.image
    });

    const [image, setImage] = useState(null);
    const Nav = useNavigation();


    const editFoodTo = async () => {
        const newData = [...data];
        for (let each of newData) {
            if (each._id === tempEdit._id) {
                each.name = tempEdit.name;
                each.origin = tempEdit.origin;
                each.price = tempEdit.price;
                each.image = tempEdit.image;
            }
        }
        setData(newData);
        await axios.put(`http://localhost:4000/owners/${owner._id}/foods/${tempEdit._id}`, tempEdit);
        const newOwner = { ...owner };
        // newOwner.foods.push(food);

        for (let each of newOwner.foods) {
            if (each._id === tempEdit._id) {
                each.name = tempEdit.name;
                each.origin = tempEdit.origin;
                each.price = tempEdit.price;
                each.image = tempEdit.image;
            }
        }
        setOwner(newOwner);
        Nav.goBack();
    }



    const handlePick = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            aspect: [4, 3],
            quality: 1,
        });
        setTempEdit({ ...tempEdit, image: result.assets[0].uri })
    };


    return (
        <View >

            <TextInput
                value={tempEdit.name}
                placeholder="Food's name"
                onChangeText={text => { setTempEdit({ ...tempEdit, name: text }) }}
                style={styles.input}
            />

            <TextInput
                value={tempEdit.origin}
                placeholder="Food's origion"
                onChangeText={text => { setTempEdit({ ...tempEdit, origin: text }) }}
                style={styles.input}
            />

            <TextInput
                value={tempEdit.price}
                placeholder="Food's price"
                onChangeText={text => { setTempEdit({ ...tempEdit, price: text }) }}
                style={styles.input}
            />
            <View style={{ paddingTop: 30, marginBottom: 30 }}>
                <Text style={styles.touchable}>
                    <Button title="Pick an image from camera roll" onPress={handlePick} />
                    {image && <Image source={{ uri: image }} />}</Text>

                <TouchableHighlight onPress={editFoodTo}>
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