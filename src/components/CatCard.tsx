import  React , {useState} from 'react';
import { StyleSheet, View, Text , Pressable } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ActivityIndicator } from 'react-native-paper';
import Colors from '../styles/colors';
import gStyles, { hp, wp } from '../styles/globalStyle';
import { moderateScale } from '../styles/ResponsiveDimentions';
import AntDesign  from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { NavigationType } from '../types/navigationTypes';
import fontSizes from '../styles/fontSizes';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store/store';
import { showPriceApi } from '../Api/Auth';
import OverLayLoading from '../common/OverLayLoading';
type Props = {
    item :any
    flatListLoading :boolean;
}

const CatCard = ({item , flatListLoading}:Props) => {

    const navigation = useNavigation<NavigationType>()
 // ===========================
    //Show Price
    //============================
    const token = useSelector((state: RootState) => state.Auth.token)
    const [overLayloading , setOverLayLoading] = useState(false)
    const [price , setPrice] = useState<null |string>(null)

    const onShowprice = async(productDetails:any) => { 
        if(token){
            console.log(token , productDetails.catId)
            setOverLayLoading(true)
            const res = await showPriceApi({catId:productDetails.catId , token:token})
            console.log(res.data)
            const price = res.data.body?.price
            setOverLayLoading(false)
            if(!price){
                navigation.navigate('Login')
            }else{
                const priceText = "SAR " + price
                setPrice(priceText) 
            }
           
        }else{
            navigation.navigate('Login')
        }
     }

    if (item.loader) {
        return (
            <View key="loading" style={[styles.flatListEndLoder]}>
                {flatListLoading && <ActivityIndicator color={Colors.primary} size="small" style={[gStyles.p_2]} />}
            </View>
        )
    }
    return (
        <View key={item.catId}>
            <Pressable  onPress={()=>navigation.navigate("ProductDetails" , {catID:item.catId})} style={({pressed})=>[{backgroundColor:pressed?Colors.primaryPresedButton : Colors.white},styles.brandContainer]}>
                <View style={[gStyles.row, gStyles.spaceBetwen]}>
                    <View style={[gStyles.row]}>
                        <View
                            style={[styles.brandLogoContainer, gStyles.center]}>
                            <FastImage source={{ uri: item.brands[0]?.makerImage }} style={styles.brandImg}
                            />
                        </View>
                        <Text
                            style={[gStyles.text_Bold, gStyles.text_black, gStyles.pl_3,
                            ]}>
                            {item?.catSn}
                        </Text>
                    </View>

                    <Pressable
                        style={({ }) => [gStyles.circleBorder, styles.showInfo, gStyles.row, gStyles.center,
                        ]}>
                        <Text
                            style={[gStyles.text_Bold, gStyles.text_black, gStyles.h5, gStyles.text_Primary,
                            ]}>
                            ?
                        </Text>
                    </Pressable>
                </View>
                <View style={[styles.catImgContainer]}>
                    <FastImage source={{ uri: item?.images[0]?.fullImageURL }} style={styles.catImg} />
                </View>

                <View style={[gStyles.row, gStyles.spaceBetwen]}>
                    <Pressable onPress={()=>onShowprice(item)} style={({pressed})=>[{  backgroundColor:pressed?Colors.primaryPresedButton :"#fff"}]}>
                        <Text style={[gStyles.text_Primary, styles.showPrice, gStyles.text_center, gStyles.text_Bold]}>{price ? price :"Show Price"} </Text>
                    </Pressable>

                    <Pressable onPress={()=>console.log("preesed")}  style={({pressed})=>[{  backgroundColor:pressed?Colors.primaryPresedButton :"#fff"}, styles.favButton]}  >
                        <AntDesign name="hearto" color={Colors.primary} size={fontSizes.font20} />
                    </Pressable>
                </View>
                {overLayloading && <OverLayLoading/>}

            </Pressable>
        </View>
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
        height: hp(15),
    }
});

export default CatCard;