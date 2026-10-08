import { useEffect, useState } from 'react';
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

type AddTarefaProps = {
  visible: boolean;
  dataInicial: string;
  tarefas: Tarefa[];
  onCancel: () => void;
  onAdd: (tarefa: Omit<Tarefa, 'id' | 'concluida'>) => void;
};

const hoje = () => {
  const date = new Date();
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 10);
};

const dataLocal = (date: Date) => {
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 10);
};

const horaFim = (inicio: string) =>
  `${String(Number(inicio.slice(0, 2)) + 1).padStart(2, '0')}:00`;

export default function AddTarefa({
  visible,
  dataInicial,
  tarefas,
  onCancel,
  onAdd,
}: AddTarefaProps) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState<CategoriaTarefa>('Trabalho');
  const [importancia, setImportancia] = useState<ImportanciaTarefa>('Média');
  const [data, setData] = useState(dataInicial || hoje());
  const [inicio, setInicio] = useState('');
  useEffect(() => {
    if (!visible) return;
    setData(dataInicial || hoje());
    setInicio('');
  }, [dataInicial, visible]);

  const salvar = () => {
    const nome = titulo.trim();
    if (!nome || !inicio) return;
    onAdd({
      titulo: nome,
      descricao: descricao.trim(),
      categoria,
      importancia,
      data,
      inicio,
      fim: horaFim(inicio),
    });
    setTitulo('');
    setDescricao('');
    setCategoria('Trabalho');
    setImportancia('Média');
    setInicio('');
    onCancel();
  };

  const alterarData = (dias: number) => {
    const date = new Date(`${data}T12:00:00`);
    date.setDate(date.getDate() + dias);
    setData(dataLocal(date));
    setInicio('');
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <View style={styles.heading}>
            <View>
              <Text style={styles.eyebrow}>UM PASSO DE CADA VEZ</Text>
              <Text style={styles.title}>Nova tarefa</Text>
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Fechar formulário"
              onPress={onCancel}
              style={({ pressed }) => [styles.close, pressed && styles.pressed]}
            >
              <Text style={styles.closeText}>×</Text>
            </Pressable>
          </View>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.label}>O QUE VAMOS FAZER?</Text>
            <TextInput
              accessibilityLabel="Nome da tarefa"
              value={titulo}
              onChangeText={setTitulo}
              placeholder="Ex.: Caminhada no parque"
              placeholderTextColor="#9A927F"
              maxLength={80}
              style={styles.input}
            />
            <Text style={styles.label}>UM POUCO MAIS (OPCIONAL)</Text>
            <TextInput
              accessibilityLabel="Descrição da tarefa"
              value={descricao}
              onChangeText={setDescricao}
              placeholder="Anotações para não esquecer..."
              placeholderTextColor="#9A927F"
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
              tarefas={tarefas}
              data={data}
              horarioSelecionado={inicio}
              onSelecionarHorario={setInicio}
            />
            <Text style={styles.helper}>
              Cada tarefa ocupa uma hora. Os horários ocupados não podem ser selecionados.
            </Text>
            <Categoria selecionada={categoria} onChange={setCategoria} />
            <Importancia selecionada={importancia} onChange={setImportancia} />

            <Pressable
              accessibilityRole="button"
              onPress={salvar}
              disabled={!titulo.trim() || !inicio}
              style={({ pressed }) => [
                styles.saveButton,
                (!titulo.trim() || !inicio) && styles.disabled,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.saveText}>Guardar na agenda</Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'rgba(36, 32, 25, 0.48)',
  },
  sheet: {
    width: '100%',
    maxWidth: 560,
    maxHeight: '92%',
    alignSelf: 'center',
    padding: 22,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E5D9C1',
    backgroundColor: '#FFFDF7',
    elevation: 8,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  eyebrow: {
    color: '#8C7955',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
  },
  title: {
    marginTop: 3,
    color: '#352F25',
    fontSize: 27,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  close: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#F2EBDD',
  },
  closeText: { color: '#554A37', fontSize: 27, lineHeight: 30 },
  label: {
    marginTop: 17,
    marginBottom: 8,
    color: '#6F644F',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  input: {
    minHeight: 46,
    paddingHorizontal: 13,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E6DDCC',
    borderRadius: 10,
    backgroundColor: '#FFFEFA',
    color: '#352F25',
    fontSize: 14,
  },
  description: { minHeight: 74, textAlignVertical: 'top' },
  datePicker: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#E8DFCF',
  },
  dayButton: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17,
    backgroundColor: '#F2EBDD',
  },
  dayButtonText: { color: '#554A37', fontSize: 23, lineHeight: 26 },
  dateText: { color: '#40382B', fontSize: 13, fontWeight: '700' },
  helper: {
    marginTop: 6,
    color: '#827864',
    fontSize: 11,
    lineHeight: 16,
  },
  saveButton: {
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22,
    marginBottom: 8,
    borderRadius: 12,
    backgroundColor: '#5A7656',
  },
  saveText: { color: '#FFFDF7', fontSize: 14, fontWeight: '800', letterSpacing: 0.5 },
  disabled: { opacity: 0.45 },
  pressed: { opacity: 0.76, transform: [{ scale: 0.985 }] },
});