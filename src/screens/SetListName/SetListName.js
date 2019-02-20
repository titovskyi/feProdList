import React, { Component } from "react";
import { Text, View, StyleSheet, TextInput, Button, Keyboard } from "react-native";
import { createList, putList } from '../../store/actions/index';
import { connect } from "react-redux";
import { Navigation } from "react-native-navigation";

class SetListName extends Component {
  state = {
    listId: this.props.selectedList ? this.props.selectedList.id : "",
    listName: this.props.selectedList ? this.props.selectedList.name : ""
  };

  constructor(props) {
    super(props);
    this.inputChangeHandle = this.inputChangeHandle.bind(this);
  }

  componentDidMount() {
    Navigation.events().bindComponent(this);
  }

  inputChangeHandle = (event) => {
    this.setState({
      listName: event
    })
  };

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

  submitListName = () => {
    Keyboard.dismiss();
    this.props.selectedList ? this.props.onPutList(this.state) : this.props.onPostList(this.state.listName);
    Navigation.pop(this.props.componentId);
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputHeader}>Название списка</Text>
          <TextInput
            style={styles.input}
            name="listName"
            onChangeText={this.inputChangeHandle}
            value={this.state.listName}
          />
          <View style={styles.buttonContainer}>
            <Button
              title={this.props.selectedList ? "Изменить" : "Создать"}
              color="#186B88"
              onPress={this.submitListName}
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPostList: (listName) => dispatch(createList(listName)),
    onPutList: (list) => dispatch(putList(list))
  };
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  inputContainer: {
    width: "90%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.8,
    elevation: 3
  },
  inputHeader: {
    margin: 10,
    marginLeft: 30
  },
  input: {
    width: "80%",
    fontSize: 20,
    borderBottomColor: "#186B88",
    borderBottomWidth: 2,
    marginLeft: "auto",
    marginRight: "auto"
  },
  buttonContainer: {
    alignItems: "flex-end",
    margin: 20
  }
});

export default connect(null, mapDispatchToProps)(SetListName);
