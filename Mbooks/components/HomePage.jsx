import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import OneBook from './OneBook'
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HomePage = ({readMore, addToCart, token, handleLogout, currentUser, deleteBook, favouriteBooks, addToFavourites, removeFromFavourites}) => {

    const navigation = useNavigation();

    const [books, setBooks]=useState();
    useEffect(()=>{
        if(books==null){
            axios.get("http://127.0.0.1:8000/api/books").then((res)=>{
                console.log(res.data);
                setBooks(res.data.books);
            });
        }
    },[books]);


    

  return (
    <View
        style={styles.background}
    >
        {token == null ? 
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login")}>
                <Text style={styles.text}>Login </Text>
                <MaterialCommunityIcons name="login" size={22} color="white" />
            </TouchableOpacity>
        :
            <TouchableOpacity style={styles.button} onPress={() => handleLogout()}>
                <Text style={styles.text}>Logout </Text>
                <MaterialCommunityIcons name="logout" size={22} color="white" />
            </TouchableOpacity>
        }
    
        {books == null ? <></> : books.map(book => (
                    <OneBook  
                        book={book} 
                        key={book.id} 
                        currentUser={currentUser}
                        readMore={readMore} 
                        deleteBook={deleteBook}
                        addToCart={addToCart} 
                        favouriteBooks={favouriteBooks}
                        addToFavourites={addToFavourites} 
                        removeFromFavourites={removeFromFavourites} 
                        favourite={false}
                    />
                ))}
    </View>
  )
}

const styles = StyleSheet.create ({
    background: {
        backgroundColor: "rgb(218, 210, 133)"
    },

    text: {
        color: "white",
        fontSize: 16
    },

    button: {
        backgroundColor: "rgb(33, 37, 41)",
        borderColor: "rgb(33, 37, 41)",
        borderWidth: 1,
        borderRadius: 10,
        width: 180,
        height: 50,
        textAlign: "center",
        textAlignVertical: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        margin: "auto",
        marginTop: 10,
        marginBottom: 10
        
    }
})

export default HomePage