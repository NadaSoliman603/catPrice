
import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import gStyles from '../styles/globalStyle';
import { moderateScale } from '../styles/ResponsiveDimentions';
import Colors from './../styles/colors';

type Props = {
    title: string;
    onPress: any;
    style:{}[];
    textStyle :   {}[];
}
const Button = ({ title, onPress , style , textStyle }: Props) => {
    return (
        <Pressable  style={({pressed})=>[
            {
                backgroundColor : pressed ? Colors.primaryPresedButton :  "#fff"
            },
            styles.conatiner,
            ...style
           
        ]} onPress={onPress} >
            <Text style={[styles.text ,  ...textStyle , gStyles.h3 ,]}>{title}</Text>

        </Pressable>
    );
}

const styles = StyleSheet.create({
    conatiner: {
        margin: 5,
        // backgroundColor: Colors.bg,
        padding: moderateScale(5),
        borderRadius: moderateScale(3),
        flexDirection: "row",
        // justifyContent:"center",
        // alignItems:"center"
    },
    text: {
        // fontSize:18,
        // paddingHorizontal:5,
        // textAlign:"center"
        fontWeight:"600"
    }
});

export default Button;