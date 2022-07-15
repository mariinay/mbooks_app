import React from 'react'
import {FaRegHeart, FaHeart} from "react-icons/fa"
import {AiOutlineShoppingCart} from "react-icons/ai"
import {BsCurrencyExchange} from "react-icons/bs"
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import { AntDesign, FontAwesome } from '@expo/vector-icons';


const BookDetails = ({book, addToCart, currentUser, favouriteBooks, addToFavourites, removeFromFavourites, favourite}) => {

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

  if(favouriteBooks != null){
    favouriteBooks.map((favBook) =>{
      if(favBook.book != null && favBook.book.id == book.id){
        favourite = true;
      }
    })
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

    
  
  return (
    <View
        style={styles.background}
    >
        <Image source={book.image} style={styles.image} />
        <View>

            <Text style={styles.title}>{book.title}</Text>

            <View style={styles.block}>
                <Text style={styles.bold}>Author: </Text>
                <Text style={styles.text}>{book.author.name}</Text>
            </View>

            <View style={styles.block}>
                <Text style={styles.bold}>Category: </Text>
                <Text style={styles.text}>{book.category.name}</Text>
            </View>

            <View style={styles.block}>
                <Text style={styles.bold}>About: </Text>
                <Text style={styles.text}>{book.description}</Text>
            </View>

            <View style={styles.container}>

                <View style={{display: "inline", marginTop: 15, marginBottom: 8}}>
                    <Text style={styles.price}>{amount + " " + currency}</Text>
                    <FontAwesome name="exchange" size={18} color="rgb(33, 37, 41)" onPress={changeCurrency} style={{marginLeft: 5, marginRight: 5}}/>
                    {currency == "EUR" ?
                        <Text style={styles.text}>USD</Text>
                    :
                        <Text style={styles.text}>EUR</Text>
                    }
                </View>

            
                {favourite ? 

                    <TouchableOpacity onPress={remove} style={{display: "inline"}}>
                        <Text style={styles.bold}>Remove from Favourites</Text>
                        <FontAwesome name="heart" size={18} color="rgb(33, 37, 41)" style={{marginLeft: 5}} />
                    </TouchableOpacity>
                    
                :
                    <TouchableOpacity onPress={add} style={{display: "inline"}}>
                        <Text style={styles.bold}>Add to Favourites</Text>
                        <FontAwesome name="heart-o" size={18} color="rgb(33, 37, 41)" style={{marginLeft: 5}} />
                    </TouchableOpacity>

                }

                <TouchableOpacity onPress={handle} style={{display: "inline", marginTop: 8, marginBottom: 10 }}>
                    <Text style={styles.bold}>Add to Cart</Text>
                    <AntDesign name="shoppingcart" size={18} color="rgb(33, 37, 41)" style={{marginLeft: 5}} />
                </TouchableOpacity>
            </View>

        </View>
    </View>




 
    
  )

}

const styles = StyleSheet.create({
    background: {
        backgroundColor : "rgb(218, 210, 133)",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "repeat-y"
    },

    container: {
        justifyContent: "center",
        alignItems: "center",
    },

    title: {
        fontSize: "40px",
        paddingBottom: "20px",
        textDecorationColor: "rgb(33, 37, 41)",
        textAlign: "center"
    },

    block: {
        display: "block",
    },

    text: {
        color: "rgb(33, 37, 41)"
    },

    bold: {
        color: "rgb(33, 37, 41)",
        fontWeight: "bold"
    },
    
    image: {
        height: "450px",
        width: "300px",
        position: "relative",
        margin: "auto",
        marginTop: "20px"
    },
    
    price: {
        color: "rgb(33, 37, 41)",
        fontSize: 18,
        fontWeight: "bold"
    }
  });

export default BookDetails