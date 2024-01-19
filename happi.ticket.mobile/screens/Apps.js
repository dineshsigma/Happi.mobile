import * as React from "react";
import {
  Text, StyleSheet, View, Image, Pressable,
  ImageBackground, RefreshControl, FlatList, Dimensions,BackHandler, SafeAreaView, TextInput, TouchableOpacity, Modal, StatusBar, Linking, Button, ScrollView, TouchableHighlight, Platform, PermissionsAndroid,Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import LogServices from "../logServices";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Label, { Orientation } from "react-native-label";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updatetoken } from '../reducers/auth';
import analytics from '@react-native-firebase/analytics';
import VersionCheck from 'react-native-version-check'
import 'react-native-gesture-handler'
import { updateScanProduct } from "../reducers/stockTransfer";

const Apps = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = React.useState()
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        // RECORD_AUDIO
        // PermissionsAndroid.PERMISSIONS.CAMERA,
        // {
        //   title: 'Happi needs Camera Permission',
        //   message:
        //     'Happi needs access to your camera ' +
        //     'to scan product details.',
        //   buttonNeutral: 'Ask Me Later',
        //   buttonNegative: 'Cancel',
        //   buttonPositive: 'OK',
        // },
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      );
      // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      //   console.log('You can use the camera');
      // } else {
      //   console.log('Camera permission denied');
      // }
    } catch (err) {
      console.warn(err);
    }
  };

  const checkUpdateNeeded = async () => {
        //If App exists in playstore
    let updateNeeded = await VersionCheck.needUpdate();
    LogServices('debug', updateNeeded, 'Version Check') //check req here
    if (updateNeeded.isNeeded) {
      //Alert the user and direct to the app url
      Alert.alert(
        'Please Update',
        'You will have to update Happi Employee Management to latest version to continue using',
        [
          {
            text: 'Update',
            onPress: () => {
              // BackHandler.exitApp();
              Linking.openURL(updateNeeded.storeUrl)
            }
          }
        ],
        { cancelable: false }
      )

    }
  }

  React.useEffect(()=>{
    analytics().logEvent('my_custom_event', {
      id: 101,
      item: 'My Product Name',
      description: ['My Product Desc 1', 'My Product Desc 2'],
    });
    AsyncStorage.getItem('user').then((user) => {
        // setUserData(user)
        if (user == "" || user == null || user == undefined) {
        }
        else {
          analytics().logScreenView({
            screen: 'App',
            user_id: JSON.parse(user)._id
          });
        }
      })
},[])

  React.useEffect(() => {
    requestCameraPermission()
    AsyncStorage.getItem('token').then(value => {
      if (value == "" || value == null || value == undefined) {
        // dispatch(updatetoken(value));
        // navigation.navigate('Login1');
      } else {
        setUserData(JSON.parse(user));
      }
    })
    checkUpdateNeeded()
    }, [token])
  const TicketsWebview = () => {
    navigation.navigate('HappiTickets')
  }
  const StockTransferView = () => {
    navigation.navigate('StockRequest')
  }
  const AuditScanView = () => {
    navigation.navigate('AuditScan')
  }

  const DiscountLogin =()=>{
    AsyncStorage.getItem('discountToken').then(value => {
      console.log('disccc token', value)
      if (value == "" || value == null || value == undefined) {
        navigation.navigate('DiscountLogin')

      } else {
          navigation.navigate('DiscountDashboard')
      }
    })
  }
  return (
    <View>
      <MaterialCommunityIcons name="account-circle-outline" color="rgb(251, 144, 19)" size={32} style={{ top: 20, right: 20, marginLeft: 'auto' }} onPress={() => navigation.navigate('Profile')} />

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', padding: 30, justifyContent: 'space-evenly', }}>
        <Label
          orientation={Orientation.TOP_RIGHT}
          containerStyle={styles.labelCircle}
          style={styles.label}
          title="New"
          color="green"
          distance={50}
          extent={0}
          ratio={1}
        >
          <TouchableOpacity
            // style={styles.circle}
            underlayColor='#ccc'
            onPress={() => navigation.navigate('BarCodeScanner')}
            style={{justifyContent:'center', alignItems:'center'}}
          >
            <Text> <MaterialCommunityIcons name="data-matrix-scan" color="#6F787C" size={26} style={{ top: 20}} /> </Text>
            <Text style={{ fontWeight: '600' }}>₹Scan</Text>

          </TouchableOpacity>
        </Label>

        <Label
          orientation={Orientation.TOP_RIGHT}
          containerStyle={[styles.labelCircle, { left: 10 }]}
          style={styles.label}
          title="New"
          color="green"
          distance={50}
          extent={0}
          ratio={1}
        >
          <TouchableOpacity
            // style={styles.circle}
            underlayColor='#ccc'
            // onPress={() => navigation.navigate('DrawerNavigator')}
            onPress={() => DiscountLogin()}
            style={{justifyContent:'center', alignItems:'center'}}
          >
            <MaterialCommunityIcons name="brightness-percent" color="#6F787C" size={26}/>
            <Text style={{ fontWeight: '600' }}>Discount</Text>

          </TouchableOpacity>
        </Label>
        
        <Label
          orientation={Orientation.TOP_RIGHT}
          containerStyle={styles.labelCircle}
          style={styles.label}
          title="New"
          color="green"
          distance={50}
          extent={0}
          ratio={1}
        >
          <TouchableOpacity
            // style={styles.circle}
            underlayColor='#ccc'
            onPress={() => TicketsWebview()}
            style={{justifyContent:'center', alignItems:'center'}}

          >
            <Text><MaterialCommunityIcons name="comment-question-outline" color="#6F787C" size={26} style={{ top: 20, left: 25 }} /></Text>
            <Text style={{ fontWeight: '600' }}>Tickets</Text>

          </TouchableOpacity>
        </Label>

        <Label
          orientation={Orientation.TOP_RIGHT}
          containerStyle={[styles.labelCircle, { left: 10 }]}
          style={styles.label}
          title="Coming Soon"
          color="red"
          distance={50}
          extent={0}
          ratio={1}
        >
          <TouchableOpacity
            // style={styles.circle}
            underlayColor='#ccc'
            style={{justifyContent:'center', alignItems:'center'}}
            // onPress={()=> navigation.navigate('DiscountTable')}
          >
            <Text> <MaterialCommunityIcons name="chart-line-variant" color="#6F787C" size={26} style={{ top: 20, left: 20 }} /> </Text>
            <Text style={{ fontWeight: '600' }}>GP</Text>

          </TouchableOpacity>
        </Label>
        <Label
          orientation={Orientation.TOP_RIGHT}
          containerStyle={[styles.labelCircle, { top: 10 }]}
          style={styles.label}
          title="New"
          color="green"
          distance={50}
          extent={0}
          ratio={1}
        >
          <TouchableHighlight
            // style={styles.circle}
            underlayColor='#ccc'
            onPress={() => navigation.navigate('PhoneVerification')}
            style={{justifyContent:'center', alignItems:'center'}}
          >
            <View>
              <MaterialIcons name="mobile-friendly" color="#6F787C" size={26} style={{ top: 0, left: 10 }} />
              <Text style={{ fontWeight: '600', textAlign: 'center' }}>iPhone {'\n'}Terminal</Text>
            </View>
          </TouchableHighlight>
        </Label>

        <Label
          orientation={Orientation.TOP_RIGHT}
          containerStyle={styles.labelCircle}
          style={styles.label}
          title="New"
          color="green"
          distance={50}
          extent={0}
          ratio={1}
        >
          <TouchableOpacity
            // style={styles.circle}
            underlayColor='#ccc'
            onPress={() => StockTransferView()}
            style={{justifyContent:'center', alignItems:'center'}}

          >
            <Text><MaterialCommunityIcons name="swap-horizontal-circle-outline" color="#6F787C" size={26} style={{ top: 20, left: 25 }} /></Text>
            <Text style={{ fontWeight: '600', textAlign:'center' }}>Stock{'\n'}Transfer</Text>

          </TouchableOpacity>
        </Label>


        <Label
          orientation={Orientation.TOP_RIGHT}
          containerStyle={styles.labelCircle}
          style={styles.label}
          title="New"
          color="green"
          distance={50}
          extent={0}
          ratio={1}
        >
          <TouchableOpacity
            // style={styles.circle}
            underlayColor='#ccc'
            onPress={() => AuditScanView()}
            style={{justifyContent:'center', alignItems:'center'}}

          >
            <Text><MaterialCommunityIcons name="swap-horizontal-circle-outline" color="#6F787C" size={26} style={{ top: 20, left: 25 }} /></Text>
            <Text style={{ fontWeight: '600', textAlign:'center' }}>Audit{'\n'}Scan</Text>

          </TouchableOpacity>
        </Label>
      </View>


    </View>

  );
};

const styles = StyleSheet.create({
  circle: {
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    width: Dimensions.get('window').width * 0.3,
    height: Dimensions.get('window').width * 0.3,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  labelCircle: {
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 1,
    width: Dimensions.get('window').width * 0.3,
    height: Dimensions.get('window').width * 0.3,
    backgroundColor: 'rgb(251, 144, 19)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,

  },
  label: { fontSize: 11, color: 'white', textAlign: 'center', alignItems: 'center', justifyContent: 'center', height: 18, elevation: 24, top: 2 },
  button: { width: '100%', height: 40, backgroundColor: 'rgb(251, 144, 19)', justifyContent: 'center', alignItems: 'center', top: 80 }
});




export default Apps;
