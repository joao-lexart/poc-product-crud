import React, { useContext } from 'react'
import { View, FlatList, Text, StyleSheet, Pressable } from 'react-native';

import { AntDesign } from "@expo/vector-icons";
import { Context } from "../context/Provider";

import fetchCurrency from '../utils/fetchCurrency';

export default function Cart() {
  const {cart, setCart, cartValue, setCartValue} =  useContext(Context);
  
  function renderCart ({item}) {

    const deleteFromCart = async () => {
    
      cart.pop();
      setCart(cart);
      if (item.currency !== "BRL") {
        const cotation = await fetchCurrency(item.currency);
        const formattedCotation = cotation.slice(0, -2)
        const converted = Number(formattedCotation) * Number(item.price);
        setCartValue(() => cartValue - converted);
        return 
      }
      setCartValue(() => cartValue - Number(item.price));
    }
    return(
      <View style={styles.innerContainer}>
        <View>
          <Text style={styles.itemHeading}> {item.name} </Text>
          <Text style={styles.itemText}> Category: {item.category} </Text>
          <Text style={styles.itemText}> Price: {item.price} </Text>
          <Text style={styles.itemText}> Currency: {item.currency} </Text>
        </View>
        <View style={styles.buttonsContainer}>
          <Pressable onPress={deleteFromCart}>
            <AntDesign name="delete" size={35} color="white" />
          </Pressable>
        </View>
        
      </View>
      )
  }
  return (
    <View style={styles.productList}>
        {cart.length > 0 ? (
          <FlatList
            style={{ height: "100%" }}
            data={cart}
            numColumns={4}
            renderItem={(item) => renderCart(item)}
          />
        ) : (
          <Text style={styles.text}> Add some products to card! </Text>
        )}
      </View>
  )
}

const styles = StyleSheet.create({
  productList: {
    flex: 1,
    marginTop: 10,
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 10,
    width: "100%",
    borderRadius: 20
  },
  innerContainer: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#2196F3",
    gap: "5px",
    height: 200,
    width: 200,
    margin: 20,
  },
  itemHeading: {
    fontWeight: "bold",
    color: "white",
    fontSize: 24,
  },
  itemText: {
    fontWeight: "300",
    fontSize: 18,
    color: "#e5e5e5",
  },
  text: {
    fontWeight: "bold",
    color: "#2196F3",
    fontSize: 24,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: "8px",
    marginTop: '1rem'
  },
});