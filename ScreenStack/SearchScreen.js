import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const SearchScreen = ({navigation}) => {
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedType, setSelectedType] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedType(null); // Reset type when category changes
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
   
  };

  return (
    <View style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
        <MaterialCommunityIcons name="less-than" size={18}  style={styles.icon}/>
        </TouchableOpacity>
        <Text style={styles.Filtertext}>Filters</Text>
        </View>
      <Text style={styles.title}>Property Type</Text>

      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={[styles.categoryButton, selectedCategory === 'Residential' && styles.selectedButton]}
          onPress={() => handleCategorySelect('Residential')}
        >
          <Text style={styles.buttonText}>Residential</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.categoryButton, selectedCategory === 'Plot' && styles.selectedButton]}
          onPress={() => handleCategorySelect('Plot')}
        >
          <Text style={styles.buttonText}>Plot</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.categoryButton, selectedCategory === 'Commercial' && styles.selectedButton]}
          onPress={() => handleCategorySelect('Commercial')}
        >
          <Text style={styles.buttonText}>Commercial</Text>
        </TouchableOpacity>
      </View>

      {selectedCategory === 'Residential' && (
        <View style={styles.typeContainer}>
          <TouchableOpacity
            style={[styles.typeButton, selectedType === 'All' && styles.selectedTypeButton]}
            onPress={() => handleTypeSelect('All')}
          >
             <MaterialCommunityIcons name="view-grid-outline" size={20} color='black' style={styles.icon1}/>
            <Text style={styles.buttonText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.typeButton, selectedType === 'House' && styles.selectedTypeButton]}
            onPress={() => handleTypeSelect('House')}
          >
            <MaterialCommunityIcons name="home" size={20} color='black' style={styles.icon1}/>
            <Text style={styles.buttonText}>House</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.typeButton, selectedType === 'Lower Portion' && styles.selectedTypeButton]}
            onPress={() => handleTypeSelect('Lower Portion')}
          >
            <MaterialCommunityIcons name="home-variant-outline" size={20} color='black' style={styles.icon1}/>
            <Text style={styles.buttonText}>Lower Portion</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.typeButton, selectedType === 'Room' && styles.selectedTypeButton]}
            onPress={() => handleTypeSelect('Room')}
          >
            <MaterialCommunityIcons name="home-modern" size={20} color='black' style={styles.icon1}/>
            <Text style={styles.buttonText}>Room</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.typeButton, selectedType === 'Guest House' && styles.selectedTypeButton]}
            onPress={() => handleTypeSelect('Guest House')}
          >
            <MaterialCommunityIcons name="warehouse" size={20} color='black' style={styles.icon1}/>
            <Text style={styles.buttonText}>Guest House</Text>
          </TouchableOpacity>
        </View>
      )}
      {selectedCategory === 'Plot' && (
        <View style={styles.typeContainer}>
          <TouchableOpacity
            style={[styles.typeButton, selectedType === 'All' && styles.selectedTypeButton]}
            onPress={() => handleTypeSelect('All')}
          >
            <MaterialCommunityIcons name="view-grid-outline" size={20} color='black' style={styles.icon1}/>
            <Text style={styles.buttonText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.typeButton, selectedType === 'Residential Plot' && styles.selectedTypeButton]}
            onPress={() => handleTypeSelect('Residential Plot')}
          >
            <MaterialCommunityIcons name="greenhouse" size={20} color='black' style={styles.icon1}/>
            <Text style={styles.buttonText}>Residential Plot</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.typeButton, selectedType === 'Commercial Plot' && styles.selectedTypeButton]}
            onPress={() => handleTypeSelect('Commercial Plot')}
          >
            <MaterialCommunityIcons name="home-city-outline" size={20} color='black' style={styles.icon1}/>
            <Text style={styles.buttonText}>Commercial Plot</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.typeButton, selectedType === 'Farmhouse Plot ' && styles.selectedTypeButton]}
            onPress={() => handleTypeSelect('Farmhouse Plot')}
          >
            <MaterialCommunityIcons name="home-variant-outline" size={20} color='black' style={styles.icon1}/>
            <Text style={styles.buttonText}>Farmhouse Plot</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.typeButton, selectedType === 'Agricultural Land' && styles.selectedTypeButton]}
            onPress={() => handleTypeSelect('Agricultural Land')}
          >
            <MaterialCommunityIcons name="warehouse" size={20} color='black' style={styles.icon1}/>
            <Text style={styles.buttonText}>Agricultural Land</Text>
          </TouchableOpacity>
        </View>
      )}
      {selectedCategory === 'Commercial' && (
        <View style={styles.typeContainer}>
          <TouchableOpacity
            style={[styles.typeButton, selectedType === 'All' && styles.selectedTypeButton]}
            onPress={() => handleTypeSelect('All')}
          >
            <MaterialCommunityIcons name="view-grid-outline" size={20} color='black' style={styles.icon1}/>
            <Text style={styles.buttonText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.typeButton, selectedType === 'Office' && styles.selectedTypeButton]}
            onPress={() => handleTypeSelect('Office')}
          >
            <MaterialCommunityIcons name="office-building-outline" size={20} color='black' style={styles.icon1}/>
            <Text style={styles.buttonText}>Office</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.typeButton, selectedType === 'Shop' && styles.selectedTypeButton]}
            onPress={() => handleTypeSelect('Shop')}
          >
            <MaterialCommunityIcons name="warehouse" size={20} color='black' style={styles.icon1}/>
            <Text style={styles.buttonText}>Shop</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.typeButton, selectedType === 'Plaza' && styles.selectedTypeButton]}
            onPress={() => handleTypeSelect('Plaza')}
          >
            <MaterialCommunityIcons name="office-building" size={20} color='black' style={styles.icon1}/>
            <Text style={styles.buttonText}>Plaza</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.typeButton, selectedType === 'Building' && styles.selectedTypeButton]}
            onPress={() => handleTypeSelect('Building')}
          >
            <MaterialCommunityIcons name="hospital-building" size={20} color='black' style={styles.icon1}/>
            <Text style={styles.buttonText}>Building</Text>
          </TouchableOpacity>
          
        </View>
      )}

      {/* Similar structure for other categories (Plot, Commercial) */}
      <TouchableOpacity style={styles.Apply}>
            <Text style={styles.Applytext}>Apply Filters</Text>
          </TouchableOpacity>
      {selectedType && (
        <Text style={styles.selectedType}>
          Selected Type: {selectedType}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#FFFFFF'
  },
   header:
   {
    flexDirection:'row',
    height:70,
    width:'100%',
    alignItems:'center',
    borderBottomWidth:1.5,
    marginBottom: 20,
    borderColor:'#d4d4d4',
    shadowColor:'#d4d4d4',
    elevation:1,
   },
   icon:
   {
    color:'red',
    marginLeft:20
   },
  Filtertext: {
    fontSize: 20,
    fontWeight: '500',
    color:'black',
    left:8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'black',
    left:20
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    borderBottomWidth:1,
    borderColor:'#d4d4d4'
  },
  categoryButton: {
    padding: 10,
    backgroundColor: '#FFFFFF',

  },
  selectedButton: {
    borderBottomWidth:3,
    borderColor: '#191645',
  },
  buttonText: {
    color: 'black',
    alignSelf:'center'
  },
  typeContainer: {
    marginLeft:10,
    marginRight:10,
    flexDirection:'row',
    flexWrap:'wrap',
   justifyContent:'center',
    alignItems:'center',
    
  },
  typeButton: {
    padding: 10,
    borderRadius: 5,
    margin:10,
    width:150,
    backgroundColor: '#ddd',
    flexDirection:'row',

  },
  selectedType: {
    fontSize: 18,
    marginTop: 20,
    color:'black'
  },
  selectedTypeButton: {
    borderWidth:1,
    borderColor: '#191645',
  },
 Apply: {
   height:50,
   width:150,
   backgroundColor:'#191645',
   borderRadius:5,
   justifyContent:'center',
   alignItems:'center',
   alignSelf:'center',
   marginTop:50
  },
  Applytext:
  {
    alignSelf:'center',
    color:'#FFFFFF',
    fontSize:20,
    fontWeight:'500'
  }
});

export default SearchScreen;
