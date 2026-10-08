import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { ImportanciaTarefa } from './Lista';

export const IMPORTANCIAS: ImportanciaTarefa[] = ['Baixa', 'Média', 'Alta'];

const CORES: Record<ImportanciaTarefa, { fundo: string; texto: string }> = {
  Baixa: { fundo: '#E6EDDF', texto: '#496443' },
  Média: { fundo: '#F5E9C9', texto: '#8A6B25' },
  Alta: { fundo: '#F4DEDA', texto: '#9A5149' },
};

type ImportanciaProps = {
  selecionada: ImportanciaTarefa;
  onChange: (importancia: ImportanciaTarefa) => void;
};

export default function Importancia({
  selecionada,
  onChange,
}: ImportanciaProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>IMPORTÂNCIA</Text>
      <View style={styles.options}>
        {IMPORTANCIAS.map((importancia) => {
          const ativa = selecionada === importancia;
          return (
            <Pressable
              key={importancia}
              accessibilityRole="button"
              accessibilityState={{ selected: ativa }}
              onPress={() => onChange(importancia)}
              style={({ pressed }) => [
                styles.option,
                {
                  borderColor: ativa ? CORES[importancia].texto : '#DDD2BD',
                  backgroundColor: ativa ? CORES[importancia].fundo : '#FFFEFA',
                },
                pressed && styles.pressed,
              ]}
            >
              <Text
                style={[
                  styles.text,
                  { color: ativa ? CORES[importancia].texto : '#6F644F' },
                ]}
              >
                {importancia}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 18 },
  label: {
    marginBottom: 9,
    color: '#6F644F',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  options: { flexDirection: 'row', gap: 8 },
  option: {
    minWidth: 72,
    minHeight: 34,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 18,
  },
  text: { fontSize: 11, fontWeight: '800' },
  pressed: { opacity: 0.72, transform: [{ scale: 0.97 }] },
});