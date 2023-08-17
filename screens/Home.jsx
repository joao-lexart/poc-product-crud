import { useContext } from "react";
import RNPickerSelect from "react-native-picker-select";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, FlatList } from "react-native";

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
      <Text>Create New Product</Text>
      <TextInput
        value={name}
        placeholder="Name"
        onChange={(e) => {
          setName(e.target.value);
        }}
        style={styles.textBox}
      />

      <RNPickerSelect
        placeholder={{ label: "Select a category", value: "Select a category" }}
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

      <button onClick={createItem}>Create</button>

      {error && <p>Invalid data, please insert all fields</p>}

      {productList.length > 0 && (
        <FlatList
          style={{ height: "100%" }}
          data={productList}
          numColumns={1}
          renderItem={(item) => renderProduct(item)}
        />
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e5e5e5",
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  textBox: {
    width: "90%",
    fontSize: 18,
    padding: 12,
    borderColor: "gray",
    borderWidth: 0.2,
    borderRadius: 30,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
