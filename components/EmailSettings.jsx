import { View, Text, StyleSheet, Pressable, TextInput, } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { useState } from 'react';
import LottieView from 'lottie-react-native';

const EmailSettings = () => {

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);

    const styles = StyleSheet.create({
        upperModal: {
            flex: 1
        },
        lowerModal: {
            flex: 6
        },

    })

    function checkPassword() {
        setLoading(true)
        console.log(password)
        if (password === '123') {
            setTimeout(() => {
                setAuthenticated(true)
                setLoading(false)
            }, 2000);
        }
        else {
            setTimeout(() => {
                setAuthenticated(false)
                setLoading(false)
            }, 2000);
        }
    }



    return (
        <View className='h-full w-full flex-col bg-slate-50'>
            <View style={styles.upperModal} className='w-full h-16 justify-center items-center bg-slate-50'>
                <Text className='font-bold text-2xl'>E-mail Settings</Text>
            </View>
            <View style={styles.lowerModal} className='w-full bg-slate-200 justify-center'>
                <View className='h-12 w-full items-center justify-start'>
                    <Fontisto name="locked" size={24} color="black" />
                </View>
                {
                    (authenticated === false && loading === false) &&

                    <View className='w-full items-center flex-col'>
                        <Text className='text-lg'>Please Enter Password:</Text>
                        <TextInput className='h-12 w-3/5 bg-slate-50 border px-2 text-lg rounded-md mt-2' onChangeText={(text) => setPassword(text)} />
                        <Pressable className='h-10 w-1/4 items-center justify-center bg-sky-700 rounded-md mt-2' onPress={() => checkPassword()}>
                            <Text className='text-white text-lg'>Submit</Text>
                        </Pressable>
                    </View>
                }
                {
                    (loading === true) &&
                    <View className='w-full items-center justify-center flex-col'>
                        <LottieView
                            source={require('../assets/lottieLoader.json')}
                            style={{ width: 100, height: 100, justifyContent: 'center', alignItems: 'center' }}
                            autoPlay
                        />
                        <Text>Authenticating...</Text>
                    </View>

                }
                {
                    (authenticated === true && loading === false) &&

                    < View className='w-full items-center flex-col'>
                        <Text className='text-lg'>Enter Your New E-mail:</Text>
                        <TextInput className='h-12 w-3/5 bg-slate-50 border px-2 text-lg rounded-md mt-2' onChangeText={(text) => tempEmail = text} />
                        <Pressable className='h-10 w-2/5 items-center justify-center bg-emerald-500 rounded-md mt-2' onPress={() => setEmail(tempEmail)}>
                            <Text className='text-white text-md'>Set New E-mail</Text>
                        </Pressable>
                    </View>
                }
            </View>
        </View >
    )
}

export default EmailSettings