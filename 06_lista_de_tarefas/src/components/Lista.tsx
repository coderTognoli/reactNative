import { useCallback, useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AddTarefa from './AddTarefa';
import Data from './Data';
import Filtro, { type Filtros } from './Filtro';
import Item from './Item';
import ModalEdit from './ModalEdit';
import Toast from './Toast';

export type CategoriaTarefa =
  | 'Esportes'
  | 'Lazer'
  | 'Trabalho'
  | 'Social'
  | 'Educação';

export type ImportanciaTarefa = 'Baixa' | 'Média' | 'Alta';

export type Tarefa = {
  id: string;
  titulo: string;
  descricao: string;
  categoria: CategoriaTarefa;
  importancia: ImportanciaTarefa;
  data: string;
  inicio: string;
  fim: string;
  concluida: boolean;
};

const dataLocal = (date: Date) => {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
};

const formatarData = (data: string, opcoes: Intl.DateTimeFormatOptions) =>
  new Date(`${data}T12:00:00`).toLocaleDateString('pt-BR', opcoes);

const FILTROS_INICIAIS: Filtros = {
  categoria: 'Todas',
  status: 'Todos',
  importancia: 'Todas',
};

export default function Lista() {
  const hoje = dataLocal(new Date());
  const [dataSelecionada, setDataSelecionada] = useState(hoje);
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [filtros, setFiltros] = useState<Filtros>(FILTROS_INICIAIS);
  const [adicionando, setAdicionando] = useState(false);
  const [editando, setEditando] = useState<Tarefa | null>(null);
  const [toastTarefa, setToastTarefa] = useState<Tarefa | null>(null);
  const [addHovered, setAddHovered] = useState(false);
  const dispensarToast = useCallback(() => setToastTarefa(null), []);

  const tarefasDoDia = useMemo(
    () => tarefas.filter((tarefa) => tarefa.data === dataSelecionada),
    [tarefas, dataSelecionada],
  );
  const tarefasVisiveis = useMemo(
    () =>
      tarefasDoDia
        .filter((tarefa) => {
          if (filtros.categoria !== 'Todas' && tarefa.categoria !== filtros.categoria) {
            return false;
          }
          if (filtros.importancia !== 'Todas' && tarefa.importancia !== filtros.importancia) {
            return false;
          }
          if (filtros.status === 'Pendentes' && tarefa.concluida) return false;
          if (filtros.status === 'Concluídas' && !tarefa.concluida) return false;
          return true;
        })
        .sort((a, b) => a.inicio.localeCompare(b.inicio)),
    [tarefasDoDia, filtros],
  );
  const concluidas = tarefasDoDia.filter((tarefa) => tarefa.concluida).length;
  const inicioSemana = new Date(`${dataSelecionada}T12:00:00`);
  inicioSemana.setDate(inicioSemana.getDate() - inicioSemana.getDay());
  const diasDaSemana = Array.from({ length: 7 }, (_, index) => {
    const dia = new Date(inicioSemana);
    dia.setDate(inicioSemana.getDate() + index);
    return dataLocal(dia);
  });

  const navegarDia = (dias: number) => {
    const data = new Date(`${dataSelecionada}T12:00:00`);
    data.setDate(data.getDate() + dias);
    setDataSelecionada(dataLocal(data));
  };

  const adicionar = (dados: Omit<Tarefa, 'id' | 'concluida'>) => {
    const novaTarefa: Tarefa = {
      ...dados,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      concluida: false,
    };
    setTarefas((atuais) => [...atuais, novaTarefa]);
    setDataSelecionada(dados.data);
    setToastTarefa(novaTarefa);
  };

  const alternarStatus = (id: string) => {
    setTarefas((atuais) =>
      atuais.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa,
      ),
    );
  };

  const excluir = (id: string) => {
    setTarefas((atuais) => atuais.filter((tarefa) => tarefa.id !== id));
    if (editando?.id === id) setEditando(null);
  };

  const salvarEdicao = (tarefaAtualizada: Tarefa) => {
    setTarefas((atuais) =>
      atuais.map((tarefa) =>
        tarefa.id === tarefaAtualizada.id ? tarefaAtualizada : tarefa,
      ),
    );
    setDataSelecionada(tarefaAtualizada.data);
    setEditando(null);
  };

  return (
    <View style={styles.root}>
      <View pointerEvents="none" style={styles.gridBackground}>
        {Array.from({ length: 13 }, (_, index) => (
          <View key={`v${index}`} style={[styles.gridVertical, { left: `${index * 8}%` }]} />
        ))}
        {Array.from({ length: 13 }, (_, index) => (
          <View key={`h${index}`} style={[styles.gridHorizontal, { top: `${index * 8}%` }]} />
        ))}
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.canvas}>
          <View style={styles.masthead}>
            <Text style={styles.mastheadText}>AGENDA ESCOLAR</Text>
          </View>
          <View style={styles.paper}>
            <View pointerEvents="none" style={styles.spiralRail}>
              {Array.from({ length: 12 }, (_, index) => (
                <View key={index} style={styles.spiral} />
              ))}
            </View>
            <View style={styles.paperHeader}>
              <View>
                <Text style={styles.monthLabel}>
                  {formatarData(dataSelecionada, { month: 'long', year: 'numeric' }).toUpperCase()}
                </Text>
                <Text style={styles.dateLabel}>
                  {dataSelecionada === hoje
                    ? 'HOJE'
                    : formatarData(dataSelecionada, { weekday: 'long' }).toUpperCase()}
                </Text>
              </View>
              <View style={styles.paperDate}>
                <Text style={styles.paperDateNumber}>
                  {formatarData(dataSelecionada, { day: '2-digit' })}
                </Text>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Voltar para hoje"
                  onPress={() => setDataSelecionada(hoje)}
                  style={({ pressed }) => [styles.todayButton, pressed && styles.pressed]}
                >
                  <Text style={styles.todayText}>HOJE</Text>
                </Pressable>
              </View>
            </View>

            <View style={styles.weekBar}>
              {diasDaSemana.map((dia) => {
                const selecionado = dia === dataSelecionada;
                return (
                  <Pressable
                    key={dia}
                    accessibilityRole="button"
                    accessibilityLabel={formatarData(dia, {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                    })}
                    accessibilityState={{ selected: selecionado }}
                    onPress={() => setDataSelecionada(dia)}
                    style={({ pressed }) => [
                      styles.weekDay,
                      selecionado && styles.weekDaySelected,
                      pressed && styles.pressed,
                    ]}
                  >
                    <Text style={[styles.weekLabel, selecionado && styles.weekSelectedText]}>
                      {formatarData(dia, { weekday: 'short' }).replace('.', '').toUpperCase()}
                    </Text>
                    <Text style={[styles.weekNumber, selecionado && styles.weekSelectedText]}>
                      {formatarData(dia, { day: 'numeric' })}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
            <View style={styles.coralRule} />

            <View style={styles.summary}>
              <View style={styles.summaryTitleRow}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Dia anterior"
                  onPress={() => navegarDia(-1)}
                  style={({ pressed }) => [styles.navButton, pressed && styles.pressed]}
                >
                  <Text style={styles.navText}>‹</Text>
                </Pressable>
                <Text style={styles.sectionTitle}>PLANOS</Text>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Próximo dia"
                  onPress={() => navegarDia(1)}
                  style={({ pressed }) => [styles.navButton, pressed && styles.pressed]}
                >
                  <Text style={styles.navText}>›</Text>
                </Pressable>
                <Text style={styles.sectionCount}>
                  {tarefasDoDia.length} · {concluidas} ✓
                </Text>
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Adicionar tarefa"
                onPress={() => setAdicionando(true)}
                onHoverIn={() => setAddHovered(true)}
                onHoverOut={() => setAddHovered(false)}
                style={({ pressed }) => [
                  styles.addButton,
                  addHovered && styles.addButtonHovered,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.addPlus}>＋</Text>
              </Pressable>
            </View>

            <Filtro filtros={filtros} onChange={setFiltros} />

            {tarefasVisiveis.length === 0 ? (
              <View style={styles.empty}>
                <Text style={styles.emptyText}>
                  {tarefasDoDia.length ? 'Nenhuma tarefa neste filtro' : 'Toque em + para anotar'}
                </Text>
                {Array.from({ length: 4 }, (_, index) => (
                  <View key={index} style={styles.emptyLine} />
                ))}
              </View>
            ) : (
              <View style={styles.list}>
                {tarefasVisiveis.map((tarefa) => (
                  <Item
                    key={tarefa.id}
                    tarefa={tarefa}
                    onEditar={() => setEditando(tarefa)}
                    onAlternarStatus={() => alternarStatus(tarefa.id)}
                    onExcluir={() => excluir(tarefa.id)}
                  />
                ))}
              </View>
            )}

            <View style={styles.scheduleSection}>
              <View style={styles.scheduleHeading}>
                <Text style={styles.sectionTitle}>TEMPO LIVRE</Text>
                <Text style={styles.scheduleSubtitle}>05 — 23 h</Text>
              </View>
              <Data tarefas={tarefas} data={dataSelecionada} />
            </View>
          </View>
        </View>
      </ScrollView>

      <AddTarefa
        visible={adicionando}
        dataInicial={dataSelecionada}
        tarefas={tarefas}
        onCancel={() => setAdicionando(false)}
        onAdd={adicionar}
      />
      <ModalEdit
        tarefa={editando}
        tarefas={tarefas}
        onClose={() => setEditando(null)}
        onSalvar={salvarEdicao}
      />
      <View pointerEvents="box-none" style={styles.toastPosition}>
        <Toast tarefa={toastTarefa} onDismiss={dispensarToast} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F0E4E7' },
  gridBackground: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    overflow: 'hidden',
  },
  gridVertical: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: '#E8D8DD',
  },
  gridHorizontal: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#E8D8DD',
  },
  scrollContent: { flexGrow: 1, alignItems: 'center', paddingHorizontal: 14, paddingTop: 22, paddingBottom: 30 },
  canvas: { width: '100%', maxWidth: 760 },
  masthead: {
    alignSelf: 'flex-start',
    minHeight: 42,
    justifyContent: 'center',
    marginBottom: 18,
    paddingHorizontal: 14,
    borderRadius: 3,
    backgroundColor: '#171717',
  },
  mastheadText: {
    color: '#FFFFFF',
    fontFamily: 'PermanentMarker_400Regular',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  paper: {
    position: 'relative',
    overflow: 'visible',
    paddingTop: 24,
    paddingRight: 24,
    paddingBottom: 30,
    paddingLeft: 38,
    borderWidth: 1,
    borderColor: '#E4E1DE',
    backgroundColor: '#FAFAF8',
    shadowColor: '#42353A',
    shadowOffset: { width: 8, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 6,
  },
  spiralRail: {
    position: 'absolute',
    top: 26,
    bottom: 28,
    left: -9,
    width: 18,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spiral: {
    width: 21,
    height: 11,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRightColor: '#B7B9BA',
    borderRadius: 7,
    backgroundColor: '#F9F9F8',
    shadowColor: '#535456',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.24,
    shadowRadius: 1,
    elevation: 2,
  },
  paperHeader: {
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  monthLabel: {
    color: '#454443',
    fontFamily: 'PermanentMarker_400Regular',
    fontSize: 12,
    letterSpacing: 1.2,
  },
  dateLabel: {
    marginTop: 3,
    color: '#8D8580',
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 1.3,
  },
  paperDate: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  paperDateNumber: {
    color: '#48A18C',
    fontFamily: 'PermanentMarker_400Regular',
    fontSize: 35,
    lineHeight: 43,
  },
  todayButton: {
    minHeight: 24,
    justifyContent: 'center',
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#DCE6E1',
    borderRadius: 2,
    backgroundColor: '#F6F9F7',
  },
  todayText: { color: '#648278', fontSize: 8, fontWeight: '800', letterSpacing: 0.8 },
  weekBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 10,
  },
  weekDay: {
    flex: 1,
    minHeight: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
  weekDaySelected: { backgroundColor: '#EAF2EE' },
  weekLabel: { color: '#8B8580', fontSize: 7, fontWeight: '700', letterSpacing: 0.3 },
  weekNumber: { marginTop: 3, color: '#464340', fontSize: 11, fontWeight: '700' },
  weekSelectedText: { color: '#388E7A' },
  coralRule: { height: 3, backgroundColor: '#F16B8B' },
  summary: {
    minHeight: 47,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  summaryTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  sectionTitle: {
    color: '#4A4744',
    fontFamily: 'PermanentMarker_400Regular',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  sectionCount: { marginLeft: 7, color: '#8D8580', fontSize: 9, fontWeight: '700' },
  navButton: { width: 23, height: 27, alignItems: 'center', justifyContent: 'center' },
  navText: { color: '#8B8782', fontSize: 21, lineHeight: 23 },
  addButton: {
    width: 31,
    height: 31,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: '#4D9A84',
  },
  addButtonHovered: { backgroundColor: '#357D69', transform: [{ scale: 1.06 }] },
  addPlus: { color: '#FFFFFF', fontSize: 22, lineHeight: 25 },
  list: { marginTop: 6 },
  empty: { paddingTop: 4 },
  emptyText: {
    height: 32,
    color: '#A39D97',
    fontFamily: 'PermanentMarker_400Regular',
    fontSize: 11,
    lineHeight: 25,
  },
  emptyLine: { height: 29, borderBottomWidth: 1, borderColor: '#BDBAB6' },
  scheduleSection: { marginTop: 19, paddingTop: 10, borderTopWidth: 1, borderColor: '#E8E4E1' },
  scheduleHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  scheduleSubtitle: { color: '#B2AAA3', fontSize: 9, fontWeight: '700', letterSpacing: 1 },
  toastPosition: { position: 'absolute', right: 16, bottom: 18, left: 16, alignItems: 'flex-end' },
  pressed: { opacity: 0.76 },
});