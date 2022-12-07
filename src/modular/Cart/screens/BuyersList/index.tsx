import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { moderateScale } from '../../../../styles/ResponsiveDimentions';
import BuyersListCart from '../../components/BuyersListCart';
type Props = {}

const BuyersList = (props:Props) => {
    return (
        <View style={{ flex:1 }}>
            <ScrollView style={styles.screen}>
            <BuyersListCart />
            <BuyersListCart />
            <BuyersListCart />
            <BuyersListCart />
        </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
screen:{
    //flex:1,
    backgroundColor:"#fff",
    padding:moderateScale(6)
}
});

export default BuyersList;