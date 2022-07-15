import React from 'react'
import {FaRegHeart, FaHeart} from "react-icons/fa"
import {AiOutlineShoppingCart} from "react-icons/ai"
import {BsCurrencyExchange} from "react-icons/bs"
import { useState } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, Image, StyleSheet, Text, View } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import { AntDesign, FontAwesome } from '@expo/vector-icons'



const OneBook = ({book,readMore,addToCart, currentUser, favouriteBooks, deleteBook, addToFavourites, removeFromFavourites, favourite}) => {

  let navigation = useNavigation();


  function handle(e){
    addToCart(book.id, 1);
  };

  function add(){
    if(currentUser != null){
      addToFavourites(book.id);
    }else{
      navigation.navigate("Login");
    }
    
  };

  function remove(){
    removeFromFavourites(book.id);
  };

  function update(){
    readMore(book.id);
    navigation.navigate("Home");
  }

  const admin = () =>{
    if(currentUser != null){
      return currentUser.admin;
     }else{
       return false;
     }
  }

  if(favouriteBooks != null){
    favouriteBooks.map((favBook) =>{
      if(favBook.book != null && favBook.book.id == book.id){
        favourite = true;
      }
    })
  };

  const removeBook = () => {

    Swal.fire({
      text: "Are you sure you want to delete this book?",
      position: "center",
      icon: "question",
      title: "Delete",
      showConfirmButton: true,
      confirmButtonText: "Yes",
      showCancelButton: true
    }).then((result) =>  {
      if(result.isConfirmed){
        deleteBook(book.id);
      };
    });
  };

  const [amount, setAmount] = useState(book.price);
  const [currency, setCurrency] = useState("EUR");

  const changeCurrency = () => {
    if(currency == "EUR"){
      const options = {
        method: 'GET',
        url: 'https://api.currencyapi.com/v3/latest?apikey=MsL8RyxxwkC73lbdR88WyaXwEXUWrxfcCbXObLxT&base_currency=EUR&currencies=USD',
        };
    
        axios.request(options).then(function (response) {
            console.log(response.data);
            setAmount((response.data.data.USD.value*amount).toFixed(2));
            setCurrency("USD");
    
        }).catch(function (error) {
            console.error(error);
        });
    }else{
      const options = {
        method: 'GET',
        url: 'https://api.currencyapi.com/v3/latest?apikey=MsL8RyxxwkC73lbdR88WyaXwEXUWrxfcCbXObLxT&base_currency=USD&currencies=EUR',
        };
    
        axios.request(options).then(function (response) {
            console.log(response.data);
            setAmount((response.data.data.EUR.value*amount).toFixed(2));
            setCurrency("EUR");
        }).catch(function (error) {
            console.error(error);
        });
    }
  }

  const details = (bookID)  => {
    readMore(bookID);
    navigation.navigate("BookDetails");
  }

  return (

    <View
        style={styles.book}
    >
        <Image source={book.image} style={styles.image} />

        <View
            style={styles.bookBody}
        >

            <Text style={styles.title}>{book.title}</Text>
            <Text style={styles.text}>Author: {book.author.name}</Text>
            <TouchableOpacity onPress={() => details(book.id)}>
                <Text style={styles.link}>Read more</Text>
            </TouchableOpacity>
            <View style={{display: "inline", marginTop: 15, marginBottom: 15}}>
              <Text style={styles.price}>{amount + " " + currency}</Text>
              <FontAwesome name="exchange" size={18} color="white" onPress={changeCurrency} style={{marginLeft: 5, marginRight: 5}}/>
              {currency == "EUR" ?
                <Text style={styles.text}>USD</Text>
              :
                <Text style={styles.text}>EUR</Text>
              }
            </View>

        </View>

        <View  style={styles.buttonSection}>
            {favourite ? 

                <TouchableOpacity onPress={remove} style={{display: "inline", borderColor: "#212529", borderWidth: "1px" }}>
                    <Text style={styles.text}>Remove from Favourites</Text>
                    <FontAwesome name="heart" size={18} color="white" style={{marginLeft: 5}} />
                </TouchableOpacity>
                
            :
                <TouchableOpacity onPress={add} style={{display: "inline", borderColor: "#212529", borderWidth: "1px" }}>
                    <Text style={styles.text}>Add to Favourites</Text>
                    <FontAwesome name="heart-o" size={18} color="white" style={{marginLeft: 5}} />
                </TouchableOpacity>

            }

            <TouchableOpacity onPress={handle} style={{display: "inline", marginTop: 10 }}>
                <Text style={styles.text}>Add to Cart</Text>
                <AntDesign name="shoppingcart" size={18} color="white" style={{marginLeft: 5}} />
            </TouchableOpacity>
        </View>

        {admin() ?
            <View
                style={styles.adminSection}
            >
              <TouchableOpacity onPress={update} style={{display: "inline", textAlign: "center" }}>
                <Text style={styles.link}>Update</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={removeBook} style={{display: "inline", marginLeft: 15, textAlign: "center" }}>
                <Text style={styles.link}>Delete</Text>
              </TouchableOpacity>  

            </View>
          
        :
            <></>
        }

    
    </View>
    

  )
}

const styles = StyleSheet.create({
    book: {
        textAlign: "center",
        borderStyle: "solid",
        borderWidth: 4,
        borderColor: "rgb(33, 37, 41)",
        borderRadius: 10,
        margin: "auto",
        marginTop: 0,
        marginBottom: 20,
        height: 490,
        width: 250,
        backgroundColor:"rgb(33, 37, 41)",
    },

    bookBody: {
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "white"
    },

    title: {
        fontSize: "40px",
        color: "white"
    },

    block: {
        display: "block",
    },

    text: {
        color: "white"
    },

    price: {
      color: "white",
      fontSize: 18,
      fontWeight: "bold"
    },

    link: {
        color: "rgb(218, 210, 133)",
        textDecorationLine: 'underline',
    },
    
    image: {
        height: 180,
        width: 120,
        margin: "auto",
        marginBottom: 20,
        marginTop: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "white"
    },
    
    p: {
        marginLeft: 0
    },

    button: {
        backgroundColor: "rgb(33, 37, 41)",
        marginLeft: 15,
        width: "30%"
    },

    buttonSection: {

    },

    adminSection: {
        textAlign: "center",
        justifyContent: "center",
        padding: 5,
        display: "flex",
        flexDirection: "row",
        marginTop: 10
    }
  });

export default OneBook