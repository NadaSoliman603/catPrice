
import { RouteProp, useNavigation, useRoute, } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { getCatDetailsApi, showPriceApi } from '../../../../Api/Auth';
import AppImage from '../../../../common/AppImage';
import MainView from '../../../../common/MainView';
import { moderateScale } from '../../../../styles/ResponsiveDimentions';
import { NavigationType, RootStack } from '../../../../types/navigationTypes';
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
import { useDispatch, useSelector } from 'react-redux';
import { AddToCart } from '../../../../Redux/reducers/CartReducer';
import addCartDataToLocalStorag from '../../../../Redux/actions/CartAction';
import PieChart from 'react-native-pie-chart';
import PieChartText from './PieChartText';
import OverLayLoading from '../../../../common/OverLayLoading';
import { RootState } from '../../../../Redux/store/store';
import useDrower from '../../useDrower';
import OutOfCridit from '../../../Search/OutOfCridit';
import CustomButtomMeueModal from '../../../../components/AuthModal';
import ButtomMeueModal from '../../../../common/ButtomMeueModal';
import { ShowModal } from '../../../../Redux/reducers/AuthModalReducer';

// import PieChart from 'react-native-pie-chart';


type Props = {}

type ScreenRouteProp = RouteProp<RootStack, 'ProductDetails'>;

const ProductDetails = (props: Props) => {
    const [loading, setLoading] = useState(true);
    const [productDetails, setProductDetails] = useState<any>({})
    const route = useRoute<ScreenRouteProp>()
    const [mount, setMount] = useState(true);
    const [quantity, setQuantity] = useState(1)
    const [modalVisible, setModalVisible] = useState(false);
    const series = [productDetails?.pd, productDetails?.pt, productDetails.rh]
    const sliceColor = [Colors.palladiumOrang, Colors.RhodiumGreen, Colors.platinumBlue,]
    const togleModal = (show: boolean,) => {
        setModalVisible(show)
    }

    const [total, setTotal] = useState<number>(0)
    const [serverError, setServerError] = useState<{ error: boolean; msg: string }>({ error: false, msg: "" })
    const [noCriditmodalVisible, setNoCriditModalVisible] = useState(false);
    const togleNoCriditModal = (show: boolean,) => {
        setNoCriditModalVisible(show)
    }

    // const prs =  (productDetails?.pd /total) * 100
    // console.log((productDetails?.pd /total)* 100, Math.round( (productDetails?.pd /total * 100) * 100) /100)
    // console.log((productDetails?.pt /total)* 100, Math.round( (productDetails?.pt /total * 100) * 100)/100)
    // console.log((productDetails?.rh /total)* 100, Math.round( (productDetails?.rh /total * 100) * 100)/100)


    // useDrower("Product Details")

    // ===========================
    //feach Product Details Data
    //============================
    const getProductDetails = async () => {
        const catId = route?.params?.catID
        const productDetails = await getCatDetailsApi({ catID: catId })
        setLoading(false)
        const product = productDetails.data.body
        setProductDetails(product)
        setTotal(product?.pd + product?.pt + product.rh)
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
    const token = useSelector((state: RootState) => state.Auth.token)
    const navigation = useNavigation<NavigationType>();
    const [overLayloading, setOverLayLoading] = useState(false)
    const [price, setPrice] = useState<null | string>(null)

    const onShowprice = async () => {
        console.log({ token })
        if (token) {
            console.log(token, productDetails.catId)
            setOverLayLoading(true)
            const res = await showPriceApi({ catId: productDetails.catId, token: token })
            console.log(res.data)
            const price = res.data.body?.formattedPrice
            setOverLayLoading(false)
            if (!price) {
                if (res.data.header.headerMessage === "NO_ACTIVE_PLAN") {
                    //navigation.navigate('CreditsSearchStack')
                    setNoCriditModalVisible(true)

                }

            } else {
                const priceText = "SAR " + price
                setPrice(priceText)
            }

        } else {
            //navigation.navigate('Login')
            setServerError({ error: true, msg: 'to show Price you have to login' })
        }
    }

    // ===========================
    //Add To Cart
    //============================
    const dispatch = useDispatch()
    const onAddToCart = async () => {
        // console.log(quantity,productDetails)
        const cartData = await addCartDataToLocalStorag({ catData: productDetails, catQuantity: quantity })
        // console.log(cartData)
        dispatch(AddToCart({ quantity: cartData.quantity, item: cartData.data }))
    }

    useEffect(() => {
        if (token) setServerError({ error: false, msg: "" })
    }, [token])

    return (
        <>
            <MainView data={productDetails} loading={loading} overLayLoading={false} style={styles.screen}>
                {productDetails.catId && <ScrollView>
                    <View style={[styles.imageContainer]}>
                        <View style={[gStyles.row, gStyles.spaceBetwen, gStyles.pb_6]} >
                            <AntDesign name="hearto" color={Colors.primary} size={fontSizes.font20} />
                            <Pressable onPress={() => togleModal(true)} style={[gStyles.row]} >
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

                        <OutLineButton textStyle={{}} outline={false} style={{}} title={price ? price : 'Show Price '} onPress={price === null ? onShowprice : () => { }} icon={
                            price ? <></> : <Feather name="eye" size={fontSizes.font16} color={Colors.primary} />} />
                        {serverError.error && <Button textStyle={[gStyles.h6, { color: Colors.error }]} style={[gStyles.alignCenter, { padding: 0 }]} onPress={() => {
                            dispatch(ShowModal(true))
                        }} title={serverError.msg} />}

                        <View style={[gStyles.row, gStyles.spaceBetwen]}>
                            <View>
                                <Quantity handelChange={() => { }} buttonStyle={{}} quantity={quantity} setQuantity={setQuantity} />
                            </View>
                            <OutLineButton textStyle={{}} outline={true} style={{ paddingHorizontal: moderateScale(6) }} title='Add to cart ' onPress={onAddToCart} icon={<AntDesign name="shoppingcart" size={fontSizes.font16} color={"#fff"} />} />
                        </View>
                    </View>
                    <View style={{ height: moderateScale(10) }}></View>
                </ScrollView>}

            </MainView>

            <ButtomMeueModal title="Metal Details" togleModal={togleModal} modalVisible={modalVisible} setModalVisible={setModalVisible}>
                <>
                    <View style={[styles.chartContainer]}>
                        <PieChart
                            sliceColor={sliceColor}
                            series={series}
                            widthAndHeight={moderateScale(80)}
                            doughnut={false}
                        />
                        <View style={[gStyles.row, gStyles.spaceBetwen, gStyles.row_Center, { paddingHorizontal: moderateScale(2) }]}>
                            <PieChartText prec={Math.round((productDetails?.pd / total * 100) * 100) / 100} color={Colors.palladiumOrang} title='palladium' />
                            <PieChartText prec={Math.round((productDetails?.rh / total * 100) * 100) / 100} color={Colors.platinumBlue} title='rhodium' />
                            <PieChartText prec={Math.round((productDetails?.pt / total * 100) * 100) / 100} color={Colors.RhodiumGreen} title='platinum' />
                        </View>
                    </View>
                </>
            </ButtomMeueModal>

            <CustomButtomMeueModal bgColor='rgba(0, 0, 0, 0.6)' height={65} title="out of credits" togleModal={togleNoCriditModal} modalVisible={noCriditmodalVisible} setModalVisible={togleNoCriditModal}>
                <OutOfCridit cancelNoCriditeModal={() => { setNoCriditModalVisible(false) }} />
            </CustomButtomMeueModal>
            {overLayloading && <OverLayLoading />}
        </>
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
        paddingHorizontal: moderateScale(6)
    },
    chartContainer: {
        // backgroundColor:"red",
        justifyContent: "center",
        flex: 1,
        alignContent: "center",
        alignItems: "center"
    }
});

export default ProductDetails;