import { Dimensions, Image, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";

import { Ionicons, Entypo, FontAwesome, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { AppContext } from "./AppContext";

const Post = (props) => {
    const [fav, setFav] = useState('white');
    const { wishList, setWishList } = useContext(AppContext)
    const { post, navigation } = props
    const image = { uri: post.img }
    const addToWishList = (post) => {
        const index = wishList.indexOf(post);
        if (index !== -1) {
            wishList.splice(index, 1)
            setFav('white')
        }
        else {
            setWishList([...wishList, post])
            setFav('red')
        }
    }
    return (
        <View style={{ flex: 1, height: Dimensions.get('window').height - 100 }} className='flex justify-center overflow-scroll border-b-2 border-b-black'>
            <Image source={image} resizeMode='cover' className='h-[100vh]' />
            <View className='absolute w-1/6 h-1/4 bottom-5 right-2 bg-black/20 rounded-full flex justify-around items-center'>
                <TouchableOpacity onPress={() => navigation.navigate('Details', { post: post })}>
                    <Ionicons name="eye" size={40} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => addToWishList(post)}>
                    <FontAwesome name="heart" size={38} color={fav} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('')}>
                    <Ionicons name="chatbubble-ellipses" size={40} color="white" />
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={() => navigation.navigate('')}>
                    <MaterialIcons name="more-horiz" size={40} color="white" />
                </TouchableOpacity> */}
            </View>
            <View className='absolute h-[7.5vh] w-[47%] bottom-5 left-2 flex-row bg-black/20 rounded-full flex justify-center items-center'>
                <Entypo name="price-tag" size={30} color="white" />
                <Text className='text-xl font-bold text-white mr-5 ml-2'>{post.size}</Text>
                <FontAwesome5 name="coins" size={30} color="white" />
                <Text className='text-xl font-bold text-white ml-2'>{post.price}</Text>
            </View>
        </View>
    );
}

export default Post;
