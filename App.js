import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FavoritesScreen from './screens/FavoritesScreen';
import SearchScreen from './screens/SearchScreen';
import TableScreen from './screens/TableScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Etsi" component={SearchScreen} />
        <Stack.Screen name="Suosikit" component={FavoritesScreen} />
        <Stack.Screen name="Liigataulukko" component={TableScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}