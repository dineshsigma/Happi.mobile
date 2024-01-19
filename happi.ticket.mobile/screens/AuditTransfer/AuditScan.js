import * as React from "react";
import {
    Text, StyleSheet, View, Image, Pressable,
    ImageBackground, RefreshControl, FlatList, Dimensions, SafeAreaView, TextInput, TouchableOpacity, Modal, StatusBar, Linking, Button, ScrollView, TouchableHighlight, Platform
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { CameraScreen } from 'react-native-camera-kit';
import { scanIMEINumber } from "../../reducers/stockTransfer";

const AuditScan = ({route}) => {
    const id= route.params
    console.log('id Scanner',id)
    const navigation = useNavigation();
    const [scannedVal, setScannedVal]= React.useState();
    const dispatch = useDispatch()
    const [scannedRes, setScannedRes]= React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState()
  const [openCamera, setOpenCamera] = React.useState(false);
  const ref = React.useRef(null);

  const myfunc = () => {
    console.log("I was activated 5 seconds later");
  };

  React.useEffect(() => {
    setTimeout(() => {
      console.log(ref.current,"refffffffff")
       
    }, 5000); //miliseconds
  }, []);
    const onScanSuccessful=()=>{
        let payload = {
            "imei_serial_no":scannedVal
        }
        console.log('imeiii num',payload)
        dispatch(scanIMEINumber(payload)).then((res)=>{     
            console.log('IMEI response',res.payload) 
            // setScannedRes(res.payload)
            // navigation.navigate('ScannedDlvryDets', {res,id})
        })     
    }
    const OnBarCodeScanned =(event)=>{
        console.log('On Scanning bar code',event.captureImages)
        setScannedVal(event.nativeEvent.codeStringValue)
        setOpenCamera(true)

    }

    const onBottomButtonPressed = (event) => {
      console.log('evvvvv',event)
        const images = JSON.stringify(event.captureImages);
        if (event.type === 'left') {
          setIsPermitted(false);
        } else if (event.type === 'right') {
          setIsPermitted(false);
          setCaptureImages(images);
    
        } else {
          console.log('image capt', images)
          console.log('event capt', event)
          setSelectedImage(event)
          setOpenCamera(false)

        //   setShowAddFile(true)
    
          // Alert.alert(
          //   event.type,
          //   images,
          //   [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
          //   { cancelable: false },
          // );
        }
      };
    return (
        console.log('scanned val',scannedVal),
        <View>
            <Modal visible={openCamera} animationType={"slide"}>
        <View style={styles.modalBackGround}>

          <View style={{ flex: 1 }}>
            <CameraScreen
              // Buttons to perform action done and cancel
              ref={ref}
              actions={{
                rightButtonText: 'Done',
                leftButtonText: 'Cancel'
              }}
              onBottomButtonPressed={
                (event) =>
                // myfunc()
                 onBottomButtonPressed(event)
              }

              // cameraFlipImage={require('./assets/flip.png')}
              captureButtonImage={require('../../assets/mobile.png')}
            />
          </View>

        </View>
      </Modal>
        {!scannedVal &&
                    <CameraScreen
                actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
                scanBarcode={true}
                onReadCode={(event) =>OnBarCodeScanned(event) }
                showFrame={true} 
                laserColor="red" 
                frameColor="white" />
        }
        {
            scannedVal && 
            onScanSuccessful()
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
    button:{ top: 20, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', height: 60, borderWidth: 1, borderRadius: 10, marginTop: 30, borderColor: 'orange' , height:150}


});

export default AuditScan;
