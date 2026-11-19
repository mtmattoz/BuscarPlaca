
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Sobre() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.conteudo}>

        <View style={styles.cabecalho}>
          <Ionicons
            name="car-sport-outline"
            size={38}
            color="#1B2A4A"
          />

          <Text style={styles.nome}>BuscarPlaca.</Text>
        </View>

        <Text style={styles.subtitulo}>
          Consulta e comparação de veículos
        </Text>

        <Text style={styles.versao}>VERSÃO 1.0</Text>

        <View style={styles.linhaDestaque} />

        <Text style={styles.titulo}>Sobre o projeto</Text>

        <Text style={styles.texto}>
          O BuscarPlaca é um aplicativo que permite consultar
          informações de veículos pela placa, como marca, modelo,
          ano, cor e valores da Tabela FIPE.
        </Text>

        <Text style={styles.texto}>
          Também é possível comparar dois carros, visualizar suas
          fotos e acompanhar a evolução dos preços ao longo dos
          anos por meio de um gráfico que mostra a porcentagem
          de valorização ou desvalorização.
        </Text>

        <Text style={styles.texto}>
          As consultas ficam salvas no histórico do aplicativo,
          podendo ser acessadas novamente quando necessário.
        </Text>

        <Text style={styles.titulo}>Como surgiu a ideia?</Text>

        <Text style={styles.texto}>
          Sempre gostei de carros e sempre tive curiosidade de
          pesquisar sobre os diferentes modelos que vejo na rua.
          A ideia do BuscarPlaca surgiu justamente dessa
          curiosidade.
        </Text>

        <Text style={styles.texto}>
          Aproveitei a oportunidade de desenvolver um aplicativo
          sobre um assunto que gosto e colocar em prática os
          conhecimentos adquiridos durante a disciplina.
        </Text>

        <View style={styles.divisoria} />

        <Text style={styles.titulo}>De onde vêm os dados?</Text>

        <Text style={styles.nomeApi}>Parallelum</Text>

        <Text style={styles.texto}>
          Consulta de placas, informações dos veículos e valores
          atuais da Tabela FIPE.
        </Text>

        <Text style={styles.nomeApi}>FipeData</Text>

        <Text style={styles.texto}>
          Consulta do histórico de preços utilizado no gráfico
          de comparação dos veículos.
        </Text>

        <Text style={styles.nomeApi}>Wikimedia Commons</Text>

        <Text style={styles.texto}>
          Busca de imagens de referência dos carros selecionados.
        </Text>

        <View style={styles.divisoria} />

        <Text style={styles.titulo}>Tecnologias utilizadas</Text>

        <Text style={styles.texto}>
          React Native, Expo, JavaScript, Expo Router,
          Fetch API, AsyncStorage, React Native Chart Kit
          e React Native SVG.
        </Text>

        <View style={styles.divisoria} />

        <Text style={styles.titulo}>Desenvolvedores</Text>

        <Text style={styles.desenvolvedor}>
          Mateus de Mattos
        </Text>

        <Text style={styles.desenvolvedor}>
          Lucas Diniz
        </Text>

        <Text style={styles.rodape}>
          Desenvolvido com React Native e Expo.
        </Text>

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
    padding: 26,
    paddingBottom: 45,
  },

  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 20,
  },

  nome: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#1B2A4A',
    letterSpacing: -1.5,
  },

  subtitulo: {
    fontSize: 15,
    color: '#64748B',
    marginTop: 8,
  },

  versao: {
    fontSize: 11,
    letterSpacing: 2,
    color: '#94A3B8',
    marginTop: 10,
  },

  linhaDestaque: {
    width: 50,
    height: 3,
    backgroundColor: '#1B2A4A',
    marginTop: 25,
    marginBottom: 12,
  },

  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1B2A4A',
    marginTop: 24,
    marginBottom: 15,
    letterSpacing: -0.5,
  },

  texto: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 25,
    marginBottom: 14,
  },

  divisoria: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginTop: 15,
    marginBottom: 4,
  },

  nomeApi: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B2A4A',
    marginTop: 5,
    marginBottom: 5,
  },

  desenvolvedor: {
    fontSize: 17,
    color: '#334155',
    marginBottom: 8,
  },

  rodape: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 30,
  },
});
