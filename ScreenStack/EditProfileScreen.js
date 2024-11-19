import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet,TouchableOpacity ,ActivityIndicator} from 'react-native';
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

    // Retrieve the token for authentication and fetch user data
   
  

    useEffect(() => {
        const loadUserData = async () => {
            const storedName = await AsyncStorage.getItem('name');
            const storedEmail = await AsyncStorage.getItem('email');
            if (storedName) setName(storedName);
            if (storedEmail) setEmail(storedEmail);
        };
        loadUserData();
    }, []);
    const handleUpdateProfile = async () => {
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
                await AsyncStorage.setItem('name', response.data.user.name);
                await AsyncStorage.setItem('email', response.data.user.email);
            }
           console.log( response.data.user.name);
            navigation.goBack(); // Navigate back to ProfileScreen
    
        } catch (error) {
            console.error('Error updating profile:', error);
            Alert.alert('Error', 'Unable to update profile. Please check your details.');
        } finally {
            setLoading(false);
        }
    };
    
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Edit Profile</Text>
      </View>
      <View style={styles.inputText}>
            <Text style={styles.label}>Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
            />
            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your email"
                value={email}
                keyboardType="email-address"
                onChangeText={setEmail}
            />
            <Text style={styles.label}>Password (optional)</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter a new password"
                value={password}
                secureTextEntry
                onChangeText={setPassword}
            />
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
        </View>
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
        top:70,
        padding:20
      },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        color:'black'
    },
    input: {
        borderWidth: 1,
        borderColor: '#43CBAC',
        padding: 8,
        borderRadius: 4,
        color:'black',
        borderWidth:2
    },
    editButton:
    {
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        marginTop:100,
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
});

export default EditProfileScreen;
