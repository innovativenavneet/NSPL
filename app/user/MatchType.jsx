import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, requireNativeComponent } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';

const MatchType = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const navigation = useNavigation(); // Use navigation hook for routing

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        OpenSans: require('../../assets/fonts/OpenSans-Regular.ttf'),
        OpenSansSemibold :require('../../assets/fonts/OpenSans_SemiCondensed-SemiBold.ttf')
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LinearGradient colors={['#d3d3d3', '#008080']} style={styles.container}>
      {/* Header with logo and admin button */}
      <View style={styles.header}>
        <Image source={require('../../assets/startingflow/logo.png')} style={styles.logo} />
        <TouchableOpacity
          onPress={() => navigation.navigate('AdminScreen')} // Route to Admin Screen
        >
          <Image source={require('../../assets/startingflow/human.png')} style={styles.userIcon} />
        </TouchableOpacity>
      </View>

      {/* First button positioned 10px below the header */}
      <View style={styles.onebutton}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('LeatherMatch')} // Route to Leather Match screen
        >
          
          <Text style={styles.buttonText}>Women's Match</Text>
        </TouchableOpacity>
        <Image source={require("../../assets/startingflow/Women.png")} style={styles.women} />
      </View>

      <Text style={styles.question}>Which type of Match do you want to see?</Text>

      {/* Second button positioned 30px above the bottom */}
      <View style={styles.secondbutton}>
      <Image source={require("../../assets/startingflow/Men.png")} style={styles.men} />

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('TennisMatch')} 
        >
        
          <Text style={styles.buttonText}>Men's Match</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
  },
  userIcon: {
    width: 50,
    height: 50,
  },
  question: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 410,
    color: '#fff',
    fontFamily: 'OpenSansSemibold',
    
  },
  onebutton: {
    position: 'absolute',
    top: 180, // 10px below header (header top + height + 10px)
    left: 0,
    right: 0,
    alignItems: 'center',
    
  },
  women: {
  marginTop: 30,
 
  },
  men: {
    marginBottom: 30,

  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
    width: 200,
    justifyContent: 'center',
    elevation: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
  },
  secondbutton: {
    position: 'absolute',
    bottom: 180, // 30px above the bottom
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

export default MatchType;
