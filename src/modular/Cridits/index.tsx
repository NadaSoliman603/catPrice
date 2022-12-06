import { useNavigation } from '@react-navigation/native';
import { useStripe  ,
    Address,
    BillingDetails,} from '@stripe/stripe-react-native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable, } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getPlanApi } from '../../Api/Auth';
import imgs from '../../assets/images';
import Loading from '../../common/Loading';
import NoFoundData from '../../common/NoDataFound';
import OutLineButton from '../../common/OutLineButton';
import OverLayLoading from '../../common/OverLayLoading';
import CustomAwesomeAlert from '../../components/AwesomeAlert';
import DashedTitle from '../../components/DashedTitle';
import { ShowModal } from '../../Redux/reducers/AuthModalReducer';
import { RootState } from '../../Redux/store/store';
import Colors from '../../styles/colors';
import fontSizes from '../../styles/fontSizes';
import gStyles, { hp } from '../../styles/globalStyle';
import { moderateScale } from '../../styles/ResponsiveDimentions';
import { NavigationType } from '../../types/navigationTypes';
import { Alert } from '../../types/types';
import OfferCart from './Component/OfferCart';
import PaymentScreen from './Component/PaymentScreen';
import PlanItem from './Component/PlanItem';
// import planData from './dumyData';
type Props = {}


const CreditsScreen = (props: Props) => {
    const [plans, setPlans] = useState<any[] | null>(null)
    const [showPlan, setShowPlan] = useState<any | null>(null)
    const [mount, setMount] = useState(true)
    const [loading, setLoading] = useState<boolean>(true)
    const token = useSelector((state: RootState) => state.Auth.token)
    const navigation = useNavigation<NavigationType>()
    const dispatch = useDispatch()

    const onShowPlan = (plan: any) => {
        setShowPlan(plan)
    }


    const [showAlert, setShowAlert] = useState(false)
    const [alert, setalert] = useState<Alert>({
        message: "Please Login",
        onCancel: () => { navigation.goBack() },
        onConfairm: () => { dispatch(ShowModal(true)); navigation.goBack() },
        showCancelButton: true,
        type: 'login',
        suTitle: undefined
    })

    useEffect(() => {
        if (!token) {
            dispatch(ShowModal(true));
            navigation.goBack();
        }
    }, [])


    //=================================
    //Get Plans Data
    //=================================
    const getPlanData = async () => {
        if (token) {
            const res = await getPlanApi({ path: "", token: token })

            const plans = res?.data?.body
            console.log({ res })
            if (mount && plans) {
                setPlans(plans)
                console.log(plans[0])
                setShowPlan(plans[0])
                setLoading(false)
            }
        } else {
            // dispatch(ShowModal(true))
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


    const checkout = () => {
        if (token) {
            navigation.navigate("CheckoutScreen", { plan: showPlan })
        } else {

        }
    }

    //==========================================___start PayMant___==========================================
    const { initPaymentSheet, presentPaymentSheet, confirmPaymentSheetPayment, } =
        useStripe();
    console.log(useStripe())
    const [paymentSheetEnabled, setPaymentSheetEnabled] = useState(false);
    const [loadingPayMent, setloadingPayMent] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<{ image: string; label: string; } | null>(null);

    const fetchPaymentSheetParams = async () => {
        const { paymentIntent, ephemeralKey, customer } = {
          paymentIntent:"pi_3MBiQFJPH93PAwz91tcaWSTa_secret_DtQqXEMdDv8fV9TBXeDTbqz0W",
          ephemeralKey: "ek_test_YWNjdF8xTTUydVpKUEg5M1BBd3o5LDBGS3NJdklWcUNRRklxdWRVR2xnSDYyQlFoSUYzaTk_00LkHfsuaL",
          customer:"cus_MvUydfavML8dKx"
        }//await response.json();
        console.log({ paymentIntent, ephemeralKey, customer })
        return {
          paymentIntent,
          ephemeralKey,
          customer,
        };
      };

    const initialisePaymentSheet = async () => {
        setloadingPayMent(true);
        try {
          const { paymentIntent, ephemeralKey, customer } =
            await fetchPaymentSheetParams();
    
          const address: Address = {
            city: 'San Francisco',
            country: 'AT',
            line1: '510 Townsend St.',
            line2: '123 Street',
            postalCode: '94102',
            state: 'California',
          };
    
    
          const billingDetails: BillingDetails = {
            name: 'Jane Doe',
            email: 'foo@bar.com',
            phone: '555-555-555',
            address: address,
          };
    
          const { error, paymentOption } = await initPaymentSheet({
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
            customFlow: true,
            merchantDisplayName: 'Example Inc.',
            applePay: {
              merchantCountryCode: 'US',
            },
            style: 'automatic',
            googlePay: { merchantCountryCode: 'US', testEnv: true },
            returnURL: 'stripe-example://stripe-redirect',
            defaultBillingDetails: billingDetails,
          });
    
          console.log("paymentInitSheet===>" , { error, paymentOption }) 
    
          if (!error) {
            setPaymentSheetEnabled(true);
          } else {
            
            setalert({ ...alert, message:error.message ,  suTitle:`Error code: ${error.code}` , type:"error" ,showCancelButton:false , onConfairm:()=>{setShowAlert(false)} })
            setShowAlert(true)
            // Alert.alert(`Error code: ${error.code}`, error.message);
          }
          if (paymentOption) {
            setPaymentMethod(paymentOption);
          }
        } catch (error) {
          console.log('error===>', error);
        } finally {
            setloadingPayMent(false);
        }
      };


      const choosePaymentOption = async () => {
        try {
          const { error, paymentOption } = await presentPaymentSheet();
    
          if (error) {
            setalert({ ...alert, message:error.message ,  suTitle:`Error code: ${error.code}` , type:"error" , showCancelButton:false , onConfairm:()=>{setShowAlert(false)} })
            setShowAlert(true)
            // Alert.alert(`Error code: ${error.code}`, error.message);
          } else if (paymentOption) {
            setPaymentMethod({
              label: paymentOption.label,
              image: paymentOption.image,
            });
      
            console.log("choosePaymentOption===>" ,  { error, paymentOption }) 
          } else {
            setPaymentMethod(null);
          }
        } catch (error) {
          console.log(error)
        }
       
      };
    
      const onPressBuy = async () => {
        setloadingPayMent(true);
        const { error } = await confirmPaymentSheetPayment();
    
        if (error) {
          setalert({ ...alert, message:error.message ,  suTitle:`Error code: ${error.code}` , type:"error" , showCancelButton:false , onConfairm:()=>{setShowAlert(false)} })
          setShowAlert(true)
          // Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
          setalert({ ...alert, message:'The payment was confirmed successfully!' , type:"success" , showCancelButton:false , onConfairm:()=>{setShowAlert(false)}})
          setShowAlert(true)
          // Alert.alert('Success', 'The payment was confirmed successfully!');
          setPaymentSheetEnabled(false);
        }
        setloadingPayMent(false);
      };

      
    //==========================================end PayMant___===============================================


    return (
        <PaymentScreen  onInit={initialisePaymentSheet}>
        <View style={styles.screen}>
            {!loading && loadingPayMent &&<OverLayLoading/>}
            {loading && <Loading />}
            {token === null && <NoFoundData title='Please login' />}
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
            {plans !== null && <OutLineButton textStyle={styles.button} style={{ marginBottom: moderateScale(20) }} title='Buy Now' outline={true} icon={<></>} onPress={choosePaymentOption} />}
            <CustomAwesomeAlert showAlert={showAlert} alert={alert} />
        </View>

        </PaymentScreen>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#fff",
        padding: moderateScale(7),
        paddingVertical: moderateScale(10),
        height:hp(90)
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