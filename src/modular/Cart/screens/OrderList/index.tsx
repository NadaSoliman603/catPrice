import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import NoFoundData from '../../../../common/NoDataFound';
import { RootState } from '../../../../Redux/store/store';
import Colors from '../../../../styles/colors';
import { moderateScale } from '../../../../styles/ResponsiveDimentions';
import Feather from 'react-native-vector-icons/Feather';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import CartItemCart from '../../components/CartItemCart';
import OutLineButton from '../../../../common/OutLineButton';
import { useNavigation } from '@react-navigation/native';
import { NavigationType } from '../../../../types/navigationTypes';
import OrderCompleted from '../OrderCompleted';
import gStyles from '../../../../styles/globalStyle';
import { Divider } from 'react-native-paper';
type Props = {}

const OrderList = (props: Props) => {
    const navigation = useNavigation<NavigationType>()
    const cart = useSelector((state: RootState) => state.Cart)

    const compelteOrder = () => {
        navigation.navigate("OrderCompleted")
    }

    if (cart.quantity === 0) {
        return <NoFoundData title='Your Cart Is Empty' />
    }
    return (
        <ScrollView style={styles.screen}>
            {
                // <FlatList
                //     data={cart.data}
                //     renderItem={({ item, index }) => <CartItemCart item={item} />}
                //     keyExtractor={({ item, index }) => item.catId}
                // />
            }

            <View style={[gStyles.p_6]}>
                {cart?.data.map((item: any) => (<CartItemCart item={item} key={item.item.catId} />))}
            </View>
            <View style={[styles.orderCartContainer]}>
                {cart?.data.map((item: any) => (<View key={item.item.catId}>
                    <View style={[gStyles.row, gStyles.spaceBetwen, { paddingVertical: moderateScale(4) }]}>
                        <Text style={[gStyles.text_Bold, gStyles.text_black]}>{item.item.catNo}</Text>
                        <Text><Text style={[]}>{item.quantity}<Text style={[gStyles.h6]}>X</Text></Text> {item.item.catSn}</Text>
                    </View>
                    <Divider />
                    <Divider />
                </View>))}

                <View style={[gStyles.row, gStyles.spaceBetwen, { paddingVertical: moderateScale(4) }]}>
                    <Text style={[gStyles.text_Bold, gStyles.text_black]}>{"Total"}</Text>
                    <Text style={[gStyles.text_Bold, gStyles.text_Primary]}>{"SAR 225.76"}</Text>
                </View>
                <Divider />
                <Divider />
            </View>

            <OutLineButton textStyle={{  }} title='Complete Order' style={{}} icon={<Text></Text>} onPress={compelteOrder} outline={true} />

            <View style={{ height: moderateScale(30) }}></View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#fff",
        // padding: moderateScale(6),

    },
    cartIcon: {
        fontWeight: '100'
    },
    orderCartContainer: {
        borderWidth: moderateScale(0.8),
        marginTop: moderateScale(6),
        padding: moderateScale(4),
        borderRadius: moderateScale(10),
        borderColor: "#eee",
        paddingHorizontal: moderateScale(10),
        borderBottomWidth: 0
    }
});

export default OrderList;