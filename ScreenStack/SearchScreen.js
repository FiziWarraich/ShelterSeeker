import React, { useState ,useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from "axios";

const SearchScreen = ({navigation,route}) => {
  const { post_id, location_id,type } = route.params;
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [Category, setCategory] = useState([]); // Store categories from API
  const [types, setTypes] = useState({ });


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoryResponse = await axios.get('https://shelterseeker.projectflux.online/api/category');
        setCategory(categoryResponse.data.Category);
      const [firstResponse, secondResponse, thirdResponse] = await Promise.all([
        axios.get('https://shelterseeker.projectflux.online/api/Firstype'),
        axios.get('https://shelterseeker.projectflux.online/api/Secondtype'),
        axios.get('https://shelterseeker.projectflux.online/api/Thirdtype')
      ]);

      setTypes({
        Residential: firstResponse.data.FirstFiveTypes,
        Commercial: secondResponse.data.SecondFiveTypes,
        'Plot Area': thirdResponse.data.ThirdFiveTypes
      });
      
    } catch (error) {
      console.error("Error fetching types", error);
    }
  };
  fetchData();
}, []);
   
 

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedType(null); // Reset type when category changes
  };

  const handleFirsTypeSelect = (type) => {
    setSelectedType(type);
  };

  const applyFilters = () => {
    if (!selectedCategory || !selectedType) {
      alert("Please select both a category and a type.");
      return;
    }

    // Find the selected category and type's IDs
    const selectedCategoryData = Category.find(cat => cat.category_name === selectedCategory);
    const selectedTypeData = types[selectedCategory].find(t => t.property_type === selectedType);

    const category_id = selectedCategoryData ? selectedCategoryData.id : null;
    const type_id = selectedTypeData ? selectedTypeData.id : null;

    // Navigate to PropertyListScreen and pass category_id and type_id
    if (category_id && type_id) {
      // Navigate to FilterProperty screen with post_id, location_id, category_id, and type_id
      navigation.navigate('FilterProperty', {
        post_id,   // Ensure post_id is passed
        location_id,      // Pass location_id
        category_id,      // Pass selected category ID
        type_id ,        // Pass selected type ID
        type,
      });
    } else {
      alert("Selected category or type is invalid.");
    }
  }

  // Get types based on selected category or show all types if none is selected
  const filteredTypes = selectedCategory ? types[selectedCategory] || [] :
  Object.values(types).flat();// Flatten all types if no category is selected

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
      {Category.map((category) => (
        <TouchableOpacity
        key={category.id}
          style={[styles.categoryButton, selectedCategory === category.category_name && styles.selectedButton]}
          onPress={() => handleCategorySelect(category.category_name)}
        >
          <Text style={styles.buttonText}>{category.category_name}</Text>
        </TouchableOpacity>
         ))}
        
      </View>

      {selectedCategory && (
        <View style={styles.typeContainer}>
           {filteredTypes.length > 0 ? (
            filteredTypes.map((type) => (
          <TouchableOpacity
            key={type.id}
            style={[styles.typeButton, selectedType === type.property_type && styles.selectedTypeButton]}
            onPress={() => handleFirsTypeSelect(type.property_type)}
          >
             <MaterialCommunityIcons name="view-grid-outline" size={20} color='black' style={styles.icon1}/>
            <Text style={styles.buttonText}>{type.property_type}</Text>
          </TouchableOpacity>
              ))
            ):null
          }
          
        </View>
      )}
     

      {/* Similar structure for other categories (Plot, Commercial) */}
      <TouchableOpacity style={styles.Apply} onPress={applyFilters}>
            <Text style={styles.Applytext}>Apply Filters</Text>
          </TouchableOpacity>
    
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
