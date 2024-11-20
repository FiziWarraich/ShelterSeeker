import React, { useState } from 'react';
import { Text, View, Button, StyleSheet, TextInput, TouchableOpacity, Image,Alert,KeyboardAvoidingView,Keyboard,TouchableWithoutFeedback,ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const validatePasswordLength = (password) => {
    const minLength = 6; 
    return password.length >= minLength;
  };
  const handleRegister = async() => {
    setErrors({});
    let valid = true;
    let Errors = {};
    if(!email)
      {
        Errors.email="Email is required";
        valid=false;
      }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
        Errors.email = 'Invalid email format';
        valid=false;
      }
      if (!password) {
        Errors.password = 'Password is required';
        valid = false;
      } else if (!validatePasswordLength(password)) {
        Errors.password = 'Password must be at least 6 characters long';
        valid = false;
      }else if (!/[A-Z]/.test(password)) Errors.password = 'Password must contain at least one uppercase letter', valid = false;
      else if (!/[a-z]/.test(password)) Errors.password = 'Password must contain at least one lowercase letter', valid = false;
      else if (!/\d/.test(password)) Errors.password = 'Password must contain at least one number', valid = false;
      else if (!/[@$!%*?&]/.test(password)) Errors.password = 'Password must contain at least one special character', valid = false;
    
      if(valid)
        {

          axios({
            method: 'post',
            url: 'https://shelterseeker.projectflux.online/api/Login',
            data: {
              name:name,
             email:email,
             password:password,
            }
          }).then((res)=>{
           console.log("res+++",res.data)
           const token = res.data.access_token; 
            const name = res.data.user.name;

            if (name && token) {
                
                 AsyncStorage.setItem('token', token);
                 AsyncStorage.setItem('name', name);
                console.log(name);
                Alert.alert('Login Successfully');
                 AsyncStorage.setItem('isLoggedIn', 'true');
                navigation.replace('Tab');
            } else {
                Alert.alert('Login Error', 'Name or token not found in the response.');
            }
          
          }).catch((error)=>{
            if (error.response && error.response.status === 401) {
              Alert.alert('Invalid Credentials', 'The email or password is incorrect. Please try again.');
            } else {
            console.log("error raised",error)
            Alert.alert('Login Error', 'Something went wrong. Please try again later.');
          }
          });
        } else {
          // Set errors
          setErrors(Errors);
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
          <Text style={styles.textstyle} >Already have an account!</Text>
          <Image style={styles.image} source={require("../assests/logo.png")} />
        </View>
        <LinearGradient style={styles.main}
    colors={['#191645', '#43CBAC']}
      locations={[0.33, 1.5]}
      useAngle={true}
      angle={180}>
          <View>
            <Text style={styles.userName}>Email</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Email Address"
              placeholderTextColor="#CAD0CF"
               autoCapitalize='none'
              autoCorrect={false}
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
           {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </View>
          <View>
            <Text style={styles.userName}>Password</Text>
            <TextInput
              style={styles.textInput}
              placeholder=" Password"
              placeholderTextColor="#CAD0CF"
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={!isPasswordVisible}
              value={password}
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.icon}>
              <Icon name={isPasswordVisible ? "eye-off" : "eye"} size={24} color="#CAD0CF" />
            </TouchableOpacity>
            {errors.password && <Text style={[styles.errorText]}>{errors.password}</Text>}
        
          </View>

          <View style={styles.buttonText} titleStyle={{
            color: '#191645',
            fontSize: 30,
            fontStyle: 'italic',
          }}>
            <TouchableOpacity style={styles.button} onPress={() => handleRegister()} >
              <Text style={styles.buttonText} >Log In</Text>
            </TouchableOpacity>
          </View>
         
    
          </LinearGradient>
       <Text style={{ fontSize: 16, alignSelf: 'center', color: "#191645", }}>OR</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('Signup')}>
          <Text style={[styles.footer ,styles.Text]}>New User?<Text style={styles.footerText}> Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create
  ({
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    container: {
      flex: 1,
      width:'100%',
      height:'100%',
      overflow:'hidden',
      backgroundColor:'#FFFFFF',
    },
    header:
    {
      display: 'flex',
      flexDirection: 'row',
      position: 'center',
      height: 200,
    },
    textstyle:
    {
      fontSize: 30,
      color: '#191645',
      width: 150,
      alignSelf: 'center',
      marginLeft: 10,
      justifyContent: "center",
      position: "end",
      fontWeight: 'bold',
    },
    image:
    {
      width: 300,
      height: 300,
      position: "relative",
      alignSelf: "center",
      right: 30,

    },
    main:
    {
      height: 350,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'center',
      borderRadius: 10,
      marginHorizontal:10,
      marginBottom: 20,

    },
    userName:
    {
      color: 'white',
      fontWeight: '400',
      textAlign: 'left',
      position: 'absolute',
      fontSize: 18,
      left: '8%',
      lineHeight: 18,
    },
    textInput:
    {
      color:'#191645',
      fontSize: 18,
      backgroundColor: '#FFFFFF',
      borderWidth: 2,
      borderColor: 'white',
      borderRadius: 10,
      width: 300,
      height: 50,
      margin: 25,
      padding: 5,
    },
    errorText:
    {
      color:'red',
      left:34,
      position:'absolute',
      top:80,
      width:300,
    },
    icon: {
      position: 'absolute',
      right: 10,
      padding: 5,
      margin: 30,
    },
    button:
    {
      backgroundColor: '#191645',
      padding: 10,
      borderRadius: 50,
      marginTop: 20,
    },
    buttonText: {
      color: 'white', // White text color
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      width: 300,
    },
    footer:
    {
      alignSelf: 'center',
      marginTop: 10,
      fontSize: 16,
    },
    Text:{
      color:"#191645",
    },
    footerText:
    {
      color: '#43CBAC',
      fontSize: 16,
      fontWeight: 'bold',
    }
  });



export default LoginScreen;
