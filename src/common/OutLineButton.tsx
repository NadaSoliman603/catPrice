import * as React from 'react';
import { StyleSheet, View, Text , Pressable} from 'react-native';
import Colors from '../styles/colors';
import fontSizes from '../styles/fontSizes';
import gStyles, { hp } from '../styles/globalStyle';
import Feather  from 'react-native-vector-icons/Feather';
import { StyleProps } from 'react-native-reanimated';
import { moderateScale } from '../styles/ResponsiveDimentions';
type Props = {
    onPress : ()=>void,
    icon:JSX.Element ;
    title:string;
    style:StyleProps;
    outline:boolean;
    textStyle:StyleProps
}

const OutLineButton = ({onPress , icon , title , style, outline   , textStyle}: Props) => {
    return (
        <Pressable onPress={onPress} style={({ pressed }) => [gStyles.row, gStyles.center, styles.borderPimary, { backgroundColor: pressed ? Colors.primaryPresedButton  : outline? Colors.primary: "#fff"  , height:hp(7)}  ,style,]}>
            <Text style={[{color:!outline?Colors.primary : "#FFF" , fontSize:fontSizes.font18},  gStyles.text_center, gStyles.text_Bold , textStyle]}>{title} </Text>
            {/* <Feather name="eye" size={fontSizes.font16} color={Colors.primary} /> */}
               {icon} 
        </Pressable>
    );
}

const styles = StyleSheet.create({
    screen: {},
    borderPimary:{
        borderWidth:moderateScale(0.8),
        borderColor:Colors.primary,
        //paddingVertical:moderateScale(4),
        borderRadius:moderateScale(3),
        margin:moderateScale(8)
      },
});

export default OutLineButton;