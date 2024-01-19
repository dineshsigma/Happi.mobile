const Stack = createNativeStackNavigator();
import * as React from "react";
import {useEffect, useState} from "react";
import { NavigationContainer } from "@react-navigation/native";
import 'react-native-gesture-handler'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import History from "./History";
import DiscountSummary from "./DiscountSummary";


const HistoryStackNav = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);
  return (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            
             <Stack.Screen
              name="History"
              component={History}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DiscountSummary"
              component={DiscountSummary}
              options={{ headerShown: false }}
            />

    
           
        
          
          </Stack.Navigator>
        ) 
     

  
};
export default HistoryStackNav;
