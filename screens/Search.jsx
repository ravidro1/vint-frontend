import { Button, Dimensions, Keyboard, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";
import Modal from 'react-native-modal'

import { EvilIcons, Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export default function Search() {
    const nav = useNavigation()
    const [search, setSearch] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible)
    }
    return (
            <View style={{ flex: 1, height: Dimensions.get('window').height - 100 }}
                className='bg-white flex-1 items-center'>
                <SafeAreaView />
                <View className='absolute top-0 h-36 w-full p-7 flex flex-row justify-center items-end bg-blue-500'>
                    <View className='flex flex-row items-center'>
                        <TouchableOpacity onPress={toggleModal}><Ionicons name="md-filter" size={24} color="black" /></TouchableOpacity>
                        <View className='flex flex-row justify-start items-center mx-2 w-5/6 h-11 rounded-md bg-slate-200 p-2 overflow-scroll'>
                            <EvilIcons name="search" size={18} color="gray" />
                            <TextInput editable onChangeText={(value) => setSearch(value)} placeholder="Search..." className=" flex content-center w-full overflow-hidden justify-self-start " />
                            <View className=' border-b-black border-b-2 w-full ' />
                        </View>
                        <Text className='font-semibold'>SORT</Text>
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
                        <Text>Filters</Text>
                    </View>
                </Modal>
            </View>
    )
}

const styles = StyleSheet.create({})
