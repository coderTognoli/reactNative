import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Tarefa } from './Lista';

type DataProps = {
  tarefas: Tarefa[];
  data: string;
  horarioSelecionado?: string;
  onSelecionarHorario?: (horario: string) => void;
};

const horaNumero = (hora: string) => {
  const [h, m] = hora.split(':').map(Number);
  return h + m / 60;
};

export function getHorariosLivres(tarefas: Tarefa[], data: string) {
  return Array.from({ length: 18 }, (_, index) => {
    const inicioHora = index + 5;
    const inicio = `${String(inicioHora).padStart(2, '0')}:00`;
    const fim = `${String(inicioHora + 1).padStart(2, '0')}:00`;
    const ocupante = tarefas.find((tarefa) => {
      if (tarefa.data !== data) return false;
      return horaNumero(tarefa.inicio) < horaNumero(fim)
        && horaNumero(tarefa.fim) > horaNumero(inicio);
    });
    return { inicio, fim, tarefa: ocupante };
  });
}

export default function Data({
  tarefas,
  data,
  horarioSelecionado,
  onSelecionarHorario,
}: DataProps) {
  const horarios = getHorariosLivres(tarefas, data);

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.label}>HORÁRIOS</Text>
        <Text style={styles.count}>
          {horarios.filter((slot) => !slot.tarefa).length} livres
        </Text>
      </View>
      <View style={styles.grid}>
        {horarios.map(({ inicio, fim, tarefa }) => {
          const livre = !tarefa;
          const selecionado = horarioSelecionado === inicio;
          const conteudo = (
            <>
              <Text style={[styles.hour, !livre && styles.occupiedHour]}>
                {inicio}
              </Text>
              <Text
                numberOfLines={1}
                style={[
                  styles.slotText,
                  !livre && styles.occupiedText,
                  selecionado && styles.selectedText,
                ]}
              >
                {livre ? 'livre' : tarefa.titulo}
              </Text>
              <Text style={styles.endHour}>{fim}</Text>
            </>
          );

          return onSelecionarHorario && livre ? (
            <Pressable
              key={inicio}
              accessibilityRole="button"
              accessibilityState={{ selected: selecionado }}
              accessibilityLabel={`Selecionar ${inicio} às ${fim}`}
              onPress={() => onSelecionarHorario(inicio)}
              style={({ pressed }) => [
                styles.slot,
                styles.freeSlot,
                selecionado && styles.selectedSlot,
                pressed && styles.pressed,
              ]}
            >
              {conteudo}
            </Pressable>
          ) : (
            <View
              key={inicio}
              style={[styles.slot, livre ? styles.freeSlot : styles.busySlot]}
            >
              {conteudo}
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 9 },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 7,
  },
  label: { color: '#819A91', fontSize: 9, fontWeight: '800', letterSpacing: 1.2 },
  count: { color: '#688E81', fontSize: 9, fontWeight: '800' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 5 },
  slot: {
    width: '31%',
    minHeight: 43,
    justifyContent: 'center',
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 1,
  },
  freeSlot: { borderColor: '#B9D5CC', backgroundColor: '#FBFCFA' },
  busySlot: { borderColor: '#E8CFCB', backgroundColor: '#F8EFED' },
  selectedSlot: { borderColor: '#539985', backgroundColor: '#E5F0EB' },
  hour: { color: '#4D8C79', fontSize: 10, fontWeight: '800' },
  occupiedHour: { color: '#A87068' },
  slotText: { marginTop: 2, color: '#9A9D93', fontSize: 9 },
  occupiedText: { color: '#966C65', fontWeight: '600' },
  selectedText: { color: '#397865', fontWeight: '800' },
  endHour: { position: 'absolute', top: 5, right: 5, color: '#B5ADA6', fontSize: 7 },
  pressed: { opacity: 0.72, transform: [{ scale: 0.97 }] },
});