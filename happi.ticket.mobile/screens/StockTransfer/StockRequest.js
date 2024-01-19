import * as React from "react";
import {
  Text, StyleSheet, View, Image, Pressable,
  ImageBackground, RefreshControl, FlatList, Dimensions, SafeAreaView, TextInput, TouchableOpacity, Modal, StatusBar, Linking, Button, ScrollView, TouchableHighlight, Platform
} from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import EditTicket from "../../components/EditTicket";
import Comments from "../../components/Comments";
import RequestedStocks from "./RequestedStocks";
import ReceivedRequests from "./ReceivedRequests";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateScanProduct,getReceivedStock } from "../../reducers/stockTransfer";
import { useDispatch } from "react-redux";
import RaisedToAdmin from "./RaisedToAdmin";
const Tab = createMaterialTopTabNavigator();
const dimensions_width = Dimensions.get('window').width;

const StockRequest=()=>{
    const [storeDetails, setStoreDetails] = React.useState();
    const dispatch=useDispatch()
    const [reqLength,setReqLength]=React.useState()
    React.useEffect(()=>{
        AsyncStorage.getItem('user').then(value => {
            let userData = JSON.parse(value);
            let payload = {
              store_id: userData?.store_id,
              filter: 'raised'
            }
            dispatch(getReceivedStock(payload)).then(res => {
              let stockdata = res.payload;
              console.log('stockDaaaa',stockdata)
              let data = res.payload?.data?.filter(item => {
                return item.internal_status == 'forward-store-2' || item.internal_status== "admin-approved"
              });
              console.log('data',data)
              setReqLength(data?.length)
              // console.log('requested stocks',res.payload.data)
              // console.log('to store data',res.payload.data[0].toStoreData)
            });
          });
    },[])
    React.useEffect(()=>{
        dispatch(updateScanProduct(''))
        AsyncStorage.getItem('storeDetails').then((user) => {
            if (user == "" || user == null || user == undefined) {
                //Show no user image
            }
            else {
                setStoreDetails(JSON.parse(user)[0])
            }
          })
        },[])
    return (
        <View style={styles.container}>
            <View style={styles.header}>
            <Text style={styles.titleHeader}>STORE NAME: {storeDetails?.store_name}</Text>
            </View>
            <Tab.Navigator style={[styles.tabViewContainer]}
                lazy={true}
                optimizationsEnabled={true}
                screenOptions={{
                    tabBarScrollEnabled: true,
                    tabBarActiveTintColor: 'rgb(251, 144, 19)',
                    tabBarLabelStyle: { fontSize: 13, fontWeight: '600', padding: 0 },
                    tabBarInactiveTintColor: 'gray',
                    tabBarItemStyle: { width: dimensions_width / 2.2 },
                    tabBarStyle: { backgroundColor: '#F0F4FD', backgroundColor: '#FFF', height: 50, borderWidth: 0 },
                    swipeEnabled: true,
                    tabBarIndicator: false,
                    tabBarIndicatorStyle: {
                        borderBottomColor: 'rgb(251, 144, 19)',
                        borderBottomWidth: 4,
                    },
                }}
            >
                <Tab.Screen name="Requested Stocks" component= {RequestedStocks} />
                <Tab.Screen name="Received Request" component= {ReceivedRequests} 
                options={{
                    tabBarBadge:()=> { return ( 
                        <View style={{width:20,height:20,backgroundColor:'red',borderRadius:15, position:'absolute',right:5}}> 
                    <Text style={{color:'#fff',alignSelf:'center'}}>{reqLength}</Text>
                    </View> ) }
                }}
                />
                {/* <Tab.Screen name="Raised To Admin" component= {RaisedToAdmin}/> */}


            </Tab.Navigator>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:10
    },
    header:{
        justifyContent:'center',
        alignItems:'center'
    },
    titleHeader:{
        color:'#000',
        fontSize:16
    },
    tabViewContainer:{
        top:10, 
    }
})
export default StockRequest