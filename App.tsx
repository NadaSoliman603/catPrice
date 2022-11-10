// In App.js in a new project

import * as React from 'react';
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
const Stack = createNativeStackNavigator();


function App() {
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
  

  return (<>
    <Provider store={store}>
      <PaperProvider settings={{ icon: (props) => <Feather {...props} /> }} theme={theme}>
        <StatusBar animated={true} backgroundColor={Colors.white} />
        <MainNavigation />
        <AuthStack />
      </PaperProvider>
    </Provider>
  </>);
}

export default App;