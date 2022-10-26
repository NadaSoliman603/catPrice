import  React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { TextInput } from 'react-native-paper';
import fontSizes from '../../styles/fontSizes';
import gStyles, { hp, wp } from '../../styles/globalStyle';
import Feather from 'react-native-vector-icons/Feather';
import MainView from '../../common/MainView';
import { useNavigation } from '@react-navigation/native';
import { NavigationType } from '../../types/navigationTypes';
import { useGetQuery } from '../../Api/redux';
import { getBrandApi } from '../../Api/Auth';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { Image } from 'react-native-animatable';
import { moderateScale } from '../../styles/ResponsiveDimentions';
import Colors from '../../styles/colors';
import FastImage from 'react-native-fast-image';
import AppImage from '../../common/AppImage';
type Props = {}

const Brand = (props: Props) => {
    const [search, setSearch] = useState("");
    const navigation = useNavigation<NavigationType>()

    const [brand, setBrand] = useState([])
    const [mount, setMount] = useState(true)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "Brand",
        });

        const getBrandData = async () => {
            try {
                const res = await getBrandApi()
                const brandData = res.data.body
                if (mount) {
                    console.log(brandData.length)
                    setBrand(brandData)
                    setLoading(false)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getBrandData()
        return () => {
            setMount(false)
        }
    }, []);

    const onBrandPress = (catId:string)=>{
        navigation.navigate("BrandsCats" , {catId:catId})
    }
    return (
        <MainView style={[styles.screen]} loading={loading} data={brand} overLayLoading={false}>
            <ScrollView>
                <View style={[{flexDirection: "row",flexWrap: "wrap" , justifyContent:"space-evenly"}]}>
                    {brand?.map((item: any) => {
                        return ((
                            <View  key={item.makerId} style={[gStyles.pb_6]}>
                                <Pressable onPress={()=>onBrandPress(item.makerName)} style={({pressed})=>[{
                                    backgroundColor:pressed?Colors.primaryPresedButton:Colors.white
                                },styles.brandContainer , gStyles.center ]}>
                                    {/* <FastImage source={{ uri: item.makerImage }} style={styles.brandImag} /> */}
                                    <AppImage  imgWidth={moderateScale(30)}  uri= {item.makerImage } style={styles.brandImag} />

                                </Pressable>
                                <Text style={[gStyles.text_black, gStyles.selfCenter]}>{item.makerName}</Text>
                            </View>
                        ))
                    })}
                </View>
            </ScrollView>
        </MainView>
    );
}


{/*  */ }

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal:0
    },
    brandContainer: {
        borderWidth: moderateScale(0.6),
        borderColor: "#ccc",
        padding: moderateScale(4),
        borderRadius:moderateScale(4),
        height:hp(13),
        width:wp(27),
    },
    brandImag: {
        width: moderateScale(20),
        height: moderateScale(20),
        alignSelf: "center"
    },
    container: {
        // backgroundColor:"red",
        // flexDirection:"row",
        // width: wp(32)
    }
});

export default Brand;

