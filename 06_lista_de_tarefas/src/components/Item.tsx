import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Status from './Status';
import type { Tarefa } from './Lista';

type ItemProps = {
  tarefa: Tarefa;
  onEditar: () => void;
  onAlternarStatus: () => void;
  onExcluir: () => void;
};

const TONS = {
  Baixa: { fundo: '#E9F0E4', borda: '#C7D5BE', texto: '#526B4A', marca: '#78906B' },
  Média: { fundo: '#F7EFCF', borda: '#E8DCA9', texto: '#7F692E', marca: '#C3A64F' },
  Alta: { fundo: '#F7E5DF', borda: '#EAC9C0', texto: '#92574E', marca: '#C57869' },
};

export default function Item({
  tarefa,
  onEditar,
  onAlternarStatus,
  onExcluir,
}: ItemProps) {
  const [hovered, setHovered] = useState(false);
  const cor = TONS[tarefa.importancia];

  return (
    <View
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      style={[
        styles.card,
        {
          backgroundColor: hovered ? cor.fundo : 'transparent',
          borderBottomColor: hovered ? cor.marca : cor.borda,
        },
        tarefa.concluida && styles.done,
        hovered && styles.highlight,
      ]}
    >
      <View style={[styles.marker, { backgroundColor: cor.marca }]} />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Editar tarefa ${tarefa.titulo}`}
        onPress={onEditar}
        style={({ pressed }) => [styles.editArea, pressed && styles.pressed]}
      >
        <View style={styles.time}>
          <Text style={[styles.timeText, { color: cor.texto }]}>{tarefa.inicio}</Text>
          <Text style={styles.endText}>{tarefa.fim}</Text>
        </View>
        <View style={styles.details}>
          <Text
            numberOfLines={1}
            style={[styles.title, tarefa.concluida && styles.doneText]}
          >
            {tarefa.titulo}
          </Text>
          <Text numberOfLines={1} style={styles.meta}>
            {tarefa.categoria} · {tarefa.importancia}
            {tarefa.descricao ? ` · ${tarefa.descricao}` : ''}
          </Text>
        </View>
      </Pressable>
      <Status
        concluida={tarefa.concluida}
        onAlternar={onAlternarStatus}
        onExcluir={onExcluir}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 55,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 2,
    borderBottomWidth: 1,
  },
  editArea: { flex: 1, minWidth: 0, flexDirection: 'row', alignItems: 'center' },
  marker: { width: 3, height: 34, marginRight: 9, borderRadius: 1 },
  time: { width: 48, alignItems: 'flex-start', justifyContent: 'center' },
  timeText: { fontSize: 11, fontWeight: '800' },
  endText: { marginTop: 2, color: '#9E9891', fontSize: 8 },
  details: { flex: 1, minWidth: 0, paddingRight: 7 },
  title: {
    color: '#47433F',
    fontFamily: 'PermanentMarker_400Regular',
    fontSize: 13,
    letterSpacing: 0.15,
  },
  meta: { marginTop: 3, color: '#8B847D', fontSize: 9 },
  done: { opacity: 0.58 },
  doneText: { textDecorationLine: 'line-through' },
  highlight: { transform: [{ translateY: -1 }] },
  pressed: { opacity: 0.68 },
});