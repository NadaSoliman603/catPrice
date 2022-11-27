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
type Props = {}

const Favourites = (props: Props) => {
    const navigation = useNavigation<NavigationType>()
    const token = useSelector((state: RootState) => state.Auth.token)
    const [loading, setLoading] = useState(true)
    const [overLayLoading, setOverLayLoading] = useState(false)
    const [favouritCollectionData, setFavouritCollectionData] = useState<any[] | null>(null)
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
            }else{
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
    const deleteCollection = async (collectionId: number) => {
        if (token) {
            setOverLayLoading(true)
            const res = await deleteFavouritCollectionApi({ token: token, data: { collectionId: collectionId } })
            if (res.data.header.httpStatusCode === 200) {
                console.log(res)
                const newData = favouritCollectionData?.filter((item) => item.collectionId !== collectionId)
                    console.log({newData})
                if(newData){
                    setFavouritCollectionData(newData)
                    useAlert({ collback: () => { }, subTitle: "", success: true, title: "Collection Deleted  successfully"})}
                
            } else {
                useAlert({collback: () => { },subTitle: "",success: false,title: res })
            }
            setOverLayLoading(false)
        } else {
            useNotLogin()
        }

    }

    return (
        <MainView data={[]} loading={loading} overLayLoading={false} style={styles.screen}>
            <>
                {favouritCollectionData !== null && favouritCollectionData.length === 0 && <NoFoundData title='No Favorite Collection Found' />}
                <FlatList
                    data={favouritCollectionData}
                    renderItem={({ item }) => <Pressable key={item.collectionId} onPress={() => onPress(item.collectionId)} style={({ pressed }) => [{
                        backgroundColor: pressed ? Colors.primaryPresedButton : "transparent"
                    }, styles.cardContainer]}>
                        <View style={{ alignItems: "flex-end", flexDirection: "row", justifyContent: "space-between" }}>
                            <Avatar.Image style={{ backgroundColor: "#fff" }} source={imgs.subtract} size={fontSizes.font16} />
                            {/* <Avatar.Image style={{ backgroundColor: "#fff" }} source={imgs.subtract} size={fontSizes.font16} /> */}
                            <Pressable onPress={() => deleteCollection(item.collectionId)}>
                                <MaterialIcons name='delete-forever' size={moderateScale(5)} color={"#EB001B"} />
                            </Pressable>
                        </View>

                        <View style={[styles.titelContainer]}>
                            <Text style={styles.titel}>{item.collectionName}</Text>
                        </View>
                    </Pressable>}
                    keyExtractor={(item) => item.collectionId}
                    numColumns={3}
                />
                {overLayLoading && <OverLayLoading />}
            </>
        </MainView>
    );
}

const styles = StyleSheet.create({
    screen: {},
    cardContainer: {
        margin: "2%",
        borderWidth: moderateScale(0.5),
        padding: "2%",
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
        flex: 1
    }
});

export default Favourites;