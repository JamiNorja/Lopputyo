// screens/FavoritesScreen.js

import React from 'react';
import { View, Text, Button } from 'react-native';

export default function FavoritesScreen({ navigation }) {
  // Assuming you have a list of favorite leagues with their IDs
  const favoriteLeagues = [
    { id: 1, name: 'Premier League' },
    { id: 2, name: 'La Liga' },
    // Add your favorite leagues here
  ];

  return (
    <View>
      {favoriteLeagues.map((league) => (
        <Button
          key={league.id}
          title={league.name}
          onPress={() => navigation.navigate('Liigataulukko', { leagueId: league.id })}
        />
      ))}
    </View>
  );
};
