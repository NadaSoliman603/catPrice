import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import {
  useStripe,
  Address,
  BillingDetails,
} from '@stripe/stripe-react-native';
import PaymentScreen from '../Component/PaymentScreen';
import Button from '../Component/Button';
import Colors from '../../../styles/colors';
import { API_URL } from '../helper';
import { PaymentSheetParamsAPI } from '../../../Api/Auth';
import { Alert } from '../../../types/types';

export default function PaymentsUICustomScreen() {
  const { initPaymentSheet, presentPaymentSheet, confirmPaymentSheetPayment ,  } =
    useStripe();
    console.log(useStripe())
  const [paymentSheetEnabled, setPaymentSheetEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<{ image: string; label: string; } | null>(null);
  const [showAlert , setShowAlert] = useState<boolean>(false)
  const [alert , setAlert] = useState<Alert>({
    message:"Sucsses" ,
     onCancel:()=>null,
    onConfairm:()=>{},
    showCancelButton:false,
    suTitle:undefined,
    type:"success",
  })

  const fetchPaymentSheetParams = async () => {

    const { paymentIntent, ephemeralKey, customer } = {
      paymentIntent: "pi_3MBhhIJPH93PAwz917XcLP8Q_secret_dfkziuThrYquUHpDozr77asHW",
      ephemeralKey: "ek_test_YWNjdF8xTTUydVpKUEg5M1BBd3o5LDNmTGhCN05DcDR0VFFGZUpqVmZBQmdORUxQV1Y4Z1k_00JuWWiVw3",
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
    setLoading(true);

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
        
        setAlert({ ...alert, message:error.message ,  suTitle:`Error code: ${error.code}` , type:"error"})
        setShowAlert(true)
        // Alert.alert(`Error code: ${error.code}`, error.message);
      }
      if (paymentOption) {
        setPaymentMethod(paymentOption);
      }
    } catch (error) {
      console.log('error===>', error);
    } finally {
      setLoading(false);
    }
  };

  const choosePaymentOption = async () => {
    try {
      const { error, paymentOption } = await presentPaymentSheet();

      if (error) {
        setAlert({ ...alert, message:error.message ,  suTitle:`Error code: ${error.code}` , type:"error"})
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
    setLoading(true);
    const { error } = await confirmPaymentSheetPayment();

    if (error) {
      setAlert({ ...alert, message:error.message ,  suTitle:`Error code: ${error.code}` , type:"error"})
      setShowAlert(true)
      // Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      setAlert({ ...alert, message:'The payment was confirmed successfully!' , type:"success"})
      setShowAlert(true)
      // Alert.alert('Success', 'The payment was confirmed successfully!');
      setPaymentSheetEnabled(false);
    }
    setLoading(false);
  };

  return (
    // In your app’s checkout, make a network request to the backend and initialize PaymentSheet.
    // To reduce loading time, make this request before the Checkout button is tapped, e.g. when the screen is loaded.
      <PaymentScreen onInit={initialisePaymentSheet}>
        <>
          <View>
            <Button
              variant="primary"
              loading={loading}
              title={
                paymentMethod ? (
                  <View style={styles.row}>
                    <Image
                      source={{
                        uri: `data:image/png;base64,${paymentMethod.image}`,
                      }}
                      style={styles.image}
                    />
                    <Text style={styles.text}>{paymentMethod.label}</Text>
                  </View>
                ) : (
                  'Choose payment method'
                )
              }
              disabled={!paymentSheetEnabled}
              onPress={choosePaymentOption}
            />
          </View>

          <View style={styles.section}>
            <Button
              variant="primary"
              loading={loading}
              disabled={!paymentMethod || !paymentSheetEnabled}
              title="Buy"
              onPress={onPressBuy}
            />
          </View></>
      </PaymentScreen>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    marginTop: 40,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  paymentMethodTitle: {
    color: Colors.slate,
    fontWeight: 'bold',
  },
  image: {
    width: 26,
    height: 20,
  },
  text: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
});