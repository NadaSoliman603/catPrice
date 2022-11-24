
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { Avatar } from 'react-native-paper';
import imgs from '../../../assets/images';
import CustomTextInput from '../../../common/CustomTextInput';
import Colors from '../../../styles/colors';
import fontSizes from '../../../styles/fontSizes';
import gStyles, { hp } from '../../../styles/globalStyle';
import { moderateScale } from '../../../styles/ResponsiveDimentions';
import Feather from 'react-native-vector-icons/Feather';
import { Image } from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { NavigationType } from '../../../types/navigationTypes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { Drower } from '../../../Redux/reducers/DrowerNavigation';
import BackBotton from '../../../components/BackBotton';
import useDrower from './useDrower';
import ImagePicker from 'react-native-image-crop-picker';
import { RootState } from '../../../Redux/store/store';
import CountryPicker from 'react-native-country-picker-modal'
import OutLineButton from '../../../common/OutLineButton';
import { userUpdatInfApi } from '../../../Api/Auth';
import OverLayLoading from '../../../common/OverLayLoading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Login } from '../../../Redux/reducers/AuthReducer';
import useAlertSucsses from '../../../common/useAlertSucsses';

type Props = {}

const UserSettingScreen = () => {
    const navigation = useNavigation<NavigationType>()
    const dispatch = useDispatch()
    useDrower("User Setting")
    const user = useSelector((state: RootState) => state.Auth.user)
    console.log({ user })
    const token = useSelector((state: RootState) => state.Auth.token)
    const { control, register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            fullName: user?.fullNameEn,
            phone: user?.mobileNo,
            email: ""
        },
    });
    const [image, setImage] = useState<any>(null)
    const location = useSelector((state: RootState) => state.Location)
    const [countryCode, setCountryCode] = useState<any>({
        cca2: user?.countryCode.toUpperCase(),
        currency: [user.defCurrency],
        callingCode: [user.mobileCode],
        name:  user.countryEn
    });
    console.log({location})
    const [show, setShow] = useState(false);
    const [overlayLoading, setOverlayLoading] = useState(false)
    console.log({countryCode})
    //Submit User Seting  Data
    const onSubmit = async (data: any) => {
        let imageData = new FormData();

        setOverlayLoading(true)
        const userData = {
            countryCode: countryCode.callingCode[0],
            country: countryCode?.name,
            fullName: data?.fullName,
            defCurrency: countryCode.currency[0],
            image: image?.path ? image?.path : null
        }
        try {
            if (token) {
                const res = await userUpdatInfApi({ data: userData, token: token })
                console.log(res)
                if (res.data?.header?.httpStatusCode === 200) {
                    let newUser = { ...user }
                    newUser.fullNameEn = data?.fullName
                    AsyncStorage.setItem('user', JSON.stringify(newUser))
                    dispatch(Login({ user: newUser, token: token }))
                    useAlertSucsses({
                        title:"User updated successfully",
                        collback:()=>{navigation.goBack()},
                        subTitle:"",
                        success:true
                    })
                }
                if (res.data?.header?.httpStatusCode === 500){
                    useAlertSucsses({
                        title:res,
                        collback:()=>{},
                        subTitle:"",
                        success:false
                    })
                }

            } else {
                console.log("no Token")
            }
        } catch (error) {
            console.log(error)
        }
        setOverlayLoading(false)
    }


    const pickImage = async () => {
        try {
            let image: any = null
            await ImagePicker.openPicker({
                multiple: false,
                height: 400,
                width: 400,
            }).then(images => {
                image = images
                console.log(images);
            });
            if (image) {
                try {
                    await ImagePicker.openCropper({
                        mediaType: "photo",
                        path: image?.path,
                        width: 400,
                        height: 400,
                        cropperActiveWidgetColor: Colors.primary,
                        cropperStatusBarColor: Colors.primary,
                        // cropperToolbarColor :Colors.primary,
                        cropperToolbarWidgetColor: Colors.primary,
                        freeStyleCropEnabled: true,
                        cropperToolbarTitle: "Edite Profile Photo",
                        enableRotationGesture: true
                    }).then(image => {
                        setImage(image);
                    });
                } catch (error) {
                    console.log(error)
                }
            }
        } catch (error) {
            console.log(error)
        }

    }




    const imgUri = "https://img.freepik.com/free-photo/handsome-confident-smiling-man-with-hands-crossed-chest_176420-18743.jpg?w=2000"

    return (
        <>
            <ScrollView style={styles.screen}>
                <View style={[styles.container]}>
                    <Pressable onPress={pickImage} style={[gStyles.row, gStyles.pb_6]}>
                        <View style={[styles.profilImg]}>
                            <Avatar.Image size={moderateScale(25)} source={(image !== null && image?.path !== undefined) ? { uri: image?.path } : imgs.userIcon} />
                            <Avatar.Image style={[styles.editButton, { backgroundColor: Colors.white }]} size={moderateScale(8)} source={imgs.edit} />
                        </View>
                        <View style={[styles.userInfoContainer]}>
                            <Text style={[gStyles.text_black, gStyles.text_Bold, styles.userInfo]}>{user?.fullNameAr ? user?.fullNameAr : "User Name"} </Text>
                            <Text style={[gStyles.h6, gStyles.text_lightGray, styles.userInfo]}>Standered User</Text>
                        </View>
                    </Pressable>


                    <CustomTextInput
                        label='Name'
                        control={control}
                        error={errors.fullName}
                        name="fullName"
                        icon={() => <Feather name='user' color={Colors.textLightGray} size={fontSizes.font20} />}
                        rightIcon={false}
                        keyboard={false}
                        secureTextEntry={false}
                        rules={{
                            require: true
                        }}
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
                            <Ionicons name='caret-down-outline' size={fontSizes.font12} />
                            <CountryPicker
                                countryCode={countryCode?.cca2}
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
                        label='Email'
                        control={control}
                        error={errors.email}
                        name="email"
                        icon={() => <Feather name='mail' color={Colors.textLightGray} size={fontSizes.font20} />}
                        rightIcon={false}
                        keyboard={false}
                        secureTextEntry={false}
                        rules={{}}
                    />

                    <OutLineButton textStyle={{}} title='Update' style={{}} icon={<Text></Text>} onPress={handleSubmit(onSubmit)} outline={true} />

                </View>
            </ScrollView>
            {overlayLoading && <OverLayLoading />}
        </>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.white,
        padding: moderateScale(6),
        marginBottom: moderateScale(6)
    },
    profilImg: {
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center"
    },
    editButton: {
        marginLeft: moderateScale(-4),
        marginTop: moderateScale(12.5)
    },
    userInfoContainer: {
        paddingLeft: moderateScale(2)
    },
    userInfo: {
        paddingVertical: moderateScale(1),
    },
    imgIcon: { height: moderateScale(7.4), width: moderateScale(7.4) },
    container: {
        // minHeight:hp(100),
        // justifyContent:"center",
    }
});

export default UserSettingScreen;
