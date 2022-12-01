import React , {useState} from 'react';
import { StyleSheet, View, Text  } from 'react-native';
import { TextInput , } from 'react-native-paper';
import { useForm, Controller, FieldValues } from "react-hook-form";
import Error from './Error';
import Feather  from 'react-native-vector-icons/Feather';
import fontSizes from '../styles/fontSizes';
import gStyles from '../styles/globalStyle';
import Colors from '../styles/colors';
import { moderateScale } from '../styles/ResponsiveDimentions';
type Props = {
    // value: string;
    // onChangeText: (text: string) => void;
    label: string;
    control: any;
    name: string | any;
    error: any;
    icon :any;
    rightIcon:any | undefined |boolean;
    keyboard:any
    secureTextEntry :boolean;
    rules:any
}
const CustomTextInput = ({ label, control, name, error , icon ,rightIcon=false ,secureTextEntry=false , keyboard = "default" , rules={required: true,}}: Props) => {
    const [issecureText , setIsSecureText] =useState<boolean>(secureTextEntry) 
    const handelIsSecure = ()=>{
        if(secureTextEntry){
            setIsSecureText(!issecureText)
        }
    }
    return (
        <View style={styles.input}>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field: { onChange, onBlur, value } }) => (
                   <View style={[styles.container] }>
                    {/* {rightIcon ? rightIcon() : <></>} */}
                    <TextInput
                        style={[styles.input , styles.textInput]}
                        label={label}
                        value={value}
                        onChangeText={onChange}
                        mode="outlined"
                        // right={()=>(<Feather name='phone' {...props}  size={fontSizes.font18}/>)}
                        right={<TextInput.Icon onPress={handelIsSecure} icon={
                            !secureTextEntry ? icon : ()=><Feather name={issecureText ? 'lock' :'unlock'} size={fontSizes.font20} />
                        } />}
                        left={rightIcon?<TextInput.Icon icon={rightIcon}  /> :false}
                        // error={error}
                        selectionColor={Colors.bg}
                        keyboardType = {keyboard ? keyboard : "default"}
                        secureTextEntry ={issecureText}
                        dense={false}
                        outlineColor={"#eee"}
                        // placeholder= {'Some Text'}
                        // theme={{
                        //     colors: {
                        //                placeholder: 'white'
                        //        }
                        //  }}  
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
        marginVertical: moderateScale(1),
        // width:"100%",
        // // flex:1,
     
    },
    container:{
        // flexDirection:"row",
        // flex:1,
    },
    textInput:{
        backgroundColor:Colors.white
    }
});

export default CustomTextInput;