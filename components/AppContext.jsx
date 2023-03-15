import { StyleSheet, Text, View } from "react-native";
import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppContext = createContext()

export default function Context({children}) {
  const [posts, setPosts] = useState(['1','2','3','4','5','6','7','8','9','10','11']);
  const [wishList, setWishList] = useState([]);
  const id = AsyncStorage.getItem('user')
  return (
    <AppContext.Provider
      value={{
        posts,
        wishList,
        setPosts,
        setWishList,
      }}>
        {children}
    </AppContext.Provider>
  )
}

