import React from "react";

import {
  View,
  Text,
  AsyncStorage,
  TouchableOpacity,
  FlatList,
  SafeAreaView
} from "react-native";
import firebase from "firebase";

import User from "../../../User";

import styles from "../../styles";

export default class Home extends React.Component {
  static navigationOptions = () => {
    return {
      title: "Chat Firebase"
    };
  };
  state = {
    users: []
  };

  componentDidMount() {
    let dbRef = firebase.database().ref("users");
    dbRef.on("child_added", val => {
      let person = val.val();
      person.phone = val.key;
      if (person.phone === User.phone) {
        User.name = person.name;
      } else {
        this.setState(prevState => {
          return {
            users: [...prevState.users, person]
          };
        });
      }
    });
  }

  _logOut = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };

  renderRow = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate("Chat", item)}
        style={{
          padding: 10,
          borderBottomColor: "#ccc",
          borderBottomWidth: 1
        }}
      >
        <Text style={{ fontSize: 20 }}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          style={{
            width: "100%"
          }}
          data={this.state.users}
          renderItem={this.renderRow}
          keyExtractor={item => item.phone}
        />
        <TouchableOpacity onPress={this._logOut} style={styles.logOut}>
          <Text style={styles.TextButtonLogout}>SAIR</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
