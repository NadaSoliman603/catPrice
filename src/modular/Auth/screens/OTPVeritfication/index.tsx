import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View, Text, Image } from 'react-native';
import imgs from '../../../../assets/images';
import Button from '../../../../common/Button';
import CustomTextInput from '../../../../common/CustomTextInput';
import MainView from '../../../../common/MainView';
import Colors from '../../../../styles/colors';
import fontSizes from '../../../../styles/fontSizes';
import gStyles, { hp, wp } from '../../../../styles/globalStyle';
import { NavigationType } from '../../../../types/navigationTypes';
import Feather from 'react-native-vector-icons/Feather';
import BackHeader from '../../../../common/BackHeader';
import CircleInput from '../../../../common/CircleInput';
type Props = {}

const OTPVeritfication = (props: Props) => {
    const { control, register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigation = useNavigation<NavigationType>()


    //Submit OTPVeritfication Data
    const onSubmit = (data: object) => {
        console.log(data)
        navigation.navigate('OTPVeritfication')
    }

    //sent Phon OTP
    const sendOTP = () => {
        console.log("Send OTP")
    }

    return (
        <View style={styles.screen}>
            <>
                <BackHeader title='OTP Verification' />
                <View style={styles.screen}>
                    <Image source={imgs.OTP_Vetitification} style={styles.logoImg} />

                    <View style={[gStyles.width_270, gStyles.center, gStyles.alignCenter,]}>
                        <Text style={[gStyles.alignCenter, gStyles.text_center]}>We have sent you an OTP on your <Text style={[gStyles.text_Primary]}>Phone</Text>, Enter in fields to get verified.</Text>
                    </View>

                    <Text style={[gStyles.alignCenter, gStyles.text_center, gStyles.text_Primary, gStyles.pt_15, gStyles.h1]}>Phone Verification</Text>

                    <View style={[ gStyles.pt_15,gStyles.row , gStyles.spaceBetwen , gStyles.width_230 , gStyles.selfCenter]}>
                        <CircleInput name={"v1"} control={control} />
                        <CircleInput name={"v2"} control={control} />
                        <CircleInput name={"v3"} control={control} />
                        <CircleInput name={"v4"} control={control} />
                        <CircleInput name={"v5"} control={control} />
                    </View>

                    <View style={[gStyles.center, gStyles.pt_15]}>
                        <Button textStyle={[gStyles.text_White, gStyles.text_center]} style={[gStyles.bg_Primary, gStyles.center]} onPress={handleSubmit(onSubmit)} title={"Verify"} />
                        <Text style={[gStyles.alignCenter, gStyles.pt_20]}>Don't receive the OTO?</Text>
                        <Button textStyle={[gStyles.text_Primary, gStyles.h4]} style={[gStyles.alignCenter, styles.register]} onPress={sendOTP} title={"Send Again"} />
                    </View>

                </View>
            </>
        </View>
    );
}

const styles = StyleSheet.create({

    screen: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
      
        // flex: 1,
        backgroundColor: Colors.white,
        padding: "2.5%"
    },
    logoImg: {
        width: 290,
        height: 200,
        alignSelf: "center"
    },
    register: {
        padding: 0
    }

});

export default OTPVeritfication;