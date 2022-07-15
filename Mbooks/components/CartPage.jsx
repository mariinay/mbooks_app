import React from 'react'
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const CartPage = ({orderItems, books, totalPrice, removeFromCart}) => {

    const Item = ({item, book}) => (
        <View style={styles.cartItem}>
            <View style={{marginLeft: 20, width: 80}}>
                <Text style={styles.text}>{book.title}</Text>
            </View>
            <View style={{marginLeft: 50, width: 70}}>
                <Text style={styles.text}>{book.price} EUR</Text>
            </View>
            <TouchableOpacity style={{marginLeft: 50}} onPress={()=> removeFromCart(item.id)}>
                <Text style={styles.text}>Remove</Text>
            </TouchableOpacity>
        </View>
    );

    const renderItem = ({item}) => (
        books==null ? <></> :  books.map((book)=>(
            book.id == item.book_id ? 
                <Item key={book.id} item={item} book={book} /> 
            : <></>
        ))
    );


  return (
    <View>
        <FlatList 
            data={orderItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
        />
        <View style={styles.cartItem}>
            <View style={{marginLeft: 20, width: 80}}>
                <Text style={styles.totalPrice}>Total price: </Text>
            </View>
            <View style={{marginLeft: 50, width: 70}}>
                <Text style={styles.totalPrice}>{totalPrice.toFixed(2)} EUR</Text>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    cartItem: {
        backgroundColor: "#212529",
        display: "flex",
        flexDirection: "row",
        height: 50,
        alignItems: "center"
    },

    text: {
        color: "white"
    },
    totalPrice: {
        color: "white",
        fontWeight: "bold"
    }
});

export default CartPage