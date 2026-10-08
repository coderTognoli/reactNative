import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { Tarefa } from './Lista';

type ToastProps = {
  tarefa: Tarefa | null;
  onDismiss: () => void;
};

export default function Toast({ tarefa, onDismiss }: ToastProps) {
  const [progresso, setProgresso] = useState(100);

  useEffect(() => {
    if (!tarefa) return undefined;
    const inicio = Date.now();
    setProgresso(100);
    const timeout = setTimeout(onDismiss, 5000);
    const interval = setInterval(() => {
      setProgresso(Math.max(0, 100 - ((Date.now() - inicio) / 5000) * 100));
    }, 100);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [onDismiss, tarefa]);

  if (!tarefa) return null;

  return (
    <View
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
      style={styles.card}
    >
      <View style={styles.content}>
        <View style={styles.dot} />
        <View style={styles.texts}>
          <Text style={styles.title}>Tarefa adicionada à agenda</Text>
          <Text numberOfLines={1} style={styles.task}>{tarefa.titulo}</Text>
          <Text style={styles.details}>
            {tarefa.inicio} · {tarefa.categoria} · {tarefa.importancia}
          </Text>
        </View>
      </View>
      <View style={styles.track}>
        <View style={[styles.progress, { width: `${progresso}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    maxWidth: 340,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#DED4C2',
    borderRadius: 13,
    backgroundColor: '#FFFDF7',
    elevation: 8,
  },
  content: { flexDirection: 'row', alignItems: 'center', padding: 15 },
  dot: { width: 10, height: 10, marginRight: 11, borderRadius: 5, backgroundColor: '#6F8B63' },
  texts: { flex: 1 },
  title: { color: '#52664A', fontSize: 10, fontWeight: '800', letterSpacing: 0.5 },
  task: { marginTop: 4, color: '#352F25', fontSize: 14, fontWeight: '800' },
  details: { marginTop: 3, color: '#837863', fontSize: 10 },
  track: { height: 4, backgroundColor: '#E8E2D5' },
  progress: { height: '100%', backgroundColor: '#78906C' },
});