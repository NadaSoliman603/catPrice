import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MainView from '../../common/MainView';
import { NavigationType } from '../../types/navigationTypes';
import FavItem from './components/FavItem';
import favorites from './dumyData';
type Props = {}

const Favourites = (props: Props) => {
    const navigation = useNavigation<NavigationType>()
    const onPress = (id:number)=>{
            navigation.navigate("ProductDetails" , {catID:id.toString()})
    }

    return (
        <MainView data={[]} loading={false} overLayLoading={false} style={styles.screen}>
            <>
                <FavItem  onPressIcon={()=>{}} onPress={()=>{onPress(favorites[0].catId)}} item={favorites[0]} />
                <FavItem  onPressIcon={()=>{}} onPress={()=>{onPress(favorites[0].catId)}} item={favorites[0]} />
                <FavItem  onPressIcon={()=>{}} onPress={()=>{onPress(favorites[0].catId)}} item={favorites[0]} />
            </>
        </MainView>
    );
}

const styles = StyleSheet.create({
    screen: {}
});

export default Favourites;