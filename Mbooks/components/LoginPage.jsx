import React from 'react'
import { Button, Image, ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native'
import Mbooks from "../images/Mbooks.png"
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import axios from 'axios'



const LoginPage = ({addToken, addUser}) => {

    //const image = {uri: "https://i.pinimg.com/originals/67/18/22/671822c2f63dd5f65d8fd15c9710420b.jpg"};

    const navigation = useNavigation();

    const[userData, setUserData] =useState({
        email:"",
        password:"",
    });

    function handleInput(value, name){
        let newUserData=userData;
        newUserData[name]= value;
        setUserData(newUserData);
        console.log(newUserData);
    }

    function handleLogin(e){
        e.preventDefault();
       
        axios.post("http://127.0.0.1:8000/api/login",userData).
        then((res)=>
        {
            console.log(res.data);
            if(res.data.success===true) {
               window.sessionStorage.setItem("auth_token",res.data.access_token);
                console.log(res.data);
                addToken(res.data.access_token);
                addUser(userData);
                navigation.navigate('Home');
            }

        }).
        catch((e)=>{console.log(e);});
    }


  return (
    <View
        style={styles.background}
    >
        <View
            style={styles.container}
        >
            <Image
                source={Mbooks}
                style={{height:130+"px", width:130+"px", marginBottom:30+"px" }}
            />
            
   
            <View 
                style={styles.form}
            >
                <Text style={{color: 'white'}}>Email</Text>
                <TextInput
                    style={styles.input}
                    
                    placeholder='Enter email'
                    onChangeText={value => handleInput(value, "email")}

                />
                <Text style={{color: 'white'}}>Password</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder='Enter password'
                    onChangeText={value => handleInput(value, "password")}
                />
                <Button
                    title="Login"
                    color="#212529"
                    onPress={handleLogin}
                />

            </View>

        </View>
        
    </View>
  )
}

const styles = StyleSheet.create({
    
    background: {
        flex: 1,
        display: "flex",
        backgroundColor: "rgb(218, 210, 133)"

    },
    container:{
        width: "70%",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
        backgroundColor: "#212529",
        position: "relative",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "rgba(0,0,0,.125)",
        borderRadius: "10px"
    },
    form:{
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
        backgroundColor: "#212529",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        border: "1px solid rgba(0,0,0,.125)"
    },
    input:{
        backgroundColor: "white",
        borderColor: "#212529",   
        borderWidth: "1px",
        borderRadius: "3px",
        marginTop: "5px",
        marginBottom: "15px",
        height: "30px"
    },
    image: {
      flex: 1,
      justifyContent: "center"
    },
    text: {
      color: "white",
      fontSize: 42,
      lineHeight: 84,
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "#000000c0"
    }
  });


export default LoginPage