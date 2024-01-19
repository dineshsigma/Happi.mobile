import * as React from "react";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Image, StyleSheet, View, Text, TextInput,Button,  Pressable,ScrollView,BackHandler,Alert,Dimensions } from "react-native";
import { useSelector,useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { updatephone,verify,login, discountVerifyOtp } from '../reducers/auth';
import Spinner from 'react-native-loading-spinner-overlay';
import {Keyboard,ToastAndroid} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {StackActions} from '@react-navigation/native';
 
const dimensions_width = Dimensions.get('window').width


const DiscountLoginOtp = ({route}) => {
  const navigation = useNavigation();
  const phoneNum = route.params
//  const [loading, setLoading]=React.useState(false);
  const phone = useSelector((state) => state.auth.phone);
  const loading = useSelector((state) => state.auth.isLoading);
  const otp_send_resp = useSelector((state) => state.auth.otp_send_resp);
  const errorMessage = useSelector((state) => state.auth.errorMessage);
  const dispatch = useDispatch();
  const [otp, setOtp]=React.useState('');
  const [passwordVisible, setPasswordVisible] = React.useState(false)
  const token = useSelector(state => state.auth.discountToken);

    React.useEffect(()=>{
    const backAction = () => {
        navigation.dispatch(StackActions.pop(2));
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
  },[token])

  function showToast(text) {
    ToastAndroid.show(text, ToastAndroid.SHORT);
  }

  return (
    <ScrollView style={{flex:1,backgroundColor: 'rgb(251, 144, 19)',}} keyboardShouldPersistTaps='always'>    
    <View style={styles.loginView}>
    <Spinner
          //visibility of Overlay Loading Spinner
          visible={loading}
          //Text with the Spinner
          textContent={'Loading...'}

          //Text style of the Spinner Text
          textStyle={styles.spinnerTextStyle}
        />
      <View style={[styles.toTheStarsPana1, styles.mt10]}>
      </View>
      <View style={[styles.toTheStarsPana2, styles.mt10]} />
      <Image
        style={[styles.icon, styles.mt10]}
        resizeMode="cover"
        source={require("../assets/6543-12.png")}
      />
       
      <View style={[styles.frameView10, styles.mt10]}>
        <Image
          style={styles.analyticsLineGraphSvgrepoCIcon}
          resizeMode="contain"
          source={require("../assets/logo.webp")}
        />
        <View style={[styles.frameView1, styles.mt10,{paddingBottom:0}]}>
          <Text style={styles.signInToYourAccount}>
          Enter OTP to continue
             </Text>
        </View>
        <View style={[styles.frameView2, styles.mt10]} />
          <View style={styles.frameView5}>           
           <View style={[styles.inputLight, {top: 20}]}>
              <Image
                style={styles.iconsDark}
                resizeMode="cover"
                source={require('../assets/icons--dark2.png')}
              />
              <MaterialCommunityIcons
                name={'lock'}
                size={24}
                color="orange"
                style={{left: 10}}
                onPress={() => setPasswordVisible(!passwordVisible)}
              />

              <TextInput
                maxLength={6}
                secureTextEntry={!passwordVisible ? true : false}
                onChangeText={text => {
                  setOtp(text) 
                }}
                style={styles.input}
                placeholder="Enter OTP"
                placeholderTextColor="rgb(251, 144, 19)"></TextInput>
              <MaterialCommunityIcons
                name={!passwordVisible ? 'eye-off-outline' : 'eye-outline'}
                size={24}
                color="orange"
                style={{left: 0, marginLeft:'auto'}}
                onPress={() => setPasswordVisible(!passwordVisible)}
              />
            </View>
           
          </View>
          <View style={[styles.frameView7, styles.mt48,{width:dimensions_width-30}]}>
           
             <Pressable  style={[styles.buttonLight1,{}]} onPress={()=>{
                   if (otp.trim() != '') {
                    dispatch(
                      discountVerifyOtp({
                        mobile:phoneNum,
                        otp:otp,
                      }),
                    ).then(resp => {
                      if (resp.payload.status) {
                        showToast(resp.payload.message);
                        navigation.navigate('DiscountDashboard')

                      } else {
                        showToast(resp.payload.message);
                      }
                    });
                  } else {
                    showToast('Invalid Employee Id');
                  }
          }}>
            <View>
              <Text style={styles.nextText}>Login</Text>
            </View>
          </Pressable>
          </View>
                <Text style={[styles.dangertext, styles.mt10]} >{errorMessage}</Text>
             <View style={{flexDirection:'row', marginTop:20}}>
                 </View>
        <Text style={[styles.text, styles.mt10]}>{` `}</Text>
      </View>
      
    </View>
     </ScrollView>
  );
};

const styles = StyleSheet.create({
  mt5: {
    marginTop: 5,
  },
  ml15: {
    marginLeft: 15,
  },
  ml8: {
    marginLeft: 8,
  },
  ml16: {
    marginLeft: 16,
  },
  mt16: {
    marginTop: 16,
  },
  ml20: {
    marginLeft: 20,
  },
  mt20: {
    marginTop: 20,
  },
  mt48: {
    marginTop: 48,
  },
  mt10: {
    marginTop: 10,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 0,
    padding: 10,
    color:'rgb(251, 144, 19)',
    width:'100%'
    },
  worldMapIcon: {
    position: "absolute",
    height: "81.84%",
    width: "100%",
    top: "18.16%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    maxWidth: "100%",
    overflow: "hidden",
    maxHeight: "100%",
    zIndex: 0,
  },
  freepikStarsInject1Icon: {
    position: "relative",
    width: 335.53,
    height: 244.72,
    flexShrink: 0,
  },
  toTheStarsPana1: {
    flexDirection: "column",
    paddingHorizontal: 17,
    paddingVertical: 0,
    boxSizing: "border-box",
    alignItems: "center",
    justifyContent: "flex-start",
    display: "none",
    zIndex: 1,
  },
  toTheStarsPana2: {
    position: "relative",
    width: 375,
    height: 50,
    flexShrink: 0,
    overflow: "hidden",
    zIndex: 2,
  },
  icon: {
    position: "absolute",
    // top: 153,
    left: 39,
    width: 313,
    height: 179,
    flexShrink: 0,
    overflow: "hidden",
    display: "none",
    zIndex: 3,
  },
  analyticsLineGraphSvgrepoCIcon: {
    position: "relative",
    width: 108.55,
    height: 108.55,
    flexShrink: 0,
    overflow: "hidden",
  },
  frameView: {
    alignSelf: "stretch",
    height: 30,
    flexShrink: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  signInToYourAccount: {
    position: "relative",
    fontSize: 18,
    lineHeight: 44,
    fontWeight: "500",
    fontFamily: Platform.OS == 'android'? "Roboto" : null,
    color: "#fff",
    textAlign: "center",
  },
  loginWithYourEmailAddress: {
    position: "relative",
    fontSize: 14,
    lineHeight: 16,
    fontFamily: Platform.OS == 'android'? "Roboto" : null,
    color: "#fff",
    textAlign: "center",
  },
  frameView1: {
    alignSelf: "stretch",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  frameView2: {
    alignSelf: "stretch",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  iconsDark: {
    position: "relative",
    width: 24,
    height: 24,
    flexShrink: 0,
    display: "none",
  },
  iconMobileAlt: {
    position: "relative",
    width: 16.75,
    height: 22,
    flexShrink: 0,
  },
  enterMobileNo: {
    flex: 1,
    position: "relative",
    fontSize: 14,
    lineHeight: 16,
    fontFamily: Platform.OS == 'android'? "Roboto" : null,
    color: "#87898e",
    textAlign: "left",
  },
  inputLight: {
    alignSelf: "stretch",
    borderRadius: 12,
    backgroundColor: "#FFF",
    borderStyle: "solid",
    borderColor: "#dfdfe6",
    borderWidth: 1,
    height: 56,
    flexShrink: 0,
    flexDirection: "row",
    padding: 16,
    boxSizing: "border-box",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  iconsLight: {
    position: "relative",
    width: 24,
    height: 24,
    flexShrink: 0,
  },
  enterYourPassword: {
    flex: 1,
    position: "relative",
    fontSize: 14,
    lineHeight: 16,
    fontFamily: Platform.OS == 'android'? "Roboto" : null,
    color: "#87898e",
    textAlign: "left",
  },
  iconsDark1: {
    position: "relative",
    width: 24,
    height: 24,
    flexShrink: 0,
  },
  inputLight1: {
    alignSelf: "stretch",
    borderRadius: 12,
    backgroundColor: "#fcfcfd",
    borderStyle: "solid",
    borderColor: "#dfdfe6",
    borderWidth: 1,
    height: 56,
    flexShrink: 0,
    flexDirection: "row",
    padding: 16,
    boxSizing: "border-box",
    alignItems: "center",
    justifyContent: "flex-start",
    display: "none",
  },
  checkBoxDeactive: {
    position: "absolute",
    height: "100%",
    width: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    borderRadius: 3,
    backgroundColor: "#fcfcfd",
    borderStyle: "solid",
    borderColor: "#87898e",
    borderWidth: 1,
  },
  checkboxView: {
    position: "relative",
    width: 16,
    height: 16,
    flexShrink: 0,
  },
  rememberMeText: {
    position: "relative",
    fontSize: 14,
    lineHeight: 16,
    fontFamily: Platform.OS == 'android'? "Roboto" : null,
    color: "#87898e",
    textAlign: "left",
  },
  checkboxLight: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  forgetYourPassword: {
    position: "relative",
    fontSize: 14,
    lineHeight: 16,
    fontFamily: Platform.OS == 'android'? "Roboto" : null,
    color: "#ff72a4",
    textAlign: "left",
  },
  buttonLight: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  frameView3: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    display: "none",
  },
  frameView4: {
    alignSelf: "stretch",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    display: "none",
  },
  frameView5: {
    alignSelf: "stretch",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  nextText: {
    position: "relative",
    fontSize: 16,
    letterSpacing: 8,
    lineHeight: 16,
    textTransform: "uppercase",
    fontWeight: "600",
    fontFamily: Platform.OS == 'android'? "Roboto" : null,
    color: "rgb(251, 144, 19)",
    textAlign: "left",
  },
  iconArrowBack: {
    position: "relative",
    width: 16,
    height: 13.39,
    flexShrink: 0,
  },
  buttonLight1: {
    alignSelf: "stretch",
    borderRadius: 20,
    backgroundColor: "#fff",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 20,
    boxSizing: "border-box",
    alignItems: "center",
    justifyContent: "center",
  },
  createNewAccount: {
    position: "relative",
    fontSize: 14,
    lineHeight: 16,
    fontFamily: Platform.OS == 'android'? "Roboto" : null,
    color: "#3772ff",
    textAlign: "left",
  },
  lineView: {
    position: "relative",
    borderStyle: "solid",
    borderColor: "#3772ff",
    borderRightWidth: 0.5,
    width: 0.5,
    height: 14.5,
    flexShrink: 0,
  },
  changeURLText: {
    position: "relative",
    fontSize: 14,
    lineHeight: 16,
    fontFamily: Platform.OS == 'android'? "Roboto" : null,
    color: "#3772ff",
    textAlign: "left",
  },
  frameView6: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonLight2: {
    alignSelf: "stretch",
    borderRadius: 50,
    backgroundColor: "#fff",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 20,
    boxSizing: "border-box",
    alignItems: "center",
    justifyContent: "center",
    display: "none",
  },
  frameView7: {
    alignSelf: "stretch",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingTop:0,
    right:25
    // paddingHorizontal:1,
  },
  frameView8: {
    alignSelf: "stretch",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  enterYourMobileNumber: {
    alignSelf: "stretch",
    position: "relative",
    fontSize: 18,
    fontWeight: "500",
    fontFamily: Platform.OS == 'android'? "Roboto" : null,
    color: "rgba(255, 255, 255, 0.75)",
    textAlign: "left",
  },
  pleaseConfirmYour: {
    marginBlockStart: 0,
    marginBlockEnd: 0,
  },
  enterYourMobile: {
    margin: 0,
  },
  pleaseConfirmYourCountryCo: {
    alignSelf: "stretch",
    position: "relative",
    fontSize: 14,
    fontWeight: "500",
    fontFamily: Platform.OS == 'android'? "Roboto" : null,
    color: "rgba(255, 255, 255, 0.5)",
    textAlign: "left",
  },
  frameView9: {
    alignSelf: "stretch",
    flexDirection: "column",
    padding: 10,
    boxSizing: "border-box",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    display: "none",
  },
  text: {
    alignSelf: "stretch",
    position: "relative",
    fontSize: 10,
    letterSpacing: 8,
    textTransform: "uppercase",
    fontWeight: "600",
    fontFamily: Platform.OS == 'android'? "Poppins" : null,
    color: "#fff",
    textAlign: "center",
    height: 30,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: {
      width: 0,
      height: 0.7971894145011902,
    },
    textShadowRadius: 1.59,
  },
  dangertext: {
    alignSelf: "stretch",
    position: "relative",
    fontSize: 15,
   
    fontWeight: "600",
    fontFamily: Platform.OS == 'android'? "Poppins" : null,
    color: "red",
    textAlign: "center",
    height: 30,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: {
      width: 0,
      height: 0.7971894145011902,
    },
  },  
  cyechampText: {
    textTransform: "uppercase",
  },
  cyechampAllRightsReserved: {
    position: "relative",
    fontSize: 10,
    fontFamily: Platform.OS == 'android'? "Poppins" : null,
    color: "#fff",
    textAlign: "left",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: {
      width: 0,
      height: 0.7971894145011902,
    },
    textShadowRadius: 1.59,
  },
  frameView10: {
    alignSelf: "stretch",
    flexDirection: "column",
    padding: 10,
    boxSizing: "border-box",
    alignItems: "center",
    justifyContent: "flex-start",
    zIndex: 4,
    bottom:40
  },
  loginView: {
    position: "relative",
    backgroundColor: 'rgb(251, 144, 19)',
    flex: 1,
    width: "100%",
    // height: 1000,
    overflow: "hidden",
    flexDirection: "column",
    paddingHorizontal: 30,
    // paddingBottom: 100,
    boxSizing: "border-box",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});

export default DiscountLoginOtp;
