// PropertyDetailScreen.js
import React ,{useEffect} from 'react';
import { View, Text, Image, StyleSheet, ScrollView ,FlatList,TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GoogleMapView from '../Components/GoogleMapView';
import { WebView } from 'react-native-webview';

const PropertyDetailScreen = ({ route,navigation }) => {
  const { property } = route.params;
  const images = property.images;
  const BASE_URL = 'https://shelterseeker.projectflux.online/storage/adminCategory/';
  useEffect(() => {
    console.log('Images Array:', images);
  }, [ images]);

  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={images}
        horizontal
        showsHorizontalScrollIndicator={true}
        indicatorStyle="black"
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          // Debugging: log the full image URL
          console.log(item.images);

          return (
            <View style={styles.imageContainer}>
               <View style={styles.imageWrapper}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContainer}>
            <MaterialCommunityIcons name="keyboard-backspace" size={32} style={styles.iconback} />
          </TouchableOpacity>
          </View>
              <Image
                source={{ uri: item.images }} // Using the full URL directly
                style={styles.image}
                onError={(error) => console.log('Image load error:', error)}
              />
             
            </View>
          );
        }}
      />

      <View style={styles.detailsContainer}>
            <View style={{flexDirection:'row'}}>
            <Text style={styles.price}>Rs-{property.price}</Text>
              <MaterialCommunityIcons name="checkbox-blank" size={18} color='#191645' style={styles.icon} />
              <Text style={styles.type}>{property.type}</Text>
            </View>
              
              <Text style={styles.location}>{property.location}</Text>
              <View style={{flexDirection:'row'}}>
              <Text style={[styles.areaSize]}>{property.area_size}</Text>
              </View >
              <Text style={styles.borderline}></Text>
              <Text style={[styles.description,]}>
                {property.description || 'No description available'}
              </Text>
            </View>
            <View>
            <Text style={styles.map}>Google Map:</Text>
            </View>
            
            <View style={{height:500,width:500,marginTop:10}}>
              <GoogleMapView
               latitude={parseFloat(property.location_latitude)}
               longitude={parseFloat(property.location_longitude)}
               
              />
            </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  imageWrapper: {
    position: 'relative', // Allows absolute positioning of the icon inside this wrapper

  },
  iconContainer: {
    position: 'absolute',
    top: 10, // Adjust position as needed
    left: 10, // Adjust position as needed
    zIndex: 1, // Ensures the icon appears above the image
  },
  iconback:
  {
    color:'black'
  },
  image: {
    width: 400, // Set a width
    height: 250, // Set a height
    resizeMode: 'cover',
   
  },
  detailsContainer: {
    padding: 16,
  },
  post: {
    fontSize: 16,
    marginBottom: 8,
    color: '#000',
  },
  imageContainer:
  {
    marginRight: 5, // Add spacing between images
    borderRadius: 10,
    overflow: 'hidden', 
  },
  type: {
    right:-35,
    fontSize: 16,
    marginBottom: 8,
    color: '#000',
  },
  icon: {
    right:-35,
    marginBottom: 8,
    top:2
  },
  price: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 5,
    color: '#191645',
  },
  location: {
    fontSize: 18,
    marginBottom: 8,
    color: '#696969',
  },
  areaSize: {
    fontSize: 18,
    marginBottom: 8,
    color: '#696969',
    
  },
  borderline:
  {
    borderTopWidth:1,
    marginTop:2,
    borderColor: '#d4d4d4',
    width:400,
    right:15
  },
  map:
  {
   color:'black',
   left:15,
   fontSize:20,
   fontWeight:'500'
  },
  description: {
    fontSize: 14,
    color: '#333',
    
  },
  
});

export default PropertyDetailScreen;
