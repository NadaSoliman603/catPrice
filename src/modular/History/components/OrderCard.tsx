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
import moment from 'moment';
type Props = {
    item: any;
    cancelled:boolean;
}

const OrderCard = ({ item  , cancelled}: Props) => {
    return (
        <View style={styles.screen}>
            <View style={[styles.buttomBorder ,]}>
                <View style={[styles.headerContiner]}>
                    <View>
                        <Text style={[gStyles.text_Bold, gStyles.text_black, gStyles.h3, styles.textSpace]}>{item.orderNo}</Text>
                        {/* <Text style={gStyles.text_lightGray}>x1 ssjddj</Text> */}
                    </View>
                    <View>
                        {/* <Avatar.Image style={{ backgroundColor:Colors.white }} size={moderateScale(16)} source={{ uri: item.images[0].fullImageURL }} /> */}
                    </View>
                </View>
            </View>

            <View style={[styles.footer]}>
                <IconText style={styles.textIcon} title={moment(item.createdAt).format('DD/MM/YY ')} color={Colors.textLightGray} icon={<Feather name='calendar' color={Colors.textLightGray} size={fontSizes.font18} />} />
                <IconText style={styles.textIcon} title={moment(item.createdAt).format('LT')} color={Colors.textLightGray} icon={<AntDesign name='clockcircleo' color={Colors.textLightGray} size={fontSizes.font14} />} />
                {item.orderStatus === "COMPLETED" && <IconText style={{  }} title='Completed' color={Colors.primary}  icon={<Octicons name='check-circle-fill' color={Colors.primary} size={fontSizes.font14} />} />}
                {item.orderStatus === "CANCELLED" &&<IconText  style={{  }} title='Cancelled' color={Colors.error}  icon={<Octicons name='x-circle-fill' color={Colors.error} size={fontSizes.font12} />} />}
                {item.orderStatus === "NEW" && <IconText  style={{  }} title='new' color={Colors.palladiumOrang}  icon={<Octicons name='check-circle-fill' color={Colors.palladiumOrang} size={fontSizes.font14} />} />}
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
        letterSpacing: moderateScale(0.8)
    },
    textIcon:{

    }
});

export default OrderCard;