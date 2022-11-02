import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { NavigationType } from '../types/navigationTypes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../styles/colors';
import fontSizes from '../styles/fontSizes';
import { useDispatch } from 'react-redux';
import { Drower } from '../Redux/reducers/DrowerNavigation';
type Props = {
    navOption:{
        title:string , 
        headerShown:boolean
    }
}

const BackBotton = ({navOption}: Props) => {
    const navigation = useNavigation<NavigationType>()
    const dispatch = useDispatch()

    return (<Pressable onPress={() =>{
        dispatch(Drower(navOption))   
        navigation.goBack()
         }}>
        <Ionicons name='arrow-back' color={Colors.primary} size={fontSizes.font22} />
    </Pressable>)
}

const styles = StyleSheet.create({

    screen: {}
});

export default BackBotton;