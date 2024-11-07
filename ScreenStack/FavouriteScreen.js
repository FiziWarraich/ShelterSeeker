import React, { useEffect, useState,useRef } from 'react';
import { View, FlatList, Text, TouchableOpacity, ActivityIndicator,Modal,Image ,StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

const FavoriteScreen = ({navigation}) => {
    const [favoriteProperties, setFavoriteProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const listRef = useRef();
    const [ind, setInd] = useState(0);
    const [visible, setVisible] = useState(false);

    const setAuthToken = async () => {
        const token = await AsyncStorage.getItem('token'); // Replace 'token' with your actual token key
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Set token in headers
        }
    };
    const fetchFavorites = async () => {
        setLoading(true); // Start loading
        try {
            const favoritesData = await AsyncStorage.getItem('favorites');
            const favorites = favoritesData ? JSON.parse(favoritesData) : [];
            
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get('https://shelterseeker.projectflux.online/api/show', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            console.log("API Response Data:", response.data);
    
            // Accessing the favorites array from the response
            const filteredFavorites = response.data.favorites.filter(property => {
                const isFavorite = favorites.includes(property.id);
                console.log('Checking property:', property.id, 'isFavorite:', isFavorite);
                return isFavorite; // Only include favorite properties
            });
    
            console.log('Filtered Favorites:', filteredFavorites);
            setFavoriteProperties(filteredFavorites);
        } catch (error) {
            console.error('Error fetching favorites:', error);
        } finally {
            setLoading(false); // Stop loading
        }
    };
    
    
    
    
    
    
    
    
    
    
 
    const removeFavorite = async (propertyId) => {
        try {
            // Use DELETE method if that's what the API requires
            await axios.delete(`https://shelterseeker.projectflux.online/api/delete`, {
                data: { property_id: propertyId },
            });
            setFavoriteProperties(favoriteProperties.filter(property => property.id !== propertyId));
            
            // Update AsyncStorage after removing
            const favoritesData = await AsyncStorage.getItem('favorites');
            if (favoritesData) {
                const updatedFavorites = JSON.parse(favoritesData).filter(id => id !== propertyId);
                await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            }
        } catch (error) {
            console.error('Error removing favorite:', error);
        }
    };
    


    useFocusEffect(
        React.useCallback(() => {
            setAuthToken(); // Set the token before fetching
            fetchFavorites(); // Fetch data when the screen comes into focus
        }, [])
    );
   
    return (
        <View >
             <View style={styles.line}>
                <Text style={styles.text}>Favourite List</Text>
                <Icon name="heart" size={24} color={"#FFFFFF"} style={styles.homeicon}></Icon>
            </View>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" style={{marginTop: 15}}/>
            ) : favoriteProperties.length > 0 ? (
        <FlatList style={{ marginBottom: 150, backgroundColor: '#FFFFFF' }}

        data={favoriteProperties}
        keyExtractor={(item) => item.id.toString()}
        ref={listRef}
        showsVerticalScrollIndicator={false}
        initialScrollIndex={ind}
        renderItem={({ item }) => { 

            return (
                <View
                    style={{
                        width: '95%',
                        height: 190,
                        borderRadius: 10,
                        borderWidth: 0.5,
                        alignSelf: 'center',
                        marginBottom: 10,
                        alignItems: 'center',
                        flexDirection: 'row',
                        backgroundColor: '#FFFFFF',
                        marginTop: 20,
                        elevation: 15
                    }}

                    >
                    <TouchableOpacity
                            style={styles.favicon}
                            onPress={() => removeFavorite(item.id)}>
                            <Icon name={"heart" ? "heart" : "heart-o"} size={24} color={"#191645"} />
                        </TouchableOpacity>

                    <Image
                        source={{ uri:item.image }}
                        style={{
                            width: 100,
                            height: '90%',
                            marginLeft: 10,
                            borderRadius: 10,
                        }}
                    />
                    <View style={{ width: '80%' }}>
                        <Text
                            style={{ fontWeight: '600', marginLeft: 10, color: 'black', fontSize: 16 }}>
                            Rs-{item.price}
                        </Text>
                        <Text style={{ fontSize: 16, fontWeight: '600', margin: 5, marginLeft: 10, color: 'black' }}>
                            {item.location}
                        </Text>
                        <Text style={{ fontSize: 16, fontWeight: '400', margin: 3, marginLeft: 10, color: 'black' }}>
                             {item.category}
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: 10,
                                marginLeft: 5
                            }}>
                            <Text style={{ fontSize: 16, marginLeft: 10, color: 'black' }}>
                               {item.post}
                            </Text>
                            <Text style={{ fontSize: 16, marginLeft: 40, color: 'black' }}>
                                {item.type}
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: 10,
                                marginLeft: 5
                            }}>
                            <TouchableOpacity style={{ height: 35, width: 80, backgroundColor: '#191645', borderRadius: 10, justifyContent: 'center' }} 
                            onPress={() => navigation.navigate('Calculator',{ property: item })}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        alignSelf: 'center',
                                        fontWeight: '400',
                                        color: '#FFFFFF',
                                    }}>
                                    Calculator
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ height: 35, width: 70, backgroundColor: '#191645', borderRadius: 10, justifyContent: "center", marginLeft: 5 }} 
                            onPress={() => {
                                Linking.openURL(`tel:${number}`)
                            }}>
                                <MaterialIcons name="call" size={18} color='#FFFFFF' style={styles.icon} />
                                <Text
                                    style={{
                                        fontSize: 16,
                                        left: 33,
                                        fontWeight: '400',
                                        color: '#FFFFFF',
                                    }}>
                                    Call
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ height: 35, width: 60, backgroundColor: '#191645', borderRadius: 10, justifyContent: 'center', marginLeft: 5 }} onPress={() => {
                                Linking.openURL(`whatsapp://send?phone=${number}&text=${message}`)
                            }} >
                                <MaterialCommunityIcons name="whatsapp" size={22} color='#FFFFFF' style={styles.flaticon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            );
        }}
    />
) : (
    <View style={styles.error}>
    <Image style={{height:70,top:180,width:70,resizeMode:'cover',position:'absolute',}} source={require("../assests/sad.png")} />
    <Text style={styles.errorText}>No Available Favorites'sProperty</Text>
    <TouchableOpacity style={{borderRadius:5,top:280,borderWidth:1,height:40,width:100,justifyContent:'center',backgroundColor:'#191645'}}
     onPress={()=>navigation.goBack()} 
>
  <Text style={{color:'#FFFFFF',fontSize:20,alignSelf:'center'}} >Ok</Text>
</TouchableOpacity>
</View>
)}
    </View>
    )}
    const styles = StyleSheet.create
    ({
        container:
        {

            display: 'flex',
            flexDirection: "row",
            backgroundColor: '#FFFFFF'
        },
        line: {
            flexDirection:'row',
            height:70,
            width:'100%',
            alignItems:'center',
            borderBottomWidth:1.5,
            marginBottom: 20,
            backgroundColor:'#191645',
            justifyContent:'center',
            alignContent:'center'
        },
        iconback:
   {
    color:'#FFFFFF',
    marginLeft:-100
   },
        text:
        {
            color: "#FFFFFF",
            fontWeight: 'bold',
            fontSize: 20,
            marginLeft: 15,
            alignSelf: 'center',

        },
        homeicon:
        {
            right: 20,
            position: 'absolute'
        },
        btn:
        {
            height: 50,
            width: 110,
            backgroundColor: '#191645',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            shadowColor: 'black',
            borderWidth: 1.5,
            marginTop: 10,
            marginLeft: 10,
        },
        btntext:
        {
            color: '#FFFFFF',
            fontSize: 16,
            fontWeight: '700'
        },
        favicon:
        {
            position: 'absolute',
            right: 11,
            top: 10
        },
        icon:
        {
            position: 'absolute',
            left: 11,
        },

        flaticon:
        {
            position: 'absolute',
            left: 20
        },
        error:
        {    
            alignContent:'center',
            alignItems:'center',
        },
        errorText:
        {
            color:'black',
            fontSize:24,
            fontWeight:'bold',
            top:250,

        }
    });

export default FavoriteScreen;
