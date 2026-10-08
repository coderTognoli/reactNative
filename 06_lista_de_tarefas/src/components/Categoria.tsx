import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { CategoriaTarefa } from './Lista';

export const CATEGORIAS: CategoriaTarefa[] = [
  'Esportes',
  'Lazer',
  'Trabalho',
  'Social',
  'Educação',
];

type CategoriaProps = {
  selecionada: CategoriaTarefa;
  onChange: (categoria: CategoriaTarefa) => void;
};

export default function Categoria({ selecionada, onChange }: CategoriaProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>CATEGORIA</Text>
      <View style={styles.options}>
        {CATEGORIAS.map((categoria) => {
          const ativa = selecionada === categoria;
          return (
            <Pressable
              key={categoria}
              accessibilityRole="button"
              accessibilityState={{ selected: ativa }}
              onPress={() => onChange(categoria)}
              style={({ pressed }) => [
                styles.option,
                ativa && styles.active,
                pressed && styles.pressed,
              ]}
            >
              <Text style={[styles.text, ativa && styles.activeText]}>{categoria}</Text>
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
  options: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  option: {
    minHeight: 34,
    justifyContent: 'center',
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#DDD2BD',
    borderRadius: 18,
    backgroundColor: '#FFFEFA',
  },
  active: { borderColor: '#6C855F', backgroundColor: '#E6EDDF' },
  text: { color: '#6F644F', fontSize: 11, fontWeight: '600' },
  activeText: { color: '#40573B', fontWeight: '800' },
  pressed: { opacity: 0.72, transform: [{ scale: 0.97 }] },
});