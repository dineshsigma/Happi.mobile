import * as React from "react";
import {
    Text, StyleSheet, View, Image, Pressable,
    ImageBackground, RefreshControl, FlatList, Dimensions, SafeAreaView, TextInput, TouchableOpacity, Modal, StatusBar, Linking, Button, ScrollView, TouchableHighlight, Platform
} from "react-native";
import { useNavigation } from "@react-navigation/native";
const dimensions_width = Dimensions.get('window').width
import CheckBox from '@react-native-community/checkbox';
import { isConstructorDeclaration } from "typescript";
import moment from "moment";
import Icon from 'react-native-vector-icons/FontAwesome'



const HistoryDetails = ({ route }) => {
    const navigation = useNavigation();
    const summary = route.params;
    const [playing, setPlaying] = React.useState();
    const [toggleCheckBox, setToggleCheckBox] = React.useState(false)
    return (
        <ScrollView contentInsetAdjustmentBehavior="always">

            <View style={styles.container}>
                {/* <ScrollView> */}

                <View style={{ height: 'auto', backgroundColor:'rgb(251, 144, 19)' , paddingBottom:20}}>
                        <View style={{ padding: 30, paddingTop:0 }}>
                            <Text style={styles.text1}>History Details</Text>
                        </View>
                        <View style={{ paddingLeft: 0, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#fff', paddingRight: 30, paddingBottom: 10 }}>
                            <Text style={[styles.subText, {fontWeight:'600', paddingLeft:10, textTransform:'capitalize'}]}>Status: {summary?.status}</Text>
                            <Text style={styles.subText}>Date: {moment(summary?.created_at).format('ll')}</Text>
                        </View>

                        <View style={styles.items}>
                            <View style={styles.title}>
                            <Text style={[styles.whiteText, {fontWeight:'400'}]}>Reference No</Text>
                            </View>

                            <View style={styles.details}>
                            <Text style={styles.whiteText}>{summary?.reference_no}</Text>
                            </View>                     
                         </View>

                         <View style={styles.items}>
                            <View style={styles.title}>
                            <Text style={[styles.whiteText,{fontWeight:'400'}]}>Brand</Text>
                            </View>

                            <View style={styles.details}>
                            <Text style={styles.whiteText}>{summary?.brand}</Text>
                            </View>                     
                         </View>

                         <View style={styles.items}>
                            <View style={styles.title}>
                            <Text style={[styles.whiteText,{fontWeight:'400'}]}>Model</Text>
                            </View>

                            <View style={styles.details}>
                            <Text style={styles.whiteText}>{summary?.model}</Text>
                            </View>                     
                         </View>

                         <View style={styles.items}>
                            <View style={styles.title}>
                            <Text style={[styles.whiteText,{fontWeight:'400'}]}>Price</Text>
                            </View>

                            <View style={styles.details}>
                            <Text style={styles.whiteText}>₹{summary?.discount_total_price.toLocaleString('en-IN')}</Text>
                            </View>                     
                         </View>
                </View>
                <View>
                    <View style={{ borderBottomWidth: 1, borderColor: styles.primary_color, paddingBottom: 10, top: 10, marginLeft: 10, marginRight: 10 ,}}>
                        <Text style={[styles.text1, { color: styles.primary_color, fontSize: 14 }]}>Discounted Price</Text>
                    </View>
                </View>
                {/* Discounted Price */}
                <View style={[styles.items, {paddingTop:10}]}>
                            <View style={[styles.title,]}>
                            <Text style={[{fontWeight:'400',color:'#000'}]}>Happi Price</Text>
                            </View>

                            <View style={styles.details}>
                            <Text style={[styles.blackText,{fontWeight:'600'}]}>₹{summary?.total_price.toLocaleString('en-IN')}</Text>
                            </View>                     
                </View>

                <View style={[styles.items, {paddingTop:10}]}>
                            <View style={[styles.title,]}>
                            <Text style={[{fontWeight:'400',color:'#000'}]}>Discount</Text>
                            </View>

                            <View style={styles.details}>
                            <Text style={[styles.blackText,{fontWeight:'600'}]}>₹{summary?.discount_price.toLocaleString('en-IN')}</Text>
                            </View>                     
                </View>

                <View style={[styles.items, {paddingTop:10}]}>
                            <View style={[styles.title,]}>
                            <Text style={[{fontWeight:'400',color:'#000'}]}>Total Price After Discount</Text>
                            </View>

                            <View style={styles.details}>
                            <Text style={[styles.blackText,{fontWeight:'600'}]}>₹{summary?.discount_total_price.toLocaleString('en-IN')}</Text>
                            </View>                     
                </View>
              
                {/* Customer Details */}
                <View>
                    <View style={{ borderBottomWidth: 1, borderColor: styles.primary_color, paddingBottom: 10, top: 10, marginLeft: 10, marginRight: 10 ,}}>
                        <Text style={[styles.text1, { color: styles.primary_color, fontSize: 14 }]}>Customer Details</Text>
                    </View>
                </View>
                {/* Customer details */}
                <View style={[styles.items, {paddingTop:10}]}>
                            <View style={[styles.title,]}>
                            <Text style={[{fontWeight:'400',color:'#000'}]}>Customer Mobile No</Text>
                            </View>

                            <View style={styles.details}>
                            <Text style={[styles.blackText,{fontWeight:'600'}]}>{summary?.customer_mobile}</Text>
                            </View>                     
                </View>

                <View style={[styles.items, {paddingTop:10}]}>
                            <View style={[styles.title,]}>
                            <Text style={[{fontWeight:'400',color:'#000'}]}>Email Id</Text>
                            </View>

                            <View style={styles.details}>
                            <Text style={[styles.blackText,{fontWeight:'600'}]}>{summary?.customer_email}</Text>
                            </View>                     
                </View>

                {/* store details */}
                <View>
                    <View style={{ borderBottomWidth: 1, borderColor: styles.primary_color, paddingBottom: 10, top: 10, marginLeft: 10, marginRight: 10 ,}}>
                        <Text style={[styles.text1, { color: styles.primary_color, fontSize: 14 }]}>Store Details</Text>
                    </View>
                </View>
                {/* Store details */}
                <View style={[styles.items, {paddingTop:10}]}>
                            <View style={[styles.title,]}>
                            <Text style={[{fontWeight:'400',color:'#000'}]}>Store Code</Text>
                            </View>

                            <View style={styles.details}>
                            <Text style={[styles.blackText,{fontWeight:'600'}]}>{summary?.storeoutput[0]?.store_code}</Text>
                            </View>                     
                </View>

                <View style={[styles.items, {paddingTop:10}]}>
                            <View style={[styles.title,]}>
                            <Text style={[{fontWeight:'400',color:'#000'}]}>Store Name</Text>
                            </View>

                            <View style={styles.details}>
                            <Text style={[styles.blackText,{fontWeight:'600'}]}>{summary?.storeoutput[0]?.store_name}</Text>
                            </View>                     
                </View>

                {/* <View style={[styles.items, {paddingTop:10}]}>
                            <View style={[styles.title,]}>
                            <Text style={[{fontWeight:'400'}]}>Store Employee Id</Text>
                            </View>

                            <View style={styles.details}>
                            <Text style={[styles.blackText,{fontWeight:'600'}]}>{summary?.employee_id.split('-')[0]}</Text>
                            </View>                     
                </View>

                <View style={[styles.items, {paddingTop:10}]}>
                            <View style={[styles.title,]}>
                            <Text style={[{fontWeight:'400'}]}>Store Employee Name</Text>
                            </View>

                            <View style={styles.details}>
                            <Text style={[styles.blackText,{fontWeight:'600'}]}>{summary?.employee_id.split('-')[1]}</Text>
                            </View>                     
                </View> */}



                {/* APPROVAL notes */}
                <View>
                    <View style={{ borderBottomWidth: 1, borderColor: styles.primary_color, paddingBottom: 10, top: 10, marginLeft: 10, marginRight: 10 ,}}>
                        <Text style={[styles.text1, { color: styles.primary_color, fontSize: 14 }]}>Approval Details</Text>
                    </View>
              
                <View style={[styles.items, {paddingTop:10}]}>
                            <View style={[styles.title,]}>
                            <Text style={[{fontWeight:'400',color:'#000'}]}>Employee Id</Text>
                            </View>

                            <View style={styles.details}>
                            <Text style={[styles.blackText,{fontWeight:'600'}]}>{summary?.employee_id?.split('-')[0]}</Text>
                            </View>                     
                </View>

                <View style={[styles.items, {paddingTop:10}]}>
                            <View style={[styles.title,]}>
                            <Text style={[{fontWeight:'400',color:'#000'}]}>Employee Name</Text>
                            </View>

                            <View style={styles.details}>
                            <Text style={[styles.blackText,{fontWeight:'600'}]}>{summary?.employee_id?.split('-')[1]}</Text>
                            </View>                     
                </View>
                </View>

                {/* Alternatively*/}
                <View style={{width:'100%', height:'auto', paddingLeft:10, paddingRight:10}}>
             {summary?.status=='awaiting' &&
               <>
               <View>
                    <View style={{ borderBottomWidth: 1, borderColor: styles.primary_color, paddingBottom: 10, top: 10, marginLeft: 10, marginRight: 10 ,}}>
                        <Text style={[styles.text1, { color: styles.primary_color, fontSize: 14 }]}>Alternatively</Text>
                    </View>
                </View>

                <View style={{flexDirection:'row',padding:10}}>
               
                <CheckBox
                    disabled={false}
                    value={toggleCheckBox}
                    onValueChange={(newValue) => setToggleCheckBox(newValue)}
                    style={{height:30, width:30}}
                    tintColors={{ true: 'rgb(251, 144, 19)', false: 'rgba(0,0,0,0.3)' }}

                />

                <Text style={{paddingTop:5, color:'#000'}}> If you have an approval code</Text>
                </View>
                <View style={[styles.searchSections]}> 
              <View style={{paddingLeft:20, width:'60%'}}>        
                <TextInput style={styles.formInput} underlineColorAndroid="transparent" 
                placeholder="Approval Code" variant="standard"  
                 onChangeText={(text)=>console.log('text')} placeholderTextColor={'#000'}/>        
              </View> 
              <TouchableHighlight
                            style={styles.logout}
                           
                        >
                            <View>
                                <Text style={{ fontWeight: '700', color: '#fff' }}>Submit</Text>
                            </View>
                        </TouchableHighlight>
                </View>
               
                    
             
                </>
                }

                {summary?.status =='Approved' &&
                     <ImageBackground source={require('../../assets/bg-2.png')} resizeMode="contain" style={{width:'100%', height:'60%'}}>
                     <>
                       <View style={{alignSelf:'center', paddingTop:40, flexDirection:'row', top:10}}>
                        <Icon name='ticket' size={22} />
                        <Text style={{fontSize:18}}>Apx Coupon Code</Text>
                        </View>
                        <View style={{backgroundColor:'#9E5600', width:100, height:40, alignSelf:'center', top:20, borderRadius:5, justifyContent:'center'}}>
                            <Text style={{alignSelf:'center', color:'#fff', fontWeight:'600'}}>{summary?.discount_coupoun}</Text>
                        </View>
                        </>
                        </ImageBackground>
                }
                </View>


            </View>
        </ScrollView>


    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fce6cc', paddingBottom: 100 },
    text1: { fontWeight: '600', fontSize: 22, color: '#fff' },
    button: { top: 20, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', height: 60, borderWidth: 1, borderRadius: 10, marginTop: 30, borderColor: 'orange', height: 150 },
    backgroundImage: {
        width: '100%',
        height: '100%',
        alignSelf: 'flex-start'
    },
    subText: { fontSize: 14, color: '#fff', fontWeight: '500', textAlign: 'center' },
    subText_underlined: { fontSize: 14, color: '#fff', fontWeight: '700', textAlign: 'center', textDecorationLine: 'underline' },
    primary_color: 'rgb(251, 144, 19)',
    subtext_text_1: { fontSize: 14, fontWeight: '500', textAlign: 'center', },
    centerText: { textAlign: 'center', fontWeight: '500', color: '#000' },
    leftText: { textAlign: 'left', fontWeight: '500', color: '#000' },
    subTextChild:{color:'#fff', fontWeight:'600'},
    title:{width:dimensions_width-220, paddingLeft:10}, 
    hyphen:{width:30,paddingLeft:10,},
    details:{width:dimensions_width-210, paddingLeft:30,}, 
    whiteText:{color:'#fff', fontWeight:'600', fontSize:16},
    items:{flexDirection:'row', justifyContent:'flex-start',alignItems:'flex-start', paddingTop:5},
    blackText:{color:'#000'},
    searchSections:{flexDirection :'row'},
    searcinput: {
      width: '60%',
      borderWidth: 1,
      borderRadius: 20,
      height: 40,
      flex: 1,
     
    },
    formInput: {paddingLeft:16, color:'#000', borderWidth: 1, borderColor: '#000', fontSize: 15,height:44,width:'100%', right:10},
    logout: { width: '35%', height: 40, backgroundColor: 'rgb(251, 144, 19)', justifyContent: 'center', alignItems: 'center', top: 0, borderRadius: 5 },

   



});

export default HistoryDetails;
