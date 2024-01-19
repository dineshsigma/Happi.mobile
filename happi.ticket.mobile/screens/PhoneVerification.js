import * as React from "react";
import {
  Text, StyleSheet, View, Image, Pressable,
  ImageBackground, RefreshControl, FlatList, Dimensions, SafeAreaView, TextInput, TouchableOpacity, Modal, StatusBar, Linking, Button, ScrollView, TouchableHighlight, Platform
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
// import FlatGrid from 'react-native-super-grid';
import { invoiceNumber, iphoneUpload, uploadResponseEmpty, getBarcodeImage, setBarcode, getReports, activityLogs } from "../reducers/products";
import Spinner from 'react-native-loading-spinner-overlay';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import DocumentPicker from 'react-native-document-picker';
import { readFile } from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from 'react-native-elements';
import moment from 'moment/moment';
import { BottomSheet } from 'react-native-btr';
import DateTimePickerLib from '@oman21/rn-datetimepicker';
import Clipboard from '@react-native-community/clipboard'



const PhoneVerification = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const dimensions_width = Dimensions.get('window').width
  const uploadResponse = useSelector((state) => state.products.uploadResponse);
  const barcode = useSelector((state) => state.products.barcode);
  const loading = useSelector((state) => state.products.uploadLoading);
  const storeWiseReports = useSelector((state) => state.products.storeWiseReports);
  const isLoading = useSelector((state) => state.products.isLoading);
  const [cameraOn, setCameraOn] = React.useState()
  const [invoiceno, setInvoiceno] = React.useState()
  const [selectedFile, setSelectedFile] = React.useState()
  const [showAddFile, setShowAddFile] = React.useState(false)
  const [userData, setUserData] = React.useState()
  const [invoiceError, setInvoiceError] = React.useState(false)
  const [filterVisible, setFilterVisible] = React.useState(false)
  const [startDate, setStartDate] = React.useState(new Date());
  const [openStartDate, setOpenStartDate] = React.useState(false);
  const [dueDate, setDueDate] = React.useState(new Date());
  const [openDueDate, setOpenDueDate] = React.useState(false);
  const [dateCard, setDateCard] = React.useState()

  React.useEffect(() => {
    AsyncStorage.getItem('user').then((user) => {
      if (user == "" || user == null || user == undefined) {
      }
      else {
        setUserData(JSON.parse(user));
        let reportsPayload = {
          startDate: startDate,
          endDate: dueDate,
          userDetails: user,
          type: "all"
        }
        dispatch(getReports(reportsPayload))
        let payload={
          emp_id:JSON.parse(user).emp_id,
          module:'happi-iphone-terminal',
          mobile:JSON.parse(user).phone
        }
        dispatch(activityLogs(payload))
      }
    })
    dispatch(setBarcode())

    const originalDate = new Date();
    // Add one day to the original date
    originalDate.setDate(originalDate.getDate() + 1);
    // Format the new date in ISO 8601 format
    const newDateString = originalDate.toISOString();
    setDueDate(newDateString);

    navigation.setOptions({
      headerTransparent: true,
      headerRight: () => (
        <View >
          <MaterialCommunityIcons name="plus-circle" size={38} color={'#fff'} onPress={() => navigation.navigate('AddInvoice')} />

        </View>
      ),
    });
  }, [])



  const openCamera = () => {
    navigation.navigate('Camera')

  }

  // const takePicture = async () => {
  //     if (cameraOn) {
  //         const options = { quality: 0.5, base64: true };
  //         const data = await cameraOn.takePictureAsync(options);
  //         console.log(data.uri);
  //     }
  // };
  const getInvoiceNumber = (number) => {
    setInvoiceno(number)
    // dispatch(invoiceNumber(number))
  }

  const selectFile = async () => {
    try {
      const doc = await DocumentPicker.pickSingle()

      const fileData = await readFile(doc.uri, 'base64');



      let files = {
        base64: fileData,
        filename: doc,
        Invoice_No: invoiceno,
        user_id: userData._id
      }
      dispatch(iphoneUpload(files)).then((resss) => {
        setTimeout(() => {
          dispatch(uploadResponseEmpty())
          navigation.goBack()
        }, 3000)

      })
      setSelectedFile(doc)
      setShowAddFile(true)

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
  const getBarcodeDetails = () => {
    if (!invoiceno) {
      setInvoiceError(true)
    } else {
      let invoice_id = invoiceno
      const payload = {
        invoice_no: invoice_id?.trim(),
        user_id: userData._id,
        emp_code: userData.emp_id
      }
      setInvoiceno()
      dispatch(getBarcodeImage(payload)).then(() => {
        setInvoiceno()
      })
    }

  }

  // function for report filters
  const filtersApply = () => {
    setFilterVisible(false)
    setDateCard(true)
    let reportsPayload = {
      startDate: moment(startDate).format('YYYY-MM-DD'),
      endDate: moment(dueDate).format('YYYY-MM-DD'),
      userDetails: userData,
      type: "filter"
    }
    if (startDate) {
      dispatch(getReports(reportsPayload))
    }

  }

  //function when clear filters

  const clearAllfilters = () => {
    setDateCard(false)
    setStartDate(new Date())
    setDueDate(new Date())
    setFilterVisible(false)
    AsyncStorage.getItem('user').then((user) => {
      // setUserData(user)
      if (user == "" || user == null || user == undefined) {

      }
      else {
        // setUserData(JSON.parse(user));
        let reportsPayload = {
          startDate: startDate,
          endDate: dueDate,
          userDetails: user,
          type: "all"
        }
        dispatch(getReports(reportsPayload))
      }
    })
  }

  return (
    <View style={{ paddingTop: 40, backgroundColor: '#fff', flex: 1 }}>
      {/* <View style={{ flexDirection: 'row' }}>
        <MaterialCommunityIcons name="keyboard-backspace" color="#6F787C" size={26} style={{ top: 20, left: 20 }} onPress={() => navigation.goBack()} />
        <Text style={{ top: 20, left: 40, fontSize: 20 }} >IPhone Terminal</Text>
      </View> */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingBottom: 5, paddingTop: 30 }}>
        <View style={{ width: '45%', justifyContent: 'center', backgroundColor: '#FF7878', borderRadius: 5, height: 70 }} >
          <Text style={{ textAlign: 'center', color: "#fff", fontWeight: '700' }}>{storeWiseReports?.failureCount}</Text>
          <Text style={{ textAlign: 'center', color: "#fff", fontWeight: '700' }}>Failure Count</Text>
        </View>

        <View style={{ width: '45%', borderRadius: 5, backgroundColor: '#70D777', justifyContent: 'center' }}>
          <Text style={{ textAlign: 'center', color: "#fff", fontWeight: '700' }}>{storeWiseReports?.successCount}</Text>
          <Text style={{ textAlign: 'center', color: "#fff", fontWeight: '700' }}>Success Count</Text>
        </View>
        {/* <Card containerStyle={{ marginTop: 30, borderRadius: 5, backgroundColor:'#70D777',width:'40%' }}>
          <Card.Title style={{ color: "#fff",width:'100%' }}>Success Count : {storeWiseReports?.successCount}</Card.Title>

        </Card> */}
      </View>
      <View style={{ paddingLeft: 20, paddingTop: 10, paddingRight: 20 }}>

        <View style={{ flexDirection: 'row', paddingBottom: 15, }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: '#000', top: 3 }}>REPORTS</Text>
          <View style={{ flexDirection: 'row', marginLeft: 'auto', justifyContent: 'space-between' }}>
            {dateCard &&
              <Pressable onPress={() => clearAllfilters()} style={{ marginLeft: 'auto', right: 6 }}>
                <View style={{ width: 'auto', height: 32, borderRadius: 10, backgroundColor: 'rgba(58, 53, 65, 0.08)', flexDirection: 'row', paddingLeft: 5, paddingRight: 5, }}>
                  <Text style={{ fontSize: 8, textAlignVertical: 'center', color: '#000', fontWeight: '600' }}>  {moment(startDate).format('ddd') + ', ' + moment(startDate).format('ll') + ' to ' + moment(dueDate).format('ddd') + ', ' + moment(dueDate).format('ll')}</Text>
                  <MaterialCommunityIcons name="close-circle" size={22} color={'rgba(58, 53, 65, 0.23)'} style={{ alignSelf: 'center', marginLeft: 'auto', paddingLeft: 5 }} onPress={() => clearAllfilters()} />
                </View>
              </Pressable>
            }
            <Pressable onPress={() => setFilterVisible(true)} >
              <View style={{ width: 32, height: 32, borderRadius: 10, backgroundColor: 'rgba(58, 53, 65, 0.08)', marginLeft: 'auto', justifyContent: 'center', alignItems: 'center' }}>
                <MaterialCommunityIcons name="tune-variant" size={16} color={'#000'} onPress={() => setFilterVisible(true)} />
              </View>
            </Pressable>
          </View>
        </View>
      </View>
      <ScrollView style={{ paddingLeft: 20, paddingTop: 10, paddingRight: 20, marginBottom: 40 }}>


        <View>
          {/* {storeWiseReports?.data?.map((item) => {
            return (
                // item?.status == 'FAILED' &&
                      <View style={styles.card_TaskList}>
                     
                        <View style={{ paddingLeft: 15, paddingRight:15 }}>
                          <View style={{flexDirection:'row', height:30, justifyContent:'center', borderBottomWidth:0.75, borderColor:'rgba(240, 244, 253, 1)'}}>
                          <Text style={{ color: '#000', fontWeight:'600', fontSize:15, textAlignVertical:'center'}}>
                          {item.invoice_no}
                        </Text>
                        <TouchableOpacity style={{width:20, height:20,left:10,justifyContent:'center', top:3}} onPress={()=>Clipboard.setString(item.invoice_no)}>
                        <MaterialCommunityIcons name="content-copy" size={16} color={'#000'} style={{top:2, left:0}} />
                        </TouchableOpacity>

                        <View style={[styles.subTitle, {height:30, justifyContent:'center'}]}>
                          <View style={styles.redCircle} />
                          <Text style={styles.failureText}>{item?.status}</Text>
                        </View>
                        </View>
                          <View style={{ flexDirection: 'row' , top:5}}>
                            <MaterialCommunityIcons name="information-outline" size={16} color={'#FF3535'} style={{ top: 2 }} />
                            <Text style={{ color: '#FF3535', left: 5,textTransform:'capitalize' }}>{item.message}</Text>
                          </View>
                          <View style={{ flexDirection: 'row', top: 15 }}>
                            <MaterialCommunityIcons name="calendar-month-outline" style={[styles.card_Datebox_icon]} />
                            <Text style={{ fontSize: 12, color: '#000' }}> {moment(item.createdDate).format('ddd')},</Text>
                            <Text style={{ fontSize: 12, color: '#000' }}> {moment(item.createdDate).format('ll')}</Text>
                          </View>

                          <View style={{ flexDirection: 'row', top: 30 }}>
                            <MaterialCommunityIcons name="account-circle-outline" style={[styles.card_Datebox_icon, { color: '#000' }]} />
                            <Text style={{ fontSize: 12, color: '#000',fontWeight:'600' }}> {item.emp_code} -{item?.emp_name ? item?.emp_name : 'N/A'}</Text>
                          </View>
                        </View>

                      </View>
            )
          })} */}
          {/* {storeWiseReports?.data?.map((item) => {
            return (
              item?.status == "SUCCESS" &&
              <View style={styles.card_TaskList}>
                
                <View style={{ paddingLeft: 15, paddingRight:15 }}>
                <View style={{flexDirection:'row', height:30, justifyContent:'center',borderBottomWidth:0.75, borderColor:'rgba(240, 244, 253, 1)'}}>
                    <Text style={{ color: '#000', fontWeight:'600', fontSize:15, textAlignVertical:'center'}}>
                    {item.invoice_no}
                  </Text>
                  <TouchableOpacity style={{width:20, height:20,left:10,justifyContent:'center', top:3}}onPress={()=>Clipboard.setString(item.invoice_no)}>
                  <MaterialCommunityIcons name="content-copy" size={16} color={'#000'} style={{top:2, left:0}} />
                  </TouchableOpacity>
                  <View style={[styles.subTitle,{height:30, justifyContent:'center'}]}>
                  <View style={styles.greenCircle} />
                  <Text style={styles.successText}>SUCCESS</Text>
                </View>
            </View>
                  <View style={{ flexDirection: 'row',top:5 }}>
                    <MaterialCommunityIcons name="check-circle-outline" size={16} color={'#70D777'} style={{ top: 2 }} />
                    <Text style={{ color: '#70D777', left: 5,textTransform:'uppercase' }}>{item.message}</Text>
                  </View>

                  <View style={{ flexDirection: 'row', top: 15 }}>
                    <MaterialCommunityIcons name="calendar-month-outline" style={[styles.card_Datebox_icon]} />
                    <Text style={{ fontSize: 12, color: '#000' }}> {moment(item.createdDate).format('ddd')},</Text>
                    <Text style={{ fontSize: 12, color: '#000' }}> {moment(item.createdDate).format('ll')}</Text>
                  </View>

                  <View style={{ flexDirection: 'row', top: 30 }}>
                    <MaterialCommunityIcons name="account-circle-outline" style={[styles.card_Datebox_icon, { color: '#000' }]} />
                    <Text style={{ fontSize: 12, color: '#000',fontWeight:'600'  }}> {item.emp_code} -{item?.emp_name ? item?.emp_name : 'N/A'}</Text>
                  </View>
                </View>


              </View>
                )
              

          })} */}

          {storeWiseReports?.data?.map((item) => {
            return (
              <View style={styles.card_TaskList}>

                <View style={{ paddingLeft: 15, paddingRight: 15 }}>
                  <View style={{ flexDirection: 'row', height: 30, justifyContent: 'center', borderBottomWidth: 0.75, borderColor: 'rgba(240, 244, 253, 1)' }}>
                    <Text style={{ color: '#000', fontWeight: '600', fontSize: 15, textAlignVertical: 'center', textTransform:'uppercase' }}>
                      {item?.invoice_no}
                    </Text>
                    <TouchableOpacity style={{ width: 20, height: 20, left: 10, justifyContent: 'center', top: 3 }} onPress={() => Clipboard.setString(item.invoice_no)}>
                      <MaterialCommunityIcons name="content-copy" size={16} color={'#000'} style={{ top: 2, left: 0 }} />
                    </TouchableOpacity>
                    <View style={[styles.subTitle, { height: 30, justifyContent: 'center' }]}>
                      <View style={item?.status == 'FAILED' ? styles.redCircle : styles.greenCircle} />
                      <Text style={item?.status == 'FAILED' ? styles.failureText : styles.successText}>{item?.status}</Text>
                    </View>
                  </View>
                  {item?.status == 'SUCCESS' && <View style={{ flexDirection: 'row', top: 5 }}>
                    <MaterialCommunityIcons name="check-circle-outline" size={16} color={'#70D777'} style={{ top: 2 }} />
                    <Text style={{ color: '#70D777', left: 5, textTransform: 'uppercase' }}>{item?.message}</Text>
                  </View>}
                  {item?.status == 'FAILED' &&
                    <View style={{ flexDirection: 'row', top: 5 }}>
                      <MaterialCommunityIcons name="information-outline" size={16} color={'#FF3535'} style={{ top: 2 }} />
                      <Text style={{ color: '#FF3535', left: 5, textTransform: 'capitalize' }}>{item?.message}</Text>
                    </View>
                  }

                  <View style={{ flexDirection: 'row', top: 15 }}>
                    <MaterialCommunityIcons name="calendar-month-outline" style={[styles.card_Datebox_icon]} />
                    <Text style={{ fontSize: 12, color: '#000' }}> {moment(item.createdDate).format('ddd')},</Text>
                    <Text style={{ fontSize: 12, color: '#000' }}> {moment(item.createdDate).format('ll')}</Text>
                  </View>

                  <View style={{ flexDirection: 'row', top: 30 }}>
                    <MaterialCommunityIcons name="account-circle-outline" style={[styles.card_Datebox_icon, { color: '#000' }]} />
                    <Text style={{ fontSize: 12, color: '#000', fontWeight: '600' }}> {item.emp_code} -{item?.emp_name ? item?.emp_name : 'N/A'}</Text>
                  </View>
                </View>


              </View>
            )


          })}

        </View>


        <View style={{ height: 120 }}></View>
      </ScrollView>

      {/* <Text style={{ top: 30, left: 20, fontSize: 14, color: '#000' }} >Enter Invoice Number</Text>
      {invoiceError && <Text style={{ color: 'red', top: 30, left: 25 }}>Invoice Number Required</Text>}
      <View style={{ paddingLeft: 20, paddingRight: 25 }}>
        <TextInput style={{ borderWidth: 1, borderRadius: 10, marginTop: 40 }}
          placeholder="Enter Invoice number"
          placeholderTextColor={'#000'}
          onChangeText={(text) => setInvoiceno(text)}
          value={invoiceno}
        />
      </View> */}

      {/* <View style={[styles.headingFrameInner, styles.ml10, { alignItems: 'flex-start' }]} >
        <Text style={{ top: 30, left: 40, fontSize: 14, color: '#000' }} >Add Screenshot Attachment</Text>

        <Pressable
          style={[styles.wrapper,
          styles.wrapperFlexBox, { alignSelf: 'flex-end' }
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
      <View style={{ justifyContent: 'center', marginTop: 10, marginBottom: 30, alignItems: 'flex-end', right: 30 }}>
        <TouchableHighlight
          style={styles.logout}
          onPress={() => getBarcodeDetails()}
        >
          <View >
            <Text style={{ fontWeight: '700', color: '#fff' }}>Submit</Text>
          </View>
        </TouchableHighlight>
      </View>
      {barcode?.length > 0 && <Image source={{ uri: barcode }}
        style={{ width: 200, height: 200, alignSelf: 'center' }}
      />}
      {
        showAddFile &&
        <View>
          {selectedFile && <>
            <View style={[styles.selectedFile, { flexDirection: 'row', left: 30 }]}>
              <Text>{selectedFile.name.length < 20 ? `${selectedFile.name}` : `${selectedFile.name.substring(0, 35)}...`}</Text>

              <Ionicons name="close-circle" style={{ left: 25 }} onPress={() => { setSelectedFile(); setShowAddFile(false) }} size={30} />
            </View>
          </>}

        </View>}

      {selectedFile && uploadResponse?.status == true &&
        <View>
          <View style={{ justifyContent: 'center', alignItems: "center" }}>
            <TouchableHighlight
              style={styles.circle}
              underlayColor='#ccc'>
              <MaterialIcons name="done-outline" color="green" size={104} style={{ top: 0 }} />
            </TouchableHighlight>
          </View>
          <Text style={{ alignSelf: "center", marginTop: 20, fontSize: 18, fontWeight: "bold" }}>Done</Text>
        </View>}

      {selectedFile && uploadResponse?.status == false &&
        <View>
          <View style={{ justifyContent: 'center', alignItems: "center" }}>
            <TouchableHighlight
              style={styles.circle}
              underlayColor='#ccc'>
              <MaterialIcons name="close" color="red" size={104} style={{ top: 0 }} />
            </TouchableHighlight>
          </View>
          <Text style={{ alignSelf: "center", marginTop: 20, fontSize: 18, fontWeight: "bold" }}>Verification Failed</Text>
          <Text style={{ alignSelf: "center", marginTop: 20, fontSize: 12 }}>Please Try Again</Text>
        </View>} */}

      <BottomSheet
        visible={filterVisible}
        //setting the visibility state of the bottom shee
        onBackButtonPress={() => setFilterVisible(!filterVisible)}
        // //Toggling the visibility state
        onBackdropPress={() => setFilterVisible(!filterVisible)}
      //Toggling the visibility state
      >
        {/*Bottom Sheet inner View*/}
        <View style={styles.bottomNavigationView}>
          <View
            style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', width: '80%', }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: '60%' }}>
                <Text style={{ padding: 20, fontSize: 20, color: '#000', textAlign: 'center', alignSelf: 'flex-end', fontWeight: '600' }}>Filter</Text>
              </View>
              <View style={{ width: '40%' }}>
                <MaterialCommunityIcons name="close" size={24} style={{ marginTop: Platform.OS === 'ios' ? 0 : 20, alignSelf: 'flex-end' }} onPress={() => setFilterVisible(!filterVisible)} />
              </View>
            </View>

            <View style={{ alignSelf: 'flex-start', width: '100%', }}>
              <View style={[styles.frameWrapper, { top: 3 }]}>
                <Text style={{ marginLeft: 10, bottom: 5, fontWeight: '600', color: '#000' }}>From</Text>
                <Pressable onPress={() => setOpenStartDate(true)} style={{ height: 40, borderRadius: 20 }}>
                  <View style={[styles.frameParent, styles.frameParentFlexBox, { borderWidth: 0.6, borderRadius: 15, borderColor: '#DBDBDB', height: 50, }]}>
                    {/* <DatePicker
                  modal
                  open={openStartDate}
                  date={startDate}
                  onConfirm={date => {
                    setOpenStartDate(false);
                    setStartDate(date);
                  }}
                  onCancel={() => {
                    setOpenStartDate(false);
                  }}
                /> */}
                    <DateTimePickerLib
                      visible={openStartDate}
                      onCancel={() => setOpenStartDate(false)}
                      onSelect={(data) => {
                        setStartDate(data);
                        setOpenStartDate(false);
                      }}
                      type={'date'}
                    />
                    <View
                      style={[
                        styles.recentActivityWrapper,
                        styles.ml17, styles.ml20,
                        styles.frameParentFlexBox,
                      ]}
                    >
                      <Pressable onPress={() => setOpenStartDate(true)}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                          <View style={{ width: dimensions_width - 150, }}>
                            <Pressable onPress={() => setOpenStartDate(true)}>
                              <TextInput
                                // style={{borderWidth:0.6}}
                                readOnly
                                label="Start Date"
                                variant="standard"
                                value={moment(startDate).format('ddd') + ', ' + moment(startDate).format('ll')}
                                editable={false}
                                style={{ color: "#000", top: Platform.OS === 'ios' ? 5 : 0, paddingLeft: 10, }}

                              />
                            </Pressable>
                          </View>

                          <MaterialCommunityIcons name="calendar-month-outline" size={24} style={{ marginTop: Platform.OS === 'ios' ? 0 : 10, right: 8 }} />

                          {/* 
                        {Platform.OS === 'android' && (
                          <Ionicons style={{ marginTop: 5, }}
                            name='calendar' size={22}
                            solid
                          />
                        )} */}

                        </View>
                      </Pressable>
                    </View>
                  </View>
                </Pressable>
              </View>

              {/* End date starts */}
              <Text style={{ marginLeft: 10, fontWeight: '600', top: 25, color: '#000' }}>To</Text>


              <View style={[styles.frameParentFlexBox, { paddingTop: 20, marginBottom: 30, width: dimensions_width - 80, top: 30 }]}>

                <DateTimePickerLib
                  minDate={new Date(startDate)}
                  visible={openDueDate}
                  onCancel={() => setOpenDueDate(false)}
                  onSelect={(data) => {
                    setDueDate(data);
                    setOpenDueDate(false);
                  }}
                  type={'date'}
                />
                <View
                  style={[
                    styles.recentActivityWrapper,

                    styles.frameParentFlexBox,
                    { borderWidth: 0.5, height: 60, borderRadius: 15, top: -20, borderColor: '#DBDBDB', height: 50, }
                  ]}
                >

                  <View style={{ flexDirection: 'row', }}>
                    {/* <View style={{ width: dimensions_width - 160, backgroundColor:'red'}}> */}
                    <TouchableOpacity onPress={() => setOpenDueDate(true)} style={{ width: dimensions_width - 155, height: 50, }} >
                      <TextInput
                        style={[
                          styles.recentActivityWrapper,
                          styles.ml17, styles.ml20,
                          styles.frameParentFlexBox, { color: '#000', top: Platform.OS === 'ios' ? 10 : 0, width: dimensions_width - 160, paddingLeft: 10 }
                        ]}
                        onPress={() => setOpenDueDate(true)}
                        label="Due Date"
                        variant="standard"
                        value={moment(dueDate).format('ddd') + ', ' + moment(dueDate).format('ll')}
                        editable={false}

                      />
                    </TouchableOpacity>
                    {/* </View> */}

                    <MaterialCommunityIcons name="calendar-month-outline" size={24} style={{ marginTop: Platform.OS === 'ios' ? 5 : 10, marginLeft: 'auto', right: 10 }} onPress={() => setOpenDueDate(true)} />
                  </View>

                </View>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => clearAllfilters()}>
                  <Text style={{ fontWeight: '600' }}>CLEAR ALL</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.ApplyButton}
                  onPress={() => filtersApply()}>
                  <Text style={{ fontWeight: '600', color: '#fff' }}>APPLY</Text>
                </TouchableOpacity>

              </View>

              <View style={{ height: 80, }}></View>
              {/* </View> */}



            </View>
          </View>
        </View>
        {/* <AddSubTask id={taskId} /> */}
      </BottomSheet>
      <Spinner
        //visibility of Overlay Loading Spinner
        visible={loading || isLoading}
        //Text with the Spinner
        textContent={'Loading...'}

        //Text style of the Spinner Text
        textStyle={[styles.spinnerTextStyle, { color: '#fff' }]}
      />
      {/* <TouchableOpacity style={{ top: 20, backgroundColor: 'rgba(11, 11, 11, 0.25)', justifyContent: 'center', alignItems: 'center', height: 30 }}
                onPress={() => openCamera()}
            >

                <Text>NEXT</Text></TouchableOpacity> */}

    </View>

  );
};

const styles = StyleSheet.create({
  circle: {
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    width: Dimensions.get('window').width * 0.4,
    height: Dimensions.get('window').width * 0.4,
    backgroundColor: '#fff',
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
  headingFrameInner: { marginLeft: 'auto', right: 20, bottom: 5 },
  ml10: {
    marginLeft: 10,
  },
  logout: { width: '20%', height: 40, backgroundColor: 'rgb(251, 144, 19)', justifyContent: 'center', alignItems: 'center', top: 10, borderRadius: 5 },
  card_TaskList: { backgroundColor: 'white', borderRadius: 8, marginBottom: 16, overflow: 'hidden', shadowColor: 'rgba(0,0,0,0.2)', shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, shadowOpacity: 0.1, elevation: 8, height: 135, borderColor: 'rgba(230, 230, 230, 1)', borderWidth: 0.8 },
  subTitle: { marginLeft: 'auto', marginRight: 5, flexDirection: 'row', },
  redCircle: { width: 15, height: 15, backgroundColor: '#FF7878', borderRadius: 15, marginLeft: 'auto', right: 5, alignSelf: 'center' },
  greenCircle: { width: 15, height: 15, backgroundColor: '#70D777', borderRadius: 15, marginLeft: 'auto', right: 5, alignSelf: 'center' },
  successText: { color: '#70D777', fontWeight: '600', alignSelf: 'center' },
  failureText: { color: '#FF7878', fontWeight: '600', alignSelf: 'center' },
  card_Datebox_icon: { fontSize: 16, color: "#8FA2CB" },
  bottomNavigationView: {
    backgroundColor: '#fff',
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
    padding: 5,
    height: 40,

  },
  ApplyButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
    padding: 5,
    height: 40,
    backgroundColor: 'rgb(251, 144, 19)',
    paddingLeft: 20, paddingRight: 20
  }




});

export default PhoneVerification;
