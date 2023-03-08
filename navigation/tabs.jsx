import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Feed from "../screens/Feed";
import Landing from "../screens/Landing";

import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Post from "../components/Post";
import Search from "../screens/Search";
import Profile from "../pages/profile";



const Tab = createBottomTabNavigator();

function Tabs() {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                height: 100
            }
        }}>
            <Tab.Screen name="Search" component={Search} options={{
                tabBarIcon: ({ color, size }) => (
                    <View className='flex justify-center items-center'>
                        <FontAwesome name="search" size={40} color="black" />
                    </View>
                )
            }} />
            <Tab.Screen name="Landing" component={Profile} options={{
                tabBarIcon: ({ color, size }) => (
                    <View className='flex justify-center items-center'>
                        <FontAwesome name="plus-square" size={40} color="black" />
                    </View>
                )
            }} />
            <Tab.Screen name="Feed" component={Feed} options={{
                tabBarIcon: ({ color, size }) => (
                    <View className='flex justify-center items-center'>
                        <Entypo name="shop" size={40} color="black" />
                    </View>
                )
            }} />
        </Tab.Navigator>
    );
}
const styles = StyleSheet.create({

})

export default Tabs;