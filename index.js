import { Platform } from 'react-native'
import { Navigation } from "react-native-navigation";
import { registerScreens } from "./src/screens/screens";
import Icon from 'react-native-vector-icons/Ionicons'

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: "Initialization"
      }
    }
  })
})

// Navigation.events().registerAppLaunchedListener(() => {
//   Promise.all([
//     Icon.getImageSource(Platform.OS === "android" ? "md-menu" : "ios-menu", 30)
//   ]).then(icons => {
//     Navigation.setRoot({
//       root: {
//         sideMenu: {
//           id: "sideMenu",
//           left: {
//             component: {
//               id: "SideDrawer",
//               name: "SideDrawer"
//             }
//           },
//           center: {
//             stack: {
//               children: [
//                 {
//                   component: {
//                     name: 'PrivateListsScreen'
//                   }
//                 }
//               ],
//               options: {
//                 topBar: {
//                   background: {
//                     color: mainStyles.mainColor
//                   },
//                   title: {
//                     text: "Мои списки",
//                     color: "#ffffff"
//                   },
//                   leftButtons: {
//                     id: "toggleDrawer",
//                     icon: icons[0],
//                     component: {
//                       id: "SideDrawer",
//                       name: "SideDrawer"
//                     },
//                     color: "#ffffff"
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     })
//   })
  
// });
