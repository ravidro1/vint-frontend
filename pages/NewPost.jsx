import React, { useState } from 'react'
import { Alert, Dimensions, Image, Keyboard, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import { FontAwesome5, Entypo } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const NewPost = () => {

    const [image, setImage] = useState(null);
    const [advanced, setAdvanced] = useState(false);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        advancedFeaturesContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000000',
            margin: 5,
            padding: 10,
            borderRadius: 8,
            marginTop: 12,
        },
        advancedInputsContainer: {
            backgroundColor: '#c9c9c9',
            height: 400,
            width: '100%',
            justifyContent: 'flex-start',
            alignItems: 'start',
            paddingHorizontal: 20,
        },
        advancedFeatures: {
            fontSize: 16,
            color: 'white',
        },
        header: {
            flex: 0.6,
            justifyContent: 'center',
            alignItems: 'center',
            height: 100,
            width: Dimensions.get('window').width,
            marginTop: 60,
            paddingBottom: 12
        },
        textContainer: {
            height: '40%',
            width: '100%',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        iconContainer: {
            height: '50%',
            width: '100%',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        sizeInput: {
            width: 80,
            height: 16,
            borderBottomWidth: 1,
            borderBottomColor: 'black',
            borderRadius: 4,
            margin: 12
        },
        priceInput: {
            width: 80,
            height: 16,
            borderBottomWidth: 1,
            borderBottomColor: 'black',
            borderRadius: 4,
            margin: 12
        },
        productInput: {
            width: 120,
            height: 24,
            borderBottomWidth: 1,
            borderBottomColor: 'black',
            borderRadius: 4,
            margin: 12
        },
        descriptionInput: {

            width: 120,
            height: 24,
            borderBottomWidth: 1,
            borderBottomColor: 'black',
            borderRadius: 4,
            margin: 12
        },
        button: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            paddingHorizontal: 32,
            borderRadius: 4,
            elevation: 3,
            backgroundColor: 'black',
            width: '80%'
        },
        text: {
            fontSize: 18,
            lineHeight: 21,
            fontWeight: 'bold',
            letterSpacing: 0.25,
            color: 'white',
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

    const takePhotoFromCamera = () => {
        ImagePicker.requestCameraPermissionsAsync()
        ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        })
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
            setImage(result.assets[0].uri);
        }
    }

    return (
        // <Pressable className='w-full h-full' onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1, height: Dimensions.get('window').height - 100 }} className='flex-1 bg-black'>
            <StatusBar style='light' />
            <View style={styles.header}>
                <Text className='font-bold text-4xl text-white'>New Post</Text>
            </View>
            <View className='flex-auto items-center justify-evenly overflow-scroll bg-white'>
                <Pressable className='justify-start items-start w-full ml-5 mt-5' onPress={() => setAdvanced(!advanced)}>
                    <Text>{advanced ? 'Hide Advanced Features -' : 'Show Advanced Features +'}</Text>
                </Pressable>
                <Pressable className='h-[30vh] w-[45vw] bg-indigo-200 mt-6 rounded-xl' onPressOut={() => pickImage()}>
                    {!image &&
                        <View className='flex justify-center items-center'>
                            <View style={styles.textContainer}>
                                <Text className='text-xl text-black mt-4'>Main Photo</Text>
                            </View>
                            <View style={styles.iconContainer}>
                                <AntDesign name="plus" size={56} color="black" />
                            </View>
                        </View>
                    }
                    {image && <Image className='rounded-xl' source={{ uri: image }} style={{ width: '100%', height: '100%' }} />}
                </Pressable>


                <View className='w-full justify-center items-center m-5'>
                    <Pressable style={styles.button}>
                        <Text style={styles.text}>POST</Text>
                    </Pressable>
                </View>
            </View>
        </View>
        // </Pressable >
    )
}

export default NewPost


                {/* {!advanced ?
                    <View className='w-full h-1/6 flex-col items-center'>
                        <View className='w-full flex-row justify-center items-center'>
                            <Ionicons name="ios-shirt" size={24} color="black" />
                            <TextInput
                                style={styles.productInput}
                                placeholder="Product Name"
                                placeholderTextColor="black"
                                maxLength={99}
                            />
                        </View>
                        <View className='w-[90vw] mt-8 flex flex-row justify-around items-center mb-4'>
                            <View className='flex flex-row items-center'>
                                <Entypo name="price-tag" size={30} color="black" />
                                <TextInput
                                    style={styles.sizeInput}
                                    placeholder="Size"
                                    placeholderTextColor="black"
                                    enablesReturnKeyAutomatically={true}
                                />
                            </View>
                            <View className='flex flex-row items-center'>
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
                    </View>
                    :
                    <ScrollView className='w-full h-1/6 flex-col m-10'>
                        <View className='w-full flex-col items-center'>
                            <View className='w-full flex-row justify-center items-center'>
                                <Ionicons name="ios-shirt" size={30} color="black" />
                                <TextInput
                                    style={styles.productInput}
                                    placeholder="Product Name"
                                    placeholderTextColor="black"
                                    maxLength={99}
                                />
                            </View>
                            <View className='w-[90vw] mt-8 flex flex-row justify-around items-center mb-4'>
                                <View className='flex flex-row items-center'>
                                    <Entypo name="price-tag" size={30} color="black" />
                                    <TextInput
                                        style={styles.sizeInput}
                                        placeholder="Size"
                                        placeholderTextColor="black"
                                    />
                                </View>
                                <View className='flex flex-row items-center'>
                                    <FontAwesome5 name="coins" size={30} color="black" />
                                    <TextInput
                                        style={styles.priceInput}
                                        placeholder="Price"
                                        keyboardType="numeric"
                                        placeholderTextColor="black"
                                        maxLength={4}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.advancedInputsContainer}>
                            <View className='flex-row '>
                                <MaterialIcons name="description" size={30} color="black" />
                                <TextInput
                                    style={styles.descriptionInput}
                                    placeholder="Dscription"
                                    placeholderTextColor="black"
                                    maxLength={300}
                                />
                            </View>
                        </View>
                    </ScrollView>
                } */}