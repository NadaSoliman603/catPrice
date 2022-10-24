
import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
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
import Explore from '../modular/Explore';
import Brand from '../modular/Brand';
import Credits from '../modular/Cridits.tsx';
import Profile from '../modular/Profile';
import BottomTab from './BottomTab';
import SplashScreen from '../modular/Auth/screens/SplachScreen';
const RootStackType = createNativeStackNavigator<RootStack>();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();








const DrowerNav = () => {
    const navigation = useNavigation()
    const route = useRoute()
    return (
        <Drawer.Navigator
            screenOptions={{
                headerRight: () => {
                    const navigation = useNavigation<NavigationType>()
                    return (
                        <Pressable style={{ paddingHorizontal: 20 }} onPress={() => navigation.navigate("OrderList")} >
                            <Feather color={Colors.primary} name='shopping-cart' size={fontSizes.font20} />
                        </Pressable>
                    )
                },

            }}
            drawerContent={(props) => <DrowerContent props={props} />}
        >
            <Drawer.Screen options={{ title: "Home", headerTitleAlign: "center" }} name="TabNave" component={BottomTab}  />
        </Drawer.Navigator>
    );
}


export default DrowerNav;