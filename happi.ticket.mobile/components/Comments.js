import * as React from "react";
import {
    Text, StyleSheet, View, Image, Pressable,
    ImageBackground, RefreshControl, FlatList, Dimensions, SafeAreaView, TextInput, TouchableOpacity, Modal, StatusBar, Linking, Button, ScrollView, TouchableHighlight, Platform
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { getDepartments, getTypeofIssues, getPriority, getComments, getStatusList, updateTickets, getAssigneeList } from "../reducers/ticketsReducer"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import moment from 'moment/moment';
import AudioRecorderPlayer, {
    AVEncoderAudioQualityIOSType,
    AVEncodingOption,
    AudioEncoderAndroidType,
    AudioSet,
    AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import AudioPlayer from "../components/AudioPlayer"
import RNFS from "react-native-fs";
import FileViewer from "react-native-file-viewer";
// import EditTicket from "../../components/EditTicket";

const Tab = createMaterialTopTabNavigator();
const dimensions_width = Dimensions.get('window').width;
const audioRecorderPlayer = new AudioRecorderPlayer();
const Comments = ({ route }) => {
    let ticdetails;
    if (route?.params?.name == 'AddComment') {
        ticdetails = route?.params?.params
    } else {
        ticdetails = route.params.route
    }

    let id = []
    ticdetails?.params?.departmentoutput?.map((department) => {
        id.push(department._id)
    })
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [ticketDetails, setTicketDetails] = React.useState({
        title: ticdetails?.params?.title,
        typeof_issue: ticdetails?.params?.issuesoutput[0]?._id,
        description: ticdetails?.params?.description,
        level: ticdetails?.params?.level,
        dept_id: id,
        assign_to: ticdetails?.params?.assignoutput[0]?.email,
        status: ticdetails?.params?.statusoutput[0]?._id,
        ticket_id: ticdetails?.params?.ticketId,
        created_by: ''
    })
    const departmentList = useSelector((state) => state.tickets.departmentList);
    const issuesList = useSelector((state) => state.tickets.issuesList);
    const priorityList = useSelector((state) => state.tickets.priorityList);
    const statusList = useSelector((state) => state.tickets.statusList);
    const assigneeList = useSelector((state) => state.tickets.assigneeList);
    const allComments = useSelector((state) => state.tickets.allComments);
    const createCommentResponse = useSelector((state) => state.tickets.createCommentResponse);
    const [titleError, setTitleError] = React.useState(false);
    const [departmentError, setDepartmentError] = React.useState(false);
    const [assignee, setAssignee] = React.useState([{ key: '44555', value: 'ravi' }, { key: '1122454', value: 'dinesh' }])
    const regex = /(<([^>]+)>)/ig;
    React.useEffect(() => {
        dispatch(getDepartments())
        dispatch(getTypeofIssues())
        dispatch(getPriority())
        dispatch(getStatusList())
        dispatch(getAssigneeList())

        AsyncStorage.getItem('user').then(value => {
            if (value == "" || value == null || value == undefined) {
                console.log(value)
            } else {
                // setUserData(JSON.parse(value));
                let userData = JSON.parse(value);
                let ticketObj = { _id: userData._id, ticket_id: ticdetails.params.ticketId }
                // ticketObj = {...ticketObj,created_by:userData._id,description:Description}
                setTicketDetails({ ...ticketDetails, created_by: userData._id })
                dispatch(getComments(ticketObj)).then((res) => {
                    //    navigation.navigate('HappiTickets')
                })
                //  dispatch(getTicketList(JSON.parse(value)))
            }
        })
    }, [createCommentResponse])
    const updateTicket = () => {
        if (!ticketDetails.title.trim()) {
            setTitleError(true)
        } else if (ticketDetails.dept_id.length == 0) {
            setDepartmentError(true)
        } else {
        }
    }

    const onStartPlay = async (path) => {

        try {
            const msg = await audioRecorderPlayer.startPlayer(path);

            //? Default path
            // const msg = await this.audioRecorderPlayer.startPlayer();
            const volume = await audioRecorderPlayer.setVolume(1.0);

            audioRecorderPlayer.addPlayBackListener((e) => {
                // this.setState({
                //   currentPositionSec: e.currentPosition,
                //   currentDurationSec: e.duration,
                //   playTime: this.audioRecorderPlayer.mmssss(
                //     Math.floor(e.currentPosition),
                //   ),
                //   duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
                // });
            });
        } catch (err) {
            console.log('startPlayer error', err);
        }
    };

    //function to download attachment
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

    function getUrlExtension(url) {
        return url?.split(/[#?]/)[0].split(".").pop().trim();
    }
    return (
        <>
            <ScrollView style={{ flex: 1, }}>
                <View>
                    {allComments && allComments.map((item, index) => {
                        return (

                            <View style={styles.card}>
                                <Text style={{ fontSize: 16, color: 'black', fontWeight: 400 }}>Name : {item.useroutput[0].name ? item.useroutput[0].name : item.useroutput[0].email}</Text>
                                {/* <Text>{ticdetails?.params?.useroutput[0]?.name}</Text> */}
                                {item.description == 'null' ?
                                    //  <TouchableOpacity style={{marginTop:10, width:50, height:30}}  onPress={() => onStartPlay(item.record)}>                             
                                    //  <MaterialCommunityIcons name='play-circle' size={24} color='orange'/>

                                    //         </TouchableOpacity>
                                    <AudioPlayer path={item.record} />
                                    :
                                    <Text style={{ color: '#000', fontSize: 15 }}>{item.description.replace(regex, '')}</Text>}
                                <View style={{ flexDirection: 'row' }}>

                                    <View style={{ justifyContent: 'center', marginTop: 10, marginBottom: 10, width: '90%' }}>
                                        <TouchableHighlight

                                            onPress={() => attachmentDownload(item?.attachment)}
                                        >
                                            <View >
                                                <Text style={{ textDecorationLine: 'underline', color: '#8FA2CB' }}>{item?.file_name}</Text>
                                            </View>
                                        </TouchableHighlight>
                                    </View>
                                </View> 
                                <Text style={{ alignSelf: 'flex-end', color: '#000', fontSize: 12 }}>{moment(item.creationDate).format('llll')}</Text>
                            </View>

                        )
                    })}
                    {/* </ScrollView> */}


                </View>
                <View style={{ height: 20, }}></View>
            </ScrollView>
            <View style={{ justifyContent: 'center', width: '95%', paddingLeft: 20, bottom: 20 }}>
                <TouchableHighlight
                    style={styles.logout}
                    onPress={() => navigation.navigate('AddComment', ticdetails)}
                >
                    <View>
                        <Text style={{ fontWeight: '700', color: '#fff' }}>Add</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: { backgroundColor: "#F0F4FD", flex: 1 },
    // tabViewContainer: { marginTop: 60 },
    scrollView: { padding: 5, paddingLeft: 16, paddingRight: 16, backgroundColor: "#F0F4FD", marginBottom: 0 },
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
        width: '85%',
        height: 50,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#8e8e8e',
        alignSelf: 'center',
        marginTop: 20,
        paddingLeft: 14
    },
    logout: { height: 40, backgroundColor: 'rgb(251, 144, 19)', justifyContent: 'center', alignItems: 'center', top: 10, borderRadius: 5 },
    card: { display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'column', backgroundColor: 'white', padding: 16, borderRadius: 16, shadowColor: 'rgba(0,0,0,0.2)', shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, shadowOpacity: 0.1, elevation: 8, marginTop: 10, marginBottom: 1, width: '90%', marginLeft: 20 },
    filterDropdown: {
        backgroundColor: 'white', margin: 5, borderRadius: 12, padding: 8, paddingLeft: 12, paddingRight: 12, borderWidth: 0.6, borderColor: '#DBDBDB', shadowColor: '#000',
        shadowOffset: { width: 0, height: 1, },
        shadowOpacity: 0.2, shadowRadius: 1.41, elevation: 2,
        width: '100%'
    },
    placeholderStyle: {
        fontSize: 14,
    },
    selectedTextStyle: {
        fontSize: 14,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    item: {
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    selectedStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        backgroundColor: '#fff',
        shadowColor: '#000',
        marginTop: 8,
        marginRight: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        width: dimensions_width / 3
    },
    textSelectedStyle: {
        marginRight: 5,
        fontSize: 14,
        // paddingRight:5
    },
});

export default Comments;
