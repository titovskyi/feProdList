import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import configureStore from '../store/configureStore';

const store = configureStore();


export function registerScreens() {
  Navigation.registerComponentWithRedux("PrivateListsScreen", () => require('./PrivateLists/PrivateLists').default, Provider, store);
  Navigation.registerComponentWithRedux('SetListName', () => require('./SetListName/SetListName').default, Provider, store);
  Navigation.registerComponentWithRedux('SelectedList', () => require("./SelectedList/SelectedList").default, Provider, store);
  Navigation.registerComponent("SideDrawer", () => require('./SideDrawer/SideDrawer').default);
  Navigation.registerComponent("AuthScreen", () => require('./AuthScreen/AuthScreen').default);
  Navigation.registerComponent("Initialization", () => require('./Initialization/Initialization').default);
}
