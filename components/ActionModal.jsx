import React, { useState } from "react";
import { SafeAreaView, View, Pressable, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-web";
import RNPickerSelect from "react-native-picker-select";
import { db } from "./config";
import { doc, updateDoc } from "firebase/firestore";

export function ActionModal({ handleClose, item }) {
  console.log("chegou no modal");
  const [updatedName, setUpdatedName] = useState("");
  const [updatedPrice, setUpdatedPrice] = useState("");
  const [updatedCurrency, setUpdatedCurrency] = useState("");
  const [updatedCategory, setUpdatedCategory] = useState("");
  const [error, setError] = useState(false);

  function updateItem() {
    if (updatedName === "" || updatedCategory === "" || updatedPrice === "" || updatedCurrency === "") {
      return setError(true);
    }
    const ref = doc(db, `products/${item.id}`);
    console.log("editou!");
    updateDoc(ref, {
      name: updatedName,
      category: updatedCategory,
      price: updatedPrice,
      currency: updatedCurrency,
    })
      .then(() => {
        console.log("Data updated");
      })
      .catch((err) => {
        console.log(err);
      });
      
      handleClose()
    
  }

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        style={{ flex: 1, zIndex: 9 }}
        onPress={handleClose}
      ></Pressable>

      <View style={styles.content}>
        <Text>Edit this item</Text>
        <TextInput
          value={updatedName}
          placeholder="Name"
          onChange={(e) => {
            setUpdatedName(e.target.value);
          }}
        />
        <RNPickerSelect
          placeholder={{
            label: "Select a category",
            value: "Select a category",
          }}
          onValueChange={(value) => setUpdatedCategory(value)}
          items={[
            { label: "Technology", value: "Technology" },
            { label: "Home appliances", value: "Home appliances" },
            { label: "Fashion", value: "Fashion" },
            { label: "Cars", value: "Cars" },
            { label: "Toys", value: "Toys" },
          ]}
        />
        <TextInput
          value={updatedPrice}
          placeholder="Price"
          onChange={(e) => {
            setUpdatedPrice(e.target.value);
          }}
        />
        <RNPickerSelect
          placeholder={{ label: "Select currency", value: "Select currency" }}
          onValueChange={(value) => setUpdatedCurrency(value)}
          items={[
            { label: "USD", value: "USD" },
            { label: "BRL", value: "BRL" },
            { label: "EUR", value: "EUR" },
            { label: "LIB", value: "LIB" },
          ]}
        />

        <button onClick={updateItem}>Edit</button>
        {error && <p>Invalid data, please insert all fields</p>}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(169, 196, 230, 0.5)",
  },
  content: {
    width: "40%",
    height: "40%",
    marginBottom: 10,
    margin: "auto",
    backgroundColor: "#0C435F",
    padding: 8,
    borderWidth: 1,
    borderRadius: "5%",
    borderColor: "rgba(0, 0, 0, 0.2)",
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
    shadowOpacity: 0.28,
    shadowRadius: 4,
  },
});
