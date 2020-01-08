import React from "react";

import {
  SafeAreaView,
  Text,
  TextInput,
  Alert,
  TouchableOpacity
} from "react-native";

import styles from "../../styles";

import User from "../../../User";

import firebase from "firebase";

export default class Perfil extends React.Component {
  static navigationOptions = {
    title: "Profile"
  };

  state = {
    name: User.name
  };

  handleChange = key => val => {
    this.setState({ [key]: val });
  };

  changeName = async () => {
    if (this.state.name.length < 3) {
      Alert.alert("Erro", "Entre com um nome valido!");
    } else if (User.name !== this.state.name) {
      firebase
        .database()
        .ref("users")
        .child(User.phone)
        .set({ name: this.state.name });

      User.name = this.state.name;

      Alert.alert("Sucesso", "Nome alterado com sucesso!");
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ fontSize: 20 }}>{User.phone}</Text>
        <TextInput
          style={styles.inputs}
          value={this.state.name}
          onChangeText={this.handleChange("name")}
        />
        <TouchableOpacity onPress={this.changeName} style={styles.logOut}>
          <Text style={styles.TextButtonLogout}>Mudar Nome</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
