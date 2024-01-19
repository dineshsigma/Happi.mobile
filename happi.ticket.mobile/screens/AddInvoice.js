import * as React from "react";
import {
    Text, StyleSheet, View, Image, Pressable,
    ImageBackground, RefreshControl, FlatList, Dimensions, SafeAreaView, TextInput, TouchableOpacity, Modal, StatusBar, Linking, Button, ScrollView, TouchableHighlight, Platform, Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { BottomSheet } from 'react-native-btr';
import { invoiceNumber, iphoneUpload, uploadResponseEmpty, getBarcodeImage, setBarcode, getReports,checkInvoiceNumber } from "../reducers/products";
import { useSelector, useDispatch } from "react-redux";


const AddInvoice = () => {
    const navigation = useNavigation();
    const [invoiceno, setInvoiceno] = React.useState();
    const [invalid, setInvalid] = React.useState(false)
    const [response, setResponse] = React.useState();
    const [userData, setUserData] = React.useState()
    const dispatch = useDispatch();
    const [buttonClick,setButtonClick] = React.useState(false)


    React.useEffect(() => {
        AsyncStorage.getItem('user').then((user) => {
            if (user == "" || user == null || user == undefined) {
                //Show no user image
            }
            else {
                setUserData(JSON.parse(user));
            }
        })

    }, [])

    const goNext = (invoice) => {
        setButtonClick(true)

        dispatch(setBarcode())
        let invoice_id = invoice
        const payload = {
            invoice_no: invoice_id?.trim(),
            // user_id: userData?._id,
            // emp_code: userData?.emp_code
        }
        setInvoiceno()
     {invoice_id &&  
         dispatch(checkInvoiceNumber(payload)).then((res) => {    
            // const data = res.payload
            setResponse(res.payload)
            if (res.payload.status) {
                navigation.navigate('UploadDocs', res.payload)
                setButtonClick(false)
            }
            else {
                setInvalid(true)
                setButtonClick(false)
            }
        })}



    }
        return (
        <View style={{ padding: 15, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.invoiceText}>Enter Invoice Number</Text>
            <View style={{ flexDirection: 'row',width:'90%'}}>
               <View style={{width:'100%'}}>
                <TextInput style={{ borderWidth: 1, borderRadius: 5, marginTop: 10, paddingLeft: 5, textAlign: 'center', color:'#000',textTransform:'uppercase'  }}
                    placeholder="Ex: SA/AMPT/1245"
                    placeholderTextColor={'#E0E0E0'}
                    onChangeText={(text) => setInvoiceno(text)}
                    autoCapitalize = {"characters"}                  
                />
                </View>
             <TouchableOpacity onPress={() => goNext(invoiceno)} disabled={buttonClick}>
                <View style={styles.goButton}>
                    
                    <AntDesign name="arrowright" size={30} color={'#fff'} onPress={() => goNext(invoiceno)}/>
                </View>
                </TouchableOpacity>
            </View>

            <BottomSheet
                visible={invalid}
                //setting the visibility state of the bottom shee
                onBackButtonPress={() => setInvalid(!invalid)}
                // //Toggling the visibility state
                onBackdropPress={() => setInvalid(!invalid)}
            //Toggling the visibility state
            >
                {/*Bottom Sheet inner View*/}
                <View style={styles.bottomNavigationView}>
                    <Text style={{ fontWeight: '600', fontSize: 16, color:'#000', textAlign:'center' }}>{response?.message}</Text>
                </View>
                {/* <AddSubTask id={taskId} /> */}
            </BottomSheet>
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
    bottomNavigationView: {
        backgroundColor: '#fff',
        width: '100%',
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        padding:10
    },
});

export default AddInvoice;
