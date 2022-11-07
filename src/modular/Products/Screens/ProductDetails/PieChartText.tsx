
import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Avatar } from 'react-native-paper';
import imgs from '../../../../assets/images';
import fontSizes from '../../../../styles/fontSizes';
import gStyles from '../../../../styles/globalStyle';
import { moderateScale } from '../../../../styles/ResponsiveDimentions';
import Entypo  from 'react-native-vector-icons/Entypo';
type Props = {
    title: string ,
    color:string,
    prec:number
}

const PieChartText = ({ title , color ,prec}: Props) => {
    return (
        <View style={[styles.screen]}>
            <Entypo style={styles.icon} color={color} name='dot-single' size={moderateScale(14)}/>
            <View style={[styles.titleContainer]}><Text style={[ styles.title]}>{title} <Text style={[{ color:color  } , gStyles.h6]}>{prec}%</Text> </Text></View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        marginVertical:moderateScale(5),
        flexDirection:"row",
        // paddingHorizontal:moderateScale(2),
        justifyContent:"center",
        alignContent:"center",
        textAlign:"center",
        alignSelf:"center",
    },
    title:{
        textTransform: 'capitalize',
        color:"#000000",
        fontWeight:"bold"
    },
    icon:{
        // height:moderateScale(9),
        width:moderateScale(8),
        justifyContent:"center",
        alignContent:"center",
        textAlign:"center",
        alignSelf:"center",
         alignItems:"center"
        // marginBottom:10
        
    },
    titleContainer:{
        justifyContent:"center",
        alignContent:"center",
        textAlign:"center",
        alignSelf:"center",

    }
});

export default PieChartText;