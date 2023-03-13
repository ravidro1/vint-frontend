import React, { useEffect, useState } from 'react';
import { Alert, Button, Keyboard, StyleSheet, Text, TextInput, View } from 'react-native';
import axios from 'axios';
import { REACT_APP_BACKEND_URL } from '@env'
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

function VerifyEmail({ setView, ID , token, email}) {
    const navigation = useNavigation()
    const progress = useSharedValue(0)
    const slide = useSharedValue(-500)
    const [verificationCode, setVerificationCode] = useState('');

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

    const verifyEmail = async () => {
        try {
            console.log('hi' , ID);
            const res = await axios.post(process.env.REACT_APP_BACKEND_URL + '/user/verifyEmail', { userID: ID, code: verificationCode })
            console.log(res);
            navigation.navigate('Home')
            console.log('the token is ', token);
            console.log('the id is ', ID);
            await AsyncStorage.setItem('token', JSON.stringify(token));
            await AsyncStorage.setItem('user', JSON.stringify(ID));
        } catch (error) {
            console.log(error);
            alert('Invalid Code')
        }
    }

    const sendAgain = async () => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/sendVerifyEmailAgain`, { userID: ID , email})
            console.log(res.data);
        } catch (error) {
            console.log(error);
            alert('There has been a problem resending the email')       
        }
    }
    return (
        <View className='h-full w-full bg-sky-900 rounded-3xl flex p-3 items-center justify-start mt-24'>
            <Animated.View style={reanimtedStyle}>
                <TextInput id='input' keyboardType='numeric' onChangeText={(e) => setVerificationCode(e)} className="w-[50vw] h-16 rounded-xl bg-sky-200 p-2 mb-10 text-center" placeholder='X X X X X X' />
            </Animated.View>
            <TouchableOpacity onPress={verifyEmail}>
                <View className='w-[40vw] h-12 bg-sky-500 rounded-full flex justify-center items-center mb-5'>
                    <Text className='text-sky-900 font-bold'>VERIFY</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={sendAgain}>
                <Text className='mb-12 mt-5 text-sky-300'>Send me a code again</Text>
            </TouchableOpacity>
        </View>
    )
}

export default VerifyEmail