// screens/SearchScreen.js

import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function SearchScreen({ navigation }) {
  const [selectedLeague, setSelectedLeague] = useState(null);

  // Assuming you have a list of available leagues with their IDs
  const availableLeagues = [
    { id: 1, name: 'Premier League' },
    { id: 2, name: 'La Liga' },
    // Add your available leagues here
  ];

  return (
    <View>
      <Picker
        selectedValue={selectedLeague}
        onValueChange={(itemValue) => setSelectedLeague(itemValue)}
      >
        <Picker.Item label="Select a League" value={null} />
        {availableLeagues.map((league) => (
          <Picker.Item key={league.id} label={league.name} value={league.id} />
        ))}
      </Picker>
      <Button
        title="Show League Table"
        onPress={() => navigation.navigate('Liigataulukko', { leagueId: selectedLeague })}
        disabled={!selectedLeague}
      />
    </View>
  );
};
