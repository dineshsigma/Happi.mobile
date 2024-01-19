import * as React from "react";
import {
    Text, StyleSheet, View, Image, Pressable,
    ImageBackground, RefreshControl, FlatList, Dimensions, SafeAreaView, TextInput, TouchableOpacity, Modal, StatusBar, Linking, Button, ScrollView, TouchableHighlight, Platform
} from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from "@react-navigation/native";
const dimensions_width = Dimensions.get('window').width;
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from "react-redux";
import { getIntransistDelivaryDetails, updateReceivedStock } from "../../reducers/stockTransfer";
import RNFS from "react-native-fs";
import FileViewer from "react-native-file-viewer";
import { Camera, CameraType, CameraScreen } from 'react-native-camera-kit';

const UpdateReceived = ({ route }) => {
    const id = route.params
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const deliveryDetails = useSelector(state => state.stockTransfer.deliveryDetails)
    const [intransitDets, setIntransitDets] = React.useState();
    const [imageType, setImageType] = React.useState()
    const [openCamera, setOpenCamera] = React.useState(false)
    const [isPermitted, setIsPermitted] = React.useState(false);
    const [captureImages, setCaptureImages] = React.useState([]);
    const [selectedImage, setSelectedImage] = React.useState([])

    React.useEffect(() => {
        let payload = {
            id: id
        }
        dispatch(getIntransistDelivaryDetails(payload)).then((res) => {
            console.log('ressssponse', res.payload.data[0].attachment)
            console.log('rsssss', res.payload.data[0]?.imei_date)
            let arr = []
            arr.push(res.payload.data)
            console.log('in array', arr)
            setIntransitDets(res.payload.data[0]?.imei_date)
        })
        console.log('iiiii', intransitDets)
    }, [])

    const onUpdate = () => {
        let arrayOfImg =[]
        let images;
        selectedImage?.map((item)=>{
             images = {
              name: item?.image?.name,
              uri: item?.image?.uri
            }    
            arrayOfImg.push(images)
          console.log('array of imgggg',arrayOfImg)
        })
        let payload = {
            id: id,
            product_received_attachments:arrayOfImg
        }
        dispatch(updateReceivedStock(payload)).then((res) => {
            
            navigation.navigate('StockRequest')
        })
    }
    const RncameraAccess = () => {
        setOpenCamera(true)
     
    
      }
    

    const attachmentDownload = (url) => {
        console.log('url', url)
        const extension = getUrlExtension(url);
        const localFile = `${RNFS.DocumentDirectoryPath}/temporaryfile.${extension}`;
        const options = {
            fromUrl: url,
            toFile: localFile,
        };

        RNFS.downloadFile(options)
            .promise.then(() => FileViewer.open(localFile))
            .then(() => {
                // success
            })
            .catch((error) => {
                // error
            });

    }
    const attachmentDownload2 = (url) => {
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
    function getUrlExtension(url) {
        return url?.split(/[#?]/)[0].split(".").pop().trim();
    }
    const RemoveImage=(item)=>{
        setSelectedImage(image => image?.filter(user => user?.image.id !== item));
    
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
          // Alert.alert(
          //   event.type,
          //   images,
          //   [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
          //   { cancelable: false },
          // );
          setOpenCamera(false)
        }
      };
    return (
        <View style={styles.container}>
            <ScrollView>
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
                (event) => onBottomButtonPressed(event)
              }

              // cameraFlipImage={require('./assets/flip.png')}
              captureButtonImage={require('../../assets/ellipse-38.png')}
              
            />
          </View>

        </View>
      </Modal>
                {intransitDets?.map((item) => {
                    console.log('item', item)
                    return (
                        <View style={{ padding: 15 }}>
                            <View style={[styles.card_TaskList, { padding: 10 }]}>
                                <View style={{ justifyContent: 'flex-start', flexDirection: 'row', borderBottomWidth: 0.75, borderColor: 'rgba(240, 244, 253, 1)' }}>
                                    <View style={{ width: '50%', justifyContent: 'center' }}>
                                        <Text style={{ color: '#000', fontWeight: '600', fontSize: 15, textAlignVertical: 'center', }}>
                                            IMEI No-
                                        </Text>
                                    </View>
                                    <View style={{ width: '50%', justifyContent: 'center' }}>
                                        <Text style={{ color: 'rgb(251, 144, 19)', fontWeight: '600', fontSize: 15, textAlignVertical: 'center', }}>
                                            {item.imei_no}
                                        </Text>
                                    </View>
                                </View>

                                <View style={{ justifyContent: 'flex-start', flexDirection: 'row', borderBottomWidth: 0.75, borderColor: 'rgba(240, 244, 253, 1)' }}>
                                    <View style={{ width: '50%', justifyContent: 'center' }}>
                                        <Text style={{ color: '#000', fontWeight: '600', fontSize: 15, textAlignVertical: 'center', }}>
                                            Brand -
                                        </Text>
                                    </View>
                                    <View style={{ width: '50%', justifyContent: 'center' }}>
                                        <Text style={{ color: 'rgb(251, 144, 19)', fontWeight: '600', fontSize: 15, textAlignVertical: 'center', }}>
                                            {item.brand}
                                        </Text>
                                    </View>
                                </View>

                                <View style={{ justifyContent: 'flex-start', flexDirection: 'row', borderBottomWidth: 0.75, borderColor: 'rgba(240, 244, 253, 1)' }}>
                                    <View style={{ width: '50%', justifyContent: 'center' }}>
                                        <Text style={{ color: '#000', fontWeight: '600', fontSize: 15, textAlignVertical: 'center', }}>
                                            Model -
                                        </Text>
                                    </View>
                                    <View style={{ width: '50%' }}>
                                        <Text style={{ color: 'rgb(251, 144, 19)', fontWeight: '600', fontSize: 15, textAlignVertical: 'center', }}>
                                            {item.item_name}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                        </View>
                    )
                })}

                <View style={{ justifyContent: 'flex-start', flexDirection: 'row', borderBottomWidth: 0.75, borderColor: 'rgba(240, 244, 253, 1)', }}>
                    <View style={{ width: '50%' }}>
                        <Text style={{ color: '#000', fontWeight: '600', fontSize: 15, textAlignVertical: 'center', left: 10 }}>
                            Product Photo -
                        </Text>
                    </View>
                    <View style={{ width: '50%' }}>
                        {/* <Image
                                        style={{widtdh:200,height:200}}
                                        source={{
                                        uri: item.attachment,
                                        }}
                                    /> */}
                    </View>
                </View>

                {deliveryDetails?.data && deliveryDetails?.data[0]?.product_attachments?.map((item) => {
                    return (
                        <View style={{ alignSelf: 'center', width: '100%', left: 10, bottom: 50 }}>
                            <View style={[styles.selectedFile, { flexDirection: 'row', marginBottom: 5 }]} >
                                <TouchableOpacity
                                    onPress={() => attachmentDownload(item.images)}
                                >
                                    <Text style={{ color: '#3565d4', textDecorationLine: 'underline' }}>{item?.file_name?.length < 20 ? `${item?.file_name}` : `${item?.file_name?.substring(0, 30)}...`}</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    )
                })}

                {deliveryDetails?.data?.map((item) => {

                    return (
                        <View style={{ paddingLeft: 10, top: 20 }}>

                            <View style={{ width: '50%', }}>
                                <Text style={{ color: '#000', fontWeight: '600', fontSize: 20, textAlignVertical: 'center', }}>
                                    Delivery Details
                                </Text>
                            </View>

                            <View style={{ justifyContent: 'flex-start', flexDirection: 'row', borderBottomWidth: 0.75, borderColor: 'rgba(240, 244, 253, 1)', top: 5 }}>
                                <View style={{ width: '50%' }}>
                                    <Text style={{ color: '#000', fontWeight: '600', fontSize: 15, textAlignVertical: 'center', }}>
                                        Delivery Through -
                                    </Text>
                                </View>
                                <View style={{ width: '50%' }}>
                                    <Text style={{ color: 'rgb(251, 144, 19)', fontWeight: '600', fontSize: 15, textAlignVertical: 'center', textTransform: 'capitalize' }}>
                                        {item.mode_of_delivary}
                                    </Text>
                                </View>
                            </View>

                            <View style={{ justifyContent: 'flex-start', flexDirection: 'row', borderBottomWidth: 0.75, borderColor: 'rgba(240, 244, 253, 1)', top: 10 }}>
                                <View style={{ width: '50%' }}>
                                    <Text style={{ color: '#000', fontWeight: '600', fontSize: 15, textAlignVertical: 'center', }}>
                                        Description -
                                    </Text>
                                </View>
                                <View style={{ width: '50%' }}>
                                    <Text style={{ color: 'rgb(251, 144, 19)', fontWeight: '600', fontSize: 15, textAlignVertical: 'center', }}>
                                        {item.description}
                                    </Text>
                                </View>
                            </View>

                            <View style={{ justifyContent: 'flex-start', flexDirection: 'row', borderBottomWidth: 0.75, borderColor: 'rgba(240, 244, 253, 1)', top: 25 }}>
                                <View style={{ width: '50%' }}>
                                    <Text style={{ color: '#000', fontWeight: '600', fontSize: 15, textAlignVertical: 'center', }}>
                                        Person Photo -
                                    </Text>
                                </View>
                                <View style={{ width: '50%' }}>
                                    {/* <Image
                                        style={{widtdh:200,height:200}}
                                        source={{
                                        uri: item.attachment,
                                        }}
                                    /> */}
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', bottom: 5, justifyContent: 'space-between', top: 100 }}>
                                <Text style={[styles.header, { left: 5, color: '#000', fontWeight: '700' }]}>Upload Product Image</Text>
                                <AntDesign
                                    name="pluscircle"
                                    size={24}
                                    color="rgb(251, 144, 19)"
                                    onPress={() => RncameraAccess()}
                                    style={{ marginRight: 10 }}
                                />

                            </View>

                        </View>
                    )
                })}
            

                {deliveryDetails?.data && deliveryDetails?.data[0]?.attachment?.map((item) => {
                    return (
                        <View style={{ alignSelf: 'center', width: '100%', left: 10, top: -20 }}>
                            <View style={[styles.selectedFile, { flexDirection: 'row', marginBottom: 5 }]} >
                                <TouchableOpacity
                                    onPress={() => attachmentDownload(item.images)}
                                >
                                    <Text style={{ color: '#3565d4', textDecorationLine: 'underline' }}>{item?.file_name?.length < 20 ? `${item?.file_name}` : `${item?.file_name?.substring(0, 30)}...`}</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    )
                })}

                {selectedImage?.map((item)=>{
                            return(
                        <View style={{ alignSelf: 'center', width: '100%', top: 30,left:10 }}>
                            <View style={[styles.selectedFile, { flexDirection: 'row',marginBottom:5 }]} >
                                <TouchableOpacity onPress={()=>attachmentDownload2(item.image.uri)}>
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

                <View style={{ height: 200 }}></View>
            </ScrollView>

            <View style={{ justifyContent: 'flex-end', flex: 1 }}>
                <TouchableHighlight
                    style={styles.logout}
                    onPress={() => onUpdate()}
                >
                    <Text style={{ fontWeight: '700', color: '#fff' }}>Update Status</Text>
                </TouchableHighlight>

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
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleHeader: {
        color: '#000',
        fontSize: 16
    },
    card_TaskList: { backgroundColor: 'white', borderRadius: 8, marginBottom: 16, overflow: 'hidden', shadowColor: 'rgba(0,0,0,0.2)', shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, shadowOpacity: 0.1, elevation: 8, height: 'auto', borderColor: 'rgba(230, 230, 230, 1)', borderWidth: 0.8, paddingBottom: 25 },
    subContainer: {
        flex: 0.95,

    },
    logout: { width: '100%', height: 50, backgroundColor: 'rgb(251, 144, 19)', justifyContent: 'center', alignItems: 'center', borderRadius: 10 },
    selectedFile: {
        borderColor: '#c8c8c8',
        borderRadius: 5,
        borderWidth: 1,
        padding: 5,
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        top: 60,
        // left:25,

        // paddingRight:35,
        width: '95%'
    },
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


})

export default UpdateReceived