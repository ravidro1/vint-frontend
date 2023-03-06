import { Dimensions, Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const Post = (props) => {
    const [loader, setLoader] = useState(true);
    const { img, seller } = props
    const image = { uri: `${img}` }
    return (
        <View style={{ flex: 1, height: Dimensions.get('window').height - 100 }} className='flex justify-center overflow-scroll border-b-2 border-b-black'>
            <Image source={image} className='h-[100vh]' />
            <View className='absolute w-1/6 h-1/3 bottom-5 right-2 bg-black/20 rounded-full flex justify-around items-center'>
                <Ionicons name="eye" size={40} color="white" />
                <FontAwesome name="heart" size={40} color="white" />
                <Ionicons name="chatbubble-ellipses" size={40} color="white" />
                <MaterialIcons name="more-horiz" size={40} color="white" />
            </View>
        </View>
    );
}

export default Post;
