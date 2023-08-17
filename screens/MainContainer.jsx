import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "./Home";
import Checkout from "./Checkout";
import Cart from "./Cart";


const Tab = createBottomTabNavigator();

export default function MainContainer() {



  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"      
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Cart" component={Cart}/>
        <Tab.Screen name="Checkout" component={Checkout}/>

      </Tab.Navigator>
    </NavigationContainer>
  );
}
