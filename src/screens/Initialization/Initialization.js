import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  StyleSheet
} from "react-native";
import { goToMainApp, goToAuth } from "../navigation";
import background from "../../assets/sideDrawerImage.jpg";

export default class Initialization extends Component {
  componentDidMount() {
    // goToMainApp();
    goToAuth();
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground source={background} style={styles.background}>
          <View>
            <Text> textInComponent </Text>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1
  }
});
