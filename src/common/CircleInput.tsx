import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import gStyles, { wp } from '../styles/globalStyle';
import { Controller, } from "react-hook-form";
import Colors from '../styles/colors';

type Props = {
    control: any;
    name: string | any;
}

const CircleInput = ({control, name}: Props) => {
    return (

        <Controller
                name={name}
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View style={[styles.container , ]}>
                        <TextInput
                            style={styles.input}
                            value={value}
                            onChangeText={onChange}
                        />
                    </View>
                )}
            />
    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth:1,
        borderColor:Colors.gray,
        width:wp(10),
        height:wp(10),
        borderRadius:50,
        justifyContent:"center",
        alignItems:"center"
    },
    input:{
        width:wp(10),
        margin:"auto",
        textAlign:"center"
    }
});

export default CircleInput;