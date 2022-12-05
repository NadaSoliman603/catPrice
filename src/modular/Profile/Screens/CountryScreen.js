import React, { useState, useEffect, useRef } from "react";
import { FlatList, StyleSheet, Text, View, Pressable } from "react-native";
import { getSupportedCurrencies } from "react-native-format-currency";
import Colors from "../../../styles/colors";
import gStyles from "../../../styles/globalStyle";
import { moderateScale } from "../../../styles/ResponsiveDimentions";
import Feather from 'react-native-vector-icons/Feather';
import fontSizes from "../../../styles/fontSizes";
import RNCountry from "react-native-countries";
import useDrower from "./useDrower";
import { useDispatch, useSelector } from "react-redux";
import OverLayLoading from "../../../common/OverLayLoading";
import { userUpdatInfApi } from "../../../Api/Auth";
import { Login } from '../../../Redux/reducers/AuthReducer';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";



export default function CountryScreen() {
    useDrower("Country")
    const navigation = useNavigation()

    // const flatlist = useRef()
    const [ref, setRef] = useState(null);
    // const [countries , setCountry] = useState(RNCountry.getCountryNames())
    const user = useSelector((state) => state.Auth.user)
    const token = useSelector((state) => state.Auth.token)
    const [overlayLoading, setOverlayLoading] = useState(false)

    const [value, setValue] = useState(user?.countryEn);
    const countries = RNCountry.getCountryNames


    // get all of the supported currency codes
    const dispatch = useDispatch()
    const changeCountry = async (value, index) => {

        try {
            const data = {
                countryCode: user?.countryCode,
                country: value,
                fullName: user?.fullNameEn,
                defCurrency: user.defCurrency,
                image: user?.profilePicture
            }
            setOverlayLoading(true)
            const res = await userUpdatInfApi({ data: data, token: token })
            if (res.status === 200) {
                let newUser = { ...user }
                newUser.countryEn = value
                console.log(newUser)
                AsyncStorage.setItem('user', JSON.stringify(newUser))
                dispatch(Login({ user: newUser, token: token }))
                setValue(value)
                navigation.goBack()
            }
            setOverlayLoading(false)
            console.log()
        } catch (error) {
            console.log(error)
        }
        setOverlayLoading(false)


    }


    useEffect(() => {
        // setCountry(RNCountry)
    }, [RNCountry])

    // loop through each currency code and show formatted value
    const renderItem = ({ item, index }) => {
        return (
            <Pressable key={index} onPress={() => changeCountry(item, index)} style={[styles.itemContainer, gStyles.row, gStyles.space_between]}>
                <Text style={[gStyles.text_black, gStyles.h4, gStyles.text_Bold, {
                    color: item === value ? Colors.primary : Colors.textBlack
                }]}>{item}</Text>
                {item === value && <Feather name="check" size={fontSizes.font20} color={Colors.primary} />}
            </Pressable>
        );
    };

    return (
        <>
            <View style={[styles.screen]}>
                <FlatList
                    style={styles.scrollView}
                    data={countries}
                    renderItem={renderItem}
                    keyExtractor={(code) => code}
                    ref={(ref) => { setRef(ref) }}
                />
            </View>
            {overlayLoading && <OverLayLoading />}
        </>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.white,
        // paddingHorizontal:moderateScale(6)
    },

    scrollView: {
        width: "100%",
        paddingHorizontal: moderateScale(6),
    },
    itemContainer: {
        paddingTop: moderateScale(4),
        paddingBottom: moderateScale(3),
        borderBottomColor: Colors.lightGray,
        borderBottomWidth: moderateScale(0.5)
    }

});