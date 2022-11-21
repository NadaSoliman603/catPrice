import * as React from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View, Text, ScrollView, StatusBar } from 'react-native';
import { AuthCustomNav } from '../..';
import BackHeader from '../../../../common/BackHeader';
import Button from '../../../../common/Button';
import CustomTextInput from '../../../../common/CustomTextInput';
import Colors from '../../../../styles/colors';
import fontSizes from '../../../../styles/fontSizes';
import gStyles, { hp } from '../../../../styles/globalStyle';
import Feather  from 'react-native-vector-icons/Feather';
import Error from '../../../../common/Error';
type Props = {
    handelAuthScreens: (screen: AuthCustomNav) => void
}

const CreateNewPassword = (props: Props) => {
    const { control, register, handleSubmit, watch, formState: { errors } } = useForm();
    const [validation, setValidation] = React.useState({ confairmPass: true})

    const onSubmit = (data:any) => {
        console.log("data")
    }
    return (
            <View >
            <StatusBar backgroundColor={Colors.white}/>
            <BackHeader onBack={() => { props.handelAuthScreens("Login") }} title='Forget Password' />

                <View style={styles.screen} >
                    <CustomTextInput
                        label='Create New Password'
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