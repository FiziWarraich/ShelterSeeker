
import React from "react";
import { View, Text, StyleSheet, Image, FlatList,TouchableOpacity ,Linking} from "react-native";



const ApplyLoanScreen = ({ navigation }) => {
  const hbl='https://www.hbl.com/personal/loans/apply-for-personal-loan';
  const Albarakah='https://www.albaraka.com.pk/page/home-finance-calculator/';
  const mcb='https://www.mcb.com.pk/personal/consumer-loans/mcb-home-loan';
  const alfalah='https://www.bankalfalah.com/personal-banking/loans/alfalah-home-finance/alfalah-ghar-asaan/';
  const islamibank='https://bankislami.com.pk/muskun-home-financing/';
  const allied='https://www.abl.com/personal/loans/';
  const openUrl = async (url) => {
    const isSupported = await Linking.canOpenURL(url);
    if (isSupported) {
        await Linking.openURL(url);
    } else {
        Alert.alert(`Don't know how to open this url: ${url}`);
    }
}
 
  return (
    <View >
        <View style={styles.header}>
          <Image style={{height:45,width:45,right:20,position:'absolute',top:15}} source={require('../assests/smartphone.png')}/>
          
         <Text style={styles.headerText}>Apply for Loan</Text>
        
        </View>
        
        <View style={styles.row}>
        <Image style={{height:80,width:80,marginLeft:10 ,borderRadius:10}} source={require('../assests/hbl.png')}/>
        <View style={{width:'50%'}}>
          <Text style={styles.textfield} >HBL</Text>
          
          </View>
          <TouchableOpacity style={{ height: 35, width: 100, backgroundColor: '#191645', borderRadius: 30, justifyContent: 'center',right:15 }} onPress={() => {
                 openUrl(hbl)
                }} >
          <Text style={{
                        fontSize: 16, color: '#FFFFFF',alignSelf:'center',
                      }}>Press Here</Text>
          </TouchableOpacity>
        </View>
        
        
        <View style={styles.row}>
        <Image style={{height:80,width:80,marginLeft:10,borderRadius:10}} source={require('../assests/albarakah.png')}/>
        <View style={{width:'50%'}}>
          <Text style={styles.textfield} >Al Barakah</Text>
          
          </View>
          <TouchableOpacity style={{ height: 35, width: 100, backgroundColor: '#191645', borderRadius: 30, justifyContent: 'center',right:15 }} onPress={() => {
                openUrl(Albarakah)
                }} >
          <Text style={{
                        fontSize: 16, color: '#FFFFFF',alignSelf:'center',
                      }}>Press Here</Text>
          </TouchableOpacity>
        </View>
         
        <View style={styles.row}>
        <Image style={{height:80,width:80,marginLeft:10,borderRadius:10}} source={require('../assests/mcb.jpeg')}/>
        <View style={{width:'50%'}}>
          <Text style={styles.textfield} >MCB</Text>
          
          </View>
          <TouchableOpacity style={{ height: 35, width: 100, backgroundColor: '#191645', borderRadius: 30, justifyContent: 'center',right:15 }} onPress={() => {
               openUrl(mcb)
                }} >
          <Text style={{
                        fontSize: 16, color: '#FFFFFF',alignSelf:'center',
                      }}>Press Here</Text>
          </TouchableOpacity>
        </View>
         
        <View style={styles.row}>
        <Image style={{height:80,width:80,marginLeft:10,borderRadius:10}} source={require('../assests/alfalah.jpeg')}/>
        <View style={{width:'50%'}}>
          <Text style={styles.textfield} >Alfalah Bank</Text>
          
          </View>
          <TouchableOpacity style={{ height: 35, width: 100, backgroundColor: '#191645', borderRadius: 30, justifyContent: 'center',right:15 }} onPress={() => {
                 openUrl(alfalah)
                }} >
          <Text style={{
                        fontSize: 16, color: '#FFFFFF',alignSelf:'center',
                      }}>Press Here</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
        <Image style={{height:80,width:80,marginLeft:10,borderRadius:10}} source={require('../assests/islami.jpeg')}/>
        <View style={{width:'50%'}}>
          <Text style={styles.textfield} >Bank Islami</Text>   
          </View>
          <TouchableOpacity style={{ height: 35, width: 100, backgroundColor: '#191645', borderRadius: 30, justifyContent: 'center',right:15 }} onPress={() => {
                 openUrl(islamibank)
                }} >
          <Text style={{
                        fontSize: 16, color: '#FFFFFF',alignSelf:'center',
                      }}>Press Here</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
        <Image style={{height:80,width:80,marginLeft:10,borderRadius:10}} source={require('../assests/allied.jpeg')}/>
        <View style={{width:'50%'}}>
          <Text style={styles.textfield} >Allied Bank</Text>
          
          </View>
          <TouchableOpacity style={{ height: 35, width: 100, backgroundColor: '#191645', borderRadius: 30, justifyContent: 'center',right:15 }} onPress={() => {
               openUrl(allied)
                }} >
          <Text style={{
                        fontSize: 16, color: '#FFFFFF',alignSelf:'center',
                      }}>Press Here</Text>
          </TouchableOpacity>
        </View>
        </View>
  );
}
const styles = StyleSheet.create
  ({

    header:
    {
      height: 80,
      backgroundColor: '#191645',
      marginBottom:5,
      alignContent:'center',
      alignItems:'center'
    },
    headerText:
    {
      color: '#FFFFFF',
      fontSize: 24,
      fontWeight: 'bold',
      fontFamily: '',
      position: 'absolute',
      top: 20,
      alignSelf: 'center'
    },
    row:
    {
      
      height:80,
      borderTopWidth:0.5,
      borderBottomWidth:0.5,
      borderColor:'black',
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      marginTop:10,
      backgroundColor:'#FFFFFF',
      elevation:5,
      shadowColor:'black'

    },
    
    textfield:
    {
     color:'black',
     alignSelf:'flex-start',
     fontSize:16,
     fontWeight: '600',
     marginLeft:8
    },
  });
export default ApplyLoanScreen;