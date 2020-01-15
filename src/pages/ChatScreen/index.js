import React from "react";
import {
  KeyboardAvoidingView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Animated,
  Platform,
  Keyboard,
  Image
} from "react-native";

import User from "../../../User";
import firebase from "firebase";
import styles from "../../styles";

import imageSend from "../../assets/send.png";

const isIOS = false;
console.ignoredYellowBox = ["Warning:"];
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
      messageList: "",
      dbRef: firebase.database().ref("messages")
    };
    this.keyboardHeight = new Animated.Value(0);
    this.bottomPadding = new Animated.Value(60);
  }

  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    this.keyboardShowListener = Keyboard.addListener(
      isIOS ? "KeyboardWillShow" : "keyboardDidShow",
      e => this.keyboardEvent(e, true)
    );

    this.keyboardHideListener = Keyboard.addListener(
      isIOS ? "keyboardWillHide" : "keyboardDidHide",
      e => this.keyboardEvent(e, false)
    );

    this.state.dbRef
      .child(User.phone)
      .child(this.state.person.phone)
      .on("child_added", value => {
        this.setState(prevState => {
          return { messageList: [...prevState.messageList, value.val()] };
        });
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.state.dbRef.off();
    this.keyboardShowListener.remove();
    this.keyboardHideListener.remove();
  }

  keyboardEvent = (event, isShow) => {
    let heightOS = isIOS ? 80 : 70;
    let bottomOS = isIOS ? 160 : 160;
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: isShow ? heightOS : 0
      }),
      Animated.timing(this.bottomPadding, {
        duration: event.duration,
        toValue: isShow ? bottomOS : 60
      })
    ]).start();
  };

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
      let msgId = this.state.dbRef
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
        User.phone + "/" + this.state.person.phone + "/" + msgId
      ] = message;
      updates[
        this.state.person.phone + "/" + User.phone + "/" + msgId
      ] = message;
      this.state.dbRef.update(updates);
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
        <View style={{ flexDirection: "column", maxWidth: "100%" }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "#fff", padding: 7, fontSize: 16 }}>
              {item.message}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
            <Text
              style={{
                color: "#eee",
                padding: 3,
                paddingLeft: 30,
                marginTop: -10,
                fontSize: 12
              }}
            >
              {this.converTime(item.time)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  render() {
    let { height } = Dimensions.get("window");

    return (
      <KeyboardAvoidingView
        enabled={true}
        behavior="height"
        style={{ flex: 1 }}
      >
        <Animated.View
          style={[styles.ViewSendMessege, { bottom: this.keyboardHeight }]}
        >
          <TextInput
            style={styles.InputChat}
            value={this.state.textMessege}
            placeholder="Digite um texto..."
            onChangeText={this.handleChange("textMessege")}
          />
          <TouchableOpacity
            onPress={this.sendMessage}
            style={[styles.buttonSend, { borderRadius: 20, paddingRight: 5 }]}
          >
            <Image
              source={imageSend}
              style={{
                width: 20,
                height: 20,
                resizeMode: "contain",
                tintColor: "#FFF"
              }}
            />
          </TouchableOpacity>
        </Animated.View>

        <FlatList
          ref={ref => (this.flatList = ref)}
          onContentSizeChange={() =>
            this.flatList.scrollToEnd({ animated: true })
          }
          onLayout={() => this.flatList.scrollToEnd({ animated: true })}
          style={{ paddingTop: 5, paddingHorizontal: 5, height }}
          data={this.state.messageList}
          renderItem={this.renderRow}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={
            <Animated.View style={{ height: this.bottomPadding }} />
          }
        />
      </KeyboardAvoidingView>
    );
  }
}
