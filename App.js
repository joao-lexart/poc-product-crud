import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Pressable } from 'react-native';
import { collection, addDoc, query, getDocs } from "firebase/firestore"; 
import { db } from './components/config';

export default function App() {

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState('');
  const [productList, setProductList] = useState([]);


  const getProducts = useCallback( async () => {
    console.log("entrou no useCallback")
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
    setProductList(products)
  }, [productList]) 

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
    getProducts();
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
        data={productList}
        numColumns = {1}
        renderItem = {({item}) => (
          <Pressable style = {styles.container}>
            <View style = {styles.innerContainer}>
              <Text style={styles.itemHeading}> Name: {item.name} </Text>
              <Text style={styles.itemText}>  Category: {item.category} </Text>
              <Text style={styles.itemText}> Price: {item.price} </Text>
              <Text style={styles.itemText}> Currency: {item.currency} </Text>
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
    backgroundColor: '#e5e5e5',
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
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
  },
  innerContainer: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  itemHeading: {
    fontWeight: 'bold',
  },
  itemText: {
    fontWeight: '300',
  }
});
