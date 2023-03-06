import { StatusBar } from 'expo-status-bar';
import { Button, Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Login from '../components/Login';
import { useEffect, useState } from 'react';
import SignUp from '../components/SignUp';

function Register() {
    const [view, setView] = useState('signIn')
    return (
        <View style={{ height: Dimensions.get('window').height - 100 }} className="bg-sky-700 flex justify-around items-center">
            <SafeAreaView />
            <Text className='text-sky-100 text-3xl pt-5 font-bold uppercase'>Welcome To VINT</Text>
            <View className='w-full flex flex-row justify-center'>
                <TouchableOpacity className='bg-sky-200 flex justify-center items-center h-10 w-16 rounded-md  mr-3' title='Sign In' onPress={() => setView('signIn')} >
                    <Text className='text-sky-900 font-bold'>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity className='bg-sky-200 flex justify-center items-center h-10 w-16 rounded-md ml-3' title='Sign In' onPress={() => setView('signUp')} >
                    <Text className='text-sky-900 font-bold'>Sign Up</Text>
                </TouchableOpacity>
            </View>
            <View id='loginBox' className="h-1/2 w-4/6 rounded-xl p-5 bg-sky-200">
                {view === 'signIn' && <Login />}
                {view === 'signUp' && <SignUp />}
            </View>
        </View>
    )
}

export default Register