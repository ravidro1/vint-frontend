import { View, Text, StyleSheet, Pressable, TextInput, } from 'react-native';
import { useState } from 'react';
import LottieView from 'lottie-react-native';
import { Octicons } from '@expo/vector-icons';
import { Alert } from 'react-native';


const DeleteAccount = () => {

    const [password, setPassword] = useState('');
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
                <Text className='font-bold text-2xl'>Delete Account</Text>
            </View>
            <View style={styles.lowerModal} className='w-full bg-slate-200 justify-center'>
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

                    < View className='w-full items-center justify-center flex-col'>
                        <Octicons name="stop" size={42} color="black"/>
                        <Text className='text-xs my-6'>* There is no restoration of deleted accounts *</Text>
                        <Pressable className='h-16 w-3/5 items-center justify-center bg-red-700 rounded-xl mt-10' onPress={() => {
                            Alert.alert(
                                'Delete Account',
                                'Are you sure you want to delete your account?',
                                [
                                    {
                                        text: 'Cancel',
                                        onPress: () => console.log('Cancel Pressed'),
                                        style: 'cancel'
                                    },
                                    {
                                        text: 'delete',
                                        onPress: () => {
                                            setLoading(true)
                                            setTimeout(() => {
                                                setAuthenticated(false)
                                                setLoading(false)
                                            }, 2000);
                                        },
                                        style: 'destructive'
                                    }
                                ]
                            )
                        }}>
                            <Text className='text-white text-lg font-bold'>Delete Account</Text>
                        </Pressable>
                    </View>
                }
            </View>
        </View >
    )
}

export default DeleteAccount