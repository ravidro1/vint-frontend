import { Dimensions, Image, Linking, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { AppContext } from "../components/AppContext";

import { Ionicons, FontAwesome5, Entypo, Fontisto } from '@expo/vector-icons';
import axios from "axios";

export default function Details({ route, navigation }) {
    const { post, result } = route.params
    const [sellerName, setSellerName] = useState('');
    const [sellerPhone, setSellerPhone] = useState('');
    const [whatsAppLink, setWhatsAppLink] = useState('');
    
    useEffect(() => {
        console.log(result);

        const getSeller = async () => {
            try {
                let res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/getUserById`, { userID: result.seller })
                console.log('seller ', res.data.user);
                setSellerName(res.data.user.name)
                setSellerPhone(res.data.user.phone.toString())
            } catch (error) {
                console.log(error);
            }
        }
        getSeller()
        const createWhatsAppConv = () => {
            try {
                const baseUrl = "https://wa.me/";
                const phoneStr = sellerPhone.replace(/\D/g, ""); // remove all non-numeric characters from the phone number
                const messageStr = encodeURIComponent('Hello');
                const link = `${baseUrl}${phoneStr}?text=${messageStr}`;
                setWhatsAppLink(link)
            }
            catch (error) {
                console.log('whatsapp error ' , error);
            }
        }
        createWhatsAppConv()
    }, []);
    console.log(sellerPhone);
    

    const image = { uri: result.media[0].url }
    const darkBlue = 'rgb(10, 34, 57)'
    // post.images[0] !== post.img && post.images.unshift(post.img)
    return (
        <View style={{ flex: 1, height: Dimensions.get('window').height - 100 }} className='flex-1 justify-around items-center overflow-scroll bg-slate-100'>
            <SafeAreaView />
            <View className='h-[60vh] w-[90vw] rounded-xl mt-6 mb-2'>
                <Image resizeMode="cover" source={image} className='h-[55vh] w-[90vw] rounded-xl mt-5' />
            </View>
            <Pressable onPress={() => navigation.goBack()} className='absolute left-6 top-11'>
                <Ionicons name="arrow-back-circle" size={40} color={darkBlue} />
            </Pressable>
            <Pressable onPress={() => Linking.openURL(whatsAppLink)} className='absolute right-6 top-11'>
                <Fontisto name="whatsapp" size={34} color={darkBlue} />
            </Pressable>
            <View className='w-[85vw]'>
                <View className='flex flex-row justify-around mb-4 mt-6'>
                    <View className='flex flex-row w-1/3'>
                        <FontAwesome5 name="user-alt" size={24} color={darkBlue} />
                        <Text className='font-semibold text-lg ml-2'>{sellerName}</Text>
                    </View>
                    <View className='flex flex-row'>
                        <Entypo name="price-tag" size={24} color={darkBlue} />
                        <Text className='text-lg font-semibold text-black mr-5 ml-2'>{result.size}</Text>
                    </View>
                    <View className='flex flex-row'>
                        <FontAwesome5 name="coins" size={24} color={darkBlue} />
                        <Text className='text-lg font-semibold text-black ml-2'>{result.price}</Text>
                    </View>
                </View>
                <ScrollView className='mb-5 px-2 h-[10vh]'>
                    <Text className='text-lg font-semibold'>Description:</Text>
                    <Text>{result.description}</Text>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({});
