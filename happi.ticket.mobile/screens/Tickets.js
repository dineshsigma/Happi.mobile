import * as React from "react";
import {
    Text, StyleSheet, View, Dimensions, ScrollView, TouchableOpacity, Pressable
} from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataTable, Card } from 'react-native-paper';
import { getTicketList,getStatusList } from "../reducers/ticketsReducer"
import { useSelector, useDispatch } from "react-redux";
import ScreenWrapper from '../ScreenWrapper';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from "@react-navigation/native";
import { SelectList, MultipleSelectList } from 'react-native-dropdown-select-list'
import { relative } from "path";
import moment from "moment";
import { activityLogs } from "../reducers/products";

function Tickets() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [userData, setUserData] = React.useState()
    const [loaderVisible, setLoaderVisible] = React.useState(true)
    const ticketsList = useSelector((state) => state.tickets.ticketsList);
    const ticketresponse = useSelector(state => state.tickets.createTicketResponse);
    const updateTicketResponse = useSelector(state => state.tickets.updateTicketResponse);
    const loading =  useSelector(state => state.tickets.loading);
    const statusList = useSelector((state) => state.tickets.statusList);
    const [sortAscending, setSortAscending] = React.useState(true);
    const [page, setPage] = React.useState(0);
    const [typeofTicket, setTypeofTicket] = React.useState(null)
    const [status,setStatus] = React.useState(null)
    const [items] = React.useState([
        {
            key: 1,
            name: 'Cupcake',
            calories: 356,
            fat: 16,
        },
        {
            key: 2,
            name: 'Eclair',
            calories: 262,
            fat: 16,
        },
        {
            key: 3,
            name: 'Frozen yogurt',
            calories: 159,
            fat: 6,
        },
        {
            key: 4,
            name: 'Gingerbread',
            calories: 305,
            fat: 3.7,
        },
        {
            key: 5,
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9,
        },
        {
            key: 6,
            name: 'Jelly Bean',
            calories: 375,
            fat: 0,
        },
    ]);
    const ticketTypeList = [{
        key:'null',
        value:'All tickets'
    },
        {
        key: 'mytickets',
        value: 'My Tickets'
    }, {
        key: 'my_created_tickets',
        value: 'My Created Tickets'
    },
    {
        key: 'assignedtickets',
        value: 'Assigned Tickets'
    },
    {
        key: 'Assigned_to',
        value: 'Assigned To'
    }]
  
    const [numberOfItemsPerPageList] = React.useState([10, 20, 50]);
    const [itemsPerPage, onItemsPerPageChange] = React.useState(
        numberOfItemsPerPageList[0]
    );
    React.useEffect(() => {
        dispatch(getStatusList()).then(value=>{
        })
        AsyncStorage.getItem('user').then(value => {
            if (value == "" || value == null || value == undefined) {
                // dispatch(updatetoken(value));
                // navigation.navigate('Login1');
            } else {
                setUserData(JSON.parse(value));
                 let body = {
                     status:status,
                     user:JSON.parse(value),
                     type:typeofTicket
                 }
                dispatch(getTicketList(body))
                
            }
        })
    }, [ticketresponse,typeofTicket,status,updateTicketResponse])

    React.useEffect(() => {     
        AsyncStorage.getItem('user').then(value => {
            let payload={
              emp_id:JSON.parse(value).emp_id,
              module:'happi-ticket-management',
              mobile:JSON.parse(value).phone

            }
            dispatch(activityLogs(payload))
        })       
    },[])

    const hideSpinner = () => {
        setTimeout(() => {
            setLoaderVisible(false)
        }, 5000)
    }

    const sortedItems = items
        .slice()
        .sort((item1, item2) =>
            (sortAscending ? item1.name < item2.name : item2.name < item1.name)
                ? 1
                : -1
        );
    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, ticketsList.length);
    React.useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);
    return (
       <>
        <ScrollView >
            <View style={{ marginRight: 0, justifyContent: "center", flex: 1,position:'relative'}}>
                {/* {userData && <WebView
                    onLoad={() => hideSpinner()}
                    source={{
                        // uri: `https://iipl.retool.com/embedded/public/c54d4f0b-a1c0-4704-9eeb-07770fb9263b?user_id=${userData?._id}`
                        uri: `https://iipl.retool.com/embedded/public/c54d4f0b-a1c0-4704-9eeb-07770fb9263b?user_id=${userData._id}`
                    }}

                    style={{ marginTop: 20 }}
                />}
                {loaderVisible && <Spinner
                    visible={true}
                    //Text with the Spinner
                    textContent={'Loading...'}

                    //Text style of the Spinner Text
                    textStyle={[styles.spinnerTextStyle, { color: 'black' }]}
                />} */}
            <View>
                <View style={{ alignSelf: 'center', top: 10, width: 300 }}>
                    <Text style={[styles.text, styles.text_active, { color:'#000', textAlign: 'left', marginTop: 10,bottom:5 }]}>Type of Tickets</Text>
                    <SelectList
                        setSelected={(val) => setTypeofTicket(val)}
                        data={ticketTypeList}
                        save="key"
                        search={false}
                        boxStyles={styles.textInput}
                        dropdownStyles={{
                            width: '100%', borderWidth: 1,
                            borderColor: '#c8c8c8', backgroundColor: '#fff'
                        }}
                        placeholder='Select'
                        inputStyles={{ left:-5,top: 2,color:'#000'}}
                        onSelect={() => console.log('selected')}
                        dropdownTextStyles={{color:'#000', textTransform:'capitalize'}}
                        defaultOption={{ key:'null', value:'All Tickets' }} 

                    />
                </View>
                <View style={{ alignSelf: 'center', top: 15, width: 300,marginBottom:30 }}>
                    <Text style={[styles.text, styles.text_active, { color: '#000', textAlign: 'left', marginTop: 10,bottom:5 }]}>Status</Text>
                    <SelectList
                        setSelected={(val) => setStatus(val)}
                        data={statusList}
                        save="key"
                        search={false}
                        boxStyles={{color:'#000'}}
                        dropdownStyles={{
                            width: '100%', borderWidth: 1,
                            borderColor: '#c8c8c8', backgroundColor: '#fff',
                        }}
                        placeholder='Select'
                        inputStyles={{ left: -5, top: 2,color:'#000' }}
                        onSelect={() => console.log('selected')}
                        dropdownTextStyles={{color:'#000'}}
                        defaultOption={{ key:'null', value:'All Status' }} 
                        
                    />
                </View>
                <ScreenWrapper contentContainerStyle={{minHeight:700}}>
                    <ScrollView horizontal>
                        <DataTable style={{backgroundColor:'none'}}>
                        <DataTable.Header>
                            <DataTable.Title
                            // sortDirection={sortAscending ? 'ascending' : 'descending'}
                            onPress={() => setSortAscending(!sortAscending)}
                            style={{width:70,justifyContent:'center'}}
                            >
                            Id
                            </DataTable.Title>
                            <DataTable.Title numeric style={{width:150,justifyContent:'center'}}>Title</DataTable.Title>
                            <DataTable.Title numeric style={{width:70,justifyContent:'left'}}>Status</DataTable.Title>
                            <DataTable.Title numeric style={{width:70,justifyContent:'center'}}>Priority</DataTable.Title>
                            <DataTable.Title numeric style={{width:100,justifyContent:'center'}}>Store Name</DataTable.Title>
                            <DataTable.Title style={{width:120,justifyContent:'center'}}>Created By</DataTable.Title>
                            <DataTable.Title numeric style={{width:130,justifyContent:'center'}}>Created On</DataTable.Title>
                        </DataTable.Header>

                        {ticketsList?.slice(from, to).map((item) => (
                            <DataTable.Row key={item.ticketId} style={{ borderBottomWidth: 1, zIndex:-1}} onPress={() => navigation.navigate('TicketDetails',item)}>
                            <DataTable.Cell style={{width:70,justifyContent:'center'}}>{item.ticketId}</DataTable.Cell>
                            <DataTable.Cell style={{width:150,justifyContent:'center'}}>{item.title}</DataTable.Cell>
                            <DataTable.Cell style={{width:70,justifyContent:'left'}}>{item?.statusoutput[0]?.status_name}</DataTable.Cell>
                            <DataTable.Cell style={{width:70,justifyContent:'left'}}>{item?.level}</DataTable.Cell>
                            <DataTable.Cell style={{width:120,justifyContent:'left'}} textStyle={{textTransform:'capitalize'}}>{item?.store_name}</DataTable.Cell>
                            <DataTable.Cell style={{width:100,justifyContent:'left'}}>{item?.useroutput[0]?.name}</DataTable.Cell>
                            <DataTable.Cell numeric style={{width:'auto',justifyContent:'center'}}>{moment(item.creationDate).format('ddd')}, {moment(item.creationDate).format('ll')}</DataTable.Cell>
                            </DataTable.Row>
                        ))}

                        <DataTable.Pagination
                            page={page}
                            numberOfPages={Math.ceil(ticketsList.length / itemsPerPage)}
                            onPageChange={(page) => setPage(page)}
                            label={`${from + 1}-${to} of ${ticketsList.length}`}
                            numberOfItemsPerPageList={numberOfItemsPerPageList}
                            numberOfItemsPerPage={itemsPerPage}
                            onItemsPerPageChange={onItemsPerPageChange}
                            showFastPaginationControls
                            selectPageDropdownLabel={'Rows per page'}
                        />
                        </DataTable>
                    </ScrollView>
                </ScreenWrapper>
            </View>
        
          </View>
          <Spinner
        //visibility of Overlay Loading Spinner
        visible={loading}
        //Text with the Spinner
        textContent={'Loading...'}

        //Text style of the Spinner Text
        textStyle={[styles.spinnerTextStyle, { color: '#fff' }]}
      />
        </ScrollView>
        <Pressable style={[styles.wrapper,styles.wrapperFlexBox, { alignSelf: 'flex-end', position:"absolute",top:'90%', right:20}]}onPress={() => { navigation.navigate('AddTicket') }}//   onPress={selectFile}
            >
                <Ionicons name='add-circle' size={42} solid color='gray'/>
            </Pressable>
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
    logout: { width: '30%', height: 30, backgroundColor: 'rgb(251, 144, 19)', justifyContent: 'center', alignItems: 'center', borderRadius: 5 , alignSelf:'center'},


});

export default Tickets;
