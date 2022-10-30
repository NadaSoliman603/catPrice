import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
type Props = {}

const CountryScreen = (props:Props) => {
    return (
        <View style={styles.screen}>
            <Text>CountryScreen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    
screen:{}
});

export default CountryScreen;