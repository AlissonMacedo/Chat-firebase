import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions
} from "react-native";

import User from "../../../User";
import firebase from "firebase";
import styles from "../../styles";

export default class ChatScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("name", null)
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      person: {
        name: props.navigation.getParam("name"),
        phone: props.navigation.getParam("phone")
      },
      textMessege: "",
      messageList: ""
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref("messages")
      .child(User.phone)
      .child(this.state.person.phone)
      .on("child_added", value => {
        this.setState(prevState => {
          return { messageList: [...prevState.messageList, value.val()] };
        });
      });
  }

  handleChange = key => val => {
    this.setState({ [key]: val });
  };

  converTime = time => {
    let d = new Date(time);
    let c = new Date();
    let result = (d.getHours() < 10 ? "0" : "") + d.getHours() + ":";
    result += (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();
    if (c.getDate() !== d.getDate()) {
      result = d.getDay() + " " + d.getMonth() + " " + result;
    }
    return result;
  };

  sendMessage = async () => {
    if (this.state.textMessege.length > 0) {
      let msgId = firebase
        .database()
        .ref("messages")
        .child(User.phone)
        .child(this.state.person.phone)
        .push().key;
      let updates = {};
      let message = {
        message: this.state.textMessege,
        time: firebase.database.ServerValue.TIMESTAMP,
        from: User.phone
      };
      updates[
        "messages/" + User.phone + "/" + this.state.person.phone + "/" + msgId
      ] = message;
      updates[
        "messages/" + this.state.person.phone + "/" + User.phone + "/" + msgId
      ] = message;
      firebase
        .database()
        .ref()
        .update(updates);
      this.setState({ textMessege: "" });
    }
  };

  renderRow = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          maxWidth: "80%",
          alignSelf: item.from === User.phone ? "flex-end" : "flex-start",
          backgroundColor: item.from === User.phone ? "#00897b" : "#7cb342",
          borderRadius: 5,
          marginBottom: 10
        }}
      >
        <Text style={{ color: "#fff", padding: 7, fontSize: 16 }}>
          {item.message}
        </Text>
        <Text style={{ color: "#eee", padding: 3, fontSize: 12 }}>
          {this.converTime(item.time)}
        </Text>
      </View>
    );
  };

  render() {
    let { height, width } = Dimensions.get("window");

    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          style={{ padding: 10, height: height * 0.8, width: "100%" }}
          data={this.state.messageList}
          renderItem={this.renderRow}
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={styles.ViewSendMessege}>
          <TextInput
            style={styles.InputChat}
            value={this.state.textMessege}
            placeholder="Digite um texto..."
            onChangeText={this.handleChange("textMessege")}
          />
          <TouchableOpacity
            onPress={this.sendMessage}
            style={styles.buttonSend}
          >
            <Text style={styles.TextButtonLogout}>Send</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
