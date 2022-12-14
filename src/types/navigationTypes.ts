import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { Plan } from './types';

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
    OTPVeritfication: {phone:string , mobileCode:string};
    AuthNav: undefined,
    Search: undefined | {search:boolean};
    BrandsCats: { catId: string };
    ProductDetails: { catID: string };
    OrderCompleted: {orderNo:string};
    BuyersList: undefined;
    ProfileScreen: undefined;
    CountryScreen: undefined;
    CurrencyScreen: undefined;
    LanguageScreen: undefined;
    UserSettingScreen: undefined;
    CreditsScreen:undefined;
    SearchStack:undefined | {search:boolean};
    OrderStack:undefined;
    HomeScreen:undefined;
    CreditsPrfileScreen:undefined;
    AppStack:undefined;
    CreditsSearchStack:undefined;
    OnBoarding1:undefined;
    OnBoarding2:undefined;
    OnBoarding3:undefined;
    SearchResults:{search:string},      
    FavouriteCollectionDetails:{id:string},
    CheckoutScreen:{plan:Plan},
    CurrentPlan:undefined;
    Changepassword:undefined;
    UserManual:undefined
};



export type NavigationType = NativeStackNavigationProp<RootStack>

