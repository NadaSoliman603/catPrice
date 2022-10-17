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
import PickCountryCode from '../../../../common/CountryPicker';
// import PickCountryCode from '../../../../common/CountryPicker';
type Props = {}

const Login = (props: Props) => {
    const { control, register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigation = useNavigation<NavigationType>()

    const [show, setShow] = React.useState(false);
    const [countryCode, setCountryCode] = React.useState('+61');
    //Submit Login Data
    const onSubmit = (data: object) => {
        console.log(data)
        navigation.navigate('Home')
    }

    return (
        <MainView>
            <View style={styles.screen}>
                <Image source={imgs.logo} style={styles.logoImg} />
                <Text style={[gStyles.alignCenter, gStyles.text_Primary, gStyles.h1]}>Login</Text>

                <PickCountryCode 
                    setCountryCode={setCountryCode}
                    setShow={setShow}
                    show={show}
                />
                <CustomTextInput
                    label='Phone Number'
                    control={control}
                    error={errors.phone}
                    name="phone"
                    icon={() => <Feather name='phone' size={fontSizes.font20} />}
                    rightIcon={() => <Button textStyle={[]} style={[]} onPress={() => {setShow(true) }} title={countryCode} />}
                />

                <CustomTextInput
                    label='Password'
                    control={control}
                    error={errors.phone}
                    name="password"
                    icon={() => <Feather name='eye' size={fontSizes.font20} />}
                    rightIcon={false}
                />

                <View style={[gStyles.center]}>
                    <Button textStyle={[gStyles.text_sm, gStyles.text_Primary]} style={[gStyles.alignCenter]} onPress={() => { navigation.navigate('ForgetPassword') }} title={"I forget my Password"} />
                    <Button textStyle={[gStyles.text_White, gStyles.text_center]} style={[gStyles.bg_Primary, gStyles.center]} onPress={handleSubmit(onSubmit)} title={"Login"} />
                    <Text style={[gStyles.alignCenter, gStyles.pt_20]}>Don't have an acount? </Text>
                    <Button textStyle={[gStyles.text_Primary, gStyles.h4]} style={[gStyles.alignCenter, styles.register]} onPress={() => { navigation.navigate("Register") }} title={"Register here"} />
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