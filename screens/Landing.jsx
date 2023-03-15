import {
    Dimensions,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    SafeAreaView,
    View,
} from "react-native";
import Login from "../components/Login";
import { useEffect, useState } from "react";
import SignUp from "../components/SignUp";
import Vlogo from '../assets/V.png'
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import VerifyEmail from "../components/VerifyEmail";

function Register() {
    const [view, setView] = useState("signIn");
    const [ID, setID] = useState("");
    const [token, setToken] = useState("");
    const [email, setEmail] = useState("");

    return (
        <View
            style={{ height: Dimensions.get("window").height }}
            className="bg-sky-900 items-center"
        >
            <SafeAreaView />
            <TouchableWithoutFeedback
                onPress={() => Keyboard.dismiss()}
                className="flex justify-center items-center"
            >
                <View className="h-1/4 flex justify-center items-center">
                    <Image source={Vlogo} className="mt-12 scale-75 bg-transparent" />
                </View>
                <KeyboardAvoidingView
                    behavior="height"
                    enabled={view === "signIn" ? false : true}
                >
                    <View className="flex h-3/4 w-5/6 justify-center items-center ">
                        {view === "signIn" ? (
                            <Login
                                setView={setView}
                                setID={setID}
                                setToken={setToken}
                                setEmail={setEmail}
                            />
                        ) : view === "signUp" ? (
                            <SignUp
                                setView={setView}
                                setID={setID}
                                setToken={setToken}
                                setEmail={setEmail}
                            />
                        ) : (
                            <VerifyEmail ID={ID} token={token} email={email} />
                        )}
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </View>
    );
}

export default Register;
