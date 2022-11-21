import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { userBalanceApi } from '../../../Api/Auth';
import imgs from '../../../assets/images';
import { ShowModal } from '../../../Redux/reducers/AuthModalReducer';
import { RootState } from '../../../Redux/store/store';
import Colors from '../../../styles/colors';
import fontSizes from '../../../styles/fontSizes';
import { hp } from '../../../styles/globalStyle';
import { moderateScale } from '../../../styles/ResponsiveDimentions';
import { NavigationType } from '../../../types/navigationTypes';
type Props = {}

type Plan = {
    balance:number;
    balanceId:number;
}
const CurrentPlan = (props: Props) => {
    const [loading , setLoading] = React.useState(true)
    const [plan , setPlan] = React.useState<null | Plan | 0>(null)
    const token = useSelector((state:RootState)=>state.Auth.token)
    const dispatch = useDispatch()
    const navigation = useNavigation<NavigationType>()

    const getActivePlanePlan = async()=>{
        if(token){
            setLoading(true)
            const res = await userBalanceApi({token:token})
            console.log(res)
            if(res.data.header.httpStatusCode){
                const currentPlane = res.data.body
                console.log(currentPlane)
                setPlan(currentPlane)
            }
            
        }else{
            Alert.alert("" , "To Show the current plan please login" ,  [
                {
                    text: "Cancel",
                    onPress: () => navigation.goBack(),
                    style: "cancel"
                  },
                { text: "OK", onPress: () => {
                    //
                    dispatch(ShowModal(true)),
                    navigation.goBack()
                } }
              ])
        }
        setLoading(false)
    }
    React.useEffect(()=>{
        getActivePlanePlan()
    },[])
    return (
        <ScrollView style={{ flex:1 }}>
            <View style={styles.screen}>
                {/* start of active plan */}
                <View style={styles.card}>
                    <FastImage resizeMode='contain' source={imgs.golodOffer} style={styles.cardImg} />
                    <Text style={[styles.title, { marginHorizontal: moderateScale(30) }]}>You’re currently subscribed to the  <Text style={{ color: "#000" }}>Gold Plan.</Text> </Text>

                </View>
                {/* end of active plan */}

                {/* start of user balnce */}
                <View style={styles.card}>
                    <FastImage resizeMode='contain' source={imgs.balance_icon} style={styles.cardImg} />
                    <Text style={[styles.title, { color: "#000" }]}>Your Account Balance is</Text>
                    <Text style={[styles.title, styles.balance]} >
                        {plan !== null && `Cridits ${plan === 0 ? plan:  plan.balance}`}
                        {loading && <ActivityIndicator color={Colors.primary}  size={fontSizes.font20}/> }
                        </Text>
                </View>
                {/* end of user balnce */}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        // flex: 1,
        backgroundColor: Colors.white,
        padding: moderateScale(6),
        justifyContent: "space-evenly",
        alignContent: "center",
        alignItems: "center",
        paddingHorizontal: moderateScale(10),
        minHeight: hp(90),
        
    },
    card: {
        alignItems: "center",
        // backgroundColor:"red",
        justifyContent: "center",
        width: "100%",

    },
    cardImg: {
        width: moderateScale(30),
        height: moderateScale(30),
        margin: moderateScale(5)
    },
    title: {
        fontWeight: "500",
        lineHeight: moderateScale(10),
        color: Colors.textLightGray,
        textAlign: "center",
        fontSize: fontSizes.font16
    },
    balance: {
        backgroundColor: Colors.lightGreen,
        color: Colors.primary,
        marginVertical: moderateScale(6),
        padding: moderateScale(4),
        width: "100%",
        borderRadius: moderateScale(3),
        fontWeight: "600",
        fontSize: fontSizes.font20,

    }
});

export default CurrentPlan;