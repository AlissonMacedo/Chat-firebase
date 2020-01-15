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
console.ignoredYellowBox = ["Warning:"];

export default class Home extends React.Component {
  state = {
    users: [],
    dbRef: firebase.database().ref("users")
  };

  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;

    this.state.dbRef.on("child_added", val => {
      let person = val.val();
      person.phone = val.key;
      if (person.phone === User.phone) {
        User.name = person.name;
        User.image = person.image ? person.image : null;
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
    this._isMounted = false;
    this.state.dbRef.off();
  }

  renderRow = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate("Chat", item)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          borderBottomColor: "#ccc",
          borderBottomWidth: 1
        }}
      >
        <Image
          source={
            item.image ? { uri: item.image } : require("../../assets/user.png")
          }
          style={{
            width: 32,
            height: 32,
            resizeMode: "cover",
            borderRadius: 32,
            marginRight: 5
          }}
        />
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
