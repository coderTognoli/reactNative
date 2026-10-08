import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { PermanentMarker_400Regular, useFonts } from '@expo-google-fonts/permanent-marker';
import ListaScreen from './src/screens/ListaScreen';

export default function App() {
  const [fontesCarregadas] = useFonts({ PermanentMarker_400Regular });
  if (!fontesCarregadas) return null;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ListaScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1E5E8',
  },
});
