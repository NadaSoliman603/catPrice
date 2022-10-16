import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
type Props = {}

const OrderCompleted = (props:Props) => {
    return (
        <View style={styles.screen}>
            <Text>OrderCompleted</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    
screen:{}
});

export default OrderCompleted;