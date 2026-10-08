import { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
    onAdd: (title: string) => void;
};

export default function AddTaskInput({ onAdd }: Props) {
    const [value, setValue] = useState('');

    const handleAdd = () => {
        const title = value.trim();
        if (!title) return;

        onAdd(title);
        setValue('');
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nova Tarefa..."
                placeholderTextColor="#9AA3AF"
                value={value}
                onChangeText={setValue}
                onSubmitEditing={handleAdd}
                returnKeyType="done"
            />
            <TouchableOpacity style={styles.button} onPress={handleAdd} activeOpacity={0.8}>
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 20,
    },
    input: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        color: '#111827',
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    button: {
        width: 48,
        height: 48,
        borderRadius: 14,
        backgroundColor: '#111827',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 22,
        lineHeight: 24,
    },
});