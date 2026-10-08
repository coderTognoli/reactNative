import { Pressable, StyleSheet, Text, View } from 'react-native';

type StatusProps = {
  concluida: boolean;
  onAlternar: () => void;
  onExcluir: () => void;
};

export default function Status({
  concluida,
  onAlternar,
  onExcluir,
}: StatusProps) {
  return (
    <View style={styles.container}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={concluida ? 'Reabrir tarefa' : 'Concluir tarefa'}
        onPress={onAlternar}
        style={({ pressed }) => [
          styles.completeButton,
          concluida && styles.completedButton,
          pressed && styles.pressed,
        ]}
      >
        <Text style={[styles.completeText, concluida && styles.completedText]}>
          {concluida ? '✓ Feita' : '○ Fazer'}
        </Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Excluir tarefa"
        onPress={onExcluir}
        style={({ pressed }) => [styles.deleteButton, pressed && styles.pressed]}
      >
        <Text style={styles.deleteText}>×</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  completeButton: {
    minHeight: 30,
    justifyContent: 'center',
    paddingHorizontal: 9,
    borderWidth: 1,
    borderColor: '#CCD7C4',
    borderRadius: 15,
    backgroundColor: '#F5F8F1',
  },
  completedButton: { borderColor: '#7D936F', backgroundColor: '#E3EBDD' },
  completeText: { color: '#5B7651', fontSize: 10, fontWeight: '800' },
  completedText: { color: '#425B3B' },
  deleteButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#F6E8E2',
  },
  deleteText: { color: '#A35A4E', fontSize: 19, lineHeight: 21 },
  pressed: { opacity: 0.68, transform: [{ scale: 0.94 }] },
});