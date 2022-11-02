

import React, { useEffect, useState, } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
// import { login } from "../../../Redux/reducers/AuthReducer";
import { Text, View , Image} from 'react-native'
import * as Animatable from 'react-native-animatable';
import FastImage from 'react-native-fast-image';
import { NavigationType } from '../../../types/navigationTypes';
import Colors from '../../../styles/colors';
import { wp } from '../../../styles/globalStyle';
import imgs from '../../../assets/images';
import { AddToCart } from '../../../Redux/reducers/CartReducer';
import { Login } from '../../../Redux/reducers/AuthReducer';


const SplashScreen = () => {
    const navigation = useNavigation<NavigationType>();
    const dispatch = useDispatch();

    const checkLogin = async () => {
        const cartData = await AsyncStorage.getItem("cartData")
        if(cartData){
            const userCartData = await JSON.parse(cartData)
            dispatch(AddToCart({quantity:userCartData.quantity , item:userCartData.data}))
        }
        const user = await AsyncStorage.getItem("user")
        if(user){
            const userData = await JSON.parse(user)
            dispatch(Login(userData))
        }else{
            console.log("notAuth")
        }

    }


    useEffect(() => {
        checkLogin()
        setTimeout(() => {
            checkLogin()
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            })
        }, 2000);
    }, [])


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Animatable.View useNativeDriver animation='zoomIn' duration={1000} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={imgs.logo2} style={{ alignSelf: 'center', height: wp(30), width: wp(70) }} resizeMode='stretch'/>
                {/* </Image> */}
            </Animatable.View>
        </View>

    );

}

export default SplashScreen;