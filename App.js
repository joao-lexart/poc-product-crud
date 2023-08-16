import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Pressable } from 'react-native';
import { collection, addDoc, query, getDocs } from "firebase/firestore"; 
import { db } from './components/config';

export default function App() {

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState('');
  const [products, setProducts] = useState([]);

  function create () {
    addDoc(collection(db, "products"), {
      name: name,
      category: category,
      price: price,
      currency: currency,
    }).then(() => {
      console.log("Data submitted");
    }).catch((err) => {
      console.log(err);
    });
  }

  async function getProducts () {
    const productsRef = collection(db, 'products');
    const q = query(productsRef);
    const products = [];
    const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
      const { name, category, price, currency} = doc.data();
          products.push({
            id: doc.id,
            name, 
            category,
            price,
            currency,
         });
});
  setProducts(products)
  console.log(products);
}

useEffect(() => {
  getProducts()
 }, [])
  
  return (
    <View style={styles.container}>
      <Text>Create New Product</Text>
      <TextInput value={name} placeholder="Name" onChange={(e) => {setName(e.target.value)}} style={styles.textBox}></TextInput>
      <TextInput value={category} placeholder="Category" onChange={(e) => {setCategory(e.target.value)}} style={styles.textBox}></TextInput>
      <TextInput value={price} placeholder="Price" onChange={(e) => {setPrice(e.target.value)}} style={styles.textBox}></TextInput>
      <TextInput value={currency} placeholder="Currency" onChange={(e) => {setCurrency(e.target.value)}} style={styles.textBox}></TextInput>

      <button onClick={create}>Create</button>
      <StatusBar style="auto" />

      <FlatList 
        style={{height: '100%'}}
        data={products}
        numColumns = {1}
        renderItem = {({item}) => (
          <Pressable style = {StyleSheet.container}>
            <View style = {StyleSheet.innerContainer}>
              <Text> Name: {name} </Text>
              <Text> Category: {category} </Text>
              <Text> Price: {price} </Text>
              <Text> Currency: {currency} </Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBox: {
    width: '90%',
    fontSize: 18,
    padding: 12,
    borderColor: 'gray',
    borderWidth: 0.2,
    borderRadius: 30, 
  }
});
