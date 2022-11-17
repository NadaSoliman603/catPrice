import { useFocusEffect, useNavigation } from '@react-navigation/native';
import  React , {useEffect , useState}from 'react';
import { StyleSheet, View, Text , Pressable } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getFavouritCollectionsApi } from '../../Api/Favourits';
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
type Props = {}

const Favourites = (props: Props) => {
    const navigation = useNavigation<NavigationType>()
    const token = useSelector((state:RootState)=>state.Auth.token)
    const [loading , setLoading] = useState(true)
    const [favouritCollectionData , setFavouritCollectionData] = useState<any[] |null>(null)
    const dispatch = useDispatch()
    const onPress = (id:number)=>{
            navigation.navigate("FavouriteCollectionDetails" , {id:id.toString()})
    }

    const getFavouritCollectionData = async()=>{
        if(token){
            const res = await getFavouritCollectionsApi({token:token})
            if(res.data.header.httpStatusCode === 200){
                console.log(res)
                setFavouritCollectionData(res.data.body)
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
                 renderItem={({item})=><Pressable onPress={()=>onPress(item.collectionId)} style={({pressed})=>[{
                    backgroundColor:pressed?Colors.primaryPresedButton : "transparent"
                 },styles.cardContainer]}>
                    <View style={{ alignSelf:"flex-start" , alignItems:"flex-end" }}>
                    <Avatar.Image style={{ backgroundColor:"#fff" }} source={imgs.subtract} size={fontSizes.font16} />
                    </View>

                    <View style={[styles.titelContainer]}>
                    <Text style={styles.titel}>{item.collectionName}</Text>
                    </View>
                 </Pressable>}
                 keyExtractor = {(item)=>item.collectionId}
                 numColumns={3}
                />
            </>
        </MainView>
    );
}

const styles = StyleSheet.create({
    screen: {},
    cardContainer:{
        margin:"2%" ,
        borderWidth:moderateScale(0.5),
        padding:"2%",
        width:"30%" ,
        borderColor:Colors.lightGray,
        borderRadius:moderateScale(2),
     
        minHeight:wp(20),

    },
    titel:{
        fontWeight:"500",
        color:Colors.textBlack
    },
    titelContainer:{
        justifyContent:"center",
        alignItems:"center",
        alignContent:"center",
        flex:1
    }
});

export default Favourites;