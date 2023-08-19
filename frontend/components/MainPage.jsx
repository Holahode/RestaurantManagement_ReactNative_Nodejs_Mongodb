import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import PersonalProfile from "./PersonalProfile";
import Foods from "./Foods";
import DailyNotes from "./DailyNotes";
const Tab = createBottomTabNavigator();


export default function MainPage() {
  return (
    < Tab.Navigator sceneContainerStyle={{ backgroundColor: 'lightblue' }}>
      <Tab.Screen name='Foods' component={Foods} options={{
        tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="food" color={'blue'} size={26} />)
      }} />
      <Tab.Screen name='Daily-notes' component={DailyNotes} options={{
        tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="note" color={'blue'} size={26} />)
      }} />
      <Tab.Screen name='Personal-profile' component={PersonalProfile} options={{
        tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="account" color={'blue'} size={26} />)
      }} />
    </Tab.Navigator>
  )
}