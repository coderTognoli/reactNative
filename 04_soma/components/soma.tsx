import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Keyboard,
} from 'react-native';

export default function Soma() {
    const [n1, setN1] = useState('');
    const [n2, setN2] = useState('');
    const [resultado, setResultado] = useState(0);

    function calcularSoma() {
        Keyboard.dismiss();

        const soma = Number(n1) + (Number(n2) || 0);
        setResultado(soma);
    }

    function limpar() {
        setN1('');
        setN2('');
        setResultado(0);
    }

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />

            <Text style={styles.title}>Soma</Text>

            <TextInput
                style={styles.input}
                placeholder="Primeiro número"
                keyboardType="numeric"
                value={n1}
                onChangeText={setN1}
            />

            <TextInput
                style={styles.input}
                placeholder="Segundo número"
                keyboardType="numeric"
                value={n2}
                onChangeText={setN2}
            />

            <TouchableOpacity style={styles.button} onPress={calcularSoma}>
                <Text style={styles.buttonText}>Calcular</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.clearButton} onPress={limpar}>
                <Text style={styles.clearText}>Limpar</Text>
            </TouchableOpacity>

            <Text style={styles.result}>Resultado: {resultado}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
        backgroundColor: '#ffffff',
    },
    title: {
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 'bold',
        color: '#222',
    },
    input: {
        marginBottom: 12,
        padding: 14,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#fff',
        fontSize: 16,
        color: 'grey'
    },
    button: {
        marginTop: 8,
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        backgroundColor: '#3478f6',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    clearButton: {
        marginTop: 10,
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        backgroundColor: '#ddd',
    },
    clearText: {
        color: '#333',
        fontSize: 16,
    },
    result: {
        marginTop: 24,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#222',
    },
});