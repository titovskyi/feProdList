import React, { Component, PureComponent } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
  FlatList
} from "react-native";
import { Navigation } from "react-native-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import { getFriends, createFriend, shareList, deleteFriend } from "../../store/actions/index";
import { connect } from "react-redux";

class ShareList extends PureComponent {
  state = {
    userEmail: "",
    loading: true,
    error: {},
    success: {}
  };

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.friends !== prevState.friends) {

  //   }
  // }
  componentDidMount() {
    Navigation.events().bindComponent(this);
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

  navigationButtonPressed = ({ buttonId }) => {
    if (buttonId === "toggleDrawer") {
      Navigation.mergeOptions("SideDrawer", {
        sideMenu: {
          left: {
            visible: true
          }
        }
      });
    }
  };

  addFriend = () => {
    this.setState({
      error: {},
      success: {}
    });
    this.props
      .onAddFriend(this.state.userEmail)
      .then(res => {
        console.log(res, "result user add");
      })
      .catch(err => {
        this.setState({
          error: err
        });
      });
    this.setState({ userEmail: "" });
  };

  deleteFriend = friendEmail => {
    this.props.onDeleteFriend(friendEmail).catch(err => {
      alert(err);
    });
  };

  shareList = friendEmail => {
    this.setState({
      error: {},
      success: {}
    });
    const listId = this.props.selectedList.userList.listId;
    console.log(friendEmail, "email");
    this.props
      .onShareList(friendEmail, listId)
      .then(res => {
        this.setState({
          success: res
        });
        console.log(res, "success");
      })
      .catch(err => {
        this.setState({
          error: err
        });
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
          <Text style={styles.errors}>{this.state.error.error}</Text>
        ) : null}
        {this.state.success.message ? (
          <Text style={styles.success}>{this.state.success.message}</Text>
        ) : null}
        <FlatList
          data={this.props.friends}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => this.shareList(item.friendEmail)}
              >
                <View style={styles.friendItem}>
                  <Text style={styles.productItemText}>{item.friendEmail}</Text>
                  <TouchableOpacity
                    onPress={() => this.deleteFriend(item.friendEmail)}
                  >
                    <Icon
                      name={Platform.OS === "ios" ? "ios-close" : "md-close"}
                      style={styles.closeIcon}
                    />
                  </TouchableOpacity>
                </View>
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
  friendItem: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 3,
    marginBottom: 3,
    marginRight: "auto",
    marginLeft: "auto",
    borderBottomColor: "#eeeeee",
    borderBottomWidth: 1
  },
  closeIcon: {
    fontWeight: "900",
    fontSize: 35,
    color: "red"
  },
  errors: {
    color: "red",
    padding: 5,
    marginBottom: 5,
    width: "100%",
    textAlign: "center"
  },
  success: {
    color: "green",
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
    onAddFriend: userEmail => dispatch(createFriend(userEmail)),
    onDeleteFriend: friendEmail => dispatch(deleteFriend(friendEmail)),
    onShareList: (friendEmail, listId) =>
      dispatch(shareList(friendEmail, listId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShareList);
