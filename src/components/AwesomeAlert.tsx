import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import Colors from '../styles/colors';
import Feather from 'react-native-vector-icons/Feather';
import { moderateScale } from '../styles/ResponsiveDimentions';
import AntDesign  from 'react-native-vector-icons/AntDesign';
import { Alert } from '../types/types';
type Props = {
    alert: Alert;
    showAlert: boolean;
}

const CustomAwesomeAlert = ({ alert, showAlert }: Props) => {
    return (
        <AwesomeAlert
            //animatedValue={0.3}
            show={showAlert}
            showProgress={false}
            // title={()=><Text>E06666</Text>}
            message={""}
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showCancelButton={alert.showCancelButton}
            showConfirmButton={true}
            cancelText="cancel"
            confirmText="    ok    "
            confirmButtonColor={Colors.primary}
            cancelButtonColor="#E06666"
            onCancelPressed={alert.onCancel}
            onConfirmPressed={alert.onConfairm}
            useNativeDriver={true}
            customView={<View style={{ justifyContent:"center" , alignContent:"center" , alignItems:"center" }}>
                {alert.type === "success" &&<Feather style={{ paddingBottom:moderateScale(5) }} color={Colors.primary} name='check-circle' size={moderateScale(18)} />}
                {alert.type === "error" &&<AntDesign style={{ paddingBottom:moderateScale(5) }} color="#E06666"  name="closecircleo" size={moderateScale(18)} />}
                {alert.type === "delete" &&<AntDesign style={{ paddingBottom:moderateScale(5) }} color="#E06666"  name="delete" size={moderateScale(15)} />}
                {alert.type === "warning" &&<AntDesign style={{ paddingBottom:moderateScale(5) }} color={Colors.palladiumOrang}  name="warning" size={moderateScale(20)} />}
                {alert.type === "login" &&<AntDesign style={{ paddingBottom:moderateScale(5) }} color={Colors.primary} name='login' size={moderateScale(18)} />}

                <Text style={{textAlign:"center" }}>{alert.message}</Text>
                <Text style={{textAlign:"center" , color:Colors.primary , fontWeight:"bold"}}>{alert.suTitle}</Text>
            </View>}
        />
    );
}

const styles = StyleSheet.create({

    screen: {}
});

export default CustomAwesomeAlert;