import React, {useEffect, useState} from "react";
import {
  Alert,
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import axios from "axios";
import {REACT_APP_BACKEND_URL} from "@env";
import {useNavigation} from "@react-navigation/native";
import {TouchableOpacity} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";

function Login({setView, setID, setToken, setEmail}) {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const progress = useSharedValue(0);
  const slide = useSharedValue(-500);

  const reanimtedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      transform: [
        {
          translateX: slide.value,
        },
      ],
    };
  }, []);

  useEffect(() => {
    slide.value = withTiming(0, {duration: 500});
    progress.value = withTiming(1, {duration: 1200});
  }, []);

  const handleForgotUser = () => {
    Alert.prompt("Enter your Username", null, (text) => forgotPassword(text));
  };
  const forgotPassword = async (userName) => {
    try {
      console.log(userName);
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user/forgotPassw`,
        {username: userName}
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_BACKEND_URL + `/user/login`,
        {username: userName, password: password}
      );
      setID(res.data.userID);
      setToken(res.data.token);
      setEmail(res.data.email);

      const isActive = res.data.isActive;

      if (!isActive) {
        setView("VerifyEmail");
      } else {
        setUserName("");
        setPassword("");

        await AsyncStorage.setItem("user", JSON.stringify(res.data.userID));
        await AsyncStorage.setItem("token", JSON.stringify(res.data.token));
        navigation.navigate("Home");
      }
    } catch (error) {
      console.log("error: ", error);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert("Error", error.response.data.message, [
        {
          text: "OK",
          onPress: () => {
            setUserName("");
            setPassword("");
          },
        },
      ]);
    }
  };
  return (
    <View className="h-full w-full bg-sky-900 rounded-3xl flex p-3 items-center justify-start mt-24">
      <Animated.View style={reanimtedStyle}>
        <TextInput
          id="input"
          value={userName}
          onChangeText={(e) => setUserName(e)}
          className="w-[70vw] h-12 rounded-md bg-sky-200 p-2 mb-10 text-left"
          placeholder="User Name"
        />
        <TextInput
          id="input"
          value={password}
          onChangeText={(e) => setPassword(e)}
          className="w-[70vw] h-12 rounded-md bg-sky-200 p-2 text-left"
          placeholder="Password"
        />
      </Animated.View>
      <TouchableOpacity onPress={handleForgotUser}>
        <Text className="mb-12 mt-5 text-sky-300">Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSubmit}>
        <View className="w-[40vw] h-12 bg-sky-500 rounded-full flex justify-center items-center mb-5">
          <Text className="text-sky-900 font-bold">SIGN IN</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setView("signUp")}>
        <View className="w-[40vw] h-12 border-2 border-sky-500 rounded-full flex justify-center items-center">
          <Text className="text-sky-500">SIGN UP</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default Login;
