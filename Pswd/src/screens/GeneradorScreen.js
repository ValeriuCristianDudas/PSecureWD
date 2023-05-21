import * as React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert, TextInput, Clipboard, Vibration } from 'react-native';
import generatePassword from '../../password';
import { useState, useEffect } from 'react';
import * as Animatable from 'react-native-animatable';



const GeneradorScreen = ({navigation}) => {
  const [pswd, setPswd] = useState(null);
  const [copied, setCopied] = useState(false);
  const [animation, setAnimation] = useState('')
  const updatePswd = () => {
    setPswd(generatePassword())
    console.log(pswd)     
  }; 

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setPswd(null);
    });
    return unsubscribe;
  }, [navigation]);

  if(pswd === null){
    console.log("pswd")
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
        onPress={updatePswd}
        title="Generate Password"/>
      </View>
    )
  } else {
    console.log("no entra")
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Animatable.Text animation={animation} style={{marginBottom: 10}}>{copied ? 'Password copied' : ''}</Animatable.Text>
        <TouchableOpacity onPress={() => { 
          Clipboard.setString(pswd);
          setCopied(true);
          setAnimation('zoomIn')
          Vibration.vibrate(700);
          setTimeout(() => {
            setAnimation('')
            setCopied(false);
         }, 1000);}}>
          <Text style={{ color:'#000', fontSize: 35, fontWeight: 'bold', marginBottom: 20 }}>{pswd}</Text>
        </TouchableOpacity>
        <Button
        onPress={updatePswd}
        title="Generate Password"/>
      </View>
  )
  }
    
}

export default GeneradorScreen;