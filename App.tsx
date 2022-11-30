// In App.js in a new project

import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainNavigation from './src/navigations';
import Colors from './src/styles/colors';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import { store } from './src/Redux/store/store';
import { Provider } from 'react-redux'
import ButtomMeueModal from './src/components/AuthModal';
import Login from './src/modular/Auth/screens/Login';
import Register from './src/modular/Auth/screens/Register';
import ForgetPassword from './src/modular/Auth/screens/ForgetPassword';
import OTPVeritfication from './src/modular/Auth/screens/OTPVeritfication';
import { moderateScale } from './src/styles/ResponsiveDimentions';
import AuthStack from './src/modular/Auth';
import { StripeProvider } from '@stripe/stripe-react-native';
import OfferCart from './src/modular/Cridits/Component/OfferCart';
import { useNetInfo } from "@react-native-community/netinfo";
import InternetConection from './src/common/InternetConection';

const Stack = createNativeStackNavigator();

function App() {
  const [publishableKey, setpublishableKey] = useState('')
  const netInfo = useNetInfo();

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: Colors.primary,
      secondary: Colors.primary,
      error: "red"
    },
    dark: false
  };

console.log({netInfo})

  return (<>
    <StripeProvider
      publishableKey={"pk_test_51M52uZJPH93PAwz93BclTtIrXbuNwDhIdCrnTjd4NqDGM7qfi7IJbKjqGQxfwsLJABHtKZ5CtRhuzdjt6PwNY3fZ00epgcjm8n"}
      merchantIdentifier='merchant.com.catPrice'
    >
      <Provider store={store}>
        <PaperProvider settings={{ icon: (props) => <Feather {...props} /> }} theme={theme}>
          <StatusBar animated={false} backgroundColor={Colors.white} barStyle="dark-content" />
          <MainNavigation />
          <AuthStack />
          <InternetConection netInfo={netInfo} />

        </PaperProvider>
      </Provider>
    </StripeProvider>
  </>);
}

export default App;