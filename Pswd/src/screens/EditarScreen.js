import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, Button, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ip } from '../../Config';
import PasswordStrengthMeterBar from 'react-native-password-strength-meter-bar';

WebBrowser.maybeCompleteAuthSession();

export default function App({ route, navigation }) {
    const [provider, setProvider] = useState('');
    const [pswd, setPswd] = useState('');
    const [username, setUsername] = useState('');
    const [id, setId] = useState('');

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          console.log(route.params.id);
          listar();
        });
        return unsubscribe;
      }, [route.params.id, navigation]);
    
      const listar = async () => {
        try {
          const response = await axios.get(`http://` + ip + `:3000/actualizarPswd/${route.params.id}`);
          console.log(response.data)
          setId(response.data[0].id)
          setProvider(response.data[0].provider);
          setPswd(response.data[0].password);
          setUsername(response.data[0].username)
        } catch (error) {
          console.error(error);
        }
      };

    const enviarPswd = async () => {
         try {
             const response = await axios.post('http://' + ip + ':3000/editarPassword', { provider: provider, pswd: pswd, username: username, id: route.params.id });
             console.log(response.data);
             navigation.navigate('View', { id: id });
         } catch (error) {
             console.error(error);
         }
    };
    return (
        <View style={styles.container}>
            <View>
            <Text style={styles.label}>Provider</Text>
                <TextInput
                    style={styles.input}
                    editable={true}
                    value={provider}
                    onChangeText={setProvider}
                />
              <Text style={styles.label}>Username</Text>
                <TextInput
                    secureTextEntry={false}
                    style={styles.input}
                    editable={true}
                    value={username}
                    onChangeText={setUsername}
                />
              <Text style={styles.label}>Password</Text>
                <TextInput
                    secureTextEntry={true}
                    style={styles.input}
                    editable={true}
                    value={pswd}
                    onChangeText={setPswd}
                />
                <PasswordStrengthMeterBar password={pswd} showStrenghtText={false} height={3} radius={20}/>
                <Text></Text>
                <Button title="Update" onPress={enviarPswd}/>
            </View>
        </View>
    );
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
  },
  input: {
    borderBottomWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 20,
    height: 50
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
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});