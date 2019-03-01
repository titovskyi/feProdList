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
  SafeAreaView,
  ActivityIndicator
} from "react-native";

import background from "../../assets/sideDrawerImage.jpg";
import { goToMainApp } from "../navigation";
import { connect } from "react-redux";
import { tryAuth, loginUser } from "../../store/actions/index";
import validation from "../../utility/validation";
import Icon from "react-native-vector-icons/Ionicons";

class AuthScreen extends Component {
  state = {
    signUpPage: false,
    loading: false,
    error: {},
    user: "",
    controls: {
      login: {
        value: "",
        valid: false,
        validationRules: {
          minLength: 3
        },
        touched: false
      },
      email: {
        value: "",
        valid: false,
        validationRules: {
          isEmail: true
        },
        touched: false
      },
      password: {
        value: "",
        valid: false,
        validationRules: {
          minLength: 6
        },
        touched: false
      },
      passwordConfirm: {
        value: "",
        valid: false,
        validationRules: {
          equalTo: "password"
        },
        touched: false
      }
    }
  };

  sighUpLoginHandler = () => {
    this.setState({
      signUpPage: !this.state.signUpPage
    });
  };

  backToApp = () => {
    goToMainApp();
  };

  updateInputState = (key, value) => {
    let connectedValue = {};
    if (this.state.controls[key].validationRules.equalTo) {
      const equalControl = this.state.controls[key].validationRules.equalTo;
      const equalValue = this.state.controls[equalControl].value;
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      };
    }
    if (key === "password") {
      connectedValue = {
        ...connectedValue,
        equalTo: value
      };
    }
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          passwordConfirm: {
            ...prevState.controls.passwordConfirm,
            valid:
              key === "password"
                ? validation(
                    prevState.controls.passwordConfirm.value,
                    prevState.controls.passwordConfirm.validationRules,
                    connectedValue
                  )
                : prevState.controls.passwordConfirm.valid
          },
          [key]: {
            ...prevState.controls[key],
            value: value,
            valid: validation(
              value,
              prevState.controls[key].validationRules,
              connectedValue
            ),
            touched: true
          }
        }
      };
    });
  };

  loginHandler = () => {
    const authData = {
      login: this.state.controls.login.value,
      email: this.state.controls.email.value,
      password: this.state.controls.password.value
    };
    this.setState({
      loading: true,
      error: {}
    });
    this.state.signUpPage
      ? this.props
          .onSignup(authData)
          .then(() => {
            this.setState({
              loading: false,
              signUpPage: false
            });
          })
          .catch(err => {
            this.setState({
              loading: false,
              error: err
            });
          })
      : this.props.onLogin(authData).catch(err => {
          this.setState({
            loading: false,
            error: err
          });
        });
  };

  render() {
    const singButton = this.state.signUpPage ? (
      <Button
        onPress={() => this.loginHandler()}
        disabled={
          !this.state.controls.email.valid ||
          !this.state.controls.login.valid ||
          !this.state.controls.password.valid ||
          !this.state.controls.passwordConfirm.valid
        }
        title={"Создать аккаунт"}
      />
    ) : (
      <Button
        onPress={() => this.loginHandler()}
        disabled={
          !this.state.controls.email.valid ||
          !this.state.controls.password.valid
        }
        title={"Войти"}
      />
    );

    if (this.state.loading) {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <ImageBackground source={background} style={styles.background}>
            <ActivityIndicator
              animating={true}
              style={styles.indicator}
              size="large"
              color="#186B88"
            />
          </ImageBackground>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={{ flex: 1 }}>
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
              {this.state.error.error ? (
                <Text style={styles.errors}>
                  {this.state.error.data[0].msg}
                </Text>
              ) : null}

              {this.state.signUpPage ? (
                <TextInput
                  placeholder="Ваш логин"
                  onChangeText={val => this.updateInputState("login", val)}
                  value={this.state.controls.login.value}
                  style={[
                    styles.input,
                    !this.state.controls.login.valid &&
                    this.state.controls.login.touched
                      ? styles.invalid
                      : null
                  ]}
                />
              ) : null}
              <TextInput
                placeholder="Ваш электронный адресс"
                onChangeText={val => this.updateInputState("email", val)}
                value={this.state.controls.email.value}
                style={[
                  styles.input,
                  !this.state.controls.email.valid &&
                  this.state.controls.email.touched
                    ? styles.invalid
                    : null
                ]}
              />
              <TextInput
                placeholder="Ваш пароль"
                style={[
                  styles.input,
                  this.state.signUpPage ? null : { marginBottom: 20 },
                  !this.state.controls.password.valid &&
                  this.state.controls.password.touched
                    ? styles.invalid
                    : null
                ]}
                onChangeText={val => this.updateInputState("password", val)}
                value={this.state.controls.password.value}
              />
              {this.state.signUpPage ? (
                <TextInput
                  placeholder="Повторите Ваш пароль"
                  style={[
                    styles.input,
                    { marginBottom: 20 },
                    !this.state.controls.passwordConfirm.valid &&
                    this.state.controls.passwordConfirm.touched
                      ? styles.invalid
                      : null
                  ]}
                  onChangeText={val =>
                    this.updateInputState("passwordConfirm", val)
                  }
                  value={this.state.controls.passwordConfirm.value}
                />
              ) : null}
              <View style={styles.buttonContainer}>{singButton}</View>
            </View>
            <TouchableOpacity
              onPress={this.sighUpLoginHandler}
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
  },
  invalid: {
    backgroundColor: "#f9c0c0",
    borderColor: "red"
  },
  indicator: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 80
  },
  errors: {
    color: "red",
    backgroundColor: "white",
    padding: 5,
    marginBottom: 5,
    borderRadius: 10,
    width: "80%",
    textAlign: "center"
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onSignup: authData => dispatch(tryAuth(authData)),
    onLogin: loginData => dispatch(loginUser(loginData))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AuthScreen);
