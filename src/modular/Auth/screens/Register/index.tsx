import { useNavigation } from '@react-navigation/native';
import  React, { useState } from 'react';
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
import CustomCheckbox from '../../../../common/CheckBox';
type Props = {}

const Login = (props: Props) => {
    const { control, register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigation = useNavigation<NavigationType>()
    const [agreeTermsOfUse , setAgreeTermsOfUse] = useState(false)


    //Submit Login Data
    const onSubmit = (data: object) => {
        console.log(data)
    }

    return (
        <MainView>
            <View style={styles.screen}>
                <Text style={[gStyles.alignCenter, gStyles.text_Primary, gStyles.h1]}>Register</Text>

                <CustomTextInput
                    label='Full Name'
                    control={control}
                    error={errors.phone}
                    name="Name"
                    icon={() => <Feather name='user' size={fontSizes.font20} />}
                    rightIcon={false}
                />

                <CustomTextInput
                    label='Phone Number'
                    control={control}
                    error={errors.phone}
                    name="phone"
                    icon={() => <Feather name='phone' size={fontSizes.font20} />}
                    rightIcon={false}
                />

                <CustomTextInput
                    label='Password'
                    control={control}
                    error={errors.phone}
                    name="password"
                    icon={() => <Feather name='lock' size={fontSizes.font20} />}
                    rightIcon={false}
                />

                <CustomTextInput
                    label='Confirm Password'
                    control={control}
                    error={errors.phone}
                    name="password"
                    icon={() => <Feather name='lock' size={fontSizes.font20} />}
                    rightIcon={false}
                />


                <View style={[gStyles.center]}>
                   <CustomCheckbox 
                    name={"agreeTermsOfUse"}
                    setValue={setAgreeTermsOfUse}
                    value={agreeTermsOfUse}
                    error={errors.agreeTermsOfUse}
                    label="I agree to the Terms of Services, Privacy Policy & Default notification settings of the Cat Prices App."
                   />

                    <Button textStyle={[gStyles.text_White, gStyles.text_center]} style={[gStyles.bg_Primary, gStyles.center]} onPress={handleSubmit(onSubmit)} title={"Register"} />
                    <Text style={[gStyles.alignCenter, gStyles.pt_15]}>Have an acount? </Text>
                    <Button textStyle={[gStyles.text_Primary, gStyles.h4]} style={[gStyles.alignCenter, styles.register]} onPress={() => { navigation.navigate("Login") }} title={"Login here"} />
                </View>
            </View>
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
        width: 250,
        height: 60,
        alignSelf: "center"
    },
    register: {
        padding: 0
    }

});

export default Login;