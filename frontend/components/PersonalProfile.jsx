import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListUsers from "./ListUsers";
import AddUsers from './AddUsers';
import EditUsers from './EditUsers';
const Stack = createNativeStackNavigator();


export default function PersonalProfile() {
    return (
        <Stack.Navigator >
            <Stack.Screen name='list-users' component={ListUsers} options={{ headerShown: false }} />
            <Stack.Screen name='add-users' component={AddUsers} options={{ headerShown: false }} />
            <Stack.Screen name='edit-users' component={EditUsers} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}