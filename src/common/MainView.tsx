import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Colors from '../styles/colors';
type Props = {
    children:JSX.Element
}

const MainView = ({children}:Props) => {
    return (
        <View style={styles.screen}>
            {children}
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