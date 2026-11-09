
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CardFipe({ precos }) {
  const lista = Array.isArray(precos) ? precos : [];

  return (
    <View style={styles.card}>
      <View style={styles.cabecalho}>
        <Ionicons name="pricetag-outline" size={24} color="#2563EB" />
        <Text style={styles.titulo}>Tabela FIPE</Text>
      </View>

      {lista.length === 0 ? (
        <Text style={styles.aviso}>
          Valor FIPE não disponível para este veículo.
        </Text>
      ) : (
        lista.map((item, indice) => (
          <View key={`${item.codeFipe}-${indice}`} style={styles.precoItem}>
            <Text style={styles.label}>VALOR DE REFERÊNCIA</Text>

            <Text style={styles.valor}>
              {item.price || 'Não informado'}
            </Text>

            <Text style={styles.modelo}>
              {item.model || 'Modelo não informado'}
            </Text>

            <Text style={styles.codigo}>
              Código FIPE: {item.codeFipe || 'Não informado'}
            </Text>
          </View>
        ))
      )}

      <View style={styles.rodape}>
        <Ionicons name="information-circle-outline" size={17} color="#6B7280" />
        <Text style={styles.aviso}>
          O valor é uma referência de mercado. Verifique a versão
          exata do veículo antes de utilizá-lo.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 22,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginTop: 18,
  },
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 18,
  },
  titulo: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#111827',
  },
  precoItem: {
    backgroundColor: '#EFF6FF',
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
  },
  label: {
    color: '#6B7280',
    fontSize: 11,
    fontWeight: 'bold',
  },
  valor: {
    color: '#2563EB',
    fontSize: 27,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  modelo: {
    fontSize: 15,
    color: '#111827',
    fontWeight: '600',
  },
  codigo: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 8,
  },
  rodape: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginTop: 8,
  },
  aviso: {
    color: '#6B7280',
    fontSize: 12,
    lineHeight: 19,
    flexShrink: 1,
  },
});
