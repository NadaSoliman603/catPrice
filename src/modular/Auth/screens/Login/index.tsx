import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
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
// import PickCountryCode from '../../../../common/CountryPicker';
import Entypo from 'react-native-vector-icons/Entypo';
import { loginApi } from '../../../../Api/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux'
import { Login as login } from '../../../../Redux/reducers/AuthReducer';
import OverLayLoading from '../../../../common/OverLayLoading';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CountryPicker from 'react-native-country-picker-modal'
import { moderateScale } from '../../../../styles/ResponsiveDimentions';
import Error from '../../../../common/Error';
import { RootState } from '../../../../Redux/store/store';
type Props = {}

const Login = (props: Props) => {
    const { control, register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigation = useNavigation<NavigationType>()
    const loction = useSelector((state: RootState) => state.Location)
    console.log({loction})
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    // const [mount , setMount] = useState<boolean>(true)
    const [loading, setLoading] = useState(false)
    const [countryCode, setCountryCode] = useState<any>(loction);
    const [serverError, setServerError] = useState<boolean>(false)
    useEffect(() => {
        // const checkLogin = async () => {
        //     const userinfo = await AsyncStorage.getItem("user")
        //     if (userinfo) { }
        // }
        // checkLogin()
        return () => { };
    }, []);


    //==========================
    //Submit Login Data
    //==========================
    const onSubmit = async (authData: any) => {
        const loginData = {
            username: authData.phone,
            mobileCode:  countryCode.callingCode[0],
            password:  authData.password,
        }
        try {
            console.log({ loginData })
            setLoading(true)
            const res = await loginApi(loginData)
            setLoading(false)

            const user = res.data.body
            if (user === null) {
                const headerMessage = res.data.header.headerMessage
                if (headerMessage === "User No Active Mobile") {
                    console.log("login creen " ,{ mobileCode:countryCode.callingCode[0], phone:authData.phone})
                    navigation.navigate("OTPVeritfication" , {mobileCode:countryCode.callingCode[0], phone:authData.phone,}) 
                }
                if (headerMessage === 'WRONG_CREDENTIAL') {
                    setServerError(true)
                }
            }else{
                AsyncStorage.setItem('user', JSON.stringify(user))
                console.log(user)
                dispatch(login({user:user , token:user.token}))
                navigation.navigate("Home")
            }

        } catch (error) {
            console.log(error)
            setServerError(true)
            setLoading(false)
        }
    }


    return (
        <View style={styles.screen}>
            <View style={styles.screen}>
                <Image source={imgs.logo} style={styles.logoImg} />
                <Text style={[gStyles.alignCenter, gStyles.text_Primary, gStyles.h1]}>Login</Text>

                <CustomTextInput
                    secureTextEntry={false}
                    keyboard={"number-pad"}
                    label='Phone Number'
                    control={control}
                    error={errors.phone}
                    name="phone"
                    icon={() => <Feather name='phone' size={fontSizes.font20} />}
                    rightIcon={() => <Pressable onPress={() => { setShow(true) }} style={({ pressed }) => [{ backgroundColor: pressed ? Colors.bg : "#fff" }, gStyles.py_2, gStyles.row_Center]}>
                        <Ionicons name='caret-down-outline' size={fontSizes.font12} />
                        <CountryPicker
                            countryCode={countryCode.cca2}
                            withFilter={true}
                            withFlag={true}
                            // withCountryNameButton={true}
                            withAlphaFilter={true}
                            withCallingCode={true}
                            withEmoji={true}
                            onSelect={(country: any) => {
                                setCountryCode(country)
                            }}
                            // withCurrency={true}
                            visible={show}
                            containerButtonStyle={{ width: moderateScale(10) }}
                        />
                    </Pressable>}
                    rules={{ required: true, }}
                />


                <CustomTextInput
                    secureTextEntry={true}
                    keyboard={"default"}
                    label='Password'
                    control={control}
                    error={errors.password}
                    name="password"
                    icon={() => <Feather name='eye' size={fontSizes.font20} />}
                    rightIcon={false}
                    rules={{
                        required: true,
                        // minLength : 4
                    }}
                />



                <View style={[gStyles.center]}>
                    <Button textStyle={[gStyles.text_sm, gStyles.text_Primary]} style={[gStyles.alignCenter]} onPress={() => { navigation.navigate('ForgetPassword') }} title={"I forget my Password"} />
                    {serverError && <Error message="That's not the right password or phone number tray again" />}
                    <Button textStyle={[gStyles.text_White, gStyles.text_center]} style={[gStyles.bg_Primary, gStyles.center]} onPress={handleSubmit(onSubmit)} title={"Login"} />
                    <Text style={[gStyles.alignCenter, gStyles.pt_20]}>Don't have an acount? </Text>
                    <Button textStyle={[gStyles.text_Primary, gStyles.h4]} style={[gStyles.alignCenter, styles.register]} onPress={() => { navigation.navigate("Register") }} title={"Register here"} />
                </View>
            </View>
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
        width: 250,
        height: 60,
        alignSelf: "center"
    },
    register: {
        padding: 0
    }

});

export default Login;