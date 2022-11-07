import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, View, Text , Pressable} from 'react-native';
import { Badge } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store/store';
import Colors from '../styles/colors';
import fontSizes from '../styles/fontSizes';
import { moderateScale } from '../styles/ResponsiveDimentions';
import { NavigationType } from '../types/navigationTypes';
import Feather  from 'react-native-vector-icons/Feather';
type Props = {
    navigationScreen : "OrderList" | "default"
}

const CartIcon = (props:Props) => {
    const cart = useSelector((state: RootState) => state.Cart.quantity)
    const navigation = useNavigation<NavigationType>()

    return (
        <Pressable style={{ paddingHorizontal: 20 }} onPress={() => navigation.navigate(
           props.navigationScreen === "default" ? "OrderStack" : props.navigationScreen
            )} >
        {cart >0 &&<Badge style={{ backgroundColor:"#AD1F1F" , left: moderateScale(3) , top: moderateScale(2) }} size={moderateScale(5)}>{cart}</Badge>}
        <Feather color={Colors.primary} name='shopping-cart' size={fontSizes.font22} />
    </Pressable>
    );
}

const styles = StyleSheet.create({
    
screen:{}
});

export default CartIcon;