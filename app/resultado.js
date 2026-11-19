
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
    backgroundColor: '#FFFFFF',
  },

  conteudo: {
    padding: 24,
    paddingBottom: 40,
  },

  icone: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1B2A4A',
  },

  subtitulo: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 6,
    marginBottom: 25,
  },

  card: {
    paddingVertical: 15,
  },

  placa: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 4,
    color: '#111827',
    borderWidth: 2,
    borderTopWidth: 12,
    borderColor: '#1B2A4A',
    borderRadius: 5,
    paddingVertical: 15,
    marginBottom: 20,
  },

  informacao: {
    paddingVertical: 17,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 15,
  },

  label: {
    fontSize: 14,
    color: '#64748B',
  },

  valor: {
    fontSize: 15,
    color: '#111827',
    fontWeight: '600',
    flexShrink: 1,
    textAlign: 'right',
  },

  aviso: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 18,
  },
});
