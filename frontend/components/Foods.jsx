import { View, Text } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListFoods from "./ListFoods";
import AddFoods from './AddFoods';
import EditFoods from './EditFoods';
const Stack = createNativeStackNavigator();


export default function Foods() {
    return (
        <Stack.Navigator >
            <Stack.Screen name='list-food' component={ListFoods} options={{ headerShown: false }} />
            <Stack.Screen name='add-food' component={AddFoods} options={{ headerShown: false }} />
            <Stack.Screen name='edit-food' component={EditFoods} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}
