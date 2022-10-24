import { useRoute } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MainView from '../../common/MainView';
import Colors from '../../styles/colors';
import gStyles from '../../styles/globalStyle';
type Props = {}

const BrandsCats = (props:Props) => {
    const rout= useRoute<any>()
    return (
        <MainView data={[{}]} loading={false} overLayLoading={false} style={styles.screen}>
            <Text style={[gStyles.text_black , ]}>Show All Cats from <Text style={[gStyles.text_Primary ,gStyles.text_Bold ]}>{rout.params.catId}</Text></Text>
        </MainView>
    );
}

const styles = StyleSheet.create({
screen:{
    flex:1,
    backgroundColor:Colors.white
}
});

export default BrandsCats;