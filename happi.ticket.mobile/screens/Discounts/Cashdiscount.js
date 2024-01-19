import * as React from "react";
import {
    Text, StyleSheet, View, Image, Pressable,Animated,
    ImageBackground, RefreshControl, FlatList, Dimensions, SafeAreaView, TextInput, TouchableOpacity, Modal, StatusBar, Linking, Button, ScrollView, TouchableHighlight, Platform, ActivityIndicator, ToastAndroid,Easing,BackHandler
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CashDiscountHistory from "./CashDiscountHistory";
import DiscountFlow from "./DiscountFlow";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StepIndicator from 'react-native-step-indicator';
import { SelectList, MultipleSelectList } from 'react-native-dropdown-select-list'
import { getStoreList, getMakeList, getModalList, getModalPrice, checkAutorizeDiscount, updateAuthorizeDiscount, updateModalPrice, getcashApprover, createDiscount, verifyPhoneNumber, verifyOtp } from "../../reducers/cashDiscount";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from 'react-native-elements'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AudioRecorderPlayer, {
    AVEncoderAudioQualityIOSType,
    AVEncodingOption,
    AudioEncoderAndroidType,
    AudioSet,
    AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import moment from 'moment/moment';
import { RNS3 } from 'react-native-aws3';
import RNFetchBlob from 'rn-fetch-blob'
import AudioPlayer from "../../components/AudioPlayer"
import ConfettiCannon from 'react-native-confetti-cannon';
import { StackActions } from '@react-navigation/native';


const Tab = createBottomTabNavigator();
const audioRecorderPlayer = new AudioRecorderPlayer();
const dimensions_width = Dimensions.get('window').width;

const Cashdiscount = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [currentPosition, setCurrentPosition] = React.useState(0)
    const [selectedStore, setSelectedStore] = React.useState()
    const [selectedMake, setSelectedMake] = React.useState()
    const [selectedModal, setSelectedModal] = React.useState()
    const [discountAmount, setDiscountAmount] = React.useState()
    const [phoneNumber, setPhoneNumber] = React.useState()
    const [emailAddress, setEmailAddress] = React.useState("")
    const [otpNum, setOtpNum] = React.useState("")
    const [emailVisible, setEmailVisible] = React.useState(false)
    const [verifyNum, setVerifyNum] = React.useState(true)
    const [otpVisible, setOtpVisible] = React.useState(false)
    const [userDetails, setUserDetails] = React.useState()
    const [record, setRecord] = React.useState(false)
    const [recordSecs, setRecordSecs] = React.useState(0);
    const [recordTime, setRecordTime] = React.useState('00:00:00');
    const [audioFile, setAudiofile] = React.useState()
    const [playModalVisible, setPlayModalVisible] = React.useState(false)
    const [selectedCashApprover, setSelectedCashApprover] = React.useState()
    const [comment, setComment] = React.useState()
    const [editButton, setEditButton] = React.useState(false)
    const storeList = useSelector(state => state.cashDiscount.storeList);
    const makeList = useSelector(state => state.cashDiscount.makeList);
    const modalList = useSelector(state => state.cashDiscount.modalList);
    const modalPrice = useSelector(state => state.cashDiscount.modalPrice);
    const authorizeDiscount = useSelector(state => state.cashDiscount.authorizeDiscount);
    const cashApprover = useSelector(state => state.cashDiscount.cashApprover)
    const isLoading = useSelector(state => state.cashDiscount.isLoading)
    const [makeVisible, setMakeVisible] = React.useState(false)
    const [modelVisible, setModelVisible] = React.useState(false)
    const labels = ["Store & Phone Details", "Ask for Discount", "Customer Confirmation", "Request For Approval","Generate Coupon Code"]
    const [discountType,setDiscountType] = React.useState('')
    const [employeeData,setEmployeeData] = React.useState()
    const [falseModal,setFalseModel] = React.useState(false);
    const [disResponse,setDisResponse] = React.useState()
    const customStyles = {
        stepIndicatorSize: 25,
        currentStepIndicatorSize: 30,
        separatorStrokeWidth: 2,
        currentStepStrokeWidth: 3,
        stepStrokeCurrentColor: '#fe7013',
        stepStrokeWidth: 3,
        stepStrokeFinishedColor: '#fe7013',
        stepStrokeUnFinishedColor: '#aaaaaa',
        separatorFinishedColor: '#fe7013',
        separatorUnFinishedColor: '#aaaaaa',
        stepIndicatorFinishedColor: '#fe7013',
        stepIndicatorUnFinishedColor: '#ffffff',
        stepIndicatorCurrentColor: '#ffffff',
        stepIndicatorLabelFontSize: 13,
        currentStepIndicatorLabelFontSize: 13,
        stepIndicatorLabelCurrentColor: '#fe7013',
        stepIndicatorLabelFinishedColor: '#ffffff',
        stepIndicatorLabelUnFinishedColor: '#aaaaaa',
        labelColor: '#999999',
        labelSize: 13,
        currentStepLabelColor: '#fe7013'
    }
    // const tabBarHeight = useBottomTabBarHeight();
    React.useEffect(() => {
        AsyncStorage.getItem('user').then(value => {
            if (value == "" || value == null || value == undefined) {
                // dispatch(updatetoken(value));

                // navigation.navigate('Login1');
            } else {
                // setUserData(JSON.parse(value));
                //  let body = {
                //      user:JSON.parse(value),
                //  }
                AsyncStorage.getItem('employeeData').then(value => {
                    setEmployeeData(value)
                    dispatch(getStoreList(value))

                })
                setUserDetails(JSON.parse(value))
                dispatch(getMakeList())
                dispatch(updateModalPrice())
                dispatch(updateAuthorizeDiscount())
            }
        })
    }, [])
    React.useEffect(() => {
        let getmodalPricePayload = {
            store: selectedStore,
            brand: selectedMake,
            model: selectedModal
        }
        selectedStore && selectedMake && selectedModal && 
        dispatch(getModalPrice(getmodalPricePayload)).then((val)=>{
            setDiscountType(val.payload.discount_type)
        })
    }, [selectedModal])

    const getMake = (make) => {
        let brand = {
            brandName: make
        }
        setSelectedMake(make)
        dispatch(getModalList(brand))
    }
    //getAuthorized

    const getAuthorized = () => {
        let getAuthoziedPricePayload = {
            store: selectedStore,
            brand: selectedMake,
            model: selectedModal,
            discountPrice: discountAmount,
            totalPrice: modalPrice?.data[0]?.ITEM_PRICE,
            discount_type: discountType
        }
        dispatch(checkAutorizeDiscount(getAuthoziedPricePayload)).then((response) => {
            if (response?.payload?.status) {
                setEditButton(true)
                ToastAndroid.show(response?.payload?.message, ToastAndroid.LONG);
            }
        })
    }

    //back to step one
    const BacktoStepOne = () => {
        setCurrentPosition(0)
        dispatch(updateModalPrice())
        dispatch(updateAuthorizeDiscount())
        setDiscountAmount()
        setEditButton(false)
        setSelectedModal()
        setSelectedMake()
        setSelectedMake()
    }
    //BacktoStepTwo
    const BacktoStepTwo = () => {
        setCurrentPosition(1)
        // editDiscountPrice()
    }
    //go To step Four
    const verifyNumber =()=>{
        let payload={
            mobile: phoneNumber
        }
        if (phoneNumber?.length === 10) {
        dispatch(verifyPhoneNumber(payload)).then((res)=>{
            setEmailVisible(true)
            if(res.payload.status== true){
                setOtpVisible(true)
                setVerifyNum(false)
            }
            else{
            ToastAndroid.show('No Otp required', ToastAndroid.LONG);   
            setOtpVisible(false)
            setVerifyNum(false)
            }
        })
    }
    else{
        ToastAndroid.show('Enter Proper Mobile Number', ToastAndroid.LONG);
    }

    }
    const goTostepFour = () => {
        let cashApproverPayload = {
            storeId: selectedStore,
            Approval_Authority: authorizeDiscount?.data
        }
        if (phoneNumber.length === 10) {
          
            let payload ={
                mobile:phoneNumber,
                otp:otpNum
            }
           {otpVisible && dispatch(verifyOtp(payload)).then((res)=>{
                if(res.payload.status){
                    setCurrentPosition(3)
                    dispatch(getcashApprover(cashApproverPayload))
                    ToastAndroid.show('OTP Verified Successfully', ToastAndroid.LONG);
                }
                else{
                    ToastAndroid.show('Invalid OTP', ToastAndroid.LONG);
                }
              
            })}
            if(!otpVisible){
                setCurrentPosition(3)
                dispatch(getcashApprover(cashApproverPayload))
            }
        }
        if (phoneNumber.includes('-') || phoneNumber.includes(',') || phoneNumber.includes('.') || phoneNumber.length != 10) {
            ToastAndroid.show('Enter Proper Mobile Number', ToastAndroid.LONG);
        }
    }

    //BacktoStep three
    const BacktoStepThree = () => {
        setCurrentPosition(2)
        setRecord(!record)
        setSelectedCashApprover()
        // setPhoneNumber()
        // setAudiofile()
    }
    const onStartRecord = async () => {
        setRecord(true)
        // const path = '../../assets/hello.m4a';
        const path = Platform.OS === 'android' ? `${RNFetchBlob.fs.dirs.CacheDir}/response.m4a` : 'response.m4a';
        const audioSet = {
            AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
            AudioSourceAndroid: AudioSourceAndroidType.MIC,
            AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
            AVNumberOfChannelsKeyIOS: 2,
            AVFormatIDKeyIOS: AVEncodingOption.aac,
        };
        const uri = await audioRecorderPlayer.startRecorder(path, audioSet);
        audioRecorderPlayer.addRecordBackListener((e) => {
            setRecordSecs(e.currentPosition);
            setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));

        });
    };
    const onStopRecord = async () => {
        setRecord(!record)
        ToastAndroid.show('Recording Finished', ToastAndroid.LONG);
        try {
            //audioRecorderPlayer.removeRecordBackListener();
            const result = await audioRecorderPlayer.stopRecorder();
            setRecordSecs(0);
            setRecordTime('00:00:00')

            const file = {
                uri: result,
                name: `${result}${moment
                    .utc()
                    .format("YYYY-MM-DD-HH-mm-ss")}.aac`,
                type: 'audio/wav'
            };

            const options = {
                keyPrefix: `happidiscount/${result}${moment
                    .utc()
                    .format("YYYY-MM-DD-HH-mm-ss")}.aac`,
                bucket: "happimobiles",
                accessKey: "AKIASTAEMZYQ3D75TOOZ",
                secretKey: "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",
                region: "ap-south-1",
                // successActionStatus: 201
            }
            RNS3.put(file, options)
                .progress(event => {
                })
                .then(response => {
                    setAudiofile(response.body.postResponse.location)
                    if (response.status !== 201) {
                        console.error(response.body);
                        setRecordError(true)
                        return;
                    }
                    // ... handling the response
                })

        }
        catch (e) {
            console.log(e)
        }
    };

    const hideModal = () => {
        setPlayModalVisible(false)
    };

    const sendRequest = () => {
        let payload = {
            brand: selectedMake, // select brand from step-1
            model: selectedModal, //select brand from step-2
            total_price: modalPrice?.data[0]?.ITEM_PRICE, //when selecting model to get  price
            discount_price: parseInt(discountAmount), //add discount price 
            discount_total_price: modalPrice?.data[0]?.ITEM_PRICE - discountAmount, //need to calculate total_price minus discount_price
            customer_mobile: phoneNumber, // step-3 add customer mobile number
            customer_email: emailAddress, // its optiona
            employee_id: storeList?.employData[0].name, // whose login id
            cash_approver: selectedCashApprover, // when i am selecting  store in first stage in that store i get the store slaes head drop down 
            remarks: comment, // add remarks 
            created_at: new Date(), // created date
            store_id: selectedStore, // select store in firts stage value (store_id)
            // rule: authorizeDiscount?.rule,
            Approval_Authority: authorizeDiscount?.data?.Approval_Authority,
            created_by: JSON.parse(employeeData)._id,
            is_used: false,
            status: "awaiting",
            audio_file: audioFile,
            discount_type: discountType,
            apx_code: modalPrice?.data[0]?.ITEM_CODE 
        }
        if (!selectedCashApprover) {
            ToastAndroid.show('Please select Approver', ToastAndroid.LONG);
        } else {
            dispatch(createDiscount(payload)).then((response) => {
                setDisResponse(response.payload)
                if(response.payload.status){
                 setCurrentPosition(4)
                }
                else{
                    ToastAndroid.show(response.payload.message, ToastAndroid.LONG);  
                    // setFalseModel(true)
                }
                // ToastAndroid.show(response.payload.message, ToastAndroid.LONG);
                // navigation.navigate('DiscountDashboard')
            })
        }
    }

    
    const redirect =()=>{
        setTimeout(()=>{
            navigation.navigate('DiscountDashboard')
        },8000)
    }

    const editDiscountPrice = () => {
        setEditButton(false)
        dispatch(updateAuthorizeDiscount())
    }
    const setToPositionOne = () => {
        if (modalPrice?.status == true) {
            setCurrentPosition(1)
        } else {
            ToastAndroid.show(modalPrice?.message, ToastAndroid.LONG);
        }
    }

  let spinValue = new Animated.Value(0);

// First set up animation 
Animated.timing(
    spinValue,
  {
    toValue: 1,
    duration: 1000,
    easing: Easing.cubic, // Easing is an additional import from react-native
    useNativeDriver: true  // To make use of native driver for performance
  }
).start()

// Next, interpolate beginning and end values (in this case 0 and 1)
const spin = spinValue.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '360deg']
})
    return (
        <View >
            <View style={{ padding: 15 }}>
                <StepIndicator
                    customStyles={customStyles}
                    currentPosition={currentPosition}
                    labels={labels}
                    stepCount="5"

                />
            </View>
            <ScrollView>
            {currentPosition == 0 && storeList?.data && <View style={{ padding: 25, paddingBottom: 0 }} >
                <SelectList
                    setSelected={(val) => setSelectedStore(val)}
                    data={storeList?.data}
                    save="key"
                    placeholder='Select Store'
                    search={true}
                    boxStyles={styles.textInput}
                    dropdownStyles={{
                        width: '100%', borderWidth: 1,
                        borderColor: '#c8c8c8', backgroundColor: '#fff'
                    }}
                    dropdownTextStyles={{color:'#000', textTransform:'capitalize'}}
                    
                    inputStyles={{color:'#000', left: -5, fontSize: 14 }}
                    onSelect={() => setMakeVisible(true)}
                    searchPlaceholder=""
                
                />
                {makeVisible && <View style={{ paddingTop: 10 }}>
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
                        placeholder='Select Make'
                        inputStyles={{color:'#000', left: -5, fontSize: 14 }}
                        onSelect={() => setModelVisible(true)}
                        searchPlaceholder=""
                        placeholderTextColor={'#000'}
                    />
                </View>}
                {modalList?.length > 0 && modelVisible &&
                    <View style={{ paddingTop: 10 }}>
                        <SelectList
                            setSelected={(val) => setSelectedModal(val)}
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
                            onSelect={() => console.log('selected')}
                            searchPlaceholder=""
                            
                        />
                    </View>
                }
                {modalPrice?.status == false && <Card containerStyle={{ marginLeft: 0, marginTop: 30, borderRadius: 10, width: dimensions_width - 50 }}>
                    <Card.Title style={{ color: "red" }}>Error : {modalPrice.message}</Card.Title>

                </Card>}
                {modalPrice?.status == true && <Card containerStyle={{ marginLeft: 0, marginTop: 30, borderRadius: 10, width: dimensions_width - 50 }}>
                    <Card.Title style={{ color: "brown" }}>Current Price of The Product</Card.Title>
                    <Card.Title style={{ color: "brown" }}>Name - {modalPrice?.data[0]?.ITEM_NAME}</Card.Title>
                    <Card.Title style={{ color: "brown" }}>Price - {modalPrice?.data[0]?.ITEM_PRICE}</Card.Title>

                </Card>}

                {selectedStore && selectedMake && selectedModal && <View style={{ justifyContent: 'center', marginTop: 10, marginBottom: 30, alignItems: 'flex-end', right: 5, }}>
                    <TouchableHighlight
                        style={styles.logout}
                        onPress={() => setToPositionOne()}
                        disabled={isLoading}
                    >
                        <View
                            style={{
                                ...styles.button
                                // backgroundColor: isLoading ? "#4caf50" : "#8bc34a",
                            }}
                        >
                            {isLoading && <ActivityIndicator size="small" color="#fff" />}
                            <View  >
                                <Text style={{ fontWeight: '700', color: '#fff' }}>Next</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                </View>}
            </View>}

            {currentPosition == 1 && <View>
                <Text style={{color:"#000", paddingLeft: 25 }}>How much discount are you looking for:</Text>
                <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'space-evenly' }}>
                    <Text style={{ color:"#000",textAlignVertical: 'center', top: 5, fontWeight: '600', textTransform:'capitalize' }}>Enter {discountType}</Text>
                    <TextInput style={styles.searchInput} keyboardType='numeric' editable={!editButton} onChangeText={nextValue => { setDiscountAmount(nextValue) }} />
                    {!editButton && <TouchableHighlight
                        style={[styles.logout]}
                        onPress={() => getAuthorized()}
                    >
                        <View style={{flexDirection:'row'}}>
                        {isLoading && <ActivityIndicator size="small" color="#fff" />}
                            <Text style={{ fontWeight: '700', color: '#fff' }}>Submit</Text>
                        </View>
                    </TouchableHighlight>}
                    {editButton && <TouchableHighlight
                        style={styles.logout}
                        onPress={() => editDiscountPrice()}
                    >
                        <View >
                            <Text style={{ fontWeight: '700', color: '#fff' }}>Edit</Text>
                        </View>
                    </TouchableHighlight>}
                </View>
                {authorizeDiscount?.status == false && <View style={{ marginLeft: 20, marginTop: 10, color: "red" }}><Text style={{ color: "red" }}>{authorizeDiscount?.message}</Text></View>}

                <View style={{ marginTop: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 25, paddingRight: 25 }}>
                        <Text style={{color:"#000", fontWeight: '500' }}>Happi Price</Text>
                        <Text style={{ color:"#000",fontWeight: '700' }}>₹ {modalPrice?.data[0]?.ITEM_PRICE.toLocaleString('en-IN')}</Text>
                    </View>
                    <View style={{color:"#000", flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 25, paddingRight: 25 }}>
                        <Text style={{color:"#000", fontWeight: '500' }}>Discount Price</Text>
                        {authorizeDiscount?.status && <Text style={{ color:"#000", fontWeight: '700' }}>{discountType == 'flat'? '₹' : ''} {parseInt(discountAmount).toLocaleString('en-IN')} {discountType == 'flat'? '' : '%'} </Text>}
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 25, paddingRight: 25 }}>
                        <Text style={{ color:"#000", fontWeight: '500' }}>Total Price After Discount</Text>
                        {authorizeDiscount?.status && <Text style={{ color:"#000", fontWeight: '700' }}>₹ {discountType == 'flat'? authorizeDiscount?.finalPrice.toLocaleString('en-IN') : authorizeDiscount?.discountPercentage.toLocaleString('en-IN')}</Text>}
                    </View>
                </View>
                {authorizeDiscount?.status && <Text style={{color:"#000",  padding: 25 }}>{authorizeDiscount?.message}</Text>}

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', left: 20 }}>

                    <View style={{ marginTop: 10, marginBottom: 30, width: '60%' }}>
                        <TouchableHighlight
                            style={styles.next}
                            onPress={() => BacktoStepOne()}
                        >
                            <View >
                                <Text style={{ fontWeight: '700', color: '#fff' }}>Back</Text>
                            </View>
                        </TouchableHighlight>
                    </View>

                    {authorizeDiscount?.status && <View style={{ marginTop: 10, marginBottom: 30, width: '60%' }}>
                        <TouchableHighlight
                            style={styles.next}
                            onPress={() => setCurrentPosition(2)}
                        >
                            <View >
                                <Text style={{ fontWeight: '700', color: '#fff' }}>Next</Text>
                            </View>
                        </TouchableHighlight>
                    </View>}
                </View>
            </View>}
            {currentPosition == 2 && <View>
                <Text style={{color:"#000", left: 28, marginTop: 20 }}>Customer Details</Text>
                <TextInput style={styles.phoneNumber} placeholderTextColor={'#000'} keyboardType='numeric' inputMode='tel' placeholder='Mobile number' value = {phoneNumber} onChangeText={nextValue => { setPhoneNumber(nextValue) }} />
              
              {otpVisible &&  <TextInput style={styles.phoneNumber}  placeholderTextColor={'#000'} placeholder='Enter OTP' value={otpNum} onChangeText={nextValue => { setOtpNum(nextValue) }} />}  
              {emailVisible &&  <TextInput style={styles.phoneNumber}  placeholderTextColor={'#000'} placeholder='Email Address (Optional)' value={emailAddress} onChangeText={nextValue => { setEmailAddress(nextValue) }} />}  
              {/* {emailVisible && <View style={{ justifyContent: "center", marginTop: 20, left: "40%" }}>
                    <TouchableHighlight
                        style={styles.logout}
                        onPress={() => goTostepFour()}
                    >
                        <View >
                            <Text style={{ fontWeight: '700', color: '#fff' }}>Submit</Text>
                        </View>
                    </TouchableHighlight>
                </View>} */}

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', left: 28, }}>

                    <View style={{ marginTop: 10, marginBottom: 30, width: '60%' }}>
                        <TouchableHighlight
                            style={styles.next}
                            onPress={() => BacktoStepTwo()}
                        >
                            <View >
                                <Text style={{ fontWeight: '700', color: '#fff' }}>Back</Text>
                            </View>
                        </TouchableHighlight>
                    </View>

                    { emailVisible && <View style={{ marginTop: 10, marginBottom: 30, width: '60%' }}>
                        <TouchableHighlight
                            style={styles.next}
                            onPress={() => goTostepFour()}
                        >
                           <View>
                                <Text style={{ fontWeight: '700', color: '#fff' }}>Submit</Text>
                            </View>                           
                        </TouchableHighlight>
                    </View>}
                    {verifyNum && phoneNumber?.length === 10 &&
                           <View style={{ marginTop: 10, marginBottom: 30, width: '60%' }}>
                           <TouchableHighlight
                               style={styles.next}
                               onPress={() => verifyNumber()}>
                              <View style={{flexDirection:'row'}}>
                                 {isLoading && <ActivityIndicator size="small" color="#fff" />}
                                   <Text style={{ fontWeight: '700', color: '#fff' }}>Verify</Text>
                               </View>                        
                           </TouchableHighlight>
                       </View>}
                </View>

            </View>}

            {currentPosition == 3 && <View>
                <ScrollView>
                <Text style={{ color:"#000", left: 25, marginTop: 20 }}>Employee Id</Text>
                <TextInput style={styles.phoneNumber} editable={false} value={storeList?.employData[0]?.emp_id} />
                <Text style={{ left: 25, marginTop: 10, fontWeight: '400', color: 'rgb(251, 144, 19)', fontSize: 15 }}>{storeList?.employData[0].name}</Text>
                <Text style={{ color:"#000",left: 25, marginTop: 10 }}>Select Approver</Text>
                <View style={{ left: 25, marginTop: 10, width: "88%" }}>
                    <SelectList
                        setSelected={(val) => setSelectedCashApprover(val)}
                        data={cashApprover}
                        save="key"
                        search={false}
                        boxStyles={styles.textInput}
                        dropdownStyles={{
                            width: '100%', borderWidth: 1,
                            borderColor: '#c8c8c8', backgroundColor: '#fff'
                        }}
                        dropdownTextStyles={{color:'#000', textTransform:'capitalize'}}
                        placeholder='Select'
                        inputStyles={{color:"#000", left: -5, top: 2 }}
                        onSelect={() => console.log('selected')}
                    />
                </View>
                <Text style={{color:"#000", left: 25, marginTop: 10 }}>Notes</Text>
                <TextInput style={styles.commentsInput} placeholder="Comments" placeholderTextColor={'#000'} multiline={true} onChangeText={nextValue => { setComment(nextValue) }} />
                {!record && <Text style={{ marginTop: 10, color: 'rgb(251, 144, 19)', fontSize: 18, textAlign: 'center' }}>Tap the mic to start recording</Text>}
                {record && <Text style={{ textAlign: 'center', marginTop: 10, color: 'rgb(251, 144, 19)', fontSize: 18 }}>Recording..</Text>}
                <View style={{ flexDirection: 'row', justifyContent: "space-evenly" }}>
                    {!record && <TouchableHighlight
                        style={{
                            borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                            width: Dimensions.get('window').width * 0.15,
                            height: Dimensions.get('window').width * 0.15,
                            backgroundColor: 'rgb(251, 144, 19)',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 10
                        }}
                        underlayColor='#ccc'
                        onPress={() => onStartRecord()}
                    >

                        <MaterialCommunityIcons name="microphone" size={40} style={{ color: '#fff' }} />
                    </TouchableHighlight>}
                    {!record && audioFile && <TouchableHighlight
                        style={{
                            borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                            width: Dimensions.get('window').width * 0.15,
                            height: Dimensions.get('window').width * 0.15,
                            backgroundColor: 'rgb(251, 144, 19)',
                            justifyContent: 'center',
                            alignItems: 'center',
                            left: "20%",
                            marginTop: 10
                        }}
                        underlayColor='#ccc'
                        onPress={() => setPlayModalVisible(true)}
                    >
                        <Text>
                            <MaterialCommunityIcons name="play" size={40} style={{ color: '#fff' }} />
                        </Text>

                    </TouchableHighlight>}
                </View>

                {record && <TouchableHighlight
                    style={{
                        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                        width: Dimensions.get('window').width * 0.15,
                        height: Dimensions.get('window').width * 0.15,
                        backgroundColor: 'rgb(251, 144, 19)',
                        justifyContent: 'center',
                        alignItems: 'center',
                        left: "42%",
                        marginTop: 10
                    }}
                    underlayColor='#ccc'
                    onPress={() => onStopRecord()}
                >
                    <Text>
                        <MaterialCommunityIcons name="stop" size={40} style={{ color: '#fff', }} />
                    </Text>

                </TouchableHighlight>}

                <Modal visible={falseModal} animationType={"slide"} dismiss={hideModal}>
                    <View style={styles.modalBackGround}>
                        <View style={[styles.modalContainer]}>

                            <View style={{ alignItems: 'center', backgroundColor: '#fff', justifyContent: 'center' }}>
                                <View style={styles.header}>

                                    <TouchableOpacity onPress={() => setFalseModel(false)}>
                                        <Image
                                            source={require('../../assets/x.png')}
                                            style={{ height: 20, width: 20 }} />
                                    </TouchableOpacity>
                                </View>
                                <Text>
                                    {disResponse?.message}
                                </Text>

                                <TouchableHighlight
                            style={styles.next}
                            onPress={() => setCurrentPosition(0)}
                            >
                            <View >
                                <Text style={{ fontWeight: '700', color: '#fff' }}>Go Back</Text>
                            </View>
                        </TouchableHighlight>
                              
                            </View>
                        </View>
                    </View>
                </Modal>


                <View style={{ flexDirection: 'row', left: 25, justifyContent: "space-between", marginTop: 10 }}>
                    <View style={{ marginTop: 10, marginBottom: 30, width: '60%' }}>
                        <TouchableHighlight
                            style={styles.next}
                            onPress={() => BacktoStepThree()}
                        >
                            <View >
                                <Text style={{ fontWeight: '700', color: '#fff' }}>Back</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={{ marginTop: 10, marginBottom: 230, width: '70%', paddingRight: 20, paddingBottom:30, right:20 }}>
                        <TouchableHighlight
                            style={styles.next}
                            onPress={() => sendRequest()}
                            disabled={isLoading }
                        >
                            
                            <View style = {{display:"flex",flexDirection:'row'}} >
                        {isLoading && <ActivityIndicator size="small" color="#fff" />}
                                <Text style={{ fontWeight: '700', color: '#fff' }}>Send Request</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
                </ScrollView>
            </View>}
            {currentPosition == 4 && 
            <View style={{ height:500, backgroundColor:'#fff', paddingTop:100}} >
                <ConfettiCannon count={200} origin={{ x: -10, y: 100 }} autoStart={true} explosionSpeed={50} fadeOut={true} />
                <View style={{justifyContent:'center', alignItems:'center'}}>

                <Animated.Image
                style={{transform: [{rotate: spin}], height:150, width:150 }}
                source={{uri: 'https://media.tenor.com/qoIGqkJ345gAAAAC/tick.gif'}} />
  
                <Text style={{ color:'green', fontSize:18}}>Coupon Code Generated Successfully</Text>
                </View>
                {redirect()}
                </View>}
                </ScrollView>
                <Modal transparent visible={playModalVisible} animationType={"slide"} dismiss={hideModal}>
                    <View style={styles.modalBackGround}>
                        <View style={[styles.modalContainer]}>

                            <View style={{ alignItems: 'center', backgroundColor: '#fff', justifyContent: 'center' }}>
                                <View style={styles.header}>

                                    <TouchableOpacity onPress={() => setPlayModalVisible(false)}>
                                        <Image
                                            source={require('../../assets/x.png')}
                                            style={{ height: 20, width: 20 }} />
                                    </TouchableOpacity>
                                </View>
                                <AudioPlayer path={audioFile} />
                            </View>
                        </View>
                    </View>
                </Modal>
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
            button: {top: 20, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', height: 60, borderWidth: 1, borderRadius: 10, marginTop: 30, borderColor: 'orange', height: 150 },
            tabBar: {
                height: 50,
            // position: 'absolute',
            // // bottom: 16,
            // right: 6,
            // left: 6,
            borderRadius: 0,
            backgroundColor: '#292D32',
            borderWidth: 0,
            borderTopWidth: 0
    },
            logout: {width: '25%', height: 40, backgroundColor: 'rgb(251, 144, 19)', justifyContent: 'center', alignItems: 'center', top: 5, borderRadius: 5 },
            next: {width: '50%', height: 40, backgroundColor: 'rgb(251, 144, 19)', justifyContent: 'center', alignItems: 'center', top: 5, borderRadius: 5 },
            searchInput: {
                width: '30%',
            height: 40,
            borderRadius: 5,
            borderWidth: 0.5,
            borderColor: '#8e8e8e',
            alignSelf: 'center',
            marginTop: 10,
            paddingLeft: 15,
            color:"#000"
    },
            phoneNumber: {
                width: '87%',
            height: 45,
            borderRadius: 10,
            borderWidth: 0.5,
            borderColor: '#8e8e8e',
            alignSelf: 'center',
            marginTop: 10,
            paddingLeft: 15,
            color:"#000"
    },
            commentsInput: {
                width: '88%',
            height: 100,
            borderRadius: 10,
            borderWidth: 0.5,
            borderColor: '#8e8e8e',
            alignSelf: 'center',
            marginTop: 10,
            paddingLeft: 15,
            textAlignVertical:'top',
            color:"#000"
    },      
            modalBackGround: {
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',

    },
            modalContainer: {
                width: '90%',
            height: 150,
            backgroundColor: 'white',
            paddingHorizontal: 20,
            paddingVertical: 30,
            borderRadius: 10,
            elevation: 20,
    },
            header: {
                width: '100%',
            height: 40,
            alignItems: 'flex-end',
            justifyContent: 'center',
            bottom: 20
    },
            textInput: {
                padding: 10,
    },
            button: {
                display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: 50,
            height: 70,
        // borderWidth: 1,
        // borderColor: "#666",
        // borderRadius: 10,
    },

});

            export default Cashdiscount;
