import React, { useState } from 'react'
import { Alert, Dimensions, Image, Keyboard, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5, Entypo } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import * as ImageManipulator from 'expo-image-manipulator';


const NewPost = () => {

    const [imageUri, setImageUri] = useState(null);
    const [image, setImage] = useState(null);
    const [advanced, setAdvanced] = useState(false);

    const styles = StyleSheet.create({
        header: {
            flex: 1,
        },
        body: {
            flex: 6,
        },
        photoArea: {
            flex: 2,
        },
        inputsArea: {
            flex: 1,
        },
        buttonArea: {
            flex: 1,
        },
        iconContainer: {
            flex: 1,
        },
    })

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

    const takePhotoFromCamera = async () => {
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        })
        console.log(result);

        if (result) {
            setImage(result.assets[0].uri);
            setImageUri(result.assets[0].uri);
        }
    }
    const choosePhotoFromLibrary = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        })

        console.log(result);

        if (result) {
            setImage(result.assets[0].uri)
            setImageUri(result.assets[0].uri)
        }
    }

    const cropImage = async () => {
        const croppedImage = await ImageManipulator.manipulateAsync(
            imageUri,
            [{ crop: { originX: 0, originY: 0, width: 300, height: 400 } }],
            { compress: 1, format: ImageManipulator.SaveFormat.PNG }
        );

        setImageUri(croppedImage.uri);
        setImage(croppedImage.uri);
    };

    return (
        // <Pressable className='w-full h-full' onPress={() => Keyboard.dismiss()}>
        <View className='flex-1 bg-black'>
            <StatusBar style='light' />
            <SafeAreaView />
            <View style={styles.header} className='w-full items-center justify-center' >
                <Text className='text-white text-5xl font-bold'>New Post</Text>
            </View>
            <View style={styles.body} className='w-full items-center bg-slate-50'>
                <View style={styles.photoArea} className='justify-center items-center'>
                    <Pressable className='justify-start items-start w-full' onPress={() => setAdvanced(!advanced)}>
                        <Text>{advanced ? 'Hide Advanced Features -' : 'Show Advanced Features +'}</Text>
                    </Pressable>
                    <View className='w-full justify-center items-center mb-2 mt-4'>
                        <Text className='text-xs font-semibold text-black'>Main Photo</Text>
                    </View>
                    <Pressable className='h-[18vh] w-[24vw] justify-center items-center bg-indigo-200 rounded-xl' onPressOut={() => pickImage()}>
                        {!image &&
                            <View className='w-full h-full flex-col justify-center items-center'>
                                <View style={styles.iconContainer} className='w-full justify-center items-center'>
                                    <AntDesign name="plus" size={32} color="black" />
                                </View>
                            </View>
                        }
                        {image &&
                            <Image className='w-full h-full rounded-xl' source={{ uri: image }} />
                        }
                    </Pressable>
                    {image &&
                        <View className='w-full h-12 flex-col justify-center items-center'>
                            <Pressable className='w-full flex-row items-center' onPress={() => setImage(null)}>
                                <MaterialCommunityIcons name="delete-outline" size={24} color="black" />
                                <Text>Delete Photo</Text>
                            </Pressable>
                        </View>
                    }
                    {/* < View style={styles.container} >
                        <TouchableOpacity onPress={pickImage}>
                            <Text style={styles.button}>Choose Image</Text>
                        </TouchableOpacity>

                        {
                            imageUri && (
                                <>
                                    <Image source={{ uri: imageUri }} className='h-12 w-12'/>
                                    <TouchableOpacity onPress={cropImage}>
                                        <Text>Crop Image</Text>
                                    </TouchableOpacity>
                                </>
                            )
                        }
                    </View > */}
                </View>
                <View style={styles.inputsArea}>
                    <ScrollView>
                        <View className='w-full flex-col justify-start items-center'>
                            <View className='w-full h-36 flex-row justify-evenly items-center'>
                                <Ionicons name="ios-shirt" size={32} color="black" />
                                <TextInput
                                    className='w-3/5 h-14 border rounded-md px-2 justify-start items-start border-gray-300'
                                    placeholder="Product Name"
                                    placeholderTextColor="black"
                                    maxLength={99}
                                    multiline={true}
                                />
                            </View>
                            <View className='w-full h-36 flex-row justify-center items-center'>
                                <Entypo name="price-tag" size={30} color="black" />
                                <TextInput
                                    style={styles.sizeInput}
                                    placeholder="Size"
                                    placeholderTextColor="black"
                                    enablesReturnKeyAutomatically={true}
                                />
                            </View>
                            <View className='w-full h-36 flex-row justify-center items-center'>
                                <FontAwesome5 name="coins" size={30} color="black" />
                                <TextInput
                                    style={styles.priceInput}
                                    placeholder="Price"
                                    keyboardType="numeric"
                                    placeholderTextColor="black"
                                    maxLength={4}
                                    enablesReturnKeyAutomatically={true}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.buttonArea} className='w-full justify-center items-center'>
                    <Pressable className='w-4/6 h-12 items-center justify-center rounded-xl bg-black'>
                        <Text className='text-white text-xl font-bold'>POST</Text>
                    </Pressable>
                </View>
            </View>
        </View>
        // </Pressable >
    )
}

export default NewPost

    // import React, { useState } from 'react';
    // import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
    // import { ImageManipulator } from 'expo-image-manipulator';
    // import * as ImagePicker from 'expo-image-picker';

    // export default function App() {

    //     const pickImage = async () => {
    //         let result = await ImagePicker.launchImageLibraryAsync({
    //             mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //             allowsEditing: true,
    //             aspect: [1, 1],
    //             quality: 1,
    //         });

    //         if (!result.cancelled) {
    //             setImageUri(result.uri);
    //         }
    //     };



//     return (

//     );
// }

