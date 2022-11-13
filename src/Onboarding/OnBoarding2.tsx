import * as React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import FastImage from 'react-native-fast-image';
import imgs from '../assets/images';
import Colors from '../styles/colors';
import Feather from 'react-native-vector-icons/Feather';
import { moderateScale } from '../styles/ResponsiveDimentions';
import { hp, wp } from '../styles/globalStyle';
import fontSizes from '../styles/fontSizes';
import { useNavigation } from '@react-navigation/native';
import { NavigationType } from '../types/navigationTypes';
import BackHeader from '../common/BackHeader';
type Props = {}

const OnBoarding2 = (props: Props) => {
    const navigation = useNavigation<NavigationType>()

    return (
        <View style={styles.screen}>
            <View style={{ alignItems: "center", }}>
                <BackHeader onBack={()=>{navigation.goBack()}}title=""/>
                <Text style={styles.header}>Get In-depth Cat Details</Text>
                {/* <Text style={styles.subTitle}>we update the prices every 2 hours </Text> */}
                <Text style={styles.subTitle}> Get more details about your catalytic converters & the amount of metals inside of each catalytic with full description.</Text>
                <FastImage resizeMode="contain" style={styles.image} source={imgs.onBoarding2} />
                <FastImage resizeMode='contain' style={styles.frame} source={imgs.frame2} />
            </View>




            <View style={styles.footerContainer}>
                <Pressable onPress={() => navigation.navigate("Home")}><Text>Skip</Text></Pressable>

                <Pressable style={() => [{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                    alignSelf: "center"
                }]} onPress={() => navigation.navigate("OnBoarding3")}>
                    <Text style={{ color: Colors.primary }}>Next </Text>
                    <Feather color={Colors.primary} size={moderateScale(7)} name='arrow-right' />
                </Pressable>

            </View>



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
        flexDirection: "row",
        justifyContent: "space-between",
        // flex:1,
        width: "100%",
        alignSelf: "flex-end",
        paddingBottom:moderateScale(3)

    }
});

export default OnBoarding2;