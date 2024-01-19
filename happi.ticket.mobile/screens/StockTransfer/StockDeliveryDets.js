import { Center } from "native-base";
import * as React from "react";
import {
  Text, StyleSheet, View, Image, Pressable,
  ImageBackground, RefreshControl, FlatList, Dimensions, SafeAreaView, TextInput, TouchableOpacity, Modal, StatusBar, Linking, Button, ScrollView, TouchableHighlight, Platform
} from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { updateScanProduct } from "../../reducers/stockTransfer";


const StockDeliveryDets=({route})=>{
    const id = route.params
    console.log('id issss',id)
    const navigation = useNavigation();
    const dispatch =useDispatch()
    const openBarcodeScanner = () => {
    //   dispatch(updateScanProduct())
      navigation.navigate('StockScanner',id)
    };
    return(
        <View style={styles.container}>
            <TouchableOpacity style={{width:'100%',height:50, justifyContent:'center', alignItems:'center',borderWidth:1, backgroundColor:'rgb(251, 144, 19)', borderRadius:5, flexDirection:'row'}}
             onPress={() => openBarcodeScanner()}>
            <MaterialCommunityIcons name="barcode-scan" color="#fff" size={26} style={{right:20}} />
                                <Text style={{color:'#fff'}}>Scan IMEI Number</Text>
             </TouchableOpacity>
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:10,
        alignContent:'center',
        justifyContent:'center'
    },
})
export default StockDeliveryDets