import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ImageBackground
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import background from "../../assets/sideDrawerImage.jpg";
import { connect } from "react-redux";
import { getLists, deleteList } from "../../store/actions/index";
import { Navigation } from "react-native-navigation";

import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from "react-native-popup-menu";

class PrivateLists extends Component {
  constructor(props) {
    super(props);

    Navigation.events().bindComponent(this);
  }

  componentDidMount() {
    console.log("mount");
    this.props.onGetLists();
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

  selectList = selectedList => {
    Navigation.push(this.props.componentId, {
      component: {
        name: "SelectedList",
        passProps: {
          selectedList: selectedList
        },
        options: {
          topBar: {
            title: {
              text: selectedList.name
            }
          }
        }
      }
    });
  };

  listNameHandler = selectedList => {
    Navigation.push(this.props.componentId, {
      component: {
        name: "SetListName",
        passProps: {
          selectedList: selectedList
        },
        options: {
          topBar: {
            title: {
              text: "Название списка"
            }
          }
        }
      }
    });
  };

  deleteItem = itemId => {
    this.props.deleteListHandle(itemId);
  };

  render() {
    return (
      <MenuProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <ImageBackground source={background} style={styles.background}>
            <View>
              <FlatList
                data={this.props.lists}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => this.selectList(item)}>
                    <View style={styles.listItemContainer}>
                      <Text style={styles.listItem}>{item.name}</Text>
                      <View style={styles.listMore}>
                        <Menu>
                          <MenuTrigger style={styles.optionMoreIcon}>
                            <Icon
                              name={
                                Platform.OS === "ios" ? "ios-more" : "md-more"
                              }
                              size={30}
                              color="#eeeeee"
                            />
                          </MenuTrigger>
                          <MenuOptions>
                            <MenuOption
                              onSelect={() => this.listNameHandler(item)}
                            >
                              <Text style={styles.optionMore}>
                                Переименовать
                              </Text>
                            </MenuOption>
                            <MenuOption
                              onSelect={() => this.deleteItem(item.id)}
                            >
                              <Text style={styles.optionMore}>Удалить</Text>
                            </MenuOption>
                          </MenuOptions>
                        </Menu>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
            <View style={styles.addButtonView}>
              <TouchableOpacity onPress={() => this.listNameHandler()}>
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </SafeAreaView>
      </MenuProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    lists: state.lists.lists
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetLists: () => dispatch(getLists()),
    deleteListHandle: listId => dispatch(deleteList(listId))
  };
};

const styles = StyleSheet.create({
  background: {
    flex: 1
  },
  listItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderWidth: 2,
    backgroundColor: "#ffffff",
    margin: 10,
    borderRadius: 10,
    borderColor: "transparent",
    shadowColor: "#000",
    shadowOpacity: 0.8,
    elevation: 3
  },
  listItem: {
    fontSize: 20,
    color: "#695A46"
  },
  listMore: {
    width: 15
  },
  addButtonView: {
    position: "absolute",
    bottom: 20,
    right: 20
  },
  addButtonText: {
    fontSize: 30,
    backgroundColor: "#186B88",
    color: "#ffffff",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 2,
    paddingBottom: 5,
    borderRadius: 50
  },
  optionMore: {
    fontSize: 20,
    padding: 10
  },
  optionMoreIcon: {
    width: 20,
    backgroundColor: "#ffffff",
    alignItems: "center"
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateLists);
