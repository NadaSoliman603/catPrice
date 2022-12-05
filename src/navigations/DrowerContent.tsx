import React, { useState , useEffect } from 'react';
import { StyleSheet, View, Text, Image, Pressable, } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from './../styles/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStack } from '../types/navigationTypes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MenuItems from './MenuItms';
import MenuItem from './MenuItem';
import Button from '../common/Button';
import IconButton from '../common/IconButton';
import Feather  from 'react-native-vector-icons/Feather';
import Octicons  from 'react-native-vector-icons/Octicons';
import MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import fontSizes from '../styles/fontSizes';
import { hp } from '../styles/globalStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Redux/store/store';
import { Login } from '../Redux/reducers/AuthReducer';
import { ShowModal } from '../Redux/reducers/AuthModalReducer';
import { moderateScale } from '../styles/ResponsiveDimentions';
type Props = {
    props: any;
};
type NavigationType = NativeStackNavigationProp<RootStack>
const DrowerContent = ({ props }: Props) => {
    // const [login , setLogin] = useState<any>(false)
    const navigation = useNavigation<NavigationType>()
    const login = useSelector((state: RootState) => state.Auth.token)
    const user = useSelector((state: RootState) => state.Auth.user)
    const dispatch = useDispatch()
    const onLogout = async()=>{
        await AsyncStorage.removeItem("user")
         dispatch(Login({
            token:null,
            user:null
         }))
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        })
    }

    const onLogin = ()=>{
        try {
            //toggleDrawer
            dispatch(ShowModal(true))
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            })
            //navigation.navigate('Login')
        } catch (error) {
            console.log(error)
        }
        
    }

    useEffect(()=>{
        checkLogin()
        return()=>{}
    },[login])

    const checkLogin = async () => {
        // const user = await AsyncStorage.getItem('user')
        // setLogin(user)
    }

    return (
        <ScrollView>
            <View style={styles.screen}>
                <Pressable onPress={() => { navigation.navigate("Home") }}>
                    <View style={styles.Logo} {...props}>
                       <View style={styles.userImag}>
                       <Feather  name='user' size={50}/>
                       </View>
                       {login && <Text style={{ color:Colors.white , fontWeight:"bold" , textTransform: 'capitalize' , margin:moderateScale(3) , fontSize:fontSizes.font18}}>{user?.fullNameEn}</Text>}
                    </View>
                </Pressable>

                <IconButton  icon={<Feather color={Colors.primary} name='home' size={fontSizes.font20} />} onPress={() => { 
                    // navigation.getParent()?.navigate("AppStack")
                    // console.log(navigation.getParent())
                    navigation.navigate("HomeScreen")
                    
                 }} title="Home" />
                <IconButton icon={<Feather color={Colors.primary} name='users' size={fontSizes.font20} />} onPress={() => {  navigation.navigate("BayerList") }} title="Buyers List" />
                <IconButton icon={<Octicons color={Colors.primary} name='history' size={fontSizes.font20} />} onPress={() => {  navigation.navigate("History") }} title="History" />
                {<IconButton icon={<AntDesign color={Colors.primary} name='hearto' size={fontSizes.font20} />} onPress={() => { navigation.navigate("Favourites") }} title="Favourites" />}
                <IconButton icon={<AntDesign color={Colors.primary} name='message1' size={fontSizes.font20} />} onPress={() => { navigation.navigate("Contact") }} title="Contact Us" />
                <IconButton icon={<Feather color={Colors.primary} name='alert-circle' size={fontSizes.font20} />} onPress={() => { navigation.navigate("About") }} title="About" />
                <IconButton icon={<Feather  color={Colors.primary} name='file-text' size={fontSizes.font20} />} onPress={() => { navigation.navigate("TermsAndConditions") }} title="Terms and Conditions" />
                <IconButton icon={<Octicons color={Colors.primary} name='shield-check' size={fontSizes.font20} />} onPress={() => { navigation.navigate("Privacy") }} title="Privacy Policy" />
                {login && <IconButton icon={<MaterialIcons color={Colors.primary} name='logout' size={fontSizes.font20} />} onPress={onLogout} title="Log Out" />}
                {!login && <IconButton icon={<MaterialIcons color={Colors.primary} name='login' size={fontSizes.font20} />} onPress={onLogin} title="Login" />}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    Logo: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        backgroundColor:Colors.primary,
        height:hp(25)
    },
    userImag:{
        backgroundColor:"#eee",
        padding:20,
        borderRadius:50
    }

});

export default DrowerContent;
