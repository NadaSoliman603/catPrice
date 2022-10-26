import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import Quantity from '../../../components/Quantity';
import gStyles from '../../../styles/globalStyle';
import { moderateScale } from '../../../styles/ResponsiveDimentions';
type Props = {
    item: any 
}

const CartItemCart = ({ item }: Props) => {
    const [quantity, setQuantity] = useState(item.quantity)
    return (
        <View style={styles.screen}>
            <View style={[gStyles.row]}>
                <FastImage source={{ uri: item.item.images[0].fullImageURL }} style={[styles.image]} />
                <View style={[gStyles.pl_3]}>
                    <Text style={[gStyles.text_Bold, gStyles.text_black]}>{item.item.catNo}</Text>
                    <Text><Text style={[gStyles.text_Primary]}>{quantity}<Text style={[gStyles.h6]}>X</Text></Text> {item.item.catSn}</Text>
                    <Text style={[gStyles.text_Primary, gStyles.text_Bold, gStyles.h5]}>SAR 112.88</Text>
                </View>
            </View>
            <View style={[]}>
                <Quantity buttonStyle={styles.quantityButton} quantity={quantity} setQuantity={setQuantity} />
            </View>
        </View>  
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

export default CartItemCart;