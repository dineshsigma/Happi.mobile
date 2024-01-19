import * as React from "react";
import {
    Text, StyleSheet, View, Image, Pressable,
    ImageBackground, RefreshControl, FlatList, Dimensions, SafeAreaView, TextInput, TouchableOpacity, Modal, StatusBar, Linking, Button, ScrollView, TouchableHighlight, Platform
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { updatetoken } from '../reducers/auth';
// import Geolocation from 'react-native-geolocation-service';
// import { getDistance, getPreciseDistance } from 'geolib';
// // import { ScrollView } from "react-native-gesture-handler";
// import FlatGrid from 'react-native-super-grid';
// import { getDashboardDetails, getVersionInfo, getAllLatLang, activityLogs } from "../reducers/incentives";
// import Spinner from 'react-native-loading-spinner-overlay';
// import { ProgressBar, Colors } from 'react-native-paper';
// import { CurrencyToAbbreviation } from "currency-to-abbreviation";
// import Ripple from 'react-native-material-ripple';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
// import Ionicons from 'react-native-vector-icons/Ionicons'
// import LinearGradient from "react-native-linear-gradient";
// import InAppUpdate from './InAppUpdate'
// import VersionInfo from 'react-native-version-info';
// import { Input } from "native-base";
// // import { RNCamera, FaceDetector } from 'react-native-camera';
// import { CameraScreen } from 'react-native-camera-kit';
// import { getProductDetails } from "../reducers/incentives";
// import { TestWatcher } from "jest";

const ScannedProDetails = ({route}) => {
    const navigation = useNavigation();
    // const [cameraOn, setCameraOn] = React.useState()
    const item_info = route?.params;

    // React.useEffect(()=>{
    //     if(item_info.payload.data.length > 0){
            
    //     }
    // },[])
    return (
        <View style={{ padding: 15 }}>
            <MaterialCommunityIcons name="keyboard-backspace" color="#6F787C" size={26} style={{ top: 20 }} onPress={() => navigation.navigate('BarCodeScanner')} />
         
            <View style={styles.button}
                >
               {
               item_info?.payload?.data?.length > 0 &&
               <View >
                    <Text style={{top:5, fontWeight:'700',fontSize:18, textAlign:'center', color:'#000'}}>{item_info?.payload?.data[0].ITEM_NAME}</Text>
                    <Text style={{top:5, fontWeight:'700', textAlign:'center', color:'#000'}}>HAPPI PRICE</Text>
                    <Text style={{top:5, fontWeight:'700', color:'rgb(251, 144, 19)',textAlign:'center',fontSize:24}}>₹{parseInt(item_info?.payload?.data[0].ITEM_PRICE).toLocaleString('en-IN')}.00/-</Text>


                </View>}

                {
                    item_info?.payload?.message &&
                    <View>
                        <Text style={{top:5, fontWeight:'700', color:'orange',textAlign:'center'}}>No data Found</Text>
                        </View>
                }
            </View>
            {/* <Text>Product details</Text> */}

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
    button:{ top: 20, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', height: 60, borderWidth: 1, borderRadius: 10, marginTop: 30, borderColor: 'orange' , height:150}

});

export default ScannedProDetails;
