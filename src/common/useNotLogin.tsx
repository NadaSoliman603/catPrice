import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, View, Text  , Alert} from 'react-native';
import { useDispatch } from 'react-redux';
import { ShowModal } from '../Redux/reducers/AuthModalReducer';
import { NavigationType } from '../types/navigationTypes';

const useNotLogin = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation<NavigationType>()

    Alert.alert("" , "Please login" ,  [
        {
            text: "Cancel",
            onPress: () => navigation.goBack(),
            style: "cancel"
          },
        { text: "OK", onPress: () => {
            //
            dispatch(ShowModal(true)),
            navigation.goBack()
        } }
      ])
    return ;
}

const styles = StyleSheet.create({
    
});

export default useNotLogin;