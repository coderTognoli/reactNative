import { SafeAreaView, StyleSheet } from 'react-native';
import Lista from '../components/Lista';

export default function ListaScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Lista />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1E5E8',
  },
});