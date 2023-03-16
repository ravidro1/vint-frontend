import { Dimensions, Image, Pressable, StyleSheet, Text, Vibration, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import * as Haptics from "expo-haptics";
import { Ionicons, Entypo, FontAwesome, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { AppContext } from "./AppContext";

const Post = (props) => {
    const [fav, setFav] = useState('white')
    const { wishList, setWishList } = useContext(AppContext)
    const { post, navigation } = props
    const [image,setImage] = useState(false)
   useEffect(()=> {
    setImage()
       console.log(image)
   },[])


    const addToWishList = (post) => {
        const index = wishList.indexOf(post);
        if (index !== -1) {
            wishList.splice(index, 1)
            setFav('white')
        }
        else {
            setWishList([...wishList, post])
            setFav('rgb(14, 165, 233)')
            Haptics.notificationAsync(Haptics.ImpactFeedbackStyle.Success)
        }
    }
    const styles = StyleSheet.create({
        iconShadow: {
            elevation: 5, shadowColor: 'black', shadowOpacity: 1, shadowRadius: 8, shadowOffset: { width: 0, height: 0 }
        },
        smallIconShadow: {
            elevation: 5, shadowColor: 'black', shadowOpacity: 1, shadowRadius: 5, shadowOffset: { width: 0, height: 0 }
        },
        heart: {
            position: 'absolute',
            top: '50%',
            left: '46%',
            transform: [{ translateX: -25 }, { translateY: -60 }],
            backgroundColor: 'transparent',
            color: 'white',
            fontSize: 100,
            zIndex: 1,
        }
    })
    const [showHeart, setShowHeart] = useState(false);
    const [like, setLike] = useState('white');
    const [lastPress, setLastPress] = useState(0);
    const handleDoublePress = () => {        
        const currentTime = new Date().getTime();        
        const delta = currentTime - lastPress;        
        if (delta < 200) {
            liked()
            setLike('red')
            setShowHeart(true);
            setTimeout(() => {
                setShowHeart(false);
            }, 1000);
        }
        setLastPress(currentTime);
    }
    const liked = () => {
        like === 'white'? setLike('red') : setLike('white')
        Haptics.notificationAsync(Haptics.ImpactFeedbackStyle.Success)
    }
    return (
        <View style={{ flex: 1, height: Dimensions.get('window').height - 100 }} className='flex justify-center overflow-scroll border-b-2 border-b-black'>
            <Pressable onPress={handleDoublePress}>
                <Image source={{uri: post?.media[0]?.url}} resizeMode='cover' className='h-[100vh]' />
                    
                {showHeart && <MaterialIcons name="favorite" color="white" style={styles.heart} />}
            </Pressable>
            <View className='absolute w-1/6 h-1/3 bottom-5 right-2  rounded-full flex justify-around items-center'>
                <TouchableOpacity className='bg-transparent' onPress={() => {
                    navigation.navigate('Profile', { post: post })
                    Haptics.selectionAsync()
                }}>
                    <FontAwesome name="user-circle" style={styles.iconShadow} size={40} color="white" />
                </TouchableOpacity>
                <TouchableOpacity className='bg-transparent' onPress={liked}>
                    <MaterialIcons name="favorite" style={styles.iconShadow} size={40} color={like} />
                </TouchableOpacity>
                <TouchableOpacity className='bg-transparent' onPress={() => {
                    navigation.navigate('Details', { result: post })
                    Haptics.selectionAsync()
                }}>
                    <Ionicons name="eye" style={styles.iconShadow} size={40} color="white" />
                </TouchableOpacity>
                <TouchableOpacity className='bg-transparent' onPress={() => addToWishList(post)}>
                    <Ionicons name="star" style={styles.iconShadow} size={40} color={fav} />
                </TouchableOpacity>
            </View>
            <View className='absolute h-[7.5vh] w-[47%] bottom-2 left-2 flex-row  rounded-full flex justify-center items-center'>
                <Entypo style={styles.smallIconShadow} name="price-tag" size={30} color="white" />
                <Text style={styles.smallIconShadow} className='text-xl font-bold text-white mr-5 ml-2'>{post.size}</Text>
                <FontAwesome5 style={styles.smallIconShadow} name="coins" size={30} color="white" />
                <Text style={styles.smallIconShadow} className='text-xl font-bold text-white ml-2'>{post.price}</Text>
            </View>
        </View>
    );
}

export default Post;
