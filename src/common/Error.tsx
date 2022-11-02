import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import fontSizes from '../styles/fontSizes';
import { moderateScale } from '../styles/ResponsiveDimentions';

type Props = {
    message:string;
}
const Error = ({message}:Props) => {
    return (
        <Text style={styles.error}>{message}</Text>
    );
}

const styles = StyleSheet.create({
    error:{
        color:'red',
        marginLeft:moderateScale(1),
        fontSize:fontSizes.font12
    }
});

export default Error;