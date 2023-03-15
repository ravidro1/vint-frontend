import { Dimensions, FlatList, View } from "react-native";
import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import { useNavigation } from "@react-navigation/native";


export default function FollowingFeed() {
    const [followingFeed, setFollowingFeed] = useState([]);
    const navigation = useNavigation();
    const followingArray = [{
        img: "https://www.chaosbazaarvintage.com.au/wp-content/uploads/2018/11/DSC01393.jpg",
        seller: 'Roy Rutzky',
        size: 'XL',
        price: '60₪',
        images: ['https://i.etsystatic.com/12686376/r/il/606a8c/2261350622/il_fullxfull.2261350622_soii.jpg', 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'https://images.pexels.com/photos/1337477/pexels-photo-1337477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
    },
    {
        img: "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/81SE0ZAVX1L._AC_SL1500_.jpg",
        seller: 'Tal Ben Ari',
        size: 'M',
        price: '50₪',
        images: [],
    },
    {
        img: "https://static.cream.sk/fmasarovic.com/webroots/www/content/mediagallery/fms_system/image/product/types/D2/338533.jpg",
        seller: 'RaviChat',
        size: 'L',
        price: '67₪',
        images: [],
    },
    {
        img: "https://images.wsj.net/im-234492/?width=860&height=1290",
        seller: 'KuberNati',
        size: 'S',
        price: '40₪',
        images: [],
    },]

    // useEffect(() => {
    //     const getProducts = async () => {
    //         try {
    //             const res = await axios.post(`${process.env.REACT_APP_BACKEND_ANALYTICS_URL}/getFollowingFeed`)
    //             console.log('feed', res.data);
    //             setFollowingFeed(res.data)
    //         } catch (error) {
    //             console.log('feed error: ', error);
    //         }
    //     }
    //     getProducts()
    // }, []);

    const renderItems = ({ post, index }) => {
        return (
            <View key={index} style={{ flex: 1, height: Dimensions.get('window').height - 200 }}>
                <Post
                    post={followingArray[index]}
                    navigation={navigation}
                />
            </View>
        )
    }
    return (
        <View className='flex-1'>
            <FlatList
                data={followingArray}
                renderItem={renderItems}
                pagingEnabled
                keyExtractor={item => followingArray.indexOf(item)}
                decelerationRate='fast'
            />
        </View>
    );
}

