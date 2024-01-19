import * as React from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,Button,ScrollView, Dimensions
} from "react-native";


import { useSelector,useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { updatephone,verify } from '../reducers/auth';
import Spinner from 'react-native-loading-spinner-overlay';
import {Keyboard,ToastAndroid} from 'react-native';
//import { color } from "react-native-reanimated";
const dimensions_width = Dimensions.get('window').width


const Login = () => {
  const navigation = useNavigation();
    const [otp, setOtp]=React.useState('');
    
    const phone = useSelector((state) => state.auth.phone);
    const loading = useSelector((state) => state.auth.isLoading);
    const errorMessage = useSelector((state) => state.auth.errorMessage);
    const dispatch = useDispatch();
  
    function showToast(text) {
      ToastAndroid.show(text, ToastAndroid.SHORT);
    }
  return (
 
    <ScrollView  contentContainerStyle={styles.loginView}
    keyboardShouldPersistTaps='handled'>
      <Image
        style={styles.worldMapIcon}
        resizeMode="cover"
        source={require("../assets/world-map.png")}
      />
      <View style={[styles.frameView4, styles.mt10]}>
        <Image
          style={styles.analyticsLineGraphSvgrepoCIcon}
          resizeMode="center"
          source={require("../assets/logo.webp")}
        />
        <View style={[styles.frameView, styles.mt10]} />
        <View style={[styles.frameView1, styles.mt10]}>
          <Text style={styles.verificationCodeText}>Verification Code</Text>
          <Text style={[styles.aVerficationCodeHasBeenSe, styles.mt5]}>
            A verfication code has been sent to {'\n'} +91 {phone}
          </Text>
        </View>
        <View style={[styles.frameView2, styles.mt10]} />
       
        <View style={[styles.frameView3, styles.mt10,{width:dimensions_width ,right:40}]}>
          <Pressable style={[styles.framePressable]}>            
          </Pressable>
          <Pressable style={[styles.framePressable1, styles.mt48]} onPress={()=>{
            //  navigation.navigate("AppStackNavigator")
             // Keyboard.dismiss
             if(otp.trim()!=""&&otp.length==6)
             {
              dispatch(verify({
                "phone": phone,
                "password": otp
              })).then((resp)=>{
                if(resp.payload.status)
                {
                 navigation.navigate("AppStackNavigator")
                }else{
                 showToast(resp.payload.message);
                }
              })
             // navigation.navigate("Home")
            }else{
              showToast('Invalid OTP');
            }
          }}>
            <View style={styles.buttonLight}>
              <Text style={styles.loginText}>Login</Text>
             
            </View>
          </Pressable>
        </View>
        <Text style={[styles.text, styles.mt10]}>{` `}</Text>
        <Text style={[styles.cyechampAllRightsReserved, styles.mt10]}>
          {`© 2023 `}
          <Text style={styles.cyechampText}>Happi.</Text> All Rights
          Reserved.
        </Text>
      </View>
    </ScrollView>
  
  );
};

const styles = StyleSheet.create({
  mt5: {
    marginTop: 5,
  },
  ml16: {
    marginLeft: 16,
  },
  mt48: {
    marginTop: 48,
  },
  mt10: {
    marginTop: 10,
  },
  worldMapIcon: {
    position: "absolute",
    height: "81.84%",
    width: "100%",
    top: "18.16%",
    right: "0%",
    bottom: "0%",
    left: "10%",
    maxWidth: "100%",
    overflow: "hidden",
    maxHeight: "100%",
    zIndex: 0,
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
  verificationCodeText: {
    position: "relative",
    fontSize: 24,
    lineHeight: 44,
    fontWeight: "500",
    fontFamily:Platform.OS=='android'? "Roboto": null,
    color: "#fff",
    textAlign: "center",
  },
  aVerficationCodeHasBeenSe: {
    // position: "relative",
    fontSize: 14,
    // lineHeight: 16,
    fontFamily: Platform.OS=='android'? "Roboto": null,
    color: "#fff",
    textAlign: "center",
    width: 237,
    height: 41,
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
  inputLight: {
    borderRadius: 12,
    borderStyle: "solid",
    borderColor: "#dedee6",
    borderWidth: 1,
    width: 48,
    flexShrink: 0,
    flexDirection: "row",
    padding: 16,
    boxSizing: "border-box",
    alignItems: "center",
    justifyContent: "flex-start",
    alignSelf: "center",
    color:'pink'
  },
  inputLight1: {
    borderRadius: 12,
    backgroundColor: "#2c3035",
    borderStyle: "solid",
    borderColor: "#dfdfe6",
    borderWidth: 1,
    width: 44,
    flexShrink: 0,
    flexDirection: "row",
    padding: 16,
    boxSizing: "border-box",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  inputLight2: {
    borderRadius: 12,
    backgroundColor: "#2c3035",
    borderStyle: "solid",
    borderColor: "#dfdfe6",
    borderWidth: 1,
    width: 44,
    flexShrink: 0,
    flexDirection: "row",
    padding: 16,
    boxSizing: "border-box",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  inputLight3: {
    borderRadius: 12,
    backgroundColor: "#2c3035",
    borderStyle: "solid",
    borderColor: "#dfdfe6",
    borderWidth: 1,
    width: 44,
    flexShrink: 0,
    flexDirection: "row",
    padding: 16,
    boxSizing: "border-box",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  framePressable: {
    alignSelf: "center",
    width: "100%",
    flexDirection: "row",
    
    // padding: 5,
    boxSizing: "border-box",
    alignItems: "center",
    justifyContent: "center",
    
  },
  loginText: {
    position: "relative",
    fontSize: 16,
    letterSpacing: 8,
    lineHeight: 16,
    textTransform: "uppercase",
    fontWeight: "600",
    fontFamily: Platform.OS=='android'? "Roboto": null,
    color: "rgb(251, 144, 19)",
    textAlign: "left",
  },
  iconArrowBack: {
    position: "relative",
    width: 16,
    height: 13.39,
    flexShrink: 0,
  },
  buttonLight: {
    alignSelf: "stretch",
    borderRadius: 50,
    backgroundColor: "#fff",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 20,
    boxSizing: "border-box",
    alignItems: "center",
    justifyContent: "center",
    width:dimensions_width-40,
    left:20
  },
  framePressable1: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  frameView3: {
    alignSelf: "stretch",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  text: {
    alignSelf: "stretch",
    position: "relative",
    fontSize: 10,
    letterSpacing: 8,
    textTransform: "uppercase",
    fontWeight: "600",
    fontFamily: "Poppins",
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
  cyechampText: {
    textTransform: "uppercase",
  },
  cyechampAllRightsReserved: {
    position: "relative",
    fontSize: 10,
    fontFamily: "Poppins",
    color: "#fff",
    textAlign: "left",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: {
      width: 0,
      height: 0.7971894145011902,
    },
    textShadowRadius: 1.59,
  },
  frameView4: {
    alignSelf: "stretch",
    borderRadius: 30,
    flexDirection: "column",
    padding: 10,
    boxSizing: "border-box",
    alignItems: "center",
    justifyContent: "flex-start",
    zIndex: 1,
  },
  loginView: {
    position: "relative",
    backgroundColor: "rgb(251, 144, 19)",
    flex: 1,
    width: "100%",
    height: 852,
    overflow: "hidden",
    flexDirection: "column",
    paddingHorizontal: 30,
    paddingBottom: 30,
    boxSizing: "border-box",
    alignItems: "center",
    justifyContent: "center",
  },
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#b13664',
    backgroundColor:'transparent',
    marginTop:40,
    bottom:20
  },
});

export default Login;
