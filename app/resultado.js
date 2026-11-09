
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import CardFipe from '../components/CardFipe';

export default function Resultado() {
  const { dados } = useLocalSearchParams();

  let veiculo = {};

  try {
    veiculo = JSON.parse(dados || '{}');
  } catch {
    veiculo = {};
  }

  function Informacao({ titulo, valor }) {
    return (
      <View style={styles.informacao}>
        <Text style={styles.label}>{titulo}</Text>
        <Text style={styles.valor}>{valor ?? 'Não informado'}</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
    >
      <View style={styles.icone}>
        <Ionicons
          name="car-sport-outline"
          size={45}
          color="#2563EB"
        />
      </View>

      <Text style={styles.titulo}>Dados do veículo</Text>
      <Text style={styles.subtitulo}>
        Resultado da consulta pela placa
      </Text>

      <View style={styles.card}>
        <Text style={styles.placa}>
          {veiculo.plate || '---'}
        </Text>

        <Informacao titulo="Marca" valor={veiculo.brand} />
        <Informacao titulo="Modelo" valor={veiculo.model} />
        <Informacao titulo="Ano" valor={veiculo.year} />
        <Informacao titulo="Cor" valor={veiculo.color} />
        <Informacao titulo="Combustível" valor={veiculo.fuel} />
        <Informacao titulo="Cidade" valor={veiculo.city} />
        <Informacao titulo="Estado" valor={veiculo.state} />
        <Informacao titulo="Categoria" valor={veiculo.segment} />
      </View>

      {/* COMPONENTE DA TABELA FIPE */}
      <CardFipe precos={veiculo.fipePrices} />

      <Text style={styles.aviso}>
        Informações fornecidas pela API externa.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  conteudo: {
    padding: 24,
    paddingBottom: 40,
  },

  icone: {
    backgroundColor: '#DBEAFE',
    width: 75,
    height: 75,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },

  titulo: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#111827',
  },

  subtitulo: {
    color: '#6B7280',
    marginTop: 6,
    marginBottom: 25,
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 22,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  placa: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 3,
    color: '#2563EB',
    marginBottom: 20,
  },

  informacao: {
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },

  label: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 5,
  },

  valor: {
    fontSize: 17,
    color: '#111827',
    fontWeight: '600',
  },

  aviso: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 20,
  },
});
