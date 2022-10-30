import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';

export type RootStack = {
    Home: undefined;
    History: undefined;
    Favourites: undefined;
    Contact: undefined;
    About: undefined;
    Privacy: undefined;
    OrderList: undefined;
    TermsAndConditions: undefined;
    Login: undefined;
    Register: undefined;
    ForgetPassword: undefined;
    OTPVeritfication: undefined;
    AuthNav: undefined,
    Search: undefined;
    BrandsCats: { catId: string };
    ProductDetails: { catID: string };
    OrderCompleted: undefined;
    BayerList: undefined;
    ProfileScreen: undefined;
    CountryScreen: undefined;
    CurrencyScreen: undefined;
    LanguageScreen: undefined;
    UserSettingScreen: undefined;
    CreditsScreen:undefined;
};



export type NavigationType = NativeStackNavigationProp<RootStack>

