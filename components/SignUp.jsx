import React, { useEffect, useState } from 'react';
import { Alert, Button, KeyboardAvoidingView, Text, TextInput, View } from 'react-native';
import axios from "axios";
import { REACT_APP_BACKEND_URL } from '@env'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
const SignUp = ({ setView, setID, setToken, setEmail }) => {
    const [userName, setUserName] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('');
    const [myMail, setMyMail] = useState('');
    const progress = useSharedValue(0)
    const slide = useSharedValue(500)
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

    const handleSubmit = async () => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/signUp`,
                { username: userName, password: password, email: myMail, phone: phone, name: name });
            console.log(res.data);
            setToken(res.data.token);
            setID(res.data.userID);
            setEmail(res.data.email);
            setView('VerifyEmail')
        } catch (error) {
            console.log('err', error);
            Alert.alert(
                'Error',
                error.response.data.message,
                [
                    {
                        text: 'OK', onPress: () => {
                            setUserName('')
                            setName('')
                            setPhone('')
                            setMyMail('')
                            setPassword('')
                            setConfirmPassword('')
                        }
                    },
                ])
        }
    }
    return (
        <View className='h-full w-full bg-sky-900 rounded-3xl flex p-3 items-center justify-start'>
            <Animated.View style={reanimtedStyle}>
                <TextInput onChangeText={(e) => setUserName(e)} className="w-[70vw] h-12 rounded-md bg-sky-200 p-2 mb-5 text-left" placeholder='User Name' />
                <TextInput onChangeText={(e) => setName(e)} className="w-[70vw] h-12 rounded-md bg-sky-200 p-2 mb-5 text-left" placeholder=' Full Name' />
                <TextInput keyboardType='numeric' textContentType='telephoneNumber' onChangeText={(e) => setPhone(e)} className="w-[70vw] h-12 rounded-md bg-sky-200 p-2 mb-5 text-left" placeholder='phone' />
                <TextInput keyboardType='email-address' textContentType='emailAddress' onChangeText={(e) => setMyMail(e)} className="w-[70vw] h-12 rounded-md bg-sky-200 p-2 mb-5 text-left" placeholder='Email' />
                <TextInput textContentType='password' onChangeText={(e) => setPassword(e)} className="w-[70vw] h-12 rounded-md bg-sky-200 p-2 mb-5 text-left" placeholder='Password' />
                <TextInput onChangeText={(e) => setConfirmPassword(e)} className="w-[70vw] h-12 rounded-md bg-sky-200 p-2 mb-10 text-left" placeholder='Confirm Password' />
            </Animated.View>
            <TouchableOpacity onPress={handleSubmit}>
                <View className='w-[40vw] h-12 bg-sky-500 rounded-full flex justify-center items-center mb-5'>
                    <Text className='text-sky-900 font-bold'>SIGN UP</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setView('signIn')}>
                <View className='w-[40vw] h-12 border-2 border-sky-500 rounded-full flex justify-center items-center'>
                    <Text className='text-sky-500'>SIGN IN</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
};

export default SignUp;