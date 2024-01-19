import * as React from "react";
import {
    Text, StyleSheet, View,Dimensions, TouchableHighlight, Platform,Pressable,ScrollView,PermissionsAndroid
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import RichtextEditor from "../../components/RichtextEditor";
import { useSelector, useDispatch } from "react-redux";
import { createComments, setDescription } from "../../reducers/ticketsReducer"
import AsyncStorage from '@react-native-async-storage/async-storage';
import AudioRecorderPlayer, {
    AVEncoderAudioQualityIOSType,
    AVEncodingOption,
    AudioEncoderAndroidType,
    AudioSet,
    AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import { Card, Divider, Background } from 'react-native-paper';
import RNFetchBlob from 'rn-fetch-blob'
import moment from 'moment/moment';
import { RNS3 } from 'react-native-aws3';
import SwitchButton from 'switch-button-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DocumentPicker from 'react-native-document-picker';
import { Stack, IconButton } from "@react-native-material/core";

const audioRecorderPlayer = new AudioRecorderPlayer();
let granted;
const dimensions_width = Dimensions.get('window').width;
const Addcomment = ({ route }) => {
     let tic_id = route.params?.params?.ticketId
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [comType, setComType] = React.useState()
    const [isLoggingIn, setIsLoggingIn] = React.useState(false);
    const [recordSecs, setRecordSecs] = React.useState(0);
    const [recordTime, setRecordTime] = React.useState('00:00:00');
    const [currentPositionSec, setCurrentPositionSec] = React.useState(0);
    const [currentDurationSec, setCurrentDurationSec] = React.useState(0);
    const [playTime, setPlayTime] = React.useState('00:00:00');
    const [duration, setDuration] = React.useState('00:00:00');
    const [audioFile,setAudiofile] = React.useState()
    const [todoType, setTodoType] = React.useState(true)
    const [descriptionError, setDescriptionError] = React.useState(false);
    const [recordError,setRecordError] = React.useState(false)
    const [selectedFile, setSelectedFile] = React.useState()
    const [showAddFile, setShowAddFile] = React.useState(false)

    const Description = useSelector(state => state.tickets.description);
    let commentType = [{ key: "1", value: "Text" }, { key: "2", value: "Record" }]
    audioRecorderPlayer.setSubscriptionDuration(0.09);

    const requestCameraPermission = async () => {
        try {
            granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
              ]);
        
          // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //   console.log('You can use the camera');
          // } else {
          //   console.log('Camera permission denied');
          // }
        } catch (err) {
          console.warn(err);
        }
      };

      React.useEffect(() => {
        requestCameraPermission()
        }, [granted])

    const onStartRecord = async () => {
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
                 keyPrefix: `ticket-management/${result}${moment
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
              console.log(`percent: ${event.percent}`);
            })
            .then(response => {
                setAudiofile(response.body.postResponse.location)
                AsyncStorage.getItem('user').then(value => {
                    if (value == "" || value == null || value == undefined) {
                        console.log(value)
                    } else {
                        let userData = JSON.parse(value);
                        let ticketObj = { comment_type:'record', created_by: userData._id, description: 'null', ticket_id: tic_id, creationDate: new Date(), record: response.body.postResponse.location  }
                        dispatch(createComments(ticketObj)).then((res) => {
                            dispatch(setDescription(''))
                            navigation.navigate('TicketDetails',route)
                        })
                    }
                })
           
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

    const onStartPlay = async () => {
        const path = 'hello.m4a';
        const msg = await audioRecorderPlayer.startPlayer(path);
        audioRecorderPlayer.setVolume(1.0);
        audioRecorderPlayer.addPlayBackListener((e) => {
            if (e.currentPosition === e.duration) {
                audioRecorderPlayer.stopPlayer();
            }
            setCurrentPositionSec(e.currentPosition);
            setCurrentDurationSec(e.duration);
            setPlayTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
            setDuration(audioRecorderPlayer.mmssss(Math.floor(e.duration)));
        });
    };

    const onPausePlay = async () => {
        await audioRecorderPlayer.pausePlayer();
    };

    const onStopPlay = () => {
        audioRecorderPlayer.stopPlayer();
        audioRecorderPlayer.removePlayBackListener();
    };

    const selectFile = async () => {
        try {
         
          const doc = await DocumentPicker.pickSingle()
          // miltipleDocs.push(doc)
          setSelectedFile(doc)
          setShowAddFile(true)
          console.log('selected doc', doc)
        } catch (error) {
          if (DocumentPicker.isCancel(error)) {
            console.log('User Cancelled the upload', error)
            setShowAddFile(false)
          }
          else {
            console.log('error', error)
            setShowAddFile(false)
          }
        }
      }

    const addComments = () => {
        if (Description == '') {
            setDescriptionError(true)
        } else {
        AsyncStorage.getItem('user').then(value => {
            if (value == "" || value == null || value == undefined) {
                console.log(value)
            } else {
                let userData = JSON.parse(value);
                let ticketObj = { comment_type:'text', created_by: userData._id, description: Description, ticket_id: tic_id, creationDate: new Date(), record: 'null',attachmentFile:selectedFile}
                // ticketObj = {...ticketObj,created_by:userData._id,description:Description}
                dispatch(createComments(ticketObj)).then((res) => {
                    dispatch(setDescription(''))
                    navigation.navigate('TicketDetails',route)
                })
                //  dispatch(getTicketList(JSON.parse(value)))
            }
        })
        dispatch(createComments()).then((res) => {
            dispatch(setDescription(''))
        })
    }
    }
    return (
        <ScrollView>
            <View style={{ alignSelf: 'center', top: 20, width: 320, marginBottom: 10 }}>
                {/* <Text style={[styles.text, styles.text_active, { color: '#000', textAlign: 'left' }]}>Type</Text>

                <SelectList
                    setSelected={(val) => { setComType({ val }); }}
                    data={commentType}
                    save="key"
                    search={false}
                    boxStyles={styles.textInput}
                    dropdownStyles={{
                        width: '100%', borderWidth: 1,
                        borderColor: '#c8c8c8', backgroundColor: '#fff'
                    }}
                    placeholder='Select'
                    inputStyles={{ left: -5, top: 2, }}
                    onSelect={() => console.log('selected')}
                /> */}
                 <SwitchButton
          onValueChange={() => setTodoType(!todoType)}
          text1='Text'
          text2='Record'
          switchWidth={dimensions_width - 50}
          switchHeight={54}
          switchdirection='ltr'
          switchBorderRadius={8}
          switchSpeedChange={400}
          switchBackgroundColor='#ffffff'
          switchBorderColor='white'
          btnBorderColor='rgb(251, 144, 19)'
          btnBackgroundColor='rgb(251, 144, 19)'
          fontColor='#7F7F7F'
          activeFontColor='#ffffff'
          animationDuration={5}
        />
            </View>
      {descriptionError && todoType && <Text style ={{paddingLeft:20,color:'red',top:10}}>Enter Comment</Text>}
            {todoType &&
                <View>
                    <View style={{ paddingLeft: 20 }}>
                        <RichtextEditor initialHTML='' />
                    </View>
                    <View
            style={[
              styles.attachmentsFrame,
              styles.attachmentsFrameSpaceBlock, styles.mt10
            ]}
          >
            <View style = {{ alignSelf: 'center', top: 20, width: 300 }}>
              <Text style={[styles.text, styles.text_active, { color: '#000', textAlign: 'left', marginTop: 10 }]}>
                Attachments
              </Text>
            </View>
            <View style={[styles.headingFrameInner, styles.ml10]} >
              <Pressable
                style={[styles.wrapper,
                styles.wrapperFlexBox,
                ]}
                onPress={selectFile}
              >

                <Ionicons
                  name='add-circle'
                  size={42}
                  solid
                  color='gray'
                />
              </Pressable>
            </View>
          </View>
          
          {
            showAddFile ? 
            <View style = {{ alignSelf: 'center', width: 320 }}>
              {selectedFile && <>
                   <View style={[styles.selectedFile,{flexDirection:'row'}]}>
                   <Text style={{color:'#000'}}>{selectedFile?.name?.length < 20 ? `${selectedFile?.name}` : `${selectedFile?.name?.substring(0, 30)}...`}</Text>
                   <IconButton onPress={() => {setSelectedFile()}} icon={props => <Ionicons name="close-circle" {...props} />} style={{marginLeft:25}} />
                 </View>
                
                {/* <Button  loading={btnLoading} disabled={btnLoading} title='Upload Attachment' ></Button> */}
              </>}

            </View> : null}
                    <View style={{ justifyContent: 'center', paddingLeft: 20, width: 940, }}>
                        <TouchableHighlight
                            style={styles.logout}
                            onPress={() => addComments()}
                        >
                            <View >
                                <Text style={{ fontWeight: '700', color: '#fff' }}>Add</Text>
                            </View>
                        </TouchableHighlight>
                        <View style={{height:50}}/>
                    </View>
                </View>}
            {!todoType &&
            <View style={{padding:20}}>
                <Card style={{backgroundColor:'#fff'}}>
                    <View style={{alignItems:'center'}}>
                    <Text style = {{color:"#000"}}>InstaPlayer</Text>
                    <Text style = {{color:"#000"}}>{recordTime}</Text>
                    </View>
                    {/* <Button mode="contained" icon="record" onPress={onStartRecord}>
                RECORD
              </Button> */}
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <View style={{ justifyContent: 'center',  width: 200, margin:20 }}>
                        <TouchableHighlight
                            style={styles.logout}
                            onPress={onStartRecord}
                        >
                            <View style={{}}>
                                <Text style={{ fontWeight: '700', color: '#fff',  }}>Record</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={{ justifyContent: 'center', width: 200 }}>
                        <TouchableHighlight
                            style={styles.logout}
                            onPress={onStopRecord}
                        >
                            <View style={{}}>
                                <Text style={{ fontWeight: '700', color: '#fff' }}>Stop</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    </View>

                    {/* <Text>{playTime} / {duration}</Text> */}
                    {/* <Button mode="contained" icon="play" onPress={onStartPlay}>
                PLAY
              </Button> */}
                    {/* <View style={{ justifyContent: 'center', paddingLeft: 20, width: 940 }}>
                        <TouchableHighlight
                            style={styles.logout}
                            onPress={onStartPlay}
                        >
                            <View style={{}}>
                                <Text style={{ fontWeight: '700', color: '#fff' }}>Play</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={{ justifyContent: 'center', paddingLeft: 20, width: 940 }}>
                        <TouchableHighlight
                            style={styles.logout}
                            onPress={onPausePlay}
                        >
                            <View style={{}}>
                                <Text style={{ fontWeight: '700', color: '#fff' }}>Pause</Text>
                            </View>
                        </TouchableHighlight>
                    </View>

                    <View style={{ justifyContent: 'center', paddingLeft: 20, width: 940 }}>
                        <TouchableHighlight
                            style={styles.logout}
                            onPress={onStopPlay}
                        >
                            <View style={{}}>
                                <Text style={{ fontWeight: '700', color: '#fff' }}>Stop</Text>
                            </View>
                        </TouchableHighlight>
                    </View> */}


                </Card>
                </View>
            }
        </ScrollView>
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
    text: { color: '#7F7F7F', fontSize: 14, fontWeight: '500' },
    text_active: { color: "rgb(251, 144, 19)" },
    textInput: {
        borderWidth: 1,
        borderColor: '#c8c8c8',
        height: 50,
        borderRadius: 5,
        backgroundColor: '#fff',
        marginTop: 10,
        paddingLeft: 10
    },
    searchInput: {
        width: '90%',
        height: 50,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#8e8e8e',
        alignSelf: 'center',
        marginTop: 20,
        paddingLeft: 15
    },
    logout: { width: '35%', height: 40, backgroundColor: 'rgb(251, 144, 19)', justifyContent: 'center', alignItems: 'center', top: 10, borderRadius: 5 },
    headingFrameInner: { marginLeft: 'auto', right: 40, bottom: 10 },
    selectedFile: {
        borderColor: '#c8c8c8',
        borderRadius: 5,
        borderWidth: 1,
        padding: 5,
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // left:25,
        // paddingRight:35,
        // width:'90%'
      },
});

export default Addcomment;
