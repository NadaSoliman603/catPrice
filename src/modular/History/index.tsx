import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MainView from '../../common/MainView';
import { Button, SegmentedButtons } from 'react-native-paper';
import ButtonGroup from '../../common/ButtonGroup';
import { Label } from '../../types/types';
import OrderCard from './components/OrderCard';
import { FlatList } from 'react-native-gesture-handler';
import favorites from '../Favourites/dumyData';
import gStyles from '../../styles/globalStyle';
import CreditCard from './components/CreditCard';
import planData from '../Cridits.tsx/dumyData';
import SearchCard from './components/SearchCard';

type Props = {}
const buttonGropValu: Label[] = [
    { label: "Search", value: "search" },
    { label: "Order", value: "order" },
    { label: "Credits", value: "credits" },
]
const History = (props: Props) => {
    const [value, setValue] = React.useState<string | number>('search');

    const onChangeButtomValue = (value: string | number) => {
        setValue(value)
    }
    return (
        <MainView data={[]} loading={false} overLayLoading={false} style={styles.screen}>
            <>
                <View style={[gStyles.p_6]}>
                    <ButtonGroup buttonGropLables={buttonGropValu} value={value} onChange={onChangeButtomValue} />

                </View>
                {value === "order" && <FlatList
                    data={favorites}
                    renderItem={({ item }) => <OrderCard item={item} cancelled={item.catId === 165353} />}
                    keyExtractor={(item) => item.catId.toString()}
                />}

                {value === "search" && <FlatList
                    data={favorites}
                    renderItem={({ item }) => <SearchCard item={item} />}
                    keyExtractor={(item) => item.catId.toString()}
                />}

                {value === "credits" && <FlatList
                    data={planData}
                    renderItem={({ item }) => <CreditCard item={item} cancelled={item.planId === 2} />}
                    keyExtractor={(item) => item.planId.toString()}
                />}
            </>
        </MainView>
    );
}

const styles = StyleSheet.create({
    screen: {
        paddingHorizontal: 0
    },
    group: {

    }
});

export default History;