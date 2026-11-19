
import { useState, useEffect, useCallback } from 'react';
import {View,Text,ScrollView,TouchableOpacity,StyleSheet,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { listarHistorico } from '../../../services/historico';

export default function Inicio() {
  const router = useRouter();

  const [totalConsultas, setTotalConsultas] = useState(0);

  async function carregarTotal() {
    try {
      const dados = await listarHistorico();
      setTotalConsultas(dados.length);
    } catch (erro) {
      console.log('Erro ao carregar histórico:', erro);
    }
  }

  useEffect(() => {
    carregarTotal();
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarTotal();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.conteudo}>

        <Text style={styles.titulo}>
          Olá, seja bem-vindo!
        </Text>

        <Text style={styles.descricao}>
          Consulte informações de veículos pela placa,
          de forma rápida e prática.
        </Text>

        <View style={styles.cardPrincipal}>
          <Ionicons
            name="car-sport-outline"
            size={45}
            color="#FFFFFF"
          />

          <Text style={styles.cardTitulo}>
            Consulta de veículos
          </Text>

          <Text style={styles.cardDescricao}>
            Descubra os dados disponíveis sobre um veículo
            utilizando apenas sua placa.
          </Text>

          <TouchableOpacity
            style={styles.botaoConsultar}
            onPress={() => router.push('/consulta')}
          >
            <Ionicons name="search-outline" size={20} color="#2563EB" />

            <Text style={styles.botaoTexto}>
              Consultar placa
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.secaoTitulo}>Visão geral</Text>

        <View style={styles.linhaCards}>
          <TouchableOpacity
            style={styles.cardPequeno}
            onPress={() => router.push('/historico')}
          >
            <Ionicons name="time-outline" size={28} color="#2563EB" />

            <Text style={styles.numero}>
              {totalConsultas}
            </Text>

            <Text style={styles.cardTexto}>
              Consultas salvas
            </Text>
          </TouchableOpacity>

          <View style={styles.cardPequeno}>
            <Ionicons
              name="cloud-outline"
              size={28}
              color="##1B2A4A"
            />

            <Text style={styles.apiTitulo}>
              API externa
            </Text>

            <Text style={styles.cardTexto}>
              Dados de veículos
            </Text>
          </View>
        </View>

        <View style={styles.cardInformativo}>
          <Text style={styles.secaoTitulo}>
            Como utilizar?
          </Text>

          <Text style={styles.passo}>
            1. Acesse a tela Consultar e digite uma placa válida.
          </Text>

          <Text style={styles.passo}>
            2. Aguarde a consulta e visualize as informações.
          </Text>

          <Text style={styles.passo}>
            3. Acesse o histórico para rever consultas anteriores.
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
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

  titulo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1B2A4A',
    letterSpacing: -1.5,
    marginBottom: 10,
  },

  descricao: {
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 23,
    marginBottom: 25,
  },

  cardPrincipal: {
    backgroundColor: '#1B2A4A',
    padding: 26,
    borderRadius: 5,
    marginBottom: 30,
  },

  cardTitulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 15,
  },

  cardDescricao: {
    fontSize: 14,
    color: '#DBEAFE',
    lineHeight: 22,
    marginTop: 8,
    marginBottom: 22,
  },

  botaoConsultar: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  botaoTexto: {
    color: '#1B2A4A',
    fontWeight: 'bold',
    fontSize: 16,
  },

  secaoTitulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1B2A4A',
    marginBottom: 18,
  },

  linhaCards: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 25,
  },

  cardPequeno: {
    flex: 1,
    paddingVertical: 18,
    paddingHorizontal: 8,
    borderTopWidth: 2,
    borderColor: '#1B2A4A',
  },

  numero: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1B2A4A',
    marginTop: 12,
  },

  apiTitulo: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#1B2A4A',
    marginTop: 18,
  },

  cardTexto: {
    color: '#6B7280',
    fontSize: 13,
    marginTop: 5,
  },

  cardInformativo: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#D1D5DB',
  },

  passo: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 23,
    marginBottom: 12,
  },
});
