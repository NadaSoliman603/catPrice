import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useForm, Controller, FieldValues } from "react-hook-form";
import Error from './Error';
import Feather  from 'react-native-vector-icons/Feather';
import fontSizes from '../styles/fontSizes';
import gStyles from '../styles/globalStyle';
type Props = {
    // value: string;
    // onChangeText: (text: string) => void;
    label: string;
    control: any;
    name: string | any;
    error: any;
    icon :any;
    rightIcon:any | undefined |boolean;
}
const CustomTextInput = ({ label, control, name, error , icon ,rightIcon=false }: Props) => {
    return (
        <View style={styles.input}>
            <Controller
                name={name}
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                   <View style={[styles.container] }>
                    {/* {rightIcon ? rightIcon() : <></>} */}
                    <TextInput
                        // style={styles.input}
                        label={label}
                        value={value}
                        onChangeText={onChange}
                        mode="outlined"
                        // right={()=>(<Feather name='phone' {...props}  size={fontSizes.font18}/>)}
                        right={<TextInput.Icon icon={icon} />}
                        left={rightIcon?<TextInput.Icon icon={rightIcon}  /> :<></>}
                    />
                   </View>
                )}
            />
            {error && <Error message= "This filed is required *"/>}
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        marginVertical: 7,
        // width:"100%",
        // // flex:1
    },
    container:{
        // flexDirection:"row",
        // flex:1,
    }
});

export default CustomTextInput;