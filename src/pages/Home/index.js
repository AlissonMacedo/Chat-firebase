import React from "react";

import {
  View,
  Text,
  Image,
  AsyncStorage,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Dimensions
} from "react-native";
import firebase from "firebase";
import profile from "../../assets/profile.png";
import User from "../../../User";

import styles from "../../styles";

export default class Home extends React.Component {
  state = {
    users: [],
    dbRef: firebase.database().ref("users")
  };

  componentDidMount() {
    this.state.dbRef.on("child_added", val => {
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

  componentWillUnmount() {
    this.state.dbRef.off();
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
    const { height } = Dimensions.get("window");
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          style={{
            width: "100%",
            height
          }}
          data={this.state.users}
          renderItem={this.renderRow}
          keyExtractor={item => item.phone}
          ListHeaderComponent={() => (
            <Text
              style={{
                fontSize: 30,
                marginVertical: 10,
                marginLeft: 10,
                fontWeight: "bold"
              }}
            >
              Chats
            </Text>
          )}
        />
      </SafeAreaView>
    );
  }
}

Home.navigationOptions = {
  header: null,
  title: "Home",
  tabBarLabel: "Home",
  tabBarIcon: ({ tintColor }) => (
    <Image
      source={require("../../assets/comments.png")}
      style={{ width: 25, resizeMode: "contain", tintColor }}
    />
  ),
  tabBarOptions: {
    activeTintColor: "tomato",
    inactiveTintColor: "gray"
  }
};
