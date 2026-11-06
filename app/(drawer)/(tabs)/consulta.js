
import { useRouter } from 'expo-router';
import { ActivityIndicator } from 'react-native';
import { buscarVeiculo } from '../../../services/veiculos.js';
import { useState } from 'react';
import { salvarHistorico } from '../../../services/historico';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Consulta() {
  const [placa, setPlaca] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();
  

  function alterarPlaca(texto) {
    const placaFormatada = texto
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '')
      .slice(0, 7);

    setPlaca(placaFormatada);
    setErro('');
  }

  
async function consultarPlaca() {
  Keyboard.dismiss();

  const placaAntiga = /^[A-Z]{3}[0-9]{4}$/;
  const placaMercosul = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/;

  if (!placaAntiga.test(placa) && !placaMercosul.test(placa)) {
    setErro('Digite uma placa válida.');
    return;
  }

  setErro('');
  setCarregando(true);

  try {
    const veiculo = await buscarVeiculo(placa);
    await salvarHistorico(placa, veiculo);

    router.push({
      pathname: '/resultado',
      params: {
        dados: JSON.stringify(veiculo),
      },
    });
  } catch (erro) {
    setErro(erro.message);
  } finally {
    setCarregando(false);
  }
}


  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.conteudo}>
        <View style={styles.iconeContainer}>
          <Ionicons name="car-sport-outline" size={42} color="#2563EB" />
        </View>

        <Text style={styles.titulo}>Consultar veículo</Text>

        <Text style={styles.descricao}>
          Digite a placa do veículo para consultar suas informações.
        </Text>

        <View style={styles.card}>
          <Text style={styles.label}>PLACA DO VEÍCULO</Text>

          <TextInput
            style={styles.input}
            placeholder="ABC1D23"
            placeholderTextColor="#9CA3AF"
            value={placa}
            onChangeText={alterarPlaca}
            autoCapitalize="characters"
            autoCorrect={false}
            maxLength={7}
          />

          {erro !== '' && (
            <View style={styles.erroContainer}>
              <Ionicons name="alert-circle-outline" size={18} color="#DC2626" />
              <Text style={styles.erroTexto}>{erro}</Text>
            </View>
          )}

          
<TouchableOpacity
  style={styles.botao}
  onPress={consultarPlaca}
  activeOpacity={0.8}
  disabled={carregando}
>
  {carregando ? (
    <ActivityIndicator color="#FFFFFF" />
  ) : (
    <>
      <Ionicons name="search-outline" size={21} color="#FFFFFF" />
      <Text style={styles.botaoTexto}>Consultar veículo</Text>
    </>
  )}
</TouchableOpacity>
</View>


        <View style={styles.informacao}>
          <Ionicons
            name="information-circle-outline"
            size={20}
            color="#6B7280"
          />
          <Text style={styles.informacaoTexto}>
            Aceitamos placas no padrão antigo e Mercosul.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  conteudo: {
    flex: 1,
    padding: 24,
    paddingTop: 35,
  },

  iconeContainer: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 22,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 10,
  },

  descricao: {
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 23,
    marginBottom: 30,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 22,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 12,
    letterSpacing: 1,
  },

  input: {
    height: 65,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 26,
    fontWeight: 'bold',
    letterSpacing: 3,
    color: '#111827',
    backgroundColor: '#F9FAFB',
    marginBottom: 18,
  },

  erroContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },

  erroTexto: {
    color: '#DC2626',
    fontSize: 12,
    flex: 1,
  },

  botao: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  botaoTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  informacao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 24,
  },

  informacaoTexto: {
    fontSize: 13,
    color: '#6B7280',
    flex: 1,
  },
});
