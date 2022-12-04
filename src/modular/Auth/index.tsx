import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import ButtomMeueModal from '../../components/AuthModal';
import { ShowModal } from '../../Redux/reducers/AuthModalReducer';
import { RootState } from '../../Redux/store/store';
import { moderateScale } from '../../styles/ResponsiveDimentions';
import CreateNewPassword from './screens/CreateNewPassword';
import ForgetPassword from './screens/ForgetPassword';
import Login from './screens/Login';
import OTPVeritfication from './screens/OTPVeritfication';
import Register from './screens/Register';

export type AuthCustomNav = "CreateNewPassword"|"Login" | "Register" | "ForgetPassword" | "OTPVeritfication" | "HideModal"
export type Phone =  {mobileCode: string, phone: string , screen:"Register"| "ForgetPassword"  }
export type  CreatePassdVeritfication = {otp:string , otpToken:string}
type Props = {}
const AuthStack = (props: Props) => {
    const modalVisible = useSelector((state:RootState)=> state.ShowModal.showen)
    const [authScreen, setAuthScreen] = React.useState<AuthCustomNav>("Login")
    const [modalHeight, setModalHeight] = React.useState<number>(95)
    const [phone , setPhone] = React.useState<Phone | null>(null)
    const [createPassdVeritfication , setCreatePassdVeritfication] = React.useState <null | CreatePassdVeritfication>(null)
    const [loading , setloading] = React.useState<boolean>(false)
    const togelloading = (value:boolean)=>{setloading(value)}
    const dispatch = useDispatch()
    const togleModal = (show: boolean,) => {
        // setModalVisible(show)
        setAuthScreen("Login")
        dispatch(ShowModal(show))
    }

    const handelAuthScreens = (screen: AuthCustomNav ) => {
        if (screen === "HideModal") {
            // setModalVisible(false)
            dispatch(ShowModal(false))
        } else {
            // if(screen === "OTPVeritfication" && phone == null) return
            setAuthScreen(screen)
            if (screen === "Login" || (screen === "Register")) {
                setModalHeight(95)
            } else { setModalHeight(100) }
        }
    }
    const handelPhonNumber = (phone:Phone)=>{
        setPhone(phone)
    }
    const handelForgetPassowd = (data:CreatePassdVeritfication)=>{
        setCreatePassdVeritfication(data)
    }
    return (
        // <ButtomMeueModal height={100} title="" togleModal={togleModal} modalVisible={modalVisible} setModalVisible={togleModal}>

        <ButtomMeueModal loading={loading} bgColor='default' height={modalHeight} title="" togleModal={togleModal} modalVisible={modalVisible} setModalVisible={togleModal}>
            <>
                {authScreen === "Login" && <Login  togelloading ={togelloading} handelPhonNumber={handelPhonNumber}  handelAuthScreens={handelAuthScreens} />}
                {authScreen === "Register" && <Register togelloading ={togelloading} handelPhonNumber={handelPhonNumber} handelAuthScreens={handelAuthScreens} />}
                {authScreen === "ForgetPassword" && <ForgetPassword handelPhonNumber={handelPhonNumber}  handelAuthScreens={handelAuthScreens} />}
                {authScreen === "OTPVeritfication" && <OTPVeritfication togelloading ={togelloading} handelForgetPassowd={(data:CreatePassdVeritfication)=>handelForgetPassowd(data)}  phone={phone} handelAuthScreens={handelAuthScreens} />}
                {authScreen === "CreateNewPassword" && <CreateNewPassword togelloading ={togelloading} createPassdVeritfication={createPassdVeritfication}  handelAuthScreens={handelAuthScreens}/>}

                {/* <View  style={{ height:moderateScale(25) }}></View> */}
            </>
        </ButtomMeueModal>
        // </ButtomMeueModal> 
    );
}

const styles = StyleSheet.create({

    screen: {}
});

export default AuthStack;