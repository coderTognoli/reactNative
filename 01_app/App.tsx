import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const nome = 'José';
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Aula de React Native</Text>
      <Text>Primeiro projeto mobile</Text>
      <Text>Olá, {nome}!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});