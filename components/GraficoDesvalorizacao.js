
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default function GraficoDesvalorizacao({ dados }) {
  if (!Array.isArray(dados) || dados.length < 2) {
    return (
      <View style={styles.card}>
        <Text style={styles.titulo}>Histórico insuficiente</Text>
        <Text style={styles.aviso}>
          Não existem pelo menos dois meses de referência
          em comum para calcular a evolução dos preços.
        </Text>
      </View>
    );
  }

  const amostra = dados.filter((item, indice) => (
    indice === 0 ||
    indice === dados.length - 1 ||
    indice % Math.max(1, Math.ceil(dados.length / 10)) === 0
  ));

  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>Evolução dos preços</Text>

      <Text style={styles.subtitulo}>
        Variação percentual em relação ao primeiro mês
        disponível para ambos os veículos.
      </Text>

      <View style={styles.legenda}>
        <Text style={{ color: '#2563EB' }}>● Veículo 1</Text>
        <Text style={{ color: '#F97316' }}>● Veículo 2</Text>
      </View>

      <ScrollView horizontal>
        <LineChart
          data={{
            labels: amostra.map(item =>
              item.mes?.split(' ').slice(-1)[0] || ''
            ),
            datasets: [
              {
                data: amostra.map(item => item.variacaoA),
                color: () => '#2563EB',
                strokeWidth: 3,
              },
              {
                data: amostra.map(item => item.variacaoB),
                color: () => '#F97316',
                strokeWidth: 3,
              },
            ],
          }}
          width={Math.max(330, amostra.length * 65)}
          height={260}
          withDots
          withShadow={false}
          withInnerLines
          fromZero={false}
          yAxisSuffix="%"
          formatYLabel={valor => Number(valor).toFixed(0)}
          chartConfig={{
            backgroundColor: '#FFFFFF',
            backgroundGradientFrom: '#FFFFFF',
            backgroundGradientTo: '#FFFFFF',
            decimalPlaces: 1,
            color: () => '#64748B',
            labelColor: () => '#64748B',
            propsForDots: {
              r: '3',
            },
          }}
          style={{ borderRadius: 12 }}
        />
      </ScrollView>

      <Text style={styles.aviso}>
        Período: {dados[0].mes} até {dados[dados.length - 1].mes}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  titulo: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#111827',
  },
  subtitulo: {
    color: '#64748B',
    fontSize: 13,
    marginVertical: 12,
    lineHeight: 20,
  },
  legenda: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 15,
  },
  aviso: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 12,
    lineHeight: 19,
  },
});
