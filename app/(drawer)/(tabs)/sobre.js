
import {View,Text,ScrollView,StyleSheet,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Sobre() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.conteudo}>

        <View style={styles.cabecalho}>
          <View style={styles.icone}>
            <Ionicons
              name="car-sport-outline"
              size={48}
              color="#2563EB"
            />
          </View>

          <Text style={styles.nome}>BuscarPlaca</Text>

          <Text style={styles.subtitulo}>
            Consulta de veículos pela placa
          </Text>

          <Text style={styles.versao}>Versão 1.0</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.tituloCard}>
            <Ionicons
              name="information-circle-outline"
              size={24}
              color="#2563EB"
            />
            <Text style={styles.titulo}>Sobre o projeto</Text>
          </View>

          <Text style={styles.texto}>
            O BuscarPlaca é um aplicativo desenvolvido para
            consultar informações de veículos por meio de suas
            placas. Ele permite visualizar dados como marca,
            modelo, ano, cor e outras características disponíveis
            na API utilizada.
          </Text>

          <Text style={styles.texto}>
            O aplicativo também conta com um histórico de
            consultas, permitindo acessar novamente os veículos
            pesquisados.
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.tituloCard}>
            <Ionicons
              name="heart-outline"
              size={24}
              color="#2563EB"
            />
            <Text style={styles.titulo}>
              Por que criei o BuscarPlaca?
            </Text>
          </View>

          <Text style={styles.texto}>
            Sempre gostei de carros e tive curiosidade de
            conhecer diferentes modelos e descobrir mais
            informações sobre os veículos que vejo no dia a dia.
          </Text>

          <Text style={styles.texto}>
            Foi dessa curiosidade que surgiu a ideia de desenvolver
            o BuscarPlaca, unindo meu interesse pelo mundo
            automotivo com a oportunidade de colocar meus
            conhecimentos em programação em prática.
          </Text>

          <Text style={styles.texto}>
            Meu objetivo foi transformar essa curiosidade em
            um aplicativo simples, prático e funcional.
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.tituloCard}>
            <Ionicons
              name="code-slash-outline"
              size={24}
              color="#2563EB"
            />
            <Text style={styles.titulo}>
              Tecnologias utilizadas
            </Text>
          </View>

          {[
            'React Native',
            'Expo',
            'JavaScript',
            'Expo Router',
            'Fetch API',
            'AsyncStorage',
          ].map((tecnologia) => (
            <View key={tecnologia} style={styles.tecnologia}>
              <Ionicons
                name="checkmark-circle-outline"
                size={19}
                color="#2563EB"
              />

              <Text style={styles.tecnologiaTexto}>
                {tecnologia}
              </Text>
            </View>
          ))}
        </View>

        <Text style={styles.rodape}>
          BuscarPlaca • Desenvolvido com React Native
        </Text>

      </ScrollView>
    </SafeAreaView>
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

  cabecalho: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 15,
  },

  icone: {
    width: 90,
    height: 90,
    borderRadius: 25,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },

  nome: {
    fontSize: 29,
    fontWeight: 'bold',
    color: '#111827',
  },

  subtitulo: {
    color: '#6B7280',
    fontSize: 14,
    marginTop: 6,
  },

  versao: {
    backgroundColor: '#EFF6FF',
    color: '#2563EB',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 12,
    fontSize: 12,
    fontWeight: 'bold',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 22,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  tituloCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 15,
  },

  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
  },

  texto: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 23,
    marginBottom: 12,
  },

  tecnologia: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },

  tecnologiaTexto: {
    fontSize: 15,
    color: '#374151',
  },

  rodape: {
    textAlign: 'center',
    color: '#9CA3AF',
    fontSize: 12,
    marginTop: 12,
  },
});
