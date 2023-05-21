import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, Button, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ip } from '../../Config';
import PasswordStrengthMeterBar from 'react-native-password-strength-meter-bar';
import { usuario } from './LoginScreen'

WebBrowser.maybeCompleteAuthSession();

export default function App({ navigation }) {
    const [user, setUser] = useState(usuario);
    const [provider, setProvider] = useState('');
    const [pswd, setPswd] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          setProvider(null);
          setPswd(null);
          setUsername(null);
        });
        return unsubscribe;
      }, [navigation]);

    const enviarPswd = async () => {
        try{
            console.log(pswd + " " + provider + " " + username + " " + user.email)
            const response = await axios.post('http://' + ip + ':3000/insertarPswd', {provider: provider, pswd: pswd, username: username, usuario: user.email})
            navigation.navigate('List');
        } catch(error) {
            console.error(error);
        }
    };
    if (pswd && provider && username) {
      return (
        <View style={styles.container}>
          <View>
            <Text style={styles.label}>Provider</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter provider"
              value={provider}
              onChangeText={setProvider}
            />
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter username"
              value={username}
              onChangeText={setUsername}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.input}
              placeholder="Enter password"
              value={pswd}
              onChangeText={setPswd}
            />
            <PasswordStrengthMeterBar
              password={pswd}
              showStrenghtText={false}
              height={3}
              radius={20}
            />
            <Text></Text>
            <Button title="Add Password" onPress={enviarPswd} />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View>
            <Text style={styles.label}>Provider</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter provider"
              value={provider}
              onChangeText={setProvider}
            />
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter username"
              value={username}
              onChangeText={setUsername}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.input}
              placeholder="Enter password"
              value={pswd}
              onChangeText={setPswd}
            />
            <Text></Text>
          </View>
        </View>
      );
    }
  }
// AÑADIR ONPRESS AL BUTTON


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 50,
  },
  label: {
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10
  },
  input: {
    borderBottomWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 20,
    height: 50
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
