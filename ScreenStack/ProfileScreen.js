import React ,{useState,useEffect,useCallback} from "react";
import { View, Text, StyleSheet, TouchableOpacity,Modal,Image,TextInput ,Alert} from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'
import FeedbackView from "../Components/FeedbackView";

const ProfileScreen = ({ navigation }) => {
  const [showModal,setshowModal]=useState(false)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  async function getData() {
    try{
      const LoggedIn= await AsyncStorage.getItem('isLoggedIn');
      const storedName = await AsyncStorage.getItem('name');
      const storedEmail = await AsyncStorage.getItem('email');
      if (LoggedIn === 'true') {
      setIsLoggedIn(true);
      setName(storedName || '');
      setEmail(storedEmail || '');

    }
  }catch (error) {
    console.error('Error checking login status:', error);
    console.error('Error fetching profile data:', error);
  }
  }
  useFocusEffect(
    useCallback(() => {
         getData();
    }, [])
);


  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('isLoggedIn');
      await AsyncStorage.removeItem('email');
      setIsLoggedIn(false);
      setName('');
      navigation.replace('Login'); // Navigate back to login screen
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
      <Text style={styles.profileText}>Profile</Text>
      <MaterialCommunityIcons name="account" size={30} color={"#FFFFFF"} style={styles.profileicon}/>
      </View>
      
      <View style={styles.header}>
      {isLoggedIn?(
       <View style={styles.loginnamebox}>
        <Text style={styles.loginnameText}>{name}</Text>
         </View> 
      ):(
        <View>
          <Text style={styles.loginText}>Log in </Text>
        <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
        <Text style={styles.loginaccountText}>Log in to your account</Text>
      </TouchableOpacity>
        </View>
        
      )
    }
        <View style={styles.box}>
        <Image style={styles.image} source={require("../assests/profile.jpg")} />
        </View>
      </View>
      <TouchableOpacity style={styles.editbutton} onPress={()=>navigation.navigate('EditProfile')}>
        <Text style={styles.edittext}>Edit Profile</Text>
    </TouchableOpacity>
       <FeedbackView showModal={showModal} setshowModal={setshowModal} />
       
         <TouchableOpacity onPress={()=>{navigation.navigate('Terms')}}>
        <View style={styles.row}>
        <Ionicons name="newspaper-outline" size={25} color='#43CBAC' style={styles.rowicon}></Ionicons>
        <MaterialCommunityIcons name="greater-than" size={15} color='black' style={styles.rowicon2}></MaterialCommunityIcons>
          <Text style={styles.textfield} >Terms and policy</Text>
        </View>
         </TouchableOpacity>
       
       {isLoggedIn?(
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.btntext1}>Log out</Text>
    </TouchableOpacity>
       ):(
<TouchableOpacity style={styles.button2} onPress={()=>navigation.navigate('Login')}>
          <Text style={styles.btntext2}>Log in</Text>
      </TouchableOpacity>
       )
      } 
      
      
      
      

    </View>
  )
};
const styles = StyleSheet.create
  ({
    container:
    {
      flex: 1,
      backgroundColor: '#FFFFFF',
      borderBottomWidth:2,
      borderColor: '#43CBAC',
    },
    profile:
    {
      flexDirection:'row',
      height:70,
      width:'100%',
      alignItems:'center',
      borderBottomWidth:1.5,
      marginBottom: 20,
      backgroundColor:'#191645',
      justifyContent:'center',
      alignContent:'center'
    },
    iconback:
    {
     color:'#FFFFFF',
     marginLeft:-110
    },
    header:
    {
      
      height: 150,
      display: 'flex',
      top: 30,
    },
    profileText: {
     
      fontSize: 30,
      fontWeight: '500',
      color: '#FFFFFF',
      alignSelf:'center'
    },
    profileicon:
    {
      right:25,
      position:'absolute'
    },
    loginText: {
      fontSize: 16,
      fontWeight: '500',
      left: 20,
      color: 'black',
    },
    loginnamebox:
    {
      alignContent:'center',
      alignItems:'center'
    },
    loginnameText: {
      top:85,
      fontSize: 30,
      fontWeight: 'bold',
      color: 'black',
      
    },
    loginaccountText: {
      fontSize: 14,
      left: 20,
      fontWeight: '500',
      color: '#43CBAC',
    },
     box: {
      height: 65,  
      width: 80, 
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        
    },
    image: {
      
      height: 100, 
      width: 100,  
      resizeMode: 'cover', 
      left:140
  },
  editbutton:
  {
   height:35,
   width:110,
   borderRadius:20,
   marginBottom:12,
   marginTop:10,
   justifyContent:'center',
   alignItems:'center',
   alignSelf:'center',
   backgroundColor:'#43CBAC',
  },
  edittext:
    {
     
      
      color:'#FFFFFF',
      fontSize:15,
      fontWeight:'400',
      
    },
    row:
    {
      
      height:50,
      borderTopWidth:1,
      borderColor:'#d4d4d4',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      marginTop:10
    },
    rowicon:
    {
    position:'absolute',
    left:12,
    alignSelf:'center'
    },
    rowicon2:
    {
    position:'absolute',
    right:12,
    alignSelf:'center'
    },
    textfield:
    {
     color:'black',
     alignSelf:'flex-start',
     left:50
    },
    button:
    {
     height:40,
     width:300,
     borderRadius:20,
     marginBottom:12,
     marginTop:50,
     justifyContent:'center',
     alignItems:'center',
     alignSelf:'center',
     backgroundColor:'red',
    },
    btntext1:
    {
     
      
      color:'#FFFFFF',
      fontSize:18,
      fontWeight:'bold',
      
    },
    button2:
    {
      height:40,
      width:300,
      borderRadius:20,
      marginBottom:12,
      marginTop:50,
      justifyContent:'center',
      alignItems:'center',
      alignSelf:'center',
      backgroundColor:'#191645', 
    },
    btntext2:
    {
      color:'#FFFFFF',
      fontSize:18,
      fontWeight:'bold'
    },
    Modaltext:
    {
      color:'black',
      fontSize:18,
      fontWeight:'600',
      top:100,
      alignSelf:'center',
      padding:10,
      shadowColor:'#FFFFFF',
      elevation:10,
      left:15
    },
    textInput:
    {
      color:'black',
      height:100,
      width:270,
      borderRadius:10,
      borderWidth:1,
      borderColor:'#191645',
      margin:10,
      fontSize:18,
      top:50
    }

  });
export default ProfileScreen;