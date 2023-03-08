import { StatusBar } from 'expo-status-bar';
import React, { createContext, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import Tabs from "./navigation/tabs";
import Post from './components/Post';
import Profile from './pages/profile';
import Wishlist from './pages/Wishlist';
import Context from './components/AppContext';

function App() {
  return (
    <NavigationContainer>
      <Context>
        <View className='flex-1'>
          <StatusBar style="auto" />
          <Tabs />
        </View>
      </Context>
    </NavigationContainer>
  );
}

export default App;
