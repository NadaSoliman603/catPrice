

import React, { useEffect, useState, } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
// import { login } from "../../../Redux/reducers/AuthReducer";
import { Text, View, Image } from 'react-native'
import * as Animatable from 'react-native-animatable';
import FastImage from 'react-native-fast-image';
import { NavigationType } from '../../../types/navigationTypes';
import Colors from '../../../styles/colors';
import { wp } from '../../../styles/globalStyle';
import imgs from '../../../assets/images';
import { AddToCart } from '../../../Redux/reducers/CartReducer';
import { Login } from '../../../Redux/reducers/AuthReducer';
import { getLocationdApi } from '../../../Api/Auth';
import { Location } from '../../../Redux/reducers/LocationReducer';


const SplashScreen = () => {
    const navigation = useNavigation<NavigationType>();
    const dispatch = useDispatch();

    //============================
    //check Login manage Token
    //===========================
    const checkLogin = async () => {
        const cartData = await AsyncStorage.getItem("cartData")
        if (cartData) {
            const userCartData = await JSON.parse(cartData)
            dispatch(AddToCart({ quantity: userCartData.quantity, item: userCartData.data }))
        }
        const user = await AsyncStorage.getItem("user")
        if (user) {
            const userData = await JSON.parse(user)
            dispatch(Login({ user: userData, token: userData.token }))
            console.log("tokke")

        } else {
            console.log("notAuth")
        }

    }

    //==========================
    //get Location data
    //==========================
    const getLocation = async () => {
        try {
            const res = await getLocationdApi()
            console.log({ res })
            const locationData = res?.data

            if (locationData) {
                // const data = await JSON.parse(locationData)
                dispatch(Location({
                    callingCode: [locationData.country_calling_code.substr(1)],
                    cca2: locationData.country_code,
                    currency: [locationData.currency],
                    name: locationData.country_name,
                }))
                AsyncStorage.setItem("locationData", JSON.stringify(locationData))
            }
        } catch (error) {
            const location = await AsyncStorage.getItem("locationData")
            console.log("cantry===>" , location)
            if (location) {
                const locationData = await JSON.parse(location)
                dispatch(Location({
                    callingCode: [locationData.country_calling_code.substr(1)],
                    cca2: locationData.country_code,
                    currency: [locationData.currency],
                    name: locationData.country_name,
                }))
            }
            console.log(error)
        }
    }
    const [navigateScreen , setNavigateScreen] = useState<"Home" | "OnBoarding1" |null>(null)
    const onBroading = async()=>{
        const onBroading = await AsyncStorage.getItem("onBroading")
        if(onBroading === null) {
            setNavigateScreen("OnBoarding1") 
        }else{
            setNavigateScreen("Home") 
        }
        console.log(onBroading)
    }
    const brodding = onBroading()

    useEffect(() => {
        checkLogin()
        getLocation()
       
        
        setTimeout(() => {
            if(navigateScreen !== null){
                navigation.reset({
                    index: 0,
                    routes: [{ name:  navigateScreen}],
                })
            }
           
        }, 2000);
    }, [navigateScreen])


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:"#fff" }}>
            <Animatable.View useNativeDriver animation='zoomIn' duration={1000} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={imgs.logo2} style={{ alignSelf: 'center', height: wp(30), width: wp(70) }} resizeMode='stretch' />
                {/* </Image> */}
            </Animatable.View>
        </View>

    );

}

export default SplashScreen;