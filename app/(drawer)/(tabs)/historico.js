
import { useState, useCallback } from 'react';
import {View,Text,FlatList,TouchableOpacity,StyleSheet,Alert,ActivityIndicator,} from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {
  listarHistorico,
  excluirHistorico,
  limparHistorico,
} from '../../../services/historico';

export default function Historico() {
  const [consultas, setConsultas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const router = useRouter();

  const carregarHistorico = useCallback(async () => {
    try {
      setCarregando(true);
      const dados = await listarHistorico();
      setConsultas(dados);
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível carregar o histórico.');
    } finally {
      setCarregando(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarHistorico();
    }, [carregarHistorico])
  );

  function abrirConsulta(item) {
    router.push({
      pathname: '/resultado',
      params: {
        dados: JSON.stringify(item.veiculo),
      },
    });
  }

  function confirmarExclusao(placa) {
    Alert.alert(
      'Excluir consulta',
      `Deseja remover a placa ${placa} do histórico?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await excluirHistorico(placa);
              await carregarHistorico();
            } catch {
              Alert.alert('Erro', 'Não foi possível excluir a consulta.');
            }
          },
        },
      ]
    );
  }

  function confirmarLimpeza() {
    Alert.alert(
      'Limpar histórico',
      'Deseja excluir todas as consultas salvas?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Limpar tudo',
          style: 'destructive',
          onPress: async () => {
            try {
              await limparHistorico();
              setConsultas([]);
            } catch {
              Alert.alert('Erro', 'Não foi possível limpar o histórico.');
            }
          },
        },
      ]
    );
  }

  function renderizarConsulta({ item }) {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => abrirConsulta(item)}
        activeOpacity={0.8}
      >
        <View style={styles.icone}>
          <Ionicons name="car-sport-outline" size={27} color="#2563EB" />
        </View>

        <View style={styles.detalhes}>
          <Text style={styles.placa}>{item.placa}</Text>
          <Text style={styles.modelo}>
            {[item.veiculo?.brand, item.veiculo?.model]
              .filter(Boolean).join(' ') || 'Veículo consultado'}
          </Text>
          <Text style={styles.data}>
            {new Date(item.data).toLocaleDateString('pt-BR')}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => confirmarExclusao(item.placa)}
          style={styles.excluir}
        >
          <Ionicons name="trash-outline" size={22} color="#DC2626" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <View>
          <Text style={styles.titulo}>Histórico</Text>
          <Text style={styles.subtitulo}>
            Suas últimas consultas de veículos
          </Text>
        </View>

        {consultas.length > 0 && (
          <TouchableOpacity onPress={confirmarLimpeza}>
            <Ionicons name="trash-bin-outline" size={24} color="#DC2626" />
          </TouchableOpacity>
        )}
      </View>

      {carregando ? (
        <ActivityIndicator
          size="large"
          color="#2563EB"
          style={{ marginTop: 50 }}
        />
      ) : (
        <FlatList
          data={consultas}
          keyExtractor={(item) => item.placa}
          renderItem={renderizarConsulta}
          contentContainerStyle={styles.lista}
          ListEmptyComponent={
            <View style={styles.vazio}>
              <Ionicons name="time-outline" size={60} color="#9CA3AF" />
              <Text style={styles.vazioTitulo}>Nenhuma consulta ainda</Text>
              <Text style={styles.vazioTexto}>
                Os veículos consultados aparecerão aqui.
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  cabecalho: {
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },
  subtitulo: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 5,
  },
  lista: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    flexGrow: 1,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  icone: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detalhes: {
    flex: 1,
  },
  placa: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#111827',
  },
  modelo: {
    fontSize: 13,
    color: '#4B5563',
    marginTop: 3,
  },
  data: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 5,
  },
  excluir: {
    padding: 8,
  },
  vazio: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 12,
  },
  vazioTitulo: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#374151',
  },
  vazioTexto: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});
