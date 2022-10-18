
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
const RootStackType = createNativeStackNavigator<RootStack>();
const Drawer = createDrawerNavigator();

const DrowerNav = () => {
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
                initialRouteName="Login">
                <Drawer.Screen options={{ headerShown: false }} name="Login" component={Login} />
                <Drawer.Screen options={{ headerShown: false }} name="Register" component={Register} />
                <Drawer.Screen options={{ headerShown: false }} name="ForgetPassword" component={ForgetPassword} />
                <Drawer.Screen options={{ headerShown: false }} name="OTPVeritfication" component={OTPVeritfication} />


                <Drawer.Screen options={{ title: "Home", headerTitleAlign: "center" }} name="Home" component={Home} />
                <Drawer.Screen options={{ title: "History", headerTitleAlign: "center" }} name="History" component={History} />
                <Drawer.Screen options={{ title: "Favourites", headerTitleAlign: "center" }} name="Favourites" component={Favourites} />
                <Drawer.Screen options={{ title: "Contact Us", headerTitleAlign: "center" }} name="Contact" component={Contact} />
                <Drawer.Screen options={{ title: "About", headerTitleAlign: "center" }} name="About" component={About} />
                <Drawer.Screen options={{ title: "Terms And Conditions", headerTitleAlign: "center" }} name="TermsAndConditions" component={TermsAndConditions} />
                <Drawer.Screen options={{ title: "Privacy", headerTitleAlign: "center" }} name="Privacy" component={Privacy} />
                <Drawer.Screen options={{ title: "Order List", headerTitleAlign: "center" }} name="OrderList" component={OrderList} />
            </Drawer.Navigator> 
    );
}



export default DrowerNav;