import { Dimensions, Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { AppContext } from "../components/AppContext";

import { Ionicons, FontAwesome5, Entypo, Fontisto } from '@expo/vector-icons';

export default function Details({ route, navigation }) {
    const { post, result } = route.params
    console.log('res ', result);
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
            <Pressable onPress={() => navigation.goBack()} className='absolute right-6 top-11'>
                <Fontisto name="whatsapp" size={34} color={darkBlue} />
            </Pressable>
            <View className='w-[85vw]'>
                <View className='flex flex-row justify-around mb-4 mt-6'>
                    <View className='flex flex-row w-1/3'>
                        <FontAwesome5 name="user-alt" size={24} color={darkBlue} />
                        <Text className='font-semibold text-xl ml-2'>{result.seller}</Text>
                    </View>
                    <View className='flex flex-row'>
                        <Entypo name="price-tag" size={30} color={darkBlue} />
                        <Text className='text-xl font-semibold text-black mr-5 ml-2'>{result.size}</Text>
                    </View>
                    <View className='flex flex-row'>
                        <FontAwesome5 name="coins" size={30} color={darkBlue} />
                        <Text className='text-xl font-semibold text-black ml-2'>{result.price}</Text>
                    </View>
                </View>
                <ScrollView className='mb-5 h-[10vh]'>
                    <Text>{result.description}</Text>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({});
