
import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import Colors from './../styles/colors';

type Props = {
    title: string;
    onPress: any;
}
const Button = ({ title, onPress }: Props) => {
    return (
        <Pressable  style={({pressed})=>[
            {
                backgroundColor : pressed ? Colors.bg : "#fff"
            },
            styles.conatiner
        ]} onPress={onPress} >
            <Text style={styles.text}>{title}</Text>

        </Pressable>
    );
}

const styles = StyleSheet.create({
    conatiner: {
        margin: 5,
        // backgroundColor: Colors.bg,
        padding: 8,
        borderRadius: 10,
        flexDirection: "row",
        // justifyContent:"center",
        alignItems:"center"
    },
    text: {
        fontSize:18,
        paddingHorizontal:5
    }
});

export default Button;