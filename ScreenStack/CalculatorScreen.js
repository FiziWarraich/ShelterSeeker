import React,{useState} from "react";
import{View,Text, StyleSheet,TextInput,TouchableOpacity, Modal,Image}from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const CalculatorScreen=({navigation,route})=>
{
  const { property } = route.params;
  const [showModal,setshowModal]=useState(false)
 const [salary, setSalary] = useState();
 const [years, setYears] = useState();
  const [propertyPrice, setPropertyPrice] = useState();
  const [MonthlyInvestment, setMonthlyInvestment] = useState("");
 

  const calculateYears = () => {
    
    const totalYears = parseFloat(years);
    const totalInvestmentNeeded = parseFloat(property.price);
    const yearlyInvestment = totalInvestmentNeeded / totalYears;
    const monthlyInvestment = yearlyInvestment /12;
    setMonthlyInvestment(monthlyInvestment.toFixed(2));;
  };
    return(
        <View style={styles.container}>
          <View style={{backgroundColor:'#191645',height:70,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
          <MaterialCommunityIcons name="calculator" size={30} color={"#FFFFFF"} style={styles.calicon}/> 
          <Text style={styles.caltext}>Calculator</Text>
          </View>
         
         <View style={styles.main}>
          <View>
            <Text style={styles.userName}>Salary</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              placeholderTextColor="black"
              selectionColor={'#191645'}
              value={salary}
              onChangeText={(text)=>setSalary(text)}
               autoCapitalize='none'
              autoCorrect={false}
            />

          </View>
          <View>
            <Text style={styles.userName}>Years</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              placeholderTextColor="#CAD0CF"
              selectionColor={'#191645'}
              value={years}
             onChangeText={(text)=>setYears(text)}
              autoCapitalize='none'
              autoCorrect={false}
            />
            
        
          </View>
          <View>
            <Text style={styles.userName}>Property Price</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              placeholder={property.price}
              selectionColor={'#191645'}
              placeholderTextColor="#191645"
              value={propertyPrice}
              onChangeText={(text)=>setPropertyPrice(text)}
              autoCapitalize='none'
              autoCorrect={false}
            />
          </View>
        
          <View style={styles.buttonText} >
            <TouchableOpacity style={styles.button}  onPress={()=>setshowModal(calculateYears)}   >
              <Text style={styles.buttonText} >Calculate</Text>
            </TouchableOpacity>
            <Modal transparent={true}
            visible={showModal}
            animationType="slide">
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
              <View style={{backgroundColor:'#D4D4D4', height:200,width:200,borderRadius:10}}>
              {MonthlyInvestment !== null && (
        <Text style={styles.Modaltext}>
          You need {MonthlyInvestment} monthly Investment to buy the property.
        </Text>
      )}
      <Image style={{height:80,width:80,resizeMode:'cover',position:'absolute',top:-50,alignSelf:'center'}} source={require("../assests/investment.png")} />
       <TouchableOpacity style={{borderRadius:5,top:70,left:130,borderWidth:1,height:30,width:50}}
        onPress={()=>setshowModal(false)}    >
              <Text style={{color:'black',fontSize:16,alignSelf:'center'}} >Ok</Text>
            </TouchableOpacity>
              </View>
            </View>
          </Modal>
            
          </View>
         
    
          </View>
        </View>
    )
};
const styles=StyleSheet.create
({
container:
{
      flex:1,
      width:'100%',
      height:'100%',
      overflow:'hidden',
      backgroundColor: '#FFFFFF',
},
caltext:
{
    fontWeight:'bold',
    fontSize:28,
    color:'#FFFFFF',
    alignSelf:'center',
},
calicon:
{
  right:20,
  position:'absolute'
},
main:
{
  height: 400,
  flex:1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'center',
  borderTopWidth:2,
  borderBottomWidth:2,
 
},
userName:
{
  color: '#191645',
  fontWeight: '500',
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
  backgroundColor: '#43CBAC',
  borderWidth: 1.5,
  borderColor: '#191645',
  borderRadius: 20,
  width: 300,
  height: 50,
  margin: 20,
  padding: 5,
},

button:
{
  backgroundColor: '#191645',
  padding: 10,
  borderRadius: 50,
  marginTop: 20,
  alignItems: 'center',
  justifyContent:'center'
},
buttonText: {
  color: 'white', // White text color
  fontSize: 20,
  fontWeight: 'bold',
  textAlign:'center',
  width: 150,
},
Modaltext:
{
  color:'black',
  fontSize:18,
  top:50,
  padding:10,
  shadowColor:'#FFFFFF',
  elevation:10
}
    
});
export default CalculatorScreen;