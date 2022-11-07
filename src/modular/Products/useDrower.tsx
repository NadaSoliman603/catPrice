import  React , {useEffect} from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { useDispatch } from 'react-redux';

import { useNavigation } from '@react-navigation/native';
import { NavigationType } from '../../types/navigationTypes';
import { Drower } from '../../Redux/reducers/DrowerNavigation';
import BackBotton from '../../components/BackBotton';

type Props = {
    title : string
}
const useDrower = (title:string) => {
    const navigation = useNavigation<NavigationType>()
    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(Drower({title:"default" , headerShown:false}))
        navigation.setOptions({
                title:title,
                headerLeft : ()=><BackBotton navOption={{title:"default" , headerShown:true}}/>,
                animationDuration:0,
                headerTitleAlign:"center",
        })


        return()=>{
            // dispatch(Drower({title:"default" , headerShown:false}))
        }
    },[])

    return true;
}

const styles = StyleSheet.create({
    
});

export default useDrower;