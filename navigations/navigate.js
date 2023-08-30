import Chat from '../screens/Chat'
import Contact from '../screens/Contacts'
import { View } from 'react-native';
import Login from '../screens/Login';
import {createStackNavigator} from '@react-navigation/stack'
import LoadingScreen from '../screens/LoadingScreen'
// import {signOut,getAuth} from "firebase/auth";
import db from '../firebaseConfig'
import firebase from 'firebase';

import SplashScreen from '../screens/SplashScreen'
import PhoneAuth from '../screens/PhoneAuthScreen'
import { MaterialIcons } from '@expo/vector-icons';
import Chats from '../screens/Chats'; 
//const auth = getAuth();
const Stack = createStackNavigator()
function MyStack(){
  return(
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#064663',
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: 'white',
    }}>
        <Stack.Screen name = "LoadingScreen" component = {LoadingScreen} options = {{headerShown:false}}/>
        <Stack.Screen name = "SplashScreen" component = {SplashScreen} options = {{headerShown:false}}/>
        <Stack.Screen name = "PhoneAuth" component = {PhoneAuth} options = {{headerShown:false}}/>
     <Stack.Screen name = "Login" component = {Login} options = {{headerShown:false}}/>
     <Stack.Screen name="Chats" component={Chats} />
        {/*    <Stack.Screen name = "Register" component = {Register} options = {{headerShown:false}}/> */}
   <Stack.Screen name = "Contacts" component = {Contact} options = {{headerShown:true
            ,headerRight: () => (
               <View style={{marginRight: 10}}>
                 <MaterialIcons name="logout" size={24} color="white" onPress={()=>firebase.auth().signOut().then(() => {
       alert('Logged Out!!');
    
      }).catch((error) => {
      alert(error.message)
      })} />
                </View>
            ),
  
  }}/>
   <Stack.Screen name = "Chat" component = {Chat} options = {{headerShown:true}}/>
    </Stack.Navigator>
    
  )
}
export default MyStack