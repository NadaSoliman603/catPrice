import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import gStyles, { wp } from '../styles/globalStyle';
import { Controller, } from "react-hook-form";
import Colors from '../styles/colors';

type Props = {
    control: any;
    name: string | any;
    inputRef: any,
    foucsNextInput: any;
    getValues: any;
    setDisablVerityinButton:any
}

const CircleInput = ({ control, name, inputRef, foucsNextInput, getValues , setDisablVerityinButton }: Props) => {
    return (

        <Controller
            name={name}
            control={control}
            rules={{
                required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
                <View style={[styles.container,]}>
                    <TextInput
                        style={styles.input}
                        value={value}
                        onChangeText={(text)=>{                   
                             onChange(text)
                             const values = getValues()
                            console.log("=============>",values)
                            if(values.v1 !== undefined && values.v2  !== undefined &&values.v3  !== undefined &&values.v4  !== undefined){
                                    if (values.v1?.length > 0
                                        &&values.v2?.length > 0
                                        &&values.v3?.length > 0
                                        &&values.v4?.length > 0
                                        ) {
                                            console.log("disActive1")
                                            setDisablVerityinButton(false)
                                    } else {
                                        console.log("Active1")
                                        setDisablVerityinButton(true)
                                    }
                                }
                            
                        }}
                        maxLength={1}
                        keyboardType={'numeric'}
                        ref={inputRef}
                        onChange={() => {
                            

                            if (!value && foucsNextInput) {
                                if (foucsNextInput) {
                                    
                                    foucsNextInput.current.focus();
                                }
                            } else {
                                console.log("pleas enter value");
                            }
                        }}
                        
                    />
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: Colors.gray,
        width: wp(12),
        height: wp(12),
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        width: wp(10),
        margin: "auto",
        textAlign: "center"
    }
});

export default CircleInput;