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
import { ScrollView } from 'react-native-gesture-handler';
type Props = {}

const ForgetPassword = (props: Props) => {
    const { control, register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigation = useNavigation<NavigationType>()


    //Submit ForgetPassword Data
    const onSubmit = (data: object) => {
        console.log({ data })
        navigation.navigate('OTPVeritfication')
    }

    return (
        <MainView>
            <> 
                <BackHeader title='Forget Password'/>
                {/* <ScrollView style={styles.screen}> */}
                <View style={styles.screen}>
                    <Image source={imgs.forgetPass} style={styles.logoImg} />

                    <View style={[gStyles.width_250, gStyles.center, gStyles.alignCenter,]}>
                        <Text style={[gStyles.alignCenter, gStyles.alin_justify]}>Enter your registered phone to get a reset link and create a new password. </Text>
                    </View>

                    <CustomTextInput
                        label='Phone Number'
                        control={control}
                        error={errors.phone}
                        name="phone"
                        icon={() => <Feather name='phone' size={fontSizes.font20} />}
                        rightIcon={false}
                    />


                    <View style={[gStyles.center, gStyles.pt_15]}>
                        <Button textStyle={[gStyles.text_White, gStyles.text_center]} style={[gStyles.bg_Primary, gStyles.center]} onPress={handleSubmit(onSubmit)} title={"Get OTP"} />
                    </View>
                </View>
                {/* </ScrollView> */}
            </>
        </MainView>
    );
}

const styles = StyleSheet.create({

    screen: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
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