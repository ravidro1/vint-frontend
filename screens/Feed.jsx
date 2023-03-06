import { Dimensions, FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Post from "../components/Post";


export default function Feed() {
    const array = [{
        img: "https://i.etsystatic.com/12686376/r/il/606a8c/2261350622/il_fullxfull.2261350622_soii.jpg",
        seller: 'Roy Rutzky'
    },
    {
        img: "https://www-konga-com-res.cloudinary.com/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/media/catalog/product/F/Q/201297_1653303974.jpg",
        seller: 'Tal Ben Ari'
    },
    {
        img: "https://cdn.shopify.com/s/files/1/0305/6438/4908/products/z091_1bcb0479-3896-4fec-80d7-37ff3fe5c2f9_5000x.jpg?v=1635328696",
        seller: 'RaviChat'
    },
    {
        img: "https://images.wsj.net/im-234492/?width=860&height=1290",
        seller: 'KuberNati'
    },]
    const renderItems = ({ post, index }) => {
        return (
            <View key={index} style={{ flex: 1, height: Dimensions.get('window').height - 100 }}>
                <Post
                    img={array[index].img}
                    seller={array[index].seller}
                />
            </View>
        )
    }
    return (
        <View className='flex-1'>
            <FlatList
                data={array}
                renderItem={renderItems}
                pagingEnabled
                keyExtractor={item => item.key}
                decelerationRate='slow'
            />
            <View className='absolute top-0 h-14 w-full bg-black/20' />
        </View>
    );
}

