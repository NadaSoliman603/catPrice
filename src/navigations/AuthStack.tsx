import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ForgetPassword from "../modular/Auth/screens/ForgetPassword";
import Login from "../modular/Auth/screens/Login";
import OTPVeritfication from "../modular/Auth/screens/OTPVeritfication";
import Register from "../modular/Auth/screens/Register";



const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
            <Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />
            <Stack.Screen options={{ headerShown: false }} name="ForgetPassword" component={ForgetPassword} />
            <Stack.Screen options={{ headerShown: false }} name="OTPVeritfication" component={OTPVeritfication} />
        </Stack.Navigator>
    )
}


export default AuthStack;