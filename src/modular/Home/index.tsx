import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Image } from 'react-native-animatable';
import { TextInput } from 'react-native-paper';
import imgs from '../../assets/images';
import MainView from '../../common/MainView';
import Feather from 'react-native-vector-icons/Feather';
import { moderateScale } from '../../styles/ResponsiveDimentions';
import MetalPriceCard from './Components/MetalPriceCard';
import { ScrollView } from 'react-native-gesture-handler';
import gStyles, { hp, wp } from '../../styles/globalStyle';
import fontSizes from '../../styles/fontSizes';
import Colors from '../../styles/colors';
import { NavigationType } from '../../types/navigationTypes';
import { getSystemSettingApi } from '../../Api/Auth';
import { MetalPrice } from '../../types/types';
type Props = {}

const Home = (props: Props) => {
    const [mount, setMount] = useState<boolean>(true);
    const [metalPrice, setmetalPrice] = useState<null |MetalPrice>(null)
    const [loading , setLoading] = useState<boolean>(true)
    const navigation = useNavigation<NavigationType>()


    //================
    //get MetalPrice
    //================
    const getMetalPrice = async () => {
        try {
            setLoading(true)
            const res = await getSystemSettingApi()
            const metalPrice = res.data.body
            console.log({metalPrice})
            console.log(metalPrice)
            console.log(metalPrice.fdPdPrice)
            if(mount)  setmetalPrice({
                currancy:"SAR",
                fdPdPrice:metalPrice.fdPdPrice,
                fdPtPrice:metalPrice.fdPtPrice,
                fdRhPrice:metalPrice.fdRhPrice
            }) 
            setLoading(false)
        } catch (error) {
            console.log({ error })
        }
    }

    useEffect(() => {
        getMetalPrice()
        return ()=>{setMount(false)}
    }, [])

    return (
        // <MainView>
        <ScrollView style={[styles.screen,]}>
            <Image source={imgs.logo} style={styles.logo} />
            <View style={[gStyles.p_6, gStyles.selfCenter]}>
                <Text style={[gStyles.text_Bold, gStyles.h1, gStyles.text_black, gStyles.text_center, gStyles.mh_15]}>Search Catalytic Converters for price  </Text>
            </View>

            <View style={[gStyles.alignCenter,]}>
                <Text style={[gStyles.text_center, gStyles.text_darkGray, gStyles.p_6, gStyles.h3]}>Browse among more than <Text style={[gStyles.text_Primary, gStyles.text_Bold]}> 40,000</Text> catalytic convertise  price in our records.
                    Our Prices are based on real ICP results according to <Text style={[gStyles.text_Primary, gStyles.text_Bold]}> Pt</Text> , <Text style={[gStyles.text_Primary, gStyles.text_Bold]}>PD</Text> , <Text style={[gStyles.text_Primary, gStyles.text_Bold]}>RH</Text>
                </Text>
            </View>

            <Pressable
                onPress={() => { navigation.navigate("Search", { search: true }) }}
                style={({ pressed }) => [{
                    backgroundColor: pressed ? "#eee" : "#fff"
                }, gStyles.row, gStyles.space_between, styles.searchButton]}  >
                <Text style={[gStyles.text_darkGray, gStyles.h4,]}>Search by Cat id...</Text>
                <Feather color={Colors.darkGray} name={"search"} size={fontSizes.font22} />
            </Pressable>


            <View style={[gStyles.pv_6]}>
                <Text style={[gStyles.h6, gStyles.selfCenter]}>Example: 123421, TR PSA K494 ect.</Text>
            </View>


            <View style={[gStyles.row_Center, gStyles.space_around, gStyles.pv_6]}>
                <View style={[styles.borderLine]}></View>
                <Text style={[gStyles.h1, gStyles.text_Bold, gStyles.text_Primary]}>Metal Price</Text>
                <View style={[styles.borderLine]}></View>
            </View>
            <MetalPriceCard name={"PT"} title={loading ? "Loading ..." : `${metalPrice?.currancy} ${metalPrice?.fdPtPrice}`} subTitle={"03h:02m"} />
            <MetalPriceCard name={"Pd"} title={loading ? "Loading ..." : `${metalPrice?.currancy} ${metalPrice?.fdPdPrice}`} subTitle={"03h:02m"} />
            <MetalPriceCard name={"RH"} title={loading ? "Loading ..." : `${metalPrice?.currancy} ${metalPrice?.fdRhPrice}`} subTitle={"03h:02m"} />
            {/* <MetalPriceCard name={"PT"} title={"SAR 1655.60"} subTitle={"03h:02m"}/> */}
            <View style={[styles.height]}></View>
        </ScrollView>
        // </MainView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.white,
        padding: "6%",
    },
    logo: {
        width: wp(60),
        height: hp(8),
        alignSelf: "center",
        marginTop: moderateScale(5)
    },
    borderLine: {
        width: moderateScale(34),
        borderBottomWidth: moderateScale(0.3),
    },
    height: {
        height: moderateScale(40)
    },
    searchButton: {
        borderWidth: 1,
        borderRadius: moderateScale(2),
        padding: moderateScale(5),
        borderColor: Colors.darkGray,
        marginVertical: moderateScale(6)
    }
});

export default Home;

