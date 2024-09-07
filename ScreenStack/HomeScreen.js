import React, { useState, useEffect } from "react";
import {
   View, Text, StyleSheet, Button, ImageBackground, Image, SafeAreaView, TouchableOpacity
   , TextInput, ScrollView, FlatList,
   TextComponent
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { SearchBar } from "react-native-screens";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
   const [location, setLocation] = useState([]);
   const [Post, setPost] = useState([]); // State to manage 'Buy' or 'Rent' selection
   const [types, setTypes] = useState(null);
   const [searchText, setSearchText] = useState("");
   const [filterData, setFilterData] = useState([]);

   useEffect(() => {
      const fetchTypes = async () => {
         try {
            const response = await axios.get('https://project.theposgeniee.com/api/post'); // API URL for Buy/Rent options
            setPost(response.data.Post); // assuming response contains { types: ['buy', 'rent'] }
            console.log(response.data.Post)
         } catch (error) {
            console.log('Error fetching types:', error);
         }
      };
      const fetchLocations = async () => {
         try {
            const response = await axios.get('https://project.theposgeniee.com/api/location');
            setLocation(response.data.location); // Correctly setting location state
            console.log(response.data.location);
         } catch (error) {
            console.log('Error fetching locations:', error);
         }
      };


      fetchTypes();
      fetchLocations();
   }, []);
   // Replace this with your actual API call
   const searchLocation = async (text) => {
      setSearchText(text);

      if (text.length > 0) {
         const url = `https://project.theposgeniee.com/api/location?q=${text}`;

         try {
            const result = await fetch(url);
            const data = await result.json();
            if (data && data.location) {
               const filtered = data.location.filter((item) => {
                  const itemData = item.property_location
                     ? item.property_location.toUpperCase()
                     : '';
                  const textData = text.toUpperCase();
                  return itemData.startsWith(textData);
               });

               setFilterData(filtered); // Set filtered locations
            }
         } catch (error) {
            console.log("Error fetching locations:", error);
         }
      } else {
         setLocation([]);
         setFilterData([]);
      }
   };
   const handleLocationSelect = (selectedLocation) => {
      // Handle location selection
      setSearchText(selectedLocation.property_location); // Set the selected location text in search bar
      setFilterData([]); // Clear filtered locations after selection
   };

   const renderLocationItem = ({ item }) => (
      <TouchableOpacity
         style={styles.location}
         onPress={() => handleLocationSelect(item)}
      >
         <Text style={styles.locationtext}>{item.property_location.toUpperCase()}</Text>
      </TouchableOpacity>
   );

   const handleTypeSelect = (selectedPost) => {
      setTypes(selectedPost); // Set the selected type (Buy/Rent)
   };
   const handleSearch = () => {
      if (types && searchText) {
         console.log(searchText);
         // Navigate to PropertyListScreen with selected Post and location
         const selectedPost = Post.find(item => item.property_post === types); // Get the selected Post object
         const selectedLocation = location.find(item => item.property_location === searchText); // Get the selected location object

         if (selectedPost && selectedLocation) {
            navigation.navigate('PropertyList', {
               post_id: selectedPost.id, // Passing post ID
               location_id: selectedLocation.id // Passing location ID
            });
         } else {
            alert('Please select valid options!');
         }
      }
   };
   return (
      <ScrollView>
         <View style={styles.container}>
            <ImageBackground style={styles.image} source={require("../assests/home.jpeg")} />
            <Image style={styles.image1} source={require("../assests/logo.png")} />
            <Text style={styles.buyText}>Buy or Rent with Trust</Text>
            <View style={styles.btn} >
               {Post.map((item) => (
                  <TouchableOpacity
                     key={item.id}
                     style={[
                        styles.btn1,
                        { backgroundColor: types === item.property_post ? "#FFFFFF" : "#d4d4d4" },
                     ]} onPress={() => handleTypeSelect(item.property_post)}

                  >
                     <Text style={styles.Buytext}>{item.property_post}</Text>
                  </TouchableOpacity >
               ))}

            </View>
            <View>
               <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <TextInput
                     style={styles.textInput}
                     placeholder="Search an area"
                     placeholderTextColor="#CAD0CF"
                     value={searchText}
                     onChangeText={(text) => searchLocation(text)}
                  />
                  <TouchableOpacity style={styles.box} onPress={handleSearch} disabled={!types || !location}>
                     <Icon name="search" size={24} color='#ffffff' style={styles.icon} />
                  </TouchableOpacity>
                  <View style={{
                     justifyContent: 'center', alignContent: 'center', alignItems: 'center'
                     , backgroundColor: 'white'
                  }}>
                     <View style={{
                        flexWrap: 'wrap', flexDirection: 'row',
                        justifyContent: 'center', position: 'absolute',
                        height: 100, width: 234,
                        right: 21, top: -50

                     }}>
                        {searchText.length > 0 && filterData.length > 0 && (
                           <FlatList
                              data={filterData} // The data to render
                              renderItem={renderLocationItem} // Function to render each item
                              keyExtractor={(item) => item.id.toString()} // Unique key for each item

                           />
                        )
                        }

                     </View>

                  </View>


               </View>
            </View>


         </View>
         <View>



         </View>
         <View style={styles.card}>
            <Image style={styles.redlogo} source={require("../assests/redlogo.png")} />
            <View>
               <Text style={styles.redlogotext}>Buy a property</Text>
               <Text style={styles.redlogotext1}>Don't wait buy a property.</Text>
               <Text style={styles.redlogotext1}>"BUY LAND AND WAIT'</Text>
               <TouchableOpacity style={styles.redlogobtn}>
                  <Text style={styles.redlogotextbtn}>Buy a house</Text>
               </TouchableOpacity>
            </View>
         </View>
         <View style={styles.card}>

            <View>
               <Text style={styles.greylogotext}>Rent a property</Text>
               <Text style={styles.greylogotext1}>"Home is the nicest word there is."</Text>
               <TouchableOpacity style={styles.greylogobtn} onPress={() => navigation.navigate('BuyListing')}>
                  <Text style={styles.greylogotextbtn}>Find rentals</Text>
               </TouchableOpacity>
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
export default HomeScreen;