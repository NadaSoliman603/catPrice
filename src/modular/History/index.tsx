import  React , {useEffect , useState} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MainView from '../../common/MainView';
import { ActivityIndicator, Button, SegmentedButtons } from 'react-native-paper';
import ButtonGroup from '../../common/ButtonGroup';
import { Label } from '../../types/types';
import OrderCard from './components/OrderCard';
import { FlatList } from 'react-native-gesture-handler';
import favorites from '../Favourites/dumyData';
import gStyles from '../../styles/globalStyle';
import CreditCard from './components/CreditCard';
import planData from '../Cridits/dumyData';
import SearchCard from './components/SearchCard';
import Loading from '../../common/Loading';
import Colors from '../../styles/colors';
import { useFocusEffect } from '@react-navigation/native';
import {  orderHistoryApi } from '../../Api/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/store/store';
import { ShowModal } from '../../Redux/reducers/AuthModalReducer';
import { moderateScale } from '../../styles/ResponsiveDimentions';

type Props = {}
const buttonGropValu: {label:string; value:HistoryValue}[] = [
    { label: "Search", value: "search" },
    { label: "Order", value: "order" },
    { label: "Credits", value: "credits" },
]
export type HistoryValue = "search" | "order"  | "credits"
const History = (props: Props) => {
    const user = useSelector((state:RootState)=>state.Auth.user)
    const token = useSelector((state:RootState)=>state.Auth.token)
    const [value, setValue] = useState<HistoryValue >('search');
    const [loading , setLoading] = useState(false)
    const [orders , setOrders] = useState<any[]>([])

    const dispatch = useDispatch()
    const onChangeButtomValue = (value: HistoryValue ) => {
        setValue(value)
    }

    const getOrderData = async()=>{
       
            try {
                if(token){
                    setLoading(true)
                    const res = await orderHistoryApi({currency:user.defCurrency,  token:token,})
                    if(res.data.header.httpStatusCode === 200){
                        setOrders(res.data.body)
                    }
                }else{
                    dispatch(ShowModal(true))
                }
            } catch (error) {
                console.log(error)
            }
            setLoading(false) 
    }
    useEffect(()=>{
        if(value === "order")getOrderData()
    },[value])
    return (
        <MainView data={[]} loading={false} overLayLoading={false} style={styles.screen}>
            <>
                <View style={[gStyles.p_6]}>
                    <ButtonGroup buttonGropLables={buttonGropValu} value={value} onChange={onChangeButtomValue} />

                </View>
                {loading && <ActivityIndicator color={Colors.primary} size="small" style={[gStyles.p_2]} />}

                {value === "order" && <FlatList
                    data={orders}
                    renderItem={({ item }) => <OrderCard item={item} cancelled={item.catId === 165353} />}
                    keyExtractor={(item) => item.orderId.toString()}
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
                 <View style={{ height:moderateScale(15) }}></View>
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