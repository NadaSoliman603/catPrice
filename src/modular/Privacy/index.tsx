import * as React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import Colors from '../../styles/colors';
import fontSizes from '../../styles/fontSizes';
import gStyles from '../../styles/globalStyle';
import { moderateScale } from '../../styles/ResponsiveDimentions';

const Privacy = () => {
    const dumyString = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum'

    return (
        <ScrollView style={styles.screen}>
            <Text style={[gStyles.text_Bold, gStyles.h1, gStyles.textDarkBlack, gStyles.pv_6]}>
                Our privacy policy
            </Text>
            <Text style={[styles.TermsAndConditionsText]}>
                {dumyString}
            </Text>
            <Text style={[styles.TermsAndConditionsText]}>
                {dumyString}
            </Text>
            <Text style={[styles.TermsAndConditionsText]}>
                {dumyString}
            </Text>

            <View style={{ height: moderateScale(30) }}></View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingVertical: moderateScale(6),
        paddingHorizontal: moderateScale(6),
        // padding:moderateScale(20)
    },
    TermsAndConditionsText: {
        fontSize: fontSizes.font16,
        lineHeight: moderateScale(10),
        textAlign: "justify"
    },

});

export default Privacy;