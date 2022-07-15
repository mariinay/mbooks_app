import React from 'react'
import { StyleSheet, View } from 'react-native'
import OneBook from './OneBook'

const FavouritePage = ({readMore,addToCart, deleteBook, currentUser, favouriteBooks, addToFavourites, removeFromFavourites}) => {


  return (
    <View
        style={styles.background}
    >
        {favouriteBooks==null ? <></> :  favouriteBooks.map((favBook)=>(
            <OneBook  
                book={favBook.book} 
                key={favBook.id} 
                readMore={readMore} 
                addToCart={addToCart} 
                deleteBook={deleteBook}
                currentUser={currentUser} 
                favouriteBooks={favouriteBooks}
                addToFavourites={addToFavourites} 
                removeFromFavourites={removeFromFavourites} 
                favourite={true}
            />
        ))}
    </View>
  )
}

const styles = StyleSheet.create ({
    background: {
        backgroundColor: "rgb(218, 210, 133)"
    }
})

export default FavouritePage