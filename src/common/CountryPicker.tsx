import { useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import CountryPicker from "react-native-country-codes-picker";


type Props = {
    setCountryCode: any;
    show: boolean;
    setShow:any;
}
const PickCountryCode = ({setCountryCode , setShow,show}:Props) => {


    return (
        <View >
            <CountryPicker
                show={show}
                // when picker button press you will get the country object with dial code
                pickerButtonOnPress={(item) => {
                    setCountryCode(item.dial_code);
                    console.log(item)
                    setShow(false);
                }}
                lang='en'
            />
        </View>
    );
}


export default PickCountryCode;
