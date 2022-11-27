import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import SweetAlert from 'react-native-sweet-alert';

type Props = {
    title:string |any;
    subTitle:string;
    collback:()=>void;
    success:boolean;
}

const alert = ({collback , subTitle , title , success}:Props) => {
    SweetAlert.showAlertWithOptions({
        title:title?.data?.header?.headerMessage || title?.data?.header?.httpStatus   || title,
        subTitle: subTitle,
        style:success? 'success' :"error",
        cancellable: false,

    },
        (callback: any) => {
            collback()
        });
    return;
}


export default alert;