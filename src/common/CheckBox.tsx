import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Checkbox, TextInput } from 'react-native-paper';
import { useForm, Controller, FieldValues } from "react-hook-form";
import Error from './Error';
import Feather from 'react-native-vector-icons/Feather';
import fontSizes from '../styles/fontSizes';
import gStyles from '../styles/globalStyle';
type Props = {
    // value: string;
    // onChangeText: (text: string) => void;
    label: string;
    value: any;
    name: string | any;
    setValue :any;
    error: any;
}
const CustomCheckbox = ({ label, name, error , value , setValue}: Props) => {
    const handelCheck = ()=>{
        setValue(!value)
    }
    return (
        <View style={styles.input}>
        
                    <View style={gStyles.row_Center}>
                        <Checkbox
                            status={value ? "checked" :"unchecked"}
                            onPress={handelCheck}
                        />
                        <Text>{label}</Text>
                    </View>
            {error && <Error message="This filed is required *" />}
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        marginVertical: 7,
        maxWidth:"90%",
        alignSelf:"center"
    },

});

export default CustomCheckbox;