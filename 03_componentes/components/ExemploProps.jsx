import { StyleSheet, Text, View } from 'react-native';

export default function ExemploProps({nome = 'Bruno', idade = '18', cidade = 'São Paulo, SP',}) {
    return (
        <View>
            <Text>Nome: {nome}</Text>
            <Text>Idade: {idade}</Text>
            <Text>Cidade: {cidade}</Text>
        </View>
    )
}