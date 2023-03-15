import { Button, Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useEffect, useState } from "react";
import Modal from 'react-native-modal'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EvilIcons, Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import DropDownPicker from 'react-native-dropdown-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5, Entypo, Octicons } from '@expo/vector-icons';

export default function Search() {
    const nav = useNavigation()
    const [search, setSearch] = useState('');
    const [results, setResults] = useState();
    const [isModalVisible, setModalVisible] = useState(false);

    const [openCategoryPicker, setOpenCategoryPicker] = useState(false);
    const [categoryValue, setCategoryValue] = useState(null);
    const categories = [
        // { label: 'any', value: '' },
        { label: 'T-shirts', value: 'T-shirts' },
        { label: 'Jackets', value: 'Jackets' },
        { label: 'Long-Sleeve', value: 'Long-Sleeve' },
        { label: 'Pants', value: 'Pants' },
        { label: 'Shorts', value: 'Shorts' },
        { label: 'Shoes', value: 'banana' },
        { label: 'Hats', value: 'Hats' },
    ];

    const [openConditionPicker, setOpenConditionPicker] = useState(false);
    const [ConditionValue, setConditionValue] = useState(null);
    const conditions = [
        // { label: 'any', value: '' },
        { label: 'Brand New', value: 'Brand New' },
        { label: 'As New', value: 'As New' },
        { label: 'Used', value: 'Used' },
        { label: 'Repair Needed', value: 'Repair Needed' },
    ];

    const [openTagsPicker, setOpenTagsPicker] = useState(false);
    const [TagsValue, setTagsValue] = useState(null);
    const tags = [
        // { label: 'any', value: '' },
        { label: 'Vintage', value: 'Vintage' },
        { label: 'Trendy', value: 'Trendy' },
        { label: 'Homemade', value: 'Homemade' },
        { label: 'Brandless', value: 'Brandless' },
        { label: 'Oversize', value: 'Oversize' },
        { label: 'Branded', value: 'Branded' },
        { label: 'Brandless', value: 'Brandless' },
    ];

    useEffect(() => {
        if (openCategoryPicker) {
            setOpenConditionPicker(false);
            setOpenTagsPicker(false);
        }
        else if (openConditionPicker) {
            setOpenCategoryPicker(false);
            setOpenTagsPicker(false);
        }
        // else if (openTagsPicker) {
        //     setOpenConditionPicker(false);
        //     setOpenCategoryPicker(false);
        // }
    }, [openCategoryPicker, openConditionPicker, openTagsPicker]);

    function resetFilters() {
        setTagsValue(null);
        setCategoryValue(null);
        setConditionValue(null);
    }

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
                <TouchableOpacity key={index} className='w-full h-28 flex-row justify-evenly items-center px-4 border-t border-neutral-900 bg-white'>
                    <View className='flex-1 h-full justify-evenly'>
                        <View className='w-3/4 flex-row items-center justify-between'>
                            <Ionicons name="ios-shirt" size={16} color="black" />
                            <Text className='text-black font-medium'>{result.category}</Text>
                        </View>
                        <View className='w-3/4 flex-row items-center justify-between'>
                            <Entypo name="price-tag" size={16} color="black" />
                            <Text className='text-black font-medium'>{result.size}</Text>
                        </View>
                    </View>
                    <View className='flex-1 h-full justify-evenly'>
                        <View className='w-3/4 flex-row items-center justify-between'>
                            <FontAwesome5 name="coins" size={16} color="black" />
                            <Text className='text-black font-medium'>{result.price}$</Text>
                        </View>
                        <View className='w-3/4 flex-row items-center justify-between'>
                            <Entypo name="new" size={16} color="black" />
                            <Text className='text-black font-medium'>{result.condition}</Text>
                        </View>
                    </View>
                    <View className='flex-1 h-full items-center justify-center'>
                        {
                            result.media[0].url
                                ?
                                <Image source={{uri: result.media[0].url}} className='h-4/5 w-1/2 rounded-md'/>
                                :
                                <Octicons name="image" size={42} color="black" />
                        }
                    </View>
                </TouchableOpacity>
            )
        })
    }

    return (
        <View style={{ flex: 1, height: Dimensions.get('window').height - 100 }} className='bg-sky-900 flex-1 items-center'>
            <SafeAreaView />
            <View className='w-full pl-4 pr-6 py-6 flex-[1] flex-row justify-center items-end bg-sky-900'>
                <View className='flex flex-row items-center'>
                    <TouchableOpacity onPress={toggleModal}><Ionicons name="md-filter" size={28} color="white" /></TouchableOpacity>
                    <View className='flex flex-row justify-start items-center mx-2 w-[75%] h-11 rounded-md bg-slate-200 p-2 overflow-scroll'>
                        <EvilIcons name="search" size={18} color="gray" />
                        <TextInput editable onChangeText={(value) => setSearch(value)} placeholder="Search..." className=" flex content-center w-full overflow-hidden justify-self-start " />
                        <View className=' border-b-black border-b-2 w-full ' />
                    </View>
                    <TouchableOpacity onPress={submit}>
                        <Text className='font-bold text-lg text-white'>SORT</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
                isVisible={isModalVisible}
                onBackdropPress={() => {
                    toggleModal()
                    setOpenCategoryPicker(false)
                    setOpenConditionPicker(false)
                    setOpenTagsPicker(false)
                }}
                onSwipeComplete={() => {
                    toggleModal()
                    setOpenCategoryPicker(false)
                    setOpenConditionPicker(false)
                    setOpenTagsPicker(false)
                }}
                swipeDirection='down'
                animationIn='slideInDown'
                animationOut='fadeOutDown'
                animationInTiming={500}
            >
                <View className='h-1/2 w-screen flex items-center bg-slate-100 rounded-md self-center'>
                    <View className='flex-1 w-2/3 items-center justify-evenly z-30'>
                        <Text className='w-full text-center text-lg'>Choose Category</Text>
                        <DropDownPicker
                            className='items-center justify-center'
                            placeholder="any"
                            maxHeight={300}
                            open={openCategoryPicker}
                            value={categoryValue}
                            items={categories}
                            setOpen={setOpenCategoryPicker}
                            setValue={setCategoryValue}
                            max={1}
                        />
                    </View>
                    <View className='flex-1 w-2/3 items-center justify-evenly z-20'>
                        <Text className='w-full text-center text-lg'>Choose Condition</Text>
                        <DropDownPicker
                            className='items-center justify-center'
                            placeholder="any"
                            open={openConditionPicker}
                            value={ConditionValue}
                            items={conditions}
                            setOpen={setOpenConditionPicker}
                            setValue={setConditionValue}
                            max={1}
                        />
                    </View>
                    <View className='flex-1 w-2/3 items-center justify-evenly z-10'>
                        <Text className='w-full text-center text-lg'>Choose Tags</Text>
                        <DropDownPicker
                            className='items-center justify-center'
                            placeholder="any"
                            open={openTagsPicker}
                            value={TagsValue}
                            items={tags}
                            setOpen={setOpenTagsPicker}
                            setValue={setTagsValue}
                            multiple={true}
                            max={2}
                            autoScroll={true}
                            mode="BADGE"
                            badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a"]}
                        />
                    </View>
                    <TouchableOpacity className='h-8 w-36 justify-center items-center my-2 rounded-md bg-slate-300' onPressOut={() => resetFilters()}>
                        <Text>Reset Filters</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <View className='flex-[9] justify-start items-center w-full bg-slate-200'>
                {
                    results
                        ?
                        <ScrollView>
                            {getResults()}
                        </ScrollView>
                        :
                        <View className='flex flex-row justify-evenly items-center w-4/6 bg-slate-200 rounded-md self-center'>
                            <Text className='text-black text-lg'>Search For Products</Text>
                            <MaterialCommunityIcons name="search-web" size={36} color="black" />
                        </View>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})
