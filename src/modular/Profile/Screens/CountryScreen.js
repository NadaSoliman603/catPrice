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



export default function CountryScreen() {
    useDrower("Country")

    const [value, setValue] = useState("Saudi Arabia");
    // const flatlist = useRef()
    const [ref, setRef] = useState(null);
    // const [countries , setCountry] = useState(RNCountry.getCountryNames())

    const countries =  RNCountry.getCountryNames


    // get all of the supported currency codes
   

    const changeCurrancy = (value, index ) => {
        console.log(value)
        setValue(value)
    }
   

    useEffect(() => {
            // setCountry(RNCountry)
    },[RNCountry])

    // loop through each currency code and show formatted value
    const renderItem = ({ item, index }) => {
        return (
            <Pressable key={index} onPress={() => changeCurrancy(item, index)} style={[styles.itemContainer, gStyles.row, gStyles.space_between]}>
                <Text style={[gStyles.text_black, gStyles.h4 , gStyles.text_Bold, {
                    color:item === value ? Colors.primary : Colors.textBlack
                }]}>{item}</Text>
                {item === value && <Feather name="check" size={fontSizes.font20} color={Colors.primary} />}
            </Pressable>
        );
    };

    return (
        <View style={[styles.screen]}>
            <FlatList
                style={styles.scrollView}
                data={countries}
                renderItem={renderItem}
                keyExtractor={(code) => code}
                ref={(ref) => {setRef(ref)}}
            />
        </View>
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