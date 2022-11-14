import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import imgs from '../../../../assets/images';
import OutLineButton from '../../../../common/OutLineButton';
import gStyles from '../../../../styles/globalStyle';
import { moderateScale } from '../../../../styles/ResponsiveDimentions';
import { NavigationType } from '../../../../types/navigationTypes';
type Props = {}

const OrderCompleted = (props: Props) => {
    const navigation = useNavigation<NavigationType>()
    const showBuyerList = () => {
        navigation.navigate("BayerList")
    }

    return (
        <View style={[styles.screen, gStyles.center]}>
            <FastImage resizeMode='contain' source={imgs.orderdone} style={styles.img} />
            <View style={styles.container}>
                <Text style={[gStyles.text_Bold, gStyles.text_dark_gray, gStyles.text_center]}>Your Order has been completed</Text>
                <Text style={[{ color: "#565656" }, gStyles.pt_6, gStyles.text_center]}>Give this order no to any buyer to complete your sell</Text>
                <Text style={[{ color: "#565656" }, gStyles.pt_6, gStyles.text_center]}>Order NO:</Text>
                <Text style={[gStyles.text_Primary, gStyles.text_Bold, gStyles.text_center]}>#CATOOO1</Text>
            </View>

        <OutLineButton textStyle={{  }} title="Show Buyer List" icon={<Text></Text>} onPress={showBuyerList} outline={true} style={styles.button}  />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",

    },
    img: {
        width: moderateScale(90),
        height: moderateScale(80)
    },
    container: {
        width: moderateScale(100),
        alignItems: "center",
        alignSelf: "center"
    },
    button:{
        width:moderateScale(130),
        // alignSelf:"flex-end",
        marginTop:moderateScale(40)
    }
});

export default OrderCompleted;