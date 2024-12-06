import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet,TouchableOpacity ,ActivityIndicator,ScrollView,KeyboardAvoidingView,} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const EditProfileScreen = () => {
    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);


  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const validatePasswordLength = (password) => {
    const minLength = 8; 
    return password.length >= minLength;
  };
  const validateProfile = async () => {
    setErrors({});
    let valid = true;
    let Errors = {};

    if (!name) {
        Errors.name = 'Name is required';
        valid = false;
    } else if (!/^[A-Za-z]+( [A-Za-z]+)*$/.test(name)) {
        Errors.name = 'Invalid Name. Only letters and single spaces are allowed.';
        valid = false;
    }

    if (!email) {
        Errors.email = 'Email is required';
        valid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
        Errors.email = 'Invalid email format';
        valid = false;
    }

    if (password && !validatePasswordLength(password)) {
        Errors.password = 'Password must be at least 8 characters long';
        valid = false;
    } else if (password && !/[A-Z]/.test(password)) {
        Errors.password = 'Password must contain at least one uppercase letter';
        valid = false;
    } else if (password && !/[a-z]/.test(password)) {
        Errors.password = 'Password must contain at least one lowercase letter';
        valid = false;
    } else if (password && !/\d/.test(password)) {
        Errors.password = 'Password must contain at least one number';
        valid = false;
    } else if (password && !/[@$!%*?&]/.test(password)) {
        Errors.password = 'Password must contain at least one special character';
        valid = false;
    }

    setErrors(Errors);
    return valid; 
};


    useEffect(() => {
        const loadUserData = async () => {
            try {
                const storedName = await AsyncStorage.getItem('name');
                const storedEmail = await AsyncStorage.getItem('email');
                
                console.log('Retrieved Name:', storedName);
                console.log('Retrieved Email:', storedEmail);
    
                if (storedName) setName(storedName);
                if (storedEmail) setEmail(storedEmail);
            } catch (error) {
                console.error('Error retrieving user data:', error);
            }
        };
        loadUserData();
    }, []);
    
    const handleUpdateProfile = async () => {
        const isValid = await validateProfile(); 
        if (!isValid) {
            return; 
        }
    
        setLoading(true);
    
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post(
                'https://shelterseeker.projectflux.online/api/update',
                { name, email, password: password || undefined },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
    
            Alert.alert('Success', response.data.message);
    
            if (response.data.user) {
                console.log('Updated User Data:', response.data.user);
                await AsyncStorage.setItem('name', response.data.user.name);
                await AsyncStorage.setItem('email', response.data.user.email);
            }
    
            navigation.goBack(); 
    
        } catch (error) {
            console.error('Error updating profile:', error);
            Alert.alert('Error', 'Unable to update profile. Please check your details.');
        } finally {
            setLoading(false);
        }
    };
    
    
    
    return (
        <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
    <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Edit Profile</Text>
      </View>
      <View style={styles.container1}>
      <View >
            <Text style={styles.label}>Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your name"
                placeholderTextColor="#CAD0CF"
                value={name}
                onChangeText={setName}
            />
             {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
             </View>
             <View>
            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#CAD0CF"
                value={email}
                keyboardType="email-address"
                onChangeText={setEmail}
            />
             {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
             </View>
             <View>
            <Text style={styles.label}>Password (optional)</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter a new password"
                placeholderTextColor="#CAD0CF"
                value={password}
                secureTextEntry={!isPasswordVisible}
                onChangeText={setPassword}
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.icon}>
              <Icon name={isPasswordVisible ? "eye-off" : "eye"} size={24} color="#CAD0CF" />
            </TouchableOpacity>
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            </View>
            </View>
            <View style={styles.editButton}>
           <TouchableOpacity
           style={[styles.button, loading && styles.buttonDisabled]}
           onPress={handleUpdateProfile}
           disabled={loading}
         >
           {loading ? (
             <ActivityIndicator size="small" color="#191645" />
           ) : (
             <Text style={styles.buttonText}>Update Profile</Text>
           )}
         </TouchableOpacity>
         </View>
         </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#191645',
        paddingVertical: 20,
        paddingHorizontal: 15,
      },
      headerText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
      },
      inputText:{
        color:'#191645',
        fontSize: 18,
        backgroundColor: '#FFFFFF',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 10,
        width: 300,
        height: 80,
        marginBottom:28,
        padding: 3,
      },
    label: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 10,
        color:'black',
        top:50,
    },
    input: {
        borderWidth: 1,
        borderColor: '#43CBAC',
        padding: 8,
        borderRadius: 4,
        color:'black',
        borderWidth:2,
        fontSize:16,
        marginBottom:15,
        width:300,
        top:40,
        backgroundColor:'white'
    },
    editButton:
    {
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        marginTop:50,
        backgroundColor: '#191645',
        padding: 10,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        height:50,
        width:150
      },
      buttonDisabled: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)', 
      },
      buttonText: {
        color: '#fff',
        fontSize: 17,
      },
      errorText:
      {
        color:'red',
        left:4,
        position:'absolute',
        top:136,
        width:300,
      },
      icon: {
        position: 'absolute',
        right: 10,
        padding: 5,
        margin: 5,
        top:90,
      },
    container1:
    {
      height: 400,
      width:350,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'center',
      borderRadius: 10,
      margin: 10,

    },
});

export default EditProfileScreen;
