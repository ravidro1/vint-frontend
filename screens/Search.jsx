import { Dimensions, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";

import { EvilIcons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export default function Search() {
    const nav = useNavigation()
    const [search, setSearch] = useState('');
    return (
        <View style={{ flex: 1, height: Dimensions.get('window').height - 100 }} className='bg-white'>
            <SafeAreaView />
            <View className='absolute top-0 h-36 w-full p-7 flex flex-row justify-center items-end bg-blue-500'>
                <View className='flex flex-row justify-start items-center w-5/6 h-11 rounded-md bg-slate-200 p-2 overflow-scroll'>
                    <EvilIcons name="search" size={18} color="gray" />
                    <TextInput onChangeText={(value) => setSearch(value)} placeholder="Search..." className=" flex content-center w-full overflow-hidden " />
                    <View className=' border-b-black border-b-2 w-full ' />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})
