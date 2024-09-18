// PropertyDetailScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView ,FlatList} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GoogleMapView from '../Components/GoogleMapView';

const PropertyDetailScreen = ({ route }) => {
  const { property } = route.params;
  const images = property.images;
  const BASE_URL = 'https://shelterseeker.projectflux.online/storage/adminCategory/';
 
  return (
    <ScrollView style={styles.container}>
       <FlatList
        data={images}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => ( 
            <View style={styles.imageContainer}>
            <Image
             source={{ uri: `${BASE_URL}${item.images}` }}
              style={styles.image}

            />
          </View>
        )}
        
      />
      <View style={styles.detailsContainer}>
            <View style={{flexDirection:'row'}}>
              <Text style={styles.post}>House for {property.post}</Text>
              <MaterialCommunityIcons name="checkbox-blank" size={18} color='#191645' style={styles.icon} />
              <Text style={styles.type}>{property.type}</Text>
            </View>
              <Text style={styles.price}>Rs-{property.price}</Text>
              <Text style={styles.location}>{property.location}</Text>
              <View style={{flexDirection:'row'}}>
              <Text style={styles.location}>{property.area_size}</Text>
              </View >
              <Text style={styles.description}>
                {property.description || 'No description available'}
              </Text>
            </View>
            <View style={{height:500}}>
              <GoogleMapView
               latitude={parseFloat(property.location_latitude)}
               longitude={parseFloat(property.location_longitude)}
               
              />
            </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: '100%',
    height: 200,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
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
  height:'100%',
  width:'90%'
  },
  type: {
    right:-110,
    fontSize: 16,
    marginBottom: 8,
    color: '#000',
  },
  icon: {
    right:-110,
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
  description: {
    fontSize: 14,
    color: '#333',
  },
});

export default PropertyDetailScreen;
