import { StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert, Icon, ScrollView, SafeAreaView, FlatList, Pressable, ClipboardStatic, TextInput, Clipboard, Vibration, Modal } from 'react-native';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { ip } from '../../Config';
import { usuario } from './LoginScreen';
import * as WebBrowser from 'expo-web-browser';
import * as Animatable from 'react-native-animatable';
import PasswordStrengthMeterBar from 'react-native-password-strength-meter-bar';
import Ionic from 'react-native-vector-icons/Ionicons';


WebBrowser.maybeCompleteAuthSession();

export default function App({ route, navigation }) {
  const [provider, setProvider] = useState('');
  const [pswd, setPswd] = useState('');
  const [username, setUsername] = useState('');
  const [copied, setCopied] = useState(false);
  const [animation, setAnimation] = useState('');
  const [id, setId] = useState('');

  const [masked, setMasked] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setMasked(true)
      listar();
    });
    return unsubscribe;
  }, [route.params.id, navigation]);

  const twoOptionAlertHandler = (id) => {
    //function to make two option alert
    Alert.alert(
      //title
      'Are you sure, you want to delete?',
      'Confirmation',
      [
        {
          text: 'Delete', onPress: () => eliminarPswd(id)
        },
        //Opcion 2
        {
          text: 'Cancel',
          onPress: () => eliminarPswd(null),
          style: 'cancel',
        },
      ],
      { cancelable: false }
      //clicking out side of alert will not cancel
    );
  };

  const eliminarPswd = async (id) => {
    if (id != null) {
      try {
        const response = await axios.delete(`http://` + ip + `:3000/eliminarPassword/${id}`);
        console.log(response.data);
        navigation.navigate('List')
      } catch (error) {
        console.error(error);
      }
    }
  };

  const listar = async () => {
    try {
      console.log(route.params.id)
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

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => {
        setModalVisible(true);
        setSelectedItemId(id);
      }} style={{ marginTop: -30, marginLeft: 330 }}
        hitSlop={{ top: 3, bottom: 3, left: 3, right: 3 }}>

        <View>
          <Ionic name="ellipsis-vertical-sharp" size={24} color="black" />
        </View>

      </TouchableOpacity>
      <View style={styles.container}>
        <View style={{ marginTop: 5 }}>
          <Text style={styles.labelP}>{provider}</Text>
          <Text style={styles.alertText}>{copied ? 'Copied' : ''}</Text>
          <Text></Text>
          <TouchableOpacity onPress={() => {
            Clipboard.setString(username);
            setCopied(true);
            setAnimation('zoomIn')
            Vibration.vibrate(700);
            setTimeout(() => {
              setCopied(false);
              setAnimation('')
            }, 1000);
          }}>
            <Text style={styles.label}>Username</Text>
            <Text style={{ fontSize: 13 }}>{username + '\n'}</Text>
          </TouchableOpacity>
          <Text></Text>
          <TouchableOpacity onPress={() => {
            Clipboard.setString(pswd);
            setCopied(true);
            setAnimation('zoomIn')
            Vibration.vibrate(700);
            setTimeout(() => {
              setCopied(false);
              setAnimation('')
            }, 1000);
          }}>
            <Text style={styles.label}>Password</Text>
            <Text Testyle={{ fontSize: 13 }} >{masked ? "*".repeat(pswd.length) : pswd}</Text>
          </TouchableOpacity>
          <View><TouchableOpacity onPress={() => setMasked(!masked)} style={styles.buttonContainer}>
            <Ionic
              name={masked ? 'eye-outline' : 'eye-off-outline'}
              size={25}
              color="black"
            />
          </TouchableOpacity></View>
          <Text></Text>
          <Text></Text>
          <Text style={styles.label}>Security</Text>
          <PasswordStrengthMeterBar password={pswd} showStrenghtText={false} height={3} radius={20} />
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => setModalVisible(false)}>
            <View style={styles.modalView}>
              <View style={styles.editButtonsContainer}>
                <Button
                  title="Edit"
                  onPress={() => {
                    navigation.navigate('Edit Password', { id: id });
                    setModalVisible(false);
                  }}
                />
                <Button
                  title="Delete"
                  color="#FF0000"
                  onPress={() => {
                    twoOptionAlertHandler(id)
                    setModalVisible(false);
                  }}
                />
              </View>
              <View style={styles.separator} />
              <Button
                title="Close"
                onPress={() => setModalVisible(false)}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 100,
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
  labelP: {
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: -130,
    marginBottom: 20,
    alignSelf: 'center'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  alertText: {
    color: '#d8000c',
    fontWeight: 'bold',
    marginLeft: 146,
    marginBottom: 10
  },
  label: {
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10
  },
  buttonContainer: {
    marginTop: -44,
    marginLeft: 310,
  },
  modalView: {
    backgroundColor: "#D5D5D5",
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 30,
    elevation: 1,
    marginHorizontal: 20,
    marginTop: 'auto',
    marginBottom: 'auto',
    maxHeight: '60%',
    marginBottom: 90,
  },
  editButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  separator: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'gray',
    marginVertical: 10,
  },
});