import { View, Text, SafeAreaView, FlatList, Dimensions, Image } from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AppContext } from '../components/AppContext';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Wishlist = () => {
    // const { wishList } = useContext(AppContext)
    const [wishList,setWishList] = useState([])
    useEffect(()=>{
        async function getWishList(){
            let userID = await AsyncStorage.getItem("user")
            console.log(userID)
            axios.post(process.env.REACT_APP_BACKEND_URL + '/user/getWishList', {userID: JSON.parse(userID)}).then((wish)=>{
                if (wish.data.wishList){
                setWishList(wish.data.wishList)
                }
                console.log(" this is wishlist", wish.data.wishList)
            })
        }
        getWishList()
    },[])
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
            // backgroundColor: '#626262',
            margin: 2,
            borderRadius: 4,
            backgroundColor: 'transparent',
        }
    });

    const tempArray = [
        {
            productName: 't-shirt',
            price: '99$'
        },
        {
            productName: 'pants',
            price: '199$'
        },
        {
            productName: 'Nike t-shirt',
            price: '79$'
        },
        {
            productName: 'Balenciaga t-shirt',
            price: '399$'
        },
        {
            productName: 'Diesel Jeans',
            price: '299$'
        },
        {
            productName: 'fleece Jacket',
            price: '149$'
        },
        {
            productName: 'polo shirt',
            price: '34$'
        },
        {
            productName: 'Adidas t-shirt',
            price: '69$'
        },
        {
            productName: 'jacket',
            price: '119$'
        },
    ]

    const formatData = (dataList, numColumns) => {
        const totalRows = Math.floor(dataList.length / numColumns)
        let totalLastRow = dataList.length - (totalRows * numColumns)

        while (totalLastRow !== 0 && totalLastRow !== numColumns) {
            dataList.push({ key: 'blank', empty: true });
            totalLastRow++
        }
        return dataList
    }

    const renderItem = ({ item, index }) => {
        if (item.empty) {
            return (
                <View style={styles.invisible}>
                </View>
            )
        }
        return (
            <View key={index} style={styles.post}>
                <Image source={item.media[0].url}></Image>
                <Text style={{ color: 'black' }}>{item.name}</Text>
                <Text style={{ color: 'black' }}>{item.price[0]}</Text>
            </View>
        )
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
                data={formatData(wishList, 2)}
                renderItem={renderItem}
                numColumns='2'
            >
            </FlatList>
        </View>
    )
}

export default Wishlist