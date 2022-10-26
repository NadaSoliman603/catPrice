
import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Colors from '../../../styles/colors';
import gStyles, { hp } from '../../../styles/globalStyle';
import { moderateScale } from '../../../styles/ResponsiveDimentions';

type Props = {
    icon:JSX.Element;
    title:string;
    subTitle:string;
    body:string
}

const ContactItemCard = ({ icon , body , subTitle , title}:Props) => {
    return (
        <View style={styles.screen}>
            {icon}
            <Text style={[ gStyles.text_center , styles.pv_2]}>{title}</Text>
            <Text style={[gStyles.text_Primary , gStyles.text_Bold , gStyles.text_center , styles.pv_2]}>{subTitle}</Text>
            <Text style={[ gStyles.text_center , styles.pv_2]}>{body}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
screen:{
    justifyContent:"center",
    alignItems:"center",
    alignContent:"center",
    height:hp(30),
    borderWidth:moderateScale(0.5),
    borderColor:Colors.lightGray,
    borderRadius:moderateScale(3),
    paddingHorizontal:moderateScale(19)
},
pv_2:{
    paddingVertical:moderateScale(1)
}
});

export default ContactItemCard;