import * as React from 'react';
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Feather  from 'react-native-vector-icons/Feather';
import { moderateScale } from '../styles/ResponsiveDimentions';
function InternetConection({ netInfo }:{netInfo:any}) {
    if (!netInfo.isConnected) {
        return <InternetNotification message="No internet connection" />
    }


    if (netInfo.isConnected && !netInfo.isInternetReachable) {
        return <InternetNotification message="Internet isn't Reachable" />
    }

    return (
        <>
            {(!netInfo.isConnected && !netInfo.isInternetReachable) && <InternetNotification message="No internet connection" />}
        </>
    );
}



const styles = StyleSheet.create({
    screen: {
        position: "absolute",
        bottom: moderateScale(25),
        left: "25%",
        backgroundColor: "#000000bb",
        padding: 10,
        flexDirection: "row",
        borderRadius: 5
    },
    text: {
        color: "#fff",
        paddingLeft: 5,
    }
})

function InternetNotification({ message }:{message:any}) {
    return (
        <>
            <View style={styles.screen}>
                <Feather name="wifi-off" size={20} color="#fff" />
                <Text style={styles.text} >{message}</Text>
            </View>
        </>
    );
}
export default InternetConection;