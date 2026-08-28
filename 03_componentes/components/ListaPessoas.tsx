import { StyleSheet, Text, View, FlatList } from 'react-native';

export default function ListaPessoas() {

    // Lista de Pessoas 
    const pessoas = [
        { id: 1, nome: 'Bruno Tognoli' },
        { id: 2, nome: 'Paulão' },
        { id: 3, nome: 'Dênis' },
        { id: 4, nome: 'Valmir' },
        { id: 5, nome: 'Denani' },
        { id: 6, nome: 'Ignácio' },

    ]

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Lista de Pessoas</Text>

            <FlatList
                data={pessoas}
                keyExtractor={(pessoa) => pessoa.id.toString()}
                renderItem={({ item }) => (
                    <Text>{item.id} - {item.nome}</Text>
                )}
            />
        </View>
    )
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 10,
  }})