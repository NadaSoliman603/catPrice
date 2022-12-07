import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import imgs from '../../assets/images';
import OutLineButton from '../../common/OutLineButton';
import Colors from '../../styles/colors';
import fontSizes from '../../styles/fontSizes';
import gStyles, { hp } from '../../styles/globalStyle';
import { moderateScale } from '../../styles/ResponsiveDimentions';
import { NavigationType } from '../../types/navigationTypes';
type Props = {
    cancelNoCriditeModal:()=>void
}

const OutOfCridit = (props: Props) => {
    const navigation = useNavigation<NavigationType>()
    return (
        <View style={styles.screen}>
            <View style={{ alignItems:"center", }}>
                <Text style={[gStyles.text_Primary , gStyles.h2 , styles.title]} >Uh-oh!</Text>
                <Text style={{letterSpacing:moderateScale(0.1),fontSize:fontSizes.font18 ,  fontWeight:"400" , color:Colors.textLightGray , marginHorizontal:moderateScale(30) , textAlign:"center" }}>You are out of credits.</Text>

                <Text style={{letterSpacing:moderateScale(0.1),fontSize:fontSizes.font18 ,  fontWeight:"400" , color:Colors.textLightGray , marginHorizontal:moderateScale(20) , textAlign:"center" }}>Buy Credits now to continue the uninterrupted experience.</Text>
                <FastImage style={styles.img} resizeMode='contain' source={imgs.outOfCridite} />
            </View>
            <OutLineButton textStyle={{}} title='Buy Credits Now' style={{}} icon={<Text></Text>} onPress={() => {
                props.cancelNoCriditeModal()
                navigation.navigate('CreditsScreen') 
                }} outline={true} />

        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        justifyContent: "center",
        alignContent: "center",
        // alignItems:"center",
        paddingHorizontal: moderateScale(6),
        paddingVertical:moderateScale(6)

    },
    img: {
        width: moderateScale(120),
        height: hp(23)

    },
    title:{
        fontWeight:"600",
        paddingVertical:moderateScale(5)
    }
});

export default OutOfCridit;