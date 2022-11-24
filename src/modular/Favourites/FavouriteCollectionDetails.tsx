import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import  React  , {useState , useEffect}from 'react';
import { StyleSheet, View, Text , } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { getFavouritCollectionsDetailsApi } from '../../Api/Favourits';
import MainView from '../../common/MainView';
import NoFoundData from '../../common/NoDataFound';
import { RootState } from '../../Redux/store/store';
import { NavigationType, RootStack } from '../../types/navigationTypes';
import FavItem from './components/FavItem';
import favorites from './dumyData';
type Props = {}

const FavouriteCollectionDetails = (props: Props) => {
    const navigation = useNavigation<NavigationType>()
    const [loading , setLoading] = useState(true)
    const [favouritCollectionData , setFavouritCollectionData] = useState<any[] |null>(null)
    const token = useSelector((state:RootState)=>state.Auth.token)
    const route = useRoute<ScreenRouteProp>()
    type ScreenRouteProp = RouteProp<RootStack, 'FavouriteCollectionDetails'>;

    const onPress = (id:number)=>{
           navigation.navigate("ProductDetails" , {catID:id.toString()})
    }

    const getFavouritCollectionData = async()=>{
        if(token){
            const res = await getFavouritCollectionsDetailsApi({token:token , id:route.params.id})
            if(res.data.header.httpStatusCode === 200){
                console.log(res)
                setFavouritCollectionData(res.data.body.favorites)
            }
        }else{
            //dispatch(ShowModal(true))
        }
        setLoading(false)
    }
    useEffect(()=>{
        getFavouritCollectionData()
    },[])

    return (
        <MainView data={[]} loading={loading} overLayLoading={false} style={styles.screen}>
            <>
                {favouritCollectionData !== null && favouritCollectionData.length  === 0 && <NoFoundData title='No Favorite Collection Found'/>}
                <FlatList 
                    data={favouritCollectionData}
                    renderItem={({item})=>{
                        return <FavItem  onPressIcon={()=>{}} onPress={()=>{onPress(item.catId)}} item={favorites[0]} />
                    }}
                    keyExtractor={(item , index)=>{
                        console.log(item.collectionId)
                        return index.toString()
                    }}
                />
            </>
        </MainView>
    );
}

const styles = StyleSheet.create({
    screen: {}
});

export default FavouriteCollectionDetails;