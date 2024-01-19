import * as React from "react";
import { Image, StyleSheet, View, Text, TextInput, Button, Pressable, ScrollView, BackHandler, Alert, Dimensions, ImageBackground, LayoutAnimation, SafeAreaView, TouchableHighlight } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { DataTable, Card } from 'react-native-paper';
import ScreenWrapper from "../../ScreenWrapper";
import { getDayReports, getDiscountHistory,updateDayreports,getReportsReference } from "../../reducers/cashDiscount";
import Spinner from 'react-native-loading-spinner-overlay';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import DateTimePickerLib from '@oman21/rn-datetimepicker';
import moment from 'moment'
import { SelectList, MultipleSelectList } from 'react-native-dropdown-select-list'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DatePickerModal } from 'react-native-paper-dates';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    secondaryContainer: 'yellow',
    primary:'rgb(251, 144, 19)'
  },
};
const dimensions_width = Dimensions.get('window').width
const Dayreports = () => {
    const navigation = useNavigation();
    const [steps, setSteps] = React.useState('1');
    const dispatch = useDispatch()
    const [startDate, setStartDate] = React.useState(new Date());
    const [openStartDate, setOpenStartDate] = React.useState(false);
    const [dueDate, setDueDate] = React.useState(new Date());
    const [openDueDate, setOpenDueDate] = React.useState(false);
    const [selectedFilter, setSelectedFilter] = React.useState()
    const dayWiseReports = useSelector(state => state.cashDiscount.dayWiseReports)
    const [brandName, setBrandName] = React.useState();
    const [storeIndex, setStoreIndex] = React.useState(-1);
    const [brandIndex, setBrandIndex] = React.useState(-1);
    const [referenceIndex, setReferenceIndex] = React.useState(-1);
    const [currentRow, setCurrentRow] = React.useState();
    const [startDateValidationError, setStartDateValidationError] = React.useState(false)
    const loading = useSelector(state => state.cashDiscount.isLoading)
    let prevDate;
    prevDate= new Date(startDate)
    prevDate.setDate(prevDate.getDate() - 1)
    const filterList = [
        {
            key: 'store',
            value: 'store'
        }, {
            key: 'brand',
            value: 'brand'
        },
    ]
    const getReports = () => {
        let payload = {
            startDate: startDate,
            endDate: dueDate,
            filterby: selectedFilter
        }
        if (selectedFilter) {
            dispatch(getDayReports(payload))
        }
    }

    const clickHandler = (index) => {
        if (index == storeIndex) {
            setStoreIndex(-1)
            setBrandIndex(-1)
        } else {
            setStoreIndex(index);
            setBrandIndex(-1)
        }
    };
    const brandClick = (index) => {
        if (index == brandIndex) {
            setBrandIndex(-1)
            setReferenceIndex(-1)
        } else {
            setBrandIndex(index)
            setReferenceIndex(-1)
        }
    }

    const modalClick = (index) => {
        if (index == referenceIndex) {
            setReferenceIndex(-1)
        } else {
            setReferenceIndex(index)
        }
    }
    const getHistoryDetails = (referenceId) => {
        AsyncStorage.getItem('employeeData').then((user) => {
            let payload = {
                reference: referenceId
            }
            dispatch(getReportsReference(payload)).then((res) => {
                //   setDiscountData(res.payload)
                navigation.navigate('HistoryDetails', res?.payload[0])
            })
        })
    }
    const onConfirmStart= React.useCallback(
        (params) => {
            console.log('params', params)
            if (params.date > dueDate) {
                setStartDateValidationError(true)   
                setOpenStartDate(false);
            } else {
                setStartDateValidationError(false)
                setStartDate(params.date);
                setOpenStartDate(false);

            }
          setOpenStartDate(false);
          setStartDate(params.date);
        },
        [openStartDate, startDate,dueDate]
      );

      const onDismissStart = React.useCallback(() => {
        setOpenStartDate(false);
      }, [openStartDate]);

      const onConfirmDue= React.useCallback(
        (params) => {
          setOpenDueDate(false);
          setDueDate(params.date);
          if (params.date < dueDate) {
          setStartDateValidationError(false)   
          }
        },
        [openDueDate, dueDate]
      );

      const onDismissDue = React.useCallback(() => {
        setOpenDueDate(false);
      }, [openDueDate]);

    React.useEffect(() => {
        dispatch(updateDayreports());
    },[])
    return (
        <PaperProvider theme={theme}>
        <ScrollView>
            <View style={styles.container}>
            <Spinner
                    visible={loading}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />
                <View style={[styles.frameWrapper, { top: 3, display: "flex", flexDirection: "row", alignItems: "center" }]}>

                    <Text style={{ bottom: 5, fontWeight: '400', width: 80, color: "#000" }}> Start Date : </Text>
                    <Pressable onPress={() => setOpenStartDate(true)} style={{ height: 40, borderRadius: 20, alignItems: "center" }}>
                        <View style={[styles.frameParent, styles.frameParentFlexBox, { borderWidth: 0.6, borderRadius: 15, borderColor: '#DBDBDB', height: 40 }]}>

                            {/* <DateTimePickerLib
                                type="date"
                                visible={openStartDate}
                                onCancel={() => {
                                    setOpenStartDate(false)
                                    setStartDateValidationError(false)
                                }}
                                onSelect={(data) => {
                                    if (data > dueDate) {
                                        setStartDateValidationError(true)
                                        setOpenStartDate(false);
                                    } else {
                                        setStartDateValidationError(false)
                                        setStartDate(data);
                                        setOpenStartDate(false);

                                    }
                                }}
                            /> */}
                             <DatePickerModal
                                mode="single"
                                visible={openStartDate}
                                onDismiss={onDismissStart}
                                date={startDate}
                                onConfirm={onConfirmStart}
                                label="Select Start date and Due Date"
                                // onConfirm={(data) => {
                                //     if (data > dueDate) {
                                //         setStartDateValidationError(true)
                                //         setOpenStartDate(false);
                                //     } else {
                                //         setStartDateValidationError(false)
                                //         setStartDate(data);
                                //         setOpenStartDate(false);

                                //     }
                                // }}
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
                                                    value={moment(startDate).format('ll')}
                                                    editable={false}
                                                    style={{ color: "#000", top: Platform.OS === 'ios' ? 5 : 0 }}

                                                />
                                            </Pressable>
                                        </View>

                                        <MaterialCommunityIcons name="calendar-month-outline" size={24} style={{ color: "#000", marginTop: Platform.OS === 'ios' ? 0 : 5 }} />

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
                {startDateValidationError && <Text style={{ color: 'red' }}>Start Date must be less or equal to Due date  </Text>}
                <View style={[styles.frameWrapper, { top: 3, display: "flex", flexDirection: "row", alignItems: "center", marginTop: 30 }]}>
                    <Text style={{ bottom: 5, fontWeight: '400', width: 80, color: '#000' }}>Due Date  : </Text>
                    <Pressable onPress={() => setOpenDueDate(true)} style={{ height: 40, borderRadius: 20, alignItems: "center" }}>
                        <View style={[styles.frameParent, styles.frameParentFlexBox, { borderWidth: 0.6, borderRadius: 15, borderColor: '#DBDBDB', height: 40 }]}>
                            <ScrollView>
                                {/* <DateTimePickerLib
                                    type="date"
                                    minDate={new Date(prevDate)}
                                    visible={openDueDate}
                                    onCancel={() => setOpenDueDate(false)}
                                    onSelect={(data) => {
                                        setDueDate(data);
                                        setOpenDueDate(false);
                                    }}
                                /> */}
                                 <DatePickerModal
                                mode="single"
                                visible={openDueDate}
                                onDismiss={onDismissDue}
                                date={dueDate}
                                onConfirm={onConfirmDue}
                                label="Select Due date"
                                validRange={{ startDate: startDate, endDate: undefined }}
                                />
                            </ScrollView>
                            <View
                                style={[
                                    styles.recentActivityWrapper,
                                    styles.ml17, styles.ml20,
                                    styles.frameParentFlexBox,
                                ]}
                            >
                                <Pressable onPress={() => setOpenDueDate(true)}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                        <View style={{ width: dimensions_width - 150, }}>
                                            <Pressable onPress={() => setOpenDueDate(true)}>
                                                <TextInput
                                                    // style={{borderWidth:0.6}}
                                                    readOnly
                                                    label="Start Date"
                                                    variant="standard"
                                                    value={moment(dueDate).format('ll')}
                                                    editable={false}
                                                    style={{ color: "#000", top: Platform.OS === 'ios' ? 5 : 0 }}

                                                />
                                            </Pressable>
                                        </View>

                                        <MaterialCommunityIcons name="calendar-month-outline" size={24} style={{ color: '#000', marginTop: Platform.OS === 'ios' ? 0 : 5 }} />

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
                <View style={{ paddingRight: 5, marginTop: 30 }}>
                    <SelectList
                        setSelected={(val) => setSelectedFilter(val)}
                        data={filterList}
                        save="key"
                        search={false}
                        boxStyles={styles.textInput}
                        dropdownStyles={{
                            width: '100%', borderWidth: 1,
                            borderColor: '#c8c8c8', backgroundColor: '#fff'
                        }}
                        placeholder='Select...'
                        inputStyles={{ left: -5, top: 2, color: '#000' }}
                        onSelect={() => console.log('selected')}
                        dropdownTextStyles={{ color: '#000'}}
                    // defaultOption={{ key:'null', value:'All Tickets' }} 

                    />
                </View>
                <View style={{ justifyContent: 'center', marginLeft: 20, marginTop: 10, marginBottom: 30, width: '90%' }}>
                    <TouchableHighlight
                        style={styles.logout}
                        onPress={() => getReports()}
                        disabled={startDateValidationError}
                    >
                        <View
                            style={{
                                ...styles.button
                                // backgroundColor: isLoading ? "#4caf50" : "#8bc34a",
                            }}
                        >
                            {/* {loading && <ActivityIndicator size="small" color="#fff" />} */}
                            <View >
                                <Text style={{ fontWeight: '700', color: '#fff' }}>Submit</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                </View>
                {dayWiseReports?.data?.length == 0 &&  <View style = {{display:'flex',justifyContent:'center',alignItems:'center'}}>
              <Text style={{color:'#000'}}>No Data Found</Text>
                </View>}

                {dayWiseReports?.data?.length > 0 && dayWiseReports?.data[0]?.hasOwnProperty('store_name') && <ScreenWrapper contentContainerStyle={{ minHeight: 700 }} style={{ top: 5 }}>
                    <ScrollView horizontal>
                        <DataTable style={{ backgroundColor: 'none' }}>
                            <DataTable.Header>
                                <DataTable.Title
                                    style={{ justifyContent: 'center', width: 60 }}
                                    textStyle={{ fontWeight: '700' }}
                                ></DataTable.Title>
                                <DataTable.Title
                                    style={{ width: 140, justifyContent: 'center' }}
                                    textStyle={{ fontWeight: '700' }}
                                >Store Name</DataTable.Title>
                                <DataTable.Title numeric style={{ width: 120, justifyContent: 'center', }} textStyle={{ fontWeight: '700' }}>Total Approved</DataTable.Title>
                                <DataTable.Title numeric style={{ width: 120, justifyContent: 'center', }} textStyle={{ fontWeight: '700' }}>Handset Price</DataTable.Title>
                                <DataTable.Title numeric style={{ width: 120, justifyContent: 'center', }} textStyle={{ fontWeight: '700' }}>Discount Price</DataTable.Title>
                                <DataTable.Title numeric style={{ width: 120, justifyContent: 'center', }} textStyle={{ fontWeight: '700' }}>Discount Percentage</DataTable.Title>
                            </DataTable.Header>

                            {dayWiseReports?.data?.map((item, index) => (
                                <>
                                    <DataTable.Row style={{ borderBottomWidth: 1, zIndex: -1, backgroundColor: 'white', elevation: index == currentRow ? 5 : 0, }} onPress={() => clickHandler(index)}>
                                        <DataTable.Cell style={{ justifyContent: 'center' }} textStyle={{ color: '#349fbf', fontWeight: '600' }}> <MaterialCommunityIcons name={index == storeIndex ? 'minus' : 'plus'} size={15} solid color='#349fbf' /> </DataTable.Cell>
                                        <DataTable.Cell style={{ width: 100, justifyContent: 'center' }} textStyle={{ color: '#349fbf', fontWeight: '600' }}>{item?.store_name}
                                        </DataTable.Cell>
                                        <DataTable.Cell style={{ width: 70, justifyContent: 'center' }} textStyle={{ color: '#349fbf', fontWeight: '600' }}>{item?.ApprovedCount}</DataTable.Cell>
                                        <DataTable.Cell style={{ width: 70, justifyContent: 'center' }} textStyle={{ color: '#349fbf', fontWeight: '600' }}>{item?.total_price}</DataTable.Cell>
                                        <DataTable.Cell style={{ width: 70, justifyContent: 'center' }} textStyle={{ color: '#349fbf', fontWeight: '600' }}>{item?.discount_price}</DataTable.Cell>
                                        <DataTable.Cell style={{ width: 70, justifyContent: 'center' }} textStyle={{ color: '#349fbf', fontWeight: '600' }}>{item?.discount_percentage.toFixed(2)}</DataTable.Cell>
                                    </DataTable.Row>
                                    {index == storeIndex && <DataTable style={{ backgroundColor: 'none', paddingLeft: 25 }}>
                                        <DataTable.Header>
                                            <DataTable.Title
                                                style={{ width: 70, justifyContent: 'center' }}
                                                textStyle={{ fontWeight: '700' }}
                                            ></DataTable.Title>
                                            <DataTable.Title
                                                style={{ width: 140, justifyContent: 'center' }}
                                                textStyle={{ fontWeight: '700' }}
                                            >Brand Name</DataTable.Title>
                                            <DataTable.Title numeric style={{ width: 120, justifyContent: 'center' }} textStyle={{ fontWeight: '700' }}>Total Approved</DataTable.Title>
                                            <DataTable.Title numeric style={{ width: 120, justifyContent: 'center' }} textStyle={{ fontWeight: '700' }}>Handset Price</DataTable.Title>
                                            <DataTable.Title numeric style={{ width: 120, justifyContent: 'center' }} textStyle={{ fontWeight: '700' }}>Discount Price</DataTable.Title>
                                            <DataTable.Title numeric style={{ width: 120, justifyContent: 'center' }} textStyle={{ fontWeight: '700' }}>Discount Percentage</DataTable.Title>
                                        </DataTable.Header>
                                        {
                                            item?.brands?.map((brand, bindex) => {
                                                return (
                                                    <>
                                                        <DataTable.Row style={{ borderBottomWidth: 1, zIndex: -1, backgroundColor: 'white' }} onPress={() => brandClick(bindex)}>
                                                            <DataTable.Cell style={{ justifyContent: 'center' }} textStyle={{ color: '#349fbf', fontWeight: '400' }}> <MaterialCommunityIcons name={bindex == brandIndex ? 'minus' : 'plus'} size={15} solid color='#349fbf' /> </DataTable.Cell>
                                                            <DataTable.Cell style={{ width: 100, justifyContent: 'center' }} textStyle={{ color: '#de6c3c', fontWeight: '600' }}>{brand?.brand}
                                                            </DataTable.Cell>
                                                            <DataTable.Cell style={{ width: 70, justifyContent: 'center' }} textStyle={{ color: '#de6c3c', fontWeight: '600' }}>{brand?.ApprovedCount}</DataTable.Cell>
                                                            <DataTable.Cell style={{ width: 70, justifyContent: 'center' }} textStyle={{ color: '#de6c3c', fontWeight: '600' }}>{brand?.total_price}</DataTable.Cell>
                                                            <DataTable.Cell style={{ width: 70, justifyContent: 'center' }} textStyle={{ color: '#de6c3c', fontWeight: '600' }}>{brand?.discount_price}</DataTable.Cell>
                                                            <DataTable.Cell style={{ width: 70, justifyContent: 'center' }} textStyle={{ color: '#de6c3c', fontWeight: '600' }}>{brand?.discount_percentage.toFixed(2)}</DataTable.Cell>
                                                        </DataTable.Row>
                                                        {bindex == brandIndex && <DataTable style={{ backgroundColor: 'none', paddingLeft: 100 }}>
                                                            <DataTable.Header>
                                                                <DataTable.Title
                                                                    style={{ width: 70, justifyContent: 'center' }}
                                                                    textStyle={{ fontWeight: '700' }}
                                                                ></DataTable.Title>
                                                                <DataTable.Title
                                                                    style={{ width: 120, justifyContent: 'center' }}
                                                                    textStyle={{ fontWeight: '700' }}
                                                                >Model Name</DataTable.Title>
                                                                <DataTable.Title numeric style={{ width: 150, justifyContent: 'center' }} textStyle={{ fontWeight: '700' }}>Total Approved</DataTable.Title>
                                                                <DataTable.Title numeric style={{ width: 120, justifyContent: 'center' }} textStyle={{ fontWeight: '700' }}>Handset Price</DataTable.Title>
                                                                <DataTable.Title numeric style={{ width: 120, justifyContent: 'center' }} textStyle={{ fontWeight: '700' }}>Discount Price</DataTable.Title>
                                                                <DataTable.Title numeric style={{ width: 120, justifyContent: 'center' }} textStyle={{ fontWeight: '700' }}>Discount Percentage</DataTable.Title>
                                                            </DataTable.Header>

                                                            {brand.model.length && brand.model?.map((eachModel, mIndex) => {
                                                                return (
                                                                    <>
                                                                        <DataTable.Row style={{ borderBottomWidth: 1, zIndex: -1 }} onPress={() => modalClick(mIndex)}>
                                                                            <DataTable.Cell style={{ justifyContent: 'center' }} textStyle={{ color: '#349fbf', fontWeight: '400' }}> <MaterialCommunityIcons name={mIndex == referenceIndex ? 'minus' : 'plus'} size={15} solid color='#349fbf' /> </DataTable.Cell>
                                                                            <DataTable.Cell style={{ width: 100, justifyContent: 'center' }} textStyle={{ color: '#0B6520', fontWeight: '600' }}>{eachModel?.model}</DataTable.Cell>
                                                                            <DataTable.Cell style={{ width: 70, justifyContent: 'center' }} textStyle={{ color: '#0B6520', fontWeight: '600' }}>{eachModel?.ApprovedCount}</DataTable.Cell>
                                                                            <DataTable.Cell style={{ width: 70, justifyContent: 'center' }} textStyle={{ color: '#0B6520', fontWeight: '600' }}>{eachModel?.total_price}</DataTable.Cell>
                                                                            <DataTable.Cell style={{ width: 70, justifyContent: 'center' }} textStyle={{ color: '#0B6520', fontWeight: '600' }}>{eachModel?.discount_price}</DataTable.Cell>
                                                                            <DataTable.Cell style={{ width: 70, justifyContent: 'center' }} textStyle={{ color: '#0B6520', fontWeight: '600' }}>{eachModel?.discount_percentage.toFixed(2)}</DataTable.Cell>
                                                                        </DataTable.Row>
                                                                        {mIndex == referenceIndex && <DataTable style={{ backgroundColor: 'none', paddingLeft: 100 }}>
                                                                            <DataTable.Header>
                                                                                <DataTable.Title
                                                                                    style={{ width: 120, justifyContent: 'center' }}
                                                                                    textStyle={{ fontWeight: '700' }}
                                                                                >Reference ID</DataTable.Title>
                                                                                <DataTable.Title numeric style={{ width: 150, justifyContent: 'center' }} textStyle={{ fontWeight: '700' }}>Total Approved</DataTable.Title>
                                                                                <DataTable.Title numeric style={{ width: 120, justifyContent: 'center' }} textStyle={{ fontWeight: '700' }}>Handset Price</DataTable.Title>
                                                                                <DataTable.Title numeric style={{ width: 120, justifyContent: 'center' }} textStyle={{ fontWeight: '700' }}>Discount Price</DataTable.Title>
                                                                                <DataTable.Title numeric style={{ width: 120, justifyContent: 'center' }} textStyle={{ fontWeight: '700' }}>Discount Percentage</DataTable.Title>
                                                                            </DataTable.Header>
                                                                            {eachModel.modelArray.length && eachModel.modelArray?.map((eachReference, Index) => {
                                                                                return (
                                                                                    <DataTable.Row style={{ borderBottomWidth: 1, zIndex: -1 }} onPress={() => getHistoryDetails(eachReference?.reference_no)}>
                                                                                        <DataTable.Cell style={{ width: 100, justifyContent: 'center' }} textStyle={{ color: '#3C0FF2', fontWeight: '600' }}>{eachReference?.reference_no}</DataTable.Cell>
                                                                                        <DataTable.Cell style={{ width: 70, justifyContent: 'center' }} textStyle={{ color: '#3C0FF2', fontWeight: '600' }}>{eachReference?.ApprovedCount}</DataTable.Cell>
                                                                                        <DataTable.Cell style={{ width: 70, justifyContent: 'center' }} textStyle={{ color: '#3C0FF2', fontWeight: '600' }}>{eachReference?.total_price}</DataTable.Cell>
                                                                                        <DataTable.Cell style={{ width: 70, justifyContent: 'center' }} textStyle={{ color: '#3C0FF2', fontWeight: '600' }}>{eachReference?.discount_price}</DataTable.Cell>
                                                                                        <DataTable.Cell style={{ width: 70, justifyContent: 'center' }} textStyle={{ color: '#3C0FF2', fontWeight: '600' }}>{eachReference?.discount_percentage.toFixed(2)}</DataTable.Cell>
                                                                                    </DataTable.Row>

                                                                                )
                                                                            })}
                                                                        </DataTable>
                                                                        }
                                                                    </>
                                                                )

                                                            })}
                                                        </DataTable>}
                                                    </>
                                                )
                                            })}
                                    </DataTable>}
                                </>
                            ))
                            }
                        </DataTable>
                    </ScrollView>
                </ScreenWrapper>}
                {dayWiseReports?.data?.length > 0 && dayWiseReports?.data[0]?.brand && <ScreenWrapper contentContainerStyle={{ minHeight: 700 }} style={{ top: 5 }}>
                    <ScrollView horizontal>
                        <DataTable style={{ backgroundColor: 'none' }}>
                            <DataTable.Header>
                                <DataTable.Title
                                    style={{ justifyContent: 'center', width: 60 }}
                                    textStyle={{ fontWeight: '700' }}
                                ></DataTable.Title>
                                <DataTable.Title
                                    style={{ width: 140, justifyContent: 'center' }}
                                    textStyle={{ fontWeight: '700' }}
                                >Brand Name</DataTable.Title>
                                <DataTable.Title numeric style={{ width: 120, justifyContent: 'center', }} textStyle={{ fontWeight: '700' }}>Total Approved</DataTable.Title>
                                <DataTable.Title numeric style={{ width: 120, justifyContent: 'center', }} textStyle={{ fontWeight: '700' }}>Handset Price</DataTable.Title>
                                <DataTable.Title numeric style={{ width: 120, justifyContent: 'center', }} textStyle={{ fontWeight: '700' }}>Discount Price</DataTable.Title>
                                <DataTable.Title numeric style={{ width: 120, justifyContent: 'center', }} textStyle={{ fontWeight: '700' }}>Discount Percentage</DataTable.Title>
                            </DataTable.Header>
                            {dayWiseReports?.data?.map((item, bindex) => (
                                <>
                                    <DataTable.Row style={{ borderBottomWidth: 1, zIndex: -1, backgroundColor: 'white', elevation: bindex == currentRow ? 5 : 0, }} onPress={() => brandClick(bindex)}>
                                        <DataTable.Cell style={{ justifyContent: 'center' }} textStyle={{ color: '#349fbf', fontWeight: '600' }}> <MaterialCommunityIcons name={bindex == brandIndex ? 'minus' : 'plus'} size={15} solid color='#349fbf' /> </DataTable.Cell>
                                        <DataTable.Cell style={{ width: 100, justifyContent: 'center' }} textStyle={{ color: '#349fbf', fontWeight: '600' }}>{item?.brand}
                                        </DataTable.Cell>
                                        <DataTable.Cell style={{ width: 70, justifyContent: 'center' }} textStyle={{ color: '#349fbf', fontWeight: '600' }}>{item?.ApprovedCount}</DataTable.Cell>
                                        <DataTable.Cell style={{ width: 70, justifyContent: 'center' }} textStyle={{ color: '#349fbf', fontWeight: '600' }}>{item?.total_price}</DataTable.Cell>
                                        <DataTable.Cell style={{ width: 70, justifyContent: 'center' }} textStyle={{ color: '#349fbf', fontWeight: '600' }}>{item?.discount_price}</DataTable.Cell>
                                        <DataTable.Cell style={{ width: 70, justifyContent: 'center' }} textStyle={{ color: '#349fbf', fontWeight: '600' }}>{item?.discount_percentage.toFixed(2)}</DataTable.Cell>
                                    </DataTable.Row>

                                    {bindex == brandIndex && <DataTable style={{ backgroundColor: 'none', paddingLeft: 25 }}>
                                        <DataTable.Header>
                                            <DataTable.Title
                                                style={{ width: 70, justifyContent: 'center' }}
                                                textStyle={{ fontWeight: '700' }}
                                            ></DataTable.Title>
                                            <DataTable.Title
                                                style={{ width: 140, justifyContent: 'center' }}
                                                textStyle={{ fontWeight: '700' }}
                                            >Modal Name</DataTable.Title>
                                            <DataTable.Title numeric style={{ width: 120, justifyContent: 'center' }} textStyle={{ fontWeight: '700' }}>Total Approved</DataTable.Title>
                                            <DataTable.Title numeric style={{ width: 120, justifyContent: 'center' }} textStyle={{ fontWeight: '700' }}>Handset Price</DataTable.Title>
                                            <DataTable.Title numeric style={{ width: 120, justifyContent: 'center' }} textStyle={{ fontWeight: '700' }}>Discount Price</DataTable.Title>
                                            <DataTable.Title numeric style={{ width: 120, justifyContent: 'center' }} textStyle={{ fontWeight: '700' }}>Discount Percentage</DataTable.Title>
                                        </DataTable.Header>
                                        {item?.models?.length && item.models?.map((eachModel, mIndex) => {
                                            return (
                                                <>
                                                    <DataTable.Row style={{ borderBottomWidth: 1, zIndex: -1 }} onPress={() => modalClick(mIndex)}>
                                                        <DataTable.Cell style={{ justifyContent: 'center' }} textStyle={{ color: '#349fbf', fontWeight: '400' }}> <MaterialCommunityIcons name={mIndex == referenceIndex ? 'minus' : 'plus'} size={15} solid color='#349fbf' /> </DataTable.Cell>
                                                        <DataTable.Cell style={{ width: 100, justifyContent: 'center' }} textStyle={{ color: '#0B6520', fontWeight: '600' }}>{eachModel?.model}</DataTable.Cell>
                                                        <DataTable.Cell style={{ width: 70, justifyContent: 'center' }} textStyle={{ color: '#0B6520', fontWeight: '600' }}>{eachModel?.ApprovedCount}</DataTable.Cell>
                                                        <DataTable.Cell style={{ width: 70, justifyContent: 'center' }} textStyle={{ color: '#0B6520', fontWeight: '600' }}>{eachModel?.total_price}</DataTable.Cell>
                                                        <DataTable.Cell style={{ width: 70, justifyContent: 'center' }} textStyle={{ color: '#0B6520', fontWeight: '600' }}>{eachModel?.discount_price}</DataTable.Cell>
                                                        <DataTable.Cell style={{ width: 70, justifyContent: 'center' }} textStyle={{ color: '#0B6520', fontWeight: '600' }}>{eachModel?.discount_percentage.toFixed(2)}</DataTable.Cell>
                                                    </DataTable.Row>
                                                    {mIndex == referenceIndex && <DataTable style={{ backgroundColor: 'none', paddingLeft: 100 }}>
                                                        <DataTable.Header>
                                                            <DataTable.Title
                                                                style={{ width: 120, justifyContent: 'center' }}
                                                                textStyle={{ fontWeight: '700' }}
                                                            >Reference ID</DataTable.Title>
                                                            <DataTable.Title numeric style={{ width: 150, justifyContent: 'center' }} textStyle={{ fontWeight: '700' }}>Total Approved</DataTable.Title>
                                                            <DataTable.Title numeric style={{ width: 120, justifyContent: 'center' }} textStyle={{ fontWeight: '700' }}>Handset Price</DataTable.Title>
                                                            <DataTable.Title numeric style={{ width: 120, justifyContent: 'center' }} textStyle={{ fontWeight: '700' }}>Discount Price</DataTable.Title>
                                                            <DataTable.Title numeric style={{ width: 120, justifyContent: 'center' }} textStyle={{ fontWeight: '700' }}>Discount Percentage</DataTable.Title>
                                                        </DataTable.Header>
                                                        {eachModel.modelArray.length && eachModel.modelArray?.map((eachReference, Index) => {
                                                            return (
                                                                <DataTable.Row style={{ borderBottomWidth: 1, zIndex: -1 }} onPress={() => getHistoryDetails(eachReference?.reference_no)}>
                                                                    <DataTable.Cell style={{ width: 100, justifyContent: 'center' }} textStyle={{ color: '#3C0FF2', fontWeight: '600' }}>{eachReference?.reference_no}</DataTable.Cell>
                                                                    <DataTable.Cell style={{ width: 70, justifyContent: 'center' }} textStyle={{ color: '#3C0FF2', fontWeight: '600' }}>{eachReference?.ApprovedCount}</DataTable.Cell>
                                                                    <DataTable.Cell style={{ width: 70, justifyContent: 'center' }} textStyle={{ color: '#3C0FF2', fontWeight: '600' }}>{eachReference?.total_price}</DataTable.Cell>
                                                                    <DataTable.Cell style={{ width: 70, justifyContent: 'center' }} textStyle={{ color: '#3C0FF2', fontWeight: '600' }}>{eachReference?.discount_price}</DataTable.Cell>
                                                                    <DataTable.Cell style={{ width: 70, justifyContent: 'center' }} textStyle={{ color: '#3C0FF2', fontWeight: '600' }}>{eachReference?.discount_percentage.toFixed(2)}</DataTable.Cell>
                                                                </DataTable.Row>

                                                            )
                                                        })}
                                                    </DataTable>}
                                                </>
                                            )
                                        })}
                                    </DataTable>}
                                </>
                            ))}

                        </DataTable>
                    </ScrollView>
                </ScreenWrapper>}

            </View>
        </ScrollView>
        </PaperProvider>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            justifyContent: 'center',
            flex: 1,
            margin: 20
            // alignItems:'center'
        },
        spinnerTextStyle: {
            color: '#FFF',
        },
        frameParent: {
            // width: dimensions_width - 100,
            height: 57,
            alignItems: "center",
            marginBottom: 20
        },
        frameParentFlexBox: {
            alignItems: "center",
            flexDirection: "row",
        },

        frameParentFlexBox: {
            alignItems: "center",
            flexDirection: "row",
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
        },
        logout: { height: 40, backgroundColor: 'rgb(251, 144, 19)', justifyContent: 'center', alignItems: 'center', top: 10, borderRadius: 5 },
    }
)

export default Dayreports;