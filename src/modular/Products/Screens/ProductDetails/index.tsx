
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
import { ActivityIndicator, Avatar, Divider } from 'react-native-paper';
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
import AddToFavourit from './AddToFavourit';
import Loading from '../../../../common/Loading';
import { deleteCatFromFavouritCollectionApi } from '../../../../Api/Favourits';
import Error from '../../../../common/Error';
import { ImageSlider } from "react-native-image-slider-banner";
import Slider from './Slider';
import SliderImageCustom from './SliderImageCustom';
import useAlert from '../../../../common/useAlertSucsses';
import { Alert } from '../../../../types/types';
import CustomAwesomeAlert from '../../../../components/AwesomeAlert';

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
    const [isFavourit, setIsFavourit] = useState(false)
    const [total, setTotal] = useState<number>(0)
    const [serverError, setServerError] = useState<{ error: boolean; msg: string }>({ error: false, msg: "" })
    const [noCriditmodalVisible, setNoCriditModalVisible] = useState(false);


    const [showAlert , setShowAlert] = useState(false)
    const [alert, setalert] = useState<Alert>({ 
        message: "Please Login",
        onCancel: () => { setShowAlert(false)  },
        onConfairm: () => {  dispatch(ShowModal(true)) ;  setShowAlert(false)},
        showCancelButton:true,
        type:'login',
        suTitle:undefined
    })
    const togleNoCriditModal = (show: boolean,) => { setNoCriditModalVisible(show) }
    const togleModal = (show: boolean,) => { setModalVisible(show) }

    // ===========================
    //feach Product Details Data
    //============================
    const getProductDetails = async () => {
        const catId = route?.params?.catID
        const productDetails = await getCatDetailsApi({ catID: catId, token: token })
        setLoading(false)
        const product = productDetails.data.body
        console.log("images", product?.images.length)
        setProductDetails(product)
        setTotal(product?.pd + product?.pt + product.rh)
        setIsFavourit(product?.inFavorite)
    }
    useEffect(() => {
        try {
            getProductDetails()
        } catch (error) {
            console.log(error)
        }

    }, [])


    const notLogin = ()=>{
       //setShowAlert(true)
       //setServerError({error:false , msg:""})
    }
    // ===========================
    //Show Price
    //============================
    const token = useSelector((state: RootState) => state.Auth.token)
    const navigation = useNavigation<NavigationType>();
    const [overLayloading, setOverLayLoading] = useState(false)
    const [price, setPrice] = useState<null | string>(null)
    const user = useSelector((state: RootState) => state.Auth.user)
    const onShowprice = async () => {
        if (token) {
            setOverLayLoading(true)
            const res = await showPriceApi({ catId: productDetails.catId, token: token, currency: user?.defCurrency })
            console.log(res)
            const price = res.data.body?.formattedPrice
            setOverLayLoading(false)
            setServerError({ error: false, msg: '' })

            

            if (!price) {
                if (res.data.header.headerMessage === "NO_CREDIT") {
                    //navigation.navigate('CreditsSearchStack')
                    setNoCriditModalVisible(true)
                }else if (res.data?.header?.httpStatusCode === 500){
                    useAlert({
                        collback:()=>{},
                        subTitle:"",
                        success:false,
                        title:res.data?.header.httpStatus ,
                    })
                }

            } else {
                const priceText = "SAR " + price
                setPrice(priceText)
            }

        } else {
            //navigation.navigate('Login')
            // setServerError({ error: true, msg: 'to show Price you have to login' })
            // notLogin()
            dispatch(ShowModal(true))
        }
    }

    // ===========================
    //Add To Cart
    //============================
    const dispatch = useDispatch()
    const onAddToCart = async () => {
        // console.log(quantity,productDetails)
        if (price) {
            const cartData = await addCartDataToLocalStorag({ catData: productDetails, catQuantity: quantity, icreaseBy: true })
            console.log(cartData)
            dispatch(AddToCart({ quantity: cartData.quantity, item: [...cartData.data] }))
        } else {
            setServerError({ error: true, msg: 'noPrice' })
        }

    }

    useEffect(() => {
        if (token) setServerError({ error: false, msg: "" })
    }, [token])


    // =================
    //Add To favourits
    //=================
    const [favouritModalShow, setFavouritModalShow] = useState<boolean>(false)
    const [favLoading, setFavLoading] = useState<boolean>(false)
    const togeleFavouritModalShow = (value: boolean) => { setFavouritModalShow(value) }
    const addToFavourit = async () => {
        if (token) {
            if (!isFavourit) {
                setFavouritModalShow(true)
            } else {
                setFavLoading(true)
                try {
                    const res = await deleteCatFromFavouritCollectionApi({ data: { catId: productDetails.catId }, token: token })
                    if (res.data.header.httpStatusCode === 200) {
                        setIsFavourit(false)

                    }
                    setFavLoading(false)
                } catch (error) {
                    console.log("error")
                    setFavLoading(false)
                }
            }
        } else {
            dispatch(ShowModal(true))
            //setServerError({ error: true, msg: 'to Add a Product to your favorites please login' })
        }
    }

    return (
        <>
            <MainView data={productDetails} loading={loading} overLayLoading={false} style={styles.screen}>
                {productDetails.catId && <ScrollView>
                    <View style={[styles.imageContainer]}>
                        <View style={[gStyles.row, gStyles.spaceBetwen, gStyles.pb_6]} >
                            {!favLoading && <Pressable onPress={addToFavourit}>
                                <AntDesign name={isFavourit ? "heart" : "hearto"} color={Colors.primary} size={fontSizes.font20} />
                            </Pressable>}
                            {favLoading && <ActivityIndicator color={Colors.primaryPresedButton} size={fontSizes.font20} />}
                            <Pressable onPress={() => togleModal(true)} style={[gStyles.row]} >
                                <Text style={[gStyles.text_Primary, gStyles.h6]} >Metal Details </Text>
                                <AntDesign color={Colors.primary} name='arrowright' size={fontSizes.font12} />
                            </Pressable>
                        </View>
                        {/* <FastImage  source={{ uri: productDetails.images[0].fullImageURL}} style={[styles.img]} /> */}
                        {/* <AppImage imgWidth={moderateScale(120)} style={styles.img} uri={productDetails?.images[0]?.fullImageURL} /> */}
                        {/* <ImageSlider
                            data={productDetails?.images.map((item: any) => { return { img: item.fullImageURL } })}
                            autoPlay={false}
                            onItemChanged={(item) => console.log("item", item)}
                            closeIconColor={Colors.primary}
                            caroselImageStyle={{ resizeMode: 'cover' }}
                            activeIndicatorStyle={{ 
                                backgroundColor:Colors.primary,
                             }}
                             indicatorContainerStyle={{top: 50}}

                        /> */}
                        <Slider imgs={productDetails?.images.map((item: any) => { return { img: item.fullImageURL } })}/>
                        {/* <SliderImageCustom images={productDetails?.images.map((item: any) =>  item.fullImageURL)} /> */}
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

                        {(productDetails.catSn && <>
                            <View style={[gStyles.row, { justifyContent: "space-between", paddingVertical: moderateScale(4) }]}>
                                <View style={[{ width: '35%', }]}>
                                    <Text style={[gStyles.text_black]}>CatSn:</Text>
                                </View>
                                <View style={[{ width: '35%', alignItems: "flex-end", alignSelf: "flex-end" }]}>
                                    <Text style={[gStyles.text_darkGray, { textAlign: "right" }]}>{productDetails.catSn}</Text>
                                </View>
                            </View>
                            <Divider />
                        </>)
                            ||
                            (productDetails.catNo && <>
                                <View style={[gStyles.row, { justifyContent: "space-between", paddingVertical: moderateScale(4) }]}>
                                    <View style={[{ width: '35%', }]}>
                                        <Text style={[gStyles.text_black]}>CatNo:</Text>
                                    </View>
                                    <View style={[{ width: '35%', alignItems: "flex-end", alignSelf: "flex-end" }]}>
                                        <Text style={[gStyles.text_darkGray, { textAlign: "right" }]}>{productDetails.catNo}</Text>
                                    </View>
                                </View>
                                <Divider />
                            </>)

                        }

                        {productDetails.brand && <>
                            <View style={[gStyles.row, { justifyContent: "space-between", paddingVertical: moderateScale(4), }]}>

                                <View style={[{ width: '35%', alignSelf: "flex-start" }]}>
                                    <Text style={[gStyles.text_black]}>Cat Models:</Text>
                                </View>

                                <View style={[{ width: '35%', alignItems: "flex-end", alignSelf: "flex-end", justifyContent: "flex-end" }]}>

                                    {productDetails.brands.map((item: any) => (
                                        <View style={[gStyles.row]} key={item.brandId}>
                                            <Text style={[gStyles.text_Primary, { textAlign: "right" }]}>{item.makerName} </Text>
                                            <View style={[gStyles.circle, { borderWidth: 1, padding: 2, borderColor: "#eee" }]}>
                                                <AppImage maxheight={undefined} imgWidth={moderateScale(4)} style={{ padding: moderateScale(3) }} uri={item.makerImage} />
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

                        {productDetails.type && <>
                            <View style={[gStyles.row, { justifyContent: "space-between", paddingVertical: moderateScale(4) }]}>
                                <View style={[{ width: '35%', }]}>
                                    <Text style={[gStyles.text_black]}>Ceramic:</Text>
                                </View>
                                <View style={[{ width: '35%', alignItems: "flex-end", alignSelf: "flex-end" }]}>
                                    <Text style={[gStyles.text_Primary, { textAlign: "right" }]}>{productDetails.type}</Text>
                                </View>
                            </View>
                            <Divider />
                        </>}

                        <OutLineButton textStyle={{}} outline={false} style={{}} title={price ? price : 'Show Price '} onPress={price === null ? onShowprice : () => { }} icon={
                            price ? <></> : <Feather name="eye" size={fontSizes.font16} color={Colors.primary} />} />
                        {serverError.error && serverError.msg === "noPrice" && <Error message={'to add product to the cart Please show the  Peice'} />}

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

            {/* start no cridit modal */}
            <CustomButtomMeueModal loading={false} bgColor='rgba(0, 0, 0, 0.6)' height={65} title="out of credits" togleModal={togleNoCriditModal} modalVisible={noCriditmodalVisible} setModalVisible={togleNoCriditModal}>
                <OutOfCridit cancelNoCriditeModal={() => { setNoCriditModalVisible(false) }} />
            </CustomButtomMeueModal>
            {/* end no cridit modal */}

            {/* start Favourits modal */}
            <CustomButtomMeueModal loading={false} bgColor='rgba(0, 0, 0, 0.6)' height={40} title="Add to favourites" togleModal={togeleFavouritModalShow} modalVisible={favouritModalShow} setModalVisible={togeleFavouritModalShow}>
                <AddToFavourit setIsFavourit={setIsFavourit} catId={productDetails.catId} cancelModal={() => { setFavouritModalShow(false) }} />
            </CustomButtomMeueModal>
            {/* end Favourits modal */}
            {overLayloading && <OverLayLoading />}
            <CustomAwesomeAlert showAlert={showAlert} alert={alert}/>

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