import React, { useEffect, useState } from 'react'
import { Alert, Image, Pressable, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5, Entypo } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import * as FileSystem from 'expo-file-system';

const NewPost = () => {

    const [image, setImage] = useState();
    const [base64Image, setBase64Image] = useState();
    const [imageSize, setImageSize] = useState();
    const [mimetype, setMimetype] = useState();
    const [imageSum, setImageSum] = useState(null);
    const [mainPhoto, setMainPhoto] = useState('flex');
    const [advanced, setAdvanced] = useState(false);
    const [productName, setProductName] = useState('');
    const [size, setSize] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState('');
    const [productCondition, setProductCondition] = useState('');
    const isBid = false;

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);

    const [items, setItems] = useState([
        { label: 'North America', value: 'na' },
        { label: 'United States', value: 'usa', parent: 'na' },
        { label: 'Canada', value: 'canada', parent: 'na' },

        { label: 'Europe', value: 'eu' },
        { label: 'Norway', value: 'norway', parent: 'eu' },
        { label: 'Belgium', value: 'belgium', parent: 'eu' },
    ]);

    async function Submit() {
        const parts = image.split('.');
        console.log(parts[parts.length - 1]);
        console.log("----------------------------------hey");
        console.log(image);
        console.log(mimetype);
        console.log(imageSize);
        // console.log(base64Image);
        console.log(await AsyncStorage.getItem('user'));
        // console.log(await Share.shareAsync(image));
        console.log(productName, size, price, description, image)
        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/product/createproduct`, {
                productName,
                productDescription: description,
                productPrice: price,
                productMedia: [
                    {
                        url: image,
                        type: `image/${parts[parts?.length - 1]}`,
                        size: imageSize
                    }
                ],
                userId: JSON.parse(await AsyncStorage.getItem('user')),
                onBid: isBid,
                productCategory: category,
                productCondition: productCondition,
                tags: tags,
            })
            console.log(res.data);
            resetInputs();

        } catch (error) {
            console.log(error);
        }


    }

    function resetInputs() {
        setProductName('');
        setSize('');
        setPrice('');
        setDescription('');
        setCategory('');
        setTags('');
        setProductCondition('');
        setImage();
    }

    const styles = StyleSheet.create({
        header: {
            flex: 1,
        },
        body: {
            flex: 9,
        },
        photoArea: {
            flex: 1.5,
        },
        inputsArea: {
            flex: 2,
        },
        buttonArea: {
            flex: 1,
        },
        iconContainer: {
            flex: 1,
        },
        mainPhoto: {
            display: mainPhoto
        },
    })

    useEffect(() => {
        const toggleMainPhoto = () => {
            if (image) {
                setMainPhoto('none');
            } else {
                setMainPhoto('flex');
            }
        }
        const countImages = () => {
            if (!image) {
                setImageSum(0);
            }
            else if (image && !image.length) {
                setImageSum(1)
            }
            else {
                setImageSum(image.length)
            }
        }
        countImages();
        toggleMainPhoto()
    }, [image])

    function pickImage() {
        Alert.alert(
            'Upload Photo',
            '',
            [
                {
                    text: 'From Gallery',
                    onPress: () => {
                        choosePhotoFromLibrary()
                    },
                },
                {
                    text: 'Take Photo',
                    onPress: () => {
                        takePhotoFromCamera()
                    }
                },
                {
                    text: 'cancel',
                    onPress: () => { },
                    style: 'destructive'
                },

            ],
            { cancelable: true }
        )
    }

    function pickAdditionalImages() {
        if (!image) {
            Alert.alert(
                'No Main Photo',
                '',
                [
                    {
                        text: 'Please Choose Main Photo',
                        style: 'cancel',
                    }
                ],
                { cancelable: true }
            )
        }
        else {
            Alert.alert(
                'Upload Photo',
                '',
                [
                    {
                        text: 'From Gallery',
                        onPress: () => {
                            chooseManyPhotosFromLibrary()
                        },
                    },
                    {
                        text: 'Take Photo',
                        onPress: () => {
                            takeManyPhotosFromCamera()
                        }
                    },
                    {
                        text: 'cancel',
                        onPress: () => { },
                        style: 'destructive'
                    },

                ],
                { cancelable: true }
            )
        }
    }

    // async function shareFile() {
    //     const fileUri = 'asset:/path/to/file.txt';
    //     const result = await Share.shareAsync(fileUri);
    //     if (result.action === Share.sharedAction) {
    //         console.log('File shared successfully');
    //     } else if (result.action === Share.dismissedAction) {
    //         console.log('Share dialog dismissed');
    //     }
    // }

    const takePhotoFromCamera = async () => {
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        })
        console.log(result.assets[0].uri);

        if (result) {
            setImage(result.assets[0].uri);
            setBase64Image(base64Image);
            setImageSize(result.assets[0].fileSize);
        }
    }

    const choosePhotoFromLibrary = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        })

        console.log(result.assets[0].uri);
        console.log(result);

        if (result) {
            let base64Image = await FileSystem.readAsStringAsync(result.assets[0].uri, {
                encoding: FileSystem.EncodingType.Base64,
            });
            setImage(result.assets[0].uri);
            setBase64Image(base64Image);
            setImageSize(result.assets[0].fileSize);
        }
    }

    const takeManyPhotosFromCamera = async () => {
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            selectionLimit: 5,
            aspect: [16, 9],
            quality: 1,
        })
        console.log(result);

        if (result) {
            setImage(prev => [{ prev }, result.assets[0].uri]);
        }
    }
    const chooseManyPhotosFromLibrary = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            selectionLimit: 5,
            aspect: [16, 9],
            quality: 1,
        })

        console.log(result);

        if (result) {
            setImage(prev => [{ prev }, result.assets[0].uri]);
        }
    }

    return (
        <View className='flex-1 bg-black'>
            <StatusBar style='light' />
            <SafeAreaView />
            <View style={styles.header} className='w-full items-center justify-center' >
                <Text className='text-white text-5xl font-bold'>New Post</Text>
            </View>
            <View style={styles.body} className='w-full items-center bg-slate-50'>
                <View style={styles.photoArea} className='w-full items-center py-2'>
                    <TouchableOpacity className='flex-[1] justify-start items-center w-1/2 p-2 bg-slate-300 rounded-lg' onPress={() => setAdvanced(!advanced)}>
                        <Text className='text-sm justify-center items-center'>
                            {advanced ?
                                'Hide Advanced Features -'
                                :
                                'Show Advanced Features +'}
                        </Text>
                    </TouchableOpacity>
                    <View className='flex-[7] w-full items-center justify-evenly'>
                        <View className='flex-[1] w-full justify-center items-center'>
                            <Text className='text-xs font-semibold text-black'>Main Photo</Text>
                        </View>
                        {!image &&
                            <View className='flex-[3] '>
                                <TouchableOpacity style={styles.mainPhoto} className='h-20 w-20 justify-center items-center bg-sky-700 rounded-xl' onPressOut={() => pickImage()}>
                                    <View style={styles.iconContainer} className='w-full justify-center items-center'>
                                        <AntDesign name="plus" size={36} color="white" />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                        {image &&
                            <View className='flex-[3] w-1/2 flex-col justify-evenly items-center'>
                                <Image source={{ uri: image }} className='flex-[3] h-20 w-20 rounded-md' />
                                <TouchableOpacity className='flex-[1] w-full flex-row justify-center items-center' onPress={() => { setImage(null) }}>
                                    <MaterialCommunityIcons name="delete-outline" size={16} color="black" />
                                    <Text className='text-xs'>Delete Photo</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    </View>
                </View>
                <View style={styles.inputsArea} className='justify-center items-center'>
                    <Text className='font-semibold text-xl'>Product Details</Text>
                    <ScrollView className='w-11/12 border-t-[1] border-t'>
                        <View className='w-full h-full flex-col justify-start items-center'>
                            <View className='w-full h-24 flex-row justify-evenly items-center'>
                                <Ionicons name="ios-shirt" size={32} color="black" />
                                <TextInput
                                    className='w-3/5 h-14 border rounded-md px-2 justify-start items-start border-gray-300'
                                    placeholder="Product Name"
                                    placeholderTextColor="black"
                                    maxLength={99}
                                    multiline={true}
                                    value={productName}
                                    onChangeText={(text) => setProductName(text)}
                                />
                            </View>
                            <View className='w-full h-24 flex-row justify-evenly items-center'>
                                <Entypo name="price-tag" size={30} color="black" />
                                <TextInput
                                    className='w-3/5 h-14 border rounded-md px-2 justify-start items-start border-gray-300'
                                    placeholder="Size"
                                    placeholderTextColor="black"
                                    enablesReturnKeyAutomatically={true}
                                    value={size}
                                    onChangeText={(text) => setSize(text)}
                                />
                            </View>
                            <View className='w-full h-24 flex-row justify-evenly items-center'>
                                <FontAwesome5 name="coins" size={30} color="black" />
                                <TextInput
                                    className='w-3/5 h-14 border rounded-md px-2 justify-start items-start border-gray-300'
                                    placeholder="Price"
                                    keyboardType="numeric"
                                    placeholderTextColor="black"
                                    maxLength={4}
                                    value={price}
                                    enablesReturnKeyAutomatically={true}
                                    onChangeText={(text) => setPrice(text)}
                                />
                            </View>
                            {
                                advanced &&
                                <View className='w-full justify-center items-center'>
                                    <View className='w-full h-24 flex-row justify-evenly items-center'>
                                        <MaterialIcons name="edit" size={30} color="black" />
                                        <TextInput
                                            className='w-3/5 h-14 border rounded-md px-2 justify-start items-start border-gray-300'
                                            placeholder="Description"
                                            placeholderTextColor="black"
                                            multiline={true}
                                            maxLength={400}
                                            value={description}
                                            onChangeText={(text) => setDescription(text)}
                                        />
                                    </View>
                                    <View className='w-full h-24 flex-row justify-evenly items-center'>
                                        <MaterialIcons name="category" size={24} color="black" />
                                        <TextInput
                                            className='w-3/5 h-14 border rounded-md px-2 justify-start items-start border-gray-300'
                                            placeholder="Category"
                                            placeholderTextColor="black"
                                            multiline={true}
                                            maxLength={50}
                                            value={category}
                                            onChangeText={(text) => setCategory(text)}
                                        />
                                        {/* <DropDownPicker
                                            className='w-3/5 h-14 border rounded-md justify-start items-start border-gray-300'
                                            open={open}
                                            value={value}
                                            items={items}
                                            setOpen={setOpen}
                                            setValue={setValue}
                                            setItems={setItems}
                                        /> */}
                                    </View>
                                    <View className='w-full h-24 flex-row justify-evenly items-center'>
                                        <Entypo name="new" size={24} color="black" />
                                        <TextInput
                                            className='w-3/5 h-14 border rounded-md px-2 justify-start items-start border-gray-300'
                                            placeholder="Condition"
                                            placeholderTextColor="black"
                                            multiline={true}
                                            maxLength={400}
                                            value={productCondition}
                                            onChangeText={(text) => setProductCondition(text)}
                                        />
                                    </View>
                                    <View className='w-full h-24 flex-row justify-evenly items-center'>
                                        <Fontisto name="hashtag" size={24} color="black" />
                                        <TextInput
                                            className='w-3/5 h-14 border rounded-md px-2 justify-start items-start border-gray-300'
                                            placeholder="Tags"
                                            placeholderTextColor="black"
                                            multiline={true}
                                            maxLength={60}
                                            value={tags}
                                            onChangeText={(text) => setTags(text)}
                                        />
                                    </View>
                                    {/* <View className='w-full h-32 flex-col items-center justify-evenly'>
                                        <Text className='text-lg'>Additional Photos</Text>
                                        <TouchableOpacity className='h-16 w-16 items-center justify-center rounded-lg bg-cyan-800' onPressOut={() => pickAdditionalImages()}>
                                            <FontAwesome5 name="images" size={24} color="white" />
                                        </TouchableOpacity>
                                        <Text className='text-base text-gray-500'>{imageSum}/5</Text>
                                    </View>
                                    {image?.length &&
                                        <View className='w-full h-56 flex-row items-center justify-evenly'>
                                            <View className='w-14 h-20 bg-slate-500'>
                                                <View className='w-full h-full'>
                                                    {
                                                        image[1] &&
                                                        <Image source={{ uri: image[1] }} className='w-full h-fit' />
                                                    }
                                                </View>
                                            </View>
                                            <View className='w-14 h-20 bg-slate-500'>
                                                <View className='w-full h-full'>
                                                    {
                                                        image[2] &&
                                                        <Image source={{ uri: image[2] }} className='w-full h-fit' />
                                                    }
                                                </View>
                                            </View>
                                            <View className='w-14 h-20 bg-slate-500'>
                                                <View className='w-full h-full'>
                                                    {
                                                        image[3] &&
                                                        <Image source={{ uri: image[3] }} className='w-full h-fit' />
                                                    }
                                                </View>
                                            </View>
                                            <View className='w-14 h-20 bg-slate-500'>
                                                <View className='w-full h-full'>
                                                    {
                                                        image[4] &&
                                                        <Image source={{ uri: image[4] }} className='w-full h-fit' />
                                                    }
                                                </View>
                                            </View>
                                            <View className='w-14 h-20 bg-slate-500'>
                                                <View className='w-full h-full'>
                                                    {
                                                        image[5] &&
                                                        <Image source={{ uri: image[5] }} className='w-full h-fit' />
                                                    }
                                                </View>
                                            </View>
                                        </View> */}
                                    {/* } */}
                                </View>
                            }
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.buttonArea} className='w-full justify-center items-center'>
                    <TouchableOpacity onPress={Submit} className='w-4/6 h-12 items-center justify-center rounded-xl bg-black'>
                        <Text className='text-white text-xl font-bold'>POST</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default NewPost

