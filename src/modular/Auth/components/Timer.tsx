import * as React from 'react';
import { StyleSheet, View, Text, AppState } from 'react-native';
import Colors from '../../../styles/colors';
import fontSizes from '../../../styles/fontSizes';
import { moderateScale } from '../../../styles/ResponsiveDimentions';
// import TimerCountdown from "react-native-timer-countdown";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import CountDown from 'react-native-countdown-component';
import gStyles from '../../../styles/globalStyle';

type Props = {
    onFinsh :()=>void,
    resend:number,
}

const Timer = ({onFinsh , resend}:Props) => {
    const [isPlaying, setIsPlaying] = React.useState(true)


   
    const children = ({ remainingTime }: any) => {
        const hours = Math.floor(remainingTime / 3600)
        const minutes = Math.floor((remainingTime % 3600) / 60)
        const seconds = remainingTime % 60

        return `${minutes}:${seconds}`
    }

    return (
        <View style={styles.screen}>

            <CountdownCircleTimer
                key={resend}
                isPlaying={isPlaying}
                duration={resend}
                colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                colorsTime={[4, 5, 2, 0]}
                strokeWidth={0}
                trailStrokeWidth={0}
                // strokeLinecap="square"
                size={moderateScale(20)}
                // rotation="counterclockwise"
            >
                {({ remainingTime }) => {
                    if(remainingTime === 0){
                        onFinsh()
                    }
                    const time = children({ remainingTime })
                    return <Text style={[gStyles.text_lightGray]}>{time}</Text>
                }}
            </CountdownCircleTimer>
        </View>
    );

}

const styles = StyleSheet.create({
    screen: {
        borderBottomWidth: moderateScale(0.23),
        borderColor: Colors.textLightGray,
        width: moderateScale(30),
        alignSelf: "center",
        alignItems: "center",
        height:moderateScale(16)
    }
});

export default Timer;