const Stack = createNativeStackNavigator();
import * as React from "react";
import {useEffect, useState} from "react";
import { NavigationContainer,StackActions,useNavigation } from "@react-navigation/native";
import 'react-native-gesture-handler'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Pressable, TouchableOpacity,BackHandler } from "react-native";
import { Provider } from 'react-redux';
import {store} from './store';
import ProductsDetails from "./ProductsDetails";
import Login1 from "./Login1";
import Login from "./Login";
import AppStackNavigator from "./AppStackNavigator";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Profile from "./Profile";




const LoginStack = () => {
  const navigation = useNavigation();

  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);
  const token = useSelector((state) => state.auth.token);
  const [userToken, setUserToken]= React.useState()

  React.useEffect(() => {
    AsyncStorage.getItem('token').then(value => {
      console.log('vaaall',value)

      if (value == "" || value == null || value == undefined) {
        // dispatch(updatetoken(value));
        // navigation.navigate('Login1');
        setUserToken()
      } else {
        setUserToken(value)
      }

      
    if(value == null){
    const backAction = () => {
    // BackHandler.exitApp()  
    navigation.dispatch(
      StackActions.replace('Login')
    );
  };

  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    backAction,
  );

  return () => backHandler.remove();
    }
    })

  }, [token])
  console.log('user token', userToken)
  return (
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
            
           {userToken == undefined &&
             <Stack.Screen
              name="Login"
              component={Login1}
              options={{ headerShown: false }}
            />}        
           
           
          { <Stack.Screen
              name="AppStackNavigator"
              component={AppStackNavigator}
              options={{ headerShown: false }}
            />}
           
           {/* <Stack.Screen
              name="Profile"
              component={Profile}
              options={{ headerShown: false }}
            /> */}
        
          
          </Stack.Navigator>
        ) 
     

  
};
export default LoginStack;
