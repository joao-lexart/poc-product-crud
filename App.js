import RNPickerSelect from "react-native-picker-select";
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Pressable } from 'react-native';
import { collection, addDoc, query, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore"; 
import { db } from './components/config';

export default function App() {

  const [name, setName] = useState('');
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState('');
  const [productList, setProductList] = useState([]);
  const [error, setError] = useState(false);


  const getProducts = useCallback( async () => {
    console.log("entrou no useCallback")
    const productsRef = collection(db, 'products');
    const q = query(productsRef);
    const products = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
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

  function createItem () {
    if (name === "" || category === "" || price === "" || currency === "") {
      return (
        setError(true)
      )
    }
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
    setError(false);
    getProducts();
  }

  function deleteItem(id) {
    deleteDoc(doc(db, "products", id));
    console.log("deletou!");
    getProducts();
  }

  function updateItem(id) {
    console.log(id)
    console.log("entrou no update")
    updateDoc(doc(db, "products", id), {
      name: "produto atualizado",
      category: "categoria atualizada",
      price: "price att",
      currency: "currency att",
    }).then(() => {
      console.log("Data updated");
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
    
      <RNPickerSelect 
        placeholder={{ label: "Select a category", value: "Select a category" }}
        onValueChange={(value) => setCategory(value)}
        items = {[
          {label: "Technology", value: "Technology"},
          {label: "Home appliances", value: "Home appliances" },
          {label: "Fashion", value: "Fashion"},
          {label: "Cars", value: "Cars"},
          {label: "Toys", value: "Toys" },
        ]}
        style={pickerSelectStyles}
      />
      <TextInput value={price} placeholder="Price" onChange={(e) => {setPrice(e.target.value)}} style={styles.textBox}></TextInput>

      <RNPickerSelect 
        placeholder={{ label: "Select currency", value: "Select currency" }}
        onValueChange={(value) => setCurrency(value)}
        items = {[
          {label: "USD", value: "USD"},
          {label: "BRL", value: "BRL" },
          {label: "EUR", value: "EUR"},
          {label: "LIB", value: "LIB"},
        ]}
        style={pickerSelectStyles}
      />

      <button onClick={createItem}>Create</button>

        { error && <p>Invalid data, please insert all fields</p>}

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
              <button onClick={() => deleteItem(item.id)}>Delete</button>
              <button onClick={() => updateItem(item.id)}>Update</button>


            </View>
          </Pressable>
        )}
      />
      <StatusBar style="auto" />
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30 // to ensure the text is never behind the icon
  },
  inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30 // to ensure the text is never behind the icon
  }
});
