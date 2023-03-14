import {StyleSheet, Text, View} from "react-native";
import React, {createContext, useState} from "react";

export const AppContext = createContext();

export default function Context({children}) {
  const [posts, setPosts] = useState([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
  ]);
  const [wishList, setWishList] = useState([]);

  const [storageRender, setStorageRender] = useState(false);
  return (
    <AppContext.Provider
      value={{
        posts,
        wishList,
        setPosts,
        setWishList,
        storageRender,
        setStorageRender,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
