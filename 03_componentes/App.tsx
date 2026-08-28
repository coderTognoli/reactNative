import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// Importação do Componente
import MeuComponente from './components/MeuComponente';
import ExemploProps from './components/ExemploProps';
import ListaPessoas from './components/ListaPessoas';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Uso dos componentes</Text>
      <MeuComponente />
      <ExemploProps />
      <ListaPessoas />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 10,
  },
});
