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

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_BACKEND_ANALYTICS_URL}/getFeed`)
                console.log('feed' , res.data[0])
                setFeed(res.data)
            } catch (error) {
                console.log('feed error: ' , error)
                // alert('There has been a problem')
            }
        }
        getProducts()
    }, [reload]);
    
    const renderItems = ({ item, index }) => {                
        return (
            <View key={index} style={{ flex: 1, height: Dimensions.get('window').height - 200 }}>
                <Post
                    post={feed[index]}
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
                data={feed}
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

