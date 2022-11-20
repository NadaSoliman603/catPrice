import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { StripeProvider } from '@stripe/stripe-react-native';
import { CardField, useStripe, CardFieldInput, useConfirmPayment, BillingDetails, } from '@stripe/stripe-react-native';
import Colors from '../../../styles/colors';
import { moderateScale } from '../../../styles/ResponsiveDimentions';
import OutLineButton from '../../../common/OutLineButton';
import fontSizes from '../../../styles/fontSizes';

export function CheckoutScreen() {
  // const { confirmPayment } = useStripe();
  const { confirmPayment, loading } = useConfirmPayment();
  const [saveCard, setSaveCard] = useState(false);


  const checkout = async () => {
    // 1. fetch Intent Client Secret from backend
    // const clientSecret = await fetchPaymentIntentClientSecret();
    // console.log({clientSecret})
    // 2. Gather customer billing information (ex. email)

    const billingDetails: BillingDetails = {
      email: 'nada.educate@gmail.com',
      phone: '+201128859098',
      address: {
        city: 'Egypt',
        country: 'EGP',
        line1: '',
        line2: 'Texas',
        postalCode: '77063',
      },
    }; // mocked data for tests

    // 3. Confirm  fff payment with card details
    // The rest will be done automatically using webhooks


   const clientSecret ="sk_test_51JPmWxJWQWOfli62fKperf8YkAPaZpAUDWQzSHG47c1fouFrjVrzpvS5TQaCBiNPOodhQCvjB3hitxrpUmxy9ZnI00m916LYmN"
    const { error, paymentIntent } = await confirmPayment(
      clientSecret,
      {
        paymentMethodType: 'Card',
        paymentMethodData: {
          billingDetails,
        },
      },
      {
        setupFutureUsage: undefined,
      }
    );

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
      console.log('Payment confirmation error', error.message);
      console.log(error)
    } else if (paymentIntent) {
      Alert.alert(
        'Success',
        `The payment was confirmed successfully! currency: ${paymentIntent.currency}`
      );
      console.log('Success from promise', paymentIntent);
    }
  }
  return (
    <View style={styles.screen}>
      <CardField
        postalCodeEnabled={false}
        autofocus
        placeholders={{
          number: 'xxxx xxxx xxxx xxxx',
        }}
        cardStyle={{
          // backgroundColor: '#FFFFFF',
          // textColor: '#000000',
          borderWidth: 1,
          // backgroundColor: '#FFFFFF',
          borderColor: Colors.lightGray,
          borderRadius: 8,
          // fontSize: 14,
          // fontFamily: 'Macondo-Regular',
          // placeholderColor: '#A020F0',
          // textColor: '#0000ff',
          

        }}
        style={{
          // width: '100%',
          // height: 250,
          // marginVertical: 30,
          // width: '100%',
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={(cardDetails) => {
          // console.log('cardDetails', cardDetails);
        }}
        onFocus={(focusedField) => {
          // console.log('focusField', focusedField);
        }}
      />

      <OutLineButton textStyle={styles.button} style={{ marginBottom: moderateScale(20) }} title='Pay' outline={true} icon={<></>} onPress={checkout} />

    </View>
  );
}


const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.white,
    flex: 1,
    padding:20
  },
  button: {
    fontSize: fontSizes.font16,
    fontWeight: '500',
    letterSpacing: moderateScale(0.4)
  }
});

export default CheckoutScreen;