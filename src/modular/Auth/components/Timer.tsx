import * as React from 'react';
import { StyleSheet, View, Text, AppState } from 'react-native';
import Colors from '../../../styles/colors';
import fontSizes from '../../../styles/fontSizes';
import { moderateScale } from '../../../styles/ResponsiveDimentions';
// import TimerCountdown from "react-native-timer-countdown";
// import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import CountDown from 'react-native-countdown-component';


const Timer = () => {


    return (
        <View style={styles.screen}>
           
        </View>
    );

}

const styles = StyleSheet.create({
    screen: {
        borderBottomWidth: moderateScale(0.23),
        borderColor: Colors.textLightGray,
        width: moderateScale(40),
        alignSelf: "center"
    }
});

export default Timer;