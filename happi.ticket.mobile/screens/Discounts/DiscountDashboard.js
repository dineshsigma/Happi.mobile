import * as React from "react";
import {
  Text, StyleSheet, View, Dimensions, SafeAreaView, TouchableOpacity, Modal, StatusBar, Linking, Button, ScrollView, TouchableHighlight, Platform, TextInput, FlatList
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { Card, Image } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {activityLogs} from '../../reducers/products';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {StackActions} from '@react-navigation/native';

const DiscountDashboard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.discountToken);

  React.useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      if (user == '' || user == null || user == undefined) {
      } else {
        let payload = {
          emp_id: JSON.parse(user).emp_id,
          module: 'happi-discount',
          mobile: JSON.parse(user).phone,
        };
        dispatch(activityLogs(payload));
      }

      navigation.setOptions({
        headerTransparent: true,
        headerRight: () => (
          <View>
            <MaterialCommunityIcons
              name="account-circle-outline"
              size={24}
              color={'#fff'}
              onPress={() => navigation.navigate('DiscountProfile')}
            />
          </View>
        ),
      });
      AsyncStorage.getItem('discountToken').then(value => {
        console.log('value profile', value);
        if (value == null) {
          navigation.navigate('Apps');
        }
      });

    
    });
  }, [token]);
//   React.useEffect(()=>{
//     const backAction = () => {
//         // BackHandler.exitApp()
//         console.log('backkkk222');
//         navigation.dispatch(StackActions.pop(2));
//       };

//       const backHandler = BackHandler.addEventListener(
//         'hardwareBackPress',
//         backAction,
//       );

//       return () => backHandler.remove();
//   },[token])

  return (
    <ScrollView style={{flex: 1}}>
      <View style={{flex: 1, top: 20}}>
        <Text
          style={{
            fontSize: 15,
            color: 'black',
            fontWeight: 'bold',
            paddingLeft: 15,
            paddingTop: 10,
          }}>
          STORE
        </Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <TouchableOpacity
            underlayColor="#ccc"
            onPress={() => navigation.navigate('Discount')}>
            <Card
              containerStyle={{
                borderRadius: 10,
                backgroundColor: 'rgb(251, 144, 19)',
              }}>
              <View style={{alignItems: 'center'}}>
                <Image
                  style={{width: 90, height: 90, marginBottom: 10}}
                  source={{
                    uri: 'https://assets.happimobiles.net/assets/media/login-icons/manager-discount.png',
                  }}
                />
                <View style={{width: 115}}>
                  <Text style={{color: '#fff'}}>Manager Discount</Text>
                </View>
              </View>
            </Card>
          </TouchableOpacity>

          <Card
            containerStyle={{
              borderRadius: 10,
              backgroundColor: 'rgb(251, 144, 19)',
            }}>
            <View style={{alignItems: 'center'}}>
              <Image
                style={{width: 90, height: 90, marginBottom: 10}}
                source={{
                  uri: 'https://assets.happimobiles.net/assets/media/login-icons/uniform.png',
                }}
              />
              <View style={{width: 115}}>
                <Text style={{color: '#fff'}}>Uniform-StorePanel</Text>
              </View>
            </View>
          </Card>

          <Card
            containerStyle={{
              borderRadius: 10,
              backgroundColor: 'rgb(251, 144, 19)',
            }}>
            <View style={{alignItems: 'center'}}>
              <Image
                style={{width: 90, height: 90, marginBottom: 10}}
                source={{
                  uri: 'https://assets.happimobiles.net/assets/media/login-icons/footfall.png',
                }}
              />
              <View style={{width: 115}}>
                <Text style={{color: '#fff'}}>Footfall - Store</Text>
              </View>
            </View>
          </Card>

          <Card
            containerStyle={{
              borderRadius: 10,
              backgroundColor: 'rgb(251, 144, 19)',
            }}>
            <View style={{alignItems: 'center'}}>
              <Image
                style={{width: 90, height: 90, marginBottom: 10}}
                source={{
                  uri: 'https://assets.happimobiles.net/assets/media/login-icons/lost-sale.png',
                }}
              />
              <View style={{width: 115}}>
                <Text style={{color: '#fff'}}>Missed-Customer</Text>
              </View>
            </View>
          </Card>
          <TouchableOpacity
            underlayColor="#ccc"
            onPress={() => navigation.navigate('cashdiscount')}>
            <Card
              containerStyle={{
                borderRadius: 10,
                backgroundColor: 'rgb(251, 144, 19)',
              }}>
              <View style={{alignItems: 'center'}}>
                <Image
                  style={{width: 90, height: 90, marginBottom: 10}}
                  source={{
                    uri: 'https://assets.happimobiles.net/assets/media/login-icons/offer.png',
                  }}
                />
                <View style={{width: 115}}>
                  <Text style={{color: '#fff'}}>Cash Discount-Store</Text>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontSize: 15,
            color: 'black',
            fontWeight: 'bold',
            paddingLeft: 15,
            paddingTop: 10,
          }}>
          ADMIN
        </Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <TouchableOpacity
            underlayColor="#ccc"
            onPress={() => navigation.navigate('cashdiscount')}>
            <Card
              containerStyle={{
                borderRadius: 10,
                backgroundColor: 'rgb(251, 144, 19)',
              }}>
              <View style={{alignItems: 'center'}}>
                <Image
                  style={{width: 90, height: 90, marginBottom: 10}}
                  source={{
                    uri: 'https://assets.happimobiles.net/assets/media/login-icons/manager-discount.png',
                  }}
                />
                <View style={{width: 115}}>
                  <Text style={{color: '#fff'}}>Manager Discount</Text>
                </View>
              </View>
            </Card>
          </TouchableOpacity>

          <Card
            containerStyle={{
              borderRadius: 10,
              backgroundColor: 'rgb(251, 144, 19)',
            }}>
            <View style={{alignItems: 'center'}}>
              <Image
                style={{width: 90, height: 90, marginBottom: 10}}
                source={{
                  uri: 'https://assets.happimobiles.net/assets/media/login-icons/uniform.png',
                }}
              />
              <View style={{width: 115}}>
                <Text style={{color: '#fff'}}>Uniform-AdminPanel</Text>
              </View>
            </View>
          </Card>

          <Card
            containerStyle={{
              borderRadius: 10,
              backgroundColor: 'rgb(251, 144, 19)',
            }}>
            <View style={{alignItems: 'center'}}>
              <Image
                style={{width: 90, height: 90, marginBottom: 10}}
                source={{
                  uri: 'https://assets.happimobiles.net/assets/media/login-icons/footfall.png',
                }}
              />
              <View style={{width: 115}}>
                <Text style={{color: '#fff'}}>Footfall - Admin</Text>
              </View>
            </View>
          </Card>
        </View>
        <View style={{height:100}}/>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  circle: {
    borderRadius:
      Math.round(
        Dimensions.get('window').width + Dimensions.get('window').height,
      ) / 2,
    width: Dimensions.get('window').width * 0.4,
    height: Dimensions.get('window').width * 0.4,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
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
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 16,
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 8,
    marginBottom: 8,
  },
  searchSections: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DDD',
    padding: 10,
    top: 15,
  },
  searcinput: {
    width: '90%',
    borderWidth: 1,
    borderRadius: 20,
    height: 40,
    flex: 1,
  },
  formInput: {
    paddingLeft: 16,
    color: '#323232',
    borderWidth: 1,
    borderColor: 'lightgray',
    backgroundColor: 'white',
    fontSize: 15,
    height: 44,
    width: '100%',
    right: 10,
  },
  formIcon: {
    fontSize: 24,
    color: 'lightgray',
    lineHeight: 42,
    width: 42,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    position: 'absolute',
    right: 10,
    zIndex: 2,
  },
  treatment_method__icon__container: {
    // flex: "1 0 21%",
    margin: 5,
    height: 100,
  },

  treatment_method__icon__outer_circle: {
    backgroundColor: 'red',
    borderRadius: 50,
    width: 80,
    height: 80,
    padding: 10,
  },

  treatment_methods_icon: {
    verticalAlign: 'middle',
    width: 80,
    height: 80,
    borderRadius: 50,
    color: '#ffffff',
  },
});

export default DiscountDashboard;
