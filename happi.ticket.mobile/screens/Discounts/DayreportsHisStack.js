const Stack = createNativeStackNavigator();
import * as React from "react";
import {useEffect, useState} from "react";
import { NavigationContainer } from "@react-navigation/native";
import 'react-native-gesture-handler'
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HistoryDetails from "./HistoryDetails";
import CashDiscountHistory from "./CashDiscountHistory";
import Dayreports from "./Dayreports";


const DayreportsHisStack = () => {
  return (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            
             <Stack.Screen
              name="Dayreports"
              component={Dayreports}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="HistoryDetails"
              component={HistoryDetails}
              options={{ headerShown: false }}
            /> 
          </Stack.Navigator>
        ) 
     
  
};
export default DayreportsHisStack;
