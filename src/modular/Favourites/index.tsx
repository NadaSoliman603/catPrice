import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFavouritCollectionApi, getFavouritCollectionsApi } from '../../Api/Favourits';
import imgs from '../../assets/images';
import MainView from '../../common/MainView';
import NoFoundData from '../../common/NoDataFound';
import { ShowModal } from '../../Redux/reducers/AuthModalReducer';
import { RootState } from '../../Redux/store/store';
import Colors from '../../styles/colors';
import fontSizes from '../../styles/fontSizes';
import { wp } from '../../styles/globalStyle';
import { moderateScale } from '../../styles/ResponsiveDimentions';
import { NavigationType } from '../../types/navigationTypes';
import FavItem from './components/FavItem';
import favorites from './dumyData';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import OverLayLoading from '../../common/OverLayLoading';
import useNotLogin from '../../common/useNotLogin';
import useAlert from '../../common/useAlertSucsses';
import CustomAwesomeAlert from '../../components/AwesomeAlert';
import { Alert } from '../../types/types';

type Props = {}

const Favourites = (props: Props) => {
    const navigation = useNavigation<NavigationType>()
    const token = useSelector((state: RootState) => state.Auth.token)
    const [loading, setLoading] = useState(true)
    const [overLayLoading, setOverLayLoading] = useState(false)
    const [favouritCollectionData, setFavouritCollectionData] = useState<any[] | null>(null)
    const [alert, setalert] = useState<Alert>({ 
        message: "",
        onCancel: () => { },
        onConfairm: () => { },
        showCancelButton:true,
        type:'success', 
        suTitle:undefined,
    })
    const [showAlert , setShowAlert] = useState(false)
    const dispatch = useDispatch()
    const onPress = (id: number) => {
        navigation.navigate("FavouriteCollectionDetails", { id: id.toString() })
    }

    if (!token) { useNotLogin() }

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
    const togelModal = (show:boolean)=>{
        //setalert({ message: "", onCancel: ()=>null, onConfairm: () => { } })

    }
    const deleteCollection = async (collectionId: number , collectionName:string) => {
        const onConfairm = async () => {
            if (token) {
                setShowAlert(false) 
                setOverLayLoading(true)
                const res = await deleteFavouritCollectionApi({ token: token, data: { collectionId: collectionId } })
                if (res.data.header.httpStatusCode === 200) {
                    console.log(res)
                    const newData = favouritCollectionData?.filter((item) => item.collectionId !== collectionId)
                    console.log({ newData })
                    if (newData) {
                        setFavouritCollectionData(newData)
                        setShowAlert(true) 
                        setalert({ suTitle:undefined, showCancelButton:false, message: "Collection Deleted  successfully",  onCancel: ()=>null, onConfairm: () => {setShowAlert(false) } , type:"success" })
                        // useAlert({ collback: () => { }, subTitle: "", success: true, title: "Collection Deleted  successfully" })
                    }

                } else {
                    setShowAlert(true) 
                    setalert({suTitle:undefined, showCancelButton:false, message: res?.data?.header?.headerMessage || res?.data?.header?.httpStatus,  onCancel: () => null , onConfairm: ()=>setShowAlert(false), type:"error" })

                    //useAlert({ collback: () => { }, subTitle: "", success: false, title: res })
                }
                setOverLayLoading(false)
            } else {
                useNotLogin()
            }
        }

        setShowAlert(true)
        setalert({suTitle:`(${collectionName })` ,  showCancelButton:true , message: `Do You want to delete this Collection`,  onCancel: () => { setShowAlert(false) }, onConfairm: onConfairm ,type:"delete" })



    }

    return (
        <MainView data={[]} loading={loading} overLayLoading={false} style={styles.screen}>
            <>
                {favouritCollectionData !== null && favouritCollectionData.length === 0 && <NoFoundData title='No Favorite Collection Found' />}
                <FlatList
                    data={favouritCollectionData}
                    renderItem={({ item }) => <Pressable key={item.collectionId} style={({ pressed }) => [{
                        // backgroundColor: pressed ? Colors.primaryPresedButton : "transparent"
                    }, styles.cardContainer]}>
                        <View style={{ paddingVertical: "3%", alignSelf: "flex-end", alignItems: "flex-end", flexDirection: "row", justifyContent: "space-between", paddingLeft: moderateScale(3) }}>
                            {/* <Avatar.Image style={{ backgroundColor: "#fff" }} source={imgs.subtract} size={fontSizes.font16} /> */}
                            <Pressable style={({ pressed }) => [{
                                backgroundColor: pressed ? Colors.bg_Error : "transparent"
                            }]} onPress={() => deleteCollection(item.collectionId , item.collectionName)}>
                                <MaterialIcons name='delete-forever' size={moderateScale(9)} color={"#EB001B"} />
                            </Pressable>
                        </View>

                        <Pressable onPress={() => onPress(item.collectionId)} style={({ pressed }) => [{ backgroundColor: pressed ? Colors.primaryPresedButton : "transparent" }, styles.titelContainer]}>
                            <Avatar.Image style={{ backgroundColor: "#fff" }} source={imgs.subtract} size={fontSizes.font16} />

                            <Text style={styles.titel}> {item.collectionName}</Text>
                        </Pressable>
                    </Pressable>}
                    keyExtractor={(item) => item.collectionId}
                    numColumns={3}
                />
                {overLayLoading && <OverLayLoading />}
                <CustomAwesomeAlert showAlert={showAlert} alert={alert}/>
            </>
        </MainView>
    );
}

const styles = StyleSheet.create({
    screen: {},
    cardContainer: {
        margin: "2%",
        borderWidth: moderateScale(0.5),
        width: "30%",
        borderColor: Colors.lightGray,
        borderRadius: moderateScale(2),

        minHeight: wp(20),

    },
    titel: {
        fontWeight: "500",
        color: Colors.textBlack
    },
    titelContainer: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        flex: 1,
        // backgroundColor:"red",
        flexDirection: "row"
    }
});

export default Favourites;