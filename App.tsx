/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';


import { Image,  NativeModules,
  NativeEventEmitter } from "react-native";
import  { useContext, useState, useEffect } from "react";
// import { loadCGCampaign, registerUser, setCGScreenName } from "./src/customerglu/CGManger"

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
// import { loadCampaignById } from '@customerglu/react-native-customerglu';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductDetailsScreen from "./src/screen/ProductDetailsScreen";
import HomeScreen from './src/screen/HomeScreen';
import RegisterScreen from './src/RegisterScreen';
import { initCGSDK } from '@customerglu/react-native-customerglu';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

// import { DisplayCGNotification,DisplayCGBackgroundNotification,handleDeepLinkUri } from '@customerglu/react-native-customerglu';
const Stack = createNativeStackNavigator();


import {PermissionsAndroid} from 'react-native';

// import messaging from '@react-native-firebase/messaging';
import ProfileScreen from './src/screen/AccountScreen';




function App(): React.JSX.Element {

  
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
 

useEffect(()=>{
  initCGSDK("in")

},[])


  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName={'RegisterScreen'}>
        <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'SplashScreen', headerShown: false }}
        />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ title: 'SplashScreen', headerShown: false }}
        />
         <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{ title: 'SplashScreen', headerShown: false }}
        />
   
        <Stack.Screen
            name="PRODUCT_DETAILS"
            component={ProductDetailsScreen}
            options={{ title: 'HomeScreen', headerBackVisible: false }}
        />
  
    </Stack.Navigator>
</NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  bannerImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover', // Ensures the image covers the full width and maintains its aspect ratio
    marginVertical: 20,
  },
});

export default App;
