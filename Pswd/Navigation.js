import * as React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './src/screens/LoginScreen'
import OnBoardingScreen from './src/screens/OnBoardingScreen'
import ProfileScreen from './src/screens/ProfileScreen'
import GeneradorScreen from './src/screens/GeneradorScreen'
import InsertarScreen from './src/screens/InsertarScreen'
import ListarScreen from './src/screens/ListarScreen'
import EditarScreen from './src/screens/EditarScreen'
import ViewScreen from './src/screens/ViewScreen'
import Ionic from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator(); 
export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, size, colour }) => {
            let iconName;
            if (route.name == "Profile") {
              iconName = focused ? "person-circle" : "person-circle-outline";
            } else if (route.name == "PswdGenerator") {
              iconName = focused ? "code-slash" : "code-slash-outline";
            } else if (route.name == "Add Password") {
              iconName = focused ? "add-circle" : "add-circle-outline";
            } else if (route.name == "List") {
              iconName = focused ? "list-circle" : "list-circle-outline";
            } else if (route.name == "Edit Password") {
              iconName = focused ? "create" : "create-outline";
            }
            return <Ionic name={iconName} size={size} colour={colour}></Ionic>
          }
        })}>
        <Tab.Screen name="Login" component={LoginScreen} options={{ tabBarStyle: { display: "none" }, tabBarButton: () => null, headerShown: false }} />
        <Tab.Screen name="OnBoarding" component={OnBoardingScreen} options={{ tabBarStyle: { display: "none" }, tabBarButton: () => null, headerShown: false }} />
        <Tab.Screen name="List" component={ListarScreen} options={{ headerShown: false, tabBarLabel: () => null }}/>
        <Tab.Screen name="PswdGenerator" component={GeneradorScreen} options={{ headerShown: false, tabBarLabel: () => null }}/>
        <Tab.Screen name="Add Password" component={InsertarScreen} options={{ headerShown: true, tabBarLabel: () => null }}/>
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: true, tabBarLabel: () => null }}/>
        <Tab.Screen name="Edit Password" component={EditarScreen} options={{ tabBarButton: () => null, headerShown: true }} />
        <Tab.Screen name="View" component={ViewScreen} options={{ tabBarButton: () => null, headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}