import * as React from 'react';
import { StyleSheet, View, Text , Pressable} from 'react-native';
import Colors from '../styles/colors';
import fontSizes from '../styles/fontSizes';
import gStyles from '../styles/globalStyle';
import Feather  from 'react-native-vector-icons/Feather';
import { StyleProps } from 'react-native-reanimated';
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
        <Pressable onPress={onPress} style={({ pressed }) => [gStyles.row, gStyles.center, gStyles.borderPimary, { backgroundColor: pressed ? Colors.primaryPresedButton  : outline? Colors.primary: "#fff" }  ,style,]}>
            <Text style={[{color:!outline?Colors.primary : "#FFF"},  gStyles.text_center, gStyles.text_Bold , textStyle]}>{title}</Text>
            {/* <Feather name="eye" size={fontSizes.font16} color={Colors.primary} /> */}
               {icon} 
        </Pressable>
    );
}

const styles = StyleSheet.create({

    screen: {}
});

export default OutLineButton;