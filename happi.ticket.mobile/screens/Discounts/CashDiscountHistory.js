import * as React from "react";
import {
  Text, StyleSheet, View, Image, Pressable,
  ImageBackground, RefreshControl, FlatList, Dimensions, SafeAreaView, TextInput, TouchableOpacity, Modal, StatusBar, Linking, Button, ScrollView, TouchableHighlight, Platform
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getDiscountHistory } from "../../reducers/cashDiscount";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment/moment';
import Spinner from 'react-native-loading-spinner-overlay';
const dimensions_width = Dimensions.get('window').width
const CashDiscountHistory = () => {
  const navigation = useNavigation();
  const [searchValue, setSearchValue] = React.useState('')
  const [discountData, setDiscountData] = React.useState()
  const isLoading = useSelector((state) => state.cashDiscount.isLoading);
  const loading = useSelector((state) => state.cashDiscount.uploadLoading);
  const dispatch = useDispatch();
  React.useEffect(() => {
    AsyncStorage.getItem('employeeData').then((user) => {
      if (user == "" || user == null || user == undefined) {
      }
      else {
        let payload ={
          user: user,
          reference : ''
        }
        dispatch(getDiscountHistory(payload)).then((res) => {
          setDiscountData(res.payload)
        })
      }
    })
  }, [])

  React.useEffect(()=>{
    AsyncStorage.getItem('employeeData').then((user) => {
      let payload ={
        user: user,
        reference : searchValue
      }
      if(searchValue.length>=4 || searchValue==''){
      dispatch(getDiscountHistory(payload)).then((res) => {
        setDiscountData(res.payload)
      })
    }
    })
  },[searchValue])


  return (
    <View >
      <View style={[styles.searchSections]}>
        <View style={{ paddingLeft: 20, width: '100%' }}>
          <MaterialIcons style={styles.formIcon} name="search" />
          <TextInput style={styles.formInput} underlineColorAndroid="transparent" placeholder="Search by Reference No" variant="standard"
            onChangeText={(text) => setSearchValue(text)} placeholderTextColor={'#000'}/>
        </View>
      </View>

      {/* Loop this whole card view */}
      <Spinner
        visible={loading || isLoading}
        textContent={'Loading...'}
        textStyle={[styles.spinnerTextStyle, { color: '#fff' }]}
      />
      <ScrollView>
        {discountData?.length > 0 && discountData?.map((item, index) => {
          return (
            <Pressable onPress={() => navigation.navigate('HistoryDetails', item)}>
              <View style={styles.parentCard}>
                <View style={styles.card}>
                  <View style={styles.items}>
                    <View style={styles.title}>
                      <Text style={styles.blackText}>Date</Text>
                    </View>
                    <View style={styles.hyphen}>
                      <Text style={styles.blackText}>-</Text>
                    </View>
                    <View style={styles.details}>
                      <Text style={styles.blackText}>{moment(item.created_at).format('ll')}</Text>
                    </View>
                  </View>

                  <View style={styles.items}>
                    <View style={styles.title}>
                      <Text style={styles.blackText}>Reference No</Text>
                    </View>
                    <View style={styles.hyphen}>
                      <Text style={styles.blackText}>-</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('HistoryDetails', item)}>
                      <View style={styles.details}>
                        <Text style={{ color: 'blue' }}>{item.reference_no}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.items}>
                    <View style={styles.title}>
                      <Text style={styles.blackText}>Customer Mobile No</Text>
                    </View>
                    <View style={styles.hyphen}>
                      <Text style={styles.blackText}>-</Text>
                    </View>
                    <View style={styles.details}>
                      <Text style={styles.blackText}>{item.customer_mobile}</Text>
                    </View>
                  </View>

                  <View style={styles.items}>
                    <View style={styles.title}>
                      <Text style={styles.blackText}>Model</Text>
                    </View>
                    <View style={styles.hyphen}>
                      <Text style={styles.blackText}>-</Text>
                    </View>
                    <View style={styles.details}>
                      <Text style={styles.blackText}>{item.model}</Text>
                    </View>
                  </View>

                  <View style={styles.items}>
                    <View style={styles.title}>
                      <Text style={styles.blackText}>Amount</Text>
                    </View>
                    <View style={styles.hyphen}>
                      <Text style={styles.blackText}>-</Text>
                    </View>
                    <View style={styles.details}>
                      <Text style={styles.blackText}>₹{item.discount_total_price}</Text>
                    </View>
                  </View>

                  <View style={styles.items}>
                    <View style={styles.title}>
                      <Text style={styles.blackText}>Coupon Status</Text>
                    </View>
                    <View style={styles.hyphen}>
                      <Text style={styles.blackText}>-</Text>
                    </View>
                    <View style={styles.details}>
                      <Text style={{ color: item.status == 'Approved' ? 'green' : 'red', textTransform:'capitalize' }}>{item.status}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </Pressable>
          )
        }
        )}
        <View style={{ height: 80 }} />
      </ScrollView>
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
  button: { top: 20, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', height: 60, borderWidth: 1, borderRadius: 10, marginTop: 30, borderColor: 'orange', height: 150 },
  searchSections: { width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', padding: 10, },
  searcinput: {
    width: '90%',
    borderWidth: 1,
    borderRadius: 20,
    height: 40,
    flex: 1,

  },
  formInput: { paddingLeft: 16, color: '#323232', borderWidth: 1, borderColor: '#000', backgroundColor: 'white', fontSize: 15, height: 44, width: '100%', right: 10 },
  formIcon: { fontSize: 24, color: "lightgray", lineHeight: 42, width: 42, display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', position: 'absolute', right: 10, zIndex: 2, },
  card: { height: 'auto', borderWidth: 2, borderRadius: 10, borderColor: 'rgb(251, 144, 19)', paddingRight: 30, paddingTop: 5, paddingBottom: 5 },
  items: { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', paddingTop: 5 },
  parentCard: { paddingLeft: 10, paddingRight: 10, top: 5, paddingBottom: 7 },
  title: { width: dimensions_width - 250, paddingLeft: 10 },
  hyphen: { width: 30, paddingLeft: 10, },
  details: { width: dimensions_width - 230, paddingLeft: 10, },
  blackText: { color: '#000' }


});

export default CashDiscountHistory;
