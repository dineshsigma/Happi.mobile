import * as React from "react";
import {
    Text, StyleSheet, View,Dimensions, SafeAreaView, TouchableOpacity, Modal, StatusBar, Linking, Button, ScrollView, TouchableHighlight, Platform,TextInput,FlatList
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// import { getDashboardDetails, getVersionInfo, getAllLatLang, activityLogs, getProductDetails,getProductPrice } from "../reducers/incentives";
import Spinner from 'react-native-loading-spinner-overlay';
// import { ProgressBar, Colors } from 'react-native-paper';
// import { CurrencyToAbbreviation } from "currency-to-abbreviation";
// // import * as Progress from 'react-native-progress';
// import RewardsComponent from 'react-native-rewards';
// import { Component, createRef } from 'react';
// // import {modalMap} from '../assets/modalMap.png'
// import CircularProgress from 'react-native-circular-progress-indicator';
// import Ripple from 'react-native-material-ripple';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
// import { getProdQtyDetails } from "../reducers/incentives";
import { useSelector, useDispatch } from "react-redux";
// import { TextInput} from '@react-native-material/core';
import { getProductDetails, getProductPrice, updateEmptyVal } from "../reducers/products";



const ProductSearch = () => {
    const navigation = useNavigation();
    const [searchValue, setSearchValue]=React.useState('')
    const dispatch = useDispatch();
    const productsList = useSelector((state) => state.products.productSearch_data);
    const loading = useSelector((state) => state.products.isLoading);
    const openProductDetails=(item)=>{
        let payload ={
            "type":"search",
            "ITEM_CODE":item.ITEM_CODE
        }
        dispatch(getProductPrice(payload)).then(()=>{
            navigation.navigate('ProductsDetails', item)
        })
 
    }

    React.useEffect(()=>{
     dispatch(updateEmptyVal())
      if(searchValue?.length>=3){
        dispatch(getProductDetails(searchValue))
      }
    },[searchValue])
    return (
        <View style={{padding:10, flex:1}}>
            <Spinner
    visible={loading}
    //Text with the Spinner
    textContent={'Loading...'}
    //Text style of the Spinner Text
    textStyle={[styles.spinnerTextStyle, { color: '#fff' }]}
  />

        <View style={[styles.searchSections]}> 
              <View style={{paddingLeft:20, width:'100%'}}>
                <MaterialIcons style={styles.formIcon} name="search"/>           
                <TextInput style={styles.formInput} underlineColorAndroid="transparent" placeholder="Search Product" variant="standard"  
                 onChangeText={(text)=>setSearchValue(text)} placeholderTextColor={'#000'}/>        
              </View> 
            </View> 
        { !loading &&
        <>
       
   

            <ScrollView style={{flex:1, top:30}}>
            
            {productsList && productsList?.data?.map((item, index) => {
                  return (
                    <TouchableOpacity onPress={()=>openProductDetails(item)}>
                    <View style={styles.card}>
                  <Text style={{color:'#000', fontSize:20}}>{item.ITEM_NAME}</Text>
                  </View>
                  </TouchableOpacity>
                  )
            })}
            </ScrollView>
            </>
}
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
        marginTop:10
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
  card: { display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: 'white', padding: 12, borderRadius: 16, shadowColor: 'rgba(0,0,0,0.2)', shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, shadowOpacity: 0.1, elevation: 8, marginBottom: 8 },
  searchSections:{width:'100%',justifyContent:'center',alignItems:'center',backgroundColor: '#DDD',padding:10,top:15 },
  searcinput: {
    width: '90%',
    borderWidth: 1,
    borderRadius: 20,
    height: 40,
    flex: 1,
  },
  formInput: {paddingLeft:16, color:'#323232', borderWidth: 1, borderColor: 'lightgray', backgroundColor: 'white', fontSize: 15,height:44,width:'100%', right:10},
  formIcon: {fontSize: 24, color: "lightgray",lineHeight:42, width:42, display:'flex',justifyContent: 'center',alignItems:'center', textAlign:'center',position:'absolute',right:10,zIndex:2,},
  
    

});

export default ProductSearch;
