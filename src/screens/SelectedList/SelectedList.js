import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  SectionList,
  ActivityIndicator,
  SafeAreaView
} from "react-native";
import { connect } from "react-redux";
import {
  getList,
  createProduct,
  changeProdState,
  deleteProductFromList,
  addUserProduct,
  changeProduct,
  getProducts
} from "../../store/actions/index";
import { Dropdown } from "react-native-material-dropdown";
import Icon from "react-native-vector-icons/Ionicons";
import departments from "../../assets/departments";
import { Navigation } from "react-native-navigation";
import Autocomplete from "react-native-autocomplete-input";
import background from "../../assets/sideDrawerImage.jpg";

class SelectedList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      error: {},
      prodName: "",
      department: "",
      sections: []
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.products !== prevState.products) {
      let section = [];
      let bought = nextProps.products.filter(
        item => item.listProduct.state === false
      );
      let needToBuy = nextProps.products.filter(
        item => item.listProduct.state === true
      );
      needToBuy.forEach(prod => {
        let sectionBought = section.find(
          item => item.title === prod.department
        );
        if (!sectionBought) {
          section.push({
            title: prod.department,
            data: [prod]
          });
        } else {
          section.map(item => {
            if (item.title === prod.department) {
              item.data.push(prod);
            }
          });
        }
      });

      let sortedSections = section.sort((a, b) => {
        if (a.title > b.title) {
          return 1;
        } else if (a.title < b.title) {
          return -1;
        } else if (a.title === b.title) {
          return 0;
        }
      });

      bought.forEach(prod => {
        let sectionBought = section.find(item => item.title === "Куплено");
        if (!sectionBought) {
          sortedSections.push({
            title: "Куплено",
            data: [prod]
          });
        } else {
          sortedSections.map(item => {
            if (item.title === "Куплено") {
              item.data.push(prod);
            }
          });
        }
      });
      return {
        sections: sortedSections
      };
    }
  }

  componentDidMount() {
    Navigation.events().bindComponent(this);
    this.props
      .onGetList(this.props.selectedList)
      .then(() => {
        this.setState({
          loading: false
        });
      })
      .catch(err => {
        this.setState({
          loading: false
        });
        alert("Проблемы с сервером, попробуйте позже");
      });
    this.props
      .onGetProducts()
      .then(() => {
        this.setState({
          loading: false
        });
      })
      .catch(err => {
        this.setState({
          loading: false
        });
        alert("Проблемы с сервером, попробуйте позже");
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

  addProduct = () => {
    if (this.state.prodName) {
      const productName = {
        productName: this.state.prodName,
        department: this.state.department || "another"
      };

      let changeAllProducts = this.props.allProducts.find(
        item => item.name === this.state.prodName
      );
      if (changeAllProducts) {
        const changedProd = {
          ...changeAllProducts,
          department: this.state.department
        };
        this.props.onChangeUserProducts(changedProd);
      } else {
        this.props.onAddUserProduct({
          name: this.state.prodName,
          department: this.state.department
        });
      }

      let productAdded = this.props.products.find(
        item => item.name === this.state.prodName
      );
      if (!productAdded) {
        const listProduct = { ...this.props.selectedList, ...productName };
        this.props
          .onAddProduct(listProduct)
          .catch(err => {
            alert("Проблемы с сервером, попробуйте позже");
          });
      }

      this.setState({
        prodName: "",
        department: ""
      });
    }

    return;
  };

  deleteProductFromList = prod => {
    this.props
      .onDeleteProduct(prod)
      .catch(err => {
        alert("Проблемы с сервером, попробуйте позже");
      });
  };

  changeProdState = prod => {
    prod.listProduct.state = !prod.listProduct.state;
    this.props
      .onChangeState(prod)
      .catch(err => {
        alert("Проблемы с сервером, попробуйте позже");
      });
  };

  findProduct(name) {
    if (name === "") {
      return [];
    }

    const { allProducts } = this.props;
    const regex = new RegExp(`${name.trim()}`, "i");
    return allProducts.filter(product => product.name.search(regex) >= 0);
  }

  render() {
    const infoBlock =
      this.state.prodName.length >= 3 ? (
        <View style={styles.infoInputContainer}>
          <Dropdown
            placeholder="Категория"
            data={departments}
            onChangeText={department => this.setState({ department })}
            fontSize={20}
            itemCount={6}
            style={styles.dropdown}
            value={this.state.department}
          />
          <TextInput
            placeholder="Количество"
            style={[styles.textInput, { width: "100%" }]}
            keyboardType="numeric"
            name="quantity"
            onChangeText={quantity =>
              this.setState({ quantity: quantity.replace(/[^0-9]/g, "") })
            }
            value={this.state.quantity}
            maxLength={3}
          />
        </View>
      ) : null;

    const products = this.findProduct(this.state.prodName);
    if (this.state.loading) {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.background}>
            <ActivityIndicator
              animating={true}
              style={styles.indicator}
              size="large"
              color="#186B88"
            />
          </View>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.main}>
          <View
            style={[
              styles.inputNameContainer,
              this.state.prodName.length >= 3 ? null : { marginBottom: 15 }
            ]}
          >
            <View style={styles.autocompleteContainer}>
              <Autocomplete
                style={[{ fontSize: 20 }]}
                inputContainerStyle={styles.inputContainerStyle}
                listContainerStyle={[styles.listContainerStyle]}
                placeholder="Введите товар"
                listStyle={styles.listStyle}
                data={
                  products.find(item => this.state.prodName === item.name)
                    ? []
                    : products
                }
                defaultValue={this.state.prodName}
                onChangeText={text => this.setState({ prodName: text })}
                renderItem={item => (
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        prodName: item.name,
                        department: item.department
                      })
                    }
                  >
                    <Text style={{ fontSize: 20, margin: 5 }}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
            <TouchableOpacity onPress={this.addProduct}>
              <View style={{ marginTop: 5 }}>
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
          {infoBlock}
          <SectionList
            renderItem={({ item, index, section }) => (
              <TouchableOpacity onPress={() => this.changeProdState(item)}>
                <View style={styles.productItem}>
                  <Text
                    key={index}
                    style={[
                      styles.productItemText,
                      item.listProduct.state
                        ? { textDecorationLine: "none" }
                        : { textDecorationLine: "line-through" }
                    ]}
                  >
                    {item.name}
                  </Text>
                  <TouchableOpacity
                    onPress={() => this.deleteProductFromList(item)}
                  >
                    <Icon
                      name={Platform.OS === "ios" ? "ios-close" : "md-close"}
                      style={styles.closeIcon}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={[styles.productItemText, { fontWeight: "bold" }]}>
                {title}
              </Text>
            )}
            sections={this.state.sections}
            keyExtractor={(item, index) => item + index}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1
  },
  dropdown: {
    paddingLeft: 15
  },
  main: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  inputNameContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 10,
    marginRight: 15,
    marginLeft: 5
  },
  infoInputContainer: {
    marginBottom: 20
  },
  textInput: {
    width: "80%",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.8,
    elevation: 1,
    marginRight: 15,
    fontSize: 20,
    paddingLeft: 15,
    color: "#695A46"
  },
  inputContainerStyle: {
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0
  },
  listStyle: {
    marginLeft: 0,
    marginRight: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0
  },
  productItem: {
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
  productItemText: {
    color: "#695A46",
    fontSize: 20,
    paddingLeft: 10
  },
  closeIcon: {
    fontWeight: "900",
    fontSize: 35,
    color: "red"
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: "absolute",
    right: 60,
    top: 0,
    zIndex: 1
  },
  indicator: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 80
  }
});

const mapStateToProps = state => {
  return {
    products: state.lists.products,
    allProducts: state.products.products
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetList: selectedList => dispatch(getList(selectedList.id)),
    onChangeUserProducts: changedProd => dispatch(changeProduct(changedProd)),
    onAddUserProduct: productName => dispatch(addUserProduct(productName)),
    onAddProduct: product => dispatch(createProduct(product)),
    onChangeState: prod => dispatch(changeProdState(prod)),
    onDeleteProduct: prodId => dispatch(deleteProductFromList(prodId)),
    onGetProducts: () => dispatch(getProducts())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedList);
