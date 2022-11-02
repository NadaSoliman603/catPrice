import  React , {useEffect} from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { useDispatch } from 'react-redux';
import { Drower } from '../../../Redux/reducers/DrowerNavigation';
import BackBotton from '../../../components/BackBotton';
import { useNavigation } from '@react-navigation/native';
import { NavigationType } from '../../../types/navigationTypes';

type Props = {
    title : string
}
const useDrower = (title:string) => {
    const navigation = useNavigation<NavigationType>()
    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(Drower({title:"Profile" , headerShown:false}))
        navigation.setOptions({
                title:title,
                headerLeft : ()=><BackBotton navOption={{title:"Profile" , headerShown:true}}/>,
                animationDuration:0,
                headerTitleAlign:"center",
        })


        return()=>{
            dispatch(Drower({title:"Profile" , headerShown:true}))
        }
    },[])

    return true;
}

const styles = StyleSheet.create({
    
});

export default useDrower;