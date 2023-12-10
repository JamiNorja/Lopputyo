import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import Avatar from '../assets/avatar.jpg';

export default LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  //Tarkastetaan käyttäjänimi ja salasana
  const handleLogin = () => {
    if (username.length >= 2 && password.length >= 2) {
      onLogin(username);
      setUsername('');
      setPassword('');
      setError('');
    } else {
      setError('Käyttäjänimi ja/tai salasana pitää olla vähintään 2 pitkä!');
    }
  }

  return (
    <View style={styles.container}> 
      <Text style={styles.header}>Kirjaudu sisään</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Image source={Avatar} style={styles.avatar} />
      <TextInput
        style={styles.input}
        placeholder="Käyttäjänimi"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Salasana"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Kirjaudu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '80%',
    height: '65%',
    borderRadius: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    marginVertical: 30,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '80%',
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  button: {
    width: '80%',
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#4b7bec',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    width: '80%',
    fontWeight: 'bold'
  },
});
