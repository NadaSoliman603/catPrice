import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable, StatusBar } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator, Avatar, TextInput, } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { addFavouritCollectionApi, deleteFavouritCollectionApi, getFavouritCollectionsApi } from '../../Api/Favourits';
import imgs from '../../assets/images';
import MainView from '../../common/MainView';
import NoFoundData from '../../common/NoDataFound';
import { RootState } from '../../Redux/store/store';
import Colors from '../../styles/colors';
import fontSizes from '../../styles/fontSizes';
import gStyles, { wp } from '../../styles/globalStyle';
import { moderateScale } from '../../styles/ResponsiveDimentions';
import { NavigationType } from '../../types/navigationTypes';
import Entypo from 'react-native-vector-icons/Entypo';
import OverLayLoading from '../../common/OverLayLoading';
import useNotLogin from '../../common/useNotLogin';
import useAlert from '../../common/useAlertSucsses';
import CustomAwesomeAlert from '../../components/AwesomeAlert';
import { Alert } from '../../types/types';
import Button from '../../common/Button';
import AwesomeAlert from 'react-native-awesome-alerts';
import Error from '../../common/Error';
import Feather from 'react-native-vector-icons/Feather';
import Loading from '../../common/Loading';
import { ShowModal } from '../../Redux/reducers/AuthModalReducer';
type Props = {}

const Favourites = (props: Props) => {
    const navigation = useNavigation<NavigationType>()
    const token = useSelector((state: RootState) => state.Auth.token)
    const [loading, setLoading] = useState(true)
    const [overLayLoading, setOverLayLoading] = useState(false)
    const [favouritCollectionData, setFavouritCollectionData] = useState<any[] | null>(null)
    const [collectionNameValidationError, setCollectionNameValidationError] = useState<null | string>(null)
    const [showcreateCollectionModal, setShowcreateCollectionModal] = useState<boolean>(false)
    const [collectionName, setCllectionName] = useState("")
    const [alert, setalert] = useState<Alert>({
        message: "",
        onCancel: () => { },
        onConfairm: () => { },
        showCancelButton: true,
        type: 'success',
        suTitle: undefined,
    })
    const [showAlert, setShowAlert] = useState(false)
    const dispatch = useDispatch()
    const onPress = (id: number) => {
        navigation.navigate("FavouriteCollectionDetails", { id: id.toString() })
    }
    useEffect(() => {
        if (!token) {
            dispatch(ShowModal(true))
            navigation.goBack()
        }
    }, [])

    const getFavouritCollectionData = async () => {
        if (token) {
            const res = await getFavouritCollectionsApi({ token: token })
            if (res.data.header.httpStatusCode === 200) {
                console.log(res)
                setFavouritCollectionData(res.data.body)
            } else {
                useAlert({
                    collback: () => { },
                    subTitle: "",
                    success: false,
                    title: res
                })
            }
        } else {
        }
        setLoading(false)
    }
    useEffect(() => {
        getFavouritCollectionData()
    }, [])

    //=======================
    // delete Collection
    //=======================
    const deleteCollection = async (collectionId: number, collectionName: string) => {
        console.log({collectionId})
        const onConfairm = async () => {
            if (token) {
                setShowAlert(false)
                setOverLayLoading(true)
                const res = await deleteFavouritCollectionApi({ token: token, data: { collectionId: collectionId } })
                console.log({res})
                if (res.data.header.httpStatusCode === 200) {
                    const newData = favouritCollectionData?.filter((item) => item.collectionId !== collectionId)
                    console.log({ newData })
                    if (newData) {
                        setFavouritCollectionData(newData)
                        setShowAlert(true)
                        setalert({ suTitle: undefined, showCancelButton: false, message: "Collection Deleted  successfully", onCancel: () => null, onConfairm: () => { setShowAlert(false) }, type: "success" })
                        // useAlert({ collback: () => { }, subTitle: "", success: true, title: "Collection Deleted  successfully" })
                    }

                } else {
                    setShowAlert(true)
                    setalert({ suTitle: undefined, showCancelButton: false, message: res?.data?.header?.headerMessage || res?.data?.header?.httpStatus, onCancel: () => null, onConfairm: () => setShowAlert(false), type: "error" })

                    //useAlert({ collback: () => { }, subTitle: "", success: false, title: res })
                }
                setOverLayLoading(false)
            } else {
                useNotLogin()
            }
        }

        setShowAlert(true)
        setalert({ suTitle: `(${collectionName})`, showCancelButton: true, message: `Do You want to delete this Collection`, onCancel: () => { setShowAlert(false) }, onConfairm: onConfairm, type: "delete" })


    }

    //=======================
    // Add Collection
    //=======================
    const addNewcollection = async () => {
        if (collectionName.length === 0) {
            setCollectionNameValidationError("This filed is required *")
        } else {
            const data = { collectionName: collectionName }

            if (favouritCollectionData !== null) {
                const isCollectionWithSameName = favouritCollectionData.findIndex((item) => item.collectionName === data.collectionName)
                //if colection Name unique

                if (isCollectionWithSameName === -1) {

                    setShowcreateCollectionModal(false)
                    if (token) {
                        try {
                            setShowcreateCollectionModal(false)
                            setOverLayLoading(true)
                            const res = await addFavouritCollectionApi({
                                data: { collectionName: data.collectionName },
                                token: token
                            })
                            if (res.data.header.headerMessage === "SUCCESS") {
                                const newcollection = res?.data?.body
                                setFavouritCollectionData([...favouritCollectionData, newcollection])
                                setCollectionNameValidationError(null)

                                setShowAlert(true)
                                setalert({ suTitle: collectionName, showCancelButton: false, message: "Collection Created  successfully", onCancel: () => null, onConfairm: () => { setShowAlert(false) }, type: "success" })
                                setCllectionName("")
                            } else {
                                setShowAlert(true)
                                setalert({ suTitle: undefined, showCancelButton: false, message: res?.data?.header?.headerMessage || res?.data?.header?.httpStatus, onCancel: () => null, onConfairm: () => { setShowAlert(false) }, type: "error" })
                                setCllectionName("")
                            }
                        } catch (error) {
                            console.log("error", error)
                        }

                    }

                } else {
                    setCollectionNameValidationError("You Have a Collection with The Same Name")
                }

                setOverLayLoading(false)
            }
        }
    }
    return (
        <>
            <MainView data={[]} loading={false} overLayLoading={false} style={{ padding: 0 }}>
                <ScrollView style={{ flex: 1, padding: moderateScale(6), }}>

                    <Text style={{ textAlign: "center", color: Colors.textBlack, fontWeight: "600", fontSize: fontSizes.font18, paddingBottom: moderateScale(3) }}>Collections</Text>
                    {favouritCollectionData?.map((item: any) => (
                        <Pressable key={item.collectionId} style={({ pressed }) => [styles.cardContainer]}>


                            <Pressable onPress={() => onPress(item.collectionId)} style={({ pressed }) => [{ backgroundColor: pressed ? Colors.primaryPresedButton : "transparent" }, styles.titelContainer]}>
                                <Text style={styles.titel}> {item.collectionName}</Text>
                            </Pressable>

                            <Pressable style={({ pressed }) => [{ padding: moderateScale(5), backgroundColor: pressed ? Colors.bg_Error : "transparent" }]} onPress={() => deleteCollection(item.collectionId, item.collectionName)}>
                                <Feather name='trash-2' size={moderateScale(9)} color={"#EB001B"} />
                            </Pressable>
                        </Pressable>
                    ))}

                    <Button textStyle={[gStyles.text_White, gStyles.text_center]} style={[styles.button]} onPress={() => setShowcreateCollectionModal(true)} title={"Create Collection"}
                        icon={<Entypo name='circle-with-plus' color={Colors.white} size={moderateScale(7)} style={{ paddingLeft: moderateScale(3) }} />}
                    />
                    {/* {favouritCollectionData !== null && favouritCollectionData.length === 0 && <NoFoundData title='No Favorite Collection Found' />} */}
                    {loading && <ActivityIndicator color={Colors.primaryPresedButton} size="small" />}

                    <CustomAwesomeAlert showAlert={showAlert} alert={alert} />
                    <AwesomeAlert
                        cancelButtonStyle={styles.cancelButtonStyle}
                        actionContainerStyle={styles.actionContainerStyle}
                        show={showcreateCollectionModal}
                        showProgress={false}
                        closeOnTouchOutside={false}
                        closeOnHardwareBackPress={false}
                        showCancelButton={true}
                        showConfirmButton={true}
                        cancelText="cancel"
                        confirmText="Create"
                        confirmButtonColor={Colors.primary}
                        cancelButtonColor={Colors.error}
                        onCancelPressed={() => { setShowcreateCollectionModal(false); setCollectionNameValidationError(null) }}
                        onConfirmPressed={addNewcollection}
                        useNativeDriver={true}
                        customView={<View style={{ minHeight: moderateScale(20), width: moderateScale(110) }}>

                            <StatusBar animated={false} backgroundColor='rgba(0, 0, 0, 0.6)' />
                            <Text style={{ 
                                fontWeight:"600",
                                color:Colors.textBlack,
                                fontSize:fontSizes.font16,
                                textAlign:"center",
                                marginVertical:moderateScale(3)
                             }}>Create New Collection</Text>
                            <TextInput
                                style={[styles.input, styles.textInput]}
                                label='Colection Name'
                                value={collectionName}
                                onChangeText={(value) => { setCllectionName(value) }}
                                mode="outlined"
                                selectionColor={Colors.bg}
                                dense={true}
                                outlineColor={"#eee"}

                            />
                            {collectionNameValidationError !== null && <Error message={collectionNameValidationError} />}
                        </View>}
                    />
                </ScrollView>

            </MainView>
            {overLayLoading && <OverLayLoading />}
        </>
    );
}

const styles = StyleSheet.create({
    screen: {},
    cardContainer: {
        margin: "2%",
        borderWidth: moderateScale(0.5),
        borderColor: Colors.lightGray,
        borderRadius: moderateScale(3),
        flexDirection: "row",
        justifyContent: "space-between",

    },
    titel: {
        fontWeight: "500",
        color: Colors.textBlack
    },
    titelContainer: {
        flex: 1,
        padding: moderateScale(5),
    },
    cancelButtonStyle: {

    },
    actionContainerStyle: {
        justifyContent: "flex-end",
        paddingHorizontal: moderateScale(3)
    },
    button: {
        ...gStyles.bg_Primary,
        ...gStyles.center,
        width: "70%",
        alignSelf: "center",
        alignItems: "center",
        marginBottom: moderateScale(30)
    },
    input: {
        marginVertical: moderateScale(1),
        // width:"100%",
        // // flex:1,

    },
    container: {
        // flexDirection:"row",
        // flex:1,
    },
    textInput: {
        backgroundColor: Colors.white
    }
});

export default Favourites;