import * as React from "react";
import {
  Text, StyleSheet, View, Image, Pressable,Alert,
  ImageBackground, RefreshControl, FlatList, Dimensions, SafeAreaView, TextInput, TouchableOpacity, Modal, StatusBar, Linking, Button, ScrollView, TouchableHighlight, Platform,ActivityIndicator
} from "react-native";
import { SelectList, MultipleSelectList } from 'react-native-dropdown-select-list'
import { useSelector, useDispatch } from "react-redux";
import { getModalListStock,updatemodalList,getMakeList,getStockmultiple,submitRequest } from "../../reducers/stockTransfer";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getStockSingle } from "../../reducers/stockTransfer";
import Spinner from "react-native-loading-spinner-overlay";
import { useNavigation } from "@react-navigation/native";

const RaiseRequest=()=>{
    const navigation = useNavigation();
    const makeList = useSelector(state => state.stockTransfer.makeList);
    const isLoading = useSelector(state => state.stockTransfer.isLoading)
    const isBtnLoading = useSelector(state => state.stockTransfer.isButtonLoading)
    const dispatch = useDispatch();
    const [selectedMake, setSelectedMake] = React.useState()
    const modalList = useSelector(state => state.stockTransfer.modalList);
    const storeList = useSelector(state => state.stockTransfer.storeList);
    const [selectedModal, setSelectedModal] = React.useState()
    const [modelFromCode, setModelFromCode] = React.useState()
    const [counter, setCounter] = React.useState(1);
    const [stockCheck, setStockCheck]= React.useState(false)
    const [storeDetails, setStoreDetails] = React.useState();
    const [stockDetails, setStockDetails]= React.useState([]);
    const [multipleStocks,setMultipleStocks]= React.useState()
    const [selectedStore,setSelectedStore]= React.useState()
    const [curentStoreID,setCurentStoreId]= React.useState()
    const [curentUserID,setCurentUserId]= React.useState()
    const [multipleStockDets,setMultipleStockDets]= React.useState()
    const [saleableStock,setSaleableStock]= React.useState()


    const[makeError,setMakeError]=React.useState()
    const[modelError,setModelError]=React.useState()
    const[storeError,setStoreError]=React.useState()




    React.useEffect(() => {
        // setSelectedMake()
        // setSelectedModal()
        dispatch(updatemodalList())
        AsyncStorage.getItem('storeDetails').then((user) => {
            console.log('storeeeee',user)
            if (user == "" || user == null || user == undefined) {
                //Show no user image
            }
            else {
                setStoreDetails(JSON.parse(user)[0])
            }
          }) 
          dispatch(getMakeList())
         AsyncStorage.getItem('user').then(value => {
            let userData = JSON.parse(value);
            setCurentStoreId(userData.store_id)
            setCurentUserId(userData._id)
      })
    }, [])
    const getMake = (make) => {
        let brand = {
            brandName: make
        }
        setSelectedMake(make)
        dispatch(getModalListStock(brand))
    }
    const getModel = (model) => {
        setSelectedModal(model)
        console.log('model', model)

        if(selectedMake && model && storeDetails){
            let payload;
            payload={
                model:selectedModal,
                store:storeDetails?.store_code,
                brand:selectedMake
            }
            dispatch(getStockSingle(payload)).then((res=>{
                console.log('received reesponse',res.payload)
                let stock = res.payload.data
                console.log('stocksss',stock)
                setStockDetails(stock)
            }))
        }
        // search model and map from modalList
      
            let tempData = modalList?.filter((item) => {
                console.log('modalList item',item)
                return item.key == model;
            })
            setModelFromCode(tempData[0].value)
    
        if(selectedMake && model ){

        let payload = {
            brand:selectedMake,
            model:model,
            store:0,
            branch_code:storeDetails?.store_code,
        }
        dispatch(getStockmultiple(payload)).then((res)=>{
            console.log('page response',res.payload.data)
            setMultipleStockDets(res.payload.data)
            let list = [] 
            res.payload?.data?.map((item) => { 
                let obj = {}
                obj['key'] = item.BRANCH_CODE
                obj['value'] = item.BRANCH_NAME + ' ' +'-' + ' ' + '(' +item.SALEABLE_STOCK +')'
                list.push(obj)
            })
            setMultipleStocks(list)
        })
    }
    }
    
    const checkStock=()=>{
        setStockCheck(true)
        if(selectedMake && selectedModal && storeDetails){
            let payload;
            payload={
                model:selectedModal,
                store:storeDetails?.store_code,
                brand:selectedMake
            }
            dispatch(getStockSingle(payload)).then((res=>{
                console.log('received reesponse',res.payload)
                let stock = res.payload.data
                console.log('stocksss',stock)
                setStockDetails(stock)
            }))
        }
        else{
            Alert.alert('Please Select all fields')
            setStockCheck(false)
        }
   
    }
    const raiseRequest =()=>{
        if(selectedMake==undefined){
            setMakeError(true)
        }
        else if(modelFromCode==undefined){
            setModelError(true)
        }

        else if(selectedStore==undefined){
            setStoreError(true)
        }
        else if(saleableStock<counter){
            Alert.alert('Sorry! Requested store does not have that Quantity')
        }
        else{
        let payload ={
                brand:selectedMake,
                model:modelFromCode,
                item_code:selectedModal,
                from_store:curentStoreID,
                to_store:selectedStore,
                status:"raised",
                internal_status:"forward-store-2",
                quantity:counter,
                created_by:curentUserID
        }
        dispatch(submitRequest(payload)).then((res)=>{
           navigation.navigate('StockRequest')
        })
    }
        // console.log('submitting payload',payload)
    }

    const storeSelection=(val)=>{
        console.log('valueee',multipleStockDets)
        setSelectedStore(val)
        let storeStock = multipleStockDets?.find(item => item.BRANCH_CODE === val);
        console.log('store stock',storeStock)
        setSaleableStock(storeStock?.SALEABLE_STOCK)

    }
    return (
        <View style={styles.container}>
                        <Spinner
    visible={isLoading}
    //Text with the Spinner
    textContent={'Loading'}
    //Text style of the Spinner Text
    textStyle={[styles.spinnerTextStyle, { color: '#000' }]}
  />
            <View style={styles.header}>
            <Text style={styles.titleHeader}>STORE NAME :</Text>
            <Text style={styles.titleHeader}> {storeDetails?.store_name}</Text>
            </View>
            <View style={{padding:5,flex:0.95, }}>
            <SelectList
                        setSelected={(val) => getMake(val)}
                        data={makeList}
                        save="key"
                        search={true}
                        boxStyles={styles.textInput}
                        dropdownStyles={{
                            width: '100%', borderWidth: 1,
                            borderColor: '#c8c8c8', backgroundColor: '#fff'
                        }}
                        dropdownTextStyles={{color:'#000', textTransform:'capitalize'}}
                        placeholder='Select Brand'
                        inputStyles={{color:'#000', left: -5, fontSize: 14 }}
                        searchPlaceholder=""
                        placeholderTextColor={'#000'}
                        onSelect={()=>setMakeError(false)}
              />   
                {makeError && <Text style={{ color: 'red', fontSize: 10, left: 10 }}> Please select Brand</Text>}
                <SelectList
                            setSelected={(val) => getModel(val)}
                            data={modalList}
                            save="key"
                            search={true}
                            boxStyles={styles.textInput}
                            dropdownStyles={{
                                width: '100%', borderWidth: 1,
                                borderColor: '#c8c8c8', backgroundColor: '#fff'
                            }}
                            placeholder='Select Model'
                            dropdownTextStyles={{color:'#000', textTransform:'capitalize'}}
                            inputStyles={{ color:'#000',left: -5, fontSize: 14 }}
                            searchPlaceholder=""
                            onSelect={()=>setModelError(false)}
                        />
                        {modelError && <Text style={{ color: 'red', fontSize: 10, left: 10 }}> Please select Model</Text>}
                        {selectedModal &&
                         <View style={{height:45, borderWidth:0.8, borderRadius:10,borderColor: '#000', top:10, justifyContent:'flex-start', padding:10, flexDirection:'row',bottom:10,}}>
                           <View style={{width:'95%',flexDirection:'row', justifyContent:'space-between'}}>
                            <Text style={styles.boxText}>Stock Availabiltity in your Store</Text>
                            <View >
                             {stockDetails?.length == 0 &&
                             <View style={{width:80, justifyContent:'center', alignItems:'center',borderWidth:1, backgroundColor:'rgb(251, 144, 19)', borderRadius:5}}>
                            <Text style={[styles.boxText,{color:'#fff',fontWeight:'600'}]}>0</Text>
                            </View>
                             }
                             {stockDetails?.length!=0 &&
                             <View style={{width:40, justifyContent:'center', alignItems:'center',borderWidth:1, backgroundColor:'rgb(251, 144, 19)', borderRadius:15,height:25,}}>
                             <Text style={[styles.boxText,{color:'#fff',fontWeight:'600'}]}>1</Text>
                             </View>}
                            </View>
                            </View>
                                        
                            <View>
                            </View>
                        </View>}

                    <SelectList
                            setSelected={(val) =>storeSelection(val)}
                            data={multipleStocks?multipleStocks:''}
                            save="key"
                            search={true}
                            boxStyles={[styles.textInput,{top:selectedModal? 10: 5}]}
                            dropdownStyles={{
                                width: '100%', borderWidth: 1,
                             backgroundColor: '#fff', borderBottomWidth: 0.75, borderColor: 'rgba(240, 244, 253, 1)'
                            }}
                            placeholder='Select Store'
                            dropdownTextStyles={{color:'#000', textTransform:'capitalize', borderBottomWidth: 0.75, borderColor: 'rgba(240, 244, 253, 1)',paddingBottom:2}}
                            inputStyles={{ color:'#000',left: -5, fontSize: 14 }}
                            onSelect={() => setStoreError(false)}
                            searchPlaceholder=""
                            
                        />
                        {storeError && <Text style={{ color: 'red', fontSize: 10, left: 10 }}> Please select Store</Text>}
                        <View style={{height:45, borderWidth:0.8, borderRadius:10,borderColor: '#000', top:20, justifyContent:'flex-start', padding:10, flexDirection:'row',}}>
                           <View style={{width:'70%'}}>
                            <Text style={styles.boxText}>Quantity</Text>
                            </View>
                            {counter>=1 && <AntDesign name="minuscircle" size={20} color={counter==1?'#c8c8c8':'rgb(251, 144, 19)'} onPress={()=>setCounter(counter-1)} disabled={counter==1? true:false} />}
                            <View style={{width:40, justifyContent:'center', alignItems:'center'}}>
                                <Text style={{color:'#000'}}>{counter}</Text>
                            </View>
                            
                            <AntDesign name="pluscircle" size={20} color={counter==2?'#c8c8c8':'rgb(251, 144, 19)'} onPress={()=>setCounter(counter+1)} disabled={counter==2? true:false}/>
                            
                            <View>

                            </View>

                        </View>
              </View>
              <View style={{top:10}}>
            <TouchableHighlight
             style={styles.logout}
             onPress={()=>raiseRequest()}
             >
             <Text style={{fontWeight:'700', color:'#fff'}}>Submit Request</Text>
         </TouchableHighlight>
         </View>
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
        alignItems:'center',
        flexDirection:'row'
    },
    titleHeader:{
        color:'#000',
        fontSize:16
    },
    textInput:{
       marginTop:10
    },
    boxText:{
         color:'#000', fontSize: 14 
    },
  logout:{width:'100%', height:50, backgroundColor:'rgb(251, 144, 19)', justifyContent:'center', alignItems:'center', borderRadius:10}

})
export default RaiseRequest