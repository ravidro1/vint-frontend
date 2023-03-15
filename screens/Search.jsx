import { Button, Dimensions, Picker, Keyboard, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";
import Modal from 'react-native-modal'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EvilIcons, Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function Search() {
    const nav = useNavigation()
    const [search, setSearch] = useState('');
    const [results, setResults] = useState();
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible)
    }

    async function submit() {
        const userId = await AsyncStorage.getItem('userId');

        try {
            console.log(process.env.REACT_APP_BACKEND_ANALYTICS_URL + '/search');
            const res = await axios.post(process.env.REACT_APP_BACKEND_ANALYTICS_URL + '/search', {
                userId: userId,
                input: search
            })
            console.log(res.data);
            setResults(res.data);
        } catch (error) {
            console.log(error);
        }

    }

    function getResults() {
        return results.map((result, index) => {
            return (
                <TouchableOpacity key={index} className='w-full h-20'>
                    <Text>{result.category}</Text>
                </TouchableOpacity>
            )
        })
    }

    return (
        <View style={{ flex: 1, height: Dimensions.get('window').height - 100 }} className='bg-blue-500 flex-1 items-center'>
            <SafeAreaView />
            <View className='w-full pl-4 pr-6 py-6 flex-[1] flex-row justify-center items-end bg-blue-500'>
                <View className='flex flex-row items-center'>
                    <TouchableOpacity onPress={toggleModal}><Ionicons name="md-filter" size={24} color="black" /></TouchableOpacity>
                    <View className='flex flex-row justify-start items-center mx-2 w-4/5 h-11 rounded-md bg-slate-200 p-2 overflow-scroll'>
                        <EvilIcons name="search" size={18} color="gray" />
                        <TextInput editable onChangeText={(value) => setSearch(value)} placeholder="Search..." className=" flex content-center w-full overflow-hidden justify-self-start " />
                        <View className=' border-b-black border-b-2 w-full ' />
                    </View>
                    <TouchableOpacity onPress={submit}>
                        <Text className='font-semibold'>SORT</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
                isVisible={isModalVisible}
                onBackdropPress={toggleModal}
                swipeDirection='down'
                animationIn='slideInDown'
                animationOut='fadeOutDown'
                animationInTiming={500}
            >
                <View className='h-1/2 w-screen flex justify-center items-center bg-slate-100 rounded-md self-center'>
                    <View>

                    </View>
                </View>
            </Modal>
            <View className='flex-[9] flex-row justify-center items-center w-full bg-white'>
                {
                    results
                        ?
                        <ScrollView>
                            {getResults()}
                        </ScrollView>
                        :
                        <View className='flex flex-row justify-evenly items-center w-3/6 bg-white rounded-md self-center'>
                            <Text className='text-black text-lg'>No Results</Text>
                            <MaterialCommunityIcons name="search-web" size={36} color="black" />
                        </View>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})
