import * as React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import FastImage from 'react-native-fast-image';
import imgs from '../assets/images';
import Colors from '../styles/colors';
import Feather from 'react-native-vector-icons/Feather';
import { moderateScale } from '../styles/ResponsiveDimentions';
import gStyles, { hp, wp } from '../styles/globalStyle';
import fontSizes from '../styles/fontSizes';
import { useNavigation } from '@react-navigation/native';
import { NavigationType } from '../types/navigationTypes';
import BackHeader from '../common/BackHeader';
import OutLineButton from '../common/OutLineButton';
import { ScrollView } from 'react-native-gesture-handler';
type Props = {}

const OnBoarding3 = (props: Props) => {
    const navigation = useNavigation<NavigationType>()

    return (
        <View style={styles.screen}>
            <ScrollView>
                <View style={{ alignItems: "center", }}>
                    <BackHeader onBack={() => { navigation.goBack() }} title="" />
                    <Text style={styles.header}>Quick, Easy & Reliable</Text>
                    {/* <Text style={styles.subTitle}>we update the prices every 2 hours </Text> */}
                    <Text style={styles.subTitle}>
                        <Text style={[gStyles.text_Primary, gStyles.text_Bold]}>Cat Price </Text>
                        ensures the usability to be easy and secure to provide you the best Cat market experience.
                    </Text>
                    <FastImage resizeMode="contain" style={styles.image} source={imgs.onBoarding3} />
                </View>




                <View style={styles.footerContainer}>
                    <OutLineButton textStyle={{}} title='Let’s Go!' style={{}} icon={<Text></Text>} onPress={() => {
                        // props.cancelNoCriditeModal()
                        navigation.navigate('Home')
                    }} outline={true} />

                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.white,
        justifyContent: "space-between",
        // alignContent:"center",
        alignItems: "center",
        padding: moderateScale(6)
    },
    image: {
        height: hp(65),
        width: wp(100),
        // backgroundColor: "red",
        padding: 0
    },
    frame: {
        width: moderateScale(15),
        height: moderateScale(5),

    },
    header: {
        color: Colors.primary,
        fontWeight: "700",
        fontSize: fontSizes.font20,
        paddingBottom: moderateScale(3)
    },
    subTitle: {
        color: Colors.textBlack,
        fontWeight: "400",
        fontSize: fontSizes.font16,
        paddingHorizontal: moderateScale(12),
        textAlign: "center"
    },
    footerContainer: {
        width: "100%",
        alignSelf: "flex-end",
        paddingBottom: moderateScale(3)

    }
});

export default OnBoarding3;