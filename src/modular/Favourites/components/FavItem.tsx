

import React, { useState } from 'react';
import { StyleSheet, View, Text , Pressable} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Avatar } from 'react-native-paper';
import imgs from '../../../assets/images';
import Quantity from '../../../components/Quantity';
import Colors from '../../../styles/colors';
import fontSizes from '../../../styles/fontSizes';
import gStyles from '../../../styles/globalStyle';
import { moderateScale } from '../../../styles/ResponsiveDimentions';
type Props = {
    item: any ;
    onPressIcon :()=>void;
    onPress : ()=>void
}

const FavItem = ({ item , onPressIcon, onPress }: Props) => {
    const [quantity, setQuantity] = useState(item.quantity)
    return (
        <Pressable onPress={onPress}  style={({pressed})=>[{backgroundColor:pressed?Colors.primaryPresedButton :Colors.white}, styles.screen]}>
            <View style={[gStyles.row]}>
                <FastImage source={{ uri: item?.image }} style={[styles.image]} />
                <View style={[gStyles.pl_3]}>
                    <Text style={[gStyles.text_Bold, gStyles.text_black]}>{item.catSn  || item.catNo }</Text>
                    {<Text>{item.ref1 &&<Text style={[{fontWeight:"bold"}]}>ref1:</Text>}{item.ref1}</Text>}
                    <Text>{item.ref1 && <Text style={[{fontWeight:"bold"}]}>ref1:</Text>}{item.ref2}</Text>
                </View>
            </View>
            <Pressable onPress={onPressIcon} style={[]}>
                <Avatar.Image style={{ backgroundColor:"#fff" }} source={imgs.subtract} size={fontSizes.font20} />
            </Pressable>
        </Pressable>  
    );
}

const styles = StyleSheet.create({
    screen: {
        marginVertical: moderateScale(5),
        padding: moderateScale(4),
        borderWidth: moderateScale(0.5),
        borderColor: "#eee",
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
        borderRadius: moderateScale(2.5)
    },
    image: {
        width: moderateScale(30),
        height: moderateScale(30),
        borderWidth: moderateScale(0.5),
        borderColor: "#eee",
        borderRadius: moderateScale(2.5)
    },
    quantityButton: {
        paddingVertical: 1, 
        borderRadius: moderateScale(1), 
        margin: moderateScale(4)
    }
});

export default FavItem;