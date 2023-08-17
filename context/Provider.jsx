import React, { createContext, useState, useEffect } from "react";
import { StyleSheet, Text, View, Modal } from "react-native";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../components/config";
import { ActionModal } from "../components/ActionModal";
import fetchCurrency from "../utils/fetchCurrency";

export const Context = createContext();

function Provider({ children }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [currency, setCurrency] = useState("");
  const [productList, setProductList] = useState([]);
  const [error, setError] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartValue, setCartValue] = useState(0);

  function calculateTotal () {
    
  }

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
    const ref = doc(db, `products/${item.id}`);

    async function deleteItem() {
      deleteDoc(ref);
      if (productList.length === 1) {
        setProductList([]);
      }
    }

    function updateItem() {
      setVisibleModal(true);
    }

    async function addToCart() {
      console.log(cart);
      cart.push(item);
      if (item.currency !== "BRL") {
        const cotation = await fetchCurrency(item.currency);
        const formattedCotation = cotation.slice(0, -2)
        const converted = Number(formattedCotation) * Number(item.price);
        setCart(cart);
        return setCartValue(() => cartValue + converted);
      }
      setCart(cart);
      setCartValue(() => cartValue + Number(item.price));
    }
    return (
      <View style={styles.innerContainer}>
        <Text style={styles.itemHeading}> Name: {item.name} </Text>
        <Text style={styles.itemText}> Category: {item.category} </Text>
        <Text style={styles.itemText}> Price: {item.price} </Text>
        <Text style={styles.itemText}> Currency: {item.currency} </Text>
        <button onClick={deleteItem}>Delete</button>
        <button onClick={updateItem}>Update</button>
        <button onClick={addToCart}>Add To Cart</button>

        <Modal
          visible={visibleModal}
          transparent={true}
          onRequestClose={() => setVisibleModal(false)}
        >
          <ActionModal handleClose={() => setVisibleModal(false)} item={item} />
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

  const value = {
    name,
    setCategory,
    price,
    setCurrency,
    renderProduct,
    productList,
    setName,
    setPrice,
    error,
    createItem,
    cartValue,
    cart,
    setCart,
    setCartValue
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export default Provider;

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
