import React, { Component } from "react";
import {
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import { goToAuth } from "../navigation";
import background from "../../assets/sideDrawerImage.jpg";
import { checkUserToken } from "../../store/actions/index";
import { connect } from "react-redux";
class Initialization extends Component {
  state = {
    loading: true
  };

  componentDidMount() {
    AsyncStorage.getItem("token").then(token => {
      if (!token) {
        goToAuth();
      } else {
        this.props.onCheckLogin(token);
      }
    });
  }

  render() {
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
}

const styles = StyleSheet.create({
  background: {
    flex: 1
  },
  indicator: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 80
  }
});

mapDispatchToProps = dispatch => {
  return {
    onCheckLogin: token => dispatch(checkUserToken(token))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Initialization);
