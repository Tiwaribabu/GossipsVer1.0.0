import React from 'react';
import { StyleSheet, Text, View ,LogBox} from 'react-native';
import MyStack from './navigations/navigate';
import { NavigationContainer } from '@react-navigation/native';
LogBox.ignoreLogs([
  'Setting a timer',
  'AsyncStorage has been extracted from react-native core and will be removed in a future release.',
  'No native ExpoFirebaseCore module found, are you sure the expo-firebase-core module is linked properly?',
]);
export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    );
  }
}