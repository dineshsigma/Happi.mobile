import * as React from "react";
import {
    Text, StyleSheet, View, Image, Pressable,
    ImageBackground, RefreshControl, FlatList, Dimensions, SafeAreaView, TextInput, TouchableOpacity, Modal, StatusBar, Linking, Button, ScrollView, TouchableHighlight, Platform,BackHandler
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useSelector, useDispatch } from "react-redux";
import { updatetoken, updateDiscountToken } from "../reducers/auth";
import LoginStack from "./LoginStack";


const Profile = () => {
    const navigation = useNavigation();
    const [userData, setUserData]= React.useState()
    const [showProfile, setShowProfile]= React.useState()
    const token = useSelector(state => state.auth.token);
    const dispatch= useDispatch()

    // verify_data
    React.useEffect(()=>{
        AsyncStorage.getItem('user').then((user) => {
            if (user == "" || user == null || user == undefined) {
                //Show no user image
            }
            else {
                console.log('user Details',JSON.parse(user))
              setUserData(JSON.parse(user));
            }
          })

          AsyncStorage.getItem('token').then((value) => {
            console.log('value profile', value)    
                if(value==null){
                    navigation.navigate('LoginStack')
                }
          })
    },[token])
    return (
        <View style={{ padding: 15, flex:1, }}>
            <MaterialCommunityIcons name="keyboard-backspace" color="#6F787C" size={26} style={{ top: 20 }} onPress={() => navigation.navigate('Apps')} />      
            <View style={styles.button}>
               <View>
                    {/* <Text style={{top:5}}>{item_info?.payload?.data[0].ITEM_NAME}</Text> */}
                    <Text style={{fontWeight:'700', textAlign:'left', fontSize:20, color:'#000'}}>Account Details</Text>
                    <View style={{top:10, justifyContent:'flex-start'}}>
                    <Text style={{fontWeight:'700',textTransform:'capitalize',color:'#000' }}>Name : {userData?.name}</Text>
                    <Text style={{fontWeight:'700',color:'#000'}}>Employee ID : {userData?.emp_id}</Text>
                    <Text style={{fontWeight:'700',color:'#000'}}>Email ID : {userData?.email}</Text>
                    <Text style={{fontWeight:'700',color:'#000'}}>Phone: {userData?.phone}</Text>
                    </View>
                </View>             
            </View>
           <View style={{justifyContent:'flex-end', alignItems:'flex-end',position:"relative",right:0,left:0}}>
            <TouchableHighlight
             style={styles.logout}
             onPress={()=>{
                 AsyncStorage.removeItem('token')                                    
                    
                    AsyncStorage.removeItem('user') .then(()=>  dispatch(updatetoken()),navigation.navigate('LoginStack') );
                    AsyncStorage.removeItem('discountToken').then(()=>dispatch(updateDiscountToken()))                                    
                    AsyncStorage.removeItem('discountUser') 

            }}>
             <View>
             <Text style={{fontWeight:'700', color:'#fff'}}>Logout</Text>
             </View>
         </TouchableHighlight>
         </View>
        </View>
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
    button:{ top: 20, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', height: 60, borderWidth: 1, borderRadius: 10, marginTop: 30, borderColor: 'orange' , height:150},
    logout:{width:'100%', height:40, backgroundColor:'rgb(251, 144, 19)', justifyContent:'center', alignItems:'center',top:80,}
});

export default Profile;
