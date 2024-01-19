import * as React from "react";
import {
    Text, StyleSheet, View, Image, Pressable,
    ImageBackground, RefreshControl, FlatList, Dimensions, SafeAreaView, TextInput, TouchableOpacity, Modal, StatusBar, Linking, Button, ScrollView, TouchableHighlight, Platform,ActivityIndicator
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SelectList } from 'react-native-dropdown-select-list'
import RichtextEditor from "../components/RichtextEditor";
import { useSelector, useDispatch } from "react-redux";
import { getDepartments, getTypeofIssues, getPriority, getComments, getStatusList, updateTickets, getAssigneeList } from "../reducers/ticketsReducer"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Picker } from '@react-native-picker/picker';
import moment from 'moment/moment';
import { MultiSelect } from 'react-native-element-dropdown';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign';
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


const Tab = createMaterialTopTabNavigator();
const dimensions_width = Dimensions.get('window').width;
const audioRecorderPlayer = new AudioRecorderPlayer();
const EditTicket = ({ route }) => {
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
        assign_to: ticdetails?.params?.assignoutput[0]?._id,
        status: ticdetails?.params?.statusoutput[0]?._id,
        ticket_id: ticdetails?.params?.ticketId,
        created_by: '',
        attachment: ticdetails?.params?.attachment
    })
    const departmentList = useSelector((state) => state.tickets.departmentList);
    const issuesList = useSelector((state) => state.tickets.issuesList);
    const priorityList = useSelector((state) => state.tickets.priorityList);
    const statusList = useSelector((state) => state.tickets.statusList);
    const assigneeList = useSelector((state) => state.tickets.assigneeList);
    const allComments = useSelector((state) => state.tickets.allComments);
    const loading = useSelector((state) => state.tickets.loading);
    const createCommentResponse = useSelector((state) => state.tickets.createCommentResponse);
    const [titleError, setTitleError] = React.useState(false);
    const [departmentError, setDepartmentError] = React.useState(false);
    const [assignee, setAssignee] = React.useState([{ key: '44555', value: 'ravi' }, { key: '1122454', value: 'dinesh' }])
    function getUrlExtension(url) {
        return url?.split(/[#?]/)[0].split(".").pop().trim();
    }

    //function to download attachment
    const attachmentDownload = (url) => {
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
                })
                //  dispatch(getTicketList(JSON.parse(value)))
            }
        })
    }, [createCommentResponse])

    // function to update ticket
    const updateTicket = () => {
        if (!ticketDetails.title.trim()) {
            setTitleError(true)
        } else if (ticketDetails.dept_id.length == 0) {
            setDepartmentError(true)
        } else {
            AsyncStorage.getItem('user').then(value => {
                if (value == "" || value == null || value == undefined) {
                    console.log(value)
                } else {
                    // setUserData(JSON.parse(value));
                    let userData = JSON.parse(value);
                    // let ticketObj = ticketDetails;
                    // ticketObj = {...ticketObj,ticket_id:ticdetails.params.ticketId}
                    dispatch(updateTickets(ticketDetails)).then((res) => {
                        navigation.navigate('HappiTickets')
                    })
                    //  dispatch(getTicketList(JSON.parse(value)))
                }
            })
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

    const renderDataItem = (item) => {
        return (
            <View style={[styles.item]}>
                {/* <MaterialCommunityIcons name="priority-high" color="black" size={20} style={styles.icon} /> */}
                <Text style={styles.selectedTextStyle}>{item.label}</Text>
            </View>
        );
    };
    return (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} >
            <View style={{ marginBottom: 10 }}>
                <Text style={[styles.text, styles.text_active, { color: '#000', textAlign: 'left', paddingLeft: 24, top: 10 }]}>Title</Text>
                {titleError && <Text style={[styles.text, styles.text_active, { color: 'red', textAlign: 'left', paddingLeft: 24, top: 10 }]}>Enter Title</Text>}
                <TextInput placeholder="Enter Title" style={styles.searchInput} placeholderTextColor={'#000'} value={ticketDetails.title} onChangeText={(nextValue) => { setTicketDetails({ ...ticketDetails, title: nextValue }) }} />
            </View>
            <View style={{ top: 10, marginBottom: 20 }}>
                <Text style={[styles.text, styles.text_active, { color: '#000', textAlign: 'left', paddingLeft: 24, bottom: 10 }]}>Department</Text>

                {departmentError && <Text style={[styles.text, styles.text_active, { color: 'red', textAlign: 'left', paddingLeft: 24 }]}>Select Atleast One Department</Text>}
                <View style={{ width: '95%', paddingLeft: 15 }}>
                    <MultiSelect
                        style={styles.filterDropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={departmentList}
                        labelField="label" valueField="value" placeholder="Select Department"
                        value={ticketDetails.dept_id}
                         search = {true}
                         searchPlaceholder="Search..."
                        onChange={item => { setTicketDetails({ ...ticketDetails, dept_id: item }); }}
                        renderLeftIcon={() => (
                            <MaterialCommunityIcons name="priority-high" color="black" size={20} style={styles.icon} />
                        )}

                        renderItem={renderDataItem}
                        renderSelectedItem={(item, unSelect) => (
                            <TouchableOpacity onPress={() => unSelect && unSelect(item)} style={{ padding: 2, paddingLeft: 10 }}>
                                <View style={styles.selectedStyle}>
                                    <Text style={styles.textSelectedStyle}>{item.label}</Text>
                                    <AntDesign color="black" name="delete" size={16} style={{ marginLeft: 'auto' }} />
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
            <View style={{ top: 10, marginBottom: 20 }}>
                <Text style={[styles.text, styles.text_active, { color: '#000', textAlign: 'left', paddingLeft: 24, bottom: 10 }]}>Type Of Issue</Text>
                <View style={{ backgroundColor: 'white', color: 'black', marginRight: 20, marginLeft: 20, borderRadius: 10, borderColor: 'rgba(0,0,0,0.2)', borderWidth: 1 }}>
                    <Picker
                    
                        selectedValue={ticketDetails?.typeof_issue[0]?._id ? ticketDetails?.typeof_issue[0]._id : ticketDetails.typeof_issue}
                        // onFocus={() => setShowLocationError(false)}
                        onValueChange={(nextValue, nextIndex) => { setTicketDetails({ ...ticketDetails, typeof_issue: nextValue }); }} style={{ backgroundColor: 'white', color: 'black', marginRight: 10, marginLeft: 10, paddingTop: 10 }} itemStyle={{ borderRadius: 20 }} containerStyle={{ height: 100 }}>
                 
                        <Picker.Item label="Select Issue" value=""/>
                        {issuesList.length > 0 &&
                            issuesList.map((desig) => {
                                return (
                                    <Picker.Item label={desig.value.replace(/\b[a-z]/g, match => match.toUpperCase())} value={desig.key} />
                                )
                            })
                        }
                    </Picker>
                </View>
            </View>

            <View style={{ top: 10, marginBottom: 20 }}>
                <Text style={[styles.text, styles.text_active, { color: '#000', textAlign: 'left', paddingLeft: 24, bottom: 10 }]}>Priority Level</Text>
                <View style={{ backgroundColor: 'white', color: 'black', marginRight: 20, marginLeft: 20, borderRadius: 10, borderColor: 'rgba(0,0,0,0.2)', borderWidth: 1 }}>
                    <Picker
                        selectedValue={ticketDetails.level}
                        // onFocus={() => setShowLocationError(false)}
                        onValueChange={(nextValue, nextIndex) => { setTicketDetails({ ...ticketDetails, level: nextValue }); }} style={{ backgroundColor: 'white', color: 'black', marginRight: 10, marginLeft: 10, paddingTop: 10 }} itemStyle={{ borderRadius: 20 }} containerStyle={{ height: 100 }}>
                        <Picker.Item label="Select Priority" value="" />
                        {priorityList.length > 0 &&
                            priorityList.map((desig) => {
                                return (
                                    <Picker.Item label={desig.value} value={desig.value} />
                                )
                            })
                        }
                    </Picker>
                </View>
            </View>

            <View style={{ top: 10, marginBottom: 20 }}>
                <Text style={[styles.text, styles.text_active, { color: '#000', textAlign: 'left', paddingLeft: 24, bottom: 10 }]}>Status</Text>
                <View style={{ backgroundColor: 'white', color: 'black', marginRight: 20, marginLeft: 20, borderRadius: 10, borderColor: 'rgba(0,0,0,0.2)', borderWidth: 1 }}>
                    <Picker
                        selectedValue={ticketDetails.status}
                        // onFocus={() => setShowLocationError(false)}
                        onValueChange={(nextValue, nextIndex) => { setTicketDetails({ ...ticketDetails, status: nextValue }); }} style={{ backgroundColor: 'white', color: 'black', marginRight: 10, marginLeft: 10, paddingTop: 10 }} itemStyle={{ borderRadius: 20 }} containerStyle={{ height: 100 }}>
                        <Picker.Item label="Select Status" value="" />
                        {statusList.length > 0 &&
                            statusList.map((desig) => {
                                return (
                                    <Picker.Item label={desig.value} value={desig.key} />
                                )
                            })
                        }
                    </Picker>
                </View>
            </View>

            <View style={{ top: 10 }}>
                <Text style={[styles.text, styles.text_active, { color: '#000', textAlign: 'left', paddingLeft: 24, bottom: 10 }]}>Assignee</Text>
                <View style={{ backgroundColor: 'white', color: 'black', marginRight: 20, marginLeft: 20, borderRadius: 10, borderColor: 'rgba(0,0,0,0.2)', borderWidth: 1 }}>
                    <Picker
                        selectedValue={ticketDetails.assign_to}
                        // onFocus={() => setShowLocationError(false)}
                        onValueChange={(nextValue, nextIndex) => { setTicketDetails({ ...ticketDetails, assign_to: nextValue }); }} style={{ backgroundColor: 'white', color: 'black', marginRight: 10, marginLeft: 10, paddingTop: 10 }} itemStyle={{ borderRadius: 20 }} containerStyle={{ height: 100 }}>
                        <Picker.Item label="Select Assignee" value="" />
                        {assigneeList.length > 0 &&
                            assigneeList.map((desig) => {
                                return (
                                    <Picker.Item label={desig.value} value={desig.key} />
                                )
                            })
                        }
                    </Picker>
                </View>
            </View>

            <View style={{ top: 20 }}>
                <Text style={[styles.text, styles.text_active, { color: '#000', textAlign: 'left', paddingLeft: 24 }]}>Description</Text>
                <View style={{ color: "#000", alignSelf: 'center', width: '92%', marginLeft: 20, marginBottom: 20, top: 5 }}>
                    <Text style={{ color: "#000" }}>{ticketDetails?.description.replace(/<[^>]+>/g, '')}</Text>
                </View>

                {/* <RichtextEditor initialHTML={ticketDetails.description} /> */}

            </View>

            <View style={{ top: 10 }}>
                <Text style={[styles.text, styles.text_active, { color: '#000', textAlign: 'left', paddingLeft: 24,marginBottom:5 }]}>Attachment</Text>
               

            </View>
                {/* android.actionViewIntent(viewImage, 'image/jpg') */}
               { ticketDetails?.attachment?.length > 0 && ticketDetails?.attachment.map((eachFile,id) => {
             return(
            <View style={{ flexDirection: 'row' }}>

               <View style={{ justifyContent: 'center', marginLeft: 20, marginTop: 10, marginBottom: 10, width: '90%' }}>
                    <TouchableHighlight

                        onPress={() => attachmentDownload(eachFile.images)}
                    >
                        <View >
                            <Text style={{ textDecorationLine: 'underline', color: '#8FA2CB' }}>{eachFile.file_name}</Text>
                        </View>
                    </TouchableHighlight>
                </View> 
                </View> )})}
                {/* <Text onPress={() => attachmentDownload()} style={{textDecorationLine:'underline', color:'#8FA2CB'}}>{ticketDetails?.attachment}</Text> */}

         

            <View style={{ justifyContent: 'center', marginLeft: 20, marginTop: 10, marginBottom: 30, width: '90%' }}>
                <TouchableHighlight
                    style={styles.logout}
                    onPress={() => updateTicket()}
                >
                     <View
              style={{
                ...styles.button
                // backgroundColor: isLoading ? "#4caf50" : "#8bc34a",
              }}
            >
              {loading && <ActivityIndicator size="small" color="#fff" />}
                    <View >
                        <Text style={{ fontWeight: '700', color: '#fff' }}>Update</Text>
                    </View>
                    </View>
                </TouchableHighlight>
            </View>
        </ScrollView>
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
        paddingLeft: 14,
        color: '#000'
    },
    logout: { height: 40, backgroundColor: 'rgb(251, 144, 19)', justifyContent: 'center', alignItems: 'center', top: 10, borderRadius: 5 },
    card: { display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'column', backgroundColor: 'white', padding: 16, borderRadius: 16, shadowColor: 'rgba(0,0,0,0.2)', shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, shadowOpacity: 0.1, elevation: 8, marginTop: 10, marginBottom: 1, width: 315, marginLeft: 20 },
    filterDropdown: {
        backgroundColor: 'white', margin: 5, borderRadius: 12, padding: 8, paddingLeft: 12, paddingRight: 12, borderWidth: 0.6, borderColor: '#DBDBDB', shadowColor: '#000',
        shadowOffset: { width: 0, height: 1, },
        shadowOpacity: 0.2, shadowRadius: 1.41, elevation: 2,
        width: '100%', color: "#000"
    },
    placeholderStyle: {
        fontSize: 14,
        color: '#000'
    },
    selectedTextStyle: {
        fontSize: 14,
        color: '#000'
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        color: '#000'
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
        color: '#000'
        // paddingRight:5
    },
    button: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: 50,
        height: 70,
        // borderWidth: 1,
        // borderColor: "#666",
        // borderRadius: 10,
      }
});

export default EditTicket;
