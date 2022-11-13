import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable, } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { getPlanApi } from '../../Api/Auth';
import imgs from '../../assets/images';
import Loading from '../../common/Loading';
import OutLineButton from '../../common/OutLineButton';
import DashedTitle from '../../components/DashedTitle';
import { RootState } from '../../Redux/store/store';
import Colors from '../../styles/colors';
import fontSizes from '../../styles/fontSizes';
import gStyles from '../../styles/globalStyle';
import { moderateScale } from '../../styles/ResponsiveDimentions';
import OfferCart from './Component/OfferCart';
import PlanItem from './Component/PlanItem';
// import planData from './dumyData';
type Props = {}


const CreditsScreen = (props: Props) => {
    const [plans, setPlans] = useState<any[] | null>(null)
    const [showPlan, setShowPlan] = useState<any | null>(null)
    const [mount, setMount] = useState(true)
    const [loading, setLoading] = useState<boolean>(true)
    const token = useSelector((state:RootState)=>state.Auth.token)

    const onShowPlan = (plan: any) => {
        setShowPlan(plan)
    }


    //=================================
    //Get Plans Data
    //=================================
    const getPlanData = async () => {
        if(token){
            const res = await getPlanApi({ path: "", token: token })
       
            const plans = res?.data?.body
           
            if (mount && plans) {
                setPlans(plans)
                console.log(plans[0])
                setShowPlan(plans[0])
                setLoading(false)
            }
        }
       
    }
    useEffect(() => {
        try {
            getPlanData()

        } catch (error) {
            console.log(error)
        }
        return () => { setMount(false) }
    }, [plans])

    return (
        <View style={styles.screen}>
             {loading && <Loading />}
            <ScrollView >
                
                {plans !== null && showPlan && <View style={[gStyles.row, gStyles.space_around, { marginBottom: moderateScale(30) }]}>
                    {plans?.map((item) => {
                        const active = item.planName === showPlan.planName
                        const img = item.planName === "GOLDEN PLAN" ? imgs.golodOffer : item.planName === "PLTINUM PLAN" ? imgs.silveroffer : imgs.starterOffer
                        return <OfferCart key={item.planId} title={item.planName} active={active} img={img} onPress={() => onShowPlan(item)} />
                    })}
                </View>}

                {showPlan && <>

                    <DashedTitle title='Gold Offer' lineStyle={{ borderColor: Colors.lightGray }} textStyle={{}} />
                    <Text style={[gStyles.text_center, gStyles.text_black, gStyles.h4]}>Year Plane for <Text style={[gStyles.text_Primary]}>SAR {showPlan.planPrice}</Text></Text></>
                }

                {showPlan && <View style={[{ padding: moderateScale(4) }]}>
                    <PlanItem title={showPlan.planDescription} />
                    <PlanItem title={showPlan.planDescription} />
                    <PlanItem title={showPlan.planDescription} />
                    <PlanItem title={showPlan.planDescription} />
                </View>
                }
            </ScrollView>
            {plans !== null && <OutLineButton textStyle={styles.button} style={{ marginBottom: moderateScale(20) }} title='Buy Now' outline={true} icon={<></>} onPress={() => { }} />}
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#fff",
        padding: moderateScale(7),
        paddingVertical: moderateScale(10)
    },
    offerImgCard: {
        borderColor: Colors.lightGray,
        borderWidth: moderateScale(0.5),

        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        borderRadius: moderateScale(3),
        paddingVertical: moderateScale(2)
    },
    offerImgContainer: {
        width: "30%",
    },
    button: {
        fontSize: fontSizes.font16,
        fontWeight: '400',
        letterSpacing: moderateScale(0.4)
    }

});

export default CreditsScreen;