import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { moderateScale } from '../../../../styles/ResponsiveDimentions';
import BayerListCart from '../../components/BayerListCart';
type Props = {}

const BayerList = (props:Props) => {
    return (
        <ScrollView style={styles.screen}>
            <BayerListCart />
            <BayerListCart />
            <BayerListCart />
            <BayerListCart />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
screen:{
    flex:1,
    backgroundColor:"#fff",
    padding:moderateScale(6)
}
});

export default BayerList;