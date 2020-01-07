import React, { useEffect } from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View
} from "react-native";

import User from "../../../User";

import firebase from "firebase";

export default function AuthLoadingScreen({ navigation }) {
  useEffect(() => {
    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyBBflSGcxwNym7qLgRRLEF8Q-dXzbjvO3M",
      authDomain: "appmessege-d498e.firebaseapp.com",
      databaseURL: "https://appmessege-d498e.firebaseio.com",
      projectId: "appmessege-d498e",
      storageBucket: "appmessege-d498e.appspot.com",
      messagingSenderId: "1031050581459",
      appId: "1:1031050581459:web:ab1ebc430eeaf5a45a0b26"
    };
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }, []);

  useEffect(() => {
    async function loadUserLocal() {
      User.phone = await AsyncStorage.getItem("user");

      navigation.navigate(User.phone ? "Home" : "Login");
    }
    loadUserLocal();
  }, []);

  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
}
