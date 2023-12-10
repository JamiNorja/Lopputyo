import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ListItem } from 'react-native-elements';
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue, remove } from 'firebase/database';
import database from '../firebase';

export default function SearchScreen({ navigation, route }) {

  const [selectedLeague, setSelectedLeague] = useState(null);
  const [availableLeagues, setAvailableLeagues] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const { username } = route.params;
  const KEY = process.env.KEY;
  const SECRET = process.env.SECRET;

  // Kirjautuu ulos 
  const handleLogout = () => {
    navigation.navigate('Login');
  }

  // Tallentaa liigan firebaseen
  const saveLeague = (favLeague) => {
    console.log('saveLeague:', favLeague);
    const isAlreadyFavorite = favorites.find(league => league.LeagueId === favLeague.id);
  
    // Tarkastaa onko liiga jo suosikeissa
    if (!isAlreadyFavorite) {
      push(
        ref(database, '/liigataulukko'),
        { 'LeagueId': favLeague.id, 'leagueName': favLeague.name }
      );
    } else {
      Alert.alert("Huomautus", "Kyseinen liiga on jo suosikeissa");
    }
  }
  

  // Lukee datan from firebasesta
  useEffect(() => {
    console.log('useEffect');
    const itemsRef = ref(database, '/liigataulukko');
    onValue(itemsRef, snapshot => {
      const data = snapshot.val();
      let leagues
      if (data) {
        leagues = Object.keys(data).map(key => ({ key, ...data[key] }))
      } else {
        leagues = [];
      }
      setFavorites(leagues);
      console.log(leagues.length, 'items read');
    });
  }, []);
    
  // Poistaa liigan firbasesta ja tekee ennen varmistuksen
  const deleteLeague = (key) => {
    Alert.alert(
      "Vahvistus",
      "Oletko varma, että haluat poistaa kyseisen liigan?", 
      [
        {
          text: "Peru",
          onPress: () => console.log("Painettu peru")
        },
        { text: "Poista", onPress: () => {
          console.log('Deleting league with id:', key);
          remove(ref(database, 'liigataulukko/' + key));
          console.log("Poista painettu, liiga poistettu");
        }}
      ]
    );
  };

  // Hakee yksilölliset liigat livescore apista ja asettaa ne liigat taulukkoon
  useEffect(() => {
    fetch(`https://livescore-api.com/api-client/competitions/list.json?&is_league=1&key=${KEY}&secret=${SECRET}`)
      .then(response => response.json())
      .then(data => {
        const yksilollisetLiigat = Array.from(new Set(data.data.competition.map(a => a.name)))
          .map(name => {
            return data.data.competition.find(a => a.name === name)
          });
        setAvailableLeagues(yksilollisetLiigat);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  // Renderöi listan suosikeista
  const renderItem = ({ item }) => {
    console.log('Rendering item:', item);
    return (
      <ListItem
        containerStyle={{ backgroundColor: styles.container.backgroundColor }}
        bottomDivider
        
        topDivider
        onPress={() => {
          console.log('ListItem onPress');
          navigation.navigate('Suosikit', { leagueId: item.LeagueId });
        }}
        onLongPress={() => {
          console.log('ListItem onLongPress');
          deleteLeague(item.key)
        }}
      >
        <View style={styles.listItem}>
          <Text style={styles.listItemText}>{item.leagueName}</Text>
          <Text style={styles.listItemSubtitle}>Näytä taulukko</Text>
        </View>
      </ListItem>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.username}>Tervetuloa, {username}!</Text>
        <TouchableOpacity 
          onPress={handleLogout} 
          style={[styles.logoutButton]}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.header}>Liigat</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedLeague}
          onValueChange={(itemValue) => setSelectedLeague(itemValue)}
        >
          <Picker.Item label='Valitse' value={null} />
          {availableLeagues.map((league) => (
          <Picker.Item key={league.id} label={league.name} value={league.id} />
        ))}
        </Picker>
      </View>
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: selectedLeague ? '#28a745' : '#6c757d' }
        ]}
        onPress={() => {
          const selectedLeagueData = availableLeagues.find(league => league.id === selectedLeague);
          navigation.navigate('Liigataulukko', { leagueId: selectedLeague, leagueData: selectedLeagueData, saveLeague: () => saveLeague({ id: selectedLeague, name: selectedLeagueData.name }) });
          setSelectedLeague(null);
        }}
        disabled={!selectedLeague}
      >
        <Text style={styles.buttonText}>Näytä sarjataulukko</Text>
      </TouchableOpacity>
      <FlatList 
        style={styles.list}
        ListHeaderComponent={<Text style={styles.favoritesHeader}>Suosikit</Text>}
        data={favorites}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f4f19',
    padding: 10,
  },
  favoritesHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#fff',
  },
  pickerContainer: {
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#28a745',
    backgroundColor: '#fff',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center', 
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
    marginTop: 15,
  },
  listItem: {
    padding: 15,
    borderBottomColor: '#ddd',
    backgroundColor: 'green',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
  },
  listItemText: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    alignItems: 'center',
    color: '#fff'
  },
  listItemSubtitle: {
    color: '#fff',
    fontSize: 14,
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#fff',
  },
  username: {
    fontSize: 15,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#fff',
  },
  logoutButton: {
    backgroundColor: '#781822',
    padding: 10,
    width: 70,
    borderRadius: 5,
    marginTop: 5,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
