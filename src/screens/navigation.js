import { Navigation } from "react-native-navigation";
import { Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";


export const goToAuth = () =>
  Navigation.setRoot({
    root: {
      component: {
        name: "AuthScreen"
      }
    }
  });

export const goToMainApp = () => {
  Promise.all([
    Icon.getImageSource(Platform.OS === "android" ? "md-menu" : "ios-menu", 30)
  ]).then(icons => {
    Navigation.setRoot({
      root: {
        sideMenu: {
          id: "sideMenu",
          left: {
            component: {
              id: "SideDrawer",
              name: "SideDrawer"
            }
          },
          center: {
            stack: {
              children: [
                {
                  component: {
                    name: "PrivateListsScreen"
                  }
                }
              ],
              options: {
                topBar: {
                  background: {
                    color: "#186B88"
                  },
                  title: {
                    text: "Мои списки",
                    color: "#ffffff"
                  },
                  leftButtons: {
                    id: "toggleDrawer",
                    icon: icons[0],
                    component: {
                      id: "SideDrawer",
                      name: "SideDrawer"
                    },
                    color: "#ffffff"
                  }
                }
              }
            }
          }
        }
      }
    });
  })
}
