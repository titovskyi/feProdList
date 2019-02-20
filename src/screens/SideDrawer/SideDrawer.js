import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Platform,
  TouchableOpacity,
  StatusBar
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import background from "../../assets/sideDrawerImage.jpg";
import { goToAuth } from "../navigation";
import { SafeAreaView } from "react-native";

export default class SideDrawer extends Component {
  authButtonHandler = () => {
    goToAuth();
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.sideDrawerContainer}>
          <ImageBackground source={background} style={styles.background}>
            <TouchableOpacity
              style={styles.loginOrSignUpButtonContainer}
              onPress={this.authButtonHandler}
            >
              <Text
                style={[
                  styles.loginOrSignUpButton,
                  { backgroundColor: "#186B88" }
                ]}
              >
                Войти или зарегестрироваться
              </Text>
            </TouchableOpacity>
          </ImageBackground>
          <View style={styles.sideMenuContainer}>
            <TouchableOpacity style={styles.sideMenuPointContainer}>
              <Icon
                name={
                  Platform.OS === "android" ? "md-list-box" : "ios-list-box"
                }
                size={30}
                color="blue"
                style={styles.sideMenuIcon}
              />
              <Text style={styles.sideMenuText}>Мои списки</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sideMenuPointContainer}>
              <Icon
                name={Platform.OS === "android" ? "md-list" : "ios-list"}
                size={30}
                color="green"
                style={styles.sideMenuIcon}
              />
              <Text style={styles.sideMenuText}>Групповые списки</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sideMenuPointContainer}>
              <Icon
                name={Platform.OS === "android" ? "md-filing" : "ios-filing"}
                size={30}
                color="orange"
                style={styles.sideMenuIcon}
              />
              <Text style={styles.sideMenuText}>Все продукты</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  sideDrawerContainer: {
    flex: 1,
    backgroundColor: "white"
  },
  background: {
    width: "100%",
    height: 150
  },
  loginOrSignUpButtonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  loginOrSignUpButton: {
    textAlign: "center",
    width: "80%",
    fontSize: 20,
    color: "#ffffff",
    borderRadius: 10,
    padding: 5
  },
  sideMenuContainer: {
    paddingTop: 40,
    backgroundColor: "#eee",
    flex: 1
  },
  sideMenuPointContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: 5,
    paddingBottom: 5
  },
  sideMenuIcon: {
    marginRight: 20,
    width: 30,
    textAlign: "center"
  },
  sideMenuText: {
    fontSize: 20
  }
});
