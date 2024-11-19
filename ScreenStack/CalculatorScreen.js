import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, Image } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CalculatorScreen = ({ navigation, route }) => {
  const { property } = route.params;
  const [showModal, setShowModal] = useState(false);
  const [interestRate, setInterestRate] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [loanDuration, setLoanDuration] = useState('');
  const [propertyPrice, setPropertyPrice] = useState(property.price);
  const [errorMessage, setErrorMessage] = useState('');
  const [monthlyInvestment, setMonthlyInvestment] = useState('');
  const [totalInterest, setTotalInterest] = useState('');
  const [totalPayment, setTotalPayment] = useState('');


  function calculateLoan() {
    // Log the current input values for debugging
    console.log('Property Price:', propertyPrice);
    console.log('Down Payment:', downPayment);
    console.log('Loan Duration:', loanDuration);
    console.log('Interest Rate:', interestRate);
  
    // Check if all fields have been filled and are valid
    if (
      propertyPrice.trim() === "" ||
      downPayment.trim() === "" ||
      loanDuration.trim() === "" ||
      interestRate.trim() === ""
    ) {
      console.log("Error: Empty fields detected");
      setErrorMessage("Please fill in all fields with valid numbers.");
      setShowModal(true);
      return; // Stop further execution if fields are empty
    }
  
    // Convert inputs to numbers
    const price = parseFloat(propertyPrice);
    const downPaymentAmount = parseFloat(downPayment);
    const duration = parseInt(loanDuration);
    const rate = parseFloat(interestRate);
  
    // Debugging: Log parsed values to make sure they're correct
    console.log("Parsed Price:", price);
    console.log("Parsed Down Payment:", downPaymentAmount);
    console.log("Parsed Duration:", duration);
    console.log("Parsed Interest Rate:", rate);
  
    // Validate if inputs are numbers and greater than zero
    if (
      isNaN(price) || price <= 0 ||
      isNaN(downPaymentAmount) || downPaymentAmount <= 0 ||
      isNaN(duration) || duration <= 0 ||
      isNaN(rate) || rate <= 0
    ) {
      console.log("Error: Invalid numbers entered");
      setErrorMessage("Please enter valid positive numbers.");
      setShowModal(true);
      return; // Stop further execution if validation fails
    }
  
    // Calculate principal loan amount (price - down payment)
    const principal = price - downPaymentAmount;
  
    // Convert annual interest rate to monthly and percentage to decimal
    const monthlyInterestRate = (rate / 100) / 12;
  
    // Convert loan duration to months
    const numberOfMonths = duration * 12;
  
    // Calculate the monthly payment using the loan formula
    const monthlyPayment = (principal * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -numberOfMonths));
  
    // Set the calculated monthly investment (rounded to 2 decimal places)
    setMonthlyInvestment(monthlyPayment.toFixed(2));
  
    // Calculate additional amounts (total interest, total payment)
    const totalInterestAmount = (monthlyPayment * numberOfMonths) - principal;
    const totalPaymentAmount = principal + totalInterestAmount;
  
    // Set the total interest and total payment
    setTotalInterest(totalInterestAmount.toFixed(2));
    setTotalPayment(totalPaymentAmount.toFixed(2));
  
    // Clear error message and show the modal after calculation
    setErrorMessage("");
    setShowModal(true);
  }
  


  
  
  


  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: '#191645', height: 70, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <MaterialCommunityIcons name="calculator" size={30} color={"#FFFFFF"} style={styles.calicon} />
        <Text style={styles.caltext}>Calculator</Text>
      </View>

      <View style={styles.main}>
        <View>
          <Text style={styles.userName}>Property Price</Text>
          <TextInput
            style={styles.textInput}
            keyboardType="numeric"
            placeholder={property.price}
            selectionColor={'#191645'}
            placeholderTextColor="#191645"
            value={propertyPrice}
            onChangeText={(text) => setPropertyPrice(text)}
            autoCapitalize='none'
            autoCorrect={false}
          />
        </View>

        <View>
          <Text style={styles.userName}>Interest Rate</Text>
          <TextInput
            style={styles.textInput}
            keyboardType="numeric"
            placeholderTextColor="black"
            selectionColor={'#191645'}
            value={interestRate}
            onChangeText={(text) => setInterestRate(text)}
            autoCapitalize='none'
            autoCorrect={false}
          />
        </View>

        <View>
          <Text style={styles.userName}>Loan Duration (Years)</Text>
          <TextInput
            style={styles.textInput}
            keyboardType="numeric"
            placeholderTextColor="black"
            selectionColor={'#191645'}
            value={loanDuration}
            onChangeText={(text) => setLoanDuration(text)}
            autoCapitalize='none'
            autoCorrect={false}
          />
        </View>

        <View>
          <Text style={styles.userName}>Down Payment</Text>
          <TextInput
            style={styles.textInput}
            keyboardType="numeric"
            placeholderTextColor="#CAD0CF"
            selectionColor={'#191645'}
            value={downPayment}
            onChangeText={(text) => setDownPayment(text)}
            autoCapitalize='none'
            autoCorrect={false}
          />
        </View>

        <View style={styles.buttonText}>
          <TouchableOpacity 
            style={styles.button}  
            onPress={calculateLoan} // Call the function to calculate the loan
          >
            <Text style={styles.buttonText}>Calculate</Text>
          </TouchableOpacity>
        </View>

        {/* Modal to show the result or error message */}
        
        <Modal transparent={true} visible={showModal} animationType="slide">
        <View style={styles.overlay}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: '#D4D4D4', padding: 10, width: 300, borderRadius: 10,height:300 }}>
              {errorMessage ? (
                <Text style={styles.Modaltext}>{errorMessage}</Text>
              ) : (
                <>
                  <Text style={styles.Modaltext}>Monthly Investment: {monthlyInvestment}</Text>
                  <Text style={styles.Modaltext}>Total Interest: {totalInterest}</Text>
                  <Text style={styles.Modaltext}>Total Payment : {totalPayment}</Text>
                </>
              )}
              <Image
                style={{ height: 80, width: 80, resizeMode: 'cover', position: 'absolute', top: -50, alignSelf: 'center' }}
                source={require("../assests/investment.png")}
              />
              <TouchableOpacity
                style={{ borderRadius: 5, top: 80, left: 115, borderWidth: 1, height: 30, width: 50 }}
                onPress={() => setShowModal(false)}
              >
                <Text style={{ color: 'black', fontSize: 16, alignSelf: 'center' }}>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
          </View>
        </Modal>
       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  caltext: {
    fontWeight: 'bold',
    fontSize: 28,
    color: '#FFFFFF',
    alignSelf: 'center',
  },
  calicon: {
    right: 20,
    position: 'absolute',
  },
  main: {
    height: 400,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 2,
    borderBottomWidth: 2,
  },
  userName: {
    color: '#191645',
    fontWeight: '500',
    textAlign: 'left',
    fontSize: 18,
    left: '8%',
    lineHeight: 18,
  },
  textInput: {
    color: '#191645',
    fontSize: 18,
    backgroundColor: '#43CBAC',
    borderWidth: 1.5,
    borderColor: '#191645',
    borderRadius: 10,
    width: 300,
    height: 50,
    margin: 20,
    padding: 5,
  },
  button: {
    backgroundColor: '#191645',
    padding: 10,
    borderRadius: 50,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    width: 150,
  },
  Modaltext: {
    color: 'black',
    fontSize: 18,
    top: 50,
    padding: 10,
    shadowColor: '#FFFFFF',
    
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.70)', // Semi-transparent black
    zIndex: 1,
  },
});

export default CalculatorScreen;