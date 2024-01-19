import * as React from "react";
import {
  Text, StyleSheet, View, Image, Pressable,
  ImageBackground, RefreshControl, FlatList, Dimensions, ActivityIndicator,SafeAreaView, TextInput, TouchableOpacity, Modal, StatusBar, Linking, Button, ScrollView, TouchableHighlight, Platform
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector, useDispatch } from "react-redux";
import { invoiceNumber, iphoneUpload, uploadResponseEmpty, getBarcodeImage, setBarcode, getReports, ImeiVerification,IMEIFileUpload,setFileUploadResponse,setImeiVerificationResponse,setBarcodeVerificationLoader,uploadLoder} from "../reducers/products";
import DocumentPicker from 'react-native-document-picker';
import { readFile } from 'react-native-fs';


const UploadDocs = ({ route }) => {
  const navigation = useNavigation();
  const [invoiceno, setInvoiceno] = React.useState()
  const invoiceDetails = route.params;
  const [userData, setUserData] = React.useState()
  const barcode = useSelector((state) => state.products.barcode);
  const IMEI_VerificationResponse = useSelector((state) => state.products.barcIMEI_VerificationResponseode);
  const IMEIFileUploadResponse = useSelector((state) => state.products.IMEIFileUploadResponse);
  const barcodeVerificationLoader = useSelector((state) => state.products.barcodeVerificationLoader);
  const checkInvoiceNumberResponse = useSelector((state) => state.products.checkInvoiceNumberResponse)
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = React.useState()
  const [showAddFile, setShowAddFile] = React.useState(false)
  React.useEffect(() => {
    dispatch(uploadLoder(true))
    AsyncStorage.getItem('user').then((user) => {
      if (user == "" || user == null || user == undefined) {
        //Show no user image
      }
      else {
        setUserData(JSON.parse(user));
        if (!invoiceDetails) {
          Alert.alert('No Invoice added')
        } else {
          dispatch(setFileUploadResponse())
          dispatch(setImeiVerificationResponse())
          let invoice_id = invoiceDetails.invoice_no
          let user_data = JSON.parse(user)
          const payload = {
            invoice_no: invoice_id?.trim(),
            user_id: user_data?._id,
            emp_code:user_data?.emp_code,
            emp_name:user_data?.emp_name,
            imei_array:invoiceDetails?.imei_array,
            email:user_data?.email
          }
          setInvoiceno()
          dispatch(getBarcodeImage(payload)).then((res) => {
          dispatch(uploadLoder(false))
            let map = {}
            // if( Object.keys(IMEIFileUploadResponse).length == 0) {
            //   clearInterval(map.interval)
            // }
            // if(Object.keys(IMEIFileUploadResponse).length == 0 && IMEI_VerificationResponse?.data?.message !== 'NOT UPLOADED' ) {
            //   dispatch(setBarcodeVerificationLoader(true));
            // }else {
            //   dispatch(setBarcodeVerificationLoader(false));
            // }
            const uploadVerification = () => {
              // ...your async stuff goes here for upload verification
               dispatch(ImeiVerification(res.payload.id)).then((response) => {
                // const obj = {
                //   reponse: response?.payload.data.message,
                //   invoice: response?.payload?.data?.invoice_no,
                //   status : response?.payload?.data?.status 
                // }
                
                // if (response?.payload?.data?.message !== 'NOT UPLOADED' || IMEIFileUploadResponse?.data?.message) {
                  if (response?.payload?.data?.message !== 'NOT UPLOADED') {
                  clearInterval(map.interval)
                  navigation.navigate('FileVerification', response.payload)
                   }
              })
            }
               map.interval =  setInterval(uploadVerification, 10000)
            //  map.interval =  Object.keys(IMEIFileUploadResponse).length == 0 && setInterval(uploadVerification, 10000)

            // setInterval(() => {
            //   dispatch(ImeiVerification(res.payload.id))
            // }, 15000)



          })
        }
      }
    })


  }, [])

  const selectFile = async () => {
    dispatch(setFileUploadResponse())
    dispatch(setImeiVerificationResponse())
    try {
      const doc = await DocumentPicker.pickSingle()
      const fileData = await readFile(doc.uri, 'base64');
      let files = {
        // base64: fileData,
        file: doc,
        id:barcode?.id,
        // Invoice_No: invoiceno,
        // user_id: userData?._id
      }
     
      dispatch(IMEIFileUpload(files)).then((reponse) => {
          navigation.navigate('FileVerification', reponse.payload)
        setTimeout(() => {
          dispatch(uploadResponseEmpty())
          //   navigation.goBack()
        }, 3000)

      })
      setSelectedFile(doc)
      setShowAddFile(true)

    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        setShowAddFile(false)
      }
      else {
        setShowAddFile(false)
      }
    }
  }

const imeiVerification = () => {
  dispatch(ImeiVerification(barcode.id)).then((response) => {
      if (response?.payload?.data?.message !== 'NOT UPLOADED') {
      navigation.navigate('FileVerification', response.payload) 
    }
  })
}

  return (
    <View style={{ flex: 1, }}>

      <View style={{ height: '45%', backgroundColor: 'rgb(251, 144, 19)', paddingTop: 10, }}>
        <TextInput style={{ borderWidth: 1.5, borderRadius: 5, marginTop: 10, width: '90%', marginLeft: 20, paddingLeft: 5, borderColor: '#fff', color: '#fff', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontWeight: '600' }}
          // placeholder="Ex: SA/AMPT/1245"
          // placeholderTextColor={'#E0E0E0'}
          // onChangeText={(text) => setInvoiceno(text)}
          value={checkInvoiceNumberResponse.invoice_no}
          editable={false}

        />
        <View style={{ justifyContent: 'center', alignItems: 'center', top: 10 }}>
          <TouchableOpacity onPress={selectFile}>
            <Image source={require('../assets/Cloud.png')} style={{ width: 60, height: 60 }} />
          </TouchableOpacity>
          <Text style={{ color: '#fff', fontWeight: '400', fontSize: 14, top: 10 }}>You need to Upload Your</Text>
          <Text style={{ color: '#fff', fontWeight: '700', fontSize: 18, top: 10 }}>Invoice File</Text>
          <View style={{ alignSelf: 'center', width: '65%', top: 20 }}>
            <Text style={{ textAlign: 'center', fontSize: 12, color: '#fff' }}>Note that the uploaded image will be directly sent to the Apple for warranty verification and Fraud Detection.</Text>
          </View>
        </View>
      </View>
      <TouchableHighlight style={styles.okButton}>
        <View   style={{
                                ...styles.button
                                // backgroundColor: isLoading ? "#4caf50" : "#8bc34a",
                            }}>
    {barcodeVerificationLoader &&  <ActivityIndicator size="small" color="#fff" />}
        <Text style={{ color: '#fff', fontWeight: '600' }}>OR</Text>
        </View>
      </TouchableHighlight>

      <View style={{ bottom: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: '300', color: '#000', textAlign: 'center' }}>Scan</Text>
        <Text style={{ fontSize: 20, fontWeight: '700', color: '#000', textAlign: 'center' }}>QR Code</Text>
        <TouchableOpacity onPress={() => imeiVerification()}>
          <View style={{ width: 30, height: 30, backgroundColor: 'rgb(251, 144, 19)', alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
            <MaterialCommunityIcons name="refresh" size={18} color={'#fff'} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.card_TaskList}>
        {barcode && <Image source={{ uri: barcode?.data }}
          style={{ width: 180, height: 180, alignSelf: 'center' }}
        />}
        {/* {invoiceno?.message=='INVALID INVOICE NUMBER' && <Text>
        Invalid Invoice Number
        </Text>} */}
      </View>
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
  logout: { width: '100%', height: 40, backgroundColor: 'rgb(251, 144, 19)', justifyContent: 'center', alignItems: 'center', top: 80, },
  invoiceText: {
    fontWeight: '700',
    color: '#000',
    fontSize: 16
  },
  goButton: { width: 50, height: 50, backgroundColor: 'rgba(66, 65, 102, 1)', right: 50, top: 10, borderTopRightRadius: 5, borderBottomRightRadius: 5, justifyContent: 'center', alignItems: 'center' },
  okButton: { width: '90%', height: 50, backgroundColor: 'rgba(66, 65, 102, 1)', bottom: 25, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginLeft: 20 },
  card_TaskList: { backgroundColor: 'white', borderRadius: 8, marginBottom: 16, overflow: 'hidden', shadowColor: 'rgba(0,0,0,0.2)', shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, shadowOpacity: 0.1, elevation: 8, height: 180, borderColor: 'rgba(230, 230, 230, 1)', borderWidth: 0.8, width: 180, alignSelf: 'center', top: -10 },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    // width: 50,
    height: 70,
    // borderWidth: 1,
    // borderColor: "#666",
    // borderRadius: 10,
},

});

export default UploadDocs;
