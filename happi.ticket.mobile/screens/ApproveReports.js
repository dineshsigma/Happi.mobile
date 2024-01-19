import * as React from "react";
import {
    Text, StyleSheet, View, Pressable,
    Dimensions, TextInput, TouchableOpacity, Platform, FlatList
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import DateTimePickerLib from '@oman21/rn-datetimepicker';
import moment from 'moment/moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
const dimensions_width = Dimensions.get('window').width
const dimensions_height = Dimensions.get('window').height
import GlobalStyles from "../GlobalStyles";



const ApproveReports = () => {
    const navigation = useNavigation();
    const [selectedStore, setSelectedStore] = React.useState('');
    const [isClicked, setIsClicked] = React.useState(false);
    const [openStartDate, setOpenStartDate] = React.useState(false);
    const [openDueDate, setOpenDueDate] = React.useState(false);
    const [startDate, setStartDate] = React.useState(new Date());
    const [dueDate, setDueDate] = React.useState(new Date());
    const [searchText, setSearchText] = React.useState('');
    const searchRef = React.useRef();
    let data4 = [
        { "store_name": "ADILABAD" },
        { "store_name": "AMEERPET" },
        { "store_name": "ANANTAPUR" },
        { "store_name": "ASRAONAGAR" },
        { "store_name": "BANJARAHILLS" }
    ]
    const [data, setData] = React.useState(data4);//list of Brand DATA
    const startDateSelected = (data) => {
        setStartDate(data);
        setOpenStartDate(false);
        const originalDate = new Date(data);
        originalDate.setDate(originalDate.getDate() + 1);
        const newDateString = originalDate.toISOString();
        setDueDate(newDateString);
    }



    const onSearch = txt => {
        setSearchText(txt);
        if (txt !== '') {
            let tempData = data?.filter((item) => {
                return item.store_name.toLowerCase().indexOf(txt.toLowerCase()) > -1;
            })
            setData(tempData);
        }
        else {
            setData(data4)
        }
    }

    const handleSubmit = () => {
        //reset to startdate and due date today
        setStartDate(new Date())
        setDueDate(new Date())
    }

    return (
        <>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Icon name="arrow-left" size={20} type="entypo" />
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <View style={styles.container}>
                <Text style={styles.label}>Select Store:</Text>
                <TouchableOpacity style={styles.dropdownSelector} onPress={() => { setIsClicked(!isClicked) }}>
                    <Text placeholder='Select Store'>{selectedStore}</Text>
                    {isClicked ? (
                        <Icon type='font-awesome' name='chevron-down' />
                    ) : (<Icon type='font-awesome' name='chevron-up' />)}
                </TouchableOpacity>
                {isClicked ? (<View style={styles.dropdownArea}>
                    <TextInput ref={searchRef} placeholder="Search" style={styles.searchInput} value={searchText} onChangeText={text => { onSearch(text) }} />
                    <FlatList data={data} renderItem={({ item, index }) => {
                        return (
                            <>{
                                <TouchableOpacity style={styles.storeItem} onPress={() => {
                                    setSelectedStore(item?.store_name);
                                    setIsClicked(false);
                                    onSearch('');
                                    searchRef.current.clear()
                                    setSearchText('')
                                }}>
                                    <Text>{item.store_name}</Text>
                                </TouchableOpacity>}</>
                        )
                    }} /></View>
                ) : null}
            </View>
            <Text style={{ fontSize: 14, marginTop: 20, paddingLeft: 25 }}>From Date:</Text>
            <View style={[styles.frameWrapper]}>
                <Pressable onPress={() => setOpenStartDate(true)}>
                    <View style={[styles.frameParent, styles.frameParentFlexBox,]}>
                        <DateTimePickerLib
                            visible={openStartDate}
                            mode="date"
                            androidMode="calendar"
                            onCancel={() => setOpenStartDate(false)}
                            onSelect={(data) => {
                                startDateSelected(data)
                            }} />
                        <Pressable onPress={() => setOpenStartDate(true)}>
                            <View
                                style={[
                                    { width: dimensions_width - 40, borderBottomColor: '#c8c8c8', borderBottomWidth: 1, top: 15 }
                                ]}
                            >
                                <TextInput
                                    style={[
                                        styles.recentActivityWrapper,
                                        styles.ml17,
                                        styles.frameParentFlexBox,
                                        { position: Platform.OS === 'ios' ? 'relative' : 'absolute', width: dimensions_width, color: '#000', fontWeight: '500', top: Platform.OS === 'ios' ? -15 : -35 }
                                        // {backgroundColor:'red',}
                                    ]}
                                    readOnly
                                    label="Start Date"
                                    variant="standard"
                                    value={moment(startDate).format('llll')}
                                    editable={false} />
                            </View>
                        </Pressable>
                        <MaterialCommunityIcons name="calendar-month-outline" size={24} style={{ marginLeft: 'auto', right: 40, top: -5, color: '#ffb822' }} />


                    </View>
                </Pressable>
            </View>

            {/* DUE DATE START  */}
            <Text style={{ fontSize: 14, marginTop: 20, paddingLeft: 25 }}>To Date:</Text>

            <View style={[styles.frameWrapper]}>
                <Pressable onPress={() => setOpenDueDate(true)}>
                    <View style={[styles.frameParent, styles.frameParentFlexBox, { justifyContent: 'center' }]}>
                        <DateTimePickerLib
                            visible={openDueDate}
                            onCancel={() => setOpenDueDate(false)}
                            minDate={new Date(startDate)}
                            onSelect={(data) => {
                                setDueDate(data);
                                setOpenDueDate(false);
                            }} />
                        <Pressable onPress={() => setOpenDueDate(true)} style={{ height: 30, position: Platform.OS === 'ios' ? 'relative' : 'absolute' }}>

                            <View
                                style={[
                                    { width: dimensions_width - 40, borderBottomColor: '#c8c8c8', borderBottomWidth: 1, top: 30, right: Platform.OS === 'ios' ? 0 : 15 }
                                ]}
                            >
                                <TextInput
                                    style={[
                                        styles.recentActivityWrapper,
                                        styles.ml17,
                                        styles.frameParentFlexBox,
                                        { position: Platform.OS === 'ios' ? 'relative' : 'absolute', width: dimensions_width - 160, color: '#000', fontWeight: '500', top: Platform.OS === 'ios' ? -15 : -35 }
                                        // {backgroundColor:'red',}
                                    ]}
                                    readOnly
                                    label="Due Date"
                                    variant="standard"
                                    value={moment(dueDate).format('llll')}
                                    editable={false} />
                            </View>
                        </Pressable>
                        <MaterialCommunityIcons name="calendar-month-outline" size={24} style={{ marginLeft: 'auto', right: 40, top: -5, color: '#ffb822' }} />
                    </View>
                </Pressable>
            </View>

            <View style={styles.submitButtonContainer}>
                <TouchableOpacity style={styles.submitButton} >
                    <Text style={styles.submitButtonText} onPress={() => handleSubmit()}>Submit</Text>
                </TouchableOpacity>
            </View>
        </>


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
    frameWrapper: {
        borderColor: "#fff",
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        paddingVertical: 0,
        borderStyle: "solid",
        borderRadius: GlobalStyles.Border.br_lg,
        alignSelf: "stretch",
        paddingLeft: 25,

    },
    frameParent: {
        height: 37,
        alignSelf: "stretch",
        alignItems: "center",
        marginLeft: 0
    },
    frameParentFlexBox: {
        alignItems: "center",
        flexDirection: "row",
    },
    submitButtonContainer: {
        alignSelf: 'center',
        marginTop: 20,
    },
    // Style for the submit button
    submitButton: {
        backgroundColor: 'orange',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    // Style for the submit button text
    submitButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    backButton: {
        flexDirection: "row",
        alignItems: "center",
        position: "absolute",
        top: 10,
        left: 10,
        zIndex: 1,
        backgroundColor: "#fb9013",
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    backButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 5,
        backgroundColor: "#fb9013",
        color: "#f8f9fa"
    },
    dropdownSelector: {
        width: '90%',
        height: 50,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#8e8e8e',
        alignSelf: 'center',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,

    },
    dropdownArea: {
        width: '90%',
        height: 300,
        borderRadius: 10,
        marginTop: 20,
        backgroundColor: '#fff',
        elevation: 5,
        alignSelf: 'center'
    },
    icon: {
        width: 20,
        height: 20
    },
    storeItem: {
        width: '80%',
        height: 50,
        borderBottomWidth: 0,
        borderBottpmColor: '#8e8e8e',
        alignSelf: 'center',
        justifyContent: 'center'

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
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        //alignSelf: 'right',
        marginTop: 90,
        paddingLeft: 25,
    },


});

export default ApproveReports;
