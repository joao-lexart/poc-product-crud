import { useContext } from "react";
import RNPickerSelect from "react-native-picker-select";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Pressable,
} from "react-native";

import { Context } from "../context/Provider";

export default function Home() {
  const {
    name,
    setCategory,
    price,
    setCurrency,
    renderProduct,
    productList,
    createItem,
    setName,
    setPrice,
    error,
  } = useContext(Context);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 16, fontWeight: "bold", color: "#2196F3" }}>
        Create New Product
      </Text>
      <View style={styles.createProductContainer}>
        <View style={styles.createProduct}>
          <TextInput
            value={name}
            placeholder="Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            style={styles.textBox}
          />

          <RNPickerSelect
            placeholder={{
              label: "Select a category",
              value: "Select a category",
            }}
            onValueChange={(value) => setCategory(value)}
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
            value={price}
            placeholder="Price"
            inputMode="numeric"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            style={styles.textBox}
          />

          <RNPickerSelect
            placeholder={{ label: "Select currency", value: "Select currency" }}
            onValueChange={(value) => setCurrency(value)}
            items={[
              { label: "USD", value: "USD" },
              { label: "BRL", value: "BRL" },
              { label: "EUR", value: "EUR" },
              { label: "ARS", value: "ARS" },
            ]}
            style={pickerSelectStyles}
          />
        </View>

        <Pressable style={styles.button} onPress={createItem}>
          <Text style={styles.textButton}>Create</Text>
        </Pressable>

        {error && <p>Invalid data, please insert all fields</p>}
      </View>

      <View style={styles.productList}>
        {productList.length > 0 ? (
          <FlatList
            style={{ height: "100%" }}
            data={productList}
            numColumns={4}
            renderItem={(item) => renderProduct(item)}
          />
        ) : (
          <Text style={styles.text}> First create a product! </Text>
        )}
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e5e5e5",
    padding: 15,
    alignItems: "center",
  },
  createProductContainer: {
    marginTop: 10,
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
  productList: {
    flex: 1,
    marginTop: 10,
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 10,
    width: "100%",
    borderRadius: 20,
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
  text: {
    color: "#2196F3",
    fontWeight: 'bold'
  }
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
