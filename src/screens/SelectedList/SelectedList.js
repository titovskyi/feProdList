import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Platform,
  SectionList
} from "react-native";
import { connect } from "react-redux";
import {
  getList,
  createProduct,
  changeProdState,
  deleteProductFromList
} from "../../store/actions/index";
import { Dropdown } from "react-native-material-dropdown";
import Icon from "react-native-vector-icons/Ionicons";
import departments from '../../assets/departments';
import { Navigation } from "react-native-navigation";

class SelectedList extends Component {
  constructor(props) {
    super(props);

    this.state = {
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

      bought.forEach(prod => {
        let sectionBought = section.find(item => item.title === "Куплено");
        if (!sectionBought) {
          section.push({
            title: "Куплено",
            data: [prod]
          });
        } else {
          section.map(item => {
            if (item.title === "Куплено") {
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
      })

      return {
        sections: sortedSections
      };
    }
  }

  componentDidMount() {
    Navigation.events().bindComponent(this);
    this.props.onGetList(this.props.selectedList);
    console.log(departments);
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
      console.log(this.props.products, 'back');
      console.log(this.state.prodName)

      let productAdded = this.props.products.find((item) => item.name === this.state.prodName);

      
        if(!productAdded) {
          const listProduct = { ...this.props.selectedList, ...productName };
          this.props.onAddProduct(listProduct);
        } else {
          this.setState({
            prodName: ""
          });
        }
      
      this.setState({
        prodName: ""
      });
    }

    return;
  };

  deleteProductFromList = prodId => {
    this.props.onDeleteProduct(prodId);
    console.log(prodId);
  };

  changeProdState = prod => {
    prod.listProduct.state = !prod.listProduct.state;
    this.props.onChangeState(prod);
  };

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
    return (
      <View style={styles.main}>
        <View style={styles.inputNameContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Название продукта"
            name="prodName"
            onChangeText={prodName => this.setState({ prodName })}
            value={this.state.prodName}
          />
          <TouchableOpacity onPress={this.addProduct}>
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
            <Text style={[styles.productItemText, { fontWeight: "bold" }]}>{title}</Text>
          )}
          sections={this.state.sections}
          keyExtractor={(item, index) => item + index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dropdown: {
    paddingLeft: 15
  },
  main: {
    flex: 1,
    backgroundColor: "rgba(255, 237, 45, .5)"
  },
  inputNameContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
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
    onAddProduct: product => dispatch(createProduct(product)),
    onChangeState: prod => dispatch(changeProdState(prod)),
    onDeleteProduct: prodId => dispatch(deleteProductFromList(prodId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedList);
