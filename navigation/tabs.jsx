import { StyleSheet, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Feed from "../screens/Feed";
import FollowingFeed from "../screens/FollowingFeed";
import Landing from "../screens/Landing";

import { Ionicons, FontAwesome, Entypo, MaterialIcons } from '@expo/vector-icons';

import Search from "../screens/Search";
import Wishlist from "../pages/Wishlist";
import NewPost from "../pages/NewPost";
import Profile from "../pages/profile";
import Details from "../screens/Details";
import MyProfile from "../pages/MyProfile";



const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Feeds = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();

const FeedStack = () => {
    return (
        <Feeds.Navigator screenOptions={{
            tabBarStyle: {
                height: 100,
                display: 'flex',
                justifyContent: 'flex-end',
            }
        }}>
            <Feeds.Screen name="FOR YOU" component={Feed} />
            <Feeds.Screen name="FOLLOWING" component={FollowingFeed} />
            {/* <Feeds.Screen name="details" options={{tabBarVisible: false}} component={Details} /> */}
        </Feeds.Navigator>
    )
}

const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Feeds" component={FeedStack} />
            <Stack.Screen name="Details" component={Details} />
            <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
    )
}

const DrawerStack = () => {
    return (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="Search" component={Search} />
            <Drawer.Screen name="Drawer" component={Drawer} />
        </Drawer.Navigator>
    )
}

function Tabs() {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarInactiveTintColor: 'black',
            tabBarActiveTintColor: 'red',
            tabBarStyle: {
                height: 100,
            }
        }}>
            <Tab.Screen name="Search" component={Search} options={{
                tabBarIcon: ({ color, size }) => (
                    <View className='flex justify-center items-center'>
                        <FontAwesome name="search" size={35} color={color} />
                    </View>
                )
            }} />
            <Tab.Screen name="Feed" component={HomeStack} options={{
                tabBarBadge: 3,
                tabBarIcon: ({ color, size }) => (
                    <View className='flex justify-center items-center'>
                        <Entypo name="shop" size={35} color={color} />
                    </View>
                )
            }} />
            <Tab.Screen name="Landing" component={NewPost} options={{
                tabBarIcon: ({ color, size }) => (
                    <View className='flex justify-center items-center'>
                        <FontAwesome name="plus-square" size={35} color={color} />
                    </View>
                )
            }} />
            <Tab.Screen name="Post" component={Wishlist} options={{
                tabBarIcon: ({ color, size }) => (
                    <View className='flex justify-center items-center'>
                        <MaterialIcons name="favorite" size={38} color={color} />
                    </View>
                )
            }} />
            <Tab.Screen name="Profile" component={MyProfile} options={{
                tabBarIcon: ({ color, size }) => (
                    <View className='flex justify-center items-center'>
                        <FontAwesome name="user-circle-o" size={35} color={color} />
                    </View>
                )
            }} />
        </Tab.Navigator>
    );
}

export default Tabs;