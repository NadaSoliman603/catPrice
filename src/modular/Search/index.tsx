import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import fontSizes from '../../styles/fontSizes';
import gStyles, { hp, wp } from '../../styles/globalStyle';
import Feather from 'react-native-vector-icons/Feather';
import MainView from '../../common/MainView';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NavigationType, RootStack } from '../../types/navigationTypes';
import { useGetQuery } from '../../Api/redux';
import { getBrandApi, searchCatdApi } from '../../Api/Auth';
import { FlatList } from 'react-native-gesture-handler';
import { Image } from 'react-native-animatable';
import { moderateScale } from '../../styles/ResponsiveDimentions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../../styles/colors';
import Loading from '../../common/Loading';
import NoFoundData from '../../common/NoDataFound';
import CatCard from '../../components/CatCard';
type Props = {};
type ScreenRouteProp = RouteProp<RootStack, 'Search'>;

const Search = (props: Props) => {
    const routs = useRoute<ScreenRouteProp>()
    const [search, setSearch] = useState<string>('');
    const navigation = useNavigation<NavigationType>();
    const [loading, setLoading] = useState(false);
    const [flatListLoading, setFlatLisloading] = useState(false)
    const [limit, setLimit] = useState(10)
    const [noSearchResult , setNoSearchResult] =useState(false)

    const [cats, setCats] = useState([]);
    const [mount, setMount] = useState(true);



    // ========================
    //get Search result
    //========================
    const getBrandData = async ({ search, limit }: { search: string; limit: string }) => {
        try {
            setLoading(true)
            const res = await searchCatdApi({ search: search, limit: limit.toString() });
            const catsData = res.data.body;
            if(catsData.length === 0){ setNoSearchResult(true)}else{setNoSearchResult(false)}
            console.log(mount)
            if (mount) {
                // console.log(catsData)
                setCats(catsData);
                setLoading(false)
            }
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    };


    const params = routs.params
    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Search',
        });
        
        if(!params?.search){
            getBrandData({ search: search, limit: limit.toString() });
        }
        
        return () => { };
    }, []);



    // ======================================
    //get more Search result if scroll end
    //=======================================
    useEffect(() => {
        const getBrandData = async ({ search, limit }: { search: string; limit: string }) => {
            try {
                setFlatLisloading(true)
                const res = await searchCatdApi({ search: search, limit: limit.toString() });
                const catsData = res.data.body;
                if(catsData.length === 0){ setNoSearchResult(true)}else{setNoSearchResult(false)}
                if (mount) {
                    setCats(catsData);
                    setFlatLisloading(false)
                }
            } catch (error) {
                console.log(error);
                setFlatLisloading(false)
            }
        };
        if (limit !== 10)  getBrandData({ search: search, limit: limit.toString() });
        return () => {
            setMount(false);
        };
    }, [limit]);

    return (
        <MainView data={[{}]} loading={false} overLayLoading={false} style={[]}>
            <View>

                <View style={[gStyles.pt_6]}>
                    <TextInput
                        mode="outlined"
                        outlineColor={'#eee'}
                        label="Search by Cat id..."
                        value={search}
                        onChangeText={text => setSearch(text)}
                        right={
                            <TextInput.Icon
                                icon={() => <Pressable onPress={() => { getBrandData({ search: search, limit: limit.toString() }) }}>
                                    <Feather name={'search'} size={fontSizes.font18} />
                                </Pressable>}
                            />
                        }
                        onSubmitEditing={() => {
                            getBrandData({ search: search, limit: limit.toString() });
                        }}
                        autoFocus={params?.search}
                    />
                </View>
                
                {loading && <ActivityIndicator color={Colors.primary} size="small" style={[gStyles.p_2]} />}

                {noSearchResult && <NoFoundData title={'No cat With This ID'} />}

                {cats.length >0 &&<FlatList
                    data={[...cats, { loader: true, catId: "loading123" }]}
                    renderItem={({ item }) => <CatCard item={item} flatListLoading={flatListLoading} />}
                    keyExtractor={item => item?.catId}
                    onEndReached={() => {
                        setLimit(limit + 10)
                    }}
                />}
                <>
                    
                </>

                {/* <ActivityIndicator color={Colors.primary} size="small"  style={[gStyles.p_2]}/> */}
            </View>
        </MainView>
    );
};

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
        height: hp(25),
    }
});

export default Search;
