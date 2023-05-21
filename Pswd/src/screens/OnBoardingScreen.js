import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Text, SafeAreaView, View, TextInput, TouchableOpacity} from 'react-native';
import { useFonts } from 'expo-font';

import Onboarding from 'react-native-onboarding-swiper';

const OnBoardingScreen = ({navigation}) => {
  const [fontsLoaded] = useFonts({
    'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Italic': require('../assets/fonts/Roboto-Italic.ttf')
  });
  
  return (
    <Onboarding
      onSkip={() => navigation.navigate("Login")}
      onDone={() => navigation.navigate("Login")}
      pages={[
        {
          backgroundColor: '#000000',
          image: <Image style={{width:150, height:150}} source={require('../assets/images/Login/login-page.png')} />,
          title: 'Welcome to PSecureWD',
          subtitle: 'Keep your passwords safe',
        },
        {
          backgroundColor: '#000000',
          image: <Image style={{width:150, height:150}} source={require('../assets/images/Login/login-page.png')} />,
          title: 'Generate PSWD',
          subtitle: 'Generate strong passwords',
        },
        {
          backgroundColor: '#000000',
          image: <Image style={{width:150, height:150}} source={require('../assets/images/Login/login-page.png')} />,
          title: 'Multi platform',
          subtitle: 'IOS & ANDROID',
        }
      ]} />
  );
}

export default OnBoardingScreen;
