import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Filter } from '../types';

type Props = {
    value: Filter;
    onChange: (value: Filter) => void;
};

const options: Filter[] = ['all', 'pending', 'completed'];

const labels = {
    all: 'Todas',
    pending: 'Pendentes',
    completed: 'Concluídas',
};

export default function FilterTabs({ value, onChange }: Props) {
    return (
        <View style={styles.container}>
            {options.map((option) => {
                const active = value === option;

                return (
                    <TouchableOpacity
                        key={option}
                        style={[styles.tab, active && styles.activeTab]}
                        onPress={() => onChange(option)}
                        activeOpacity={0.8}
                    >
                        <Text style={[styles.label, active && styles.activeLabel]}>{labels[option]}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 20,
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 12,
        backgroundColor: '#E5E7EB',
        alignItems: 'center',
    },
    activeTab: {
        backgroundColor: '#111827',
    },
    label: {
        fontSize: 12,
        fontWeight: '600',
        color: '#374151',
    },
    activeLabel: {
        color: '#FFFFFF',
    },
});
