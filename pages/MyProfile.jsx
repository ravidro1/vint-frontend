import { View, Text, Alert, StyleSheet, Dimensions, FlatList, Pressable, Image, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import EmailSettings from '../components/EmailSettings';
import PasswordSettings from '../components/PasswordSettings';
import PersonalInfo from '../components/PersonalInfo';
import DeleteAccount from '../components/DeleteAccount';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import { AppContext } from '../components/AppContext';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


const MyProfile = () => {
    const { storageRender, setStorageRender, setPosts, setWishList } =
        useContext(AppContext);
    const [forSaleTextStyle, setForSaleTextStyle] = useState('');
    const [historyTextStyle, setHistoryTextStyle] = useState('');
    const [profile, setProfile] = useState('For Sale');
    const [modalVisible, setModalVisible] = useState(false);
    const [followersmodalVisible, setFollowersModalVisible] = useState(false);
    const [followingmodalVisible, setFollowingModalVisible] = useState(false);
    const [settingVisible, setSettingVisible] = useState(false);
    const [settingsType, setSettingsType] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [details, setDetails] = useState()

    useEffect(() => {

        async function load() {
            console.log(await AsyncStorage.getItem("user"))
            const userid = await AsyncStorage.getItem("user")
            axios.post(process.env.REACT_APP_BACKEND_URL + "/user/userinfo", { userID: JSON.parse(userid) }).then((res) => {
                setDetails(res.data)
                console.log(res.data)

            });
        }
        load()
    }, [])
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



    const styles = StyleSheet.create({
        topBar: {
            height: 140,
            width: Dimensions.get('screen').width,
            backgroundColor: '#0d243e',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
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
            marginBottom: 5,
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
            height: '99.5%',
        },
        profileDetailsTop: {
            height: 120,
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
        },
        profileDetailsMid: {
            height: 80,
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
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
        profileImage: {
            borderRadius: '50%',
        },
        numbersText: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        border: {
            height: '75%',
            width: 1,
            backgroundColor: '#ffffff',
        },
        upperModal: {
            flex: 1
        },
        lowerModal: {
            flex: 6
        },
        settingsZone: {
            backgroundColor: '#d4d4d4',
            flex: 7,
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
        buttonsZone: {
            flex: 4
        },
    });



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

    const formatData = (numColumns) => {
        const tempPosts = details?.userProducts;
        const totalRows = Math.floor(tempPosts?.length / numColumns)
        let totalLastRow = tempPosts?.length - (totalRows * numColumns)

        while (totalLastRow !== 0 && totalLastRow !== numColumns) {
            tempPosts?.push({ key: 'blank', empty: true });
            totalLastRow++
        }
        return tempPosts
    }

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

    function toggleModal() {
        setModalVisible(!modalVisible);
    }

    function toggleSettings() {
        setSettingsType('')
        setSettingVisible(!settingVisible);
    }

    function openSpecificSettings(spesipication) {
        setSettingVisible(false);
        if (spesipication === 'personal info') {
            setTimeout(() => {
                setSettingsType(spesipication)
            }, 250)
        }
        else if (spesipication === 'email') {
            setTimeout(() => {
                setSettingsType(spesipication)
            }, 250)
        }
        else if (spesipication === 'password') {
            setTimeout(() => {
                setSettingsType(spesipication)
            }, 250)
        }
        else if (spesipication === 'delete account') {
            setTimeout(() => {
                setSettingsType(spesipication)
            }, 250)
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

    function pickImage() {
        Alert.alert(
            'Upload Photo',
            '',
            [
                {
                    text: 'From Gallery',
                    onPress: () => {
                        choosePhotoFromLibrary()
                    },
                },
                {
                    text: 'Take Photo',
                    onPress: () => {
                        takePhotoFromCamera()
                    }
                },
                {
                    text: 'Delete Photo',
                    onPress: () => { setProfileImage(null) },
                },
                {
                    text: 'cancel',
                    onPress: () => { },
                    style: 'destructive'
                },

            ],
            { cancelable: true }
        )
    }

    const takePhotoFromCamera = async () => {
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        })
        console.log(result);

        if (result) {
            setProfileImage(result.assets[0].uri);
        }
    }
    const choosePhotoFromLibrary = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        })


        if (result) {
            console.log(result);
            setProfileImage(result.assets[0].uri)
        }
    }
    const initData = () => {
        setPosts([]);
        setWishList([]);
    };

    function showAlert() {
        Alert.alert(
            "Are You Sure?",
            "",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                },
                {
                    text: "OK",
                    onPress: async () => {
                        console.log("OK Pressed");
                        initData();
                        await AsyncStorage.clear();

                        setStorageRender(!storageRender);
                    },
                },
            ],
            { cancelable: true }
        );
    }
    function toggleFollowersModal() {
        setFollowersModalVisible(!followersmodalVisible);
    }

    function toggleFollowingModal() {
        setFollowingModalVisible(!followingmodalVisible)
    }

    return (
        <View style={{ height: Dimensions.get('window').height - 100 }}>
            {/* <SafeAreaView /> */}
            <StatusBar style='dark' />
            <View style={styles.topBar}>
                <Text style={styles.topBarText}>{details?.name}</Text>
                <Pressable onPressOut={() => toggleModal()}>
                    <Ionicons name="menu" size={40} color="white" />
                </Pressable>
            </View>
            <View style={styles.profileDetails}>
                <View style={styles.profileDetailsTop}>
                    <View style={styles.numbers}>
                        <TouchableOpacity style={styles.profilePic} className='justify-center items-center' onPressOut={() => pickImage()}>
                            {
                                profileImage
                                    ?
                                    <Image source={{ uri: profileImage }} style={styles.profileImage} className='h-full w-full' />
                                    :
                                    <Ionicons name="ios-person-circle-outline" size={64} color="#7d7d7d" />
                            }
                        </TouchableOpacity>
                        <View style={styles.numbersText}>
                            <Text style={styles.profileDetailsBottomText}>Posts</Text>
                            <Text style={styles.profileDetailsBottomText}>{details?.userProducts.length}</Text>
                        </View>
                        <TouchableOpacity style={styles.numbersText} onPressOut={() => toggleFollowersModal()}>
                            <Text style={styles.profileDetailsBottomText}>Followers</Text>
                            <Text style={styles.profileDetailsBottomText}>{details?.followersCounter}</Text>
                            <Modal
                                isVisible={followersmodalVisible}
                                onBackdropPress={() => toggleFollowersModal}
                                onSwipeComplete={() => toggleFollowersModal()}
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
                                    <ScrollView className='flex-[11] h-5/6 w-full'>
                                        {
                                            details?.following.map((item, index) => {
                                                return (
                                                    <View key={index} className='h-20 w-full flex-row items-center justify-between pl-2 pr-4 border border-b-white border-t-white'>
                                                        <Text style={{ color: 'white' }}>{item.name}</Text>
                                                        <Image source={{ uri: item.image }} className='h-10 w-10' />
                                                    </View>
                                                )
                                            })
                                        }
                                    </ScrollView>
                                </View>
                            </Modal>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.numbersText} onPressOut={() => toggleFollowingModal()}>
                            <Text style={styles.profileDetailsBottomText}>Following</Text>
                            <Text style={styles.profileDetailsBottomText}>{details?.following?.length}</Text>
                            <Modal
                                isVisible={followingmodalVisible}
                                onBackdropPress={() => toggleFollowingModal()}
                                onSwipeComplete={() => toggleFollowingModal()}
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
                                        data={details?.following}
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
                    <Text className='text-4xl font-semibold text-slate-100'>Closet</Text>
                </View>
            </View>
            <FlatList
                contentContainerStyle={{ height: 'auto', justifyContent: 'start', alignItems: 'center' }}
                data={details?.userProducts}
                renderItem={renderItem}
                numColumns='2'
            >
            </FlatList>
            <Modal
                isVisible={modalVisible}
                onBackdropPress={() => {
                    toggleModal()
                    setSettingVisible(false)
                    setSettingsType('')
                }}
                onSwipeComplete={() => {
                    toggleModal()
                    setSettingVisible(false)
                    setSettingsType('')
                }}
                swipeDirection='right'
                animationIn='slideInRight'
                animationOut='fadeOutRight'
                animationInTiming={500}
                className='w-screen h-screen items-end'
            >
                <View className='h-screen w-screen flex-col bg-slate-50 rounded-3xl'>
                    <View style={styles.upperModal} className='w-full h-16 justify-end bg-slate-50 rounded-t-3xl'>
                        <Pressable className='w-max h-16 mt-3 justify-center items-end pr-8 border-b-[1] border-b bg-slate-50' onPressOut={() => setModalVisible(false)}>
                            <AntDesign name="menu-fold" size={36} color="black" />
                        </Pressable>
                    </View>
                    <View style={styles.lowerModal} className='w-full bg-slate-400 justify-end rounded-b-3xl'>
                        <View style={styles.settingsZone}>
                            {settingVisible &&
                                <View className='h-3/5 w-full items-center pl-4 pr-8 bg-white border-t-[1] border-t'>
                                    <Pressable className='flex-1 w-full flex-row justify-between items-center' onPress={() => openSpecificSettings('personal info')}>
                                        <Text>Personal Infornation</Text>
                                        <AntDesign name="infocirlceo" size={24} color="black" />
                                    </Pressable>
                                    <Pressable className='flex-1 w-full flex-row justify-between items-center' onPress={() => openSpecificSettings('email')}>
                                        <Text>Edit E-mail Address</Text>
                                        <MaterialCommunityIcons name="email-edit-outline" size={24} color="black" />
                                    </Pressable>
                                    <Pressable className='flex-1 w-full flex-row justify-between items-center' onPress={() => openSpecificSettings('password')}>
                                        <Text>Edit Password</Text>
                                        <AntDesign name="Safety" size={24} color="black" />
                                    </Pressable>
                                    <Pressable className='flex-1 w-full flex-row justify-between items-center' onPress={() => openSpecificSettings('delete account')}>
                                        <Text>Delete Account</Text>
                                        <MaterialCommunityIcons name="account-remove-outline" size={24} color="black" />
                                    </Pressable>
                                </View>
                            }
                            {
                                settingsType === 'personal info' &&
                                <PersonalInfo />
                            }
                            {
                                settingsType === 'email' &&
                                <EmailSettings />
                            }
                            {
                                settingsType === 'password' &&
                                <PasswordSettings />
                            }
                            {
                                settingsType === 'delete account' &&
                                <DeleteAccount />
                            }
                        </View>
                        <View style={styles.buttonsZone}>
                            {!settingVisible &&
                                <View className='h-[1] w-full bg-black'></View>
                            }
                            <View className='w-full h-16 bg-white'>
                                <Pressable className='h-full flex-row justify-between items-center pl-4 pr-8' onPress={() => toggleSettings()}>
                                    <View className='flex-row items-center'>
                                        <Feather name="settings" size={24} color="black" />
                                        <Text className='ml-2'>Settings</Text>
                                    </View>
                                    <View>
                                        {settingVisible ?
                                            <AntDesign name="up" size={24} color="black" />
                                            :
                                            <AntDesign name="down" size={24} color="black" />
                                        }
                                    </View>
                                </Pressable>
                            </View>
                            <View className='h-[1] w-full bg-black'></View>
                            <View className='w-full h-16 bg-white mb-32'>
                                <Pressable className='h-full flex-row justify-start items-center pl-4' onPressOut={() => showAlert()}>
                                    <Ionicons name="ios-log-out-outline" size={24} color="black" />
                                    <Text className='ml-2'>Log-Out</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}



export default MyProfile
