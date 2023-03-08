import { View, Text, Touchable, StyleSheet, Pressable, Image } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

const UploadImage = () => {

    const [image, setImage] = useState(null);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F5FCFF',
        },
        div: {
            width: '50%',
            height: '50%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#a62121',
        }
    });

    const takePhotoFromCamera = () => {
        ImagePicker.requestCameraPermissionsAsync()
        ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        })
    }
    const choosePhotoFromLibrary = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        })

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }

    console.log(image); 
    
    return (
        <View style={styles.container}>
            <Pressable style={styles.div} onPress={() => choosePhotoFromLibrary()}>
                {image && <Image source={{ uri: image }} style={{ width: 120, height: 150 }} />}
            </Pressable>
        </View>
    )
}



export default UploadImage