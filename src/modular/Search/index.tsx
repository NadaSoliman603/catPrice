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

const Search = (props: Props) => {
    const [search, setSearch] = React.useState("");
    const navigation = useNavigation<NavigationType>()

    const [brand, setBrand] = React.useState()
    const [mount, setMount] = React.useState(true)

    React.useEffect(() => {
        navigation.setOptions({
            headerTitle: "Search",
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
        <MainView>
            <View>
                <View style={[gStyles.pt_6]}>
                    <TextInput
                        mode="outlined"
                        outlineColor={"#eee"}
                        label="Search by Cat id..."
                        value={search}
                        onChangeText={text => setSearch(text)}
                        right={<TextInput.Icon icon={() => <Feather name={"search"} size={fontSizes.font22} />} />}
                    />
                </View>
                {brand ? <FlatList
                    data={brand}
                    renderItem={({ item }) => {
                        console.log(item.makerName)
                        return <View>
                            <Pressable style={[styles.brandContainer, gStyles.row]}>
                                <Image source={{ uri: item.makerImage }} style={styles.brandImag} />

                                <Text style={[gStyles.text_black, gStyles.ph_4]}>{item.makerName}</Text>
                            </Pressable>
                        </View>
                    }}
                    keyExtractor={(item) => item.makerId}
                /> : <Text>Loading brand ...</Text>}
            </View>
        </MainView>
    );
}

const styles = StyleSheet.create({
    screen: {},
    brandContainer: {
        borderWidth: moderateScale(0.2),
        borderColor: "#ccc",
        padding: moderateScale(4)
    },
    brandImag: {
        width: moderateScale(12),
        height: moderateScale(12),
    }
});

export default Search;

