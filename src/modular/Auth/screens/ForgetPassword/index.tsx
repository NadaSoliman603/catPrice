import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
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
import { ScrollView } from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import PickCountryCode from '../../../../common/CountryPicker';

type Props = {}

const ForgetPassword = (props: Props) => {
    const { control, register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigation = useNavigation<NavigationType>()

    const [show, setShow] = React.useState(false);
    const [countryCode, setCountryCode] = React.useState('+61');
    
    //Submit ForgetPassword Data
    const onSubmit = (data: object) => {
        console.log({ data })
        navigation.navigate('OTPVeritfication' ,{mobileCode:"20", phone:"1128859098"})
    }

    return (
        <View style={styles.screen}>
            <>
                <BackHeader title='Forget Password' />
                {/* <ScrollView style={styles.screen}> */}
                <View style={styles.screen}>
                    <Image source={imgs.forgetPass} style={styles.logoImg} />

                    <View style={[gStyles.width_250, gStyles.center, gStyles.alignCenter,]}>
                        <Text style={[gStyles.alignCenter, gStyles.alin_justify]}>Enter your registered phone to get a reset link and create a new password. </Text>
                    </View>

                    <PickCountryCode
                        setCountryCode={setCountryCode}
                        setShow={setShow}
                        show={show}
                    />

                    <CustomTextInput
                        secureTextEntry={false}
                        keyboard={"number-pad"}
                        label='Phone Number'
                        control={control}
                        error={errors.phone}
                        name="phone"
                        icon={() => <Feather name='phone' size={fontSizes.font20} />}
                        rightIcon={() => <Pressable onPress={() => { setShow(true) }} style={({ pressed }) => [{ backgroundColor: pressed ? Colors.bg : "#fff" }, gStyles.py_2, gStyles.row_Center]}>
                            <Text style={[gStyles.text_Primary, gStyles.h6, gStyles.selfCenter]}>{countryCode}</Text>
                            <Entypo color={Colors.primary} name='chevron-small-down' size={fontSizes.font10} />
                        </Pressable>}
                        rules={{ required: true, }}

                    />


                    <View style={[gStyles.center, gStyles.pt_15]}>
                        <Button textStyle={[gStyles.text_White, gStyles.text_center]} style={[gStyles.bg_Primary, gStyles.center]} onPress={handleSubmit(onSubmit)} title={"Get OTP"} />
                    </View>
                </View>
                {/* </ScrollView> */}
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
        width: 260,
        height: 250,
        alignSelf: "center"
    },
    register: {
        padding: 0
    }

});

export default ForgetPassword;