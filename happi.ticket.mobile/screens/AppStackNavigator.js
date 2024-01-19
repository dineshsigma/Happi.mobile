const Stack = createNativeStackNavigator();
import * as React from "react";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import 'react-native-gesture-handler'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { Provider } from 'react-redux';
import { store } from './store';

import PhoneVerification from "./PhoneVerification";
import Apps from "./Apps";
import BarCodeScanner from "./BarCodeScanner";
import Scanner from "./Scanner";
import ProductSearch from "./ProductSearch";
import ProductsDetails from "./ProductsDetails";
import LoginStack from "./LoginStack";
import ScannedProDetails from "./ScannedProDetails";
import Profile from "./Profile";
import DrawerNavigator from "./DrawerNavigator";
import 'react-native-gesture-handler'
import Tickets from "./Tickets";
import Addticket from "./tickets/Addticket";
import TicketDetails from "./tickets/TicketDetails";
import Addcomment from "./tickets/Addcomment";
import DiscountFlow from "./Discounts/DiscountFlow";
import DiscountDashboard from "./Discounts/DiscountDashboard";
import Discount from "./Discounts/Discount";
import AddInvoice from "./AddInvoice";
import UploadDocs from "./UploadDocs";
import FileVerification from "./FileVerification";
import EditTicket from "../components/EditTicket";
import Login1 from "./Login1";

import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DiscountLogin from "./DiscountLogin";
import DiscountLoginOtp from "./DiscountLoginOtp";
import DiscountHisStack from "./Discounts/DiscountHisStack";
import DiscountProfile from "./DiscountProfile";
import DiscountTable from "./Discounts/DiscountTable";
import Dayreports from "./Discounts/Dayreports";
import StockRequest from "./StockTransfer/StockRequest";
import RequestedStocks from "./StockTransfer/RequestedStocks";
import ReceivedRequests from "./StockTransfer/ReceivedRequests";
import RaiseRequest from "./StockTransfer/RaiseRequest";
import StockDeliveryDets from "./StockTransfer/StockDeliveryDets";
import StockScanner from "./StockTransfer/StockScanner";
import ScannedDlvryDets from "./StockTransfer/ScannedDlvryDets";
import StockScanner2 from "./StockTransfer/StockScanner2";
import UpdateReceived from "./StockTransfer/UpdateReceived";
import AuditScan from "./AuditTransfer/AuditScan";

const AppStackNavigator = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);
  const token = useSelector((state) => state.auth.token);
  const [userToken, setUserToken] = React.useState()

  React.useEffect(() => {
    AsyncStorage.getItem('token').then(value => {
      console.log('vaaall', value)

      if (value == "" || value == null || value == undefined) {
        // dispatch(updatetoken(value));
        // navigation.navigate('Login1');
        setUserToken()
      } else {
        setUserToken(value)
      }
    })
  }, [token])
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      <Stack.Screen
        name="Apps"
        component={Apps}
        options={{ headerShown: false }}
      />


      {/* {userToken == null && <Stack.Screen
              name="Login1"
              component={Login1}
              options={{ headerShown: false }}
            />} */}

      <Stack.Screen
        name="LoginStack"
        component={LoginStack}
        options={{ headerShown: false }}
      />


      <Stack.Screen
        name="PhoneVerification"
        component={PhoneVerification}
        options={{
          headerShown: true,
          headerTitle: 'iPhone Terminal',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: 'rgb(251, 144, 19)',

          },
          headerTitleAlign: 'center'

        }}
      />

      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DiscountProfile"
        component={DiscountProfile}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="BarCodeScanner"
        component={BarCodeScanner}
        options={{
          headerShown: true,
          headerTitle: 'Product (₹)',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: 'rgb(251, 144, 19)',
          },
          headerTitleAlign: 'center'

        }}
      />
      <Stack.Screen
        name="Scanner"
        component={Scanner}
        options={{
          headerShown: true,
          headerTitle: 'Scanner',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: 'rgb(251, 144, 19)',
          },
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name="ProductSearch"
        component={ProductSearch}
        options={{
          headerShown: true,
          headerTitle: 'Search Product',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: 'rgb(251, 144, 19)',
          },
          headerTitleAlign: 'center'
        }}
      />

      <Stack.Screen
        name="ProductsDetails"
        component={ProductsDetails}
        options={{
          headerShown: true,
          headerTitle: 'Product Details',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: 'rgb(251, 144, 19)',
          },
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name="ScannedProDetails"
        component={ScannedProDetails}
        options={{ headerShown: false }}
      />

      {/* <Stack.Screen
              name="Login1"
              component={Login1}
              options={{ headerShown: false }}
            /> */}
      <Stack.Screen
        name="DrawerNavigator"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DiscountDashboard"
        component={DiscountDashboard}
        options={{
          headerShown: true, headerTitle: 'Discounts', headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: 'rgb(251, 144, 19)',
          },
          headerTitleAlign: 'center',
          headerBackVisible: false
        }}
      />
      <Stack.Screen
        name="HappiTickets"
        component={Tickets}
        options={{
          headerShown: true,
          headerTitle: 'Ticket Management',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: 'rgb(251, 144, 19)',
          },
          headerTitleAlign: 'center'

        }}
      />
      <Stack.Screen
        name="AddTicket"
        component={Addticket}
        options={{
          headerShown: true,
          headerTitle: 'Add Ticket',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: 'rgb(251, 144, 19)',
          },
          headerTitleAlign: 'center'

        }}
      />
      <Stack.Screen
        name="TicketDetails"
        component={TicketDetails}
        options={{
          headerShown: true,
          headerTitle: 'Ticket Details',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: 'rgb(251, 144, 19)',
          },
          headerTitleAlign: 'center'

        }}
      />

      <Stack.Screen
        name="EditTicket"
        component={EditTicket}
        options={{
          headerShown: true,
          headerTitle: 'Edit Ticket',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: 'rgb(251, 144, 19)',
          },
          headerTitleAlign: 'center'

        }}
      />
      <Stack.Screen
        name="AddComment"
        component={Addcomment}
        options={{
          headerShown: true,
          headerTitle: 'Add Comment',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: 'rgb(251, 144, 19)',
          },
          headerTitleAlign: 'center'

        }}
      />
      <Stack.Screen
        name="cashdiscount"
        component={DiscountFlow}
        options={{
          headerShown: true,
          headerTitle: 'Cash Discount',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: 'rgb(251, 144, 19)',
          },
          headerTitleAlign: 'center'

        }}
      />
      <Stack.Screen
        name="Discount"
        component={Discount}
        options={{
          headerShown: true,
          headerTitle: 'Discount flow',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: 'rgb(251, 144, 19)',
          },
          headerTitleAlign: 'center'

        }}
      />

      <Stack.Screen
        name="DiscountLogin"
        component={DiscountLogin}
        options={{
          headerShown: true,
          headerTitle: 'Discount Login',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: 'rgb(251, 144, 19)',
          },
          headerTitleAlign: 'center',
          // headerBackVisible: false

        }}
      />

      <Stack.Screen
        name="DiscountLoginOtp"
        component={DiscountLoginOtp}
        options={{
          headerShown: true,
          headerTitle: 'OTP Verification',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: 'rgb(251, 144, 19)',
          },
          headerTitleAlign: 'center',
          // headerBackVisible:false

        }}
      />

      <Stack.Screen
        name="DiscountTable"
        component={DiscountTable}
        options={{
          headerShown: true,
          headerTitle: 'Discount flow',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: 'rgb(251, 144, 19)',
          },
          headerTitleAlign: 'center'

        }}
      />

      <Stack.Screen
        name="Dayreports"
        component={Dayreports}
        options={{
          headerShown: true,
          headerTitle: 'Discount flow',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: 'rgb(251, 144, 19)',
          },
          headerTitleAlign: 'center'

        }}
      />

      <Stack.Screen
        name="AddInvoice"
        component={AddInvoice}
        options={{
          headerShown: true,
          headerTitle: 'Add Invoice Details',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: 'rgb(251, 144, 19)',
          },
          headerTitleAlign: 'center'

        }}
      />

      <Stack.Screen
        name="UploadDocs"
        component={UploadDocs}
        options={{
          headerShown: true,
          headerTitle: 'Upload Document',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: 'rgb(251, 144, 19)',
          },
          headerTitleAlign: 'center'

        }}
      />

      <Stack.Screen
        name="FileVerification"
        component={FileVerification}
        options={{
          headerShown: true,
          headerTitle: 'Invoice Verification',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: 'rgb(251, 144, 19)',
          },
          headerTitleAlign: 'center'

        }}
      />

      <Stack.Screen
        name="AuditScan"
        component={AuditScan}
        options={{
          headerShown: true,
          headerTitle: 'Audit Scan',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: 'rgb(251, 144, 19)',
          },
          headerTitleAlign: 'center'

        }}
      />

      <Stack.Group>
        <Stack.Screen name="StockRequest"
        component={StockRequest}
        options={{
          headerShown: true,
          headerTitle: 'Stock Transfer',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: 'rgb(251, 144, 19)',
          },
          headerTitleAlign: 'center'

        }}/>

      <Stack.Screen name="RequestedStocks"
        component={RequestedStocks}
        options={{
          headerShown: false,
        }}/>

      <Stack.Screen name="ReceivedRequests"
        component={ReceivedRequests}
        options={{
          headerShown: false,
        }}/>

      <Stack.Screen name="RaisedRequests"
        component={RaiseRequest}
        options={{
          headerShown: true,
          headerTitle: 'Stock Request',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: 'rgb(251, 144, 19)',
          },
          headerTitleAlign: 'center'
        }}/>
         <Stack.Screen name="StockDeliveryDets"
        component={StockDeliveryDets}
        options={{
          headerShown: true,
          headerTitle: 'Stock Delivery',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: 'rgb(251, 144, 19)',
          },
          headerTitleAlign: 'center'
        }}/>
         <Stack.Screen name="StockScanner"
        component={StockScanner}
        options={{
          headerShown: true,
          headerTitle: 'Stock Scanning',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: 'rgb(251, 144, 19)',
          },
          headerTitleAlign: 'center'
        }}/>
         <Stack.Screen name="StockScanner2"
        component={StockScanner2}
        options={{
          headerShown: true,
          headerTitle: 'Stock Scanning',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: 'rgb(251, 144, 19)',
          },
          headerTitleAlign: 'center'
        }}/>
         <Stack.Screen name="ScannedDlvryDets"
        component={ScannedDlvryDets}
        options={{
          headerShown: true,
          headerTitle: 'Delivery Details',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: 'rgb(251, 144, 19)',
          },
          headerTitleAlign: 'center'
        }}/>

    <Stack.Screen name="UpdateReceived"
        component={UpdateReceived}
        options={{
          headerShown: true,
          headerTitle: 'Delivery Updates',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: 'rgb(251, 144, 19)',
          },
          headerTitleAlign: 'center'
        }}/>
      </Stack.Group>




    </Stack.Navigator>
  )



};
export default AppStackNavigator;
