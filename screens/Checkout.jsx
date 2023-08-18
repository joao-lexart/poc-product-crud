import React, { useContext } from 'react'
import { Context } from "../context/Provider";

import { View, Text, TextInput, StyleSheet, Button, FlatList } from 'react-native'

export default function Checkout() {

  const renderCart = ({item}) => {
    return (
      <View style={styles.cartItem}>
        <Text> Product: {item.name} </Text>
        <Text> Category: {item.category} </Text>
        <Text> { `Price: ${item.price} ${item.currency}`} </Text>     
      </View>
    )
  }
  const {
      userName, 
      setUserName,
      userCountry, 
      setUserCountry,
      userStreet, 
      setUserStreet,
      setUserCity,
      userCity,
      setUserState,
      userState,
      setUserZip,
      userZip,
      setUserPhone,
      userPhone,
      setUserEmail,
      userEmail,
      cart
    } =  useContext(Context);
  return (
    <View style={styles.container} >
      <Text>Checkout</Text>
       <View style={styles.innerContainer} >
       <TextInput
        value={userName}
        placeholder="UserName"
        onChange={(e) => {
          setUserName(e.target.value);
        }}
        style={styles.textBox}
      />
      <TextInput
        value={userCountry}
        placeholder="Country"
        onChange={(e) => {
          setUserCountry(e.target.value);
        }}
        style={styles.textBox}
      />
      <TextInput
        value={userStreet}
        placeholder="Street Address"
        onChange={(e) => {
          setUserStreet(e.target.value);
        }}
        style={styles.textBox}
      />
      <TextInput
        value={userCity}
        placeholder="City"
        onChange={(e) => {
          setUserCity(e.target.value);
        }}
        style={styles.textBox}
      />
      <TextInput
        value={userState}
        placeholder="State"
        onChange={(e) => {
          setUserState(e.target.value);
        }}
        style={styles.textBox}
      />
      <TextInput
        value={userZip}
        placeholder="ZIP / PostCode"
        onChange={(e) => {
          setUserZip(e.target.value);
        }}
        style={styles.textBox}
      />
        <TextInput
          value={userPhone}
          placeholder="Phone"
          onChange={(e) => {
            setUserPhone(e.target.value);
          }}
          style={styles.textBox}
        />
      <TextInput
        value={userEmail}
        placeholder="Email"
        onChange={(e) => {
          setUserEmail(e.target.value);
        }}
        style={styles.textBox}
      />
      <Button title="Buy" />
        </View> 
        <View style={styles.cart} >

        <FlatList  
          data={cart}
          numColumns={1}
          renderItem={(item) => renderCart(item)}
        />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  innerContainer: {
    flex: 1,
    backgroundColor: "#e5e5e5",
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    width: '50%',
  },
  textBox: {
    width: "90%",
    fontSize: 18,
    padding: 12,
    borderColor: "gray",
    borderWidth: 0.2,
    borderRadius: 30,
    marginBottom: 5,
  },
  cart: {
    width: '20%',
    paddingTop: 10,
    paddingStart: 10,
  },
  cartItem: {
    flex: 1,
    backgroundColor: "#e5e5e5",
    padding: 15,
    borderRadius: 15,
    marginBottom: 5,
    marginHorizontal: 10,
    
  }
});