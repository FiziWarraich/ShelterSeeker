import React, { useEffect, useState,  } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Linking, Alert, Modal,ActivityIndicator } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from "axios";

const FilterPropertyScreen = ({ route,navigation }) => {
    const { post_id, location_id ,type, category_id,type_id} = route.params; // Extracting the post_id and location_id from the route params
    const [properties, setProperties] = useState([]);
    const number = '+923007406322'
    const message = "hello there!!"
    const [ind, setInd] = useState(0);
    const [error, setError] = useState();
    const [selectedFilter, setSelectedFilter] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchFilteredProperties = async () => {
        setLoading(true); // Show loading indicator
    console.log(post_id)
    console.log(category_id)
    console.log(type_id)
        try {
            // Make API request with correct parameters
            const response = await axios.get('https://shelterseeker.projectflux.online/api/properties', {
                params: {
                    post_id: post_id, // `types` should be the selected post type (e.g., 'Buy' or 'Rent')
                    location_id: location_id, // Find ID for the selected location
                    category_id:category_id ,
                    type_id:type_id,
                    
                },
            });
    
            // Log response data for debugging
            console.log('API Response:', response.data);
    
            // Check if the response contains properties
            if (response.data && Array.isArray(response.data.properties)) {
                const filteredProperties = response.data.properties;
    
                // Handle case where no properties match the current filter
                if (filteredProperties.length === 0) {
                    Alert.alert('No properties match your criteria.');
                    setProperties([]); // Clear properties if none found
                } else {
                    setProperties(filteredProperties); // Update state with fetched properties
                }
            } else {
                setProperties([]); // Clear properties if the response is invalid
            }
        } catch (error) {
            console.log('Error fetching properties:', error);
            setProperties([]); // Clear properties in case of error
        } finally {
            setLoading(false); // Hide loading indicator
        }
    };
    
    // Ensure fetchFilteredProperties is called whenever `post_id` or `location_id` changes
    useEffect(() => {
        fetchFilteredProperties();
    }, [post_id, location_id,category_id,type_id,]);
    
     // Dependency array to re-fetch when post_id or location_id change
    // Dependenc
 
    const openUrl = async (url) => {
        const isSupported = await Linking.canOpenURL(url);
        if (isSupported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this url: ${url}`);
        }
    }
    
    return (
        <View>
            <View style={styles.line}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
            <MaterialCommunityIcons name="less-than" size={18}  style={styles.iconback}/>
            </TouchableOpacity>
                <Text style={styles.text}>PropertyList</Text>
                <Icon name="home" size={24} color={"#FFFFFF"} style={styles.homeicon}></Icon>
            </View>
            {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
        ) : properties.length === 0 ? (
            <View style={styles.error}>
                <Image style={{height:70,top:180,width:70,resizeMode:'cover',position:'absolute',}} source={require("../assests/sad.png")} />
                <Text style={styles.errorText}>Property not found</Text>
                <TouchableOpacity style={{borderRadius:5,top:280,borderWidth:1,height:40,width:100,justifyContent:'center',backgroundColor:'#191645'}}
          onPress={()=>navigation.goBack()} 
       >
              <Text style={{color:'#FFFFFF',fontSize:20,alignSelf:'center'}} >Ok</Text>
            </TouchableOpacity>
            </View>
        ) : (
            <FlatList style={{ marginBottom: 100, backgroundColor: '#FFFFFF' }}

                data={properties}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                initialScrollIndex={ind}
                renderItem={({ item }) => {
                    
                    return (
                        <TouchableOpacity
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
                            onPress={() => navigation.navigate('PropertyDetail', { property: item })}
                            >
                            <TouchableOpacity style={styles.favicon}>
                                <Icon name="heart-o" size={24} color={"#191645"}></Icon>
                            </TouchableOpacity>

                            <Image
                               source={{ uri: item.image }}
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
                        </TouchableOpacity>
                    );
                }}
            />
        ) }
           
        </View>
    )
};
const styles = StyleSheet.create
    ({
        container:
        {

            display: 'flex',
            flexDirection: "row",
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

export default FilterPropertyScreen;
