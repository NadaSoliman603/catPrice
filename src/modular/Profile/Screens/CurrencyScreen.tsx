import React, { useState, useEffect, useRef } from "react";
import { FlatList, StyleSheet, Text, View, Pressable } from "react-native";
import { getSupportedCurrencies } from "react-native-format-currency";
import Colors from "../../../styles/colors";
import gStyles from "../../../styles/globalStyle";
import { moderateScale } from "../../../styles/ResponsiveDimentions";
import Feather from 'react-native-vector-icons/Feather';
import fontSizes from "../../../styles/fontSizes";
import useDrower from "./useDrower";



export default function CurrencyScreen() {
    const [value, setValue] = useState("Saudi Arabia Riyal");
    // const flatlist = useRef()
    const [ref, setRef] = useState<any>(null);
    const [scroll , setScroll] = useState(false)
    useDrower("Currency")


    // get all of the supported currency codes
    const currencyCodes = getSupportedCurrencies();

    const changeCurrancy = (value: any, index: number) => {
        setValue(value.name)
    }
   

    useEffect(() => {
        const index = currencyCodes.findIndex(item => item.name === value)
        if (ref ) {
            ref.scrollToIndex({ index: index })
        }
    },[])

    // loop through each currency code and show formatted value
    const renderItem = ({ item, index }: { item: any, index: number }) => {
        return (
            <Pressable onPress={() => changeCurrancy(item, index)} style={[styles.itemContainer, gStyles.row, gStyles.space_between]}>
                <Text style={[gStyles.text_black, gStyles.h4 , gStyles.text_Bold, {
                    color:item === value ? Colors.primary : Colors.textBlack
                }]}>{item.name}</Text>
                {item.name === value && <Feather name="check" size={fontSizes.font20} color={Colors.primary} />}
            </Pressable>
        );
    };

    return (
        <View style={[styles.screen]}>
            <FlatList
                style={styles.scrollView}
                data={currencyCodes}
                renderItem={renderItem}
                keyExtractor={(code) => code.name}
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