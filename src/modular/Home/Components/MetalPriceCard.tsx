import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Avatar } from 'react-native-paper';
import fontSizes from '../../../styles/fontSizes';
import gStyles, { wp } from '../../../styles/globalStyle';
import { moderateScale } from '../../../styles/ResponsiveDimentions';
type Props = {
    name:string,
    title:string,
    subTitle:string
}

const MetalPriceCard = (props: Props) => {
    return (
        <View style={[styles.screen, gStyles.row, gStyles.shadow,]}>
            <View style={[gStyles.row_Center, styles.container]}>
                <View style={[gStyles.row, styles.avatarContainer , {
                    width:wp(40),
                }]}>
                    <Avatar.Text size={fontSizes.font24} label={props.name} />
                    <Text style={[gStyles.text_Bold , gStyles.h4 , {
                        paddingHorizontal:moderateScale(3)
                    }]}>{props.title}</Text>
                </View>
                <View style={[{
                    width:wp(40),
                    justifyContent:"flex-end"
                }]}>
                    <Text style={[styles.text_right]}>{props.subTitle}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        borderWidth: 0,
        marginVertical: moderateScale(2),
        borderRadius: moderateScale(3),
        // justifyContent:"center",
        alignItems: "center",
        alignContent: "center",
        // margin:"auto"
    },
    container: {
        alignItems: "center",
        height: moderateScale(27),
        alignContent: 'center',
        paddingTop: moderateScale(4),
        paddingHorizontal: moderateScale(4),
        
    },
    avatarContainer: {

    },
    text_right:{
        textAlign:"right"
    }
});

export default MetalPriceCard;