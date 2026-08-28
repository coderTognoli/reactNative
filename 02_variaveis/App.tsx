
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  // Declaração das variáveis
  const name = 'Visitante'
  const sobrenome = 'Vigilante'
  const idade = 18

  // Soma
  const num1 = 77
  const num2 = 33

  const soma = num1 + num2  

  // Média
  const nota1 = 8
  const nota2 = 10
  const nota3 = 7

  let resultado = null

  const media = (nota1 + nota2 + nota3) / 3

  if (media >= 7) {
    resultado = 'aprovado'
  } else if (media >= 5) {
    resultado = 'recuperação'
  } else {
    resultado = 'reprovado'
  }

  // Menu de Opções
  const opcao: number = 2
  let sabor = ''

  switch (opcao) {
    case 1:
      sabor = 'mussarela'
      break

    case 2:
      sabor = 'calabresa'
      break

    case 3:
      sabor = 'portuguesa'
      break

    case 4:
      sabor = 'frango'
      break

    default:
      sabor = 'Sabor não disponível'
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>uso das variáveis</Text>
      <Text>Nome: {name}</Text>
      <Text>Sobrenome: {sobrenome}</Text>
      <Text>Idade: {idade}</Text>

      <Text style={styles.titulo}>Soma</Text>
      <Text>Resultado: {soma}</Text>
      

      <Text style={styles.titulo}>Média das Notas</Text>
      <Text>Média Final: {media.toFixed(2).replace('.', ',')}</Text>
      <Text>Você foi {resultado}!</Text>

      <Text style={styles.titulo}>Sabor da Pizza</Text>
      <Text>1. mussarela</Text>
      <Text>2. calabresa</Text>
      <Text>3. portuguesa</Text>
      <Text>4. frango</Text>
      <Text style={styles.cor}>Sabor Selecionado: {sabor}</Text>

      <StatusBar style="auto"/>
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
  
  cor: {
    color: 'red',
  }
});