import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { usuario } from './LoginScreen'

WebBrowser.maybeCompleteAuthSession();

export default function App({ navigation }) {
  const [user, setUser] = useState(usuario);


  const handleLogout = () => {
    // Eliminar los datos del usuario de la sesión actual
    setUser(null);
    // Redirigir al usuario de vuelta a la pantalla de login
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const twoOptionAlertHandler = () => {
    //function to make two option alert
    Alert.alert(
      //title
      'Are you sure, you want to LogOut?',
      //body
      'Confirmation',
      [
        { 
          text: 'LogOut', onPress: () => handleLogout() 
        },
        //Opcion 2
        {
          text: 'Cancel',
          onPress: () => console.log('Cancelo'),
          style: 'cancel',
        },
      ],
      { cancelable: false }
      //clicking out side of alert will not cancel
    );
  };

  useEffect(() => {
    if (!user) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }
  }, [user, navigation]);

  if (!user) {
    return null; // asegura que no se renderice nada más en la pantalla
  }

  return (
    <View style={styles.container}>
      {user && (
        <View style={{ padding: 50, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={{ uri: user.picture }} style={{ width: 100, height: 100, borderRadius: 20 }} />
          <Text style={{ paddingHorizontal: 10, padding: 20, justifyContent: 'center', alignItems: 'center', fontSize: 30 }}>{user.name}</Text>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{usuario.email}</Text>
        </View>
      )}
      <TouchableOpacity onPress={twoOptionAlertHandler} style={styles.buttonContainer}>
        <View>
          <Text style={{color: 'white', fontSize: 20,}}>LogOut</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    backgroundColor: "red",
    width: "37%",
    margin: 20,
    padding: 10,
    alignItems: "center",
    borderRadius: 20,
    marginTop: 5,
},
});