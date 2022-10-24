import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
// import FastImage from 'react-native-fast-image';
import fontSizes from '../styles/fontSizes';

type Props = {
    title:string;
}

const NoFoundData = ({title}:Props) => {
    return (
        <View style={[{ width:'100%',height:'100%', justifyContent: 'center', alignItems: 'center', }]}>
            
            {/* {props.image &&
                <FastImage source={props.image} style={[{ width: wp(20), height: wp(20) }, props.imgStyle]} resizeMode={FastImage.resizeMode.contain} />
            } */}
            <Text allowFontScaling={false} style={[{ marginTop: 5, color:"#aaa", fontSize:fontSizes.font20 }]}>{title}</Text>
        </View>
    )
}

export default NoFoundData

const styles = StyleSheet.create({})
