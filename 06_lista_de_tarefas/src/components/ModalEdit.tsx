import { useEffect, useMemo, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Categoria from './Categoria';
import Data from './Data';
import Importancia from './Importancia';
import type { CategoriaTarefa, ImportanciaTarefa, Tarefa } from './Lista';

type ModalEditProps = {
  tarefa: Tarefa | null;
  tarefas: Tarefa[];
  onClose: () => void;
  onSalvar: (tarefa: Tarefa) => void;
};

export default function ModalEdit({
  tarefa,
  tarefas,
  onClose,
  onSalvar,
}: ModalEditProps) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState<CategoriaTarefa>('Trabalho');
  const [importancia, setImportancia] = useState<ImportanciaTarefa>('Média');
  const [data, setData] = useState('');
  const [inicio, setInicio] = useState('');
  const [fim, setFim] = useState('');
  const [concluida, setConcluida] = useState(false);

  useEffect(() => {
    if (!tarefa) return;
    setTitulo(tarefa.titulo);
    setDescricao(tarefa.descricao);
    setCategoria(tarefa.categoria);
    setImportancia(tarefa.importancia);
    setData(tarefa.data);
    setInicio(tarefa.inicio);
    setFim(tarefa.fim);
    setConcluida(tarefa.concluida);
  }, [tarefa]);

  const outrasTarefas = useMemo(
    () => tarefas.filter((item) => item.id !== tarefa?.id),
    [tarefas, tarefa?.id],
  );
  if (!tarefa) return null;

  const alterarData = (dias: number) => {
    const date = new Date(`${data}T12:00:00`);
    date.setDate(date.getDate() + dias);
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    setData(localDate.toISOString().slice(0, 10));
    setInicio('');
    setFim('');
  };

  const alterarInicio = (novoInicio: string) => {
    setInicio(novoInicio);
    const horaFim = `${String(Number(novoInicio.slice(0, 2)) + 1).padStart(2, '0')}:00`;
    setFim(horaFim);
  };

  const salvar = () => {
    if (!titulo.trim() || !inicio || !fim) return;
    const inicioNumero = Number(inicio.slice(0, 2));
    const fimNumero = Number(fim.slice(0, 2));
    const conflito = outrasTarefas.some((item) => {
      if (item.data !== data) return false;
      const itemInicio = Number(item.inicio.slice(0, 2));
      const itemFim = Number(item.fim.slice(0, 2));
      return inicioNumero < itemFim && fimNumero > itemInicio;
    });
    if (conflito) return;
    onSalvar({
      ...tarefa,
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      categoria,
      importancia,
      data,
      inicio,
      fim,
      concluida,
    });
  };

  const finsDisponiveis = Array.from({ length: 23 - Number(inicio.slice(0, 2)) }, (_, index) => {
    const hora = Number(inicio.slice(0, 2)) + index + 1;
    const fimCandidato = `${String(hora).padStart(2, '0')}:00`;
    const ocupado = outrasTarefas.some((item) => {
      if (item.data !== data) return false;
      return Number(inicio.slice(0, 2)) < Number(item.fim.slice(0, 2))
        && hora > Number(item.inicio.slice(0, 2));
    });
    return { hora: fimCandidato, ocupado };
  }).filter((item) => !item.ocupado);

  return (
    <Modal
      animationType="fade"
      transparent
      visible
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <View style={styles.heading}>
            <View>
              <Text style={styles.eyebrow}>AJUSTE SEUS PLANOS</Text>
              <Text style={styles.title}>Editar tarefa</Text>
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Fechar edição"
              onPress={onClose}
              style={({ pressed }) => [styles.close, pressed && styles.pressed]}
            >
              <Text style={styles.closeText}>×</Text>
            </Pressable>
          </View>
          <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            <Text style={styles.label}>NOME</Text>
            <TextInput
              accessibilityLabel="Nome da tarefa"
              value={titulo}
              onChangeText={setTitulo}
              placeholder="Nome da tarefa"
              maxLength={80}
              style={styles.input}
            />
            <Text style={styles.label}>DESCRIÇÃO</Text>
            <TextInput
              accessibilityLabel="Descrição da tarefa"
              value={descricao}
              onChangeText={setDescricao}
              placeholder="Anotações opcionais"
              multiline
              maxLength={240}
              style={[styles.input, styles.description]}
            />
            <Text style={styles.label}>DIA</Text>
            <View style={styles.datePicker}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Dia anterior"
                onPress={() => alterarData(-1)}
                style={({ pressed }) => [styles.dayButton, pressed && styles.pressed]}
              >
                <Text style={styles.dayButtonText}>‹</Text>
              </Pressable>
              <Text style={styles.dateText}>
                {new Date(`${data}T12:00:00`).toLocaleDateString('pt-BR', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                })}
              </Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Próximo dia"
                onPress={() => alterarData(1)}
                style={({ pressed }) => [styles.dayButton, pressed && styles.pressed]}
              >
                <Text style={styles.dayButtonText}>›</Text>
              </Pressable>
            </View>
            <Data
              tarefas={outrasTarefas}
              data={data}
              horarioSelecionado={inicio}
              onSelecionarHorario={alterarInicio}
            />
            <Text style={styles.label}>FIM</Text>
            <View style={styles.timeOptions}>
              {finsDisponiveis.map(({ hora }) => (
                <Pressable
                  key={hora}
                  accessibilityRole="button"
                  accessibilityState={{ selected: fim === hora }}
                  onPress={() => setFim(hora)}
                  style={({ pressed }) => [
                    styles.timeOption,
                    fim === hora && styles.selectedOption,
                    pressed && styles.pressed,
                  ]}
                >
                  <Text style={styles.timeOptionText}>{hora}</Text>
                </Pressable>
              ))}
            </View>
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>STATUS</Text>
              <View style={styles.statusOptions}>
                {[false, true].map((value) => (
                  <Pressable
                    key={String(value)}
                    accessibilityRole="button"
                    accessibilityState={{ selected: concluida === value }}
                    onPress={() => setConcluida(value)}
                    style={({ pressed }) => [
                      styles.timeOption,
                      concluida === value && styles.selectedOption,
                      pressed && styles.pressed,
                    ]}
                  >
                    <Text style={styles.timeOptionText}>
                      {value ? 'Concluída' : 'Pendente'}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
            <Categoria selecionada={categoria} onChange={setCategoria} />
            <Importancia selecionada={importancia} onChange={setImportancia} />
            <Pressable
              accessibilityRole="button"
              onPress={salvar}
              disabled={!titulo.trim() || !inicio || !fim}
              style={({ pressed }) => [
                styles.saveButton,
                (!titulo.trim() || !inicio || !fim) && styles.disabled,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.saveText}>Salvar alterações</Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, justifyContent: 'center', padding: 16, backgroundColor: 'rgba(36, 32, 25, 0.48)' },
  sheet: {
    width: '100%',
    maxWidth: 560,
    maxHeight: '92%',
    alignSelf: 'center',
    padding: 22,
    borderWidth: 1,
    borderColor: '#E5D9C1',
    borderRadius: 18,
    backgroundColor: '#FFFDF7',
    elevation: 8,
  },
  heading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  eyebrow: { color: '#8C7955', fontSize: 10, fontWeight: '800', letterSpacing: 2 },
  title: { marginTop: 3, color: '#352F25', fontSize: 27, fontWeight: '800', letterSpacing: 0.5 },
  close: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center', borderRadius: 20, backgroundColor: '#F2EBDD' },
  closeText: { color: '#554A37', fontSize: 27, lineHeight: 30 },
  label: { marginTop: 17, marginBottom: 8, color: '#6F644F', fontSize: 10, fontWeight: '800', letterSpacing: 1.5 },
  input: { minHeight: 46, paddingHorizontal: 13, paddingVertical: 10, borderWidth: 1, borderColor: '#E6DDCC', borderRadius: 10, backgroundColor: '#FFFEFA', color: '#352F25', fontSize: 14 },
  description: { minHeight: 70, textAlignVertical: 'top' },
  datePicker: { minHeight: 44, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 4, borderBottomWidth: 1, borderBottomColor: '#E8DFCF' },
  dayButton: { width: 34, height: 34, alignItems: 'center', justifyContent: 'center', borderRadius: 17, backgroundColor: '#F2EBDD' },
  dayButtonText: { color: '#554A37', fontSize: 23, lineHeight: 26 },
  dateText: { color: '#40382B', fontSize: 13, fontWeight: '700' },
  timeOptions: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 },
  timeOption: { minHeight: 32, justifyContent: 'center', paddingHorizontal: 10, borderWidth: 1, borderColor: '#E5DDCD', borderRadius: 16, backgroundColor: '#FFFDF7' },
  selectedOption: { borderColor: '#6C855F', backgroundColor: '#E6EDDF' },
  timeOptionText: { color: '#52664A', fontSize: 10, fontWeight: '700' },
  statusRow: { marginTop: 16 },
  statusLabel: { marginBottom: 8, color: '#6F644F', fontSize: 10, fontWeight: '800', letterSpacing: 1.5 },
  statusOptions: { flexDirection: 'row', gap: 8 },
  saveButton: { minHeight: 50, alignItems: 'center', justifyContent: 'center', marginTop: 22, marginBottom: 8, borderRadius: 12, backgroundColor: '#5A7656' },
  saveText: { color: '#FFFDF7', fontSize: 14, fontWeight: '800', letterSpacing: 0.5 },
  disabled: { opacity: 0.45 },
  pressed: { opacity: 0.76, transform: [{ scale: 0.985 }] },
});