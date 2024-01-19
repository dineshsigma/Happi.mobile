import * as React from "react";
import {
  Text, StyleSheet, View, Image, Pressable,
  ImageBackground, RefreshControl, FlatList, Dimensions, SafeAreaView, TextInput, TouchableOpacity, Modal, StatusBar, Linking, Button, ScrollView, TouchableHighlight, Platform, PermissionsAndroid, Alert,ToastAndroid,KeyboardAvoidingView
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { updateScanProduct, getDeliveryMode, imageUpload } from "../../reducers/stockTransfer";
import { SelectList, MultipleSelectList } from 'react-native-dropdown-select-list'
import { setDescription } from "../../reducers/ticketsReducer";
import { Camera, CameraType, CameraScreen } from 'react-native-camera-kit';
import AntDesign from 'react-native-vector-icons/AntDesign';
import products from "../../reducers/products";
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from "react-native-fs";
import FileViewer from "react-native-file-viewer";
let new_array = [];
let uniqueset = []


const ScannedDlvryDets = ({ route }) => {
  const navigation = useNavigation()
  const id = route.params.id
  const details = route.params.res ? (route.params.res?.payload?.data) : (route.params?.payload?.data)
  const scannedDetails = useSelector(state => state.stockTransfer.scannedProduct);
  const deliveryMode = useSelector(state => state.stockTransfer.deliveryMode);
  const [twoProducts, setTwoProducts] = React.useState()
  const [selectedDel, setSelectedDel] = React.useState()
  const [description, setDescription] = React.useState()
  const [selectedImage, setSelectedImage] = React.useState([])
  const [selectedProductImage, setSelectedProductImage] = React.useState([])
  const [openCamera, setOpenCamera] = React.useState(false)
  const [isPermitted, setIsPermitted] = React.useState(false);
  const [captureImages, setCaptureImages] = React.useState([]);
  const [showAddFile, setShowAddFile] = React.useState(false);
  const [amount, setAmount] = React.useState();
  const [imeiError, setImeiError] = React.useState(false);
  const [modError, setModError] = React.useState(false);
  const [descError, setDescError] = React.useState(false);
  const [amountError, setAmountError] = React.useState(false);
  const [imageError, setImageError] = React.useState(false)
  const [proImgError, setProImgError] = React.useState(false)
  const [storeDetails, setStoreDetails] = React.useState();
  const [imageType, setImageType]= React.useState()

  const dispatch = useDispatch()

  React.useEffect(() => {
    requestExternalWritePermission()
    AsyncStorage.getItem('storeDetails').then((user) => {
      console.log('storeeeee',user)
      if (user == "" || user == null || user == undefined) {
          //Show no user image
      }
      else {
          setStoreDetails(JSON.parse(user)[0])
      }
    }) 
  }, [])

  React.useEffect(()=>{
    if(selectedImage?.length!=0){
      setImageError(false)
    }
    if(selectedProductImage?.length!=0){
      setProImgError(false)
    }
  },[selectedImage,selectedProductImage])
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };
  React.useEffect(() => {
    new_array.length = 0
    uniqueset.length = 0
    dispatch(getDeliveryMode())
    new_array.push(details)
    dispatch(updateScanProduct(details))
    if (scannedDetails !== "" && scannedDetails !== undefined) {
      new_array.push(scannedDetails)
      // dispatch(updateScanProduct())
    }
    console.log('array1', new_array)
    // const allEqual =
    // new_array => new_array.every(v => v === new_array[0]);
    //   console.log("is Equal",allEqual(new_array));
    if(new_array!= undefined ||new_array.length!=0 ){
      setTwoProducts(new_array)
    }
   
  }, [details])

  const SubmitIMEI = () => {
    console.log('submittt')
    let arrayOfImg =[]
    let arrayofPro =[]
    let images;
    let products;
    selectedImage?.map((item)=>{
         images = {
          name: item?.image?.name,
          uri: item?.image?.uri
        }    
        arrayOfImg.push(images)
      console.log('array of imgggg',arrayOfImg)
    })
    selectedProductImage?.map((item)=>{
      products = {
       name: item?.image?.name,
       uri: item?.image?.uri
     }    
     arrayofPro.push(products)
   console.log('array of products',arrayofPro)
 })
    

    if (twoProducts?.length == 0) {
      setImeiError(true)
    }
    else if (selectedProductImage?.length == 0) {
      setProImgError(true)
    }
    else if (selectedDel == undefined) {
      setModError(true)
    }
    
    else if (description == undefined || description == '') {
      setDescError(true)
    }
    else if (amount == undefined || amount == '') {
      setAmountError(true)
    }
    else if (selectedImage?.length ==0) {
      setImageError(true)
    }

    else {
      let payload = {
        imei_data: twoProducts,
        mode_of_delivary: selectedDel,
        description: description,
        attachmentFile: arrayOfImg,
        id: id,
        amount:parseInt(amount),
        branch_code:storeDetails?.store_code,
        product_attachments:arrayofPro

      }
      dispatch(imageUpload(payload)).then((res) => {
        console.log('S3', res)
        if(res.payload.status){
          navigation.navigate('StockRequest')
        }
        else{
          ToastAndroid.show(res?.payload?.message, ToastAndroid.LONG);
        }
      })
    }
  }

  const RncameraAccess = (type) => {
    setOpenCamera(true)
    setImageType(type)

  }

  const onBottomButtonPressed = (event) => {
    const images = JSON.stringify(event.captureImages);
    if (event.type === 'left') {
      setIsPermitted(false);
    } else if (event.type === 'right') {
      setIsPermitted(false);
      setCaptureImages(images);

    } else {
      console.log('event you get', event)
      // setSelectedImage(event)
      setSelectedImage(image =>[...image,event])
      setShowAddFile(true)

      // Alert.alert(
      //   event.type,
      //   images,
      //   [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      //   { cancelable: false },
      // );
      setOpenCamera(false)
    }
  };

  const onBottomPressedPro = (event) => {
    const images = JSON.stringify(event.captureImages);
    if (event.type === 'left') {
      setIsPermitted(false);
    } else if (event.type === 'right') {
      setIsPermitted(false);
      // setCaptureImages(images);

    } else {
      console.log('event you get', event)
      // setSelectedImage(event)
      setSelectedProductImage(image =>[...image,event])
      setOpenCamera(false)
    }
  };

  const openImage=(image)=>{
    <View style={{width:'50%'}}>
    <Image
         style={{widtdh:200,height:200}}
         source={{
         uri: image,
         }}
     />
    </View>
  }

  const attachmentDownload = (url) => {
    console.log('url', url)
    let uri = url
    if (uri.startsWith('file://')) {
  // Platform dependent, iOS & Android uses '/'
  const pathSplitter = '/';
  // file:///foo/bar.jpg => /foo/bar.jpg
  const filePath = uri.replace('file://', '');
  console.log('filepath',filePath)
  // /foo/bar.jpg => [foo, bar.jpg]
  const pathSegments = filePath.split(pathSplitter);
  // [foo, bar.jpg] => bar.jpg
  const fileName = pathSegments[pathSegments.length - 1];
  // const realPath = `${RNFS.TemporaryDirectoryPath}${inbox}/${name}`;
  var destPath = RNFS.DocumentDirectoryPath + '/' +fileName;

  RNFS.moveFile(filePath, destPath);
  uri = `file://${destPath}`;
  console.log('uri hereee',uri)
  FileViewer.open(uri).then(()=>{
    console.log('heyyyyyyyyy')
  })
}
  }

  const RemoveImage=(item)=>{
    setSelectedImage(image => image?.filter(user => user?.image.id !== item));

  }
  const RemoveProdImage=(item)=>{
    setSelectedProductImage(image => image?.filter(user => user?.image.id !== item));
  }


  const removeItem=(item)=>{
    setTwoProducts(product => product?.filter(user => user?.imei_no !== item?.imei_no));
    // dispatch(updateScanProduct(twoProducts))
    let new_storeArr = []
    new_storeArr.push(scannedDetails)
    let exist = new_storeArr?.find(prod=>prod?.imei_no == item?.imei_no)
    if(exist){
      dispatch(updateScanProduct()) 
    }
}
console.log(selectedImage,'seledctdeded')
  return (
    <View style={styles.container}>
     <ScrollView automaticallyAdjustKeyboardInsets="always">
      <Modal visible={openCamera} animationType={"slide"}>
        <View style={styles.modalBackGround}>

          <View style={{ flex: 1 }}>
            <CameraScreen
              // Buttons to perform action done and cancel
              actions={{
                rightButtonText: 'Done',
                // leftButtonText: 'Cancel'
              }}
              onBottomButtonPressed={
              
                (event) => imageType=='delivery' ? onBottomButtonPressed(event) : onBottomPressedPro(event)
              }

              // cameraFlipImage={require('./assets/flip.png')}
              captureButtonImage={require('../../assets/ellipse-38.png')}
              
            />
          </View>

        </View>
      </Modal>
 
      <View style={styles.subContainer}>

        {twoProducts?.map((item) => {
          return (
            <View style={styles.card_TaskList}>
              <View style={{ padding: 15 }}>
                <View style={{ justifyContent: 'flex-start', flexDirection: 'row', borderBottomWidth: 0.75, borderColor: 'rgba(240, 244, 253, 1)' }}>
                  <View style={{ width: '50%' }}>
                    <Text style={{ color: '#000', fontWeight: '600', fontSize: 15, textAlignVertical: 'center', }}>
                      IMEI Number -
                    </Text>
                  </View>
                  <View style={{ width: '50%', justifyContent: 'center' }}>
                    <Text style={{ color: 'rgb(251, 144, 19)', fontWeight: '600', fontSize: 15, textAlignVertical: 'center', }}>
                      {item?.imei_no}
                    </Text>
                  </View>
                </View>

                <View style={{ justifyContent: 'flex-start', flexDirection: 'row', borderBottomWidth: 0.75, borderColor: 'rgba(240, 244, 253, 1)' }}>
                  <View style={{ width: '50%' }}>
                    <Text style={{ color: '#000', fontWeight: '600', fontSize: 15, textAlignVertical: 'center', }}>
                      Brand -
                    </Text>
                  </View>
                  <View style={{ width: '50%' }}>
                    <Text style={{ color: 'rgb(251, 144, 19)', fontWeight: '600', fontSize: 15, textAlignVertical: 'center', }}>
                      {item?.brand}
                    </Text>
                  </View>
                </View>

                <View style={{ justifyContent: 'flex-start', flexDirection: 'row', borderBottomWidth: 0.75, borderColor: 'rgba(240, 244, 253, 1)' }}>
                  <View style={{ width: '50%' }}>
                    <Text style={{ color: '#000', fontWeight: '600', fontSize: 15, textAlignVertical: 'center', }}>
                      Model -
                    </Text>
                  </View>
                  <View style={{ width: '50%' }}>
                    <Text style={{ color: 'rgb(251, 144, 19)', fontWeight: '600', fontSize: 15, textAlignVertical: 'center', }}>
                      {item?.item_name}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ justifyContent: 'flex-start', flexDirection: 'row'}}>
                  <View style={{ width: '50%' }}>
                    <Text style={{ color: '#000', fontWeight: '600', fontSize: 15, textAlignVertical: 'center', }}>
                      
                    </Text>
                  </View>
                  <View style={{ width: '50%',alignItems: 'flex-end' }}>
                    <TouchableOpacity onPress={()=>removeItem(item)}>
                    <Text style={{ color: 'red', fontWeight: '600', fontSize: 15, textAlignVertical: 'center', right:20}}>
                      Remove
                    </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              {imeiError && <Text style={{ color: 'red', fontSize: 10, left: 10 }}>IMEI is not scanned Properly</Text>}
            </View>

          )
        })
        }
      </View>

      <>
      <View style={{ flexDirection: 'row', bottom:5, justifyContent: 'space-between' }}>
        <Text style={[styles.header,{left:5,color:'#000', fontWeight: '700'}]}>Upload Product Image</Text>
           <AntDesign
                  name="pluscircle"
                  size={24}
                  color="rgb(251, 144, 19)"
                  onPress={() => RncameraAccess('image')}
                  style={{ marginRight: 10 }}
                />

      </View>

      {selectedProductImage.length!=0 && 
               <Text style={{ top: 0, fontWeight: '500',color:'#000',left:10 }}>Product Image</Text>
      }
    
            {selectedProductImage?.map((item)=>{
            return(
          <View style={{ alignSelf: 'center', width: '100%',left:10,bottom:40 }}>
               <View style={[styles.selectedFile, { flexDirection: 'row',marginBottom:5 }]} >
                <TouchableOpacity onPress={()=>attachmentDownload(item.image.uri)}>
                 <Text  style={{ color: '#3565d4',textDecorationLine:'underline' }}>{item?.image.name?.length < 20 ? `${item?.image?.name}` : `${item?.image?.name?.substring(0, 30)}...`}</Text>
                 </TouchableOpacity>
                 <AntDesign
                  name="closecircleo"
                  size={18}
                  color="rgb(251, 144, 19)"
                  onPress={() => RemoveProdImage(item.image.id)}
                  style={{ marginLeft: 25 }}
                />
              </View>
             </View>
            )
            })
           }
      {proImgError && <Text style={{ color: 'red', fontSize: 10,bottom:0,left:10 }}>Please Add Product Image</Text>}
      </>

      <SelectList
        setSelected={(val) => setSelectedDel(val)}
        data={deliveryMode}
        save="key"
        search={true}
        boxStyles={[styles.textInput, { top: 20 }]}
        dropdownStyles={{
          width: '100%', borderWidth: 1,
          borderColor: '#c8c8c8', backgroundColor: '#fff',top:10
        }}
        placeholder='Select Mode of Delivery'
        dropdownTextStyles={{ color: '#000', textTransform: 'capitalize' }}
        inputStyles={{ color: '#000', left: -5, fontSize: 14 }}
        searchPlaceholder=""
        onSelect={()=>setModError(false)}
      />
      {modError && <Text style={{ color: 'red', fontSize: 10, left: 10, top: 20  }}> Please select mode of Delivery</Text>}

      <View style={{ top: 30, }}>
        <TextInput style={[styles.formInput, { height: 'auto', padding: 10, textAlignVertical: 'top' }]} underlineColorAndroid="transparent" placeholder="Type of Delivery Description" variant="standard"
          onChangeText={(text) => setDescription(text)} placeholderTextColor={'#000'} numberOfLines={3}
          multiline={true} onFocus={()=>setDescError(false)}/>
      </View>
      {descError && <Text style={{ color: 'red', fontSize: 10, left: 10,top: 30  }}> Please Add Delivery Description</Text>}



      <View style={{ alignSelf: 'center', width: '100%', top: 40 }}>
        <TextInput style={[styles.formInput,]} underlineColorAndroid="transparent" placeholder="Enter Delivery Charges" variant="standard"
          onChangeText={(text) => setAmount(text)} placeholderTextColor={'#000'} keyboardType="phone-pad" onFocus={()=>setAmountError(false)} />

      </View>
      {amountError && <Text style={{ color: 'red', fontSize: 10, left: 10,top:40 }}> Please Add Delivery Amount</Text>}



      <>
      <View style={{ flexDirection: 'row', top: 50, justifyContent: 'space-between' }}>
        <Text style={[styles.header,{left:5,color:'#000', fontWeight: '700'}]}>Upload Delivery Person Image</Text>
        {/* <TouchableHighlight
          // style={styles.upload}
          onPress={() => RncameraAccess()}
        > */}
           <AntDesign
                  name="pluscircle"
                  size={24}
                  color="rgb(251, 144, 19)"
                  onPress={() => RncameraAccess('delivery')}
                  style={{ marginRight: 10 }}
                />
          {/* <Text style={{ fontWeight: '700', color: '#fff' }}>Add Image</Text> */}
        {/* </TouchableHighlight> */}

      </View>
      {imageError && <Text style={{ color: 'red', fontSize: 10,top:50,left:10 }}>Please Add Delivery Person Image</Text>}
      </>

      {selectedImage.length!=0 && 
               <Text style={{ top: 60, fontWeight: '500',color:'#000',left:10 }}>Delivery Person Image</Text>
      }
    
            {selectedImage?.map((item)=>{
            return(
          <View style={{ alignSelf: 'center', width: '100%', top: 20,left:10 }}>
               <View style={[styles.selectedFile, { flexDirection: 'row',marginBottom:5 }]} >
                <TouchableOpacity onPress={()=>attachmentDownload(item.image.uri)}>
                 <Text  style={{ color: '#3565d4',textDecorationLine:'underline' }}>{item?.image.name?.length < 20 ? `${item?.image?.name}` : `${item?.image?.name?.substring(0, 30)}...`}</Text>
                 </TouchableOpacity>
                 <AntDesign
                  name="closecircleo"
                  size={18}
                  color="rgb(251, 144, 19)"
                  onPress={() => RemoveImage(item.image.id)}
                  style={{ marginLeft: 25 }}
                />
              </View>
             </View>
            )
            })
           }

       
          <View style={{height:300}}></View>
    </ScrollView>
     

          <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between',flex:1,alignItems:'flex-end'}}>

        <TouchableHighlight
          style={[styles.reject, { width: twoProducts?.length > 1 ? '100%' : '45%' }]}
          onPress={() => SubmitIMEI()}
        >
          <Text style={{ fontWeight: '700', color: '#fff' }}>Proceed</Text>
        </TouchableHighlight>
        {twoProducts?.length <=1  &&
          <TouchableHighlight
            style={styles.approve}
            onPress={() => navigation.navigate('StockScanner2')}
          >
            <Text style={{ fontWeight: '700', color: '#fff' }}>Scan Another Product</Text>
          </TouchableHighlight>
        }

    </View>

    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  header: {
    fontSize: 14,
    textAlignVertical: 'center'
  },
  titleHeader: {
    color: '#000',
    fontSize: 16
  },
  card_TaskList: { backgroundColor: 'white', borderRadius: 8, marginBottom: 16, overflow: 'hidden', shadowColor: 'rgba(0,0,0,0.2)', shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, shadowOpacity: 0.1, elevation: 8, height: 'auto', borderColor: 'rgba(230, 230, 230, 1)', borderWidth: 0.8, paddingBottom: 15 },
  subContainer: {
    height: 'auto',

  },
  logout: { width: '100%', height: 50, backgroundColor: 'rgb(251, 144, 19)', justifyContent: 'center', alignItems: 'center', borderRadius: 10 },
  approve: { width: '45%', height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: 'rgb(251, 144, 19)' },
  reject: { width: '45%', height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: 'rgb(251, 144, 19)'},
  upload: { width: '30%', height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 10, 
  backgroundColor: 'rgb(251, 144, 19)' },

  primary_color: 'rgb(251, 144, 19)',
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    // alignItems: 'flex-start',

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
  selectedFile: {
    borderColor: '#c8c8c8',
    borderRadius: 5,
    borderWidth: 1,
    padding: 5,
    display: 'flex',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    top: 50,
    // left:25,

    // paddingRight:35,
    width:'95%'
  },
  formInput: { paddingLeft: 16, color: '#323232', borderWidth: 1, borderColor: 'lightgray', backgroundColor: 'white', fontSize: 15, height: 44, width: '100%', },

})
export default ScannedDlvryDets