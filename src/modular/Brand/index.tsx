import * as React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import fontSizes from '../../styles/fontSizes';
import gStyles from '../../styles/globalStyle';
import Feather from 'react-native-vector-icons/Feather';
import MainView from '../../common/MainView';
import { useNavigation } from '@react-navigation/native';
import { NavigationType } from '../../types/navigationTypes';
import { useGetQuery } from '../../Api/redux';
import { getBrandApi } from '../../Api/Auth';
import { FlatList } from 'react-native-gesture-handler';
import { Image } from 'react-native-animatable';
import { moderateScale } from '../../styles/ResponsiveDimentions';
type Props = {}

const Brand = (props: Props) => {
    const [search, setSearch] = React.useState("");
    const navigation = useNavigation<NavigationType>()

    const [brand, setBrand] = React.useState()
    const [mount, setMount] = React.useState(true)

    React.useEffect(() => {
        navigation.setOptions({
            headerTitle: "Brand",
        });

        const getBrandData = async () => {
            try {
                const res = await getBrandApi()
                const brandData = res.data.body
                if (mount) {
                    setBrand(brandData)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getBrandData()
        return () => {
            setMount(false)
        }
    }, []);

    return (
        <View style={[styles.screen]}>
            <View>
                {brand ? <FlatList
                    data={brand}
                    renderItem={({ item }) => {
                        console.log(item.makerName)
                        return <View style={[styles.container]}>
                            <Pressable style={[styles.brandContainer]}>
                                <Image source={{ uri: item.makerImage }} style={styles.brandImag} />
                            </Pressable>
                            <Text style={[,gStyles.text_black, gStyles.ph_4]}>{item.makerName}</Text>
                        </View>
                    }}
                    keyExtractor={(item) => item.makerId}
                /> : <Text>Loading brand ...</Text>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#fff",

    },
    brandContainer: {
        borderWidth: moderateScale(0.2),
        borderColor: "#ccc",
        padding: moderateScale(4),
        margin: moderateScale(5),
        width: "25%",

    },
    brandImag: {
        width: moderateScale(20),
        height: moderateScale(20),
        alignSelf:"center"
    },
    container:{
    }
});

export default Brand;

