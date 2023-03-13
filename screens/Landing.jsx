import { StatusBar } from 'expo-status-bar';
import { Button, Dimensions, Image, Keyboard, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Login from '../components/Login';
import { useEffect, useState } from 'react';
import SignUp from '../components/SignUp';
import Vlogo from "../assets/V-logo.png";
import Modal from 'react-native-modal'
import { TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import VerifyEmail from '../components/VerifyEmail';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Register({ navigation }) {
    const [view, setView] = useState('signIn')
    const [ID, setID] = useState('');
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');
    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                navigation.navigate('Home')
            }
            else {
                console.log(token);
            }
        }
        checkToken()
    }, []);

    return (
        <View style={{ height: Dimensions.get('window').height }} className="bg-sky-900 items-center">
            <SafeAreaView />
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} className='flex justify-center items-center'>
                <View className='h-1/4 flex justify-center items-center'>
                    <Image source={Vlogo} className='mt-12 bg-transparent shadow-md shadow-sky-300/70 ' />
                </View>
                <KeyboardAvoidingView behavior='height' enabled={view === 'signIn' ? false : true}>
                    <View className='flex h-3/4 w-5/6 justify-center items-center '>
                        {view === 'signIn' ? <Login setView={setView} setID={setID} setToken={setToken} setEmail={setEmail}/>
                            : view === 'signUp' ?
                                <SignUp setView={setView} setID={setID} setToken={setToken} setEmail={setEmail}/>
                                :
                                <VerifyEmail ID={ID} token={token} email={email}/>
                        }
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </View>
    )
}


export default Register