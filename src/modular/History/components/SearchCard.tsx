import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Avatar } from 'react-native-paper';
import IconText from '../../../common/IconText';
import Colors from '../../../styles/colors';
import gStyles from '../../../styles/globalStyle';
import { moderateScale } from '../../../styles/ResponsiveDimentions';
import Feather from 'react-native-vector-icons/Feather';
import fontSizes from '../../../styles/fontSizes';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import imgs from '../../../assets/images';
type Props = {
    item: any;
}

const SearchCard = ({ item }: Props) => {
    const img = item.planName === "GOLDEN PLAN" ? imgs.golodOffer : item.planName === "PLTINUM PLAN" ? imgs.silveroffer : imgs.starterOffer

    return (
        <View style={styles.screen}>
            <View style={[styles.buttomBorder,]}>
                <View style={[styles.headerContiner]}>
                    <View>
                        <Text style={[gStyles.text_Bold, gStyles.text_black, gStyles.h3, styles.textSpace]}>{item.catNo}</Text>
                        <View style={[styles.footer]}>
                            <IconText style={styles.textIcon} title='26/5/22' color={Colors.textLightGray} icon={<Feather name='calendar' color={Colors.textLightGray} size={fontSizes.font18} />} />
                            <IconText style={styles.textIcon} title='03:05 PM' color={Colors.textLightGray} icon={<AntDesign name='clockcircleo' color={Colors.textLightGray} size={fontSizes.font14} />} />
                        </View>
                    </View>
                    <View style={[styles.rightIcon]}>
                        <Octicons size={fontSizes.font20} name='history' color={Colors.primary} />
                    </View>
                </View>
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
        // alignItems:"center"
        alignContent:"center",
        justifyContent:"center"
    },
    headerContiner: {
        flexDirection: "row",
        justifyContent: 'space-between',
        padding: moderateScale(5)
        // alignItems:"center",
        // alignContent:"center",
        // justifyContent:"center"
    },
    footer: {
        // paddingHorizontal: moderateScale(5),
        paddingVertical: moderateScale(2),
        flexDirection: "row",
    },
    buttomBorder: {
        borderBottomWidth: moderateScale(0.5),
        borderColor: Colors.primary,

    },
    textSpace: {
        // letterSpacing: moderateScale(0.2)
        textTransform: 'uppercase',
    },
    rightIcon:{
        alignSelf:"center",
    },
   textIcon:{
        paddingRight:moderateScale(6)
    }
});

export default SearchCard;