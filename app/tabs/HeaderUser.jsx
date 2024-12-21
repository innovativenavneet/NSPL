import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const SimpleHeader = () => {
  return (
    <View style={styles.header}>
      {/* Left logo */}
      <Image
        source={require('../../assets/startingflow/logo.png')} // Replace with your actual logo path
       
        style={styles.logo}
      />
      
      {/* Center title */}
      <Text style={styles.title}>Match Overview</Text>
      
      {/* Right blank space */}
      <View style={styles.placeholder}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: '#008080', // Teal background color
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    elevation: 4, // Adds shadow on Android
    shadowColor: '#000', // Shadow for iOS
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  logo: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  placeholder: {
    width: 40, // Match the width of the logo for symmetry
    height: 40,
  },
});

export default SimpleHeader;
