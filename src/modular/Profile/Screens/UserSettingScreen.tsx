
import  React ,{ useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View, Text , ScrollView, Pressable } from 'react-native';
import { Avatar } from 'react-native-paper';
import imgs from '../../../assets/images';
import CustomTextInput from '../../../common/CustomTextInput';
import Colors from '../../../styles/colors';
import fontSizes from '../../../styles/fontSizes';
import gStyles from '../../../styles/globalStyle';
import { moderateScale } from '../../../styles/ResponsiveDimentions';
import Feather from 'react-native-vector-icons/Feather';
import { Image } from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { NavigationType } from '../../../types/navigationTypes';
import Ionicons  from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { Drower } from '../../../Redux/reducers/DrowerNavigation';
import BackBotton from '../../../components/BackBotton';
import useDrower from './useDrower';
type Props = {}

const UserSettingScreen = () => {
    const { control, register, handleSubmit, watch, formState: { errors } } = useForm();
    useDrower("User Setting")

  

    //Submit User Seting  Data
    const onSubmit = (data: object) => {
        console.log(data)
    }
   


    const imgUri = "https://img.freepik.com/free-photo/handsome-confident-smiling-man-with-hands-crossed-chest_176420-18743.jpg?w=2000"

    return (
        <ScrollView style={styles.screen}>
            <View style={[gStyles.row, gStyles.pb_6]}>
                <View style={[styles.profilImg]}>
                    <Avatar.Image size={moderateScale(24)} source={{ uri: imgUri }} />
                    <Avatar.Image style={[styles.editButton, { backgroundColor: Colors.white }]} size={moderateScale(8)} source={imgs.edit} />
                </View>
                <View style={[styles.userInfoContainer]}>
                    <Text style={[gStyles.text_black, gStyles.text_Bold, styles.userInfo]}>User Name</Text>
                    <Text style={[gStyles.h6, gStyles.text_lightGray, styles.userInfo]}>Standered User</Text>
                </View>
            </View>


            <CustomTextInput
                label='Name'
                control={control}
                error={errors.phone}
                name="Name"
                icon={() => <Feather name='user' color={Colors.textLightGray} size={fontSizes.font20} />}
                rightIcon={false}
                keyboard={false}
                secureTextEntry={false}
                rules={{}}
            />


            <CustomTextInput
                label='Email'
                control={control}
                error={errors.phone}
                name="email"
                icon={() => <Feather name='mail' color={Colors.textLightGray} size={fontSizes.font20} />}
                rightIcon={false}
                keyboard={false}
                secureTextEntry={false}
                rules={{}}
            />

            <CustomTextInput
                label='Phone'
                control={control}
                error={errors.phone}
                name="phone"
                icon={() => <Feather name='phone' color={Colors.textLightGray} size={fontSizes.font20} />}
                rightIcon={false}
                keyboard={false}
                secureTextEntry={false}
                rules={{}}
            />

            <CustomTextInput
                label='Profession'
                control={control}
                error={errors.phone}
                name="profession"
                icon={() => <Feather name='briefcase' color={Colors.textLightGray} size={fontSizes.font20} />}
                rightIcon={false}
                keyboard={false}
                secureTextEntry={false}
                rules={{}}
            />

            <CustomTextInput
                label='Gender'
                control={control}
                error={errors.phone}
                name="gender"
                icon={() => <Feather name='users' color={Colors.textLightGray} size={fontSizes.font20} />}
                rightIcon={false}
                keyboard={false}
                secureTextEntry={false}
                rules={{}}
            />

            <CustomTextInput
                label='DOB'
                control={control}
                error={errors.phone}
                name="dop"
                icon={() => <Feather name='calendar' color={Colors.textLightGray} size={fontSizes.font20} />}
                rightIcon={false}
                keyboard={false}
                secureTextEntry={false}
                rules={{}}
            />

            <CustomTextInput
                label='Adress'
                control={control}
                error={errors.phone}
                name="adress"
                icon={() => <Feather name='map-pin' color={Colors.textLightGray} size={fontSizes.font20} />}
                rightIcon={false}
                keyboard={false}
                secureTextEntry={false}
                rules={{}}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.white,
        padding: moderateScale(6),
        marginBottom:moderateScale(6)
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
    imgIcon: { height: moderateScale(7.4), width: moderateScale(7.4) }
});

export default UserSettingScreen;
