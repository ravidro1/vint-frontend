import {StyleSheet, Text, View} from "react-native";
import React from "react";
import axios from "axios";

export default function GetData() {
    const getForYouFeed = () => {
        axios.post(process.env.REACT_APP_BACKEND_ANALYTICS_URL + "/getfeed", {
            user_id,
        });
    };

    const getFollowingFeed = () => {
        axios.post(
            process.env.REACT_APP_BACKEND_ANALYTICS_URL + "/getfollowingfeed",
            {user_id}
        );
    };

    const getFollowers = () => {
        axios.post(process.env.REACT_APP_BACKEND_URL + "/user/getfollwinglist", {
            userID,
        });
    };

    const getUserPersonalInfo = () => {
        axios.post(process.env.REACT_APP_BACKEND_URL + "/user/userinfo", {userID}).then((res)=>{
            return res.data
        });
    };

    const getWishList = () => {
        axios.post(process.env.REACT_APP_BACKEND_URL + "/user/getwishlist", {
            userID,
        });
    };

    const getUserProduct = (userID) => {
        axios.post(process.env.REACT_APP_BACKEND_URL + "/getuserproductslist", {
            userID,
        });
    };

    return {
        getFirstRandomProduct,
        getForYouFeed,
        getFollowingFeed,
        getFollowers,
        getSelletFollowersNumber,
        getUserPersonalInfo,
        getWishList,
        getUserProduct,
    };
}

const styles = StyleSheet.create({});