import { View, Text, StyleSheet, Dimensions, FlatList, Pressable, Image, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';



const Stack = createNativeStackNavigator();

const Profile = ({ route, navigation }) => {
    const { post } = route.params
    const [profile, setProfile] = useState('For Sale');
    const [modalVisible, setModalVisible] = useState(false);

    const posts = [
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
        {
            productName: 'Adidas t-shirt',
            price: '69$'
        },
        {
            productName: 'jacket',
            price: '119$'
        },
        {
            productName: 'Adidas t-shirt',
            price: '69$'
        },
        {
            productName: 'jacket',
            price: '119$'
        },
        {
            productName: 'Adidas t-shirt',
            price: '69$'
        },
        {
            productName: 'jacket',
            price: '119$'
        },
        {
            productName: 'jacket',
            price: '119$'
        },
    ]

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
            justifyContent: 'space-between',
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

    const [forSaleTextStyle, setForSaleTextStyle] = useState('');
    const [historyTextStyle, setHistoryTextStyle] = useState('');

    useEffect(() => {
        setForSaleTextStyle(styles.styledView);
        setHistoryTextStyle('');
    }, [])


    function setProfileType(type) {
        if (type === 'For Sale') {
            setProfile('For Sale');
            setForSaleTextStyle(styles.styledView);
            setHistoryTextStyle('');

        } else if (type === 'History') {
            setProfile('History');
            setHistoryTextStyle(styles.styledView);
            setForSaleTextStyle('');
        }
    }

    const formatData = (dataList, numColumns) => {
        const totalRows = Math.floor(dataList.length / numColumns)
        let totalLastRow = dataList.length - (totalRows * numColumns)

        while (totalLastRow !== 0 && totalLastRow !== numColumns) {
            dataList.push({ key: 'blank', empty: true });
            totalLastRow++
        }
        return dataList
    }

    const renderPosts = ({ item, index }) => {
        if (item.empty) {
            return (
                <View style={styles.invisible}>
                </View>
            )
        }
        return (
            <View key={index} style={styles.post}>
                <Text style={{ color: 'white' }}>{item.productName}</Text>
                <Text style={{ color: 'white' }}>{item.price}</Text>
            </View>
        )
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

                <Text style={styles.topBarText}>{post.seller}</Text>
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
                            <Text style={styles.profileDetailsBottomText}>{posts.length}</Text>
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

                </View>
                <View style={styles.profileDetailsBottom}>
                    <Pressable style={styles.pressableArea} onPress={() => setProfileType('For Sale')}>
                        <View style={forSaleTextStyle}>
                            <Text style={styles.profileDetailsBottomText}>For Sale</Text>
                        </View>
                    </Pressable>
                    <View style={styles.border}></View>
                    <Pressable style={styles.pressableArea} onPress={() => setProfileType('History')}>
                        <View style={historyTextStyle}>
                            <Text style={styles.profileDetailsBottomText}>History</Text>
                        </View>
                    </Pressable>
                </View>
            </View>
            <FlatList
                style={styles.postsContainer}
                data={formatData(posts, 3)}
                renderItem={renderPosts}
                numColumns='3'
            >
            </FlatList>
        </View>
    )
}

export default Profile
