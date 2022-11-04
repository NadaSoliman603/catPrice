import * as React from 'react';
import { StyleSheet, View, Text , AppState} from 'react-native';
import CountDown from 'react-native-countdown-component';
import Colors from '../../../styles/colors';
import fontSizes from '../../../styles/fontSizes';
import { moderateScale } from '../../../styles/ResponsiveDimentions';
type Props = {}

const Timer = (props: Props) => {
    const [mount , setMount] = React.useState(true)
    const [resendTimer, setResendTimer] = React.useState(60)

    React.useEffect(() => {
        return () => {
            setResendTimer(0)
        };
      }, []);
         
    return (
        <View style={styles.screen}>
              <CountDown
                            until={resendTimer}
                            onFinish={() => {  setResendTimer(0) }}
                            onPress={()=>{}}
                            size={20}
                            digitStyle={{ backgroundColor: 'transparent', alignSelf: 'center' }}
                            digitTxtStyle={{ }}
                            timeToShow={['M', 'S']}
                            timeLabels={{ m: undefined, s: undefined }}
                            running={true}
                        />
          
            {/* <CountDown
                until={resendTimer}
                onFinish={() => { setResendTimer(0) } }
                onPress={() => { }}
                size={20}
                digitStyle={{
                    backgroundColor: Colors.white,
                    padding: 0,
                    margin: 0,
                    width: moderateScale(10),
                    height: moderateScale(12)
                }}
                timeToShow={['M', 'S']}
                digitTxtStyle={{
                    color: Colors.textLightGray,
                    fontWeight: "400",
                    fontSize: fontSizes.font16,
                }}
                timeLabels={{ m: undefined, s: undefined }}
                showSeparator
                separatorStyle={{
                    color: Colors.textLightGray, fontWeight: "400",
                    fontSize: fontSizes.font16,
                }}
            /> */}
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