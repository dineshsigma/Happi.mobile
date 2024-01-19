import { Center } from 'native-base';
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
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from "react-native-loading-spinner-overlay";
import {
  getReceivedStock,
  approveStock,
  rejectStock,
  updateScanProduct,
  getRejectReasons,
} from '../../reducers/stockTransfer';
import moment from 'moment/moment';
import Label, { Orientation } from "react-native-label";

const ReceivedRequests = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isRejected, setIsRejected] = React.useState(false);
  const [curentStoreID, setCurentStoreId] = React.useState();
  const isLoading = useSelector(state => state.stockTransfer.isLoading)
  const [rejectedReason, setRejectReason] = React.useState();
  const [selectedItemID, setSelctedITemID] = React.useState()
  const[radioButtons,setRadioButtons] = React.useState([])
  const [stockDets, setStockDets] = React.useState();
  const [storeApproved, setStoreApproved] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
  }, []);
  const [filterStatus, setFilterStatus] = React.useState('all')


  React.useEffect(() => {
    AsyncStorage.getItem('user').then(value => {
      setRefreshing(false)
      let userData = JSON.parse(value);
      setCurentStoreId(userData.store_id);
      let payload = {
        store_id: userData?.store_id,
        filter: filterStatus
      }
      dispatch(getReceivedStock(payload)).then(res => {
        let stockdata = res.payload;
        setStockDets(stockdata);
      });
      dispatch(getRejectReasons()).then((res)=>{
        console.log('rejected reasons1',res)
        let data= res.payload
        setRadioButtons(data)
      })
    });
  }, [storeApproved, refreshing, filterStatus]);
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

  const trackStatus = (item) => {
    if (item.internal_status == 'admin-approved') {
      console.log('track id', item.id)
      navigation.navigate('StockDeliveryDets', item.id)
    }

  }

  const showRejectPop = (id) => {
    setSelctedITemID(id)
    setIsRejected(true)
  }
  return (
    <View style={styles.container}>
      <Spinner
        visible={isLoading}
        //Text with the Spinner
        textContent={'Loading'}
        //Text style of the Spinner Text
        textStyle={[styles.spinnerTextStyle, { color: '#000', fontWeight: '300' }]}
      />


      <View style={{ height: 60, flexDirection: 'row', justifyContent: 'space-between', width: '100%', overflow: 'scroll', top: 10 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View>
            <TouchableOpacity style={[styles.reject,{backgroundColor:filterStatus=='all'?'rgb(251, 144, 19)':'white'}]} onPress={() => setFilterStatus('all')}>
              <Text style={[styles.text,{color:filterStatus=='all'?'white':'#000'}]}>All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.marginL}>
            <TouchableOpacity style={[styles.reject,{backgroundColor:filterStatus=='raised'?'rgb(251, 144, 19)':'white'}]} onPress={() => setFilterStatus('raised')}>
              <Text style={[styles.text,{color:filterStatus=='raised'?'white':'#000'}]}>Pending</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.marginL}>
            <TouchableOpacity style={[styles.reject,{backgroundColor:filterStatus=='in-transit'?'rgb(251, 144, 19)':'white'}]} onPress={() => setFilterStatus('in-transit')}>
              <Text style={[styles.text,{color:filterStatus=='in-transit'?'white':'#000'}]}>In-Transit</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.marginL}>
            <TouchableOpacity style={[styles.reject,{backgroundColor:filterStatus=='received'?'rgb(251, 144, 19)':'white'}]} onPress={() => setFilterStatus('received')}>
              <Text style={[styles.text,{color:filterStatus=='received'?'white':'#000'}]}>Received</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.marginL}>
            <TouchableOpacity style={[styles.reject,{backgroundColor:filterStatus=='rejected'?'rgb(251, 144, 19)':'white'}]} onPress={() => setFilterStatus('rejected')}>
              <Text style={[styles.text,{color:filterStatus=='rejected'?'white':'#000'}]}>Rejected</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* Loop this card */}
      <ScrollView showsVerticalScrollIndicator={false} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        <View style={styles.subContainer}>
          {/* <TouchableOpacity style={{ justifyContent: 'center'}}> */}
          {stockDets?.data.map(item => {
            return (
              <>
                {/* (item.internal_status == 'forward-store-2') || (item.internal_status == 'in-transit') || (item.internal_status == 'received') || (item.internal_status == 'reject-store-2') || (item.internal_status == 'rejected')  */}
                {(item.status == 'raised') || (item.status == 'in-transit') || (item.status == 'received') || (item.status == 'rejected') ? (
              
                
                <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => trackStatus(item)}>
               <Label
                 orientation={Orientation.TOP_RIGHT}
                 containerStyle={[styles.labelCircle]}
                 style={styles.label}
                 title={(item.internal_status == 'forward-store-2' || item.internal_status== "admin-approved")? "Action":""}
                 color={(item.internal_status == 'forward-store-2' || item.internal_status== "admin-approved")? "red":null}
                 distance={50}
                 extent={0}
                 ratio={1}
               >
                    <View style={styles.card_TaskList}>
                      <View style={{ padding: 15 }}>
                        <View
                          style={{
                            justifyContent: 'flex-start',
                            flexDirection: 'row',
                            borderBottomWidth: 0.75,
                            borderColor: 'rgba(240, 244, 253, 1)',
                          }}>
                          <View style={{ width: '30%' }}>
                            <Text
                              style={{
                                color: '#000',
                                fontWeight: '600',
                                fontSize: 14,
                                textAlignVertical: 'center',
                              }}>
                              Req From -
                            </Text>
                          </View>
                          <View style={{ width: '70%', justifyContent: 'center' }}>
                            <Text
                              style={{
                                color: '#000',
                                fontWeight: '400',
                                fontSize: 14,
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
                          <View style={{ width: '30%' }}>
                            <Text
                              style={{
                                color: '#000',
                                fontWeight: '600',
                                fontSize: 14,
                                textAlignVertical: 'center',
                              }}>
                              Brand -
                            </Text>
                          </View>
                          <View style={{ width: '70%' }}>
                            <Text
                              style={{
                                color: '#000',
                                fontWeight: '400',
                                fontSize: 14,
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
                          <View style={{ width: '30%' }}>
                            <Text
                              style={{
                                color: '#000',
                                fontWeight: '600',
                                fontSize: 14,
                                textAlignVertical: 'center',
                              }}>
                              Model -
                            </Text>
                          </View>
                          <View style={{ width: '70%' }}>
                            <Text
                              style={{
                                color: '#000',
                                fontWeight: '400',
                                fontSize: 14,
                                textAlignVertical: 'center',
                                textTransform: 'uppercase'
                              }}>
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

                        <View
                          style={{
                            justifyContent: 'flex-start',
                            flexDirection: 'row',
                            borderBottomWidth: 0.75,
                            borderColor: 'rgba(240, 244, 253, 1)',
                          }}>
                          <View style={{ width: '30%' }}>
                            <Text
                              style={{
                                color: '#000',
                                fontWeight: '600',
                                fontSize: 14,
                                textAlignVertical: 'center',
                              }}>
                              Req Qty -
                            </Text>
                          </View>
                          <View style={{ width: '70%' }}>
                            <Text
                              style={{
                                color: '#000',
                                fontWeight: '400',
                                fontSize: 14,
                                textAlignVertical: 'center',
                              }}>
                              {item.quantity}
                            </Text>
                          </View>
                        </View>

                        {/* Status */}
                        {item.internal_status == 'forward-store-2' &&
                          <View
                            style={{
                              flexDirection: 'row',
                              top: 10,
                              width: '100%',
                              justifyContent: 'space-between',
                            }}>
                            <TouchableHighlight
                              style={styles.reject1}
                              onPress={() => showRejectPop(item.id)}>
                              <Text style={{ fontWeight: '700', color: '#F71212' }}>
                                Reject
                              </Text>
                            </TouchableHighlight>

                            <TouchableOpacity
                              style={styles.approve}
                              onPress={() => stockApprove(item)}>
                              <Text style={{ fontWeight: '700', color: '#6DB314' }}>
                                Approve
                              </Text>
                            </TouchableOpacity>
                          </View>}

                        {(item.internal_status == 'in-transit' || item.internal_status == 'received' || item.internal_status == 'reject-store-2' || item.internal_status == 'rejected' || item.internal_status == 'approved-store-2' || item.internal_status == 'admin-approved' || item.internal_status == 'admin-reject') &&
                          <View style={{ justifyContent: 'flex-start', flexDirection: 'row', top: 20 }}>
                            <View style={{ width: '30%' }}>
                              <Text style={{ color: '#000', fontWeight: '600', fontSize: 14, textAlignVertical: 'center', }}>
                                Status -
                              </Text>
                            </View>
                            {(item.internal_status == 'admin-approved' || item.internal_status == 'approved-store-2' || item.internal_status == 'admin-reject') ?
                              <View style={{ width: '50%', flexDirection: 'row' }}>
                                <AntDesign name={item.internal_status == 'admin-approved' ? "checkcircleo" : item.internal_status == 'approved-store-2' ? 'exclamationcircleo' : item.internal_status == 'admin-reject' ? 'closecircleo' : ''} size={20} color={item.internal_status == 'admin-approved' ? '#6DB314' : item.internal_status == 'approved-store-2' ? 'rgb(251, 144, 19)' : item.internal_status == 'admin-reject' ? 'red' : '#6DB314'} />
                                <Text style={{ color: item.internal_status == 'admin-approved' ? '#6DB314' : item.internal_status == 'approved-store-2' ? 'rgb(251, 144, 19)' : item.internal_status == 'admin-reject' ? 'red' : '#6DB314', fontWeight: '600', fontSize: 14, textAlignVertical: 'center', left: 5, textTransform: 'capitalize' }}>
                                  {item.internal_status == 'approved-store-2' ? 'Waiting for Admin Approval' : item.internal_status == 'admin-approved' ? 'Approved By Admin' : item.internal_status == 'admin-reject' ? 'Rejected' : '-'}

                                </Text>
                              </View>
                              :
                              <View style={{ width: '70%', flexDirection: 'row' }}>
                                <AntDesign name={item.internal_status == 'received' ? 'checkcircleo' : item.internal_status == 'in-transit' ? 'exclamationcircleo' : item.status == 'rejected' ? 'closecircleo' : ''} size={20} color={item.status == 'raised' ? '#6DB314' : item.status == 'in-transit' ? 'rgb(251, 144, 19)' : item.status == 'rejected' ? 'red' : '#6DB314'} />
                                <Text style={{ color: item.internal_status == 'received' ? '#6DB314' : item.internal_status == 'in-transit' ? 'rgb(251, 144, 19)' : item.status == 'rejected' ? 'red' : '#6DB314', fontWeight: '600', fontSize: 14, textAlignVertical: 'center', left: 5, textTransform: 'capitalize' }}>
                                  {item.status}
                                </Text>
                              </View>
                            }
                          </View>}

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

                          {item.status == 'rejected' &&
                              <View style={{ justifyContent: 'flex-start', flexDirection: 'row', borderBottomWidth: 0.75, borderColor: 'rgba(240, 244, 253, 1)', top: 30, paddingBottom: 5 }}>
                                <View style={{ width: '30%' }}>
                                  <Text style={{ color: '#000', fontWeight: '600', fontSize: 14, textAlignVertical: 'center', }}>
                                    Rej By -
                                  </Text>
                                </View>
                                <View style={{ width: '70%' }}>
                                  <Text style={{ color: '#000', fontWeight: '400', fontSize: 14, textAlignVertical: 'center', }}>
                                    {item.internal_status == 'admin-reject' ? 'Rejected by Admin' : 'Rejected by Store'}
                                  </Text>
                                </View>
                              </View>
                            }

                        {isRejected && selectedItemID == item.id && (
                          <View style={{ top: 20 }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                              }}>
                              <Text style={{ color: '#000' }}>
                                Select Reason for rejection
                              </Text>
                              <AntDesign
                                name="closecircleo"
                                size={18}
                                color="rgb(251, 144, 19)"
                                onPress={() => setIsRejected(false)}
                              />
                            </View>
                            <View style={{ top: 10 }}>
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
                              style={[styles.logout, { top: 10, marginBottom: 10 }]}
                              onPress={() => stockReject(item)}>
                              <Text style={{ fontWeight: '700', color: '#fff' }}>
                                Submit
                              </Text>
                            </TouchableHighlight>
                          </View>
                        )}
                      </View>
                    </View>
                    </Label>
                  
                  </TouchableOpacity>
              
                ) : (
                  ''
                )}
              </>
            );
          })}
          {stockDets?.data?.length == 0 && (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#000' }}>No data Found</Text>
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
    shadowOffset: { width: 0, height: 2 },
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
  reject1: {
    width: '45%',
    height: 50,
    borderColor: '#F71212',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 0.8,
  },
  primary_color: 'rgb(251, 144, 19)',
  reject: {
    width: 'auto',
    height: 30,
    borderColor: '#F71212',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 0.8,
    paddingLeft: 10, paddingRight: 10, backgroundColor: '#fff'
  },
  text: {
    fontSize: 16,
    color: '#000'
  },
  marginL: {
    marginLeft: 10
  },
  
  label: { fontSize: 11, color: 'white', textAlign: 'center', alignItems: 'center', justifyContent: 'center', height: 18, elevation: 24, top: 2,shadowColor:'#fff' },
 
});
export default ReceivedRequests;
