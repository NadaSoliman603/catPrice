
import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../modular/Home';
import Explore from '../modular/Explore';
import Brand from '../modular/Brand';
import Credits from '../modular/Cridits.tsx';
import Profile from '../modular/Profile';


const Tab = createBottomTabNavigator();

const BottomTab = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Explore" component={Explore} />
                <Tab.Screen name="Brand" component={Brand} />
                <Tab.Screen name="Credits" component={Credits} />
                <Tab.Screen name="Profile" component={Profile} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}


export default BottomTab;