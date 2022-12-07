import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable,Keyboard } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ActivityIndicator, TextInput } from 'react-native-paper';
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
import useAlert from '../common/useAlertSucsses'
import { Alert } from '../types/types';
import CustomAwesomeAlert from './AwesomeAlert';
import OutLineButton from '../common/OutLineButton';
import { ScrollView } from 'react-native-gesture-handler';

type Props = {item: any; flatListLoading: boolean;showNoCriditModal: () => void; last: boolean}
const CatCard = ({ showNoCriditModal, item, flatListLoading, last }: Props) => {

    const navigation = useNavigation<NavigationType>()
    const token = useSelector((state: RootState) => state.Auth.token)
    const user = useSelector((state: RootState) => state.Auth.user)
    const [overLayloading, setOverLayLoading] = useState(false)
    const [price, setPrice] = useState<null | string>(null)
    const [serverError, setServerError] = useState<{ error: boolean; msg: string }>({ error: false, msg: "" })
    const [brandsModalshow, setBrandModalShow] = useState<boolean>(false)
    const [informationModal, setInformationModal] = useState<boolean>(false)
    const [informationModalHight , setinformationModalHight] = useState<number>(50)
    const [information , setInformation] = useState<string>("")
    //favourits
    const [isFavourit, setIsFavourit] = useState(item?.inFavorite)
    const dispatch = useDispatch()

    const [showAlert, setShowAlert] = useState(false)
    const [alert, setalert] = useState<Alert>({
        message: "Please Login",
        onCancel: () => { setShowAlert(false) },
        onConfairm: () => { dispatch(ShowModal(true)); setShowAlert(false) },
        showCancelButton: true,
        type: 'login',
        suTitle: undefined
    })

    useEffect(() => {

        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
            setinformationModalHight(85)
        });
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setinformationModalHight(50)
        });

        return () => {
            hideSubscription.remove();
            showSubscription.remove();

        };
    }, []);

    // ===========================
    //Show Price
    //============================
    useEffect(() => {
        if (token) setServerError({ error: false, msg: "" })
    }, [token])

    const onShowprice = async (productDetails: any) => {
        if (token) {
            setOverLayLoading(true)
            const res = await showPriceApi({ catId: productDetails.catId, token: token, currency: user?.defCurrency })
            const price = res.data.body?.formattedPrice
            setOverLayLoading(false)
            if (!price) {
                if (res.data.header.headerMessage === "NO_CREDIT") {
                    showNoCriditModal()
                } else if (res.data?.header?.httpStatusCode === 500) {
                    useAlert({
                        collback: () => { },
                        subTitle: "",
                        success: false,
                        title: res.data?.header.headerMessage || res.data?.header.httpStatus,
                    })
                }
            } else {
                const priceText = user.defCurrency + " " + price
                setPrice(priceText)
            }

        } else { dispatch(ShowModal(true))  }
    }

    const togelebrandsModalshow = (value: boolean) => { setBrandModalShow(value) }
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
                    console.log("fave", item.catId)
                    console.log({ res })
                    if (res.data.header.httpStatusCode === 200) {
                        setIsFavourit(false)
                    }
                    setFavLoading(false)
                } catch (error) {
                    console.log("error", error)
                    setFavLoading(false)
                }
            }
        } else {
            //setShowAlert(true)
            dispatch(ShowModal(true))
            //setServerError({ error: true, msg: 'to Add a Product to your favorites please login' })
        }
    }
    if (item.loader) {
        return (
            <View key="loading" style={[styles.flatListEndLoder]}>

                {flatListLoading && <ActivityIndicator color={Colors.primary} size="small" style={[gStyles.p_2]} />}
                {!flatListLoading && last && <Text style={{ textAlign: "center" }} >No more search result</Text>}
            </View>
        )
    }

    return (
        <>
            <View style={styles.screen} key={item.catId}>
                <Pressable onPress={() => navigation.navigate("ProductDetails", { catID: item.catId })} style={({ pressed }) => [{ backgroundColor: pressed ? Colors.primaryPresedButton : Colors.white }, styles.brandContainer]}>
                    <View style={[gStyles.row, gStyles.spaceBetwen]}>
                        <View style={[gStyles.row]}>
                            <View style={[item.brands.length > 1 && styles.brandLogoContainer1, item.brands.length > 1 && gStyles.center]}>
                                <Pressable onPress={() => setBrandModalShow(true)}
                                    style={[styles.brandLogoContainer, gStyles.center]}>
                                    <FastImage resizeMode='contain' source={{ uri: item.brands?.[0]?.makerImage }} style={styles.brandImg}
                                    />
                                </Pressable>
                            </View>
                            <Text
                                style={[gStyles.text_Bold, gStyles.text_black, gStyles.pl_3,]}>
                                {item?.catSn}
                            </Text>
                        </View>

                        <Pressable
                            onPress={() => { setInformationModal(true) }}
                            style={({ pressed }) => [gStyles.circleBorder, styles.showInfo, gStyles.row, gStyles.center, { backgroundColor: pressed ? Colors.primaryPresedButton : "transparent" }]}>
                            <Text style={[gStyles.text_Bold, gStyles.text_black, gStyles.h5, gStyles.text_Primary,]}>
                                ?
                            </Text>
                        </Pressable>
                    </View>
                    <View style={[styles.catImgContainer]}>
                        <FastImage source={{ uri: item?.images?.[0]?.fullImageURL }} style={styles.catImg} />
                    </View>

                    <View style={[gStyles.row, gStyles.spaceBetwen,]}>
                        <Pressable onPress={price === null ? () => { onShowprice(item) } : () => { }} style={({ pressed }) => [styles.showPrice, { backgroundColor: pressed ? Colors.primaryPresedButton : "#fff", overflow: "hidden", }]}>
                            <Text style={[gStyles.text_Primary, gStyles.text_center, gStyles.text_Bold, { fontSize: fontSizes.font16 }]}>{price ? price : "Show Price"} </Text>
                        </Pressable>

                        {!favLoading && <Pressable onPress={addToFavourit} style={({ pressed }) => [{ backgroundColor: pressed ? Colors.primaryPresedButton : "#fff" }, styles.favButton]}  >
                            <AntDesign name={isFavourit ? "heart" : "hearto"} color={Colors.primary} size={fontSizes.font20} />
                        </Pressable>}
                        {favLoading && <ActivityIndicator color={Colors.primaryPresedButton} size={fontSizes.font20} />}
                    </View>
                    {serverError.error && <Button icon={undefined} textStyle={[gStyles.h6, { color: Colors.error }]} style={[gStyles.alignCenter, { padding: 0 }]} onPress={() => {
                        dispatch(ShowModal(true))
                    }} title={serverError.msg} />}
                    {overLayloading && <OverLayLoading />}

                </Pressable>
            </View>

            {/* start favourits modal  */}
            <CustomButtomMeueModal loading={false} bgColor='rgba(0, 0, 0, 0.7)' height={40} title="Add to favourites" togleModal={togeleFavouritModalShow} modalVisible={favouritModalShow} setModalVisible={togeleFavouritModalShow}>
                <AddToFavourit setIsFavourit={setIsFavourit} catId={item.catId} cancelModal={() => { setFavouritModalShow(false) }} />
            </CustomButtomMeueModal>


            <CustomButtomMeueModal loading={false} bgColor='rgba(0, 0, 0, 0.7)' height={40} title="Car Brands" togleModal={togelebrandsModalshow} modalVisible={brandsModalshow} setModalVisible={togelebrandsModalshow}>
                <View style={{ padding: moderateScale(6), }}>
                    {item.brands.map((item: any) => {
                        return (
                            <View key={item.brandId} style={{ flexDirection: "row", flex: 1, marginVertical: moderateScale(3) }} >
                                <Pressable
                                    style={[styles.brandLogoContainer, gStyles.center, { justifyContent: "center", alignContent: "center", alignItems: "center", alignSelf: "center" }]}>
                                    <FastImage resizeMode='contain' source={{ uri: item.makerImage }} style={styles.brandModalImg}
                                    />
                                </Pressable>
                                <Text style={styles.brandName}> {item.makerName}</Text>
                            </View>
                        )
                    })}
                </View>
            </CustomButtomMeueModal>
            {/* end  favourits modal  */}


            {/* start information modal */}
            <CustomButtomMeueModal loading={false} bgColor='rgba(0, 0, 0, 0.7)' height={informationModalHight} title="Information" togleModal={(value) => { setInformationModal(value) }} modalVisible={informationModal} setModalVisible={setInformationModal}>
                <View style={{ padding: moderateScale(6), }}>
                    {item.brands.map((item: any) => {
                        return (
                            <View key={item.brandId} style={{flex:1}} >
                               <ScrollView>
                               <TextInput
                                    mode="outlined"
                                    placeholder='Type anything to ask....'
                                    label="Type anything to ask...."
                                    value={information}
                                    onChangeText={text => { setInformation(text)}}
                                    numberOfLines={5}
                                    multiline={true} 
                                    outlineColor={"#eee"}
                                    selectionColor={Colors.bg}
                                    style={{ 
                                        backgroundColor:Colors.white
                                     }}
                                />
                                <OutLineButton textStyle={{}} title="Send" icon={<Text></Text>} onPress={() => { }} outline={true} style={{ margin: 0, padding: 0, marginVertical: moderateScale(10) }} />
                               </ScrollView>
                            </View>
                        )
                    })}
                </View>
            </CustomButtomMeueModal>
            {/* end information modal */}

            <CustomAwesomeAlert showAlert={showAlert} alert={alert} />
        </>
    );
}

const styles = StyleSheet.create({
    screen: {
        // flex: 1,
        // padding:moderateScale(6)
    },
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
    brandLogoContainer1: {
        borderColor: 'rgba(0, 0, 0, 0.15)',
        borderWidth: moderateScale(0.5),
        // padding: moderateScale(1),
        borderRadius: moderateScale(50),
        width: moderateScale(18),
        height: moderateScale(18),
        // top:20
    },
    brandLogoContainer: {
        borderColor: 'rgba(0, 0, 0, 0.15)',
        borderWidth: moderateScale(0.5),
        padding: moderateScale(1),
        borderRadius: moderateScale(50),
        width: moderateScale(18),
        height: moderateScale(18),
        top: moderateScale(2),
        zIndex: 100,
        backgroundColor: Colors.white
    },
    showInfo: {
        width: moderateScale(8),
        height: moderateScale(8),
    },
    showPrice: {
        borderWidth: moderateScale(0.5),
        width: wp(72),
        ...gStyles.center,
        padding: moderateScale(3),
        borderColor: Colors.primary,
        borderRadius: moderateScale(3),
        height: hp(6),


    },
    favButton: {
        borderWidth: moderateScale(0.5),
        // width:wp(70),
        ...gStyles.center,
        padding: moderateScale(3),
        borderColor: "#ccc",
        borderRadius: moderateScale(3),
        height: hp(6),
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
    },
    brandModalImg: {
        width: moderateScale(13),
        height: moderateScale(15),
        // alignSelf: 'center',
    },
    brandName: {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        alignSelf: "center",
        fontWeight: "500",
        color: Colors.textBlack
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

export default CatCard;