import React, { useState, useEffect, useRef } from "react";
import { FlatList, StyleSheet, Text, View, Pressable } from "react-native";
import { getSupportedCurrencies, formatCurrency } from "react-native-format-currency";
import Colors from "../../../styles/colors";
import gStyles from "../../../styles/globalStyle";
import { moderateScale } from "../../../styles/ResponsiveDimentions";
import Feather from 'react-native-vector-icons/Feather';
import fontSizes from "../../../styles/fontSizes";
import useDrower from "./useDrower";

import { useDispatch, useSelector } from "react-redux";
import OverLayLoading from "../../../common/OverLayLoading";
import { userUpdatInfApi } from "../../../Api/Auth";
import { Login } from '../../../Redux/reducers/AuthReducer';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootState } from "../../../Redux/store/store";
import { useNavigation } from "@react-navigation/native";
import { NavigationType } from "../../../types/navigationTypes";



export default function CurrencyScreen() {

    // const flatlist = useRef()
    const [ref, setRef] = useState<any>(null);
    const [scroll, setScroll] = useState(false)
    useDrower("Currency")

    const user = useSelector((state: RootState) => state.Auth.user)
    const token = useSelector((state: RootState) => state.Auth.token)
    const [overlayLoading, setOverlayLoading] = useState(false)
    const navigation = useNavigation<NavigationType>()
    const [value, setValue] = useState(user?.defCurrency);

    // get all of the supported currency codes
    const currencyCodes = getSupportedCurrencies();

    const dispatch = useDispatch()
    const changeCurrancy = async (value: any, index: number) => {
        try {
            const data = {
                countryCode: user?.countryCode,
                country: user.countryEn,
                fullName: user?.fullNameEn,
                defCurrency: value,
                image: user?.profilePicture
            }

            if (token) {
                setOverlayLoading(true)
                const res = await userUpdatInfApi({ data: data, token: token })
                console.log("=================>", { res })
                if (res.status === 200) {
                    let newUser = { ...user }
                    newUser.defCurrency = value
                    console.log(newUser)
                    AsyncStorage.setItem('user', JSON.stringify(newUser))
                    dispatch(Login({ user: newUser, token: token }))
                    setValue(value)
                    navigation.goBack()
                }
            }
            setOverlayLoading(false)
            console.log()
        } catch (error) {
            console.log(error)
        }
        setOverlayLoading(false)
    }


    useEffect(() => {
        const index = currencyCodes.findIndex(item => item.name === value)
        if (ref) {
            ref.scrollToIndex({ index: index })
        }
    }, [])

    // loop through each currency code and show formatted value
    const renderItem = ({ item, index }: { item: any, index: number }) => {
        return (
            <Pressable onPress={() => changeCurrancy(item.code, index)} style={[styles.itemContainer, gStyles.row, gStyles.space_between]}>
                <Text style={[gStyles.text_black, gStyles.h4, gStyles.text_Bold, {
                    color: item === value ? Colors.primary : Colors.textBlack
                }]}>{item.name} {`(${item.code})`}</Text>
                {item.code === value && <Feather name="check" size={fontSizes.font20} color={Colors.primary} />}
            </Pressable>
        );
    };

    return (
        <>
            {overlayLoading && <OverLayLoading />}

            <View style={[styles.screen]}>
                <FlatList
                    style={styles.scrollView}
                    data={currencyCodes}
                    renderItem={renderItem}
                    keyExtractor={(code) => code.name}
                // ref={(ref) => { setRef(ref) }}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.white,
        // paddingVertical:moderateScale(20)
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