import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Vgif from '../assets/V.gif'

export default function HelloScreen({ navigation }) {
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {        
        const checkToken = async () => {
            try {
                const tempToken = await AsyncStorage.getItem("token");
                const tempUserID = await AsyncStorage.getItem("user");

                const token = await JSON.parse(tempToken);
                const userID = await JSON.parse(tempUserID);

                console.log('hhhh' , token, userID);

                const res = await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/user/verifyToken`,
                    {
                        token,
                        userID,
                    }
                );

                const isTokenValid = res.data.verify;
                console.log(isTokenValid);

                if (isTokenValid) {
                    navigation.navigate('Home')
                }
            } catch (error) {
                navigation.navigate('Landing')
            }
        };
        setTimeout(() => {
            checkToken()
        }, 2000)
    }, []);

    return (
        <View style={{ height: Dimensions.get('window').height }} className="bg-sky-900 items-center flex justify-center items-center">
            <Image source={Vgif}/>
        </View>
    );
}

const styles = StyleSheet.create({});
