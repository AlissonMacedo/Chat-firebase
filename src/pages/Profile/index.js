import React from "react";

import {
  KeyboardAvoidingView,
  SafeAreaView,
  View,
  AsyncStorage,
  Button,
  Image,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

import styles from "../../styles";

import User from "../../../User";

import firebase from "firebase";

import userImage from "../../assets/user.png";

export default class Profile extends React.Component {
  state = {
    name: User.name,
    image: User.image ? { uri: User.image } : require("../../assets/user.png"),
    upload: false
  };

  handleChange = key => val => {
    this.setState({ [key]: val });
  };

  changeName = async () => {
    if (this.state.name.length < 3) {
      Alert.alert("Erro", "Entre com um nome valido!");
    } else if (User.name !== this.state.name) {
      User.name = this.state.name;
      this.updateUser();
    }
  };

  componentDidMount() {
    this.getPermissionAsync();
    console.log("hi");
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState(
        {
          image: { uri: result.uri },
          upload: true
        },
        this.uploadFile
      );
    }
  };

  updateUser = () => {
    firebase
      .database()
      .ref("users")
      .child(User.phone)
      .set(User);

    Alert.alert("Sucesso", "Savo com sucesso!");
  };

  updateUserImage = imageUrl => {
    User.image = imageUrl;
    this.updateUser();
    this.setState({ upload: false, image: { uri: imageUrl } });
  };

  uploadFile = async () => {
    const file = await this.uriToBlob(this.state.image.uri);
    firebase
      .storage()
      .ref(`profile_pictures/${User.phone}.png`)
      .put(file)
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then(url => this.updateUserImage(url))
      .catch(error => {
        this.setState({
          upload: false,
          image: require("../../assets/user.png")
        });
        console.log(error);
        Alert.alert("Error", "Error on upload image");
      });
  };

  uriToBlob = uri => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };

      xhr.onerror = function() {
        reject(new Error("Error on upload image"));
      };

      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  };

  _logOut = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };

  render() {
    let { image } = this.state;

    return (
      <KeyboardAvoidingView
        enabled={true}
        behavior="padding"
        style={{ flex: 1, flexDirection: "row" }}
      >
        <SafeAreaView style={styles.container}>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            {this.state.upload ? (
              <ActivityIndicator size="large" />
            ) : (
              <Image
                source={image}
                style={{
                  width: 200,
                  height: 200,
                  resizeMode: "cover",
                  borderRadius: 100
                }}
              />
            )}
            <Button title="Trocar Foto" onPress={this._pickImage} />
          </View>

          <Text style={{ fontSize: 20 }}>ID: {User.phone}</Text>
          <TextInput
            style={styles.inputs}
            value={this.state.name}
            onChangeText={this.handleChange("name")}
          />
          <TouchableOpacity onPress={this.changeName} style={styles.logOut}>
            <Text style={styles.TextButtonLogout}>Mudar Nome</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this._logOut} style={styles.buttonSair}>
            <Text style={{ color: "tomato" }}>SAIR</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

Profile.navigationOptions = {
  title: "Profile",
  tabBarLabel: "Profile",
  tabBarIcon: ({ tintColor }) => (
    <Image
      source={require("../../assets/settings.png")}
      style={{ width: 25, resizeMode: "contain", tintColor }}
    />
  ),
  tabBarOptions: {
    activeTintColor: "tomato",
    inactiveTintColor: "gray"
  }
};
