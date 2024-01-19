import * as React from "react";
import {
    Text, StyleSheet, View, Image, Pressable,
    ImageBackground, RefreshControl, FlatList, Dimensions, SafeAreaView, TextInput, TouchableOpacity, Modal, StatusBar, Linking, Button, ScrollView, TouchableHighlight, Platform
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const BarCodeScanner = () => {
    const navigation = useNavigation();
    const openBarcodeScanner = () => {
      navigation.navigate('Scanner')
    };


    return (
        <View style={{ paddingLeft: 15, paddingRight:15 }}>
            {/* <MaterialCommunityIcons name="keyboard-backspace" color="#6F787C" size={26} style={{ top: 20 }} onPress={() => navigation.goBack()} /> */}
            <TouchableOpacity style={styles.button}
                onPress={() => openBarcodeScanner()}>
                <View style={{ flexDirection: 'row' }}>
                    <MaterialCommunityIcons name="barcode-scan" color="#6F787C" size={26} style={{right:20}} />
                    <Text style={{top:5, color:'#000'}}>Scan Barcode</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}
                onPress={() => navigation.navigate('ProductSearch')}>
                <View style={{ flexDirection: 'row' }}>
                    <MaterialIcons name="search" color="#6F787C" size={26} style={{right:20}} />
                    <Text style={{top:5,color:'#000'}}>Search Product</Text>
                </View>
            </TouchableOpacity>
        </View>


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
    button:{ top: 20, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', height: 60, borderWidth: 1, borderRadius: 10, marginTop: 30, borderColor: 'orange' }

});

export default BarCodeScanner;
