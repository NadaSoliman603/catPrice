import * as React from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View, Text, ScrollView, StatusBar } from 'react-native';
import { AuthCustomNav, CreatePassdVeritfication } from '../..';
import BackHeader from '../../../../common/BackHeader';
import Button from '../../../../common/Button';
import CustomTextInput from '../../../../common/CustomTextInput';
import Colors from '../../../../styles/colors';
import fontSizes from '../../../../styles/fontSizes';
import gStyles, { hp } from '../../../../styles/globalStyle';
import Feather  from 'react-native-vector-icons/Feather';
import Error from '../../../../common/Error';
import { ForgetPasswordApi } from '../../../../Api/Auth';
import OverLayLoading from '../../../../common/OverLayLoading';
type Props = {
    handelAuthScreens: (screen: AuthCustomNav) => void;
    createPassdVeritfication: CreatePassdVeritfication | null; 
}

const CreateNewPassword = (props: Props) => {
    const { control, register, handleSubmit, watch, formState: { errors } } = useForm();
    const [validation, setValidation] = React.useState({ confairmPass: true , msg:""})
    const [loading , setLoading] = React.useState<boolean>(false)
    const onSubmit = async(data:any) => {
        const confairmPass: boolean = data.password === data.passwordConfairmatin
        if (!confairmPass ){
            setValidation({confairmPass: confairmPass , msg:"Password should be match"})
        }else{
            setLoading(true)
            const userdata = {
                otp: props.createPassdVeritfication?.otp,
                otpToken: props.createPassdVeritfication?.otpToken,
                newPassword : data.password ,
                confirmPassword : data.passwordConfairmatin
            }
            try {
                const res = await ForgetPasswordApi({data:userdata})
                console.log({data})
                console.log({res})
                if(res.data?.header?.httpStatusCode === 200){
                    props.handelAuthScreens("Login")
                }
            } catch (error) {
                console.log(error)
            }
        }
        setLoading(false)
    }
    return (
            <View >
            <StatusBar backgroundColor={Colors.white}/>
            <BackHeader onBack={() => { props.handelAuthScreens("Login") }} title='Forget Password' />
               {loading &&  <OverLayLoading/>}
                <View style={styles.screen} >
                    <CustomTextInput
                        label='Create New Password'
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
                    {!validation.confairmPass && <Error message='Password should be match' />}

                    <Button textStyle={[gStyles.text_White, gStyles.text_center]} style={[gStyles.bg_Primary, gStyles.center]} onPress={handleSubmit(onSubmit)} title={"Verify"} />

                </View>
            </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: Colors.white,
        padding: "2.5%",
        paddingVertical:"45%"
        // height:hp(80),
        
    },
});

export default CreateNewPassword;