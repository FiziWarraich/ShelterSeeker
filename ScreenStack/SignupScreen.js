import React, { useState,useEffect } from 'react';
import { Text, View, Button, StyleSheet, TextInput, TouchableOpacity, Image ,Alert,ScrollView,KeyboardAvoidingView,} from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import { Header } from 'react-native/Libraries/NewAppScreen';
import axios from "axios";
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupScreen = ({navigation}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [data, setData] = useState('');
  const [response, setResponse] = useState(null);


  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const validatePasswordLength = (password) => {
    const minLength = 8; 
    return password.length >= minLength;
  };
  const handleRegister =async () => {
    setErrors({});
    let valid = true;
    let Errors = {};
    if(!name)
      {
        Errors.name="Name is required";
        valid=false;
      }else if (!/^[A-Za-z ]+$/.test(name)) {
        Errors.name = 'Invalid Name. Only letters and spaces are allowed.';
        valid = false;
    }
    if(!email)
      {
        Errors.email="Email is required";
        valid=false;
      }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
        Errors.email = 'Invalid email address';
        valid=false;
      }
      if (!password) {
        Errors.password = 'Password is required';
        valid = false;
      } else if (!validatePasswordLength(password)) {
        Errors.password = 'Password must be at least 8 characters long';
        valid = false;
      }else if (!/[A-Z]/.test(password)) Errors.password = 'Password must contain at least one uppercase letter', valid = false;
      else if (!/[a-z]/.test(password)) Errors.password = 'Password must contain at least one lowercase letter', valid = false;
      else if (!/\d/.test(password)) Errors.password = 'Password must contain at least one number', valid = false;
      else if (!/[@$!%*?&]/.test(password)) Errors.password = 'Password must contain at least one special character', valid = false;
    
      if(valid)
        {

          axios({
            method: 'post',
            url: 'https://shelterseeker.projectflux.online/api/Register',
            data: {
             name:name,
             email:email,
             password:password,
            }
          }).then((res)=>{
           console.log("res+++",res)
           Alert.alert('SignUp Successfully');
           navigation.replace('Login');
          }).catch((error)=>{
            console.log("error raised",error)
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
          <Text style={styles.textstyle} >Here's your first step with us!</Text>
          <Image style={styles.image} source={require("../assests/logo.png")} />
        </View>
        <LinearGradient style={styles.main}
    colors={['#191645', '#43CBAC']}
      locations={[0.33, 1.5]}
      useAngle={true}
      angle={180}>
        
          <View>
            <Text style={styles.userName}>User Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="User name"
              placeholderTextColor="#CAD0CF"
              selectionColor={"#191645"}
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={(text) => setName(text)}
              value={name}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          </View>
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
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          </View>

          <View style={styles.buttonText} titleStyle={{
            color: '#191645',
            fontSize: 30,
            fontStyle: 'italic',
          }}>
            <TouchableOpacity style={styles.button} onPress={() => handleRegister()} >
              <Text style={styles.buttonText} >Sign Up</Text>
            </TouchableOpacity>
          </View>
          
        </LinearGradient>
        <View>

        </View>
        <Text style={{ fontSize: 16, alignSelf: 'center', color: "#191645" }}>OR</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
          <Text style={styles.footer}>Already have an account?<Text style={styles.footerText}> Sign in</Text>
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
      backgroundColor:'transparent',
    },
    header:
    {
      display: 'flex',
      flexDirection: 'row',
      position: 'center',
      height: 150,
    },
    textstyle:
    {
      fontSize: 30,
      color: '#191645',
      width: 150,
      alignSelf: "flex-end",
      marginLeft: 10,
      justifyContent: "flex-end",
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
      height: 400,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'center',
      borderRadius: 10,
      margin: 10,

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
      marginTop: 10,
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
      color:'#191645'
    },
    footerText:
    {
      color: '#43CBAC',
      fontSize: 16,
      fontWeight: 'bold',
    }
  });



export default SignupScreen;
