import { View, Text, StyleSheet, Dimensions, FlatList, Pressable, Image, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Modal from 'react-native-modal';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";


const Stack = createNativeStackNavigator();

const Profile = ({ route, navigation }) => {
    const { post } = route.params
    const [modalVisible, setModalVisible] = useState(false);
    const [details, setDetails] = useState()
    const [sellerName, setSellerName] = useState('')


    const followers = [
        {
            name: 'John Doe',
            image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
        },
        {
            name: 'John Doe',
            image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
        },
        {
            name: 'John Doe',
            image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
        },
        {
            name: 'John Doe',
            image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
        },
        {
            name: 'John Doe',
            image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
        },
        {
            name: 'John Doe',
            image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
        },
        {
            name: 'John Doe',
            image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
        },
        {
            name: 'John Doe',
            image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
        },
        {
            name: 'John Doe',
            image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
        },
        {
            name: 'John Doe',
            image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
        },
        {
            name: 'John Doe',
            image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
        },
        {
            name: 'John Doe',
            image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
        },
        {
            name: 'John Doe',
            image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
        },
        {
            name: 'John Doe',
            image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
        },
        {
            name: 'John Doe',
            image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
        },
        {
            name: 'John Doe',
            image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
        },
        {
            name: 'John Doe',
            image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
        },
        {
            name: 'John Doe',
            image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
        },
        {
            name: 'John Doe',
            image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
        },
        {
            name: 'John Doe',
            image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
        },
        {
            name: 'John Doe',
            image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
        },
        {
            name: 'John Doe',
            image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
        },
        {
            name: 'John Doe',
            image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
        },
        {
            name: 'John Doe',
            image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
        },
        {
            name: 'John Doe',
            image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
        },
    ]

    const styles = StyleSheet.create({
        topBar: {
            height: 75,
            width: Dimensions.get('screen').width + 35,
            backgroundColor: '#0d243e',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: 12,
            position: 'fixed',
            top: 0,
            borderBottomColor: 'white',
            borderBottomWidth: 1,
        },
        topBarText: {
            color: '#ffffff',
            fontSize: 24,
            fontWeight: 'bold',
        },
        touchableHighlight: {
            height: '80%',
            width: '30%',
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
        wishlist: {
            flex: 1,
            height: '40%',
            width: '40%',
        },
        profileDetails: {
            height: 270,
            justifyContent: 'space-between',
            backgroundColor: '#0d243e'
        },
        profileDetailsBottom: {
            height: 80,
            justifyContent: 'space-evenly',
            flexDirection: 'row',
            alignItems: 'center',
            // backgroundColor: '#10c140',
            borderBottomColor: 'white',
            borderBottomWidth: 1,
            paddingBottom: 8
        },
        profileDetailsBottomText: {
            color: '#ffffff',
            fontSize: 16,
            fontWeight: 'bold',
        },
        highlightedProfileDetailsBottomText: {
            color: '#ffffff',
            fontSize: 16,
            fontWeight: 'bold',

        },
        styledView: {
            borderBottomColor: '#ffffff',
            borderBottomWidth: 1,
            width: '100%',
            height: '100%',
            borderRadius: 32,
            justifyContent: 'center',
            alignItems: 'center'
        },
        pressableArea: {
            width: '30%',
            height: '60%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        post: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            height: 140,
            backgroundColor: '#626262',
            margin: 2,
            borderRadius: 4
        },
        invisible: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            height: 180,
            backgroundColor: 'transparent',
            margin: 2,
            borderRadius: 4,
        },
        postsContainer: {
            width: Dimensions.get('window').width,
            backgroundColor: '#b2b2b2',
            height: 360,
        },
        profileDetailsTop: {
            height: 120,
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            // backgroundColor: '#9c0f0f',
        },
        profileDetailsMid: {
            height: 80,
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            // backgroundColor: '#085156',
            borderBottomColor: 'white',
            borderBottomWidth: 1,
        },
        numbers: {
            width: Dimensions.get('screen').width,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
        },
        profilePic: {
            width: 100,
            height: 100,
            borderRadius: '50%',
            backgroundColor: '#afafaf'
        },
        numbersText: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        border: {
            height: '75%',
            width: 1,
            backgroundColor: '#ffffff',
        }
    });
    console.log(post.seller);

    useEffect(() => {

        async function load() {
            console.log(post.seller)
            const userid = (post.seller)
            axios.post(process.env.REACT_APP_BACKEND_URL + "/user/userinfo", { userID: userid }).then((res) => {
                setDetails(res.data)
                console.log('--------hey');
                console.log(res.data)
                setSellerName(res.data.name)

            });
        }

        load()

    }, [])




    const renderItem = ({ item, index }) => {
        if (details?.userProducts?.length % 2 !== 0 && index === details?.userProducts?.length - 1) {
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
        else if (details?.userProducts?.length === 0) {
            return (
                <View className='w-full h-20 justify-center items-center'>
                    <Text>No Posts Yet</Text>
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

    const renderFollowers = ({ item, index }) => {
        if (item.empty) {
            return (
                <View style={styles.invisible}>
                </View>
            )
        }
        return (
            <View key={index} className='h-20 w-full flex-row items-center justify-between pl-2 pr-4 border border-b-white border-t-white'>
                <Text style={{ color: 'white' }}>{item.name}</Text>
                <Image source={{ uri: item.image }} className='h-10 w-10' />
            </View>
        )
    }

    function toggleModal() {
        setModalVisible(!modalVisible);
    }


    return (
        <View style={{ height: Dimensions.get('window').height - 100 }}>
            <SafeAreaView />
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back-circle" size={30} color="white" />
                </TouchableOpacity>
                <Text className='ml-4' style={styles.topBarText}>{sellerName}</Text>
            </View>
            <View style={styles.profileDetails}>
                <View style={styles.profileDetailsTop}>
                    <View style={styles.numbers}>
                        <View>
                            <View style={styles.profilePic} className='justify-center items-center'>
                                <Ionicons name="ios-person-circle-outline" size={64} color="#7d7d7d" />
                            </View>
                        </View>
                        <View style={styles.numbersText}>
                            <Text style={styles.profileDetailsBottomText}>Posts</Text>
                            <Text style={styles.profileDetailsBottomText}>{details?.userProducts?.length}</Text>
                        </View>
                        <TouchableOpacity style={styles.numbersText} onPress={() => toggleModal()}>
                            <Text style={styles.profileDetailsBottomText}>Followers</Text>
                            <Text style={styles.profileDetailsBottomText}>{followers.length}</Text>
                            <Modal
                                isVisible={modalVisible}
                                onBackdropPress={() => toggleModal()}
                                onSwipeComplete={() => toggleModal()}
                                animationIn='slideInUp'
                                animationOut='slideOutDown'
                                swipeDirection='down'
                                animationInTiming={500}
                                animationOutTiming={500}
                                className='h-screen w-screen items-center justify-end m-0'
                            >
                                <View className='w-full h-[720] bg-black'>
                                    <View className='flex-[1] justify-center items-center'>
                                        <View className='h-2 w-1/5 bg-slate-400 rounded-3xl' />
                                    </View>
                                    <FlatList
                                        data={followers}
                                        renderItem={renderFollowers}
                                        className='flex-[11] h-5/6 w-full'
                                    >
                                    </FlatList>
                                </View>
                            </Modal>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.numbersText} onPress={() => toggleModal()}>
                            <Text style={styles.profileDetailsBottomText}>Following</Text>
                            <Text style={styles.profileDetailsBottomText}>{followers?.length}</Text>
                            <Modal
                                isVisible={modalVisible}
                                onBackdropPress={() => toggleModal()}
                                onSwipeComplete={() => toggleModal()}
                                animationIn='slideInUp'
                                animationOut='slideOutDown'
                                swipeDirection='down'
                                animationInTiming={500}
                                animationOutTiming={500}
                                className='h-screen w-screen items-center justify-end m-0'
                            >
                                <View className='w-full h-[720] bg-black'>
                                    <View className='flex-[1] justify-center items-center'>
                                        <View className='h-2 w-1/5 bg-slate-400 rounded-3xl' />
                                    </View>
                                    <FlatList
                                        data={followers}
                                        renderItem={renderFollowers}
                                        className='flex-[11] h-5/6 w-full'
                                    >
                                    </FlatList>
                                </View>
                            </Modal>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.profileDetailsMid}>
                    <TouchableOpacity className='bg-white h-8 w-1/2 rounded-md flex justify-center items-center'><Text className='font-bold text-sky-900'>Follow</Text></TouchableOpacity>
                </View>
                <View style={styles.profileDetailsBottom}>
                    <Text className='text-4xl font-semibold text-slate-100'>Closet</Text>
                </View>
            </View>
            <FlatList
                style={styles.postsContainer}
                data={details?.userProducts}
                renderItem={renderItem}
                numColumns='2'
            >
            </FlatList>
        </View>
    )
}

export default Profile
