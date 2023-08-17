import RNPickerSelect from "react-native-picker-select";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Modal,
} from "react-native";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from '../components/config'
import { ActionModal } from "../components/ActionModal"

export default function Home() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("");
  const [productList, setProductList] = useState([]);
  const [error, setError] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);

  function createItem() {
    if (name === "" || category === "" || price === "" || currency === "") {
      return setError(true);
    }
    addDoc(collection(db, "products"), {
      name: name,
      category: category,
      price: price,
      currency: currency,
    })
      .then(() => {
        console.log("Data submitted");
      })
      .catch((err) => {
        console.log(err);
      });
    setError(false);
  }

  function renderProduct({ item }) {
    const ref = doc(db, `products/${item.id}`)
    
    function deleteItem() {
      deleteDoc(ref);
      if (productList.length === 1) {
        setProductList([])
      }
      console.log("deletou!");
      console.log(productList)

    }


    function updateItem() {
      setVisibleModal(true)
    }
    return (
      <View style={styles.innerContainer}>
        <Text style={styles.itemHeading}> Name: {item.name} </Text>
        <Text style={styles.itemText}> Category: {item.category} </Text>
        <Text style={styles.itemText}> Price: {item.price} </Text>
        <Text style={styles.itemText}> Currency: {item.currency} </Text>
        <button onClick={deleteItem}>Delete</button>
        <button onClick={updateItem}>Update</button>

        <Modal
          visible={visibleModal}
          transparent={true}
          onRequestClose={ () => setVisibleModal(false)}
        >
          <ActionModal 
            handleClose = {() => setVisibleModal(false)}
            item = {item}
            
          />
        </Modal>
      </View>
    );
  }

  useEffect(() => {
    const productsRef = collection(db, "products");

    const subscriber = onSnapshot(productsRef, {
      next: (snapshot) => {
        const products = [];
        snapshot.docs.forEach((doc) => {
          products.push({
            id: doc.id,
            ...doc.data(),
          });
          setProductList(products);
        });

        return () => subscriber();
      },
    });
  }, []);
  console.log(productList)
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
          { label: "LIB", value: "LIB" },
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
