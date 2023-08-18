import React, { useState } from "react";
import { SafeAreaView, View, Pressable, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-web";
import RNPickerSelect from "react-native-picker-select";
import { db } from "./config";
import { doc, updateDoc } from "firebase/firestore";

export function ActionModal({ handleClose, item }) {
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

<View style={styles.createProductContainer}>
        <View style={styles.createProduct}>
          <TextInput
            value={updatedName}
            placeholder="Name"
            onChange={(e) => {
              setUpdatedName(e.target.value);
            }}
            style={styles.textBox}
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
            style={pickerSelectStyles}
          />

          <TextInput
            value={updatedPrice}
            placeholder="Price"
            inputMode="numeric"
            onChange={(e) => {
              setUpdatedPrice(e.target.value);
            }}
            style={styles.textBox}
          />

          <RNPickerSelect
            placeholder={{ label: "Select currency", value: "Select currency" }}
            onValueChange={(value) => setUpdatedCurrency(value)}
            items={[
              { label: "USD", value: "USD" },
              { label: "BRL", value: "BRL" },
              { label: "EUR", value: "EUR" },
              { label: "ARS", value: "ARS" },
            ]}
            style={pickerSelectStyles}
          />
        </View>

        <Pressable style={styles.button} onPress={updateItem}>
          <Text style={styles.textButton}>Update</Text>
        </Pressable>

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

  createProductContainer: {
    borderColor: "rgba(0, 0, 0, 0.2)",
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    marginBottom: 10,
    elevation: 5,
    shadowOpacity: 0.28,
    shadowRadius: 4,
    margin: "auto",
    flexDirection: "row",
    backgroundColor: "yellow",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 10,
    width: "100%",
    height: "20vh",
    borderRadius: 20,
  },
  createProduct: {
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "flex-start",
    gap: "15px",
    justifyContent: "center",
    padding: 10,
    width: "80%",
    height: "80%",
  },
  textBox: {
    fontSize: 14,
    padding: 5,
    color: "#2196F3",
    borderColor: "#e5e5e5",
    borderWidth: 0.1,
    borderRadius: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#2196F3",
    height: "30%",
  },
  textButton: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputWeb: {
    fontSize: 14,
    padding: 5,
    color: "#2196F3",
    borderColor: "#e5e5e5",
    borderWidth: 0.1,
    borderRadius: 10,
  },
});
