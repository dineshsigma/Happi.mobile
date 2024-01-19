import * as React from "react";
import {
    Text, StyleSheet, View, Image, Pressable,
    ImageBackground, RefreshControl, FlatList, Dimensions, SafeAreaView, TextInput, TouchableOpacity, Modal, StatusBar, Linking, Button, ScrollView, TouchableHighlight, Platform
} from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from "@react-navigation/native";
const dimensions_width = Dimensions.get('window').width;
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import { getRequestedStock } from "../../reducers/stockTransfer";
import moment from 'moment/moment';

const RequestedStocks = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const requestedStocks = useSelector(state => state.stockTransfer.requestedStocks);
  const [curentStoreID,setCurentStoreId]= React.useState()
  const [stockDets,setStockDets]= React.useState()
  const isLoading = useSelector(state => state.stockTransfer.isLoading)
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
  }, []);
  const [filterStatus,setFilterStatus] = React.useState('all')

  React.useEffect(()=>{
    AsyncStorage.getItem('user').then(value => {
        setRefreshing(false)
        let userData = JSON.parse(value);
        setCurentStoreId(userData.store_id)
        let payload ={
            store_id:userData?.store_id,
            filter:filterStatus
        }
        dispatch(getRequestedStock(payload)).then((res)=>{
            let stockdata = res.payload
            setStockDets(stockdata)
            // console.log('requested stocks',res.payload.data)
            // console.log('to store data',res.payload.data[0].toStoreData)

        })
  })
  },[refreshing,filterStatus])
  const trackStatus=(item)=>{
    // Change it to in-transit
    if(item.status=='in-transit'){
        navigation.navigate('UpdateReceived',item.id)
    }
    // if(item.internal_status =='admin-approved'){
    //     navigation.navigate('StockDeliveryDets',item.id)
    // }
   
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
  <View style={{height:60, flexDirection:'row',justifyContent:'space-between',width:'100%',overflow:'scroll',top:10}}>
  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    
    <View>
        <TouchableOpacity style={[styles.reject,{backgroundColor:filterStatus=='all'?'rgb(251, 144, 19)':'white'}]} onPress={()=>setFilterStatus('all')}>
            <Text style={[styles.text,{color:filterStatus=='all'?'white':'#000'}]}>All</Text>
        </TouchableOpacity>
    </View>

    <View style={styles.marginL}>
        <TouchableOpacity style={[styles.reject,{backgroundColor:filterStatus=='raised'?'rgb(251, 144, 19)':'white'}]} onPress={()=>setFilterStatus('raised')}>
            <Text style={[styles.text,{color:filterStatus=='raised'?'white':'#000'}]}>Raised</Text>
        </TouchableOpacity>
    </View>

    <View style={styles.marginL}>
        <TouchableOpacity style={[styles.reject,{backgroundColor:filterStatus=='in-transit'?'rgb(251, 144, 19)':'white'}]}  onPress={()=>setFilterStatus('in-transit')}>
            <Text style={[styles.text,{color:filterStatus=='in-transit'?'white':'#000'}]}>In-Transit</Text>
        </TouchableOpacity>
    </View>

    <View style={styles.marginL}>
        <TouchableOpacity style={[styles.reject,{backgroundColor:filterStatus=='received'?'rgb(251, 144, 19)':'white'}]}  onPress={()=>setFilterStatus('received')}>
            <Text style={[styles.text,{color:filterStatus=='received'?'white':'#000'}]}>Received</Text>
        </TouchableOpacity>
    </View>

    <View style={styles.marginL}>
        <TouchableOpacity style={[styles.reject,{backgroundColor:filterStatus=='rejected'?'rgb(251, 144, 19)':'white'}]} onPress={()=>setFilterStatus('rejected')}>
            <Text style={[styles.text,{color:filterStatus=='rejected'?'white':'#000'}]}>Rejected</Text>
        </TouchableOpacity>
    </View>
    </ScrollView>
  </View>

            {/* Loop this card */}
            <ScrollView showsVerticalScrollIndicator={false} refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <View style={[styles.subContainer]}>
                 {stockDets?.data.map((item)=>{
            return( 
                 <TouchableOpacity style={{ justifyContent: 'center'}} onPress={()=>trackStatus(item)}>
                 <View style={styles.card_TaskList}>           
                     <View style={{ padding:15}}>
                         <View style={{ justifyContent: 'flex-start',flexDirection:'row', borderBottomWidth: 0.75, borderColor: 'rgba(240, 244, 253, 1)'}}>
                            <View style={{width:'30%',justifyContent:'center'}}>
                             <Text style={{ color: '#000', fontWeight: '600', fontSize: 14, textAlignVertical: 'center',}}>
                                 Req To -
                             </Text>
                             </View>
                             <View style={{width:'70%',justifyContent:'center'}}>
                             <Text style={{color:'#000', fontWeight: '400', fontSize: 14, textAlignVertical: 'center', }}>
                             {item.toStoreData[0]?.store_name}
                             </Text>
                             </View>
                         </View>
     
                         <View style={{ justifyContent: 'flex-start',flexDirection:'row', borderBottomWidth: 0.75, borderColor: 'rgba(240, 244, 253, 1)'}}>
                            <View style={{width:'30%',justifyContent:'center'}}>
                             <Text style={{ color: '#000', fontWeight: '600', fontSize: 14, textAlignVertical: 'center',}}>
                                 Brand -
                             </Text>
                             </View>
                             <View style={{width:'70%',justifyContent:'center'}}>
                             <Text style={{color:'#000', fontWeight: '400', fontSize: 14, textAlignVertical: 'center', }}>
                                 {item.brand}
                             </Text>
                             </View>
                         </View>
     
                         <View style={{ justifyContent: 'flex-start',flexDirection:'row', borderBottomWidth: 0.75, borderColor: 'rgba(240, 244, 253, 1)'}}>
                            <View style={{width:'30%',justifyContent:'center'}}>
                             <Text style={{ color: '#000', fontWeight: '600', fontSize: 14, textAlignVertical: 'center',}}>
                                 Model -
                             </Text>
                             </View>
                             <View style={{width:'70%'}}>
                             <Text style={{color:'#000', fontWeight: '400', fontSize: 14, textAlignVertical: 'center', }}>
                                {item.model}
                             </Text>
                             </View>
                         </View>
     
                         <View style={{ justifyContent: 'flex-start',flexDirection:'row', borderBottomWidth: 0.75, borderColor: 'rgba(240, 244, 253, 1)'}}>
                            <View style={{width:'30%',justifyContent:'center'}}>
                             <Text style={{ color: '#000', fontWeight: '600', fontSize: 14, textAlignVertical: 'center',}}>
                                 Date -
                             </Text>
                             </View>
                             <View style={{width:'70%'}}>
                             <Text style={{color:'#000', fontWeight: '400', fontSize: 14, textAlignVertical: 'center', }}>
                             {moment(item.created_at).format('llll')}
                             </Text>
                             </View>
                         </View>
                         <View style={{ justifyContent: 'flex-start',flexDirection:'row', borderBottomWidth: 0.75, borderColor: 'rgba(240, 244, 253, 1)'}}>
                            <View style={{width:'30%'}}>
                             <Text style={{ color: '#000', fontWeight: '600', fontSize: 14, textAlignVertical: 'center',}}>
                                 Req Qty -
                             </Text>
                             </View>
                             <View style={{width:'70%'}}>
                             <Text style={{color:'#000', fontWeight: '400', fontSize: 14, textAlignVertical: 'center', }}>
                                 {item.quantity}
                             </Text>
                             </View>
                         </View>
     
                         {/* Status */}
                       
                         <View style={{ justifyContent: 'flex-start',flexDirection:'row',top:20}}>
                            <View style={{width:'30%'}}>
                             <Text style={{ color: '#000', fontWeight: '600', fontSize: 14, textAlignVertical: 'center',}}>
                                 Status 
                             </Text>
                             </View>
                            
                             <View style={{width:'70%',flexDirection:'row'}}>
                                  <AntDesign name={item.status == 'raised'?"checkcircleo":item.status == 'in-transit'?'exclamationcircleo':item.status =='received'?'checkcircleo':item.status == 'rejected'?'closecircleo':''} size={20} color={item.status == 'raised'?'#F2D32F':item.status == 'in-transit'?'rgb(251, 144, 19)':item.status == 'rejected'?'red':'#6DB314' }/>
                                 <Text style={{color: item.status == 'raised'?'#F2D32F':item.status == 'in-transit'?'rgb(251, 144, 19)':item.status == 'rejected'?'red':'#6DB314' , fontWeight: '600', fontSize: 14, textAlignVertical: 'center',left:5,textTransform:'capitalize' }}>
                                      {item.status}
                                 </Text>
                             </View>
                           
                             {/* {item.internal_status =='admin-approved'&&
                             <View style={{width:'70%',flexDirection:'row'}}>
                                  <AntDesign name={item.status == 'raised'?"checkcircleo":item.status == 'in-transit'?'exclamationcircleo':item.status =='received'?'thumbs-up':''} size={20} color={item.status == 'raised'?'#6DB314':item.status == 'in-transit'?'rgb(251, 144, 19)':'#6DB314' }/>
                                 <Text style={{color: item.status == 'raised'?'#6DB314':item.status == 'in-transit'?'rgb(251, 144, 19)':'#6DB314' , fontWeight: '600', fontSize: 14, textAlignVertical: 'center',left:5,textTransform:'capitalize' }}>
                                      Raised
                                 </Text>
                             </View>} */}
                         </View>
                         {item.status =='rejected' &&
                                <View style={{ justifyContent: 'flex-start',flexDirection:'row', borderBottomWidth: 0.75, borderColor: 'rgba(240, 244, 253, 1)',top:25,paddingBottom:5}}>
                                <View style={{width:'30%'}}>
                                 <Text style={{ color: '#000', fontWeight: '600', fontSize: 14, textAlignVertical: 'center',}}>
                                     Rej By -
                                 </Text>
                                 </View>
                                 <View style={{width:'70%'}}>
                                 <Text style={{color:'#000', fontWeight: '400', fontSize: 14, textAlignVertical: 'center', }}>
                                     {item.internal_status=='admin-reject'?'Rejected by Admin':'Rejected by Store'}
                                 </Text>
                                 </View>
                             </View>
                             }
                              {(item.internal_status == 'rejected') &&
                          <>
                            <View style={{ justifyContent: 'flex-start', flexDirection: 'row', top: 25 }}>
                              <View style={{ width: '30%' }}>
                                <Text style={{ color: '#000', fontWeight: '600', fontSize: 14, textAlignVertical: 'center', }}>
                                  Rej Reason -
                                </Text>
                              </View>
                              <View style={{ width: '70%', flexDirection: 'row' }}>
                                {/* <AntDesign name={item.internal_status =='received'?'checkcircleo':item.internal_status == 'in-transit'?'exclamationcircleo':item.status=='rejected'?'closecircleo':''} size={20} color={item.status == 'raised'?'#6DB314':item.status == 'in-transit'?'rgb(251, 144, 19)':item.status=='rejected'?'red':'#6DB314' }/> */}
                                <Text style={{ color: '#000', fontWeight: '400', fontSize: 14, textAlignVertical: 'center', left: 5, textTransform: 'capitalize' }}>
                                  {item.reasons}
                                </Text>
                              </View>
                            </View>
                           
                          </>
                        }
                     
                     </View>
                 </View>
                 </TouchableOpacity>
               
            )
        })   }
         {stockDets?.data?.length == 0 && (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color:'#000'}}>No data Found</Text>
          </View>
        )}
           </View>
           <View style={{height:50}}></View>
           </ScrollView>
            <View style={{justifyContent:'flex-end',flex:1}}>
            <TouchableHighlight
             style={styles.logout}
             onPress={()=>navigation.navigate('RaisedRequests')}
             >
             <Text style={{fontWeight:'700', color:'#fff'}}>Raise Stock Request</Text>
         </TouchableHighlight>
         </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:10
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleHeader: {
        color: '#000',
        fontSize: 16
    },
  card_TaskList: { backgroundColor: 'white', borderRadius: 8, marginBottom: 16, overflow: 'hidden', shadowColor: 'rgba(0,0,0,0.2)', shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, shadowOpacity: 0.1, elevation: 8, height: 'auto', borderColor: 'rgba(230, 230, 230, 1)', borderWidth: 0.8,paddingBottom:15  },
  subContainer:{
    flex:0.95,

  },
  logout:{width:'100%', height:50, backgroundColor:'rgb(251, 144, 19)', justifyContent:'center', alignItems:'center', borderRadius:10},
  reject: {
     width: 'auto',
    height: 30,
    borderColor: '#F71212',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 0.8,
    paddingLeft:10,paddingRight:10,backgroundColor:'#fff',
 
  },
  text:{
    fontSize:16,
    color:'#000'
  },
  marginL:{
    marginLeft:10
  }


})
export default RequestedStocks