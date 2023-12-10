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
    height: 80, // Height of the header
    width: '100%', // Width of the header
    overflow: 'hidden', // This ensures the image doesn't spill outside the header bounds
  },
});
