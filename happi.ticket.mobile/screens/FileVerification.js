import * as React from "react";
import {
    Text, StyleSheet, View, Image, Pressable,
    ImageBackground, RefreshControl, FlatList, Dimensions, SafeAreaView, TextInput, TouchableOpacity, Modal, StatusBar, Linking, Button, ScrollView, TouchableHighlight, Platform
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector, useDispatch } from "react-redux";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { invoiceNumber, iphoneUpload, uploadResponseEmpty, getBarcodeImage, setBarcode, getReports, ImeiVerification, IMEIFileUpload, setFileUploadResponse, setImeiVerificationResponse, setBarcodeVerificationLoader } from "../reducers/products";
import ConfettiCannon from 'react-native-confetti-cannon';


const FileVerification = ({ route }) => {
    let verificationDetails = route.params;
    const navigation = useNavigation();
    const [invoiceno, setInvoiceno] = React.useState()
    const passedInvoice = route?.params.invoice;
    const status = route?.params.status
    const message = route?.params.reponse;
    const [userData, setUserData] = React.useState()
    const barcode = useSelector((state) => state.products.barcode);
    const dispatch = useDispatch();
    const [startDate, setStartDate] = React.useState(new Date());
    const [dueDate, setDueDate] = React.useState(new Date());
    const [selectedFile, setSelectedFile] = React.useState()
    const [showAddFile, setShowAddFile] = React.useState(false)

    // React.useEffect(()=>{
    //     AsyncStorage.getItem('user').then((user) => {
    //         if (user == "" || user == null || user == undefined) {
    //             //Show no user image
    //         }
    //         else {
    //           setUserData(JSON.parse(user));
    //           if (!passedInvoice) {
    //             Alert.alert('No Invoice added')
    //           } else {
    //             let invoice_id = passedInvoice
    //             const payload = {
    //               invoice_no: invoice_id?.trim(),
    //               user_id: user._id,
    //               emp_code: user.emp_id
    //             }
    //             setInvoiceno()
    //             dispatch(getBarcodeImage(payload)).then((res) => {
    //                 const data = JSON.stringify(res).payload
    //               setInvoiceno(data)
    //             })
    //           }
    //         }
    //       })


    // },[])
    const goToHome=()=>{
        AsyncStorage.getItem('user').then((user) => {
            if (user == "" || user == null || user == undefined) {
      
            }
            else {
              setUserData(JSON.parse(user));
              let reportsPayload = {
                startDate: startDate,
                endDate: dueDate,
                userDetails: user,
                type: "all"
              }
              dispatch(getReports(reportsPayload)).then(
                navigation.navigate('PhoneVerification')
              )
            }
          })
        
    }

    React.useEffect(() => {
if (verificationDetails?.data?.status == 'SUCCESS') {
            setTimeout(() => {
                goToHome()
            }, 5000)
        }

        navigation.setOptions({
            headerTransparent: true,
            headerRight: () => (
                <View >
                    <MaterialCommunityIcons name="home" size={24} color={'#fff'} onPress={() => goToHome()} />
                </View>
            ),
        });
    }, [])

    const reload = () => {
        if (message == 'No IMEI Found') {
            navigation.navigate('UploadDocs', passedInvoice)
        }
    }
    const goBack = () => {
        if (verificationDetails?.data?.status == 'FAILED') {
            navigation.navigate('UploadDocs', { invoice_no: passedInvoice })
            dispatch(setFileUploadResponse())
            dispatch(setImeiVerificationResponse())
        }
    }
    return (
        <View style={{ flex: 2, }}>
            <View style={{ flex: 0.55, backgroundColor: 'rgb(251, 144, 19)', paddingTop: 10, flexGrow: 0.5, justifyContent: 'center' }}>
                {verificationDetails?.data?.status == 'FAILED' &&
                    <>
                        <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '600', fontSize: 20 }}>Invoice Number</Text>
                        <TextInput style={{ borderWidth: 1.5, borderRadius: 5, marginTop: 10, width: '90%', marginLeft: 20, paddingLeft: 5, borderColor: '#fff', color: '#fff', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontWeight: '600' }}
                            // placeholder="Ex: SA/AMPT/1245"
                            // placeholderTextColor={'#E0E0E0'}
                            // onChangeText={(text) => setInvoiceno(text)}
                            value={verificationDetails?.data?.invoice_no}
                            editable={false}
                        />
                    </>
                }
            </View>
            <TouchableHighlight style={verificationDetails?.data?.status == 'FAILED' ? styles.okButton : styles.goButton} onPress={goBack}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: '#fff', fontWeight: '600' }}>{verificationDetails?.data?.status == 'SUCCESS' ? 'Verification Success' : 'Verification Failed'}</Text>
                    {verificationDetails?.data?.status == 'FAILED' &&
                        <View style={{ width: 20, height: 20, backgroundColor: '#fff', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', left: 10, borderRadius: 5 }}>
                            <EvilIcons name="refresh" size={22} color={'#000'} />
                        </View>
                    }
                </View>
            </TouchableHighlight>
            {verificationDetails?.data?.status == 'SUCCESS' &&
                <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} autoStart={true} explosionSpeed={100} fadeOut={true} />
            }
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
    goButton: { width: '90%', height: 50, backgroundColor: 'rgba(87, 186, 93, 1)', bottom: 25, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginLeft: 20 },
    okButton: { width: '90%', height: 50, backgroundColor: 'rgba(255, 62, 62, 1)', bottom: 25, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginLeft: 20 },
    card_TaskList: { backgroundColor: 'white', borderRadius: 8, marginBottom: 16, overflow: 'hidden', shadowColor: 'rgba(0,0,0,0.2)', shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, shadowOpacity: 0.1, elevation: 8, height: 200, borderColor: 'rgba(230, 230, 230, 1)', borderWidth: 0.8, width: 200, alignSelf: 'center', top: 20 },

});

export default FileVerification;
