import * as React from "react";
import { Text, StyleSheet, View, Dimensions, TouchableOpacity, TextInput, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { getBrandList, getItemNameList } from "../../reducers/apx_products";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import item from './item.json'
const CheckDiscount = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [selected, setSelected] = React.useState("");
    const BrandsList = useSelector((state) => state.apx_products.brandList);
    const ItemList = useSelector((state) => state.apx_products.itemList);
    const [data, setData] = React.useState(BrandsList);//list of Brand DATA
    const [itemdata, setItemData] = React.useState(ItemList);//list of item Data
    const [selectedBrand, setSelectedBrand] = React.useState('');
    const [selectedModel, setSelectedModel] = React.useState('');
    const [isClicked, setIsClicked] = React.useState(false);
    const [isClickedModel, setIsClickedModel] = React.useState(false);
    const [searchText, setSearchText] = React.useState('');
    const [itemsearchText, setItemSearchText] = React.useState('');
    const searchRef = React.useRef();
    const modelsearchRef = React.useRef();
    React.useEffect(() => {
        dispatch(getBrandList());
    }, [])
    // search funactionality for Brand_Name
    const onSearch = txt => {
        setSearchText(txt);
        if (txt !== '') {
            let tempData = data?.filter((item) => {
                return item.BRAND_NAME.toLowerCase().indexOf(txt.toLowerCase()) > -1;
            })
            setData(tempData);
        }
        else {
            setData(BrandsList)
        }
    }
    // search funactionality for item_name
    const onSearchItem = txt => {
        setItemSearchText(txt);
        if (txt !== '') {
            let tempData = itemdata.filter((item) => {
                return item.ITEM_NAME?.toLowerCase().indexOf(txt.toLowerCase()) > -1;
            })
            setItemData(tempData);
        }
        else {
            setItemData(itemdata)
        }
    }

   



    const handleSubmit = () => {
        //Do it after API
    }
    return (
        <>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                {/* <Icon name="chevron-left" size={24}  backgroundColor= 'orange' /> */}
                <Icon name="arrow-left" size={20} type="entypo" />
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons name="brightness-percent" color="#fb923e" size={26} style={{ left: 35, marginTop: 60 }} />
                    <Text style={styles.heading}>Check  Brand Discount</Text></View>
                <Text style={styles.label}>Select Make:</Text>
                <TouchableOpacity style={styles.dropdownSelector} onPress={() => { setIsClicked(!isClicked) }}>
                    <Text placeholder='Select Brand'>{selectedBrand}</Text>
                    {isClicked ? (
                        <Icon type='font-awesome' name='chevron-down' />
                    ) : (<Icon type='font-awesome' name='chevron-up' />)}
                </TouchableOpacity>
                {isClicked ? (<View style={styles.dropdownArea}>
                    <TextInput ref={searchRef} placeholder="Search" style={styles.searchInput} value={searchText} onChangeText={text => { onSearch(text) }} />
                    <FlatList data={data} renderItem={({ item, index }) => {
                        return (
                            <>{
                                <TouchableOpacity style={styles.brandItem} onPress={() => {
                                    setSelectedBrand(item?.BRAND_NAME);
                                    setIsClicked(false);
                                    onSearch('');
                                    searchRef.current.clear()
                                    setSelectedModel('')
                                    setSearchText('')
                                    dispatch(getItemNameList(item?.BRAND_NAME))
                                    
                                }}>
                                    <Text>{item.BRAND_NAME}</Text>
                                </TouchableOpacity>}</>
                        )
                    }} /></View>
                ) : null}
            </View>
            {selectedBrand.length > 0 && !isClicked && <View style={[styles.container, { marginTop: 0 }]}>
                <Text style={styles.itemlabel}>Select Model:</Text>
                <TouchableOpacity style={styles.dropdownSelector1} onPress={() => { setIsClickedModel(!isClickedModel) }}>
                    <Text>{selectedModel}</Text>
                    {isClickedModel ? (
                        <Icon type='font-awesome' name='chevron-down' />
                    ) : (<Icon type='font-awesome' name='chevron-up' />)}
                </TouchableOpacity>
                {isClickedModel ? (<View style={styles.dropdownArea}>
                    <TextInput ref={modelsearchRef} placeholder="Search" style={styles.searchInput} value={itemsearchText} onChangeText={text => { onSearchItem(text) }} />
                    <FlatList data={itemdata} renderItem={({ item, index }) => {
                        return (
                            <>{
                                <TouchableOpacity style={styles.brandItem} onPress={() => {
                                    setSelectedModel(item.ITEM_NAME)
                                    setIsClickedModel(false); onSearchItem(''); modelsearchRef.current.clear()
                                }}>
                                    <Text>{item.ITEM_NAME}</Text>
                                </TouchableOpacity>}</>
                        )
                    }} /></View>
                ) : null}
            </View>
            }
            {selectedBrand.length > 0 && selectedModel.length > 0 && !isClicked && !isClickedModel && <View style={styles.submitButtonContainer}>
                <TouchableOpacity style={styles.submitButton} >
                    <Text style={styles.submitButtonText} onPress={() => handleSubmit()}>Submit</Text>
                </TouchableOpacity>
            </View>
            }

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
    container: {
        flex: 1,
    },
    heading: {
        fontSize: 20,
        fontWeight: '800',
        marginTop: 60,
        marginLeft: 60,
        alignSelf: 'center'
    },
    dropdownSelector: {
        width: '90%',
        height: 50,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#8e8e8e',
        alignSelf: 'center',
        marginTop: 0,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15
    },
    dropdownSelector1: {
        width: '90%',
        height: 50,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#8e8e8e',
        alignSelf: 'center',
        marginTop: 0,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15

    },
    icon: {
        width: 20,
        height: 20
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
    brandItem: {
        width: '80%',
        height: 50,
        borderBottomWidth: 0,
        borderBottpmColor: '#8e8e8e',
        alignSelf: 'center',
        justifyContent: 'center'

    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        //alignSelf: 'right',
        marginTop: 20,
        paddingLeft: 25,
    },
    itemlabel: {
        fontSize: 16,
        fontWeight: 'bold',
        //alignSelf: 'right',
        //marginTop: 20,
        paddingLeft: 25,

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


});

export default CheckDiscount;
