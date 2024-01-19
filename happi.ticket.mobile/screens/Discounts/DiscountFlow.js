import * as React from "react";
import {
    Text, StyleSheet, View, Image, Pressable,
    ImageBackground, RefreshControl, FlatList, Dimensions, SafeAreaView, TextInput, TouchableOpacity, Modal, StatusBar, Linking, Button, ScrollView, TouchableHighlight, Platform
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Cashdiscount from "./Cashdiscount";
import CashDiscountHistory from "./CashDiscountHistory";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import DiscountHisStack from "./DiscountHisStack";
import DiscountTable from "./DiscountTable";
import Dayreports from "./Dayreports";
import DayreportsHisStack from "./DayreportsHisStack";




const Tab = createBottomTabNavigator();
const DiscountFlow = () => {
    const navigation = useNavigation();

    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarActiveTintColor: 'rgb(251, 144, 19)',tabBarInactiveTintColor:'#c8c8c8',
            tabBarStyle: {height: Platform.OS==='ios'?74:64,backgroundColor: '#fff', borderTopWidth: 0, elevation: 0, padding: 2,display:"flex",alignItems:'center',justifyContent:'space-between',},
            tabBarItemStyle: {position:'relative',zIndex:99, display:'flex',alignItems:'center',justifyContent:"space-between",padding:0,paddingTop:12,paddingBottom:10,},
            tabBarHideOnKeyboard: true,
            headerShown:false          
          })}
        >
        <Tab.Screen name="Discount" component={Cashdiscount} 
        options={{
          tabBarIcon: ({focused}) =>
            <MaterialCommunityIcons  name={focused ?'tag-multiple':'tag-multiple-outline'} size={24} solid color={focused ?'rgb(251, 144, 19)':'#c8c8c8'}/> 
          
        }}/>
          <Tab.Screen name="Reports" component={DiscountTable} 
        options={{
          tabBarIcon: ({focused}) =>
            <MaterialCommunityIcons  name={'chart-pie'} size={24} solid color={focused ?'rgb(251, 144, 19)':'#c8c8c8'}/> 
          
        }}/>
          <Tab.Screen name="Day Reports" component={DayreportsHisStack} 
        options={{
          tabBarIcon: ({focused}) =>
            <MaterialCommunityIcons  name={'view-day-outline'} size={24} solid color={focused ?'rgb(251, 144, 19)':'#c8c8c8'}/> 
          
        }}/>
        <Tab.Screen name="History" component={DiscountHisStack} 
        options={{
            tabBarIcon: ({focused}) =>
              <MaterialCommunityIcons name='timetable' size={24} solid color={focused ?'rgb(251, 144, 19)':'#c8c8c8'}/> 
            
          }}/>
        </Tab.Navigator>


    );
};

const styles = StyleSheet.create({
    circle: {
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.4,
        height: Dimensions.get('window').width * 0.4,
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
    button: { top: 20, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', height: 60, borderWidth: 1, borderRadius: 10, marginTop: 30, borderColor: 'orange', height: 150 }

});

export default DiscountFlow;
