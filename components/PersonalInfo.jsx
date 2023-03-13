import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const PersonalInfo = () => {

    const styles = StyleSheet.create({
        upperModal: {
            flex: 1
        },
        lowerModal: {
            flex: 6
        },
    })

    return (
        <View className='h-full w-full flex-col bg-slate-50'>
            <View style={styles.upperModal} className='w-full h-16 justify-center items-center bg-black'>
                <Text className='font-bold text-2xl text-white'>Personal Information</Text>
            </View>
            <View style={styles.lowerModal} className='w-full flex-col items-start justify-evenly bg-slate-50'>
                <View className='w-full flex-row justify-between pl-6 pr-10 '>
                    <Text className='text-lg font-semibold'>Full Name:</Text>
                    <Text className='text-lg'>Full Name</Text>
                </View>
                <View className='w-full flex-row justify-between pl-6 pr-10 '>
                    <Text className='text-lg font-semibold'>E-mail Address:</Text>
                    <Text className='text-lg'>E-mail Address</Text>
                </View>
                <View className='w-full flex-row justify-between pl-6 pr-10 '>
                    <Text className='text-lg font-semibold'>Phone Number:</Text>
                    <Text className='text-lg'>Phone Number</Text>
                </View>
            </View>
        </View >
    )
}

export default PersonalInfo