import React, { useState, useEffect } from "react";
import {
   View, Text, StyleSheet, Button, ImageBackground, Image, SafeAreaView, TouchableOpacity
   , TextInput, ScrollView, FlatList,Alert,
   TextComponent
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { SearchBar } from "react-native-screens";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';

const HomeCards = () => {
    const navigation = useNavigation();
   const [Post, setPost] = useState([]); // State to manage 'Buy' or 'Rent' selection
   
 
   // Function to fetch post types from API
   

   
      const fetchTypes = async () => {
         try {
            const response = await axios.get('https://shelterseeker.projectflux.online/api/post'); // API URL for Buy/Rent options
            setPost(response.data.Post); // assuming response contains { types: ['buy', 'rent'] }
            
         } catch (error) {
            console.log('Error fetching types:', error);
         }
      };
      

      useEffect(() => {
      fetchTypes();
     
   }, []);
   // Replace this with your actual API call
  

   
const handleChoice = (post_id) => {
   navigation.navigate('PropertyList', {post_id }); // Navigates to PropertyListScreen with selected type
 };
 const buyTypes = Post.filter(post => post.property_post.toLowerCase() === 'buy'); // Ensure 'buy' is lowercase
 const rentTypes = Post.filter(post => post.property_post.toLowerCase() === 'rent'); 

   return (
      <ScrollView>
         
         <View style={styles.card}>
            <Image style={styles.redlogo} source={require("../assests/redlogo.png")} />
            <View>
               <Text style={styles.redlogotext}>Buy a property</Text>
               <Text style={styles.redlogotext1}>Don't wait buy a property.</Text>
               <Text style={styles.redlogotext1}>"BUY LAND AND WAIT'</Text>
               {buyTypes.map((Post) => (
               <TouchableOpacity key={Post.id} style={styles.redlogobtn} onPress={() => handleChoice(1)}>
                  <Text style={styles.redlogotextbtn}>{Post.property_post}</Text>
               </TouchableOpacity>
               ))}
            </View>
         </View>
         <View style={styles.card}>

            <View>
               <Text style={styles.greylogotext}>Rent a property</Text>
               <Text style={styles.greylogotext1}>"Home is the nicest word there is."</Text>
               {rentTypes.map((Post) => (
               <TouchableOpacity key={Post.id} style={styles.greylogobtn} onPress={() => handleChoice(2)}>
                  <Text style={styles.greylogotextbtn}>{Post.property_post}</Text>
               </TouchableOpacity>
               ))}
            </View>
            <Image style={styles.greylogo} source={require("../assests/greylogo.png")} />
         </View>
      </ScrollView>

   );
}
const styles = StyleSheet.create
   ({
      container:
      {
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center',

      },
      image:
      {
         width: 400,
         height: 350,
      },
      image1:
      {
         width: 200,
         height: 200,
         position: 'absolute',
         top: -70

      },
      buyText:
      {
         position: 'absolute',
         fontSize: 28,
         fontWeight: 'bold',
         color: 'black',
         top: 100
      },
      btn:
      {
         position: 'absolute',
         display: 'flex',
         flexDirection: 'row',

      },
      btn1:
      {
         margin: 10,
         height: 50,
         width: 100,
         borderRadius: 10,
         justifyContent: 'center',
         alignItems: 'center'
      },
      btn2:
      {
         left: 8,
         height: 50,
         width: 100,
         borderRadius: 10,
         justifyContent: 'center',
         alignItems: 'center',
      },
      Buytext:
      {
         fontSize: 18,
         fontWeight: 'bold',
         color: 'black',
         justifyContent: 'center',
         alignItems: 'center',
         alignSelf: 'center',
      },
      Renttext:
      {
         fontSize: 18,
         fontWeight: 'bold',
         color: 'black',
         justifyContent: 'center',
         alignItems: 'center',
         alignSelf: 'center',
      },
      textInput:
      {
         color: '#191645',
         fontSize: 18,
         backgroundColor: '#FFFFFF',
         borderWidth: 2,
         borderColor: 'white',
         borderTopLeftRadius: 40,
         borderBottomLeftRadius: 40,
         left: -20,
         width: 250,
         height: 50,
         top: -100,
         paddingLeft: 20,
      },
      box:
      {
         width: 60,
         height: 50,
         backgroundColor: '#191645',
         position: 'absolute',
         borderWidth: 1,
         borderBottomRightRadius: 30,
         borderTopRightRadius: 30,
         top: -100,
         right: -39,
         borderColor: '#191645',
         justifyContent: 'center',
         alignItems: 'center'
      },
      locationtext:
      {
         color: 'black',
         backgroundColor: '#FFFFFF',
         padding: 5,
         fontSize: 16,
      },

      card:
      {
         display: 'flex',
         flexDirection: 'row',
         height: 250,
         width: 400,
         backgroundColor: '#FFFFFF',
         marginBottom: 50,
         elevation: 15,

      },
      redlogo:
      {
         height: 200,
         width: 200,

      },
      redlogotext:
      {
         fontSize: 18,
         fontWeight: 'bold',
         color: '#191645',
         top: 50
      },
      redlogotext1:
      {
         fontSize: 16,
         fontWeight: '400',
         color: '#A9A9A9',
         top: 50,
         width: 150,
      },
      redlogobtn:
      {
         height: 50,
         width: 150,
         backgroundColor: '#FFFFFF',
         borderRadius: 30,
         borderWidth: 2,
         borderColor: '#191645',
         justifyContent: 'center',
         alignItems: 'center',
         top: 70
      },
      redlogotextbtn:
      {
         fontSize: 18,
         fontWeight: 'bold',
         color: '#191645',
      },
      greylogo:
      {
         height: 200,
         width: 200,
         top: 30,
         right: -10
      },
      greylogotext:
      {
         fontSize: 18,
         fontWeight: 'bold',
         color: '#191645',
         top: 50,
         left: 20
      },
      greylogotext1:
      {
         fontSize: 16,
         fontWeight: '400',
         color: '#A9A9A9',
         top: 60,
         left: 20,
         width: 150,
      },
      greylogobtn:
      {
         height: 50,
         width: 150,
         backgroundColor: '#FFFFFF',
         borderRadius: 30,
         borderWidth: 2,
         borderColor: '#191645',
         justifyContent: 'center',
         alignItems: 'center',
         top: 100,
         left: 20,

      },
      greylogotextbtn:
      {
         fontSize: 18,
         fontWeight: 'bold',
         color: '#191645',
      },

   });
export default HomeCards;
