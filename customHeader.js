import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import football from './assets/football.jpg';

export default CustomHeader = () => (
  <ImageBackground
    source={football}
    style={styles.background}
  >
  </ImageBackground>
);

const styles = StyleSheet.create({
  background: {
    height: 80, 
    width: '100%',
    overflow: 'hidden',
  },
  
});
