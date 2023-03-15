import { Dimensions, Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { AppContext } from "../components/AppContext";

import { Ionicons, FontAwesome5, Entypo, Fontisto } from '@expo/vector-icons';

export default function Details({ route, navigation }) {
    const { post } = route.params
    const image = { uri: post.img }
    const darkBlue = 'rgb(10, 34, 57)'
    post.images[0] !== post.img && post.images.unshift(post.img)
    return (
        <View style={{ flex: 1, height: Dimensions.get('window').height - 100 }} className='flex-1 justify-around items-center overflow-scroll bg-slate-100'>
            <SafeAreaView />
            <View className='h-[60vh] w-[90vw] rounded-xl mt-6 mb-2'>
                <ScrollView horizontal pagingEnabled>
                    {post.images.map((image, index) => (
                        <Image resizeMode="cover" key={index} source={{ uri: image }} className='h-[60vh] w-[90vw] rounded-xl' />
                    ))}
                </ScrollView>
            </View>
            <Pressable onPress={() => navigation.goBack()} className='absolute left-6 top-11'>
                <Ionicons name="arrow-back-circle" size={40} color={darkBlue} />
            </Pressable>
            <Pressable onPress={() => navigation.goBack()} className='absolute right-6 top-11'>
                <Fontisto name="whatsapp" size={34} color={darkBlue} />
            </Pressable>
            <View className='w-[85vw]'>
                <View className='flex flex-row justify-around mb-4 mt-6'>
                    <View className='flex flex-row'>
                        <FontAwesome5 name="user-alt" size={24} color={darkBlue} />
                        <Text className='font-semibold text-xl ml-2'>{post.seller}</Text>
                    </View>
                    <View className='flex flex-row'>
                        <Entypo name="price-tag" size={30} color={darkBlue} />
                        <Text className='text-xl font-semibold text-black mr-5 ml-2'>{post.size}</Text>
                    </View>
                    <View className='flex flex-row'>
                        <FontAwesome5 name="coins" size={30} color={darkBlue} />
                        <Text className='text-xl font-semibold text-black ml-2'>{post.price}</Text>
                    </View>
                </View>
                <ScrollView className='mb-5 h-[10vh]'>
                    <Text>{post.description}</Text>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({});
