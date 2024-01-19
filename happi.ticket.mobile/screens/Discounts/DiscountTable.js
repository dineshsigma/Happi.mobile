import * as React from "react";
import { Image, StyleSheet, View, Text, TextInput, Button, Pressable, ScrollView, BackHandler, Alert, Dimensions, ImageBackground, LayoutAnimation, SafeAreaView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { DataTable, Card } from 'react-native-paper';
import ScreenWrapper from "../../ScreenWrapper";
import { getStoreReports, getBrandReports, getModelReports } from "../../reducers/cashDiscount";
import Spinner from 'react-native-loading-spinner-overlay';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { AccordionList } from 'accordion-collapse-react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const DiscountTable = () => {
    const navigation = useNavigation();
    const [steps, setSteps] = React.useState('1');
    const dispatch = useDispatch()
    const storeReports = useSelector(state => state.cashDiscount.storeReports)
    const [brandRepo, setBrandRepo] = React.useState();
    const [modelRepo, setModelRepo] = React.useState();
    const [storeName, setStoreName] = React.useState('');
    const loading = useSelector(state => state.cashDiscount.isLoading);
    const [currentRow, setCurrentRow] = React.useState();
    const [currentBrandRow, setCurrentBrandRow] = React.useState();
    const [brandName, setBrandName] = React.useState();
    const [storeIndex, setStoreIndex] = React.useState(-1);
    const [brandIndex, setBrandIndex] = React.useState(-1);

    React.useEffect(() => {
        dispatch(getStoreReports())
    }, [])

    const goToStepTwo = (storename, index) => {
        setCurrentRow()
        setCurrentBrandRow()
        setSteps('2')
        const filterData = storeReports?.data?.filter(item => item.store_name == storename)
        setBrandRepo(filterData[0]?.brands)
        setCurrentRow(index)
        setStoreName(storename)
    }
    const goToStepThree = (brandname, index) => {
        setCurrentBrandRow()
        setSteps('3')
        setCurrentBrandRow(index)
        const filteredBranch = brandRepo?.filter(item => item.brand == brandname)
        setModelRepo(filteredBranch[0]?.model)
        setBrandName(brandname)
    }

    const clickHandler = (index) => {
        if (index == storeIndex) {
            setStoreIndex(-1)
            setBrandIndex(-1)
        }else{
            setStoreIndex(index);
            setBrandIndex(-1)
        }
    };
    const brandClick = (index) => {
        if(index == brandIndex){
            setBrandIndex(-1)
        }else {
        setBrandIndex(index)
        }
    }
    return (
        <View style={styles.container}>
            <ScrollView style={{ top: 5 }}>
                {steps == 2 &&
                    <ImageBackground source={require('../../assets/Step_1.png')} style={{ width: 130, height: 35, justifyContent: 'center', alignItems: 'center', padding: 10, left: 10 }}>
                        <Pressable onPress={() => setSteps('1')} style={{ width: 100 }}>
                            <Text style={{ textDecorationLine: 'underline', fontSize: 12, alignSelf: 'center', width: 'auto' }}>{storeName.length < 10 ? `${storeName}` : `${storeName.substring(0, 10)}...`}</Text>
                        </Pressable>
                    </ImageBackground>
                }
                {steps == 3 &&
                    <View style={{ flexDirection: 'row', }}>
                        <ImageBackground source={require('../../assets/Step_1.png')} style={{ width: 130, height: 35, justifyContent: 'center', alignItems: 'center', padding: 10, left: 10 }}>
                            <Pressable onPress={() => setSteps('1')} style={{ width: 100, alignItems: 'center' }}>
                                <Text style={{ textDecorationLine: 'underline', fontSize: 12 }}>{storeName.length < 10 ? `${storeName}` : `${storeName.substring(0, 10)}...`}</Text>
                            </Pressable>
                        </ImageBackground>
                        <ImageBackground source={require('../../assets/Step_3.png')} style={{ width: 130, height: 35, justifyContent: 'center', alignItems: 'center', padding: 10, left: -10 }}>
                            <Pressable onPress={() => setSteps('2')} style={{ width: 100, alignItems: 'center' }}>
                                <Text style={{ textDecorationLine: 'underline', fontSize: 12, }}>{brandName.length < 10 ? `${brandName}` : `${brandName.substring(0, 10)}...`}</Text>
                            </Pressable>
                        </ImageBackground>
                    </View>
                }
                <Spinner
                    visible={loading}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />
                {/* <ScreenWrapper contentContainerStyle={{ minHeight: 700 }} style={{ top: 5 }}>
                    <ScrollView horizontal>
                        {steps == 1 && <DataTable style={{ backgroundColor: 'none' }}>
                            <DataTable.Header>
                                <DataTable.Title
                                    style={{ width: 140, justifyContent: 'center' }}
                                    textStyle={{ fontWeight: '700' }}
                                >Store Name</DataTable.Title>
                                <DataTable.Title numeric style={{ width: 120, justifyContent: 'center', }} textStyle={{ fontWeight: '700' }}>Total Approval</DataTable.Title>
                                <DataTable.Title numeric style={{ width: 120, justifyContent: 'center', }} textStyle={{ fontWeight: '700' }}>Handset Price</DataTable.Title>
                                <DataTable.Title numeric style={{ width: 120, justifyContent: 'center', }} textStyle={{ fontWeight: '700' }}>Discount Price</DataTable.Title>
                                <DataTable.Title numeric style={{ width: 120, justifyContent: 'center', }} textStyle={{ fontWeight: '700' }}>Discount Percentage</DataTable.Title>
                            </DataTable.Header>

                            {storeReports?.data?.map((item, index) => (
                                <>
                                    <DataTable.Row style={{ borderBottomWidth: 1, zIndex: -1, backgroundColor: 'white', elevation: index == currentRow ? 5 : 0, }} onPress={() => goToStepTwo(item?.store_name, index)}>
                                        <DataTable.Cell style={{ width: 100, justifyContent: 'center' }} textStyle={{ color: '#349fbf', fontWeight: '600' }}>{item?.store_name}
                                        </DataTable.Cell>
                                        <DataTable.Cell style={{ width: 70, justifyContent: 'center' }} textStyle={{ color: '#349fbf', fontWeight: '600' }}>{item?.ApprovedCount}</DataTable.Cell>
                                        <DataTable.Cell style={{ width: 70, justifyContent: 'center' }} textStyle={{ color: '#349fbf', fontWeight: '600' }}>{item?.total_price}</DataTable.Cell>
                                        <DataTable.Cell style={{ width: 70, justifyContent: 'center' }} textStyle={{ color: '#349fbf', fontWeight: '600' }}>{item?.discount_price}</DataTable.Cell>
                                        <DataTable.Cell style={{ width: 70, justifyContent: 'center' }} textStyle={{ color: '#349fbf', fontWeight: '600' }}>{item?.discount_percentage.toFixed(2)}</DataTable.Cell>
                                    </DataTable.Row>
                                </>
                            ))
                            }
                        </DataTable>
                        }

                        {steps == 2 &&
                            <DataTable style={{ backgroundColor: 'none' }}>
                                <DataTable.Header>
                                    <DataTable.Title
                                        style={{ width: 140, justifyContent: 'center' }}
                                        textStyle={{ fontWeight: '700' }}
                                    >Brand Name</DataTable.Title>
                                    <DataTable.Title numeric style={{ width: 120, justifyContent: 'center' }} textStyle={{ fontWeight: '700' }}>Total Approval</DataTable.Title>
                                    <DataTable.Title numeric style={{ width: 120, justifyContent: 'center' }} textStyle={{ fontWeight: '700' }}>Handset Price</DataTable.Title>
                                    <DataTable.Title numeric style={{ width: 120, justifyContent: 'center' }} textStyle={{ fontWeight: '700' }}>Discount Price</DataTable.Title>
                                    <DataTable.Title numeric style={{ width: 120, justifyContent: 'center' }} textStyle={{ fontWeight: '700' }}>Discount Percentage</DataTable.Title>
                                </DataTable.Header>
                                {brandRepo?.map((item, index1) => (
                                    <>
                                        <DataTable.Row style={{ borderBottomWidth: 1, zIndex: -1, backgroundColor: 'white', elevation: index1 == currentBrandRow ? 2 : 0, borderBottomWidth: index1 == currentBrandRow ? 2 : 0, borderTopWidth: index1 == currentBrandRow ? 2 : 0, borderColor: index1 == currentBrandRow ? '#e6c717' : '' }} onPress={() => goToStepThree(item?.brand, index1)}>
                                            <DataTable.Cell style={{ width: 100, justifyContent: 'center' }} textStyle={{ color: '#de6c3c', fontWeight: '600' }}>{item?.brand}
                                            </DataTable.Cell>
                                            <DataTable.Cell style={{ width: 70, justifyContent: 'center' }} textStyle={{ color: '#de6c3c', fontWeight: '600' }}>{item?.ApprovedCount}</DataTable.Cell>
                                            <DataTable.Cell style={{ width: 70, justifyContent: 'center' }} textStyle={{ color: '#de6c3c', fontWeight: '600' }}>{item?.total_price}</DataTable.Cell>
                                            <DataTable.Cell style={{ width: 70, justifyContent: 'center' }} textStyle={{ color: '#de6c3c', fontWeight: '600' }}>{item?.discount_price}</DataTable.Cell>
                                            <DataTable.Cell style={{ width: 70, justifyContent: 'center' }} textStyle={{ color: '#de6c3c', fontWeight: '600' }}>{item?.discount_percentage.toFixed(2)}</DataTable.Cell>
                                        </DataTable.Row>
                                    </>
                                ))}
                            </DataTable>
                        }

                        {steps == 3 &&
                            <DataTable style={{ backgroundColor: 'none' }}>
                                <DataTable.Header>
                                    <DataTable.Title
                                        style={{ width: 120, justifyContent: 'center' }}
                                        textStyle={{ fontWeight: '700' }}
                                    >Model Name</DataTable.Title>
                                    <DataTable.Title numeric style={{ width: 120, justifyContent: 'center' }} textStyle={{ fontWeight: '700' }}>Total Approval</DataTable.Title>
                                    <DataTable.Title numeric style={{ width: 120, justifyContent: 'center' }} textStyle={{ fontWeight: '700' }}>Handset Price</DataTable.Title>
                                    <DataTable.Title numeric style={{ width: 120, justifyContent: 'center' }} textStyle={{ fontWeight: '700' }}>Discount Price</DataTable.Title>
                                    <DataTable.Title numeric style={{ width: 120, justifyContent: 'center' }} textStyle={{ fontWeight: '700' }}>Discount Percentage</DataTable.Title>
                                </DataTable.Header>

                                {modelRepo?.map((item) => (
                                    <DataTable.Row style={{ borderBottomWidth: 1, zIndex: -1 }} >
                                        <DataTable.Cell style={{ width: 100, justifyContent: 'center' }} textStyle={{ color: '#e6c717', fontWeight: '600' }}>{item?.model}</DataTable.Cell>
                                        <DataTable.Cell style={{ width: 70, justifyContent: 'center' }} textStyle={{ color: '#e6c717', fontWeight: '600' }}>{item?.ApprovedCount}</DataTable.Cell>
                                        <DataTable.Cell style={{ width: 70, justifyContent: 'center' }} textStyle={{ color: '#e6c717', fontWeight: '600' }}>{item?.total_price}</DataTable.Cell>
                                        <DataTable.Cell style={{ width: 70, justifyContent: 'center' }} textStyle={{ color: '#e6c717', fontWeight: '600' }}>{item?.discount_price}</DataTable.Cell>
                                        <DataTable.Cell style={{ width: 70, justifyContent: 'center' }} textStyle={{ color: '#e6c717', fontWeight: '600' }}>{item?.discount_percentage.toFixed(2)}</DataTable.Cell>
                                    </DataTable.Row>
                                ))}
                            </DataTable>
                        }
                    </ScrollView>
                </ScreenWrapper> */}

                <ScreenWrapper contentContainerStyle={{ minHeight: 700 }} style={{ top: 5 }}>
                    <ScrollView horizontal>
                        <DataTable style={{ backgroundColor: 'none' }}>
                            <DataTable.Header>
                            <DataTable.Title
                                    style={{justifyContent: 'center',width:60 }}
                                    textStyle={{ fontWeight: '700' }}
                                ></DataTable.Title>
                                <DataTable.Title
                                    style={{ width: 140, justifyContent: 'center' }}
                                    textStyle={{ fontWeight: '700' }}
                                >Store Name</DataTable.Title>
                                <DataTable.Title numeric style={{ width: 120, justifyContent: 'center', }} textStyle={{ fontWeight: '700' }}>Total Approval</DataTable.Title>
                                <DataTable.Title numeric style={{ width: 120, justifyContent: 'center', }} textStyle={{ fontWeight: '700' }}>Handset Price</DataTable.Title>
                                <DataTable.Title numeric style={{ width: 120, justifyContent: 'center', }} textStyle={{ fontWeight: '700' }}>Discount Price</DataTable.Title>
                                <DataTable.Title numeric style={{ width: 120, justifyContent: 'center', }} textStyle={{ fontWeight: '700' }}>Discount Percentage</DataTable.Title>
                            </DataTable.Header>

                            {storeReports?.data?.map((item, index) => (
                                <>
                                    <DataTable.Row style={{ borderBottomWidth: 1, zIndex: -1, backgroundColor: 'white', elevation: index == currentRow ? 5 : 0, }} onPress={() => clickHandler(index)}>
                                    <DataTable.Cell style={{ justifyContent: 'center' }} textStyle={{ color: '#349fbf', fontWeight: '600' }}> <MaterialCommunityIcons  name={index == storeIndex?'minus':'plus'} size={15} solid color='#349fbf'/> </DataTable.Cell>
                                        <DataTable.Cell style={{ width: 100, justifyContent: 'center' }} textStyle={{ color: '#349fbf', fontWeight: '600' }}>{item?.store_name}
                                        </DataTable.Cell>
                                        <DataTable.Cell style={{ width: 70, justifyContent: 'center' }} textStyle={{ color: '#349fbf', fontWeight: '600' }}>{item?.ApprovedCount}</DataTable.Cell>
                                        <DataTable.Cell style={{ width: 70, justifyContent: 'center' }} textStyle={{ color: '#349fbf', fontWeight: '600' }}>{item?.total_price}</DataTable.Cell>
                                        <DataTable.Cell style={{ width: 70, justifyContent: 'center' }} textStyle={{ color: '#349fbf', fontWeight: '600' }}>{item?.discount_price}</DataTable.Cell>
                                        <DataTable.Cell style={{ width: 70, justifyContent: 'center' }} textStyle={{ color: '#349fbf', fontWeight: '600' }}>{item?.discount_percentage.toFixed(2)}</DataTable.Cell>
                                    </DataTable.Row>
                                    {index == storeIndex && <DataTable style={{ backgroundColor: 'none', paddingLeft:25 }}>
                                        <DataTable.Header>
                                        <DataTable.Title
                                    style={{ width: 70, justifyContent: 'center' }}
                                    textStyle={{ fontWeight: '700' }}
                                ></DataTable.Title>
                                            <DataTable.Title
                                                style={{ width: 140, justifyContent: 'center' }}
                                                textStyle={{ fontWeight: '700' }}
                                            >Brand Name</DataTable.Title>
                                            <DataTable.Title numeric style={{ width: 120, justifyContent: 'center' }} textStyle={{ fontWeight: '700' }}>Total Approval</DataTable.Title>
                                            <DataTable.Title numeric style={{ width: 120, justifyContent: 'center' }} textStyle={{ fontWeight: '700' }}>Handset Price</DataTable.Title>
                                            <DataTable.Title numeric style={{ width: 120, justifyContent: 'center' }} textStyle={{ fontWeight: '700' }}>Discount Price</DataTable.Title>
                                            <DataTable.Title numeric style={{ width: 120, justifyContent: 'center' }} textStyle={{ fontWeight: '700' }}>Discount Percentage</DataTable.Title>
                                        </DataTable.Header>
                                        {
                                            item.brands.map((brand, bindex) => {
                                                return (
                                                    <><DataTable.Row style={{ borderBottomWidth: 1, zIndex: -1, backgroundColor: 'white' }} onPress={() => brandClick(bindex)}>
                                                                                            <DataTable.Cell style={{ justifyContent: 'center' }} textStyle={{ color: '#349fbf', fontWeight: '400' }}> <MaterialCommunityIcons  name={bindex == brandIndex?'minus':'plus'} size={15} solid color='#349fbf'/> </DataTable.Cell>
                                                        <DataTable.Cell style={{ width: 100, justifyContent: 'center' }} textStyle={{ color: '#de6c3c', fontWeight: '600' }}>{brand?.brand}
                                                        </DataTable.Cell>
                                                        <DataTable.Cell style={{ width: 70, justifyContent: 'center' }} textStyle={{ color: '#de6c3c', fontWeight: '600' }}>{brand?.ApprovedCount}</DataTable.Cell>
                                                        <DataTable.Cell style={{ width: 70, justifyContent: 'center' }} textStyle={{ color: '#de6c3c', fontWeight: '600' }}>{brand?.total_price}</DataTable.Cell>
                                                        <DataTable.Cell style={{ width: 70, justifyContent: 'center' }} textStyle={{ color: '#de6c3c', fontWeight: '600' }}>{brand?.discount_price}</DataTable.Cell>
                                                        <DataTable.Cell style={{ width: 70, justifyContent: 'center' }} textStyle={{ color: '#de6c3c', fontWeight: '600' }}>{brand?.discount_percentage.toFixed(2)}</DataTable.Cell>
                                                    </DataTable.Row>
                                                        {bindex == brandIndex && <DataTable style={{ backgroundColor: 'none',paddingLeft:100 }}>
                                                            <DataTable.Header>
                                                                <DataTable.Title
                                                                    style={{ width: 120, justifyContent: 'center' }}
                                                                    textStyle={{ fontWeight: '700' }}
                                                                >Model Name</DataTable.Title>
                                                                <DataTable.Title numeric style={{ width: 150, justifyContent: 'center' }} textStyle={{ fontWeight: '700' }}>Total Approval</DataTable.Title>
                                                                <DataTable.Title numeric style={{ width: 120, justifyContent: 'center' }} textStyle={{ fontWeight: '700' }}>Handset Price</DataTable.Title>
                                                                <DataTable.Title numeric style={{ width: 120, justifyContent: 'center' }} textStyle={{ fontWeight: '700' }}>Discount Price</DataTable.Title>
                                                                <DataTable.Title numeric style={{ width: 120, justifyContent: 'center' }} textStyle={{ fontWeight: '700' }}>Discount Percentage</DataTable.Title>
                                                            </DataTable.Header>

                                                            { brand.model.length && brand.model?.map((eachModel, mIndex) => (
                                                                <DataTable.Row style={{ borderBottomWidth: 1, zIndex: -1 }} >
                                                                    <DataTable.Cell style={{ width: 100, justifyContent: 'center' }} textStyle={{ color: '#0B6520', fontWeight: '600' }}>{eachModel?.model}</DataTable.Cell>
                                                                    <DataTable.Cell style={{ width: 70, justifyContent: 'center' }} textStyle={{ color: '#0B6520', fontWeight: '600' }}>{eachModel?.ApprovedCount}</DataTable.Cell>
                                                                    <DataTable.Cell style={{ width: 70, justifyContent: 'center' }} textStyle={{ color: '#0B6520', fontWeight: '600' }}>{eachModel?.total_price}</DataTable.Cell>
                                                                    <DataTable.Cell style={{ width: 70, justifyContent: 'center' }} textStyle={{ color: '#0B6520', fontWeight: '600' }}>{eachModel?.discount_price}</DataTable.Cell>
                                                                    <DataTable.Cell style={{ width: 70, justifyContent: 'center' }} textStyle={{ color: '#0B6520', fontWeight: '600' }}>{eachModel?.discount_percentage.toFixed(2)}</DataTable.Cell>
                                                                </DataTable.Row>
                                                            ))}
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
                </ScreenWrapper>
                {/* <SafeAreaView>
                    {
                        storeReports?.data?.map((item, index) => {
                            return <View style={{ padding: 15 }}>
                                <Card onPress={() => clickHandler(index)} style={{ padding: 10, backgroundColor: "#D9C3C3" }}>
                                    <View style={{ display: "flex", flexDirection: 'row' }}>
                                        <View>
                                            <Text>Store Name: {item.store_name}</Text>
                                            <Text>Total Approval: {item.ApprovedCount}</Text>
                                            <Text>Handset Price: {item.total_price}</Text>
                                            <Text>Discount Price: {item.discount_price}</Text>
                                            <Text>Discount Percentage: {item.discount_percentage.toFixed(2)}</Text>
                                        </View>
                                        <View>
                                            <MaterialIcons name="keyboard-arrow-down" size={40} style={{ color: '#fff' }} />
                                        </View>
                                    </View>
                                </Card>
                                {
                                    index == storeIndex && <View>
                                        {
                                            item.brands.map((brand, bindex) => {
                                                return <View style={{ paddingLeft: 15, paddingTop: 10, paddingBottom: 10 }}>
                                                    <Card onPress={() => brandClick(bindex)} style={{ padding: 10, backgroundColor: "#C3D7D9" }}>
                                                        <Text >Brand Name: {brand.brand}</Text>
                                                        <Text>Total Approval: {brand.ApprovedCount}</Text>
                                                        <Text>Handset Price: {brand.total_price}</Text>
                                                        <Text>Discount Price: {brand.discount_price}</Text>
                                                        <Text>Discount Percentage: {brand.discount_percentage.toFixed(2)}</Text>
                                                    </Card>
                                                    {bindex == brandIndex && <View>
                                                        {
                                                            brand.model.length && brand.model.map((eachModel, mIndex) => {
                                                                return (
                                                                    <View style={{ paddingLeft: 15, paddingTop: 10, paddingBottom: 10 }}>
                                                                        <Card style={{ padding: 10, backgroundColor: "#C8D9C3" }}>
                                                                            <Text >Model Name: {eachModel.model}</Text>
                                                                            <Text>Total Approval: {eachModel.ApprovedCount}</Text>
                                                                            <Text>Handset Price: {eachModel.total_price}</Text>
                                                                            <Text>Discount Price: {eachModel.discount_price}</Text>
                                                                            <Text>Discount Percentage: {eachModel.discount_percentage.toFixed(2)}</Text>
                                                                        </Card>
                                                                    </View>
                                                                )
                                                            })
                                                        }
                                                    </View>}
                                                </View>
                                            })
                                        }
                                    </View>
                                }
                            </View>
                        })
                    }
                </SafeAreaView> */}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            justifyContent: 'center',
            flex: 1,
            // alignItems:'center'
        },
        spinnerTextStyle: {
            color: '#FFF',
        },
    }
)

export default DiscountTable;