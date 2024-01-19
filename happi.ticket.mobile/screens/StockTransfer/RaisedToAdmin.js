import {Center} from 'native-base';
import * as React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  Pressable,
  ImageBackground,
  RefreshControl,
  FlatList,
  Dimensions,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Modal,
  StatusBar,
  Linking,
  Button,
  ScrollView,
  TouchableHighlight,
  Platform,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RadioForm from 'react-native-simple-radio-button';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import Spinner from "react-native-loading-spinner-overlay";
import {
  getAdminRaisedStock,
  approveStock,
  rejectStock,
  updateScanProduct,
} from '../../reducers/stockTransfer';
const RaisedToAdmin = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isRejected, setIsRejected] = React.useState(false);
  const [curentStoreID, setCurentStoreId] = React.useState();
  const isLoading = useSelector(state => state.stockTransfer.isLoading)
  const [rejectedReason, setRejectReason] = React.useState();
  const radioButtons = React.useMemo(
    () => [
      {
        id: 1, // acts as primary key, should be unique and non-empty string
        label: 'Reason 1',
        value: 'Reason 1',
      },
      {
        id: 2,
        label: 'Reason 2',
        value: 'Reason 2',
      },
      {
        id: 3,
        label: 'Reason 3',
        value: 'Reason 3',
      },
    ],
    [],
  );
  const [stockDets, setStockDets] = React.useState();
  const [storeApproved, setStoreApproved] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
  }, []);

  React.useEffect(() => {
    AsyncStorage.getItem('user').then(value => {
      setRefreshing(false)
      let userData = JSON.parse(value);
      setCurentStoreId(userData.store_id);
      dispatch(getAdminRaisedStock(userData.store_id)).then(res => {
        let stockdata = res.payload;
        setStockDets(stockdata);
        // console.log('requested stocks',res.payload.data)
        // console.log('to store data',res.payload.data[0].toStoreData)
      });
    });
  }, [storeApproved,refreshing]);
  const stockApprove = item => {
    console.log('recei item', item);
    let payload = {
      id: item?.id,
    };
    dispatch(approveStock(payload)).then(res => {
      console.log('approverrrr', res);
      setStoreApproved(true);
    });
  };
  const stockReject = item => {
    console.log('recei item', rejectedReason);

    if (rejectedReason) {
      let payload = {
        id: item?.id,
        reasons: rejectedReason,
      };
      console.log('payload', payload);
      dispatch(rejectStock(payload)).then(res => {
        console.log('approverrrr', res);
        setStoreApproved(true);
        setIsRejected(false);
      });
    }
  };

  const trackStatus=(item)=>{
    if(item.internal_status =='admin-approved'){
        console.log('track id',item.id)
        navigation.navigate('StockDeliveryDets',item.id)
    }
   
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
      {/* Loop this card */}
      <ScrollView showsVerticalScrollIndicator={false} refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
      <View style={styles.subContainer}>
        {/* <TouchableOpacity style={{ justifyContent: 'center'}}> */}
        {stockDets?.data.map(item => {
          return (
            <>
              {(item.internal_status == 'approved-store-2' || item.internal_status == 'admin-approved'||item.internal_status == 'admin-reject' ) && (
                  <TouchableOpacity style={{ justifyContent: 'center'}} onPress={()=>trackStatus(item)}>
                <View style={styles.card_TaskList}>
                  <View style={{padding: 15}}>
                    <View
                      style={{
                        justifyContent: 'flex-start',
                        flexDirection: 'row',
                        borderBottomWidth: 0.75,
                        borderColor: 'rgba(240, 244, 253, 1)',
                      }}>
                      <View style={{width: '50%'}}>
                        <Text
                          style={{
                            color: '#000',
                            fontWeight: '600',
                            fontSize: 15,
                            textAlignVertical: 'center',
                          }}>
                          Request Received From -
                        </Text>
                      </View>
                      <View style={{width: '50%', justifyContent: 'center'}}>
                        <Text
                          style={{
                            color: 'rgb(251, 144, 19)',
                            fontWeight: '600',
                            fontSize: 15,
                            textAlignVertical: 'center',
                          }}>
                          {item.fromStoreData[0]?.store_name}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        justifyContent: 'flex-start',
                        flexDirection: 'row',
                        borderBottomWidth: 0.75,
                        borderColor: 'rgba(240, 244, 253, 1)',
                      }}>
                      <View style={{width: '50%'}}>
                        <Text
                          style={{
                            color: '#000',
                            fontWeight: '600',
                            fontSize: 15,
                            textAlignVertical: 'center',
                          }}>
                          Brand -
                        </Text>
                      </View>
                      <View style={{width: '50%'}}>
                        <Text
                          style={{
                            color: 'rgb(251, 144, 19)',
                            fontWeight: '600',
                            fontSize: 15,
                            textAlignVertical: 'center',
                          }}>
                          {item.brand}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        justifyContent: 'flex-start',
                        flexDirection: 'row',
                        borderBottomWidth: 0.75,
                        borderColor: 'rgba(240, 244, 253, 1)',
                      }}>
                      <View style={{width: '50%'}}>
                        <Text
                          style={{
                            color: '#000',
                            fontWeight: '600',
                            fontSize: 15,
                            textAlignVertical: 'center',
                          }}>
                          Model -
                        </Text>
                      </View>
                      <View style={{width: '50%'}}>
                        <Text
                          style={{
                            color: 'rgb(251, 144, 19)',
                            fontWeight: '600',
                            fontSize: 15,
                            textAlignVertical: 'center',
                          }}>
                          {item.model}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        justifyContent: 'flex-start',
                        flexDirection: 'row',
                        borderBottomWidth: 0.75,
                        borderColor: 'rgba(240, 244, 253, 1)',
                      }}>
                      <View style={{width: '50%'}}>
                        <Text
                          style={{
                            color: '#000',
                            fontWeight: '600',
                            fontSize: 15,
                            textAlignVertical: 'center',
                          }}>
                          Requested Quantity -
                        </Text>
                      </View>
                      <View style={{width: '50%'}}>
                        <Text
                          style={{
                            color: 'rgb(251, 144, 19)',
                            fontWeight: '600',
                            fontSize: 15,
                            textAlignVertical: 'center',
                          }}>
                          {item.quantity}
                        </Text>
                      </View>
                    </View>

                    {/* <View
                      style={{
                        justifyContent: 'flex-start',
                        flexDirection: 'row',
                        borderBottomWidth: 0.75,
                        borderColor: 'rgba(240, 244, 253, 1)',
                      }}>
                      <View style={{width: '50%'}}>
                        <Text
                          style={{
                            color: '#000',
                            fontWeight: '600',
                            fontSize: 15,
                            textAlignVertical: 'center',
                          }}>
                          Status -
                        </Text>
                      </View>
                      <View style={{width: '50%'}}>
                        <Text
                          style={{
                            color: 'rgb(251, 144, 19)',
                            fontWeight: '600',
                            fontSize: 15,
                            textAlignVertical: 'center',
                          }}>
                          {item.internal_status == 'approved-store-2' ? 'Waiting for Admin Approval' :item.internal_status == 'admin-approved' ? 'Approved By Admin' : '-'}
                        </Text>
                      </View>
                    </View> */}
                             <View style={{ justifyContent: 'flex-start',flexDirection:'row',top:20}}>
                            <View style={{width:'50%'}}>
                             <Text style={{ color: '#000', fontWeight: '600', fontSize: 15, textAlignVertical: 'center',}}>
                                 Status 
                             </Text>
                             </View>
                            {/* {item.internal_status !=='admin-approved'&&
                             <View style={{width:'50%',flexDirection:'row'}}>
                                  <AntDesign name={item.status == 'raised'?"checkcircleo":item.status == 'in-transit'?'exclamationcircleo':item.status =='received'?'thumbs-up':''} size={20} color={item.status == 'raised'?'#6DB314':item.status == 'in-transit'?'rgb(251, 144, 19)':'#6DB314' }/>
                                 <Text style={{color: item.status == 'raised'?'#6DB314':item.status == 'in-transit'?'rgb(251, 144, 19)':'#6DB314' , fontWeight: '600', fontSize: 15, textAlignVertical: 'center',left:5,textTransform:'capitalize' }}>
                                      {item.status}
                                 </Text>
                             </View>} */}
                             {(item.internal_status =='admin-approved'||item.internal_status == 'approved-store-2' || item.internal_status == 'admin-reject') &&
                             <View style={{width:'50%',flexDirection:'row'}}>
                                  <AntDesign name={item.internal_status =='admin-approved'?"checkcircleo":item.internal_status == 'approved-store-2'?'exclamationcircleo':item.internal_status =='admin-reject'?'closecircleo':''} size={20} color={item.internal_status == 'admin-approved'?'#6DB314':item.internal_status == 'approved-store-2'?'rgb(251, 144, 19)':item.internal_status == 'admin-reject'?'red':'#6DB314'}/>
                                 <Text style={{color:item.internal_status == 'admin-approved'?'#6DB314':item.internal_status == 'approved-store-2'?'rgb(251, 144, 19)':item.internal_status =='admin-reject'?'red':'#6DB314' , fontWeight: '600', fontSize: 15, textAlignVertical: 'center',left:5,textTransform:'capitalize' }}>
                                 {item.internal_status == 'approved-store-2' ? 'Waiting for Admin Approval' :item.internal_status == 'admin-approved' ? 'Approved By Admin' : item.internal_status =='admin-reject'? 'Rejected By Admin':'-'}

                                 </Text>
                             </View>}
                         </View>

                    {/* Status */}
                    {/* <View
                      style={{
                        flexDirection: 'row',
                        top: 10,
                        width: '100%',
                        justifyContent: 'space-between',
                      }}>
                      <TouchableHighlight
                        style={styles.reject}
                        onPress={() => setIsRejected(true)}>
                        <Text style={{fontWeight: '700', color: '#F71212'}}>
                          Reject
                        </Text>
                      </TouchableHighlight>

                      <TouchableOpacity
                        style={styles.approve}
                        onPress={() => stockApprove(item)}>
                        <Text style={{fontWeight: '700', color: '#6DB314'}}>
                          Approve
                        </Text>
                      </TouchableOpacity>
                    </View> */}

                    {isRejected && (
                      <View style={{top: 20}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text style={{color: '#000'}}>
                            Select Reason for rejection
                          </Text>
                          <AntDesign
                            name="closecircleo"
                            size={18}
                            color="rgb(251, 144, 19)"
                            onPress={() => setIsRejected(false)}
                          />
                        </View>
                        <View style={{top: 10}}>
                          <RadioForm
                            radio_props={radioButtons}
                            initial={5}
                            formHorizontal={false}
                            labelHorizontal={true}
                            buttonColor={styles.primary_color}
                            selectedButtonColor={styles.primary_color}
                            animation={true}
                            onPress={value => setRejectReason(value)}
                            buttonSize={8}
                          />
                        </View>
                        <TouchableHighlight
                          style={[styles.logout, {top: 10, marginBottom: 10}]}
                          onPress={() => stockReject(item)}>
                          <Text style={{fontWeight: '700', color: '#fff'}}>
                            Submit
                          </Text>
                        </TouchableHighlight>
                      </View>
                    )}
                  </View>
                </View>
                </TouchableOpacity>
              ) 
              }
            </>
          );
        })}
        {stockDets?.data?.length == 0 && (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color:'#000'}}>No data Found</Text>
          </View>
        )}

        {/* </TouchableOpacity> */}
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleHeader: {
    color: '#000',
    fontSize: 16,
  },
  card_TaskList: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 8,
    height: 'auto',
    borderColor: 'rgba(230, 230, 230, 1)',
    borderWidth: 0.8,
    paddingBottom: 15,
  },
  subContainer: {
    flex: 0.95,
  },
  logout: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgb(251, 144, 19)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  approve: {
    width: '45%',
    height: 50,
    borderColor: '#6DB314',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 0.8,
  },
  reject: {
    width: '45%',
    height: 50,
    borderColor: '#F71212',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 0.8,
  },
  primary_color: 'rgb(251, 144, 19)',
});
export default RaisedToAdmin;
