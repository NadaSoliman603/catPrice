import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View, Text, Pressable } from 'react-native';
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
import PickCountryCode from '../../../../common/CountryPicker';
import Entypo from 'react-native-vector-icons/Entypo';

type Props = {}

const Register = (props: Props) => {
    const { control, register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigation = useNavigation<NavigationType>()
    const [agreeTermsOfUse, setAgreeTermsOfUse] = useState(false)
    const [show, setShow] = React.useState(false);
    const [countryCode, setCountryCode] = React.useState('+61');


    //Submit Register Data
    const onSubmit = (data: object) => {
        console.log(data)
    }

    return (
        <View style={styles.screen}>
            <View style={styles.screen}>
                <Text style={[gStyles.alignCenter, gStyles.text_Primary, gStyles.h1]}>Register</Text>

                <CustomTextInput
                    label='Full Name'
                    control={control}
                    error={errors.phone}
                    name="Name"
                    icon={() => <Feather name='user' size={fontSizes.font20} />}
                    rightIcon={false}
                    keyboard={false}
                    secureTextEntry={false}
                    rules={{  }}
                />

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
                    rules={{  required :true, }}
                />

                <CustomTextInput
                    label='Password'
                    control={control}
                    error={errors.phone}
                    name="password"
                    icon={() => <Feather name='lock' size={fontSizes.font20} />}
                    rightIcon={false}
                    keyboard={false}
                    secureTextEntry={true}
                    rules={{  required :true, }}
                />

                <CustomTextInput
                    label='Confirm Password'
                    control={control}
                    error={errors.phone}
                    name="passwordConfairmatin"
                    icon={() => <Feather name='lock' size={fontSizes.font20} />}
                    rightIcon={false}
                    keyboard={false}
                    secureTextEntry={true}
                    rules={{  required :true, }}
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
        width: 250,
        height: 60,
        alignSelf: "center"
    },
    register: {
        padding: 0
    }

});

export default Register;