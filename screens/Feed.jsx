import { Dimensions, FlatList, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Post from "../components/Post";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../components/AppContext";
import axios from "axios";


export default function Feed() {
    const navigation = useNavigation()
    const { wishList } = useContext(AppContext)
    const [feed, setFeed] = useState([])
    const [reload, setReload] = useState(false)
    const [array, setArray] = useState([{
        img: "https://i.etsystatic.com/12686376/r/il/606a8c/2261350622/il_fullxfull.2261350622_soii.jpg",
        seller: 'Roy Rutzky',
        size: 'XL',
        price: '60₪',
        images: ['https://images.pexels.com/photos/1232459/pexels-photo-1232459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'https://images.pexels.com/photos/1337477/pexels-photo-1337477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
        img: "https://www-konga-com-res.cloudinary.com/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/media/catalog/product/F/Q/201297_1653303974.jpg",
        seller: 'Tal Ben Ari',
        size: 'M',
        price: '50₪',
        images: [],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fug'
    },
    {
        img: "https://cdn.shopify.com/s/files/1/0305/6438/4908/products/z091_1bcb0479-3896-4fec-80d7-37ff3fe5c2f9_5000x.jpg?v=1635328696",
        seller: 'RaviChat',
        size: 'L',
        price: '67₪',
        images: [],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fug Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fug'
    },
    {
        img: "https://images.wsj.net/im-234492/?width=860&height=1290",
        seller: 'KuberNati',
        size: 'S',
        price: '40₪',
        images: [],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fug'
    },])

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_BACKEND_ANALYTICS_URL}/getFeed`)
                console.log('feed' , res.data[0].tags)
                setFeed(res.data)
            } catch (error) {
                console.log('feed error: ' , error)
                alert('There has been a problem')
            }
        }
        getProducts()
    }, [reload]);
    
    const renderItems = ({ item, index }) => {                
        return (
            <View key={index} style={{ flex: 1, height: Dimensions.get('window').height - 200 }}>
                <Post
                    post={array[index]}
                    navigation={navigation}
                />
            </View>
        )
    }
    const [indexCount, setIndexCount] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = async () => {
        setRefreshing(true)
        setReload(!reload)
        setRefreshing(false)
    }
    const handleAnalytics = () => {
        console.log(`post ${indexCount} is shown`)
    }
    console.log(indexCount);
    return (
        <View className='flex-1'>
            <FlatList
                data={array}
                pagingEnabled
                keyExtractor={(item , index) => index.toString()}
                renderItem={renderItems}
                decelerationRate='fast'
                refreshing={refreshing}
                onRefresh={onRefresh}
                onMomentumScrollEnd={()=>setIndexCount(indexCount + 1)}
            />
        </View>
    );
}

