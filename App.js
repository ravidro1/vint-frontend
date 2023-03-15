import {StatusBar} from "expo-status-bar";
import React, {createContext, useContext} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {View} from "react-native";
import Tabs from "./navigation/tabs";
import Landing from "./screens/Landing";
import Post from "./components/Post";
import Profile from "./pages/profile";
import Wishlist from "./pages/Wishlist";
import Context from "./components/AppContext";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import VerifyEmail from "./components/VerifyEmail";

function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Context>
        <View className="flex-1">
          <StatusBar style="auto" />
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Landing" component={Landing} />
            <Stack.Screen name="Home" component={Tabs} />
          </Stack.Navigator>
        </View>
      </Context>
    </NavigationContainer>
  );
}

export default App;
