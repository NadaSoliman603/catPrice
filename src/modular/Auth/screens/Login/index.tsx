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
import PickCountryCode from '../../../../common/CountryPicker';
import Entypo from 'react-native-vector-icons/Entypo';
import { loginApi } from '../../../../Api/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux'
import { Login as login } from '../../../../Redux/reducers/AuthReducer';

type Props = {}

const Login = (props: Props) => {
    const { control, register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigation = useNavigation<NavigationType>()
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const [mobileCode, setMobileCode] = useState('+61');
    // const [mount , setMount] = useState<boolean>(true)


    useEffect(() => {
        const checkLogin = async () => {
            const userinfo = await AsyncStorage.getItem("user")
            if (userinfo) {
                // navigation.reset({
                //     index: 0,
                //     routes: [{ name: 'Home' }],
                // })
                console.log(JSON.parse(userinfo))
            }
        }
        checkLogin()
        return () => { };
    }, []);


    //Submit Login Data
    const onSubmit = async (authData: any) => {
        const loginData = {
            username: authData.username,
            password: authData.password,
            mobileCode: mobileCode.substring(1),
        }
        try {
            const res = await loginApi(loginData)
            const user = res.data.body
            console.log(user)
            AsyncStorage.setItem('user', JSON.stringify(user))

            dispatch(login(user))
            navigation.navigate("Home")

        } catch (error) {
            console.log("error", error)
        }
    }


    return (
        <View style={styles.screen}>
            <View style={styles.screen}>
                <Image source={imgs.logo} style={styles.logoImg} />
                <Text style={[gStyles.alignCenter, gStyles.text_Primary, gStyles.h1]}>Login</Text>

                <PickCountryCode
                    setCountryCode={setMobileCode}
                    setShow={setShow}
                    show={show}
                />
                <CustomTextInput
                    secureTextEntry={false}
                    keyboard={"number-pad"}
                    label='Phone Number'
                    control={control}
                    error={errors.username}
                    name="username"
                    icon={() => <Feather name='phone' size={fontSizes.font20} />}
                    rightIcon={() => <Pressable onPress={() => { setShow(true) }} style={({ pressed }) => [{ backgroundColor: pressed ? Colors.bg : "#fff" }, gStyles.py_2, gStyles.row_Center]}>
                        <Text style={[gStyles.text_Primary, gStyles.h6, gStyles.selfCenter]}>{mobileCode}</Text>
                        <Entypo color={Colors.primary} name='chevron-small-down' size={fontSizes.font10} />
                    </Pressable>}
                    rules={{
                        required: true,
                        // minLength:10,
                        // maxLength:10,
                    }}
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
                    <Button textStyle={[gStyles.text_White, gStyles.text_center]} style={[gStyles.bg_Primary, gStyles.center]} onPress={handleSubmit(onSubmit)} title={"Login"} />
                    <Text style={[gStyles.alignCenter, gStyles.pt_20]}>Don't have an acount? </Text>
                    <Button textStyle={[gStyles.text_Primary, gStyles.h4]} style={[gStyles.alignCenter, styles.register]} onPress={() => { navigation.navigate("Register") }} title={"Register here"} />
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

export default Login;