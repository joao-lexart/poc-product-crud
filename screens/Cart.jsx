import React, { useContext } from 'react'
import { Context } from "../context/Provider";

import { View, FlatList, Text, StyleSheet } from 'react-native';
import fetchCurrency from '../utils/fetchCurrency';

export default function Cart() {
  const {cart, setCart, cartValue, setCartValue} =  useContext(Context);
  
  function renderCart ({item}) {

    const deleteFromCart = async () => {
    
      cart.pop();
      setCart(cart);
      if (item.currency !== "BRL") {
        const cotation = await fetchCurrency(item.currency);
        console.log(cotation)
        const formattedCotation = cotation.slice(0, -2)
        console.log(formattedCotation);
        const converted = Number(formattedCotation) * Number(item.price);
        console.log(converted);
        setCartValue(() => cartValue - converted);
        return 
      }
      setCartValue(() => cartValue - Number(item.price));
    }
    return(
      <View style={styles.innerContainer}>
        <Text style={styles.itemHeading}> Name: {item.name} </Text>
        <Text style={styles.itemText}> Category: {item.category} </Text>
        <Text style={styles.itemText}> Price: {item.price} </Text>
        <Text style={styles.itemText}> Currency: {item.currency} </Text>
        <button onClick={deleteFromCart}>Delete From Cart</button>
      </View>
      )
  }
  return (
    <View>
      <FlatList
          style={{ height: "100%" }}
          data={cart}
          numColumns={1}
          renderItem={(item) => renderCart(item)}
          keyExtractor={(item) => item.productId }
        />
    </View>
  )
}

const styles = StyleSheet.create({
  innerContainer: {
    alignItems: "center",
    flexDirection: "column",
  },
  itemHeading: {
    fontWeight: "bold",
  },
  itemText: {
    fontWeight: "300",
  },
});