import React from "react";
import{View,Text, StyleSheet}from "react-native";
import GoogleMapView from "../Components/GoogleMapView";
const FavouriteScreen=({navigation})=>
{
    return(
        <View style={styles.container}>
        <GoogleMapView/>
        </View>
    )
};
const styles=StyleSheet.create
({
container:
{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
}
    
});
export default FavouriteScreen;