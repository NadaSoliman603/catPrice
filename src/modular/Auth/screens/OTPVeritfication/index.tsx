import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View, Text, Image, InteractionManager } from 'react-native';
import imgs from '../../../../assets/images';
import Button from '../../../../common/Button';
import CustomTextInput from '../../../../common/CustomTextInput';
import MainView from '../../../../common/MainView';
import Colors from '../../../../styles/colors';
import fontSizes from '../../../../styles/fontSizes';
import gStyles, { hp, wp } from '../../../../styles/globalStyle';
import { NavigationType, RootStack } from '../../../../types/navigationTypes';
import Feather from 'react-native-vector-icons/Feather';
import BackHeader from '../../../../common/BackHeader';
import CircleInput from '../../../../common/CircleInput';
import { OTPRegiserActivationData } from '../../../../types/types';
import { OTPRegiserActivationApi, OTPUserActivationApi } from '../../../../Api/Auth';
import CountDown from 'react-native-countdown-component';
import { moderateScale } from '../../../../styles/ResponsiveDimentions';
import Timer from '../../components/Timer';
import OverLayLoading from '../../../../common/OverLayLoading';

type Props = {}
type ScreenRouteProp = RouteProp<RootStack, 'OTPVeritfication'>;

const OTPVeritfication = (props: Props) => {
    const { control, register, handleSubmit, watch, formState: { errors }, getValues } = useForm();
    const navigation = useNavigation<NavigationType>()
    const [disablVerityinButton, setDisablVerityinButton] = useState(true)
    const [veritivictatin, setVeritification] = useState<null | any>(null)
    const [loading, setLoading] = useState(false)
    // const [timer , setTimer] = useState(3)

    const route = useRoute<ScreenRouteProp>()
    const input1 = useRef()
    const input2 = useRef()
    const input3 = useRef()
    const input4 = useRef()
    //Submit OTPVeritfication Data
    const onSubmit = async (data: any) => {
      
        const code = data?.v1 + data.v2 + data.v3 + data.v4;
        const token = veritivictatin?.activationToken;
        console.log("submit code", { code },{veritivictatin} ,{ token } , )
        if (token) {
            try {
                setLoading(true)
                const res = await OTPUserActivationApi({ activationCode: code, activationToken: token })
                console.log({ res })
                setLoading(false)
                if (res?.data?.body) {
                    console.log(res)
                    navigation.navigate("Login")
                }
            } catch (error) {
                console.log(error)
            }
        }
        console.log(code)
        navigation.navigate('Login')
        console.log(veritivictatin)
    }

    //sent Phon OTP
    const sendOTP = async ({ mobileCode, mobileNo }: OTPRegiserActivationData) => {
        try {
            setLoading(true)
            const res = await OTPRegiserActivationApi({ mobileCode: mobileCode, mobileNo: mobileNo })
            const veritivictatin = res?.data?.body
            console.log("respons ===>", {res})
            console.log("veritivictatin====>",{veritivictatin})
            setVeritification(veritivictatin)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const params = route.params
        console.log({params})
        sendOTP({ mobileCode: params.mobileCode, mobileNo: params.phone })
        return () => {

        }
    }, [])


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

                    <View style={[gStyles.pt_15, gStyles.row, gStyles.spaceBetwen, gStyles.width_230, gStyles.selfCenter]}>
                        <CircleInput setDisablVerityinButton={setDisablVerityinButton} getValues={getValues} inputRef={input1} foucsNextInput={input2} name={"v1"} control={control} />
                        <CircleInput setDisablVerityinButton={setDisablVerityinButton} getValues={getValues} inputRef={input2} foucsNextInput={input3} name={"v2"} control={control} />
                        <CircleInput setDisablVerityinButton={setDisablVerityinButton} getValues={getValues} inputRef={input3} foucsNextInput={input4} name={"v3"} control={control} />
                        <CircleInput setDisablVerityinButton={setDisablVerityinButton} getValues={getValues} inputRef={input4} foucsNextInput={input1} name={"v4"} control={control} />
                    </View>


                    <View style={[gStyles.center, gStyles.pt_15]}>
                        <Button textStyle={[gStyles.text_White, gStyles.text_center]} style={[!disablVerityinButton && gStyles.bg_Primary, disablVerityinButton && gStyles.disableButon, gStyles.center]} onPress={handleSubmit(onSubmit)} title={"Verify"} />
                        <Timer />
                        <Text style={[gStyles.alignCenter, gStyles.pt_20]}>Don't receive the OTP?</Text>
                        <Button textStyle={[gStyles.text_Primary, gStyles.h4]} style={[gStyles.alignCenter, styles.register]} onPress={sendOTP} title={"Send Again"} />
                    </View>

                </View>
            </>
            {loading && <OverLayLoading />}
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


//1001540746  1001540746