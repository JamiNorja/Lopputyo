// LoginScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import LoginForm from './login';

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <LoginForm onLogin={(username) => navigation.navigate('Etsi', {username})} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#1f4f19',
    }
  });
