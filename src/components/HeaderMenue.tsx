import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, View, Text , Pressable} from 'react-native';
import { Image } from 'react-native-animatable';
import imgs from '../assets/images';
import { moderateScale } from '../styles/ResponsiveDimentions';

const HeaderMenue = () => {
    const navigation = useNavigation()
    return (
        <Pressable onPress={() => {
            navigation?.openDrawer()
        }}>
            <Image style={{
                width: moderateScale(8),
                marginHorizontal: moderateScale(5),
                height: moderateScale(8),
            }} source={imgs.drawer} />
            {/* <Image /> */}
        </Pressable>
    )
}
export default HeaderMenue;