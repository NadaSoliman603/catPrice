import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView, Keyboard , Dimensions} from 'react-native';
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
import AoutoCompletCard from './AoutoCompletCard';
import ButtomMeueModal from '../../components/AuthModal';
import OutOfCridit from './OutOfCridit';
import AddToFavourit from '../Products/Screens/ProductDetails/AddToFavourit';
type Props = {};
type ScreenRouteProp = RouteProp<RootStack, 'Search'>;

const { height } = Dimensions.get('window');


const Search = (props: Props) => {
    const routs = useRoute<ScreenRouteProp>()
    const [search, setSearch] = useState<string>('');
    const navigation = useNavigation<NavigationType>();
    const [loading, setLoading] = useState(false);
    const [flatListLoading, setFlatLisloading] = useState(false)
    const [limit, setLimit] = useState(10)
    const [noSearchResult, setNoSearchResult] = useState(false)
    const [cats, setCats] = useState([]);
    const [mount, setMount] = useState(true);
    //no Cirdits
    const [modalVisible , setModalVisible ] = useState<boolean>(false)
    const togleModal = (show:boolean)=>{setModalVisible(show)}
  
    //outoComplet
    const [searchOutoComplete, setSearchOutoComplete] = useState<string>("")
    const [outoCompletData, setOutoCompletData] = useState<null | any[]>([])
    const [loadingOutoComplete, setLoadingOutoComplete] = useState<boolean>(false);
    const [showOutoComplete, setshowOutoComplete] = useState(true)

   

    //==============
    //OutoComplet 
    //==============
    useEffect(() => {
        let myTimeout: number
        if (search !== searchOutoComplete) {
            let myTimeout = setTimeout(() => {
                setSearchOutoComplete(search)
            }, 500);

        }
        return () => {
            clearTimeout(myTimeout)
        }
    }, [search])

    useEffect(() => {
        if (searchOutoComplete.length >= 3) {
            console.log("send request")
            console.log("================================>")

            if (search === searchOutoComplete) {
                getOutoCompletData({ limit: "10", search: searchOutoComplete })

            }
        }

    }, [searchOutoComplete])

    const getOutoCompletData = async ({ search, limit }: { search: string; limit: string }) => {
        try {
            setLoadingOutoComplete(true)
            const res = await searchCatdApi({ search: search, limit: limit.toString() });
            const catsData = res.data.body;
            if (catsData.length === 0) {

                // setNoSearchResult(true)
            } else {
                // setNoSearchResult(false)
            }
            // console.log(catsData, { mount })
            if (mount) {
                if (catsData.length === 0){
                    console.log("no data")
                    setOutoCompletData(null)
                }else{
                    setOutoCompletData(catsData);
                }
                setLoadingOutoComplete(false)
            }
        } catch (error) {
            console.log(error);
            setLoadingOutoComplete(false)
        }
    };

    const [maxHeight , setMaxHight] = useState(hp(70))

    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", (e) => {
            setshowOutoComplete(true)
            console.log("keyBoardHight" , e.endCoordinates.height , height , height- e.endCoordinates.height)
            
            setMaxHight(height - e.endCoordinates.height - hp(23))

        });
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setshowOutoComplete(true)
            setMaxHight(hp(70))
        });

        return () => {
            hideSubscription.remove();
            showSubscription.remove();

        };
    }, []);

    useEffect(() => {
        // return () => { setMount(false); }
    }, [])

    // console.log({outoCompletData}, typeof(outoCompletData))
    return (
        <>
            <MainView data={[{}]} loading={false} overLayLoading={false} style={[]}>
                <View>

                    <View style={[gStyles.pt_6]}>
                        <TextInput
                            mode="outlined"
                            outlineColor={'#eee'}
                            label="Search"
                            value={search}
                            onChangeText={text => setSearch(text)}
                            right={
                                <TextInput.Icon
                                    icon={() => <Pressable onPress={() => { 
                                        //geSearchData({ search: search, limit: limit.toString() })
                                        navigation.navigate("SearchResults" , {search:search}) 
                                        }}>
                                        <Feather name={'search'} size={fontSizes.font18} />
                                    </Pressable>}
                                />
                            }
                            onSubmitEditing={() => {
                                navigation.navigate("SearchResults" , {search:search})
                                // geSearchData({ search: search, limit: limit.toString() });
                                
                            }}
                            autoFocus={true}
                            activeOutlineColor={Colors.lightGray}
                            // accessibilityLabel={""}
                            activeUnderlineColor={Colors.textLightGray}
                        />
                        {showOutoComplete && <View style={[styles.outoCompletContainer , {minHeight:maxHeight}]}>
                            {search.length < 3 && <Text style={[gStyles.h6, gStyles.text_center]}>for autocomplete you must at least write 3 characters</Text>}
                            {loadingOutoComplete && <ActivityIndicator color={Colors.primaryPresedButton} size="small" style={[gStyles.p_2]} />}
                            {outoCompletData === null && <NoFoundData title='No Srearch Result'/>}
                            <FlatList
                                data={outoCompletData}
                                renderItem={({ item }) => <AoutoCompletCard onPress={(item) => {
                                    // console.log("presed")
                                    //setshowOutoComplete(false)
                                        const outoComplet:string = (item?.catNo && item?.catNo !== "0") ? item?.catNo : item?.catSn
                                    //setSearch((item?.catNo && item?.catNo !== "0") ? item?.catNo : item?.catSn)
                                    //setSearchOutoComplete(outoComplet.toString())
                                    navigation.navigate('SearchResults' , {search: (item?.catNo && item?.catNo !== "0") ? item?.catNo : item?.catSn })
                                    // geSearchData({ limit: "10", search: (item?.catNo && item?.catNo !== "0") ? item?.catNo : item?.catSn })

                                }} item={item} />}
                                keyExtractor={item => item?.catId}
                                onEndReached={() => {
                                    // setLimit(limit + 10)
                                }}
                            />

                        </View>}
                    </View>

                    {/* {loading && <ActivityIndicator color={Colors.primary} size="small" style={[gStyles.p_2]} />}

                    {noSearchResult && <NoFoundData title={'No cat With This ID'} />}

                    {cats.length > 0 && <FlatList
                        data={[...cats, { loader: true, catId: "loading123" }]}
                        renderItem={({ item }) => <CatCard showNoCriditModal={()=>{setModalVisible(true)}} item={item} flatListLoading={flatListLoading} />}
                        keyExtractor={item => item?.catId}
                        onEndReached={() => {
                            setLimit(limit + 10)
                        }}
                    />} */}
                    <>

                    </>

                    {/* <ActivityIndicator color={Colors.primary} size="small"  style={[gStyles.p_2]}/> */}
                </View>
            </MainView>
            {/* <ButtomMeueModal bgColor='rgba(0, 0, 0, 0.6)' height={65} title="out of credits" togleModal={togleModal} modalVisible={modalVisible} setModalVisible={togleModal}>
                 <OutOfCridit cancelNoCriditeModal={()=>{setModalVisible(false)}}/>
            </ButtomMeueModal> */}

         
        </>
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
    },
    outoCompletContainer: {
        // maxHeight: hp(40),
        // minHeight: hp(40),
        marginTop: moderateScale(-1),
        borderWidth: moderateScale(0.5),
        backgroundColor: Colors.white,
        borderColor: Colors.lightGray,
        borderBottomRightRadius: moderateScale(3),
        borderBottomLeftRadius: moderateScale(3),
        zIndex: 10000,
        // marginBottom:moderateScale(10)
    }
});

export default Search;
