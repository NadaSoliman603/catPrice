import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ActivityIndicator } from 'react-native-paper';
import Colors from '../styles/colors';
import gStyles, { hp, wp } from '../styles/globalStyle';
import { moderateScale } from '../styles/ResponsiveDimentions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NavigationType } from '../types/navigationTypes';
import fontSizes from '../styles/fontSizes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Redux/store/store';
import { showPriceApi } from '../Api/Auth';
import OverLayLoading from '../common/OverLayLoading';
import Button from '../common/Button';
import { ShowModal } from '../Redux/reducers/AuthModalReducer';
import { deleteCatFromFavouritCollectionApi } from '../Api/Favourits';
import AddToFavourit from '../modular/Products/Screens/ProductDetails/AddToFavourit';
import CustomButtomMeueModal from './AuthModal';

type Props = {
    item: any
    flatListLoading: boolean;
    showNoCriditModal: () => void
}

const CatCard = ({ showNoCriditModal, item, flatListLoading }: Props) => {

    const navigation = useNavigation<NavigationType>()
    const token = useSelector((state: RootState) => state.Auth.token)
    const [overLayloading, setOverLayLoading] = useState(false)
    const [price, setPrice] = useState<null | string>(null)
    const [serverError, setServerError] = useState<{ error: boolean; msg: string }>({ error: false, msg: "" })
    //favourits
    const [isFavourit, setIsFavourit] = useState(item?.inFavorite)

    const dispatch = useDispatch()
    // ===========================
    //Show Price
    //============================
    useEffect(() => {
        if (token) setServerError({ error: false, msg: "" })
    }, [token])

    const onShowprice = async (productDetails: any) => {
        if (token) {
            console.log(token, productDetails.catId)
            setOverLayLoading(true)
            const res = await showPriceApi({ catId: productDetails.catId, token: token })
            console.log(res.data)
            const price = res.data.body?.formattedPrice
            setOverLayLoading(false)
            if (!price) {
                showNoCriditModal()
                //navigation.navigate('Login')
            } else {
                const priceText = "SAR " + price
                setPrice(priceText)
            }

        } else {
            setServerError({ error: true, msg: 'to show Price you have to login' })
            // showModal()
            // navigation.navigate('Login')
        }
    }


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
                    const res = await deleteCatFromFavouritCollectionApi({ data: { catId: item.catId }, token: token })
                    if (res.data.header.httpStatusCode === 200) {
                        setIsFavourit(true)

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
    if (item.loader) {
        console.log(item)
        return (
            <View key="loading" style={[styles.flatListEndLoder]}>
                {flatListLoading && <ActivityIndicator color={Colors.primary} size="small" style={[gStyles.p_2]} />}
            </View>
        )
    }
    return (
        <>
            <View key={item.catId}>
                <Pressable onPress={() => navigation.navigate("ProductDetails", { catID: item.catId })} style={({ pressed }) => [{ backgroundColor: pressed ? Colors.primaryPresedButton : Colors.white }, styles.brandContainer]}>
                    <View style={[gStyles.row, gStyles.spaceBetwen]}>
                        <View style={[gStyles.row]}>
                            <View
                                style={[styles.brandLogoContainer, gStyles.center]}>
                                <FastImage resizeMode='contain' source={{ uri: item.brands?.[0]?.makerImage }} style={styles.brandImg}
                                />
                            </View>
                            <Text
                                style={[gStyles.text_Bold, gStyles.text_black, gStyles.pl_3,
                                ]}>
                                {item?.catSn}
                            </Text>
                        </View>

                        <Pressable
                            style={({ }) => [gStyles.circleBorder, styles.showInfo, gStyles.row, gStyles.center,
                            ]}>
                            <Text
                                style={[gStyles.text_Bold, gStyles.text_black, gStyles.h5, gStyles.text_Primary,
                                ]}>
                                ?
                            </Text>
                        </Pressable>
                    </View>
                    <View style={[styles.catImgContainer]}>
                        <FastImage source={{ uri: item?.images?.[0]?.fullImageURL }} style={styles.catImg} />
                    </View>

                    <View style={[gStyles.row, gStyles.spaceBetwen]}>
                        <Pressable onPress={price === null ? () => { onShowprice(item) } : () => { }} style={({ pressed }) => [{ backgroundColor: pressed ? Colors.primaryPresedButton : "#fff" }]}>
                            <Text style={[gStyles.text_Primary, styles.showPrice, gStyles.text_center, gStyles.text_Bold]}>{price ? price : "Show Price"} </Text>
                        </Pressable>

                        {!favLoading && <Pressable onPress={addToFavourit} style={({ pressed }) => [{ backgroundColor: pressed ? Colors.primaryPresedButton : "#fff" }, styles.favButton]}  >
                            <AntDesign name={isFavourit ? "heart" : "hearto"} color={Colors.primary} size={fontSizes.font20} />
                        </Pressable>}
                        {favLoading && <ActivityIndicator color={Colors.primaryPresedButton} size={fontSizes.font20} />}
                    </View>
                    {serverError.error && <Button textStyle={[gStyles.h6, { color: Colors.error }]} style={[gStyles.alignCenter, { padding: 0 }]} onPress={() => {
                        dispatch(ShowModal(true))
                    }} title={serverError.msg} />}
                    {overLayloading && <OverLayLoading />}

                </Pressable>
            </View>

            <CustomButtomMeueModal bgColor='rgba(0, 0, 0, 0.6)' height={40} title="Add to favourites" togleModal={togeleFavouritModalShow} modalVisible={favouritModalShow} setModalVisible={togeleFavouritModalShow}>
                <AddToFavourit setIsFavourit={setIsFavourit} catId={item.catId} cancelModal={() => { setFavouritModalShow(false) }} />
            </CustomButtomMeueModal></>
    );
}

const styles = StyleSheet.create({
    screen: {},
    brandContainer: {
        borderWidth: moderateScale(1),
        borderColor: '#eee',
        marginVertical: moderateScale(5),
        padding: moderateScale(5),
        borderRadius: moderateScale(5),
    },
    catImg: {
        width: moderateScale(130),
        height: moderateScale(70),
        alignSelf: 'center',
        borderRadius: moderateScale(3),
    },
    catImgContainer: {
        marginVertical: moderateScale(6),
        borderWidth: moderateScale(0.8),
        width: moderateScale(132),
        alignSelf: 'center',
        height: moderateScale(72),
        justifyContent: 'center',
        borderRadius: moderateScale(3),
        borderColor: '#eee',
    },
    brandImg: {
        width: moderateScale(8),
        height: moderateScale(10),
        alignSelf: 'center',
    },
    brandLogoContainer: {
        borderColor: '#eee',
        borderWidth: moderateScale(1),
        padding: moderateScale(1),
        borderRadius: moderateScale(50),
        width: moderateScale(18),
        height: moderateScale(18),
    },
    showInfo: {
        width: moderateScale(8),
        height: moderateScale(8),
    },
    showPrice: {
        borderWidth: moderateScale(0.5),
        width: wp(70),
        ...gStyles.center,
        padding: moderateScale(3),
        borderColor: Colors.primary,
        borderRadius: moderateScale(3)
    },
    favButton: {
        borderWidth: moderateScale(0.5),
        // width:wp(70),
        ...gStyles.center,
        padding: moderateScale(3),
        borderColor: "#ccc",
        borderRadius: moderateScale(3),
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 5,
        // },
        // shadowOpacity: 0.36,
        // shadowRadius: 6.68,

        // elevation: 11,
    },
    flatListEndLoder: {
        height: hp(15),
    }
});

export default CatCard;