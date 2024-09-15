import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Linking, Alert, Modal,ActivityIndicator } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from "axios";

const BuyListingScreen = ({ route,navigation }) => {
    const { type} = route.params; // Extracting the post_id and location_id from the route params
    const [properties, setProperties] = useState([]);
    const number = '+923007406322'
    const message = "hello there!!"
    const listRef = useRef();
    const [ind, setInd] = useState(0);
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState();
    const [selectedFilter, setSelectedFilter] = useState(0);
    const [loading, setLoading] = useState(true);

  // Function to fetch properties based on the selected type
  const fetchProperties = async () => {
    try {
      const response = await axios.get('https://shelterseeker.projectflux.online/api/properties'); // Adjust API URL accordingly
      // Filter properties based on type (Rent or Buy)
      const filteredProperties = response.data.properties.filter(property => property.post === type);
      if (filteredProperties.length === 0) {
        setError('Property not found'); // Set error message if no properties found
      } else {
        setProperties(filteredProperties); // Set the filtered properties
        setError(''); // Clear error message if properties are found
      }
    } catch (error) {
      console.log('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [type]);

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
                <Text style={styles.text}>PropertyList</Text>
                <Icon name="home" size={24} color={"#FFFFFF"} style={styles.homeicon}></Icon>
            </View>

            <View style={styles.container}>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Filters')}>
                    <MaterialCommunityIcons name="filter-outline" size={18} color='#FFFFFF' style={styles.icon} />
                    <Text style={styles.btntext}>Filters</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={() => {
                    setVisible(true);
                }}>
                    <MaterialCommunityIcons name="filter-variant" size={20} color='#FFFFFF' style={styles.icon} />
                    <Text style={styles.btntext}>Sort</Text>
                </TouchableOpacity>
            </View>
            {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <View style={styles.error}>
        <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : properties.length > 0 ? (
            <FlatList style={{ marginBottom: 100, backgroundColor: '#FFFFFF' }}

                data={properties}
                keyExtractor={(item) => item.id.toString()}
                ref={listRef}
                showsVerticalScrollIndicator={false}
                initialScrollIndex={ind}
                renderItem={({ item }) => {
                    const firstImage = item.images.length > 0 ? item.images[0].images : null;
                    console.log(firstImage);
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
                               source={{ uri: `https://shelterseeker.projectflux.online/api/properties${firstImage}` }}
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
                                    <Text style={{ fontSize: 16, marginLeft: 20, color: 'black' }}>
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
        ) : (
            <Text >No properties available</Text>
          )}
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={() => {
                    setVisible(!visible);
                }}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,.5)',
                    }}>
                    <View
                        style={{
                            width: '80%',
                            height: 150,
                            borderRadius: 10,
                            backgroundColor: '#fff',
                        }}>
                        <TouchableOpacity
                            style={{
                                width: '100%',
                                height: 50,
                                borderBottomWidth: 0.5,
                                justifyContent: 'center',
                                paddingLeft: 20,
                            }}
                            onPress={() => {
                                setSelectedFilter(1);
                                let tempList = properties.sort((a, b) =>
                                    a.location > b.location ? 1 : -1,
                                );
                                setData(tempList);
                                listRef.current.scrollToIndex({ animated: true, index: 0 });
                                setVisible(false);
                            }}>
                            <Text style={{ fontSize: 18, color: '#000' }}>
                                Sort By Name
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                width: '100%',
                                height: 50,
                                borderBottomWidth: 0.5,
                                justifyContent: 'center',
                                paddingLeft: 20,
                            }}
                            onPress={() => {
                                setSelectedFilter(2);
                                setData(properties.sort((a, b) => a.title - b.title));
                                listRef.current.scrollToIndex({ animated: true, index: 0 });
                                setVisible(false);
                            }}>
                            <Text style={{ fontSize: 18, color: '#000' }}>
                                Low to High Price
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                width: '100%',
                                height: 50,
                                borderBottomWidth: 0.5,
                                justifyContent: 'center',
                                paddingLeft: 20,
                            }}
                            onPress={() => {
                                setSelectedFilter(3);
                                setData(properties.sort((a, b) => b.title - a.title));
                                listRef.current.scrollToIndex({ animated: true, index: 0 });
                                setVisible(false);
                            }}>
                            <Text style={{ fontSize: 18, color: '#000' }}>
                                Hight to Low Price
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>
        </View>
    )
};
const styles = StyleSheet.create
    ({
        container:
        {

            display: 'flex',
            flexDirection: "row",
            backgroundColor: '#FFFFFF'
        },
        line: {
            height: 70,
            borderBottomWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#191645',
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

export default BuyListingScreen;