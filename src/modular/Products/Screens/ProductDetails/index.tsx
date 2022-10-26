
import { RouteProp, useRoute, } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { getCatDetailsApi } from '../../../../Api/Auth';
import AppImage from '../../../../common/AppImage';
import MainView from '../../../../common/MainView';
import { moderateScale } from '../../../../styles/ResponsiveDimentions';
import { RootStack } from '../../../../types/navigationTypes';
import AntDesign from 'react-native-vector-icons/AntDesign';
import fontSizes from '../../../../styles/fontSizes';
import FastImage from 'react-native-fast-image';
import Colors from '../../../../styles/colors';
import gStyles from '../../../../styles/globalStyle';
import { Avatar, Divider } from 'react-native-paper';
import Button from '../../../../common/Button';
import IconButton from '../../../../common/IconButton';
import Feather from 'react-native-vector-icons/Feather';
import OutLineButton from '../../../../common/OutLineButton';
import Quantity from '../../../../components/Quantity';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { AddToCart } from '../../../../Redux/reducers/CartReducer';
import addCartDataToLocalStorag from '../../../../Redux/actions/CartAction';
type Props = {}

type ScreenRouteProp = RouteProp<RootStack, 'ProductDetails'>;

const ProductDetails = (props: Props) => {
    const [loading, setLoading] = useState(true);
    const [productDetails, setProductDetails] = useState<any>({})
    const route = useRoute<ScreenRouteProp>()
    const [mount, setMount] = useState(true);
    const [quantity , setQuantity] = useState(1)


    // ===========================
    //feach Product Details Data
    //============================
    const getProductDetails = async () => {
        const catId = route?.params?.catID
        const productDetails = await getCatDetailsApi({ catID: catId })
        setLoading(false)
        setProductDetails(productDetails.data.body)
    }
    useEffect(() => {
        try {
            getProductDetails()
        } catch (error) {
            console.log(error)
        }

    }, [])

    // ===========================
    //Show Price
    //============================
    const onShowprice = () => { console.log("preesed") }

    // ===========================
    //Add To Cart
    //============================
    const dispatch = useDispatch()
    const onAddToCart = async()=>{
        // console.log(quantity,productDetails)
        const cartData = await addCartDataToLocalStorag({catData:productDetails ,catQuantity: quantity})
        // console.log(cartData)
        dispatch(AddToCart({quantity:cartData.quantity , item:cartData.data}))
    }

    return (
        <MainView data={productDetails} loading={loading} overLayLoading={false} style={styles.screen}>
            {productDetails.catId && <ScrollView>
                <View style={[styles.imageContainer]}>
                    <View style={[gStyles.row, gStyles.spaceBetwen, gStyles.pb_6]} >
                        <AntDesign name="hearto" color={Colors.primary} size={fontSizes.font20} />
                        <Pressable style={[gStyles.row]} >
                            <Text style={[gStyles.text_Primary, gStyles.h6]} >Metal Details </Text>
                            <AntDesign color={Colors.primary} name='arrowright' size={fontSizes.font12} />
                        </Pressable>
                    </View>
                    {/* <FastImage  source={{ uri: productDetails.images[0].fullImageURL}} style={[styles.img]} /> */}
                    <AppImage imgWidth={moderateScale(120)} style={styles.img} uri={productDetails.images[0].fullImageURL} />
                </View>

                <View style={[gStyles.pv_6]}>


                    {productDetails.ref1 && <>
                        <View style={[gStyles.row, { justifyContent: "space-between", paddingVertical: moderateScale(4) }]}>
                            <View style={[{ width: '35%', }]}>
                                <Text style={[gStyles.text_black]}>Ref:</Text>
                            </View>
                            <View style={[{ width: '35%', alignItems: "flex-end", alignSelf: "flex-end" }]}>
                                <Text style={[gStyles.text_darkGray, { textAlign: "right" }]}>{productDetails.ref1}</Text>
                            </View>
                        </View>
                        <Divider />
                    </>}


                    {productDetails.ref2 && <>
                        <View style={[gStyles.row, { justifyContent: "space-between", paddingVertical: moderateScale(4) }]}>
                            <View style={[{ width: '35%', }]}>
                                <Text style={[gStyles.text_black]}>Ref2:</Text>
                            </View>
                            <View style={[{ width: '35%', alignItems: "flex-end", alignSelf: "flex-end" }]}>
                                <Text style={[gStyles.text_darkGray, { textAlign: "right" }]}>{productDetails.ref2}</Text>
                            </View>
                        </View>
                        <Divider />
                    </>}

                    {productDetails.brand && <>
                        <View style={[gStyles.row, { justifyContent: "space-between", paddingVertical: moderateScale(4), }]}>

                            <View style={[{ width: '35%', alignSelf: "flex-start" }]}>
                                <Text style={[gStyles.text_black]}>Cat Models:</Text>
                            </View>

                            <View style={[{ width: '35%', alignItems: "flex-end", alignSelf: "flex-end", justifyContent: "flex-end" }]}>

                                {productDetails.brands.map((item: any) => (
                                    <View style={[gStyles.row]} key={item.brandId}>
                                        <Text style={[gStyles.text_Primary, { textAlign: "right" }]}>{item.makerName}</Text>
                                        <View style={[gStyles.circle, { borderWidth: 1, padding: 2, borderColor: "#eee" }]}>
                                            <AppImage imgWidth={moderateScale(4)} style={{ padding: moderateScale(3) }} uri={item.makerImage} />
                                        </View>
                                    </View>
                                ))}
                            </View>

                        </View>
                        <Divider />
                    </>}


                    {productDetails.carModel && <>
                        <View style={[gStyles.row, { justifyContent: "space-between", paddingVertical: moderateScale(4) }]}>
                            <View style={[{ width: '35%', }]}>
                                <Text style={[gStyles.text_black]}>Cat Models:</Text>
                            </View>
                            <View style={[{ width: '35%', alignItems: "flex-end", alignSelf: "flex-end" }]}>
                                <Text style={[gStyles.text_darkGray, { textAlign: "right" }]}>{productDetails.carModel}</Text>
                            </View>
                        </View>
                        <Divider />
                    </>}

                    <OutLineButton outline={false} style={{}} title='Show Price ' onPress={onShowprice} icon={<Feather name="eye" size={fontSizes.font16} color={Colors.primary} />} />


                    <View style={[gStyles.row , gStyles.spaceBetwen]}>
                        <View>
                            <Quantity buttonStyle={{  }} quantity={quantity} setQuantity={setQuantity}/>
                        </View>
                        <OutLineButton outline={true} style={{ paddingHorizontal:moderateScale(6)}} title='Add to cart ' onPress={onAddToCart} icon={<AntDesign name="shoppingcart" size={fontSizes.font16} color={"#fff"} />} />
                    </View>
                </View>
            </ScrollView>}
        </MainView>
    );
}

const styles = StyleSheet.create({
    screen: {},
    imageContainer: {
        // height: moderateScale(50)
        borderWidth: moderateScale(0.8),
        padding: moderateScale(6),
        borderColor: "#eee",
        justifyContent: "center",
        alignContent: "center",
        borderRadius: moderateScale(6),
        marginBottom: moderateScale(6),
    },
    img: {
        // width:moderateScale(100),
        // hieght:moderateScale(100),
        alignSelf: "center",
        borderRadius: moderateScale(6)

    },
    showPrice: {
        paddingHorizontal:moderateScale(6)
    }
});

export default ProductDetails;