import * as React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import FastImage from 'react-native-fast-image';
import { FlatList } from 'react-native-gesture-handler';
import { ImageSlider } from 'react-native-image-slider-banner';
import { DataType } from 'react-native-image-slider-banner/src';
import Colors from '../../../../styles/colors';
import { moderateScale } from '../../../../styles/ResponsiveDimentions';
type Props = {
    imgs: DataType[]
}

const Slider = (props: Props) => {
    const [active, setActive] = React.useState(0);
    const images = props.imgs
    return (
        <>
            <ImageSlider
                data={props.imgs}
                autoPlay={false}
                onItemChanged={(item ) => {
                    console.log({item})
                    const index = images.findIndex((el)=> el.img === item.img)
                    console.log(index)
                    setActive(images.findIndex((el)=> el.img === item.img))
                }}
                closeIconColor={Colors.primary}
                caroselImageStyle={{ resizeMode: 'cover' }}
                activeIndicatorStyle={{
                    backgroundColor: Colors.primary,
                }}
                showIndicator={false}
            // indicatorContainerStyle={{ top: 50 }}
            previewImageContainerStyle	={{ 
                // backgroundColor:"red"
             }}

             previewImageStyle={{ 
                // backgroundColor:"red",
                width:"100%",
                height:"100%", 
              }}
              blurRadius={60}
            />

            <FlatList
            contentContainerStyle={{ 
                justifyContent:"center",
                alignItems:"center",
                alignContent:"center",
                minWidth:"100%",
                // backgroundColor:"red",

             }}
                style={{ 
                    //  backgroundColor:"red",
                     alignContent:"center",
                     marginTop:moderateScale(3)
                     
                 }}
                horizontal={true}
                data={props.imgs}
                renderItem={(({ item ,index}) => (
                    <Pressable onPress={()=>{

                    }}>
                        <FastImage source={typeof (item.img) === "string" ? { uri: item.img } : 0}
                            style={{
                                width: 50,
                                height: 50,
                                margin: 2,
                                padding: 2,
                                borderWidth: 1,
                                borderColor: active === index? Colors.primary : "#fff",
                            }}
                        />
                    </Pressable>
                ))}
            />
        </>
    );
}

const styles = StyleSheet.create({

    screen: {}
});

export default Slider;