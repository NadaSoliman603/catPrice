
import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Avatar } from 'react-native-paper';
import { StyleProps } from 'react-native-reanimated';
import imgs from '../assets/images';
import Colors from '../styles/colors';
import fontSizes from '../styles/fontSizes';
import gStyles from '../styles/globalStyle';
import { moderateScale } from '../styles/ResponsiveDimentions';

type Props = {
    title: string;
    icon:JSX.Element;
    color:string;
    style:StyleProps;
}

const IconText = ({ title ,icon , color , style}: Props) => {
    return (
        <View style={[gStyles.row , styles.screen , style]}>
            {icon} 
            {/* <Avatar.Image style={{ backgroundColor: "#fff" , paddingTop:moderateScale(2)}} size={fontSizes.font14} source={imgs.checkedIcon} /> */}
            <Text style={[gStyles.text_black , styles.title , {color:color}]}> {title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        alignSelf:"center",
    },
    title:{
        textTransform: 'capitalize',
        color:Colors.textLightGray,
        // alignItems:"flex-start",
        alignContent:"center",
        alignSelf:"center"
    }
});

export default IconText;