import React, { Component } from "react";
import {
  TextInput,
  View,
  Button,
  Platform,
  TouchableOpacity,
  Text,
  ImageBackground,
  StyleSheet,
  SafeAreaView
} from "react-native";

import background from "../../assets/sideDrawerImage.jpg";
import { goToMainApp } from "../navigation";

import Icon from "react-native-vector-icons/Ionicons";

export default class AuthScreen extends Component {
  state = {
    signUpPage: false
  };

  sighUpHandler = () => {
    this.setState({
      signUpPage: !this.state.signUpPage
    });
  };

  backToApp = () => {
    goToMainApp();
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <ImageBackground source={background} style={styles.background}>
          <View style={styles.authContainer}>
            <View style={{ width: "100%" }}>
              <TouchableOpacity
                style={{ textAlign: "left", width: 42, marginLeft: 5 }}
                onPress={this.backToApp}
              >
                <Icon
                  name={
                    Platform.OS === "androiod"
                      ? "md-arrow-dropleft"
                      : "ios-arrow-dropleft"
                  }
                  style={[styles.backIcon]}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.formContainer}>
              <TextInput
                placeholder="Ваш электронный адресс"
                style={styles.input}
              />
              <TextInput
                placeholder="Ваш пароль"
                style={
                  this.state.signUpPage
                    ? styles.input
                    : [styles.input, { marginBottom: 20 }]
                }
              />
              {this.state.signUpPage ? (
                <TextInput
                  placeholder="Повторите Ваш пароль"
                  style={[styles.input, { marginBottom: 20 }]}
                />
              ) : null}
              <View style={styles.buttonContainer}>
                <Button
                  onPress={() => alert("LogIn")}
                  title={this.state.signUpPage ? "Создать аккаунт" : "Войти"}
                />
              </View>
            </View>
            <TouchableOpacity
              onPress={this.sighUpHandler}
              style={styles.registration}
            >
              <Text style={{ color: "#ffffff", fontWeight: "bold" }}>
                {this.state.signUpPage ? "Войти в аккаунт" : "Регистрация"}
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1
  },
  authContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  backIcon: {
    color: "#ffffff",
    fontWeight: "800",
    fontSize: 50
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    width: "80%",
    textAlign: "center"
  },
  buttonContainer: {
    width: 200
  },
  registration: {
    marginBottom: 10
  }
});
