import React, { useEffect, useState } from 'react';
import { Alert, Button, Keyboard, StyleSheet, Text, TextInput, View } from 'react-native';
import axios from 'axios';
import { REACT_APP_BACKEND_URL } from '@env'
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';


function Login({ setView , setID , setToken, setEmail}) {
    // AsyncStorage.clear()
    const navigation = useNavigation()
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const progress = useSharedValue(0)
    const slide = useSharedValue(-500)

    const reanimtedStyle = useAnimatedStyle(() => {
        return {
            opacity: progress.value,
            transform: [{
                translateX: slide.value
            }]
        }
    }, [])

    useEffect(() => {
        slide.value = withTiming(0, { duration: 500 })
        progress.value = withTiming(1, { duration: 1200 })
    }, [])

    const handleForgotUser = () => {
        Alert.prompt(
            'Enter your Username',
            null,
            text => forgotPassword(text)
        );
    }
    const forgotPassword = async (userName) => {
        try {
            console.log(userName);
            const res = await axios.post(process.env.REACT_APP_BACKEND_URL + '/user/forgotPassword', { username: userName })
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async () => {
        try {
            const user = await AsyncStorage.getItem('user')
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/login`, { username: userName, password: password });
            setID(res.data.userID)
            setToken(res.data.token)
            setEmail(res.data.email)
            const isActive = res.data.isActive
            console.log('result: ', res.data);
            if (!isActive) {
                setView('VerifyEmail')
            }
            else {
                navigation.navigate('Home')
                await AsyncStorage.setItem('token', JSON.stringify(res.data.token));
                await AsyncStorage.setItem('user', JSON.stringify(res.data.userID));
            }
        } catch (error) {
            console.log('error: ', error);
        }
    }
    return (
        <View className='h-full w-full bg-sky-900 rounded-3xl flex p-3 items-center justify-start mt-24'>
            <Animated.View style={reanimtedStyle}>
                <TextInput id='input' onChangeText={(e) => setUserName(e)} className="w-[70vw] h-12 rounded-md bg-sky-200 p-2 mb-10 text-left" placeholder='User Name' />
                <TextInput id='input' onChangeText={(e) => setPassword(e)} className="w-[70vw] h-12 rounded-md bg-sky-200 p-2 text-left" placeholder='Password' />
            </Animated.View>
            <TouchableOpacity onPress={handleForgotUser}>
                <Text className='mb-12 mt-5 text-sky-300'>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit}>
                <View className='w-[40vw] h-12 bg-sky-500 rounded-full flex justify-center items-center mb-5'>
                    <Text className='text-sky-900 font-bold'>SIGN IN</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setView('signUp')}>
                <View className='w-[40vw] h-12 border-2 border-sky-500 rounded-full flex justify-center items-center'>
                    <Text className='text-sky-500'>SIGN UP</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default Login