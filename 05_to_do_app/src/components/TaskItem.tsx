import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Task } from '../types';

type Props = {
    task: Task;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onPress: (task: Task) => void;
};

export default function TaskItem({ task, onToggle, onDelete, onPress }: Props) {
    return (
        <TouchableOpacity onPress={() => onPress(task)} style={styles.card} activeOpacity={0.8}>
            <View style={styles.row}>
                <TouchableOpacity onPress={() => onToggle(task.id)} hitSlop={10}>
                    <View style={[styles.checkbox, task.completed && styles.checkboxDone]}>
                        {task.completed ? <Text style={styles.checkmark}>✓</Text> : null}
                    </View>
                </TouchableOpacity>

                <View style={styles.content}>
                    <Text style={[styles.title, task.completed && styles.titleDone]} numberOfLines={1}>
                        {task.title}
                    </Text>
                    <Text style={styles.meta}>{task.completed ? 'Concluída' : 'Pendente'}</Text>
                </View>

                <TouchableOpacity onPress={() => onDelete(task.id)} hitSlop={10} style={styles.deleteButton}>
                    <Text style={styles.deleteText}>×</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 14,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 22,
        height: 22,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#D1D5DB',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    checkboxDone: {
        backgroundColor: '#111827',
        borderColor: '#111827',
    },
    checkmark: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '700',
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
    },
    titleDone: {
        textDecorationLine: 'line-through',
        color: '#9CA3AF',
    },
    meta: {
        marginTop: 4,
        fontSize: 12,
        color: '#6B7280',
    },
    deleteButton: {
        width: 28,
        height: 28,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F3F4F6',
    },
    deleteText: {
        fontSize: 20,
        color: '#6B7280',
        lineHeight: 20,
    },
});
