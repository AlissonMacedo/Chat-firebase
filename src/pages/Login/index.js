import React from "react";

import {
  Text,
  Alert,
  AsyncStorage,
  TouchableOpacity,
  TextInput,
  View
} from "react-native";

import styles from "../../styles";

import firebase from 'firebase';
import User from '../../../User';

export default class Login extends React.Component {
  state = {
    phone: "",
    name: ""
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
      firebase.database().ref('users/' + User.phone).set({ name: this.state.name });
      this.props.navigation.navigate("Home");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          keyboardType="number-pad"
          placeholder="Número de telefone"
          placeholderTextColor="#999"
          value={this.state.phone}
          onChangeText={this.handleChange("phone")}
          style={styles.inputs}
        />
        <TextInput
          keyboardType="number-pad"
          placeholder="Número de telefone"
          placeholderTextColor="#999"
          value={this.state.name}
          onChangeText={this.handleChange("name")}
          style={styles.inputs}
        />
        <TouchableOpacity onPress={this.submitForm} style={styles.button}>
          <Text style={styles.TextButtonLogout}>Entrar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
