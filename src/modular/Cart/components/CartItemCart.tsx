import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, ImageBackground } from 'react-native';
import FastImage from 'react-native-fast-image';
import Quantity from '../../../components/Quantity';
import Colors from '../../../styles/colors';
import gStyles from '../../../styles/globalStyle';
import { moderateScale } from '../../../styles/ResponsiveDimentions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import fontSizes from '../../../styles/fontSizes';
import { useNavigation } from '@react-navigation/native';
import { NavigationType } from '../../../types/navigationTypes';
import addCartDataToLocalStorag from '../../../Redux/actions/CartAction';
import { AddToCart } from '../../../Redux/reducers/CartReducer';
import { useDispatch } from 'react-redux';
type Props = {
    item: any,
    handelChecked: ({item,checked} :{item:{id:number , quantity:number}  , checked:boolean}) => void,
    selectedItem:{ids:number[] , quantity:number},
}


const CartItemCart = ({ item , handelChecked , selectedItem }: Props) => {
    const navigation = useNavigation<NavigationType>()

    const [quantity, setQuantity] = useState(item.quantity)
    const checked:boolean = selectedItem.ids.includes(item.item.catId)

    const dispatch = useDispatch()
    const onChangeQuantit = async(value:number)=>{
        console.log({value})

        const cartData = await addCartDataToLocalStorag({ catData: item.item, catQuantity: value })
        console.log({cartData})
        dispatch(AddToCart({ quantity: cartData.quantity, item: cartData.data }))
    
    }
    return (
        <View style={[gStyles.row, styles.container]}>
            <Pressable onPress={() => { handelChecked({item:{id:item.item.catId  , quantity:item.quantity},  checked:!checked}) }}>
                <MaterialCommunityIcons style={{ marginRight: moderateScale(1) }} size={fontSizes.font18} name={checked ? "check-circle" : "checkbox-blank-circle-outline"} color={Colors.primary} />
            </Pressable>
            <Pressable onPress={() => { navigation.navigate('ProductDetails' , {catID:item.item.catId.toString()}) }} style={({ pressed }) => [
                { backgroundColor: pressed ? Colors.primaryPresedButton : "transparent", },
                styles.screen]}>

                <View style={[gStyles.row , {maxWidth:"45%"}]}>
                    <FastImage source={{ uri: item.item.images[0].fullImageURL }} style={[styles.image]} />
                    <View style={[gStyles.pl_3]}>
                        <Text style={[gStyles.text_Bold, gStyles.text_black]}>{item.item.catNo}</Text>
                        <Text><Text style={[gStyles.text_Primary]}>{quantity}<Text style={[gStyles.h6]}>X</Text></Text> {item.item.catSn}</Text>
                        <Text style={[gStyles.text_Primary, gStyles.text_Bold, gStyles.h5]}>SAR 112.88</Text>
                    </View>
                </View>
                <View style={[styles.buttomContainer]}>
                    <Quantity handelChange={onChangeQuantit} buttonStyle={styles.quantityButton} quantity={quantity} setQuantity={setQuantity} />
                </View>
            </Pressable>
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
        borderRadius: moderateScale(2.5),
        flex: 1,

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
    },
    container: {
        justifyContent: "space-between"
    },
    buttomContainer:{
        
    }
});

export default CartItemCart;