import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import Login from './components/Login';
import MainPage from './components/MainPage';
import AddUsers from './components/AddUsers';
const Stack = createNativeStackNavigator();
export const MyContext = createContext();

export default function App() {
  const [data, setData] = useState([]);
  const [owner, setOwner] = useState({});

  // useEffect(() => {
  //   const getMongoData = async () => {
  //     try {
  //       const mongoData = await axios.get(`http://localhost:4000/owners/`);
  //       setData(mongoData.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   getMongoData();
  // }, [])


  return (

    <MyContext.Provider value={{ data, setData, owner, setOwner }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='login' component={Login} />
          <Stack.Screen name='main-page' component={MainPage} />
          <Stack.Screen name='add-users' component={AddUsers} />
        </Stack.Navigator>
      </NavigationContainer>
    </MyContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
