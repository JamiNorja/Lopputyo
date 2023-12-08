import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';

export default function TableScreen({ route, navigation }) {
  const [leagueData, setLeagueData] = useState(null);

  const { leagueId } = route.params;

  // Liigataulun haku
  useEffect(() => {
    const fetchLeagueTable = async () => {
      try {
        const response = await fetch(
          `https://livescore-api.com/api-client/competitions/standings.json?competition_id=${leagueId}&key=3NFrFUqOUJYLmjO6&secret=pFjaIGbRe278qyftmVV1QlQK5Owr8lyx`
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
  const renderItem = ({ item }) => (
    <View style={styles.tableRow}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
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
    fontSize: 16,
  },
  team: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingLeft: 20
  },
  played: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 60,
    marginRight: 10
  },
  matches: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  points: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  teamName: {
    flex: 5,
  },
  tableData: {
    flex: 2,
    textAlign: 'center',
  },
  tableRecord: {
    flex: 3,
    textAlign: 'center',
  },
});
