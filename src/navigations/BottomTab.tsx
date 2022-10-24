
import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../modular/Home';
import Explore from '../modular/Explore';
import Brand from '../modular/Brand';
import Credits from '../modular/Cridits.tsx';
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
const Tab = createBottomTabNavigator();


///api/v1/brands/get-all-brands

function BottomTab() {
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
            })}
        >
            <Tab.Screen name="Home" component={AppStack} />
            <Tab.Screen name="Explore" component={Explore} />
            <Tab.Screen name="Brand" component={BrandStack} />
            <Tab.Screen name="Credits" component={Credits} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}

const Stack = createNativeStackNavigator();
const AppStack = () => {
    return (
        <Stack.Navigator >
            <Stack.Screen options={{ headerShown: false }} name="HomeScreen" component={Home} />
            <Stack.Screen options={{ headerShown: false }} name="History" component={History} />
            <Stack.Screen options={{ headerShown: false }} name="Favourites" component={Favourites} />
            <Stack.Screen options={{ headerShown: false }} name="Contact" component={Contact} />
            <Stack.Screen options={{ headerShown: false }} name="About" component={About} />
            <Stack.Screen options={{ headerShown: false }} name="TermsAndConditions" component={TermsAndConditions} />
            <Stack.Screen options={{ headerShown: false }} name="Privacy" component={Privacy} />
            <Stack.Screen options={{ headerShown: false }} name="OrderList" component={OrderList} />
            <Stack.Screen options={{ headerShown: false }} name="Search" component={Search} />
        </Stack.Navigator>
    )
}

const BrandStack = () => {
    return (<Stack.Navigator >
        <Stack.Screen options={{ headerShown: false }} name="BrandScreen" component={Brand} />
        <Stack.Screen options={{ headerShown: false }} name="BrandsCats" component={BrandsCats} />
    </Stack.Navigator>)
}

export default BottomTab;