import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import axios from 'axios';
import {REACT_APP_BACKEND_URL} from '@env'

function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async () => {
        try {
            const env = REACT_APP_BACKEND_URL;
            console.log(env)
            const res = await axios.post(`http://192.168.50.83:8081/api/v1/user/login`, {username: userName, password: password});
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <View className='h-full w-full bg-white rounded-md flex p-3 items-center'>
            <Text className='text-black '>Sign In</Text>
            <View className='h-full flex flex-col items-center justify-center gap-8'>
                <TextInput onChangeText={(e) => setUserName(e)} className="w-56 h-9 rounded-md bg-slate-200 p-2" placeholder='User Name' />
                <TextInput onChangeText={(e) => setPassword(e)} className="w-56 h-9 rounded-md bg-slate-200 p-2" placeholder='Password' />
                <Button title='Submit' onPress={handleSubmit}/>
            </View>
        </View>
    )
}

export default Login