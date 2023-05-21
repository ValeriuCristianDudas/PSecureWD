import { StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert, Icon, ScrollView, SafeAreaView, FlatList, Pressable, ClipboardStatic, TextInput, Clipboard, Vibration } from 'react-native';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { ip } from '../../Config';
import { usuario } from './LoginScreen';
import Ionic from 'react-native-vector-icons/Ionicons';

export default function Home({ navigation }) {
  const [search, setSearch] = useState('')
  const [user, setUser] = useState(usuario);
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      listar();
    });
    return unsubscribe;
  }, [navigation]);

  //Llamamos al metodo del servidor para listar los objetos
  const listar = async () => {
    try {
      console.log(user.email);
      const response = await axios.get('http://' + ip + `:3000/listar/${user.email}`);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  //renderiza el item para ser mostrado en pantalla

  return (
    <View style={styles.container}>
      <View style={styles.container}>
      <Text style={{ fontSize: 24, color: 'black', fontFamily: 'Helvetica', alignSelf: 'center' }}>PSecureWD</Text>
        <View style={{ backgroundColor: "#F2F2F2", paddingHorizontal: 20, margin: 10 }}>
          <TextInput
            style={{ backgroundColor: "#D5D5D5", borderRadius: 5, height: 50, borderRadius: 10 }}
            placeholder="  Search"
            onChangeText={(e) => setSearch(e)}
          />
        </View>
        <View>
          <FlatList style={{ height: 570 }} showsVerticalScrollIndicator={false} data={data} renderItem={
            ({ item }) => {
              if (search != '') {
                if (item.provider.toLowerCase().includes(search.toLowerCase())) {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        Vibration.vibrate(100);
                        navigation.navigate('View', { id: item.id })
                      }}>
                      <View style={styles.card}>
                        <View style={styles.cardContent}>
                          <Text style={{ marginTop: 20, fontSize: 15, fontWeight: 'bold' }}>{item.provider + '\n'}</Text>
                          <Ionic name="arrow-forward" size={24} color="black" style={{marginLeft: 320, marginTop: -20}} />
                          <Text style={{ fontSize: 13 }}>{item.username + '\n'}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>)
                }
              } else {
                // new use case
                return (
                  <TouchableOpacity
                    onPress={() => {
                      Vibration.vibrate(100);
                      navigation.navigate('View', { id: item.id });
                    }}>
                    <View style={styles.card}>
                      <View style={styles.cardContent}>
                        <Text style={{ marginTop: 20, fontSize: 15, fontWeight: 'bold' }}>{item.provider + '\n'}</Text>
                        <Ionic name="arrow-forward" size={24} color="black" style={{marginLeft: 320, marginTop: -20}} />
                        <Text style={{ fontSize: 13 }}>{item.username + '\n'}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              }
            }
          } />
        </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    marginTop: 30
  },
  offerSlider: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 10,
    paddingRight: 20
  },

  swiperContainer: {
    height: 200,
    marginVertical: 10,
  },

  slide: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    alignContent: 'center',
    justifyContent: 'center',
    paddingRight: 20
  },

  buttonText: {
    color: 'black',
    fontSize: 30,
    fontWeight: '500',
    overflow: 'hidden',
    width: 40,
    height: 40,
    textAlign: 'center',
    lineHeight: 40,
  },

  card: {
    marginLeft: '5%',
    backgroundColor: '#fff',
    marginBottom: 5,
    width: '90%',
    borderRadius: 7,
  },

  cardContent: {
    margin: 10
  },

  button: {
    width: '90%',
    height: '9%',
    borderRadius: 10,
    backgroundColor: '#280137',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginLeft: 18
  },
  buttonContainer: {
    backgroundColor: "#5CADCD",
    width: "37%",
    margin: 20,
    padding: 10,
    alignItems: "center",
    borderRadius: 20,
    marginTop: 5,
    marginLeft: 240
  },
  alertText: {
    color: '#d8000c',
    fontWeight: 'bold',
    marginLeft: 185,
    marginBottom: 10
  },

})