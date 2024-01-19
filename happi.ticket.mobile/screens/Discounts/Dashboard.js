import * as React from "react";
import {
    Text, StyleSheet, View, Image, Dimensions, SafeAreaView, TextInput, TouchableOpacity, Modal, StatusBar, Linking, Button, ScrollView, TouchableHighlight, Platform
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Card } from 'react-native-elements'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


const Dashboard = () => {
    const navigation = useNavigation();

    let cardData = [{cardTitle : 'Total Coupon Raised',count : 25},{cardTitle : 'Total Coupon Pending',count : 21},{cardTitle : 'Total Coupon Approved',count : 21},{cardTitle : 'Total Coupon Rejected',count : 8}]

    return (
        <View style = {{backgroundColor:"#fce6cc", height:1000}}>
            {cardData.map((item) => {

          return(
            <Card containerStyle = {{margin:30,borderRadius:10}}>
                <Card.Title style ={{color:"#6c729"}}>{item.cardTitle}</Card.Title>
                <View style={{ position: "relative", alignItems: "center",color:"#a7abc3", display:"flex"}}>
                    <Text >{item.count}</Text>
                </View>
            </Card>)
              })}

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
    button: { top: 20, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', height: 60, borderWidth: 1, borderRadius: 10, marginTop: 30, borderColor: 'orange', height: 150 }

});

export default Dashboard;
