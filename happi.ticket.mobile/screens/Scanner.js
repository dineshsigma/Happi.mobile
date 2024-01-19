import * as React from "react";
import {
    Text, StyleSheet, View, Image, Pressable,
    ImageBackground, RefreshControl, FlatList, Dimensions, SafeAreaView, TextInput, TouchableOpacity, Modal, StatusBar, Linking, Button, ScrollView, TouchableHighlight, Platform
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { CameraScreen } from 'react-native-camera-kit';
import { getBarcodeDetails } from "../reducers/products";
const Scanner = () => {
    const navigation = useNavigation();
    const [scannedVal, setScannedVal]= React.useState();
    const dispatch = useDispatch()
    const [scannedRes, setScannedRes]= React.useState();
    const onScanSuccessful=()=>{
        let payload = {
            "type":"imei",
            "ImeiSerialNo":scannedVal
        }
        dispatch(getBarcodeDetails(payload)).then((res)=>{     
                 navigation.navigate('ScannedProDetails', res)
        })
        
        
    }
    return (
        <View>
        {!scannedVal &&
                    <CameraScreen
                actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
                scanBarcode={true}
                onReadCode={(event) => setScannedVal(event.nativeEvent.codeStringValue)}
                showFrame={true} 
                laserColor="red" 
                frameColor="white" />
        }
        {
            scannedVal && 
            onScanSuccessful()
            // <View style={{justifyContent:'center', alignItems:'center'}}>
            // <Text style={{fontSize:28}}>{scannedVal}</Text>
            // </View>
        }

       {/* { scannedRes?.length > 0 && 
       <View style={styles.button}
            >
            <View >
                <Text style={{top:5}}>{scannedRes?.ITEM_NAME}</Text>
                <Text style={{top:5, fontWeight:'700', textAlign:'center'}}>HAPPI PRICE</Text>
                <Text style={{top:5, fontWeight:'700', color:'orange',textAlign:'center'}}>{parseInt(scannedRes?.ITEM_PRICE).toLocaleString('en-IN')}</Text>


            </View>
        </View>
        } */}
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

export default Scanner;
