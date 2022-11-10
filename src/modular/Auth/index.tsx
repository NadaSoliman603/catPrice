import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import ButtomMeueModal from '../../components/AuthModal';
import { ShowModal } from '../../Redux/reducers/AuthModalReducer';
import { RootState } from '../../Redux/store/store';
import { moderateScale } from '../../styles/ResponsiveDimentions';
import ForgetPassword from './screens/ForgetPassword';
import Login from './screens/Login';
import OTPVeritfication from './screens/OTPVeritfication';
import Register from './screens/Register';

export type AuthCustomNav = "Login" | "Register" | "ForgetPassword" | "OTPVeritfication" | "HideModal"
export type Phone =  {mobileCode: string, phone: string}
type Props = {}
const AuthStack = (props: Props) => {
    const modalVisible = useSelector((state:RootState)=> state.ShowModal.showen)
    const [authScreen, setAuthScreen] = React.useState<AuthCustomNav>("Login")
    const [modalHeight, setModalHeight] = React.useState<number>(95)
    const [phone , setPhone] = React.useState<Phone | null>(null)
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
    return (
        // <ButtomMeueModal height={100} title="" togleModal={togleModal} modalVisible={modalVisible} setModalVisible={togleModal}>

        <ButtomMeueModal height={modalHeight} title="" togleModal={togleModal} modalVisible={modalVisible} setModalVisible={togleModal}>
            <>
                {authScreen === "Login" && <Login handelPhonNumber={handelPhonNumber}  handelAuthScreens={handelAuthScreens} />}
                {authScreen === "Register" && <Register handelPhonNumber={handelPhonNumber} handelAuthScreens={handelAuthScreens} />}
                {authScreen === "ForgetPassword" && <ForgetPassword handelAuthScreens={handelAuthScreens} />}
                {authScreen === "OTPVeritfication" && <OTPVeritfication phone={phone} handelAuthScreens={handelAuthScreens} />}
                <View  style={{ height:moderateScale(25) }}></View>
            </>
        </ButtomMeueModal>
        // </ButtomMeueModal> 
    );
}

const styles = StyleSheet.create({

    screen: {}
});

export default AuthStack;