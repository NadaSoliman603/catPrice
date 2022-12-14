import * as React from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View, Text } from 'react-native';
import Button from '../../../common/Button';
import CustomTextInput from '../../../common/CustomTextInput';
import Error from '../../../common/Error';
import OverLayLoading from '../../../common/OverLayLoading';
import fontSizes from '../../../styles/fontSizes';
import gStyles from '../../../styles/globalStyle';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../../styles/colors';
import { ScrollView } from 'react-native-gesture-handler';
import { moderateScale } from '../../../styles/ResponsiveDimentions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store/store';
import { changePasswordApi } from '../../../Api/Auth';
import { useNavigation } from '@react-navigation/native';
import { NavigationType } from '../../../types/navigationTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Login } from '../../../Redux/reducers/AuthReducer';
import { ShowModal } from '../../../Redux/reducers/AuthModalReducer';
import FastImage from 'react-native-fast-image';
import imgs from '../../../assets/images';
import { Alert } from '../../../types/types';
import CustomAwesomeAlert from '../../../components/AwesomeAlert';
// import SweetAlert from 'react-native-sweet-alert';

type Props = {}

const Changepassword = (props: Props) => {
    const { control, register, handleSubmit, watch, formState: { errors } } = useForm();
    const [loading, setLoading] = React.useState<boolean>(false)
    const [validation, setValidation] = React.useState({ confairmPass: true, msg: "" })
    const token = useSelector((state: RootState) => state.Auth.token)
    const dispatch = useDispatch()
    const navigation = useNavigation<NavigationType>()

    const [showAlert, setShowAlert] = React.useState(false)
    const [alert, setalert] = React.useState<Alert>({
        message: "",
        onCancel: () => { setShowAlert(false) },
        onConfairm: () => {},
        showCancelButton: false,
        type: 'success',
        suTitle: undefined
    })
    const onSubmit = async (data: any) => {

        const confairmPass: boolean = data.password === data.passwordConfairmatin
        if (!confairmPass) {
            setValidation({ confairmPass: confairmPass, msg: "Password should be match" })
        } else {
            setLoading(true)
            try {
                const passwordData = {
                    oldPassword: data.oldpassword,
                    newPassword: data.password,
                    confirmPassword: data.passwordConfairmatin
                }
                if (token) {
                    const res = await changePasswordApi({ data: passwordData, token: token })
                    console.log("change Password", { res }, res.data?.header?.httpStatusCode)
                    if (res.data?.header?.httpStatusCode === 200) {
                        await AsyncStorage.removeItem("user")
                        dispatch(Login({    token: null, user: null}))
                        setalert({
                            message:"Password change successfully",
                            onCancel:()=>{},
                            onConfairm:()=>{
                                dispatch(ShowModal(true))
                                navigation.goBack()
                                setShowAlert(false)
                            },
                            showCancelButton:false,
                            suTitle:"",
                            type:"success"
                        })
                        setShowAlert(true)
                    } else {
                        setalert({
                            message:res.data?.header.headerMessage,
                            onCancel:()=>{},
                            onConfairm:()=>{setShowAlert(false)},
                            showCancelButton:false,
                            suTitle:"try again",
                            type:"error"
                        })
                        setShowAlert(true)
                        setValidation({ confairmPass: true, msg: "" })
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
        setLoading(false)
    }
    return (
        <>
            <ScrollView style={{ flex: 1, backgroundColor: Colors.white, }}>
                {/* <StatusBar backgroundColor={Colors.white}/> */}
                {loading && <OverLayLoading />}
                <View style={styles.screen} >
                    <FastImage resizeMode='contain' source={imgs.changePassword} style={{ width: "100%", height: "100%" }} />
                    <CustomTextInput
                        label='Old Password'
                        control={control}
                        error={errors.oldpassword}
                        name="oldpassword"
                        icon={() => <Feather name='lock' size={fontSizes.font20} />}
                        rightIcon={false}
                        keyboard={false}
                        secureTextEntry={true}
                        rules={{ required: true, }}
                    />
                    <CustomTextInput
                        label='New Password'
                        control={control}
                        error={errors.password}
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
                        error={errors.passwordConfairmatin}
                        name="passwordConfairmatin"
                        icon={() => <Feather name='lock' size={fontSizes.font20} />}
                        rightIcon={false}
                        keyboard={false}
                        secureTextEntry={true}
                        rules={{
                            required: true,

                        }}
                    />
                    {!validation.confairmPass && <Error message={validation.msg} />}

                    <Button  icon={undefined} textStyle={[gStyles.text_White, gStyles.text_center]} style={[gStyles.bg_Primary, gStyles.center]} onPress={handleSubmit(onSubmit)} title={"Change Password"} />

                </View>
            </ScrollView>
            <CustomAwesomeAlert showAlert={showAlert} alert={alert} />
        </>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: Colors.white,
        padding: moderateScale(6),
        paddingVertical: "50%"
        // height:hp(80),

    },
});

export default Changepassword;