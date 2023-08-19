import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddNotes from './AddNotes';
import ListNotes from './ListNotes';
import EditNotes from './EditNotes';
const Stack = createNativeStackNavigator();


export default function DailyNotes() {

    return (
        <Stack.Navigator>
            <Stack.Screen name='list-of-notes' component={ListNotes} options={{ headerShown: false }} />
            <Stack.Screen name='add-notes' component={AddNotes} options={{ headerShown: false }} />
            <Stack.Screen name='edit-notes' component={EditNotes} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}