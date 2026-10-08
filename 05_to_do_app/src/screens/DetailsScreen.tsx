
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export default function DetailsScreen({ route, navigation }: Props) {
    const { task } = route.params;

    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={12}>
                    <Text style={styles.back}>← Voltar</Text>
                </TouchableOpacity>

                <View style={styles.card}>
                    <Text style={styles.label}>Tarefa</Text>
                    <Text style={styles.title}>{task.title}</Text>

                    <Text style={styles.label}>Status</Text>
                    <Text style={[styles.value, task.completed && styles.done]}>
                        {task.completed ? '✓ Concluída' : 'Pendente'}
                    </Text>

                    <Text style={styles.label}>Criada em</Text>
                    <Text style={styles.value}>
                        {new Date(task.createdAt).toLocaleString('pt-BR')}
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { 
        flex: 1, 
        backgroundColor: '#F7F8FA' 
    },
    container: { 
        flex: 1, 
        paddingHorizontal: 20, 
        paddingTop: 24 
    },
    back: { fontSize: 16, color: '#111827', marginBottom: 24 },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    label: { 
        fontSize: 12, 
        color: '#9CA3AF', 
        textTransform: 'uppercase', 
        marginTop: 16 
    },
    title: { 
        fontSize: 22, 
        fontWeight: '700', 
        color: '#111827', 
        marginTop: 4 
    },
    value: { 
        fontSize: 16, 
        color: '#374151', 
        marginTop: 4 
    },
    done: { 
        color: '#10B981', 
        fontWeight: '600' 
    },
});