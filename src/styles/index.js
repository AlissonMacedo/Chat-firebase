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
    margin: 30
  },
  TextButtonLogout: {
    color: "#FFF"
  },
  ViewSendMessege: {
    flexDirection: "row",
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    marginBottom: 10
  },
  InputChat: {
    width: "70%",
    height: 40,
    borderWidth: 1,
    borderColor: "#DDD",
    paddingHorizontal: 10,
    marginHorizontal: 5
  },
  buttonSend: {
    width: "20%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7159c1",
    marginHorizontal: 5
  }
});

export default styles;
