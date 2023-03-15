import {StyleSheet, View} from "react-native";
import React, {useContext, useEffect} from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Feed from "../screens/Feed";
import FollowingFeed from "../screens/FollowingFeed";

import {Ionicons, FontAwesome, Entypo, MaterialIcons} from "@expo/vector-icons";

import Search from "../screens/Search";
import Wishlist from "../pages/Wishlist";
import NewPost from "../pages/NewPost";
import Profile from "../pages/profile";
import Details from "../screens/Details";
import MyProfile from "../pages/MyProfile";
import {AppContext} from "../components/AppContext";
import axios from "axios";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Feeds = createMaterialTopTabNavigator();

const FeedStack = () => {
  return (
    <Feeds.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 100,
          display: "flex",
          justifyContent: "flex-end",
          backgroundColor: "rgb(10, 34, 57)",
        },
        tabBarLabelStyle: {
          color: "white",
          fontSize: 15,
          fontWeight: "bold",
          fontFamily: "PingFangSC-Medium",
        },
        tabBarIndicatorStyle: {
          backgroundColor: "rgb(14, 165, 233)",
          height: 6,
          borderRadius: 10,
          width: "30%",
          marginLeft: "7.5%",
        },
      }}
    >
      <Feeds.Screen name="FOR YOU" component={Feed} />
      <Feeds.Screen name="FOLLOWING" component={FollowingFeed} />
    </Feeds.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{gestureEnabled:false,headerShown: false}}>
      <Stack.Screen name="Feeds" component={FeedStack} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

function Tabs({navigation}) {
  const {storageRender} = useContext(AppContext);

  useEffect(() => {
    const checkToken = async () => {
      try {
        console.log("shit");
        const tempToken = await AsyncStorage.getItem("token");
        const tempUserID = await AsyncStorage.getItem("user");

        const token = JSON.parse(tempToken);
        const userID = JSON.parse(tempUserID);

        axios
          .post(`${process.env.REACT_APP_BACKEND_URL}/user/verifyToken`, {
            token,
            userID,
          })
          .then((res) => {
            const isTokenValid = res.data.verify;

            if (!isTokenValid) {
              navigation.navigate("Landing");
            }
          })
          .catch((err) => {
            console.log("Error - in checkToken - tabs");
            console.log(err);
            navigation.navigate("Landing");
          });
      } catch (error) {
        console.log("Error - checkToken - tabs");
        console.log(error);
        navigation.navigate("Landing");
      }
    };
    checkToken();
  }, [storageRender]);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: "white",
        tabBarActiveTintColor: "rgb(14, 165, 233)",
        tabBarStyle: {
          height: 100,
          backgroundColor: "rgb(10, 34, 57)",
        },
      }}
    >
      <Tab.Screen
        name="Feed"
        component={HomeStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <View className="flex justify-center items-center">
              <Entypo name="shop" size={35} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({color, size}) => (
            <View className="flex justify-center items-center">
              <FontAwesome name="search" size={35} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Landing"
        component={NewPost}
        options={{
          tabBarIcon: ({color, size}) => (
            <View className="flex justify-center items-center">
              <FontAwesome name="plus-square" size={35} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Post"
        component={Wishlist}
        options={{
          tabBarIcon: ({color, size}) => (
            <View className="flex justify-center items-center">
              <MaterialIcons name="favorite" size={38} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={MyProfile}
        options={{
          tabBarIcon: ({color, size}) => (
            <View className="flex justify-center items-center">
              <FontAwesome name="user-circle-o" size={35} color={color} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default Tabs;
