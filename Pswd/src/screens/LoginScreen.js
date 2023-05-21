import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert, Pressable } from 'react-native';
import axios from 'axios';
import { ip } from '../../Config';
import { Video } from 'expo-av';
import { useState, useEffect } from 'react';

WebBrowser.maybeCompleteAuthSession();
//web: 247659124796-5pbtv5kbe8eaimba8rt9sd7dfjob0n0t.apps.googleusercontent.com
//ios: 247659124796-u47u9bpttaao20i9l3hiilb40qcumc6h.apps.googleusercontent.com
//android: 247659124796-1jt308640gjdij6crcuuo2rpevk265hv.apps.googleusercontent.com

let usuario;

export default function App({ navigation }) {
  const [accessToken, setAccessToken] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: "247659124796-5pbtv5kbe8eaimba8rt9sd7dfjob0n0t.apps.googleusercontent.com",
    iosClientId: "247659124796-u47u9bpttaao20i9l3hiilb40qcumc6h.apps.googleusercontent.com",
    androidClientId: "247659124796-1jt308640gjdij6crcuuo2rpevk265hv.apps.googleusercontent.com"
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      console.log(response.authentication.accessToken);
      setAccessToken(response.authentication.accessToken);
      accessToken && fetchUserInfo();
    }
  }, [response, accessToken])

  async function fetchUserInfo() {
    let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const useInfo = await response.json();
    setUser(useInfo);
    console.log(useInfo);
    sendUser(useInfo);
  }

  const sendUser = async (user) => {
    try {
      usuario = user;
      const response = await axios.post('http://' + ip + ':3000/insertUsuario', user);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const CargarPagina = () => {
    useEffect(() => {
      if (user) {
        navigation.navigate('List');
      }
    }, [user, navigation]);

    return null;
  };

  return (
    <View style={{ flex: 1 }}>
      <Video
              source={require("../assets/video/Escudo.mp4")}
              shouldPlay
              isLooping
              resizeMode="cover"
              style={{ flex: 1 }}
            ></Video>
        <View style={styles.container}>
        <Text style={{ fontSize: 35, color: 'white', fontFamily: 'Helvetica', alignSelf: 'center', marginTop: 190 }}>PSecureWD</Text>

          {user && <CargarPagina />}
          {user === null &&
            <>
              <View style={{ marginTop: 600 }}>

              </View>
              <TouchableOpacity
                disabled={!request}
                onPress={() => {
                  promptAsync();
                }}
              >
                <Image source={require("../assets/images/Login/btn.png")} style={{ width: 300, height: 40, borderRadius: 10, marginTop: -200 }} />
              </TouchableOpacity>
              <Pressable style={styles.button} onPress={() => {
                navigation.navigate('OnBoarding')
              }}><Image source={require("../assets/images/Login/info.jpg")} style={{ width: 30, height: 30, borderRadius: 10 }} /></Pressable>
            </>
          }
          <StatusBar style="auto" />
        </View>
    </View>
  );
}

export { usuario }

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: '#fff',
    fontSize: 30,
  },
  button: {
    position: 'absolute',
    right: 20,
    top: 50,
    color: '#fff',
  },
  onBo: {
    color: '#fff',
    right: 20,
    top: 40,
    fontSize: 40
  }, video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
