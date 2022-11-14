import * as React from 'react';
import { StyleSheet, View, Text , Pressable } from 'react-native';
import Colors from '../styles/colors';
import gStyles from '../styles/globalStyle';
import { moderateScale } from '../styles/ResponsiveDimentions';
type Props = {
    onPress:()=>void,
    children:JSX.Element,
}

const TextButton = ({onPress , children}:Props) => {
    return (
        <Pressable onPress={onPress} style={({pressed})=>[{backgroundColor:pressed?Colors.primaryPresedButton:Colors.white}, gStyles.row , styles.button]}>
            {children}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius:moderateScale(3),
        alignItems:"center",
        alignContent:"center"
     },
});

export default TextButton;