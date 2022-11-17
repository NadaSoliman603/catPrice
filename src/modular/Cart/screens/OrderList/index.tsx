import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
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
import gStyles, { hp } from '../../../../styles/globalStyle';
import { Divider } from 'react-native-paper';
import { Drower } from '../../../../Redux/reducers/DrowerNavigation';
import useDrower from '../useDrower';
import IconButton from '../../../../common/IconButton';
import fontSizes from '../../../../styles/fontSizes';
import addCartDataToLocalStorag, { onDeletCartItems } from '../../../../Redux/actions/CartAction';
import { AddToCart, DeletItemsFromCart } from '../../../../Redux/reducers/CartReducer';
import { OrderData } from '../../../../types/types';
import OverLayLoading from '../../../../common/OverLayLoading';
import { newOrderApi } from '../../../../Api/Auth';
import { ShowModal } from '../../../../Redux/reducers/AuthModalReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
type Props = {}

const OrderList = (props: Props) => {
    const navigation = useNavigation<NavigationType>()
    const cart = useSelector((state: RootState) => state.Cart)
    const token = useSelector((state: RootState) => state.Auth.token)
    const user = useSelector((state: RootState) => state.Auth.user)
    const [loading, setLoading] = useState<boolean>(false)
    const [cartData , setcatrtData] = useState(cart?.data)

    useDrower("Card")

   
    const [selectedItem, setScllected] = useState<{ ids: number[], quantity: number }>(
        {
            ids: [],
            quantity: 0
        }
    )


    const dispatch = useDispatch()

    const deleteItem = (selectedItem: { ids: number[], quantity: number }) => {
        dispatch(DeletItemsFromCart({ catData: cart, deleteArray: selectedItem }))
    }

    const handelChecked = ({ item, checked }: { item: { id: number, quantity: number }, checked: boolean }) => {
        console.log(item.quantity)
        if (checked) {
            const newIds: number[] = [...selectedItem?.ids, item.id]
            const newQuantity: number = selectedItem.quantity + item.quantity
            setScllected({
                ids: newIds,
                quantity: newQuantity
            })
        } else {

            const index = selectedItem.ids.findIndex((el) => el === item.id)
            if (index !== -1) {
                const ids = selectedItem.ids
                ids.splice(index, 1)
                const newQuantity: number = selectedItem.quantity - item.quantity
                setScllected({
                    ids: ids,
                    quantity: newQuantity
                })
            }

        }

    }

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <IconButton title={null} onPress={() => deleteItem(selectedItem)} icon={
                <Feather size={fontSizes.font22} name='trash-2' color={Colors.primary} />
            } />
        })

    }, [selectedItem])


    const compelteOrder = async () => {
        const orderData: OrderData[] = cart.data.map((item: any) => {
            return {
                catId: item.item.catId,
                qty: item.quantity,
                catPrice: "33.74",
            }
        })
        console.log(orderData)
        if (token) {
            setLoading(true)
            try {
                const res = await newOrderApi({
                    currency: user.defCurrency,
                    data: orderData,
                    token: token
                })
                if (res.data.header.httpStatusCode === 200) {
                    AsyncStorage.removeItem("cartData")
                    dispatch(AddToCart({ quantity: 0, item: [] }))
                    navigation.navigate("OrderCompleted" , {orderNo:res.data.body.orderNo})
                } else {
                    console.log({ res })
                }
            } catch (error) {
                console.log(error)
            }
            setLoading(false)

        } else { dispatch(ShowModal(true)) }

        //navigation.navigate("OrderCompleted")
    }



    if (cart.quantity === 0) {
        return <NoFoundData title='Your Cart Is Empty' />
    }





    return (
        <>
            <ScrollView style={styles.screen}>

                <View style={[gStyles.p_6,]}>
                    {cartData.map((item: any) => (
                    <>
                    <CartItemCart selectedItem={selectedItem} handelChecked={handelChecked} item={item} key={item.item.catId} />
                    </>
                    ))}
                </View>
                <Text>{cart.quantity}</Text>

                <View style={[styles.orderCartContainer]}>
                    {cart?.data.map((item: any ) => (<View key={item.item.catId}>
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

                <OutLineButton textStyle={{}} title='Complete Order' style={{}} icon={<Text></Text>} onPress={compelteOrder} outline={true} />

                <View style={{ height: moderateScale(20) }}></View>

            </ScrollView>

            {loading && <OverLayLoading />}
        </>
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
        marginTop: moderateScale(15),
        padding: moderateScale(4),
        borderRadius: moderateScale(10),
        borderColor: "#eee",
        paddingHorizontal: moderateScale(10),
        borderBottomWidth: 0,
    },
    cartItemcontainer: {
        maxHeight: hp(42),
    },
    orderContainerScroleView: {
        maxHeight: hp(20),
    }
});

export default OrderList;