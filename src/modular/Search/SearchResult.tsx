import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState ,useEffect } from 'react';
import { StyleSheet, View, Text, FlatList , Pressable} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { searchCatdApi } from '../../Api/Auth';
import NoFoundData from '../../common/NoDataFound';
import ButtomMeueModal from '../../components/AuthModal';
import CatCard from '../../components/CatCard';
import Colors from '../../styles/colors';
import fontSizes from '../../styles/fontSizes';
import gStyles from '../../styles/globalStyle';
import { moderateScale } from '../../styles/ResponsiveDimentions';
import { NavigationType, RootStack } from '../../types/navigationTypes';
import OutOfCridit from './OutOfCridit';
import Feather  from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store/store';


type ScreenRouteProp = RouteProp<RootStack, 'SearchResults'>;
 
const SearchResults = () => {
    const route = useRoute<ScreenRouteProp>()
    const search = route.params.search
    const [loading, setLoading] = useState(true);
    const [noSearchResult, setNoSearchResult] = useState(false)
    const [cats, setCats] = useState([]);
    const [flatListLoading, setFlatLisloading] = useState(false)
    const [limit, setLimit] = useState(10)
    const [mount, setMount] = useState(true);
    const navigation = useNavigation<NavigationType>()
    const token = useSelector((state:RootState)=>state.Auth.token)
    
    
    //no Cirdits
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const togleModal = (show: boolean) => { setModalVisible(show) }

     // ======================================
    //get more Search result if scroll end
    //=======================================
    useEffect(() => {
        const geSearchData = async ({ search, limit }: { search: string; limit: string }) => {
            try {
                if(cats.length >=10) setFlatLisloading(true)
                //setLoading(true)
                const res = await searchCatdApi({ search: search, limit: limit.toString() , token:token });
                const catsData = res.data.body;
                if (catsData.length === 0) { setNoSearchResult(true) } else { setNoSearchResult(false) }
                if (mount) {
                    setCats(catsData);
                    setFlatLisloading(false)
                    if (catsData.length < 10) setFlatLisloading(false)

                }
            } catch (error) {
                console.log(error);
                setFlatLisloading(false)
            }
            setLoading(false)
        };

        if (limit <= 30) geSearchData({ search: search, limit: limit.toString() });
        //setLoading(false)

    }, [limit]);

    useEffect(() => {
        return () => { setLoading(true) }
    }, [])


    return (
        <View style={styles.screen} >
            <Pressable
                onPress={() => { 
                    navigation.navigate("Search", { search: true }) 
                }}
                style={({ pressed }) => [{
                    backgroundColor: pressed ? "#eee" : "#fff"
                }, gStyles.row, gStyles.space_between, styles.searchButton]}  >
                <Text style={[gStyles.text_darkGray, gStyles.h4,]}>{search}</Text>
                <Feather color={Colors.darkGray} name={"search"} size={fontSizes.font22} />
            </Pressable>
            {loading && <ActivityIndicator color={Colors.primary} size="small" style={[gStyles.p_2]} />}
            {noSearchResult && <NoFoundData title={'No Srearch Result'} />}
            {cats.length > 0 && <FlatList
                data={[...cats, { loader: true, catId: "loading123" }]}
                renderItem={({ item }) => <CatCard key={item?.catId} showNoCriditModal={() => { setModalVisible(true) }} item={item} flatListLoading={flatListLoading} />}
                keyExtractor={item => item?.catId}
                onEndReached={() => {
                    setLimit(limit + 10)
                }}
            />}

            <ButtomMeueModal bgColor='rgba(0, 0, 0, 0.6)' height={65} title="out of credits" togleModal={togleModal} modalVisible={modalVisible} setModalVisible={togleModal}>
                <OutOfCridit cancelNoCriditeModal={() => { setModalVisible(false) }} />
            </ButtomMeueModal>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex:1,
        backgroundColor:Colors.white,
        padding:moderateScale(6)
    },
    searchButton: {
        borderWidth: 1,
        borderRadius: moderateScale(2),
        padding: moderateScale(5),
        borderColor: Colors.darkGray,
        marginVertical: moderateScale(6)
    }
});

export default SearchResults;