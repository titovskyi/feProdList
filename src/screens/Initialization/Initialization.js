import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  AsyncStorage
} from "react-native";
import { goToMainApp, goToAuth } from "../navigation";
import background from "../../assets/sideDrawerImage.jpg";
import { checkUserToken } from '../../store/actions/index';
import { connect } from 'react-redux';
class Initialization extends Component {
  componentDidMount() {
    AsyncStorage.getItem('token').then(token => {
      console.log(token);
      if(!token) {
        goToAuth();
      } else {
        this.props.onCheckLogin(token);
      }
    })
    
  }

  getUserToken = async() => {
    let userToken = '';
    try {
      userToken = await AsyncStorage.getItem('token') || 'none';;
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
    console.log(userToken)
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

mapDispatchToProps = dispatch => {
  return {
    onCheckLogin: token => dispatch(checkUserToken(token))
  }
}

export default connect(null, mapDispatchToProps)(Initialization);