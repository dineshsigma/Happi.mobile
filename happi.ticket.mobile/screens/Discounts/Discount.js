import * as React from "react";
import {
    Text, StyleSheet, View, Image, Pressable,
    ImageBackground, RefreshControl, FlatList, Dimensions, SafeAreaView, TextInput, TouchableOpacity, Modal, StatusBar, Linking, Button, ScrollView, TouchableHighlight, Platform
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo';
import RadioForm from 'react-native-simple-radio-button';
import { SelectList } from 'react-native-dropdown-select-list'

const Discount = () => {
    const navigation = useNavigation();
    const [active, setActive] = React.useState(['1']);
    const [currentStep, setCurrentStep]=React.useState('1')
    const radioButtons = React.useMemo(() => ([
        {
            id: 1, // acts as primary key, should be unique and non-empty string
            label: 'I Have a Coupon (or) Reference Code',
            value: 0
        },
        {
            id: 2,
            label: 'I need to Give Manager Discount',
            value: 1
        },
        {
            id: 3,
            label: 'I need to Give Manager Offer',
            value: 2
        }
    ]), []);

    const [selectedId, setSelectedId] = React.useState();
    return (
        <ScrollView>
        <View style={{ marginVertical: 10, marginHorizontal: 20 }}>

            <View style={styles.tabsHeadersection}>
                <View style={styles.tabGroup}>
                    {/* <Text style={[styles.tabCircle, styles.tabCircle_active]}>1</Text> */}
                    <Entypo name="paper-plane" size={22} style={{ paddingRight: 10, color:active.includes('1')? styles.primary_color : 'gray' }} />

                    <Text style={[styles.text, styles.text_active]}>Check Reference Code</Text>
                    <MaterialCommunityIcons style={[styles.tabGroup_Icon,{color:active.includes('1')? styles.primary_color : 'gray' }]} name="chevron-right" />

                </View>
                <View style={styles.tabGroup}>
                <Entypo name="box" size={22} style={{ paddingRight: 10, color:active.includes('2')? styles.primary_color : 'gray' }} />
                    <Text style={[styles.text,{color:active.includes('2')? styles.primary_color : 'gray'}]}>Select Phone</Text>
                    <MaterialCommunityIcons style={[styles.tabGroup_Icon,{color:active.includes('2')? styles.primary_color : 'gray'}]} name="chevron-right" />

                </View>
                <View style={styles.tabGroup}>
                <Entypo name="users" size={22} style={{ paddingRight: 10, color:active.includes('3')? styles.primary_color : 'gray' }} />
                    <Text style={[styles.text,{color:active.includes('3')? styles.primary_color : 'gray'}]}>Customer Confirmation</Text>
                    <MaterialCommunityIcons style={[styles.tabGroup_Icon,{color:active.includes('3')? styles.primary_color : 'gray'}]} name="chevron-right" />
                </View>
                <View style={styles.tabGroup}>
                <MaterialCommunityIcons size={22} style={{ paddingRight: 10, color:active.includes('4')? styles.primary_color : 'gray' }} name="brightness-percent" />
                    <Text style={styles.text}>Ask for Discount</Text>
                    <MaterialCommunityIcons style={styles.tabGroup_Icon} name="chevron-right" />
                </View>
                <View style={styles.tabGroup}>
                <MaterialCommunityIcons size={22} style={{ paddingRight: 10, color:active.includes('5')? styles.primary_color : 'gray' }} name="security" />
                    <Text style={styles.text}>Request for Approval</Text>
                    <MaterialCommunityIcons style={styles.tabGroup_Icon} name="chevron-right" />
                </View>
            </View>

           {currentStep==1 && 
           <View style={styles.tabsHeadersection1}>
                <View style={styles.tabGroup1}>
                    <Text style={[styles.text, styles.text_active]}>If Check Condition :</Text>
                </View>
                <RadioForm
                    radio_props={radioButtons}
                    initial={5}
                    formHorizontal={false}
                    labelHorizontal={true}
                    buttonColor={styles.primary_color}
                    selectedButtonColor={styles.primary_color}
                    animation={true}
                    onPress={(value) => setSelectedId(value)}
                    buttonSize={10}
                />
                {selectedId == 0 &&
                    <View style={{ top: 20, width: '100%', paddingBottom: 40 }}>
                        <Text>
                            Reference Code:
                        </Text>
                        <TextInput style={{ borderWidth: 1, borderRadius: 10, marginTop: 10, borderColor: '#c8c8c8' }}
                            placeholder="Enter Reference Code"
                            onChangeText={(text) => console.log(text)}
                        >
                        </TextInput>
                        <TouchableHighlight
                            style={styles.logout}
                            onPress={() => {
                                setActive(value=>[...value,'2']),
                                setCurrentStep('2')
                            }}
                        >
                            <View>
                                <Text style={{ fontWeight: '700', color: '#fff' }}>Check</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                }
                {(selectedId == 1 || selectedId == 2) &&
                    <TouchableHighlight
                        style={styles.logout}
                        onPress={() => {
                            setActive(value=>[...value,'2']),
                            setCurrentStep('2')
                        }}
                    >
                        <View>
                            <Text style={{ fontWeight: '700', color: '#fff' }}>Continue</Text>
                        </View>
                    </TouchableHighlight>
                }


            </View>}
           
            
            {currentStep==2 &&
         
                <View style={styles.tabsHeadersection1}>
                      
                     <View style={[styles.tabGroup1,{alignSelf:'center'}]}>
                    <Text style={[styles.text, styles.text_active]}>Please Select Store Name :</Text>
                    </View>
                    <View style={{justifyContent:'center', alignItems:'center',alignSelf:'center'}}>
                    <Text style={[styles.text, styles.text_active,{color:'#000',textAlign:'center'}]}>Store</Text>

                    <SelectList
                        setSelected={(val) => { console.log('do whatever') }}
                        data={''}
                        save="key"
                        search={true}
                        boxStyles={styles.textInput}
                        dropdownStyles={{
                        width: '100%', borderWidth: 1,
                        borderColor: '#c8c8c8', backgroundColor: '#fff'
                        }}
                        placeholder='Select Store'
                        inputStyles={{ left: -20, top: 2, paddingLeft: 20 }}
                        onSelect={()=>console.log('selected')}
                    />
                    </View>

                    <View style={[styles.tabGroup1,{top:10}]}>
                    <Text style={[styles.text, styles.text_active]}>Please Select Phone Details :</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                    <View>
                    <Text style={[styles.text, styles.text_active,{color:'#000',textAlign:'center'}]}>Brand</Text>

                    <SelectList
                        setSelected={(val) => { console.log('do whatever') }}
                        data={''}
                        save="key"
                        search={false}
                        boxStyles={styles.textInput}
                        dropdownStyles={{
                        width: '100%', borderWidth: 1,
                        borderColor: '#c8c8c8', backgroundColor: '#fff'
                        }}
                        placeholder='Select Brand'
                        inputStyles={{ left: -20, top: 2, paddingLeft: 20 }}
                        onSelect={()=>console.log('selected')}
                    />
                    </View>

                    <View style={{paddingLeft:20}}>
                    <Text style={[styles.text, styles.text_active,{color:'#000', textAlign:'center'}]}>Model</Text>

                    <SelectList
                        setSelected={(val) => { console.log('do whatever') }}
                        data={''}
                        save="key"
                        search={false}
                        boxStyles={styles.textInput}
                        dropdownStyles={{
                        width: '100%', borderWidth: 1,
                        borderColor: '#c8c8c8', backgroundColor: '#fff'
                        }}
                        placeholder='Select Model'
                        inputStyles={{ left: -20, top: 2, paddingLeft: 20 }}
                        onSelect={()=>console.log('selected')}
                    />
                    </View>
                    </View>
                    <View style={{alignSelf:'center', top:20}}>
                    <Text style={[styles.text, styles.text_active,{color:'#000',textAlign:'center'}]}>Discount Category</Text>

                    <SelectList
                        setSelected={(val) => { console.log('do whatever') }}
                        data={''}
                        save="key"
                        search={false}
                        boxStyles={styles.textInput}
                        dropdownStyles={{
                        width: '90%', borderWidth: 1,
                        borderColor: '#c8c8c8', backgroundColor: '#fff'
                        }}
                        placeholder='Discount Category'
                        inputStyles={{ left: -5, top: 2, }}
                        onSelect={()=>console.log('selected')}
                    />
                    </View>

                    <TouchableHighlight
                            style={[styles.logout,{alignSelf:'center', top:30}]}
                            onPress={() => {
                                setActive(value=>[...value,'3']),
                                setCurrentStep('3')
                            }}
                        >
                            <View>
                                <Text style={{ fontWeight: '700', color: '#fff' }}>Check</Text>
                            </View>
                        </TouchableHighlight>
                       
                    </View>
            }
        </View>
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
    tabsHeadersection: { flexDirection: 'column', marginTop: 10, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', width: '100%', backgroundColor: '#fff', padding: 30 },
    tabsHeadersection1: { flexDirection: 'column', marginTop: 10, display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', width: '100%', backgroundColor: '#fff', padding: 30, paddingBottom:50 },
    tabGroup: { display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', paddingTop: 10, width: '100%' },
    tabGroup1: { display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'column', paddingTop: 10, width: '100%', paddingBottom: 20 },
    tabCircle: { display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#C8C8C8', width: 24, height: 24, lineHeight: 22, borderRadius: 100, textAlign: 'center', marginRight: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' },
    tabCircle_active: { backgroundColor: 'rgb(251, 144, 19)', color: '#FFF' },
    text: { color: '#7F7F7F', fontSize: 14, fontWeight: '500' },
    text_active: { color: "rgb(251, 144, 19)" },
    tabGroup_Icon: { display: 'flex', marginLeft: 'auto', marginRight: '.3%', fontSize: 20, color: "gray" },
    primary_color: 'rgb(251, 144, 19)',
    logout: { width: '35%', height: 40, backgroundColor: 'rgb(251, 144, 19)', justifyContent: 'center', alignItems: 'center', top: 10, borderRadius: 5 },
    textInput: {
        borderWidth: 1,
        borderColor: '#c8c8c8',
        height: 50,
        borderRadius: 5,
        backgroundColor: '#fff',
        marginTop: 10,
        paddingLeft: 10
      },


});

export default Discount;
