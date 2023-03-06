import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Landing from "./screens/Landing";
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Profile from './pages/profile';
import Tabs from "./navigation/tabs";
import Post from './components/Post';

function App() {
  return (
    <NavigationContainer>
      <View className='flex-1'>
        <StatusBar style="auto" />
        <Tabs />
      </View>
    </NavigationContainer>
  );
}

export default App;
