import { useContext } from "react";
import { Context } from "../context/Provider";
import { Text } from "react-native";


import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "./Home";
import Checkout from "./Checkout";
import Cart from "./Cart";


const Tab = createBottomTabNavigator();

export default function MainContainer() {

  const {cartValue} = useContext(Context);
  console.log(cartValue)

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"      
      >
        <Tab.Screen 
          name="Home" 
          component={Home} 
          options={{ headerRight: () => <Text> Cart in BRL: {cartValue.toFixed(2)} </Text> }}
          />
        <Tab.Screen 
          name="Cart" 
          component={Cart}
          options={{ headerRight: () => <Text> Cart in BRL: {cartValue.toFixed(2)} </Text> }}
          />
        <Tab.Screen 
          name="Checkout" 
          component={Checkout}
          options={{ headerRight: () => <Text> Cart in BRL: {cartValue.toFixed(2)} </Text> }}
          />

      </Tab.Navigator>
    </NavigationContainer>
  );
}
