import { Dimensions, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

import { EvilIcons } from '@expo/vector-icons';

export default function Search(props) {
    return (
        <View style={{ flex: 1, height: Dimensions.get('window').height - 100 }} className='bg-white'>
            <SafeAreaView />
            <View className='absolute top-0 h-40 w-full p-7 flex justify-end items-center bg-blue-500'>
                <View className='flex flex-row justify-start items-center w-5/6 h-11 rounded-md bg-slate-200 p-2 overflow-scroll'>
                    <EvilIcons name="search" size={18} color="gray" />
                    <TextInput placeholder="Search" className=" flex content-center w-full overflow-hidden " />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})
