import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';


const SplashScreen = ({navigation}) => {
  
    //<LinearGradient className="flex-1 justify-center items-center" colors={['#43CBAC', '#191645']}
    //locations={[0.43, 0.65]}
   // useAngle={true}
    //angle={180}>
    setTimeout(()=>
    {
navigation.replace('Tab');
    },3000);
    return (
    <View style={styles.container}>
      <Image
        source={require('../assests/logo.png')}/>
    </View>
    //</LinearGradient>
  );
}
const styles=StyleSheet.create
({
    container:
    {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
})

export default SplashScreen;