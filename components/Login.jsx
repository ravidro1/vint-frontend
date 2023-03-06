import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import axios from 'axios';

function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async () => {
        try {
            const res = await axios.post(`http://localhost:${process.env.BACKENDURL}/login`, {userName: userName, password: password});
            console.log(res);
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