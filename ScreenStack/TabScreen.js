import React, { Children,useState } from "react";
import {View,Text,TouchableOpacity}from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from "./HomeScreen";
import SearchScreen from "./SearchScreen";
import FavouriteScreen from "./FavouriteScreen";
import ProfileScreen from "./ProfileScreen";
import ApplyLoanScreen from "./ApplyLoanScreen";



const Tab=createBottomTabNavigator();

const CustomTabBarButton=({children,onPress})=>
(
    <TouchableOpacity
   style={{
    top:-30,
    justifyContent:'center',
    alignItems:'center',
   }} onPress={onPress}>
    <View style={{
        width:70,
        height:70,
        borderRadius:35,
        backgroundColor:"#43CBAC",
    }}>
        {children}
    </View>
    </TouchableOpacity>
)

const Tabs=({navigation})=>{
  
return(
    <Tab.Navigator  screenOptions={{headerShown:false,tabBarShowLabel:false}}>
     <Tab.Screen name='Home' component={HomeScreen}
      options={{tabBarIcon:({focused})=>{
        return(
        <View style={{alignItems:'center',justifyContent:'center'}} >
            <Icon name="home" size={24} color={focused?"#43CBAC":"#b4b4b4"}></Icon>
            <Text style={{color:focused ? "#43CBAC":"#b4b4b4",fontSize:13}}>Home</Text> 
        </View>
        );
      }
      }}/>
     <Tab.Screen name='Loan' component={ApplyLoanScreen}
     options={{tabBarIcon:({focused})=>{
        return(
        <View style={{alignItems:'center',justifyContent:'center'}} >
            <MaterialCommunityIcons name="bank" size={24} color={focused?"#43CBAC":"#b4b4b4"}/>
            <Text style={{color:focused ? "#43CBAC":"#b4b4b4",fontSize:13,width:90}}>Apply for Loan</Text> 
        </View>
        );
      }
      }}/>
     <Tab.Screen name='Search' component={SearchScreen}  
     options={{tabBarIcon:()=>{
        return(
        <View style={{alignItems:'center',justifyContent:'center'}} >
            <Icon name="search" size={24} color='#ffffff'></Icon> 
        </View>
        );
      },
      tabBarButton:(props)=>(
        <CustomTabBarButton{...props}/>
      )

      }}/>
      
        <Tab.Screen name='Favourite' component={FavouriteScreen}
        options={{tabBarIcon:({focused})=>{
           return(
           <View style={{alignItems:'center',justifyContent:'center'}} >
               <Icon name="heart-o" size={24} color={focused?"#43CBAC":"#b4b4b4"}></Icon>
               <Text style={{color:focused ? "#43CBAC":"#b4b4b4",fontSize:13}}>Favourite</Text> 
           </View>
           );
         }
         }}/>
      
       
       
     <Tab.Screen name='Profile' component={ProfileScreen}
     options={{tabBarIcon:({focused})=>{
        return(
        <View style={{alignItems:'center',justifyContent:'center'}} >
            <Icon name="user-circle-o" size={24} color={focused?"#43CBAC":"#b4b4b4"}></Icon>
            <Text style={{color:focused ? "#43CBAC":"#b4b4b4",fontSize:13}}>Profile</Text> 
        </View>
        );
      }
      }}/>
    </Tab.Navigator>
);
}
export default Tabs;