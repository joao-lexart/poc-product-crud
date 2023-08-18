import React, { createContext, useState, useEffect } from "react";
import { StyleSheet, Text, View, Modal, Pressable } from "react-native";
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

import { AntDesign, MaterialIcons } from "@expo/vector-icons";

export const Context = createContext();

function Provider({ children }) {
  const [productId, setProductId] = useState(1);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [currency, setCurrency] = useState("");
  const [productList, setProductList] = useState([]);
  const [error, setError] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartValue, setCartValue] = useState(0);
  const [userName, setUserName] = useState("");
  const [userCountry, setUserCountry] = useState("");
  const [userStreet, setUserStreet] = useState("");
  const [userCity, setUserCity] = useState("");
  const [userState, setUserState] = useState("");
  const [userZip, setUserZip] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");

  function createItem() {
    if (name === "" || category === "" || price === "" || currency === "") {
      return setError(true);
    }
    setProductId(productId + 1);
    addDoc(collection(db, "products"), {
      name: name,
      category: category,
      price: price,
      currency: currency,
      productId,
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
      setProductId(productId + 1);
      const newItem = {
        name: item.name,
        category: item.category,
        currency: item.currency,
        price: item.price,
        productId: productId,
      };
      cart.push(newItem);

      if (item.currency !== "BRL") {
        const cotation = await fetchCurrency(item.currency);
        const formattedCotation = cotation.slice(0, -2);
        const converted = Number(formattedCotation) * Number(item.price);
        setCart(cart);
        return setCartValue(() => cartValue + converted);
      }
      setCart(cart);
      setCartValue(() => cartValue + Number(item.price));
    }
    return (
      <View style={styles.innerContainer}>
        <View>
          <Text style={styles.itemHeading}> {item.name} </Text>
          <Text style={styles.itemText}> Category: {item.category} </Text>
          <Text style={styles.itemText}> Price: {item.price} </Text>
          <Text style={styles.itemText}> Currency: {item.currency} </Text>
        </View>
        <View style={styles.buttonsContainer}>
          <Pressable onPress={deleteItem}>
            <AntDesign name="delete" size={35} color="white" />
          </Pressable>
          <Pressable onPress={updateItem}>
            <AntDesign name="edit" size={35} color="white" />
          </Pressable>
          <Pressable onPress={addToCart}>
            <MaterialIcons name="add-shopping-cart" size={35} color="white" />
          </Pressable>
        </View>
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
    setCartValue,
    userName,
    setUserName,
    userCountry,
    setUserCountry,
    userStreet,
    setUserStreet,
    userCity,
    setUserCity,
    userState,
    setUserState,
    userZip,
    setUserZip,
    userEmail,
    setUserEmail,
    userPhone,
    setUserPhone,
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export default Provider;

const styles = StyleSheet.create({
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
  buttonsContainer: {
    flexDirection: "row",
    gap: "8px",
    marginTop: '1rem'
  },
});
