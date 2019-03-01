import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
  FlatList
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { getFriends, createFriend } from "../../store/actions/index";
import { connect } from "react-redux";

class ShareList extends Component {
  state = {
    userEmail: "",
    loading: true,
    error: {}
  };

  componentDidMount() {
    this.props
      .onGetFriends()
      .then(() => {
        console.log(this.props.friends, "list of friends");
        this.setState({
          loading: false
        });
      })
      .catch(err => {
        this.setState({
          loading: false,
          error: err.data[0].msg
        });
        console.log(err, "friends error");
      });
  }

  addFriend = () => {
    this.setState({
      error: {}
    });
    this.props
      .onAddFriend(this.state.userEmail)
      .then((res) => {
        console.elog(res, 'result user add');
      })
      .catch(err => {
        this.setState({
          error: err
        })
        console.log(err, "friends error");
      });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.inputNameContainer}>
          <TextInput
            placeholder="email друга"
            style={[styles.textInput, { width: "80%" }]}
            onChangeText={userEmail => this.setState({ userEmail: userEmail })}
            value={this.state.userEmail}
          />
          <TouchableOpacity onPress={this.addFriend}>
            <View>
              <Icon
                name={
                  Platform.OS === "ios"
                    ? "ios-add-circle-outline"
                    : "md-add-circle-outline"
                }
                size={40}
              />
            </View>
          </TouchableOpacity>
        </View>
        {this.state.error.error ? (
          <Text style={styles.errors}>
            {this.state.error.error}
          </Text>
        ) : null}
        <FlatList
          data={this.props.friends}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity>
                <Text style={styles.productItemText}>{item.friendEmail}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputNameContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 10,
    marginRight: 15,
    marginLeft: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#695A46"
  },
  textInput: {
    width: "80%",
    fontSize: 20,
    color: "#695A46"
  },
  productItemText: {
    color: "#695A46",
    fontSize: 20,
    padding: 10
  },
  errors: {
    color: "red",
    padding: 5,
    marginBottom: 5,
    width: "100%",
    textAlign: "center"
  }
});

mapStateToProps = state => {
  return {
    friends: state.friends.friends
  };
};
mapDispatchToProps = dispatch => {
  return {
    onGetFriends: () => dispatch(getFriends()),
    onAddFriend: userEmail => dispatch(createFriend(userEmail))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShareList);
