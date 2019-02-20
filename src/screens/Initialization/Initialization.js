import React, { Component } from "react";
import { Text, View, SafeAreaView } from "react-native";
import { goToMainApp } from "../navigation";

export default class Initialization extends Component {
  componentDidMount() {
    goToMainApp();
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View>
          <Text> textInComponent </Text>
        </View>
      </SafeAreaView>
    );
  }
}
