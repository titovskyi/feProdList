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
import { Dropdown } from 'react-native-material-dropdown';
import Icon from "react-native-vector-icons/Ionicons";
import { Navigation } from "react-native-navigation";

class SelectedList extends Component {
  constructor(props) {
    super(props);

    this.dropItems = [
      { value: 'Автотовары' },
      { value: 'Аксессуары' },
      { value: 'Алкоголь' },
      { value: 'Аптека' },
      { value: 'Бакалея' },
      { value: 'Гигиена' },
      { value: 'Готовые блюда' },
      { value: 'Дети' },
      { value: 'Дом' },
      { value: 'Другое' },
      { value: 'Заморозка' },
      { value: 'Канцтовары' },
      { value: 'Консервы' },
      { value: 'Молочные продукты' },
      { value: 'Морепродукты' },
      { value: 'Мясо' },
      { value: 'Напитки' },
      { value: 'Овощи' },
      { value: 'Питомцы' },
      { value: 'Сладости' },
      { value: 'Снеки' },
      { value: 'Специи' },
      { value: 'Спорт' },
      { value: 'Строительный' },
      { value: 'Фрукты' },
      { value: 'Хлеб' },
      { value: 'Электроника' }
    ];

    this.state = {
      prodName: "",
      department: "",
      sections: []
    };
  }

  componentDidMount() {
    Navigation.events().bindComponent(this);
    this.props.onGetList(this.props.selectedList);
    console.log('mounted');
  }

  inputChangeHandler = event => {
    console.log(event);
    // this.setState({
    //   prodName: event
    // });
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

  addProduct = () => {
    if (this.state.prodName) {
      const productName = this.props.allProducts.find(product => {
        product.name === this.state.prodName;
      }) || { productName: this.state.prodName };
      const listProduct = { ...this.props.selectedList, ...productName };
      this.props.onAddProduct(listProduct);
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

  dividedSections = (listProd) => {
    let section = [];
    let bought = listProd.filter(item => item.listProduct.state === false);
    let needToBuy = listProd.filter(item => item.listProduct.state === true);

    bought.forEach((prod) => {
      let sectionBought = section.find(item => item.title === 'Купленно');
      if(!sectionBought) {
        section.push({
          title: 'Купленно',
          data: [prod.name]
        })
      } else {
        section.map((item) => {
          if(item.title === 'Купленно') {
            item.data.push(prod.name);
          }
        })
      }
    })

    needToBuy.forEach((prod) => {
      let sectionBought = section.find(item => item.title === 'Покупки');
      if(!sectionBought) {
        section.push({
          title: 'Покупки',
          data: [prod.name]
        })
      } else {
        section.map((item) => {
          if(item.title === 'Покупки') {
            item.data.push(prod.name);
          }
        })
      }
    })

    this.setState({
      sections: section
    })
    
    console.log(section, 'bought');
  }

  changeProdState = prod => {
    prod.listProduct.state = !prod.listProduct.state;
    this.props.onChangeState(prod);
    this.dividedSections(this.props.products);
    console.log(this.state);
  };

  render() {
    const infoBlock =
      this.state.prodName.length >= 3 ? (
        <View style={styles.infoInputContainer}>
          <Dropdown 
            label='Категория'
            data={this.dropItems}
            onChangeText={(department) => this.setState({department})}
            fontSize={20}
            itemCount={6}
          />
          <TextInput
            placeholder="Количество"
            style={[styles.textInput, { width: "100%" }]}
            keyboardType='numeric'
            name="quantity"
            onChangeText={(quantity) => this.setState({quantity: quantity.replace(/[^0-9]/g, '')})}
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
            onChangeText={(prodName) => this.setState({prodName})}
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
          renderItem={({item, index, section}) => <Text key={index}>{item}</Text>}
          renderSectionHeader={({section: {title}}) => (
            <Text style={{fontWeight: 'bold'}}>{title}</Text>
          )}
          sections={this.state.sections}
          keyExtractor={(item, index) => item + index}
        />
        <FlatList
          data={this.props.products}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => this.changeProdState(item)}>
              <View style={styles.productItem}>
                <Text
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
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#ffffff"
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
    color: '#695A46'
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
    color: '#695A46',
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
