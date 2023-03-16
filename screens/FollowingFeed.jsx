import { Dimensions, FlatList, View } from "react-native";
import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import { useNavigation } from "@react-navigation/native";


export default function FollowingFeed() {
    const [followingFeed, setFollowingFeed] = useState([]);
    const navigation = useNavigation();


    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_BACKEND_ANALYTICS_URL}/getFollowingFeed`)
                console.log('feed', res.data);
                setFollowingFeed(res.data)
            } catch (error) {
                console.log('feed error: ', error);
            }
        }
        getProducts()
    }, []);

    const renderItems = ({ post, index }) => {
        return (
            <View key={index} style={{ flex: 1, height: Dimensions.get('window').height - 200 }}>
                <Post
                    post={followingFeed[index]}
                    navigation={navigation}
                />
            </View>
        )
    }
    return (
        <View className='flex-1'>
            <FlatList
                data={followingFeed}
                renderItem={renderItems}
                pagingEnabled
                keyExtractor={item => followingFeed?.indexOf(item)}
                decelerationRate='fast'
            />
        </View>
    );
}

