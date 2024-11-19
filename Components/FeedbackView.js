import React,{useState} from 'react'
import { StyleSheet, Text, View,Modal,TouchableOpacity,Image,TextInput,Alert } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
const FeedbackView = () => {
  console.log(navigation);
  const navigation = useNavigation(); 
  const [feedback,setFeedback]=useState(false)
  const [showModal,setshowModal]=useState(false)
  const [showmodal1,setshowmodal1]=useState(false)

  const handleFeedbackSubmit = () => {
    if (feedback) {
    console.log('Feedback submitted:', feedback);
    Alert.alert('Feedback Submitted', 'Thank you for your feedback!'); 
    navigation.replace('Tab')
    setFeedback('');
    setshowModal(false);
    
    }
  };
  return (
    <View>
        <TouchableOpacity onPress={()=>setshowModal(true)}>
        <View style={styles.row}>
        <AntDesign name="like2" size={25} color='#43CBAC' style={styles.rowicon}></AntDesign>
        <MaterialCommunityIcons name="greater-than" size={15} color='black' style={styles.rowicon2}></MaterialCommunityIcons>
          <Text style={styles.textfield} >FeedBack</Text>
        </View>
         </TouchableOpacity>
       <Modal transparent={true}
            visible={showModal}
            animationType="slide">
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
              <View style={{backgroundColor:'#D4D4D4', height:200,width:300,borderRadius:10}}>
              
        <Text style={{alignSelf:'center',fontWeight:'bold',fontSize:24,color:'black'}}>
          FeedBack
        </Text>
      
      <TouchableOpacity onPress={()=>setshowModal(false)}> 
      <Image style={{height:40,width:40,resizeMode:'cover',position:'absolute',right:10,bottom:-10}} source={require("../assests/close.png")} />
      </TouchableOpacity>
          <View style={{flexDirection:'row' }}>
          <TouchableOpacity onPress={()=>setshowmodal1(true)} >
              <Image style={{height:70,top:30,width:70,resizeMode:'cover',position:'absolute',left:30}} source={require("../assests/happy.png")} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setshowmodal1(true)} >
              <Image style={{height:70,top:30,width:70,resizeMode:'cover',position:'absolute',left:115}} source={require("../assests/smile.png")} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setshowmodal1(true)} >
              <Image style={{height:70,top:30,width:70,resizeMode:'cover',position:'absolute',left:200}} source={require("../assests/sad.png")} />
            </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row' }}>
              <Text style={styles.Modaltext}>Very Good</Text>
              <Text style={styles.Modaltext}>It's Ok</Text>
              <Text style={styles.Modaltext}>Very Bad</Text>
            </View>
              </View>
            </View>
            
          </Modal>
          <Modal transparent={true}
            visible={showmodal1}
            animationType="slide">
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
              <View style={{backgroundColor:'#D4D4D4', height:300,width:300,borderRadius:10}}>
              <TouchableOpacity onPress={()=>setshowmodal1(false)}> 
      <Image style={{height:40,width:40,resizeMode:'cover',position:'absolute',right:10,top:5}} source={require("../assests/close.png")} />
      </TouchableOpacity>
        <Text style={{left:10,fontWeight:'500',fontSize:20,color:'black',top:20}}>
          We value your FeedBack
        </Text>
        <TextInput
            style={styles.textInput}
            placeholder="Enter your feedback"
            placeholderTextColor='black'
            value={feedback}
            onChangeText={(text)=>setFeedback(text)}
          />
          <TouchableOpacity style={{borderRadius:5,top:100,left:100,borderWidth:1,height:40,width:100,justifyContent:'center',backgroundColor:'#191645'}}
          onPress={handleFeedbackSubmit} 
       >
              <Text style={{color:'#FFFFFF',fontSize:20,alignSelf:'center'}} >Submit</Text>
            </TouchableOpacity>
              </View>
            </View>
            
          </Modal>
    </View>
  )
}
const styles = StyleSheet.create
  ({
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
    Modaltext:
    {
      color: 'black',
      fontSize: 18,
      fontWeight: '600',
      top: 100,
      alignSelf: 'center',
      padding: 10,
      shadowColor: '#FFFFFF',
      elevation: 10,
      left: 18
    },
    textInput:
    {
      color: 'black',
      height: 100,
      width: 270,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#191645',
      margin: 10,
      fontSize: 18,
      top: 50
    },
    closeButton: {
      marginTop: 20,
      alignSelf: 'center',
      padding: 10,
      backgroundColor: '#191645',
      borderRadius: 5,
    },
    closeButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    }
  });
export default FeedbackView

