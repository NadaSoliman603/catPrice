import { initStripe } from '@stripe/stripe-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text } from 'react-native';
import Colors from '../../../styles/colors';
// import { fetchPublishableKey } from '../helpers';

interface Props {
  paymentMethod?: string;
  onInit?(): void;
  children:JSX.Element
}

const PaymentScreen: React.FC<Props> = ({
  paymentMethod,
  children,
  onInit,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initialize() {
      const publishableKey = true // await fetchPublishableKey(paymentMethod);
      if (publishableKey) {
        await initStripe({
          publishableKey :"pk_test_51M52uZJPH93PAwz93BclTtIrXbuNwDhIdCrnTjd4NqDGM7qfi7IJbKjqGQxfwsLJABHtKZ5CtRhuzdjt6PwNY3fZ00epgcjm8n",
          merchantIdentifier: 'merchant.com.catPrice',
          urlScheme: 'stripe-example',
          setReturnUrlSchemeOnAndroid: true,
        });
        setLoading(false);
        onInit?.();
      }
    }
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <ActivityIndicator size="large" style={StyleSheet.absoluteFill} />
  ) : (
    <ScrollView
      accessibilityLabel="payment-screen"
      style={styles.container}
      keyboardShouldPersistTaps="always"
    >
      {children}
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <Text style={{ opacity: 0 }}>appium fix</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    // paddingTop: 20,
    // paddingHorizontal: 16,
  },
});

export default PaymentScreen;