import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

export default function TableScreen({ route, navigation }) {
  const [leagueData, setLeagueData] = useState(null);

  const { leagueId } = route.params;
  
  // Liigataulun haku
  useEffect(() => {
    const fetchLeagueTable = async () => {
      try {
        const KEY = process.env.KEY;
        const SECRET = process.env.SECRET;
        const response = await fetch(
          `https://livescore-api.com/api-client/competitions/standings.json?competition_id=${leagueId}&key=${KEY}&secret=${SECRET}`
        );

        if (!response.ok) {
          throw new Error('Verkon vastaus ei ole ok');
        }

        const data = await response.json();
        setLeagueData(data);
      } catch (error) {
        console.error('Virhe haettaessa liigataulua:', error);
      }
    };

    fetchLeagueTable();
  }, []);

  // Yhen tiimin tulostus riville 
  const renderItem = ({ item, index }) => (
    <View style={[styles.tableRow, { backgroundColor: index % 2 === 0 ? '#1a4022' : '#1f4f19' }]}>
      <Text style={styles.tableData} >{item.rank}.</Text>
      <Text style={styles.teamName}>{item.name}</Text>
      <Text style={styles.tableData}>{item.matches}</Text>
      <Text style={styles.tableRecord}>{item.won} - {item.drawn} - {item.lost}</Text>
      <Text style={styles.tableData}>{item.points}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {leagueData ? (
        <FlatList
          data={leagueData.data.table}
          keyExtractor={(item) => item.team_id.toString()}
          renderItem={renderItem}
          ListHeaderComponent={() => (
            <View style={styles.tableHeader}>
              <Text style={styles.rank}>Rank</Text>
              <Text style={styles.team}>Team</Text>
              <Text style={styles.played}>P</Text>
              <Text style={styles.matches}>W - D - L</Text>
              <Text style={styles.points}>Pts.</Text>
            </View>
          )}
        />
      ) : (
        <Text>Ladataan...</Text>
      )}
      <View style={styles.buttons}>
      <TouchableOpacity
          style={[styles.button, { backgroundColor: '#28a745' }]}
          onPress={() => {
            route.params.saveLeague({ id: leagueId, name: route.params.leagueData.name });
            navigation.goBack();
          }}
        >
          <Text style={styles.buttonText}>Lisää suosikiksi</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#781822' }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Palaa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f4f19',
    padding: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderBottomColor: '#28a745',
    paddingHorizontal: 13,
    marginBottom: 8,
    marginTop: 10
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 8,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  rank: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
  },
  team: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
    paddingLeft: 20
  },
  played: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
    marginLeft: 60,
    marginRight: 10
  },
  matches: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white'
  },
  points: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white'
  },
  teamName: {
    flex: 5,
    fontWeight: 'bold',
    color: 'white'
  },
  tableData: {
    flex: 2,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white'
  },
  tableRecord: {
    flex: 3,
    textAlign: 'center',
    color: 'white'
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
});
