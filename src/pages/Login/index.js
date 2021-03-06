import React from "react";

import {
  KeyboardAvoidingView,
  Text,
  Alert,
  AsyncStorage,
  TouchableOpacity,
  TextInput,
  View,
  Image
} from "react-native";

import styles from "../../styles";

import logo from "../../assets/logo-app.png";

import firebase from "firebase";
import User from "../../../User";

export default class Login extends React.Component {
  state = {
    name: "",
    phone: ""
  };

  handleChange = key => val => {
    this.setState({ [key]: val });
  };

  componentDidMount() {
    AsyncStorage.getItem("user").then;
  }

  submitForm = async () => {
    if (this.state.phone.length < 10) {
      Alert.alert("Error", "Número muito curto");
    } else if (this.state.name.length < 3) {
      Alert.alert("Error", "Nome muito curto");
    } else {
      await AsyncStorage.setItem("user", this.state.phone);
      User.phone = this.state.phone;
      firebase
        .database()
        .ref("users/" + User.phone)
        .set({ name: this.state.name });
      this.props.navigation.navigate("Home");
    }
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Image
          source={logo}
          style={{ width: 80, height: 80, marginBottom: 50 }}
        />
        <Text>Login</Text>
        <TextInput
          keyboardType="default"
          placeholder="Digite seu nome..."
          autoCorrect={false}
          autoCapitalize="sentences"
          placeholderTextColor="#999"
          value={this.state.name}
          onChangeText={this.handleChange("name")}
          style={styles.inputs}
        />

        <TextInput
          keyboardType="number-pad"
          placeholder="Digite seu telefone..."
          placeholderTextColor="#999"
          value={this.state.phone}
          onChangeText={this.handleChange("phone")}
          style={styles.inputs}
          returnKeyType="send"
        />
        <TouchableOpacity onPress={this.submitForm} style={styles.logOut}>
          <Text style={styles.TextButtonLogout}>Entrar</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}
