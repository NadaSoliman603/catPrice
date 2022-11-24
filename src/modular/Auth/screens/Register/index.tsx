import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native';
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
import CountryPicker from 'react-native-country-picker-modal'
import CurrancyButton from './CurrancyButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { moderateScale } from '../../../../styles/ResponsiveDimentions';
import Error from '../../../../common/Error';
import OverLayLoading from '../../../../common/OverLayLoading';
import { registerApi } from '../../../../Api/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { Login } from '../../../../Redux/reducers/AuthReducer';
import { RootState } from '../../../../Redux/store/store';
import { AuthCustomNav, Phone } from '../..';

type Props = {
    handelAuthScreens:(screen :AuthCustomNav)=>void,
    handelPhonNumber:(phone:Phone)=>void
}

const Register = (props: Props) => {
    const { control, register, handleSubmit, watch, formState: { errors } } = useForm();
    // const navigation = useNavigation<NavigationType>()
    const [agreeTermsOfUse, setAgreeTermsOfUse] = useState(false)
    const [show, setShow] = React.useState(false);
    const loction = useSelector((state: RootState) => state.Location)

    const [countryCode, setCountryCode] = React.useState<any>(loction);
    const [currancy, setcurrancy] = React.useState<any>(loction);

    const [validation, setValidation] = useState({ confairmPass: true, checked: true })
    const [loading, setLoading] = useState(false)
    const [serverMessage, setServerMssage] = useState<boolean | string>(false)
    const [mount, setMount] = useState<boolean>(true)


    //===========================
    // submit Register Data 
    //===========================
    const dispatch = useDispatch()

    const onSubmit = async (data: any) => {
        const confairmPass: boolean = data.password === data.passwordConfairmatin
       try {
        if (!confairmPass || !agreeTermsOfUse) {
            setValidation({
                confairmPass: confairmPass,
                checked: agreeTermsOfUse
            })
        } else {
            setValidation({
                confairmPass: true,
                checked: true
            })
            setLoading(true)
            const res = await registerApi({
                countryCode: countryCode.cca2,
                countryEn: countryCode.name,
                defCurrency: currancy.currency[0],
                fullNameEn: data.name,
                mobileCode: countryCode.callingCode[0],
                mobileNo: data.phone,
                password: data.password
            })
            const user = res.data.body
            console.log(res)
            if (user === null) {
                if (mount) {
                    console.log(res)
                    setServerMssage(res.data.header.headerMessage ||res.data.header.httpStatus)
                    setLoading(false)
                }
            } else {
                console.log(user)
                // AsyncStorage.setItem('user', JSON.stringify(user))
                // dispatch(Login({user:user , token:user.to}))
                props.handelPhonNumber({mobileCode: countryCode.callingCode[0], phone:data.phone , screen:'Register'})
                props.handelAuthScreens("OTPVeritfication")
                // navigation.navigate("OTPVeritfication" , {mobileCode: countryCode.callingCode[0], phone:data.phone})
                if (mount) setLoading(false)
            }
        }
       } catch (error) {
        console.log(error)
       }
    }

    useEffect(()=>{
        return()=>setMount(false)
    },[])
    return (
        <>
            <View style={{ flex: 1, backgroundColor: Colors.white, padding:moderateScale(6) }}>
                <View style={styles.screen}>
                    <Text style={[gStyles.alignCenter, gStyles.text_Primary, gStyles.h1 , gStyles.pb_6]}>Register</Text>

                    <CustomTextInput
                        label='Full Name'
                        control={control}
                        error={errors.phone}
                        name="name"
                        icon={() => <Feather name='user' size={fontSizes.font20} />}
                        rightIcon={false}
                        keyboard={false}
                        secureTextEntry={false}
                        rules={{
                            min:3,
                            max:20
                        }}
                    />
{/* 
                    <PickCountryCode
                        setCountryCode={setCountryCode}
                        setShow={setShow}
                        show={show}
                    /> */}

                    <CustomTextInput
                        secureTextEntry={false}
                        keyboard={"number-pad"}
                        label='Phone Number'
                        control={control}
                        error={errors.phone}
                        name="phone"
                        icon={() => <Feather name='phone' size={fontSizes.font20} />}
                        rightIcon={() => <Pressable onPress={() => { setShow(true) }} style={({ pressed }) => [{ backgroundColor: pressed ? Colors.bg : "#fff" }, gStyles.py_2, gStyles.row_Center]}>
                            {/* <Entypo color={Colors.primary} name='chevron-small-down' size={fontSizes.font10} /> */}
                            {/* <Text style={[gStyles.text_Primary, gStyles.h6, gStyles.selfCenter]}>{countryCode}</Text> */}
                            <Ionicons name='caret-down-outline' size={fontSizes.font12} />

                            <CountryPicker
                                countryCode={countryCode.cca2}
                                withFilter={true}
                                withFlag={true}
                                // withCountryNameButton={true}
                                withAlphaFilter={true}
                                withCallingCode={true}
                                withEmoji={true}
                                onSelect={(country) => {
                                    console.log(country)
                                    setCountryCode(country)
                                }}
                                // withCurrency={true}
                                visible={false}
                                containerButtonStyle={{ width: moderateScale(10) }}
                            />
                        </Pressable>}
                        rules={{ required: true, }}
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
                        rules={{ required: true, }}
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
                        rules={{
                            required: true,

                        }}
                    />
                    {!validation.confairmPass && <Error message='Password should be match' />}


                    <CurrancyButton currancy={currancy} setcurrancy={(value) => { setcurrancy(value) }} />

                    <View style={[gStyles.center]}>
                        <CustomCheckbox
                            name={"agreeTermsOfUse"}
                            setValue={setAgreeTermsOfUse}
                            value={agreeTermsOfUse}
                            error={errors.agreeTermsOfUse}
                            label="I agree to the Terms of Services, Privacy Policy & Default notification settings of the Cat Prices App."
                        />
                        {!validation.checked && <Error message='Please agree to the terms of use' />}
                        {serverMessage &&<Error message={typeof (serverMessage) === 'string' ? "User Already exists" : "Request Failed"} />}

                        <Button textStyle={[gStyles.text_White, gStyles.text_center]} style={[gStyles.bg_Primary, gStyles.center]} onPress={handleSubmit(onSubmit)} title={"Register"} />
                        <Text style={[gStyles.alignCenter, gStyles.pt_15]}>Have an acount? </Text>
                        <Button textStyle={[gStyles.text_Primary, gStyles.h4]} style={[gStyles.alignCenter, styles.register]} onPress={() => { 
                           // navigation.navigate("Login") 
                           props.handelAuthScreens("Login")
                            }} title={"Login here"} />
                    </View>


                    
                </View>
            </View>
            {loading && <OverLayLoading />}

        </>
    );
}

const styles = StyleSheet.create({

    screen: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",

        // flex: 1,
        backgroundColor: Colors.white,
        // padding: "5%",
        // minHeight: hp(100)
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