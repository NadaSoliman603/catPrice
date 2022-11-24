
import  React , {useEffect} from 'react';
import { StyleSheet, View, Text, Pressable , Alert} from 'react-native';
import fontSizes from '../../styles/fontSizes';
import gStyles from '../../styles/globalStyle';
import Entypo from 'react-native-vector-icons/Entypo';
import MainView from '../../common/MainView';
import Colors from '../../styles/colors';
import { moderateScale } from '../../styles/ResponsiveDimentions';
import ProfileItem from './components/ProfileItem';
import { Avatar } from 'react-native-paper';
import imgs from '../../assets/images';
import {  useNavigation } from '@react-navigation/native';
import { NavigationType } from '../../types/navigationTypes';
import { useDispatch, useSelector } from 'react-redux';
import BackBotton from '../../components/BackBotton';
import { Drower } from '../../Redux/reducers/DrowerNavigation';
import { RootState } from '../../Redux/store/store';
import { ShowModal } from '../../Redux/reducers/AuthModalReducer';
import useNotLogin from '../../common/useNotLogin';
type Props = {}

const Profile = (props: Props) => {
    const navigation = useNavigation<NavigationType>()
    const imgUri = "https://img.freepik.com/free-photo/-hands-st_176420-18743.jpg?w=2000"
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.Auth.token)
    const userData = useSelector((state: RootState) => state.Auth.user)


    useEffect(()=>{
        // dispatch(Drower({title:"Profile" , headerShown:true}))  
    },)

    const notLogin = ()=>{
        Alert.alert("" , "Please login" ,  [
            {
                text: "Cancel",
                onPress: () => {},
                style: "cancel"
              },
            { text: "OK", onPress: () => {
                //
                dispatch(ShowModal(true))
                //navigation.goBack()
            } }
          ])
    }
   

    return (
        <View style={styles.screen}>
            <View>
                <Pressable onPress={() => {
                   user?  navigation.navigate('CurrentPlan') :notLogin()
                    }} style={planStyle}  >
                    <Text style={[gStyles.h4]}>Current Plan</Text>
                    <Avatar.Image size={moderateScale(10)} style={{ backgroundColor: Colors.white }} source={imgs.golodOffer} />
                </Pressable>

                <ProfileItem value={userData?.countryEn || ""} title='Country/region' onChange={() => { user? navigation.navigate('CountryScreen') :  notLogin()}} />
                <ProfileItem value={userData?.defCurrency || ""} title='Currency' onChange={() => {user ? navigation.navigate('CurrencyScreen') :notLogin()}} />
                <ProfileItem value='English' title='Language' onChange={() => {user?navigation.navigate('LanguageScreen') :notLogin()}} />


                

                <Pressable onPress={() => {user? navigation.navigate('Changepassword') : notLogin() }} style={planStyle}  >
                    <View style={[gStyles.row]}>
                        {/* <Avatar.Image size={moderateScale(10)} source={{ uri: imgUri }} /> */}
                        <Text> Change Password</Text>
                    </View>
                    <Entypo style={[gStyles.text_Bold]} color={Colors.primary} name="chevron-small-right" size={moderateScale(10)} />
                </Pressable>

                <Pressable onPress={() => {user? navigation.navigate('UserSettingScreen') : notLogin() }} style={planStyle}  >
                    <View style={[gStyles.row]}>
                        <Avatar.Image   style={{ backgroundColor:Colors.lightGray }} size={moderateScale(10)} source={{ uri: "https://img" }} />
                        <Text> User</Text>
                    </View>
                    <Entypo style={[gStyles.text_Bold]} color={Colors.primary} name="chevron-small-right" size={moderateScale(10)} />
                </Pressable>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.white,
        padding: moderateScale(6)
    }
});

const planStyle = ({ pressed }: { pressed: boolean }) => ([
    {
        backgroundColor: pressed ? Colors.primaryPresedButton : "#fff",
        marginVertical: moderateScale(3)
    },
    gStyles.row,
    gStyles.spaceBetwen,
    gStyles.p_4,
    gStyles.border
])

export default Profile;
