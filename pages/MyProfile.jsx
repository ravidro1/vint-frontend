import { View, Text, Alert, StyleSheet, Dimensions, FlatList, Pressable, Image, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import menuIcon from '../assets/menu.png';
import Modal from 'react-native-modal';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import EmailSettings from '../components/EmailSettings';
import PasswordSettings from '../components/PasswordSettings';
import PersonalInfo from '../components/PersonalInfo';
import DeleteAccount from '../components/DeleteAccount';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';


const MyProfile = () => {

    const [forSaleTextStyle, setForSaleTextStyle] = useState('');
    const [historyTextStyle, setHistoryTextStyle] = useState('');
    const [profile, setProfile] = useState('For Sale');
    const [modalVisible, setModalVisible] = useState(false);
    const [followersmodalVisible, setFollowersModalVisible] = useState(false);
    const [followingmodalVisible, setFollowingModalVisible] = useState(false);
    const [settingVisible, setSettingVisible] = useState(false);
    const [settingsType, setSettingsType] = useState('');
    const [profileImage, setProfileImage] = useState(null);

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
            width: Dimensions.get('screen').width,
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

    const formatData = (dataList, numColumns) => {
        const totalRows = Math.floor(dataList.length / numColumns)
        let totalLastRow = dataList.length - (totalRows * numColumns)

        while (totalLastRow !== 0 && totalLastRow !== numColumns) {
            dataList.push({ key: 'blank', empty: true });
            totalLastRow++
        }
        return dataList
    }

    const renderItem = ({ item, index }) => {
        if (item.empty) {
            return (
                <View style={styles.invisible}>
                </View>
            )
        }
        return (
            <View key={index} style={styles.post} postAnimation>
                <Text style={{ color: 'white' }}>{item.productName}</Text>
                <Text style={{ color: 'white' }}>{item.price}</Text>
            </View>
        )
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

    function showAlert() {
        Alert.alert(
            'Are You Sure?',
            '',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: true }
        )
    }

    function toggleFollowersModal() {
        setFollowersModalVisible(!followersmodalVisible);
    }

    function toggleFollowingModal() {
        setFollowingModalVisible(!followingmodalVisible)
    }

    return (
        <View style={{ height: Dimensions.get('window').height - 100 }}>
            <SafeAreaView />
            <StatusBar style='dark' />
            <View style={styles.topBar}>
                <Text style={styles.topBarText}>UserName</Text>
                <Pressable className='h-full w-20 justify-center items-end' onPressOut={() => toggleModal()}>
                    <Image source={menuIcon} style={{ height: '80%', width: '50%' }} />
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
                            <Text style={styles.profileDetailsBottomText}>{posts.length}</Text>
                        </View>
                        <TouchableOpacity style={styles.numbersText} onPressOut={() => toggleFollowersModal()}>
                            <Text style={styles.profileDetailsBottomText}>Followers</Text>
                            <Text style={styles.profileDetailsBottomText}>{followers.length}</Text>
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
                                    <FlatList
                                        data={followers}
                                        renderItem={renderFollowers}
                                        className='flex-[11] h-5/6 w-full'
                                    >
                                    </FlatList>
                                </View>
                            </Modal>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.numbersText} onPressOut={() => toggleFollowingModal()}>
                            <Text style={styles.profileDetailsBottomText}>Following</Text>
                            <Text style={styles.profileDetailsBottomText}>{followers?.length}</Text>
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
            <ScrollView horizontal pagingEnabled style={styles.postsContainer}>
                <FlatList
                    // className='mr-1'
                    style={styles.postsContainer}
                    data={formatData(posts, 3)}
                    renderItem={renderItem}
                    numColumns='3'
                >
                </FlatList>
                <FlatList
                    // className='ml-1'7654
                    style={styles.postsContainer}
                    data={formatData(posts, 3)}
                    renderItem={renderItem}
                    numColumns='3'
                >
                </FlatList>
            </ScrollView>
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
