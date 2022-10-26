
import * as React from 'react';
import { StyleSheet, View, Text , Pressable} from 'react-native';
import { Avatar } from 'react-native-paper';
import imgs from '../../../assets/images';
import Colors from '../../../styles/colors';
import gStyles from '../../../styles/globalStyle';
import { moderateScale } from '../../../styles/ResponsiveDimentions';
type Props = {
    img:any,
    title:string,
    active:boolean,
    onPress:()=>void
}

const OfferCart = ({img , active , title , onPress , }: Props) => {
    return (
        <View style={[styles.offerImgContainer]}>
            <Pressable onPress={onPress} style={({ pressed }) => [{
                 backgroundColor: pressed ? Colors.primaryPresedButton : "#fff", 
                 borderColor: active?Colors.primary: Colors.lightGray,
                 }, styles.offerImgCard]} >
                <Avatar.Image style={[gStyles.bg_white]} size={moderateScale(17)} source={img} />
            </Pressable>
            <Text style={[styles.title, gStyles.pt_2,  gStyles.text_center, gStyles.h4 , active?gStyles.text_Primary :gStyles.text_lightGray ,active &&gStyles.text_Bold ]}>{title}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#fff",
        padding: moderateScale(6)
    },
    offerImgCard: {
        borderWidth: moderateScale(0.5),
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        borderRadius: moderateScale(3),
        paddingVertical: moderateScale(2)
    },
    offerImgContainer: {
        width: "30%",
    },
    title:{
        textTransform: 'capitalize',

    }

});

export default OfferCart;