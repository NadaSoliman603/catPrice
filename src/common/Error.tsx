import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

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
        marginLeft:5,
    }
});

export default Error;