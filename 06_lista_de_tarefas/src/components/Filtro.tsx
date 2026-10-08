import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CATEGORIAS } from './Categoria';
import { IMPORTANCIAS } from './Importancia';
import type { CategoriaTarefa, ImportanciaTarefa } from './Lista';

export type Filtros = {
  categoria: CategoriaTarefa | 'Todas';
  status: 'Todos' | 'Pendentes' | 'Concluídas';
  importancia: ImportanciaTarefa | 'Todas';
};

type FiltroProps = {
  filtros: Filtros;
  onChange: (filtros: Filtros) => void;
};

function Grupo<T extends string>({
  titulo,
  opcoes,
  selecionada,
  onSelecionar,
}: {
  titulo: string;
  opcoes: T[];
  selecionada: T;
  onSelecionar: (valor: T) => void;
}) {
  return (
    <View style={styles.group}>
      <Text style={styles.label}>{titulo}</Text>
      <View style={styles.options}>
        {opcoes.map((opcao) => {
          const ativa = opcao === selecionada;
          return (
            <Pressable
              key={opcao}
              accessibilityRole="button"
              accessibilityState={{ selected: ativa }}
              onPress={() => onSelecionar(opcao)}
              style={({ pressed }) => [
                styles.option,
                ativa && styles.activeOption,
                pressed && styles.pressed,
              ]}
            >
              <Text style={[styles.optionText, ativa && styles.activeText]}>
                {opcao}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default function Filtro({ filtros, onChange }: FiltroProps) {
  const [expandido, setExpandido] = useState(false);
  const ativos = [
    filtros.categoria !== 'Todas' ? filtros.categoria : null,
    filtros.status !== 'Todos' ? filtros.status : null,
    filtros.importancia !== 'Todas' ? filtros.importancia : null,
  ].filter((valor) => valor !== null);

  return (
    <View style={styles.container}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: expandido }}
        onPress={() => setExpandido(!expandido)}
        style={({ pressed }) => [styles.toggle, pressed && styles.pressed]}
      >
        <View style={styles.toggleLeft}>
          <Text style={styles.filterIcon}>≡</Text>
          <Text style={styles.toggleTitle}>FILTROS</Text>
          {ativos.length > 0 && (
            <View style={styles.activeCount}>
              <Text style={styles.activeCountText}>{ativos.length}</Text>
            </View>
          )}
          <Text numberOfLines={1} style={styles.activeSummary}>
            {ativos.length ? ativos.join(' · ') : 'Todas as tarefas'}
          </Text>
        </View>
        <Text style={styles.chevron}>{expandido ? '−' : '+'}</Text>
      </Pressable>
      {expandido && (
        <View style={styles.details}>
          <Grupo
            titulo="CATEGORIA"
            opcoes={['Todas', ...CATEGORIAS]}
            selecionada={filtros.categoria}
            onSelecionar={(categoria) => onChange({ ...filtros, categoria })}
          />
          <Grupo
            titulo="STATUS"
            opcoes={['Todos', 'Pendentes', 'Concluídas']}
            selecionada={filtros.status}
            onSelecionar={(status) => onChange({ ...filtros, status })}
          />
          <Grupo
            titulo="IMPORTÂNCIA"
            opcoes={['Todas', ...IMPORTANCIAS]}
            selecionada={filtros.importancia}
            onSelecionar={(importancia) => onChange({ ...filtros, importancia })}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E6E1DF',
  },
  toggle: {
    minHeight: 39,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
  toggleLeft: { flex: 1, minWidth: 0, flexDirection: 'row', alignItems: 'center' },
  filterIcon: { marginRight: 7, color: '#6F837C', fontSize: 18, fontWeight: '800' },
  toggleTitle: {
    color: '#425B54',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.1,
  },
  activeCount: {
    width: 17,
    height: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
    borderRadius: 9,
    backgroundColor: '#DDEAE5',
  },
  activeCountText: { color: '#4B6960', fontSize: 9, fontWeight: '800' },
  activeSummary: { flex: 1, marginLeft: 9, color: '#8A817C', fontSize: 10 },
  chevron: { width: 23, color: '#798B82', fontSize: 18, textAlign: 'right' },
  details: {
    paddingTop: 3,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderColor: '#EEE9E6',
  },
  group: { marginTop: 9 },
  label: {
    marginBottom: 5,
    color: '#8D827B',
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 1,
  },
  options: { flexDirection: 'row', flexWrap: 'wrap', gap: 5 },
  option: {
    minHeight: 25,
    justifyContent: 'center',
    paddingHorizontal: 9,
    borderWidth: 1,
    borderColor: '#E7E1DC',
    borderRadius: 3,
    backgroundColor: '#FAF9F7',
  },
  activeOption: { borderColor: '#6D9E91', backgroundColor: '#E6F0EC' },
  optionText: { color: '#746E68', fontSize: 9, fontWeight: '600' },
  activeText: { color: '#43665B', fontWeight: '800' },
  pressed: { opacity: 0.72 },
});
