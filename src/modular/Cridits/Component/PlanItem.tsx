
import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Avatar } from 'react-native-paper';
import imgs from '../../../assets/images';
import fontSizes from '../../../styles/fontSizes';
import gStyles from '../../../styles/globalStyle';
import { moderateScale } from '../../../styles/ResponsiveDimentions';
type Props = {
    title: string
}

const PlanItem = ({ title }: Props) => {
    return (
        <View style={[gStyles.row , styles.screen]}>
            <Avatar.Image style={{ backgroundColor: "#fff" , paddingTop:moderateScale(2)}} size={fontSizes.font14} source={imgs.checkedIcon} />
            <Text style={[gStyles.text_black , styles.title]}> {title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        marginVertical:moderateScale(2.5),
        alignItems:"flex-start",
    },
    title:{
        textTransform: 'capitalize',
    }
});

export default PlanItem;