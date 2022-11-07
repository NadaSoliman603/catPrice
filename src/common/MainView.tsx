import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Colors from '../styles/colors';
import { moderateScale } from '../styles/ResponsiveDimentions';
import Loading from './Loading';
import NoFoundData from './NoDataFound';
import OverLayLoading from './OverLayLoading';
type Props = {
    children:JSX.Element;
    style:object;
    loading:boolean;
    data:any[] | object;
    overLayLoading : boolean | undefined;
}

const MainView = ({children , style , loading , data , overLayLoading}:Props) => {
    if(overLayLoading){
        return (<View style={[styles.screen , style ]}><OverLayLoading/></View>)
    }

    return (
        <View style={[styles.screen , style ]}>
            {loading && <Loading/>}
            {/* {data?.length === 0 && loading === false &&<NoFoundData title='No Brands found'/>} */}
            {/* {data?.length > 0 &&  children} */}
            {data &&  children} 
        </View>
    );
}

const styles = StyleSheet.create({
screen:{
    flex: 1,
    backgroundColor: Colors.white,
    padding:moderateScale(6),
    // paddingTop:moderateScale(25)
}
});

export default MainView;