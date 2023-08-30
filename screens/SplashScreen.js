import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, ImageBackground } from 'react-native';

export default function SplashScreen({ navigation }) {
  return (
    <ImageBackground source={require('../assets/Flash.jpg')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
        </View>
        <View style={styles.animationContainer}>
          <Image source={require('../assets/ChatAnimation.gif')} style={styles.animation} />
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PhoneAuth')}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 200,
    height: 200,
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '60%',
    height: 40,
    backgroundColor: '#FAAB78',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#064663',
    fontSize: 20,
  },
});
