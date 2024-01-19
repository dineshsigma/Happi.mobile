import * as React from "react";
import {
    Text, StyleSheet, View, Image, Pressable,
    ImageBackground, RefreshControl, FlatList, Dimensions, SafeAreaView, TextInput, TouchableOpacity, Modal, StatusBar, Linking, Button, ScrollView, TouchableHighlight, Platform
} from "react-native";
import { useNavigation } from "@react-navigation/native";
const dimensions_width = Dimensions.get('window').width
import Ionicons from 'react-native-vector-icons/Ionicons';
import AudioPlayer from "../../components/AudioPlayer";
import sound from '../../assets/bgm.mp3'
// var Sound = require('react-native-sound');
// Sound.setCategory('Playback');

// var audio = new Sound(
//   'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3',
//   null,
//   error => {
//     if (error) {
//       console.log('failed to load the sound', error);
//       return;
//     }
//     // if loaded successfully
//     console.log(
//       'duration in seconds: ' +
//         audio.getDuration() +
//         'number of channels: ' +
//         audio.getNumberOfChannels(),
//     );
//   },
// );


const DiscountSummary = ({ route }) => {
    const navigation = useNavigation();
    const summary = route.params;
    const [playing, setPlaying] = React.useState();
    return (
        <ScrollView contentInsetAdjustmentBehavior="always">

            <View style={styles.container}>
                {/* <ScrollView> */}

                <View style={{ height: 250, }}>
                    <ImageBackground source={require('../../assets/bg-banner.jpeg')} style={styles.backgroundImage} resizeMode='cover'>
                        <View style={{ padding: 30 }}>
                            <Text style={styles.text1}>Discount Details</Text>
                        </View>
                        <View style={{ paddingLeft: 30, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#fff', paddingRight: 30, paddingBottom: 10 }}>
                            <Text style={styles.subText}>REFERENCE NO: 74878748</Text>
                            <Text style={styles.subText}>DATE: JUL</Text>
                        </View>

                        <View style={{ paddingLeft: 30, flexDirection: 'row', justifyContent: 'space-between', paddingRight: 30, paddingTop: 30 }}>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={styles.subText_underlined}>Brand</Text>
                                <Text style={styles.subTextChild}>AA IPHONE</Text>
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={styles.subText_underlined}>Model</Text>
                                <Text style={styles.subTextChild}>IPHONE 11 64GB</Text>
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={styles.subText_underlined}>Price</Text>
                                <Text style={styles.subTextChild}>69000</Text>
                            </View>

                        </View>


                    </ImageBackground>
                </View>
                <View>
                    <View style={{ borderBottomWidth: 1, borderColor: styles.primary_color, paddingBottom: 10, top: 10, marginLeft: 30, marginRight: 30 }}>
                        <Text style={[styles.text1, { color: styles.primary_color, fontSize: 18 }]}>DISCOUNTED PRICE</Text>
                    </View>
                </View>
                {/* Discounted Price */}
                <View style={{ paddingLeft: 30, flexDirection: 'row', justifyContent: 'space-between', paddingRight: 30, paddingTop: 30 }}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.subtext_text_1}>OUR PRICE</Text>
                        <Text style={[styles.centerText, { top: 15 }]}>64900</Text>
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.subtext_text_1}>DISCOUNT AMOUNT{'\n'} @ 3.85%</Text>
                        <Text style={styles.centerText}>2500</Text>
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.subtext_text_1}>PRICE AFTER{'\n'}DISCOUNT</Text>
                        <Text style={[styles.centerText,{color:styles.primary_color}]}>62400</Text>
                    </View>

                </View>

                {/* Customer Details */}
                <View style={{top:20}}>
                    <View style={{ borderBottomWidth: 1, borderColor: styles.primary_color, paddingBottom: 10, top: 20, marginLeft: 30, marginRight: 30 }}>
                        <Text style={[styles.text1, { color: styles.primary_color, fontSize: 18 }]}>CUSTOMER DETAILS</Text>
                    </View>

                    <View style={{ paddingLeft: 30, flexDirection: 'row', justifyContent: 'space-between', paddingRight: 30, paddingTop: 30 }}>
                        <View style={{ flexDirection: 'column', }}>
                            <Text style={styles.subtext_text_1}>CUSTOMER MOBILE NO.</Text>
                            <Text style={[styles.leftText, { top: 5 }]}>9659849934</Text>
                        </View>
                    </View>
                </View>

                {/* store details */}
                <View style={{ top: 40 }}>
                    <View style={{ borderBottomWidth: 1, borderColor: styles.primary_color, paddingBottom: 10, top: 10, marginLeft: 30, marginRight: 30 }}>
                        <Text style={[styles.text1, { color: styles.primary_color, fontSize: 18 }]}>STORE DETAILS</Text>
                    </View>


                    <View style={{ paddingLeft: 30, flexDirection: 'row', justifyContent: 'space-between', paddingRight: 30, paddingTop: 30, width: dimensions_width }}>
                        <View style={{ flexDirection: 'column', width: dimensions_width / 6 }}>
                            <Text style={styles.subtext_text_1}>STORE{'\n'}CODE</Text>
                            <Text style={[styles.centerText]}>ATPR</Text>
                        </View>
                        <View style={{ flexDirection: 'column', width: dimensions_width / 6 }}>
                            <Text style={styles.subtext_text_1}>STORE NAME</Text>
                            <Text style={styles.centerText}>ATTAPUR</Text>
                        </View>
                        <View style={{ flexDirection: 'column', width: dimensions_width / 5 }}>
                            <Text style={styles.subtext_text_1}>STORE{'\n'}EMPLOYEE ID</Text>
                            <Text style={styles.centerText}>HM0014</Text>
                        </View>
                        <View style={{ flexDirection: 'column', width: dimensions_width / 6 }}>
                            <Text style={styles.subtext_text_1}>STORE{'\n'}EMPLOYEE{'\n'} NAME</Text>
                            <Text style={styles.centerText}>HM0014 - KHAJA AFTAB KHAN</Text>
                        </View>

                    </View>
                </View>



                {/* Store employee notes */}
                <View style={{ top: 60 }}>
                    <View style={{ borderBottomWidth: 1, borderColor: styles.primary_color, paddingBottom: 10, top: 10, marginLeft: 30, marginRight: 30 }}>
                        <Text style={[styles.text1, { color: styles.primary_color, fontSize: 18 }]}>STORE EMPLOYEE NOTES</Text>
                    </View>


                    <View style={{ paddingLeft: 30, flexDirection: 'row', justifyContent: 'space-between', paddingRight: 30, paddingTop: 30, width: dimensions_width }}>
                        <View style={{ flexDirection: 'column', width: dimensions_width / 4 }}>
                            <Text style={styles.subtext_text_1}>TEXT MESSAGE</Text>
                            <Text style={[styles.centerText]}>test from sa</Text>
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={styles.subtext_text_1}>VOICE MESSAGE</Text>
                            {/* <AudioPlayer /> */}
                        </View>


                    </View>

                </View>

                {/* ASM Notes */}
                <View style={{ top: 60 }}>
                    <View style={{ borderBottomWidth: 1, borderColor: styles.primary_color, paddingBottom: 10, top: 10, marginLeft: 30, marginRight: 30 }}>
                        <Text style={[styles.text1, { color: styles.primary_color, fontSize: 18 }]}>ASM NOTES</Text>
                    </View>


                    <View style={{ paddingLeft: 30, flexDirection: 'row', justifyContent: 'space-between', paddingRight: 30, paddingTop: 30, width: dimensions_width }}>
                        <View style={{ flexDirection: 'column', width: dimensions_width / 4 }}>
                            <Text style={styles.subtext_text_1}>TEXT MESSAGE</Text>
                            <Text style={[styles.centerText]}>test from sa</Text>
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={styles.subtext_text_1}>VOICE MESSAGE</Text>
                            {/* <AudioPlayer /> */}
                        </View>


                    </View>


                </View>

                {/* Sales Head Notes */}
                <View style={{ top: 60 }}>
                    <View style={{ borderBottomWidth: 1, borderColor: styles.primary_color, paddingBottom: 10, top: 10, marginLeft: 30, marginRight: 30 }}>
                        <Text style={[styles.text1, { color: styles.primary_color, fontSize: 18 }]}>SALES HEAD NOTES</Text>
                    </View>
                    <View style={{ paddingLeft: 30, flexDirection: 'row', justifyContent: 'space-between', paddingRight: 30, paddingTop: 30, width: dimensions_width }}>
                        <View style={{ flexDirection: 'column', width: dimensions_width / 4 }}>
                            <Text style={styles.subtext_text_1}>TEXT MESSAGE</Text>
                            <Text style={[styles.centerText]}>test from sa </Text>
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={styles.subtext_text_1}>VOICE MESSAGE</Text>
                            {/* <AudioPlayer /> */}
                        </View>
                    </View>
                </View>

                {/* APPROVAL DETAILS */}
                <View style={{ top: 60 }}>
                    <View style={{ borderBottomWidth: 1, borderColor: styles.primary_color, paddingBottom: 10, top: 10, marginLeft: 30, marginRight: 30 }}>
                        <Text style={[styles.text1, { color: styles.primary_color, fontSize: 18 }]}>APPROVAL DETAILS</Text>
                    </View>
                    <View style={{ paddingLeft: 30, flexDirection: 'row', justifyContent: 'space-between', paddingRight: 30, paddingTop: 30, width: dimensions_width }}>
                        <View style={{ flexDirection: 'column', width: dimensions_width / 4 }}>
                            <Text style={styles.subtext_text_1}>EMPLOYEE ID</Text>
                            <Text style={[styles.centerText]}>HM0311</Text>
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={styles.subtext_text_1}>EMPLOYEE NAME</Text>
                            <Text style={[styles.centerText]}>V.SRINIVAS</Text>

                        </View>
                    </View>
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
    subTextChild:{color:'#fff', fontWeight:'600'}



});

export default DiscountSummary;
