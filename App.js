import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import FavoritesScreen from './screens/FavoritesScreen';
import SearchScreen from './screens/SearchScreen';
import TableScreen from './screens/TableScreen';
import CustomHeader from './customHeader';
import LoginScreen from './screens/loginScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{
          header: () => {
            return <CustomHeader/>;
          },
        }}
        > 
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Etsi" component={SearchScreen} />
        <Stack.Screen name="Suosikit" component={FavoritesScreen} />
        <Stack.Screen name="Liigataulukko" component={TableScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#152416'
  },
});