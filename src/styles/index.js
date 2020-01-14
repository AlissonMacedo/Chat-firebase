import react from "react";

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  inputs: {
    height: 30,
    width: 270,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 2,
    marginVertical: 5,
    paddingHorizontal: 10
  },
  button: {
    backgroundColor: "#999",
    width: 100,
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  logOut: {
    backgroundColor: "#7159c1",
    width: 200,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderRadius: 4
  },
  TextButtonLogout: {
    color: "#FFF"
  },
  ViewSendMessege: {
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    padding: 6,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    height: 60
  },
  InputChat: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderRadius: 20
  },
  buttonSend: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7159c1",
    marginHorizontal: 5,
    borderRadius: 4
  },
  buttonSair: {
    width: 200,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "tomato",
    borderRadius: 4
  }
});

export default styles;
