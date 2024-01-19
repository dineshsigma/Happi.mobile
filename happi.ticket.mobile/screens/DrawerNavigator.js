import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {SafeAreaView, Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native'
// import App from "../App";
import { useNavigation } from "@react-navigation/native";


import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
  } from '@react-navigation/drawer';
import Dashboard from "./Discounts/Dashboard";
import Discount from "./Discounts/Discount";
import History from "./Discounts/History";
import Reports from "./Discounts/Reports";
import 'react-native-gesture-handler'
import ApprovalDashboard from "./Discounts/ApprovalDashboard";
import StoreList from "./Discounts/StoreList";
import ApproveDiscount from "./Discounts/ApproveDiscount";
import CheckDiscount from "./Discounts/CheckDiscount";
import ApproveReports from "./ApproveReports";
import HistoryStackNav from "./Discounts/HistoryStackNav";
import Cashdiscount from "./Discounts/Cashdiscount";
import DiscountFlow from "./Discounts/DiscountFlow";


  
  
  const Drawer = createDrawerNavigator();


// const Drawer = createDrawerNavigator();



const DrawerNavigator = () => {
  return (

  
    <Drawer.Navigator screenOptions={{ headerShown: true,
        swipeEnabled:true,
          itemStyle: {marginVertical: 5, marginTop:50},
          drawerStyle:{backgroundColor:'rgb(251, 144, 19)',color:'#fff'},
          drawerLabelStyle:{backgroundColor:'#fff'}
     }}
     drawerContent={(props)=> {
      return(
          <View style={{flex:1, marginLeft:10}}>
              <DrawerContentScrollView {...props}>
                <View style={{width:250, height:40, backgroundColor:'#fff', marginLeft:30, right: 20, borderRadius:10, top:50,}}>
                      <Text style={{color:'rgb(251, 144, 19)', top:10, fontSize:14, left:15 }}>MANAGER DISCOUNT - STORE</Text>
                       </View>  
                       <View style={{width:250, height:60, backgroundColor:'#fff', marginLeft:30, right: 20, borderRadius:10, top:310,position:'absolute',}}>
                      <Text style={{color:'rgb(251, 144, 19)', top:10, fontSize:14, textAlign:'center' }}>MANAGER DISCOUNT - APPROVAL PANEL</Text>
                       </View>         
                  <DrawerItemList {...props}/>
               
              </DrawerContentScrollView>
        
          </View>
      )
  } 
  }>
      <Drawer.Screen     
        name="DashboardStore"
        component={Dashboard}
        options={{ 
            drawerContentStyle:{top:150},
            unmountOnBlur: true,
            drawerLabelStyle:{color:'#fff' },
            drawerItemStyle:{marginTop:60}    
        }}
      />
      <Drawer.Screen
        name="Discount"
        component={Discount}
        options={{ unmountOnBlur: true ,drawerLabelStyle:{color:'#fff'},headerStyle: {
          backgroundColor: 'rgb(251, 144, 19)',
        },
        headerTintColor:'#fff',
        headerTitleAlign:'center'}}
      />
        <Drawer.Screen
        name="History"
        component={HistoryStackNav}
        options={{ unmountOnBlur: true ,drawerLabelStyle:{color:'#fff'},headerStyle: {
          backgroundColor: 'rgb(251, 144, 19)',
        },
        headerTintColor:'#fff',
        headerTitleAlign:'center'}}
      />
      <Drawer.Screen
        name="Cash Discount"
        component={DiscountFlow}
        options={{ unmountOnBlur: true ,drawerLabelStyle:{color:'#fff'}, headerStyle: {
          backgroundColor: 'rgb(251, 144, 19)',
        },
        headerTintColor:'#fff',
        headerTitleAlign:'center'
      }}
      />
        {/* <Drawer.Screen
        name="Reports"
        component={Reports}
        options={{ unmountOnBlur: true ,drawerLabelStyle:{color:'#fff'}}}
      /> */}
      <Drawer.Screen
        name="Dashboard - Approval"
        component={ApprovalDashboard}
        options={{ unmountOnBlur: true ,drawerLabelStyle:{color:'#fff'},
        drawerItemStyle:{marginTop:70},headerStyle: {
          backgroundColor: 'rgb(251, 144, 19)',
        },
        headerTintColor:'#fff',
        headerTitleAlign:'center' }}
      />
      <Drawer.Screen
        name="StoreList"
        component={StoreList}
        options={{ unmountOnBlur: true ,drawerLabelStyle:{color:'#fff'},headerStyle: {
          backgroundColor: 'rgb(251, 144, 19)',
        },
        headerTintColor:'#fff',
        headerTitleAlign:'center'}}
      />
      <Drawer.Screen
        name="ApproveDiscount"
        component={ApproveDiscount}
        options={{ unmountOnBlur: true ,drawerLabelStyle:{color:'#fff'},headerStyle: {
          backgroundColor: 'rgb(251, 144, 19)',
        },
        headerTintColor:'#fff',
        headerTitleAlign:'center'}}
      />
       <Drawer.Screen
        name="CheckDiscount"
        component={CheckDiscount}
        options={{ unmountOnBlur: true ,drawerLabelStyle:{color:'#fff'},headerStyle: {
          backgroundColor: 'rgb(251, 144, 19)',
        },
        headerTintColor:'#fff',
        headerTitleAlign:'center'}}
      />
      <Drawer.Screen
        name="Reports - Approve"
        component={ApproveReports}
        options={{ unmountOnBlur: true ,drawerLabelStyle:{color:'#fff'},
        headerStyle: {
          backgroundColor: 'rgb(251, 144, 19)',
        },
        headerTintColor:'#fff',
        headerTitleAlign:'center'}}
      />
      
      
    </Drawer.Navigator>

  

  );
};

const styles = StyleSheet.create({
    sideMenuProfileIcon: {
      resizeMode: 'center',
      width: 100,
      height: 100,
      borderRadius: 100 / 2,
      alignSelf: 'center',
    },
    iconStyle: {
      width: 15,
      height: 15,
      marginHorizontal: 5,
    },
    customItem: {
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

export default DrawerNavigator;