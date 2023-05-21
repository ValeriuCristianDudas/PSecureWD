import * as React from 'react';
import { AsyncStorage } from 'react-native';
import Navigation from './Navigation'
import LoginScreen from './src/screens/LoginScreen'

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(null);

  React.useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if(value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true')
        setIsFirstLaunch(true)
      } else {
        setIsFirstLaunch(false)
      }
    })
  })

  if(isFirstLaunch === null) {
    return null
  } else if(isFirstLaunch === true) {
    return (<LoginScreen />);
  } else {
    return (<Navigation />);
  }

  // return (
  //   <Navigation />
  // );
}