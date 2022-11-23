import React, { useState } from 'react';
import {
    View, Image, StyleSheet, SafeAreaView, ScrollView, Dimensions, Text, Pressable
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Colors from '../../../../styles/colors';
import { moderateScale } from '../../../../styles/ResponsiveDimentions';

const SliderImageCustom = ({ images }) => {
    const [ref, setRef] = useState<any>(null);

    const { width } = Dimensions.get('window');
    const height = width * 0.7;

    const [active, setActive] = useState(0);

    const onScrollChange = ({ nativeEvent }) => {
        const slide = Math.ceil(
            nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
        );
        if (slide !== active) {
            setActive(slide);
        }
    };

    return (
        <View>
            <ScrollView
                
                pagingEnabled
                horizontal
                onScroll={
                    onScrollChange
                }
                showsHorizontalScrollIndicator={false}
                style={{ width, height }}
                ref={(ref) => { setRef(ref) }}

                >
                {images.map((image: string, index: number) => (
                    <Image
                        key={index}
                        source={{ uri: image }}
                        style={{ width: width - 5, height, resizeMode: 'cover' }}
                    />
                ))}
                
            </ScrollView>
            <ScrollView horizontal={true} style={styles.pagination}>
                {images.map((image: string, k: number) => (
                    <Pressable   key={k} style={{ padding: 2, }} onPress={() => {
                        //const index = k
                        ref.scrollTo({ x: k-1, y:0  , animated: true,})
                        // setActive(k) 
                        //ref.scrollToIndex({ index: k })
                       
                        }}>
                        <FastImage resizeMode='cover' source={{ uri: image }}
                            style={{
                                width: 50,
                                height: 50,
                                margin: 2,
                                borderWidth: 1,
                                borderColor: k == active ? Colors.primary : "#fff",
                            }}
                        />
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    pagination: {
        // flexDirection: 'row',
        // position: 'absolute',
        // bottom: -60,
        alignSelf: 'center',
        // overflow:"scroll"
        marginTop: moderateScale(3)
    },
    dot: {
        color: '#888',
        fontSize: 50,
    },
    activeDot: {
        color: '#FFF',
        fontSize: 50,
    },
});

export default SliderImageCustom;