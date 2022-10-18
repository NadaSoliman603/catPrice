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
      </PaperProvider>
    </Provider>
  </>);
}

export default App;