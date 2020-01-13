import React from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Alert
} from "react-native";

import styles from "../../styles";

import firebase from "firebase";
import User from "../../../User";

export default class CreateAccount extends React.Component {
  state = {
    email: "",
    password: "",
    phone: ""
  };

  handleChange = key => val => {
    this.setState({ [key]: val });
  };

  submitForm = async () => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        () => {},
        error => {
          Alert.alert(error.messeage);
        }
      );

    await firebase
      .database()
      .ref("users/" + this.state.phone)
      .set({ name: this.state.email });

    Alert.alert("Sucesso!", "Conta criada com sucesso!");

    this.props.navigation.navigate("Login");

    console.log(this.state.email, this.state.password);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Cadastro Novo Usuário</Text>
        <TextInput
          keyboardType="number-pad"
          placeholder="Digite seu nome"
          placeholderTextColor="#999"
          value={this.state.email}
          onChangeText={this.handleChange("email")}
          style={styles.inputs}
        />
        <TextInput
          keyboardType="number-pad"
          placeholder="Digite sua senha"
          placeholderTextColor="#999"
          value={this.state.password}
          onChangeText={this.handleChange("password")}
          style={styles.inputs}
        />
        <TextInput
          keyboardType="number-pad"
          placeholder="Digite seu número de telefone"
          placeholderTextColor="#999"
          value={this.state.phone}
          onChangeText={this.handleChange("phone")}
          style={styles.inputs}
        />
        <TouchableOpacity onPress={this.submitForm} style={styles.logOut}>
          <Text style={styles.TextButtonLogout}>Criar conta</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
