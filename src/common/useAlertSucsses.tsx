import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import SweetAlert from 'react-native-sweet-alert';

type Props = {
    title:string;
    subTitle:string;
    collback:()=>void
}

const useAlertSucsses = ({collback , subTitle , title}:Props) => {
    SweetAlert.showAlertWithOptions({
        title: title,
        subTitle: subTitle,
        style: 'success',
        cancellable: false,

    },
        (callback: any) => {
            collback()
        });
    return;
}

const styles = StyleSheet.create({
    
screen:{}
});

export default useAlertSucsses;