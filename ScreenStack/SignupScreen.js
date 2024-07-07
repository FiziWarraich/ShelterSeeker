/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { Text, View, Button, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import { Header } from 'react-native/Libraries/NewAppScreen';
import LinearGradient from 'react-native-linear-gradient';

const SignupScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [display, setDisplay] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const handleRegister = () => {
    // Handle registration logic here
    console.log("Registering user:", { name, email, password });
  };
  const clearData = () => {
    setDisplay(false);
    setName("");
    setPassword("");
    setEmail("");
  }

  return (
    <LinearGradient style={styles.container}
    colors={['#191645', '#43CBAC']}
      locations={[0.33, 1.5]}
      useAngle={true}
      angle={180}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.textstyle} >Here's your first step with us!</Text>
          <Image style={styles.image} source={require("./assest/images.png")} />
        </View>
        <View style={styles.main}>
          <View>
            <Text style={styles.userName}>User Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="User name"
              placeholderTextColor="#CAD0CF"
              selectionColor={"#191645"}
              onChangeText={(text) => setName(text)}
              value={name}
            />
          </View>
          <View>
            <Text style={styles.userName}>Email</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Email Address"
              placeholderTextColor="#CAD0CF"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
          </View>
          <View>
            <Text style={styles.userName}>Password</Text>
            <TextInput
              style={styles.textInput}
              placeholder=" Password"
              placeholderTextColor="#CAD0CF"
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={!isPasswordVisible}
              value={password}
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.icon}>
              <Icon name={isPasswordVisible ? "eye-off" : "eye"} size={24} color="#CAD0CF" />
            </TouchableOpacity>
          </View>

          <View style={styles.buttonText} titleStyle={{
            color: '#191645',
            fontSize: 30,
            fontStyle: 'italic',
          }}>
            <TouchableOpacity style={styles.button} onPress={() => setDisplay(true)} >
              <Text style={styles.buttonText} >Sign Up</Text>
            </TouchableOpacity>
          </View>
          <View style={{ fontsize: 18, margin: 10, }}>
            <Button title='Clear' onPress={clearData} color={'red'} />
          </View>
        </View>
        <View>
          <View>
            {
              display ?
                <View>
                  <Text style={{ fontSize: 18 }}>Enter your name:{name}</Text>
                  <Text style={{ fontSize: 18 }}>Enter your password:{password}</Text>
                  <Text style={{ fontSize: 18 }}>Enter your email:{email}</Text>
                </View>
                : null
            }
          </View>
        </View>
        <Text style={{ fontSize: 16, alignSelf: 'center', color: "#191645" }}>OR</Text>
        <TouchableOpacity>
          <Text style={styles.footer}>Already have an account?<Text style={styles.footerText}> Sign in</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
const styles = StyleSheet.create
  ({
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
      height: 200,
    },
    textstyle:
    {
      fontSize: 30,
      color: 'white',
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
      margin: 30,

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
    footerText:
    {
      color: '#191645',
      fontSize: 16,
      fontWeight: 'bold',
    }
  });



export default SignupScreen;
