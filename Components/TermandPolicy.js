import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const TermandPolicy = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Terms of Use & Privacy Policy</Text>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>

        <Text style={styles.title}>Terms of Use</Text>
        <Text style={styles.paragraph}>
          Welcome to Shelter Seeker! By using our app, you agree to follow our rules. Shelter Seeker is here to help you find properties for sale or rent. Please use the app responsibly and keep your account information accurate and secure. We’re committed to making your experience safe and reliable, but we’re not responsible for any mistakes in property listings. If you have questions, contact us anytime.
        </Text>

        
        <Text style={styles.title}>Privacy Policy</Text>
        <Text style={styles.paragraph}>
          1. <Text style={styles.bold}>Information Collection:</Text> We collect details you share, like your name, email, and location, to improve your experience.
        </Text>
        <Text style={styles.paragraph}>
          2. <Text style={styles.bold}>Usage of Information:</Text> We use your data to personalize recommendations, connect you with agents, and improve the app.
        </Text>
        <Text style={styles.paragraph}>
          3. <Text style={styles.bold}>Sharing with Others:</Text> We may share data with trusted partners for essential app functions, but we don’t sell your information.
        </Text>
        <Text style={styles.paragraph}>
          4. <Text style={styles.bold}>Security:</Text> We work hard to keep your information secure, though no method is completely foolproof.
        </Text>
        <Text style={styles.paragraph}>
          5. <Text style={styles.bold}>Your Rights:</Text> You can ask to view, update, or delete your data at any time.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#191645',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#191645',
  },
  paragraph: {
    fontSize: 16,
    color: '#333',
    textAlign: 'justify',
    marginVertical: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default TermandPolicy;
