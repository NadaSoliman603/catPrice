import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Avatar } from 'react-native-paper';
import IconText from '../../../common/IconText';
import Colors from '../../../styles/colors';
import gStyles from '../../../styles/globalStyle';
import { moderateScale } from '../../../styles/ResponsiveDimentions';
import Feather from 'react-native-vector-icons/Feather';
import fontSizes from '../../../styles/fontSizes';
import AntDesign  from 'react-native-vector-icons/AntDesign';
import Octicons  from 'react-native-vector-icons/Octicons';
import imgs from '../../../assets/images';
type Props = {
    item: any;
    cancelled:boolean;
}

const CreditCard = ({ item  , cancelled}: Props) => {
    const img = item.planName === "GOLDEN PLAN" ? imgs.golodOffer :  item.planName === "PLTINUM PLAN" ? imgs.silveroffer :imgs.starterOffer

    return (
        <View style={styles.screen}>
            <View style={[styles.buttomBorder ,]}>
                <View style={[styles.headerContiner]}>
                    <View>
                        <Text style={[gStyles.text_Bold, gStyles.text_black, gStyles.h3, styles.textSpace ]}>{item.planName}</Text>
                        <Text style={gStyles.text_lightGray}>Pay pal</Text>
                    </View>
                    <View>
                        <Avatar.Image style={{ backgroundColor:Colors.white }} size={moderateScale(16)} source={ img } />
                    </View>
                </View>
            </View>

            <View style={[styles.footer]}>
                <IconText style={{  }} title='26/5/22' color={Colors.textLightGray} icon={<Feather name='calendar' color={Colors.textLightGray} size={fontSizes.font18} />} />
                <IconText style={{  }} title='03:05 PM' color={Colors.textLightGray} icon={<AntDesign name='clockcircleo' color={Colors.textLightGray} size={fontSizes.font14} />} />
                {!cancelled && <IconText style={{  }} title='Successful' color={Colors.primary}  icon={<Octicons name='check-circle-fill' color={Colors.primary} size={fontSizes.font14} />} />}
                {cancelled && <IconText style={{  }} title='Declined' color={Colors.error}  icon={<Octicons name='x-circle-fill' color={Colors.error} size={fontSizes.font12} />} />}

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        margin: moderateScale(6),
        borderWidth: moderateScale(0.5),
        borderColor: Colors.primary,
        borderRadius: moderateScale(3),
    },
    headerContiner: {
        flexDirection: "row",
        justifyContent: 'space-between',
        padding: moderateScale(5)

    },
    footer: {
        paddingHorizontal: moderateScale(5),
        paddingVertical: moderateScale(4),
        flexDirection: "row",
        justifyContent: "space-between"
    },
    buttomBorder: {
        borderBottomWidth: moderateScale(0.5),
        borderColor: Colors.primary,

    },
    textSpace: {
        // letterSpacing: moderateScale(0.2)
        textTransform: 'capitalize',
    }
});

export default CreditCard;