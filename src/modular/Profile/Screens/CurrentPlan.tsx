import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { userBalanceApi, userCurrentPlanApi } from '../../../Api/Auth';
import imgs from '../../../assets/images';
import { ShowModal } from '../../../Redux/reducers/AuthModalReducer';
import { RootState } from '../../../Redux/store/store';
import Colors from '../../../styles/colors';
import fontSizes from '../../../styles/fontSizes';
import { hp } from '../../../styles/globalStyle';
import { moderateScale } from '../../../styles/ResponsiveDimentions';
import { NavigationType } from '../../../types/navigationTypes';
type Props = {}

type Balance = {
    balance:number;
    balanceId:number;
} 
type Plan = {

}
const CurrentPlan = (props: Props) => {
    const [loading , setLoading] = React.useState(true)
    const [balance , setBalance] = React.useState<null | Balance | 0>(null)
    const token = useSelector((state:RootState)=>state.Auth.token)
    const [currentPlan , setCurrentPlan] = React.useState<null |Plan >()

    const getUserBalance = async()=>{
        if(token){
            setLoading(true)
            const res = await userBalanceApi({token:token})
            if(res.data.header.httpStatusCode === 200){
                const balance = res?.data?.body
                setBalance(balance)
            }else{
                //Alert to show header message 
            }
        }
        setLoading(false)
    }

    const getUserActivePlan = async()=>{
        if(token){
            setLoading(true)
            const res = await userCurrentPlanApi({token:token})
            if(res.data.header.httpStatusCode === 200){
                const balance = res?.data?.body
                setBalance(balance)
            }else{
                //Alert to show header message 
            }
        }
        setLoading(false)
    }
    React.useEffect(()=>{
        getUserBalance()
    },[])
    return (
        <ScrollView style={{ flex:1 }}>
            <View style={styles.screen}>
                {/* start of active plan */}
                <View style={styles.card}>
                    {/* <FastImage resizeMode='contain' source={imgs.golodOffer} style={styles.cardImg} /> */}
                    <ActivityIndicator color={Colors.primary}  size={fontSizes.font20}/> 

                    <Text style={[styles.title, { marginHorizontal: moderateScale(30) }]}>You’re currently subscribed to the  
                    {/* <Text style={{ color: "#000" }}> Gold Plan.</Text> */}
                    </Text>

                </View>
                {/* end of active plan */}

                {/* start of user balnce */}
                <View style={styles.card}>
                    <FastImage resizeMode='contain' source={imgs.balance_icon} style={styles.cardImg} />
                    <Text style={[styles.title, { color: "#000" }]}>Your Account Balance is</Text>
                    <Text style={[styles.title, styles.balance]} >
                        {balance !== null && `Cridits ${balance === 0 ? balance:  balance.balance}`}
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