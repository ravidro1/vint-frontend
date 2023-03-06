import { StatusBar } from 'expo-status-bar';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Profile from './pages/profile';


export default function App() {


  const styles = StyleSheet.create({
    app: {

    }
  })

  return (
    <View style={styles.app}>
      <StatusBar style="auto" />
      <SafeAreaView/>
      <Profile />
    </View >
  );
}

