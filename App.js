import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Landing from "./screens/Landing";
import { View } from 'react-native';

import Tabs from "./navigation/tabs";
import Post from './components/Post';

const App = () => {
  return (
    <NavigationContainer>
      <View className='flex-1'>
        <Tabs />
      </View>
    </NavigationContainer>
  );
}

export default App;
