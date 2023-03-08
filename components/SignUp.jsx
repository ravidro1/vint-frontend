import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import axios from "axios";

const SignUp = () => {
    const [userName, setUserName] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [phone,setPhone] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async () => {
        try {
            console.log(process.env.REACT_APP_BACKEND_URL)
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/signUp`,
                { username: userName, password: password, email:email, phone:phone, name:name });
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <View className='h-full w-full bg-white rounded-md flex p-3 items-center'>
            <Text className='text-black '>Sign Up</Text>
            <View className='h-full flex flex-col items-center justify-center gap-8'>
                <TextInput onChangeText={(e) => setUserName(e)} className="w-56 h-9 rounded-md bg-slate-200 p-2" placeholder='User Name' />
                <TextInput onChangeText={(e) => setName(e)} className="w-56 h-9 rounded-md bg-slate-200 p-2" placeholder=' Name' />
                <TextInput onChangeText={(e) => setPhone(e)} className="w-56 h-9 rounded-md bg-slate-200 p-2" placeholder='phone' />
                <TextInput onChangeText={(e) => setEmail(e)} className="w-56 h-9 rounded-md bg-slate-200 p-2" placeholder='Email' />
                <TextInput onChangeText={(e) => setPassword(e)} className="w-56 h-9 rounded-md bg-slate-200 p-2" placeholder='Password' />
                <TextInput onChangeText={(e) => setConfirmPassword(e)} className="w-56 h-9 rounded-md bg-slate-200 p-2" placeholder='Confirm Password' />
                <Button title='Submit' onPress={handleSubmit} />
            </View>
        </View>
    )
};

export default SignUp;