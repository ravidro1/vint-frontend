import { View, Text, StyleSheet, Dimensions, FlatList, Pressable, Image, SafeAreaView, TouchableHighlight } from 'react-native';
import { useEffect, useState } from 'react';
import wishlistIcon from '../assets/favourite.png';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Wishlist from './Wishlist';
import * as Animatable from 'react-native-animatable';


const Stack = createNativeStackNavigator();

const Profile = (props) => {

    const [profile, setProfile] = useState('For Sale');
    const [postAnimation, setPostAnimation] = useState('');

    const navigation = useNavigation();

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
            height: 75,
            width: Dimensions.get('screen').width + 35,
            backgroundColor: '#000000',
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
            backgroundColor: '#000000'
        },
        profileDetailsBottom: {
            height: 80,
            justifyContent: 'space-evenly',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#000000',
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
            backgroundColor: '#000000',
        },
        profileDetailsMid: {
            height: 80,
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#000000',
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
            backgroundColor: '#1583ae'
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

    const renderItem = ({ item, index }) => {
        if (item.empty) {
            return (
                <View style={styles.invisible}>
                </View>
            )
        }
        return (
            // <TouchableHighlight>
                <Animatable.View key={index} style={styles.post} postAnimation>
                    <Text style={{ color: 'white' }}>{item.productName}</Text>
                    <Text style={{ color: 'white' }}>{item.price}</Text>
                </Animatable.View>
            // {/* </TouchableHighlight> */}
        )
    }

    return (
        <View>
            <SafeAreaView />
            <View style={styles.topBar}>
                <Text style={styles.topBarText}>Tal Ben Ari</Text>
                <TouchableHighlight style={styles.touchableHighlight} onPress={() => navigation.navigate("wishlist")}>
                    <Image
                        style={styles.wishlist}
                        source={wishlistIcon}
                        alt='wish-list' />
                </TouchableHighlight>
            </View>
            <View style={styles.profileDetails}>
                <View style={styles.profileDetailsTop}>
                    <View style={styles.numbers}>
                        <View>
                            <View style={styles.profilePic} />
                        </View>
                        <View style={styles.numbersText}>
                            <Text style={styles.profileDetailsBottomText}>Posts</Text>
                            <Text style={styles.profileDetailsBottomText}>17</Text>
                        </View>
                        <View style={styles.numbersText}>
                            <Text style={styles.profileDetailsBottomText}>Followers</Text>
                            <Text style={styles.profileDetailsBottomText}>358</Text>
                        </View>
                        <View style={styles.numbersText}>
                            <Text style={styles.profileDetailsBottomText}>Following</Text>
                            <Text style={styles.profileDetailsBottomText}>112</Text>
                        </View>
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
                renderItem={renderItem}
                numColumns='3'
            >
            </FlatList>
        </View>
    )
}

export default Profile