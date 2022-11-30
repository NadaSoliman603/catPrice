import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { getCatsbyBrandApi } from '../../Api/Auth';
import MainView from '../../common/MainView';
import NoFoundData from '../../common/NoDataFound';
import CatCard from '../../components/CatCard';
import Colors from '../../styles/colors';
import gStyles, { hp, wp } from '../../styles/globalStyle';
import { moderateScale } from '../../styles/ResponsiveDimentions';
import { NavigationType, RootStack } from '../../types/navigationTypes';
type Props = {}

type ScreenRouteProp = RouteProp<RootStack, 'BrandsCats'>;
const BrandsCats = (props: Props) => {
    const route = useRoute<ScreenRouteProp>()
    const navigation = useNavigation<NavigationType>();
    const [loading, setLoading] = useState(false);
    const [flatListLoading, setFlatLisloading] = useState(false)
    const [limit, setLimit] = useState(10)
    const [noSearchResult, setNoSearchResult] = useState(false)

    const [cats, setCats] = useState([]);
    const [mount, setMount] = useState(true);

    const [search, setSearch] = useState<string>('');

       //no Cirdits
       const [modalVisible , setModalVisible ] = useState<boolean>(false)
       const togleModal = (show:boolean)=>{setModalVisible(show)}

    const brand = route.params?.catId
    //=====================
    //get Brand Data
    //=====================
    const getBrandData = async ({ brand, limit }: { brand: string; limit: string }) => {
       console.log("kkk")
        try {
            if(+limit === 10 )setLoading(true)
            if(+limit > 10 && +limit < 40)setFlatLisloading(true)
            const res = await getCatsbyBrandApi({ brand: brand, limit: limit.toString() });
            const catsData = res.data.body;
           //setFlatLisloading(false) 
            if (catsData.length < 10) setFlatLisloading(false) 
            if (catsData.length === 0) { setNoSearchResult(true) } else { setNoSearchResult(false) }
            if (mount) {
                setCats(catsData);
                if(+limit === 10 )setLoading(false)
                if(+limit > 10 && +limit < 40)setFlatLisloading(false)
            }
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    };


    useEffect(() => {
        navigation.setOptions({
            headerTitle: brand,
        });
        if(limit <= 30){
            getBrandData({ brand: brand, limit: limit.toString() });

        }

        return () => { };
    }, [limit]);


    return (
        <MainView data={[{}]} loading={false} overLayLoading={false} style={[]}>

            <View>
                <Text style={[gStyles.text_black,]}>Show All Cats from <Text style={[gStyles.text_Primary, gStyles.text_Bold]}>{route.params.catId}</Text></Text>

                {loading && <ActivityIndicator color={Colors.primary} size="small" style={[gStyles.p_2]} />}

                {noSearchResult && <NoFoundData title={'No data found'} />}

                {cats.length > 0 && <FlatList
                    data={[...cats, { loader: true, catId: "loading123" }]}
                    renderItem={({ item }) => {
                        
                        return (<CatCard last={false} showNoCriditModal={()=>{true}} item={item} flatListLoading={flatListLoading} />)
                    }}
                    keyExtractor={item => item?.catId}
                    onEndReached={() => {
                      setLimit(limit + 10)
                    }}
                />}
            </View>
        </MainView>
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
        // height: hp(10),
    }
});

export default BrandsCats;