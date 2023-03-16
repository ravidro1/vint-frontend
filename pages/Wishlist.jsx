import { View, Text, SafeAreaView, FlatList, Dimensions, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AppContext } from '../components/AppContext';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';


const Wishlist = () => {


    const { wishList } = useContext(AppContext)
    const styles = StyleSheet.create({
        container: {
            height: Dimensions.get('screen').height - 100,
            width: Dimensions.get('screen').width,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000000',
        },
        header: {
            backgroundColor: '#000000',
            height: 100,
            width: Dimensions.get('screen').width,
            justifyContent: 'center',
            alignItems: 'center',
        },
        list: {
            height: Dimensions.get('screen').height - 100,
            width: Dimensions.get('screen').width,
            flex: 1,
            backgroundColor: '#c1ecff',
        },
        post: {
            flex: 1,
            // display: 'flex',
            // flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: 200,
            backgroundColor: '#ffffff',
            margin: 3,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: '#a7a7a7',
        },
        invisible: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            height: 140,
            backgroundColor: '#626262',
            margin: 2,
            borderRadius: 4,
            backgroundColor: 'transparent',
        }
    });


    const renderItem = ({ item, index }) => {
        if (wishList?.userProducts?.length % 2 !== 0 && index === wishList?.userProducts?.length - 1) {
            return (
                <View className='w-full flex-row justify-start items-center px-1'>
                    <TouchableOpacity key={index} className='w-[184] h-64 m-1 bg-slate-300 rounded-lg'>
                        <View className='flex-[4] w-full'>
                            <Image source={{ uri: item.media[0].url }} className='h-full w-full rounded-t-lg' />
                        </View>
                        <View className='flex-[1] flex-col items-start justify-evenly px-2'>
                            <View className='w-full flex-row justify-start items-center'>
                                <Ionicons name="ios-shirt" size={12} color="black" />
                                <Text style={{ color: 'Black', fontSize: 10, fontWeight: 500, marginLeft: 4 }}>{item.name}</Text>
                            </View>
                            <View className='w-full flex-row justify-start items-center'>
                                <FontAwesome5 name="coins" size={12} color="black" />
                                <Text style={{ color: 'Black', fontSize: 10, fontWeight: 500, marginLeft: 4 }}>{item.price} ₪</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }
        else {
            return (
                <TouchableOpacity key={index} className='w-[184] h-64 m-1 bg-slate-300 rounded-lg'>
                    <View className='flex-[4] w-full'>
                        <Image source={{ uri: item.media[0].url }} className='h-full w-full rounded-t-lg' />
                    </View>
                    <View className='flex-[1] flex-col items-start justify-evenly px-2'>
                        <View className='w-full flex-row justify-start items-center'>
                            <Ionicons name="ios-shirt" size={12} color="black" />
                            <Text style={{ color: 'Black', fontSize: 10, fontWeight: 500, marginLeft: 4 }}>{item.name}</Text>
                        </View>
                        <View className='w-full flex-row justify-start items-center'>
                            <FontAwesome5 name="coins" size={12} color="black" />
                            <Text style={{ color: 'Black', fontSize: 10, fontWeight: 500, marginLeft: 4 }}>{item.price} ₪</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
    }

    return (
        <View style={styles.container}>
            {/* <SafeAreaView /> */}
            <StatusBar style='light' />
            <View className='h-32 w-full flex justify-end items-center bg-sky-900'>
                <Text className='text-white font-bold text-3xl mb-5'>Wish List</Text>
            </View>
            <FlatList
                style={styles.list}
                data={wishList}
                renderItem={renderItem}
                numColumns='2'
            >
            </FlatList>
        </View>
    )
}

export default Wishlist