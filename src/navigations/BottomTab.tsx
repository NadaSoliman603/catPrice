
import * as React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { DrawerActionHelpers, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../modular/Home';
import Explore from '../modular/Explore';
import Brand from '../modular/Brand';
import Profile from '../modular/Profile';
import Colors from '../styles/colors';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { wp } from '../styles/globalStyle';
import { moderateScale } from '../styles/ResponsiveDimentions';
import DrowerNav from './DrowerNav';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import History from '../modular/History';
import Favourites from '../modular/Favourites';
import Contact from '../modular/Contact';
import About from '../modular/About';
import TermsAndConditions from '../modular/TermsAndConditions';
import Privacy from '../modular/Privacy';
import OrderList from '../modular/Cart/screens/OrderList';
import fontSizes from '../styles/fontSizes';
import Search from '../modular/Search';
import BrandsCats from '../modular/Brand/BrandsCats';
import Login from '../modular/Auth/screens/Login';
import Register from '../modular/Auth/screens/Register';
import ForgetPassword from '../modular/Auth/screens/ForgetPassword';
import OTPVeritfication from '../modular/Auth/screens/OTPVeritfication';
import ProductDetails from '../modular/Products/Screens/ProductDetails';
import OrderCompleted from '../modular/Cart/screens/OrderCompleted';
import BayerList from '../modular/Cart/screens/BayerList';
import CountryScreen from '../modular/Profile/Screens/CountryScreen';
import CurrencyScreen from '../modular/Profile/Screens/CurrencyScreen';
import LanguageScreen from '../modular/Profile/Screens/LanguageScreen';
import UserSettingScreen from '../modular/Profile/Screens/UserSettingScreen';
import FastImage from 'react-native-fast-image';
import imgs from '../assets/images';
import { Image } from 'react-native-animatable';
import { NavigationType } from '../types/navigationTypes';
import BackBotton from '../components/BackBotton';
import CartIcon from '../components/CartIcon';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import CreditsScreen from '../modular/Cridits';
import HeaderMenue from '../components/HeaderMenue';
import SearchResults from '../modular/Search/SearchResult';
import FavouriteCollectionDetails from '../modular/Favourites/FavouriteCollectionDetails';
import CheckoutScreen from '../modular/Cridits/screens/Checkout';
import CurrentPlan from '../modular/Profile/Screens/CurrentPlan';
import Changepassword from '../modular/Products/Screens/Changepassword';


const Tab = createBottomTabNavigator();


const headerSetting = {
    animationDuration: 0, headerTitleAlign: "center",
}

///api/v1/brands/get-all-brands
const stackOption: NativeStackNavigationOptions = {
    headerStyle: {
        backgroundColor: '#fff',

    },
    headerTitleAlign: "center",
    headerShown: true,
    headerLeft: () => <HeaderMenue />,
    headerTintColor: Colors.textBlack,
}


function BottomTab() {
    const navigation = useNavigation<NavigationType>()

    return (
        <Tab.Navigator
            initialRouteName={'Home'}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let icon

                    if (route.name === 'Home') {
                        icon = <Feather color={focused ? Colors.primary : Colors.darkGray} name='home' size={fontSizes.font20} />
                    } else if (route.name === 'Explore') {
                        icon = <Feather color={focused ? Colors.primary : Colors.darkGray} name='search' size={fontSizes.font20} />
                    }
                    else if (route.name === 'Brand') {
                        icon = <MaterialIcons color={focused ? Colors.primary : Colors.darkGray} name='directions-car' size={fontSizes.font20} />
                    }
                    else if (route.name === 'Credits') {
                        icon = <AntDesign color={focused ? Colors.primary : Colors.darkGray} name='creditcard' size={fontSizes.font20} />
                    }
                    else if (route.name === 'Profile') { icon = <AntDesign color={focused ? Colors.primary : Colors.darkGray} name='user' size={fontSizes.font20} /> }
                    return icon;
                },

                headerShown: false,
                headerTransparent: true,
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    position: 'absolute',
                    height: wp(13),
                    paddingTop: moderateScale(4),
                },
                tabBarLabelStyle: { fontWeight: '600', paddingBottom: moderateScale(2), },
                animationDuration: 0,
                headerTitleAlign: "center",
                // title: "",
                unmountOnBlur: true,
                tabBarHideOnKeyboard: true

            })}
        >
            <Tab.Screen name="Home" component={AppStack} />
            <Tab.Screen name="Explore" component={SearchStack} />
            <Tab.Screen name="Brand" component={BrandStack} />
            <Tab.Screen name="Credits" component={Credits} />
            <Tab.Screen name="Profile" component={BrofileStack} />
        </Tab.Navigator>
    );
}

const Stack = createNativeStackNavigator();
const AppStack = () => {
    const navigation = useNavigation<NavigationType>()

    return (
        <Stack.Navigator screenOptions={{ ...stackOption }} initialRouteName='HomeScreen'>
            <Stack.Screen options={{ title: "Search", headerShown: true, headerRight: () => <CartIcon navigationScreen='default' /> }} name="Search" component={Search} />
            <Stack.Screen options={{ title: "Search Results", headerShown: true, headerRight: () => <CartIcon navigationScreen='default' /> }} name="SearchResults" component={SearchResults} />
            <Stack.Screen options={{ title: "Home", headerRight: () => <CartIcon navigationScreen='default' /> }} name="HomeScreen" component={Home} />

            <Stack.Screen options={{ title: "Product Details", headerRight: () => <CartIcon navigationScreen='default' />, headerLeft: () => <BackBotton /> }} name="ProductDetails" component={ProductDetails} />
            <Stack.Screen options={{ headerShown: true, headerLeft: () => <BackBotton />, title: "Contact Us" }} name="Contact" component={Contact} />
            <Stack.Screen options={{ headerShown: true, headerLeft: () => <BackBotton />, title: "About Us" }} name="About" component={About} />
            <Stack.Screen options={{ headerShown: true, headerLeft: () => <BackBotton />, title: "Terms and Conditions" }} name="TermsAndConditions" component={TermsAndConditions} />
            <Stack.Screen options={{ headerShown: true, headerLeft: () => <BackBotton />, title: "Privacy Policy" }} name="Privacy" component={Privacy} />
            <Stack.Screen options={{ headerRight: () => <CartIcon navigationScreen='default' /> }} name="History" component={History} />
            <Stack.Screen options={{ headerShown: false, }} name="OrderStack" component={OrderStack} />
            <Stack.Screen options={{ headerShown: true }} name="BayerList" component={BayerList} />
            <Stack.Screen options={{ headerLeft: () => <BackBotton /> }} name="Favourites" component={Favourites} />
            <Stack.Screen options={{ headerRight: () => <CartIcon navigationScreen='default' />, title: "Cridits" }} name="CreditsSearchStack" component={CreditsScreen} />
            <Stack.Screen options={{ title: "Credits", headerShown: true, headerRight: () => <CartIcon navigationScreen='default' /> }} name="CreditsScreen" component={CreditsScreen} />

            <Stack.Screen options={{ title: "Favourites", headerShown: true, headerLeft: () => <BackBotton /> }} name="FavouriteCollectionDetails" component={FavouriteCollectionDetails} />

        </Stack.Navigator>
    )
}

const BrandStack = () => {
    return (<Stack.Navigator screenOptions={stackOption} initialRouteName='BrandScreen' >
        <Stack.Screen options={{ title: "Brands", }} name="BrandScreen" component={Brand} />
        <Stack.Screen options={{ headerLeft: () => <BackBotton /> }} name="BrandsCats" component={BrandsCats} />
        <Stack.Screen options={{ headerShown: true, headerLeft: () => <BackBotton />, title: "Contact Us" }} name="Contact" component={Contact} />
        <Stack.Screen options={{ headerShown: true, headerLeft: () => <BackBotton />, title: "About Us" }} name="About" component={About} />
        <Stack.Screen options={{ headerShown: true, headerLeft: () => <BackBotton />, title: "Terms and Conditions" }} name="TermsAndConditions" component={TermsAndConditions} />
        <Stack.Screen options={{ headerShown: true, headerLeft: () => <BackBotton />, title: "Privacy Policy" }} name="Privacy" component={Privacy} />
        <Stack.Screen options={{ headerRight: () => <CartIcon navigationScreen='default' /> }} name="History" component={History} />
        <Stack.Screen options={{ headerShown: false }} name="OrderStack" component={OrderStack} />
        <Stack.Screen options={{ headerShown: true }} name="BayerList" component={BayerList} />
        <Stack.Screen options={{ headerLeft: () => <BackBotton /> }} name="Favourites" component={Favourites} />
        <Stack.Screen options={{ title: "Product Details", headerRight: () => <CartIcon navigationScreen='default' />, headerLeft: () => <BackBotton /> }} name="ProductDetails" component={ProductDetails} />
        <Stack.Screen options={{ title: "Credits", headerShown: true, headerRight: () => <CartIcon navigationScreen='default' /> }} name="CreditsScreen" component={CreditsScreen} />
        <Stack.Screen options={{ title: "Favourites", headerShown: true, headerLeft: () => <BackBotton /> }} name="FavouriteCollectionDetails" component={FavouriteCollectionDetails} />


        <Stack.Screen options={{ title: "Search", headerShown: true, headerRight: () => <CartIcon navigationScreen='default' /> }} name="Search" component={Search} />
        <Stack.Screen options={{ title: "Search Results", headerShown: true, headerRight: () => <CartIcon navigationScreen='default' /> }} name="SearchResults" component={SearchResults} />
        <Stack.Screen options={{ title: "Home", headerRight: () => <CartIcon navigationScreen='default' /> }} name="HomeScreen" component={Home} />
    </Stack.Navigator>)
}

const BrofileStack = () => {
    return (<Stack.Navigator screenOptions={stackOption} initialRouteName='ProfileScreen'>
        <Stack.Screen options={{ title: "Profile" }} name="ProfileScreen" component={Profile} />
        <Stack.Screen options={{ headerLeft: () => <BackBotton /> }} name="CountryScreen" component={CountryScreen} />
        <Stack.Screen options={{ headerLeft: () => <BackBotton /> }} name="CurrencyScreen" component={CurrencyScreen} />
        <Stack.Screen options={{ headerLeft: () => <BackBotton /> }} name="LanguageScreen" component={LanguageScreen} />
        <Stack.Screen options={{ headerLeft: () => <BackBotton /> }} name="UserSettingScreen" component={UserSettingScreen} />
        <Stack.Screen options={{ headerLeft: () => <BackBotton /> }} name="CreditsPrfileScreen" component={CreditsScreen} />
        <Stack.Screen options={{ headerShown: true, headerLeft: () => <BackBotton />, title: "Contact Us" }} name="Contact" component={Contact} />
        <Stack.Screen options={{ headerShown: true, headerLeft: () => <BackBotton />, title: "About Us" }} name="About" component={About} />
        <Stack.Screen options={{ headerShown: true, headerLeft: () => <BackBotton />, title: "Terms and Conditions" }} name="TermsAndConditions" component={TermsAndConditions} />
        <Stack.Screen options={{ headerShown: true, headerLeft: () => <BackBotton />, title: "Privacy Policy" }} name="Privacy" component={Privacy} />
        <Stack.Screen options={{ headerRight: () => <CartIcon navigationScreen='default' /> }} name="History" component={History} />
        <Stack.Screen options={{ headerShown: false }} name="OrderStack" component={OrderStack} />
        <Stack.Screen options={{ headerShown: true }} name="BayerList" component={BayerList} />
        <Stack.Screen options={{ headerLeft: () => <BackBotton /> }} name="Favourites" component={Favourites} />
        <Stack.Screen options={{ title: "Favourites", headerShown: true, headerLeft: () => <BackBotton /> }} name="FavouriteCollectionDetails" component={FavouriteCollectionDetails} />
        <Stack.Screen options={{ title: "Current Plan", headerShown: true, headerLeft: () => <BackBotton /> }} name="CurrentPlan" component={CurrentPlan} />
        <Stack.Screen options={{ title: "Change password", headerShown: true, headerLeft: () => <BackBotton /> }} name="Changepassword" component={Changepassword} />
        <Stack.Screen options={{ title: "Product Details", headerRight: () => <CartIcon navigationScreen='default' />, headerLeft: () => <BackBotton /> }} name="ProductDetails" component={ProductDetails} />


        <Stack.Screen options={{ title: "Search", headerShown: true, headerRight: () => <CartIcon navigationScreen='default' /> }} name="Search" component={Search} />
        <Stack.Screen options={{ title: "Search Results", headerShown: true, headerRight: () => <CartIcon navigationScreen='default' /> }} name="SearchResults" component={SearchResults} />
        <Stack.Screen options={{ title: "Home", headerRight: () => <CartIcon navigationScreen='default' /> }} name="HomeScreen" component={Home} />
    </Stack.Navigator>)
}

const SearchStack = () => {
    return (<Stack.Navigator screenOptions={stackOption} initialRouteName='Search'>
        <Stack.Screen options={{ title: "Explor", headerShown: true, headerRight: () => <CartIcon navigationScreen='default' /> }} name="Search" component={Search} />
        <Stack.Screen options={{ title: "Product Details", headerRight: () => <CartIcon navigationScreen='default' />, headerLeft: () => <BackBotton /> }} name="ProductDetails" component={ProductDetails} />
        <Stack.Screen options={{ headerShown: true, headerLeft: () => <BackBotton />, title: "Contact Us" }} name="Contact" component={Contact} />
        <Stack.Screen options={{ headerShown: true, headerLeft: () => <BackBotton />, title: "About Us" }} name="About" component={About} />
        <Stack.Screen options={{ headerShown: true, headerLeft: () => <BackBotton />, title: "Terms and Conditions" }} name="TermsAndConditions" component={TermsAndConditions} />
        <Stack.Screen options={{ headerShown: true, headerLeft: () => <BackBotton />, title: "Privacy Policy" }} name="Privacy" component={Privacy} />
        <Stack.Screen options={{ headerRight: () => <CartIcon navigationScreen='default' /> }} name="History" component={History} />
        <Stack.Screen options={{ title: "Home", headerRight: () => <CartIcon navigationScreen='default' /> }} name="HomeScreen" component={Home} />
        <Stack.Screen options={{ headerShown: false }} name="OrderStack" component={OrderStack} />

        <Stack.Screen options={{ headerShown: true }} name="BayerList" component={BayerList} />
        <Stack.Screen options={{ headerLeft: () => <BackBotton /> }} name="Favourites" component={Favourites} />
        <Stack.Screen options={{ headerRight: () => <CartIcon navigationScreen='default' />, title: "Cridits" }} name="CreditsSearchStack" component={CreditsScreen} />
        <Stack.Screen options={{ title: "Credits", headerShown: true, headerRight: () => <CartIcon navigationScreen='default' /> }} name="CreditsScreen" component={CreditsScreen} />
        <Stack.Screen options={{ title: "Favourites", headerShown: true, headerLeft: () => <BackBotton /> }} name="FavouriteCollectionDetails" component={FavouriteCollectionDetails} />

        {/* <Stack.Screen options={{ headerShown: true }} name="TermsAndConditions" component={TermsAndConditions} />
        <Stack.Screen options={{ headerShown: true }} name="Login" component={Login} />
        <Stack.Screen options={{ headerShown: true }} name="Register" component={Register} />
        <Stack.Screen options={{ headerShown: true }} name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen options={{ headerShown: true }} name="OTPVeritfication" component={OTPVeritfication} /> */}

        <Stack.Screen options={{ title: "Search Results", headerShown: true, headerRight: () => <CartIcon navigationScreen='default' /> }} name="SearchResults" component={SearchResults} />
    </Stack.Navigator>)
}

const OrderStack = () => {
    return (<Stack.Navigator screenOptions={{ ...stackOption, freezeOnBlur: false, }} initialRouteName='OrderList'>
        <Stack.Screen options={{ freezeOnBlur: false, headerShown: true, animationDuration: 0, headerTitleAlign: "center", title: "Order List", }} name="OrderList" component={OrderList} />
        <Stack.Screen options={{ headerShown: true, title: "Order Completed", headerRight: () => <CartIcon navigationScreen='OrderList' />, headerLeft: () => <BackBotton /> }} name="OrderCompleted" component={OrderCompleted} />
        <Stack.Screen options={{ headerShown: true, title: "Bayers List", headerRight: () => <CartIcon navigationScreen='OrderList' />, headerLeft: () => <BackBotton /> }} name="BayerList" component={BayerList} />
    </Stack.Navigator>)
}


const Credits = () => {
    return (<Stack.Navigator screenOptions={stackOption} initialRouteName='Credits'>
        <Stack.Screen options={{ title: "Credits", headerShown: true, headerRight: () => <CartIcon navigationScreen='default' /> }} name="CreditsScreen" component={CreditsScreen} />

        <Stack.Screen options={{ headerShown: true, headerLeft: () => <BackBotton />, title: "Contact Us" }} name="Contact" component={Contact} />
        <Stack.Screen options={{ headerShown: true, headerLeft: () => <BackBotton />, title: "About Us" }} name="About" component={About} />
        <Stack.Screen options={{ headerShown: true, headerLeft: () => <BackBotton />, title: "Terms and Conditions" }} name="TermsAndConditions" component={TermsAndConditions} />
        <Stack.Screen options={{ headerShown: true, headerLeft: () => <BackBotton />, title: "Privacy Policy" }} name="Privacy" component={Privacy} />
        <Stack.Screen options={{ headerRight: () => <CartIcon navigationScreen='default' /> }} name="History" component={History} />
        <Stack.Screen options={{ title: "Home", headerRight: () => <CartIcon navigationScreen='default' /> }} name="HomeScreen" component={Home} />
        <Stack.Screen options={{ headerShown: false }} name="OrderStack" component={OrderStack} />
        <Stack.Screen options={{ headerShown: true }} name="BayerList" component={BayerList} />
        <Stack.Screen options={{ headerLeft: () => <BackBotton /> }} name="Favourites" component={Favourites} />
        <Stack.Screen options={{ freezeOnBlur: false, headerShown: true, animationDuration: 0, headerTitleAlign: "center", title: "Order List", }} name="OrderList" component={OrderList} />
        <Stack.Screen options={{ title: "Favourites", headerShown: true, headerLeft: () => <BackBotton /> }} name="FavouriteCollectionDetails" component={FavouriteCollectionDetails} />
        <Stack.Screen options={{ headerRight: () => <CartIcon navigationScreen='default' />, headerLeft: () => <BackBotton />, title: "Billing" }} name="CheckoutScreen" component={CheckoutScreen} />
        <Stack.Screen options={{ title: "Product Details", headerRight: () => <CartIcon navigationScreen='default' />, headerLeft: () => <BackBotton /> }} name="ProductDetails" component={ProductDetails} />

        <Stack.Screen options={{ title: "Search", headerShown: true, headerRight: () => <CartIcon navigationScreen='default' /> }} name="Search" component={Search} />
        <Stack.Screen options={{ title: "Search Results", headerShown: true, headerRight: () => <CartIcon navigationScreen='default' /> }} name="SearchResults" component={SearchResults} />
    </Stack.Navigator>)
}

const DrowerStack = () => {
    return (
        <Stack.Navigator >
            <Stack.Screen options={{ headerShown: false }} name="HomeScreen" component={Home} />
            <Stack.Screen options={{ headerShown: false }} name="History" component={History} />
            <Stack.Screen options={{ headerShown: false }} name="Favourites" component={Favourites} />
            <Stack.Screen options={{ headerShown: false }} name="Contact" component={Contact} />
            <Stack.Screen options={{ headerShown: false }} name="About" component={About} />
            <Stack.Screen options={{ headerShown: false }} name="TermsAndConditions" component={TermsAndConditions} />
            <Stack.Screen options={{ headerShown: false }} name="Privacy" component={Privacy} />
        </Stack.Navigator>
    )
}

const homeStack = () => {

}

export default BottomTab;