
import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationType, RootStack } from '../types/navigationTypes';
import DrowerContent from './DrowerContent';
import { Pressable } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Colors from './../styles/colors';
import fontSizes from '../styles/fontSizes';
import Home from '../modular/Home';
import History from '../modular/History';
import Favourites from '../modular/Favourites';
import Contact from '../modular/Contact';
import About from '../modular/About';
import Privacy from '../modular/Privacy';
import TermsAndConditions from '../modular/TermsAndConditions';
import OrderList from '../modular/Cart/screens/OrderList';
import Login from '../modular/Auth/screens/Login';
import Register from '../modular/Auth/screens/Register';
import ForgetPassword from '../modular/Auth/screens/ForgetPassword';
import OTPVeritfication from '../modular/Auth/screens/OTPVeritfication';
import DrowerNav from './DrowerNav';
const RootStackType = createNativeStackNavigator<RootStack>();

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
            <Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />
            <Stack.Screen options={{ headerShown: false }} name="ForgetPassword" component={ForgetPassword} />
            <Stack.Screen options={{ headerShown: false }} name="OTPVeritfication" component={OTPVeritfication} />
            <Stack.Screen options={{ title: "Home", headerTitleAlign: "center" }} name="Home" component={Home} />
        </Stack.Navigator>
    )
}

function MainNavigation() {

    return (
        <NavigationContainer  >
            <Stack.Navigator>
                {/* <Stack.Screen
                    name="AuthNav"
                    component={AuthStack}
                    options={{ headerShown: false }}
                /> */}

                <Stack.Screen
                    name="DrowerNav"
                    component={DrowerNav}
                    options={{ headerShown: false }}
                />

                
            </Stack.Navigator>
        </NavigationContainer>
    );
}


export default MainNavigation;