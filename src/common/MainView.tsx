import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Colors from '../styles/colors';
import Loading from './Loading';
import NoFoundData from './NoDataFound';
import OverLayLoading from './OverLayLoading';
type Props = {
    children:JSX.Element;
    style:object;
    loading:boolean;
    data:any[];
    overLayLoading : boolean | undefined;
}

const MainView = ({children , style , loading , data , overLayLoading}:Props) => {
    if(overLayLoading){
        return (<View style={[styles.screen , style ]}><OverLayLoading/></View>)
    }
    return (
        <View style={[styles.screen , style ]}>
            {loading && <Loading/>}
            {data?.length === 0 && loading === false &&<NoFoundData title='No Brands found'/>}
            {data?.length > 0 &&  children}
        </View>
    );
}

const styles = StyleSheet.create({
screen:{
    flex: 1,
    backgroundColor: Colors.white,
    padding:"5%"
}
});

export default MainView;