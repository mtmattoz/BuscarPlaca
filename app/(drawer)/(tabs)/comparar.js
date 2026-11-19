
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
  Linking,
  Modal,
  FlatList,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import {
  buscarMarcas,
  buscarModelos,
  buscarAnos,
  buscarDetalhes,
  buscarHistorico,
  prepararHistorico,
  compararHistoricos,
} from '../../../services/fipeHistorico';

import { buscarImagemVeiculo } from '../../../services/imagensVeiculos';
import GraficoDesvalorizacao from '../../../components/GraficoDesvalorizacao';

const carroVazio = () => ({
  marca: '',
  modelo: '',
  ano: '',
  modelos: [],
  anos: [],
});

// SELETOR COM MODAL
function Seletor({
  titulo,
  valor,
  opcoes,
  onChange,
  habilitado = true,
}) {
  const [aberto, setAberto] = useState(false);
  const [pesquisa, setPesquisa] = useState('');

  const selecionado = opcoes.find(
    item => String(item.code) === String(valor)
  );

  const filtrados = opcoes.filter(item =>
    item.name.toLowerCase().includes(
      pesquisa.trim().toLowerCase()
    )
  );

  function escolher(item) {
    onChange(String(item.code));
    setAberto(false);
    setPesquisa('');
  }

  return (
    <View style={styles.campo}>
      <Text style={styles.label}>{titulo}</Text>

      <TouchableOpacity
        style={[
          styles.pickerContainer,
          !habilitado && styles.seletorDesabilitado,
        ]}
        onPress={() => {
          if (habilitado) setAberto(true);
        }}
        disabled={!habilitado}
        activeOpacity={0.75}
      >
        <Text
          style={[
            styles.seletorTexto,
            !selecionado && styles.seletorPlaceholder,
          ]}
          numberOfLines={1}
        >
          {selecionado?.name ||
            (habilitado
              ? 'Toque para selecionar'
              : 'Selecione o campo anterior')}
        </Text>

        <Ionicons
          name="chevron-down"
          size={20}
          color="#6B7280"
        />
      </TouchableOpacity>

      <Modal
        visible={aberto}
        animationType="slide"
        transparent
        onRequestClose={() => setAberto(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.modalFundo}
        >
          <Pressable
            style={styles.modalFora}
            onPress={() => {
              setAberto(false);
              setPesquisa('');
            }}
          />

          <View style={styles.modalConteudo}>
            <View style={styles.modalCabecalho}>
              <Text style={styles.modalTitulo}>
                {titulo}
              </Text>

              <TouchableOpacity
                onPress={() => {
                  setAberto(false);
                  setPesquisa('');
                }}
              >
                <Ionicons
                  name="close"
                  size={25}
                  color="#374151"
                />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.busca}
              placeholder="Pesquisar opção..."
              placeholderTextColor="#9CA3AF"
              value={pesquisa}
              onChangeText={setPesquisa}
              autoCorrect={false}
            />

            <FlatList
              data={filtrados}
              keyExtractor={item => String(item.code)}
              keyboardShouldPersistTaps="always"
              ListEmptyComponent={
                <Text style={styles.listaVazia}>
                  Nenhuma opção encontrada.
                </Text>
              }
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.opcao}
                  onPress={() => escolher(item)}
                >
                  <Text style={styles.opcaoTexto}>
                    {item.name}
                  </Text>

                  {String(item.code) === String(valor) && (
                    <Ionicons
                      name="checkmark"
                      size={20}
                      color="#2563EB"
                    />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

// FOTO DO VEÍCULO
function FotoVeiculo({ imagem }) {
  if (!imagem?.url) {
    return (
      <View style={styles.semFoto}>
        <Ionicons
          name="car-outline"
          size={48}
          color="#94A3B8"
        />
        <Text style={styles.textoSecundario}>
          Foto não disponível
        </Text>
      </View>
    );
  }

  return (
    <View>
      <Image
        source={{ uri: imagem.url }}
        style={styles.foto}
        resizeMode="contain"
      />

      <TouchableOpacity
        onPress={() =>
          imagem.fonte && Linking.openURL(imagem.fonte)
        }
      >
        <Text style={styles.linkFoto}>
          Foto ilustrativa • Ver fonte e licença
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// TELA PRINCIPAL
export default function Comparar() {
  const [marcas, setMarcas] = useState([]);

  const [carros, setCarros] = useState([
    carroVazio(),
    carroVazio(),
  ]);

  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [resultado, setResultado] = useState(null);

  // CARREGAR MARCAS DA API
  useEffect(() => {
    async function carregarMarcas() {
      try {
        const dados = await buscarMarcas();
        setMarcas(dados);
      } catch (e) {
        setErro('Não foi possível carregar as marcas.');
      }
    }

    carregarMarcas();
  }, []);

  function atualizarCarro(indice, alteracoes) {
    setCarros(anteriores =>
      anteriores.map((carro, i) =>
        i === indice
          ? { ...carro, ...alteracoes }
          : carro
      )
    );

    setResultado(null);
  }

  // SELECIONAR MARCA
  async function escolherMarca(indice, marca) {
    setErro('');

    atualizarCarro(indice, {
      marca,
      modelo: '',
      ano: '',
      modelos: [],
      anos: [],
    });

    if (!marca) return;

    try {
      const modelos = await buscarModelos(marca);

      setCarros(anteriores =>
        anteriores.map((carro, i) =>
          i === indice && carro.marca === marca
            ? { ...carro, modelos }
            : carro
        )
      );
    } catch {
      setErro('Erro ao carregar os modelos.');
    }
  }

  // SELECIONAR MODELO
  async function escolherModelo(indice, modelo) {
    setErro('');

    atualizarCarro(indice, {
      modelo,
      ano: '',
      anos: [],
    });

    if (!modelo) return;

    try {
      const marca = carros[indice].marca;

      const anos = await buscarAnos(marca, modelo);

      setCarros(anteriores =>
        anteriores.map((carro, i) =>
          i === indice && carro.modelo === modelo
            ? { ...carro, anos }
            : carro
        )
      );
    } catch {
      setErro('Erro ao carregar os anos.');
    }
  }

  // REALIZAR COMPARAÇÃO
  async function compararVeiculos() {
    if (
      carros.some(carro =>
        !carro.marca || !carro.modelo || !carro.ano
      )
    ) {
      setErro(
        'Selecione marca, modelo e ano dos dois veículos.'
      );
      return;
    }

    setErro('');
    setResultado(null);
    setCarregando(true);

    try {
      const veiculos = await Promise.all(
        carros.map(async carro => {
          const detalhes = await buscarDetalhes(
            carro.marca,
            carro.modelo,
            carro.ano
          );

          if (!detalhes.codeFipe) {
            throw new Error(
              'Código FIPE não disponível para este veículo.'
            );
          }

          const resposta = await buscarHistorico(
            detalhes.codeFipe,
            carro.ano
          );

          const historico = prepararHistorico(resposta);

          const marcaNome =
            marcas.find(
              item => String(item.code) === carro.marca
            )?.name || detalhes.brand;

          const modeloNome =
            carro.modelos.find(
              item => String(item.code) === carro.modelo
            )?.name || detalhes.model;

          const imagem = await buscarImagemVeiculo(
            marcaNome,
            modeloNome,
            detalhes.modelYear
          );

          return {
            ...detalhes,
            historico,
            imagem,
          };
        })
      );

      const pontos = compararHistoricos(
        veiculos[0].historico,
        veiculos[1].historico
      );

      setResultado({
        veiculos,
        pontos,
      });
    } catch (e) {
      setErro(
        e.message || 'Erro ao comparar os veículos.'
      );
    } finally {
      setCarregando(false);
    }
  }

  function formatarPercentual(valor) {
    return `${valor > 0 ? '+' : ''}${valor.toFixed(2)}%`;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.titulo}>
        Comparar veículos
      </Text>

      <Text style={styles.descricao}>
        Selecione dois carros para comparar a evolução
        dos preços na Tabela FIPE.
      </Text>

      {/* SELEÇÃO DOS DOIS VEÍCULOS */}
      {carros.map((carro, indice) => (
        <View key={indice} style={styles.card}>
          <View style={styles.cabecalhoCard}>
            <Ionicons
              name="car-sport-outline"
              size={26}
              color={
                indice === 0 ? '#2563EB' : '#F97316'
              }
            />

            <Text style={styles.cardTitulo}>
              Veículo {indice + 1}
            </Text>
          </View>

          <Seletor
            titulo="Marca"
            valor={carro.marca}
            opcoes={marcas}
            onChange={valor =>
              escolherMarca(indice, valor)
            }
          />

          <Seletor
            titulo="Modelo"
            valor={carro.modelo}
            opcoes={carro.modelos}
            habilitado={!!carro.marca && carro.modelos.length > 0}
            onChange={valor =>
              escolherModelo(indice, valor)
            }
          />

          <Seletor
            titulo="Ano e combustível"
            valor={carro.ano}
            opcoes={carro.anos}
            habilitado={!!carro.modelo && carro.anos.length > 0}
            onChange={valor =>
              atualizarCarro(indice, { ano: valor })
            }
          />
        </View>
      ))}

      {/* BOTÃO COMPARAR */}
      <TouchableOpacity
        style={[
          styles.botao,
          carregando && styles.botaoDesativado,
        ]}
        onPress={compararVeiculos}
        disabled={carregando}
        activeOpacity={0.8}
      >
        {carregando ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <>
            <Ionicons
              name="stats-chart-outline"
              size={21}
              color="#FFFFFF"
            />
            <Text style={styles.botaoTexto}>
              Comparar veículos
            </Text>
          </>
        )}
      </TouchableOpacity>

      {/* MENSAGEM DE ERRO */}
      {!!erro && (
        <View style={styles.erro}>
          <Ionicons
            name="alert-circle-outline"
            size={20}
            color="#DC2626"
          />
          <Text style={styles.erroTexto}>
            {erro}
          </Text>
        </View>
      )}

      {/* RESULTADOS */}
      {resultado && (
        <View style={styles.resultados}>
          <Text style={styles.tituloResultado}>
            Resultado da comparação
          </Text>

          {resultado.veiculos.map(
            (veiculo, indice) => (
              <View key={indice} style={styles.card}>
                <Text style={styles.cardTitulo}>
                  {veiculo.brand} — {veiculo.model}
                </Text>

                <Text style={styles.textoSecundario}>
                  Ano-modelo: {veiculo.modelYear}
                </Text>

                <FotoVeiculo
                  imagem={veiculo.imagem}
                />

                <Text style={styles.textoSecundario}>
                  Valor FIPE atual informado:
                </Text>

                <Text style={styles.preco}>
                  {veiculo.price || 'Não disponível'}
                </Text>

                <Text style={styles.textoSecundario}>
                  Registros históricos disponíveis:
                  {' '}{veiculo.historico.length}
                </Text>
              </View>
            )
          )}

          {/* GRÁFICO */}
          <GraficoDesvalorizacao
            dados={resultado.pontos}
          />

          {/* PORCENTAGEM */}
          {resultado.pontos.length >= 2 && (
            <View style={styles.card}>
              <Text style={styles.cardTitulo}>
                Variação no período analisado
              </Text>

              <Text style={styles.periodo}>
                {resultado.pontos[0].mes} até{' '}
                {resultado.pontos[
                  resultado.pontos.length - 1
                ].mes}
              </Text>

              <Text style={styles.textoResultado}>
                Veículo 1:{' '}
                {formatarPercentual(
                  resultado.pontos[
                    resultado.pontos.length - 1
                  ].variacaoA
                )}
              </Text>

              <Text style={styles.textoResultado}>
                Veículo 2:{' '}
                {formatarPercentual(
                  resultado.pontos[
                    resultado.pontos.length - 1
                  ].variacaoB
                )}
              </Text>

              <Text style={styles.textoSecundario}>
                Percentuais negativos indicam
                desvalorização. Percentuais positivos
                indicam valorização.
              </Text>

              <Text style={styles.textoSecundario}>
                A comparação utiliza somente os meses
                disponíveis para ambos os veículos.
              </Text>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  conteudo: {
    padding: 22,
    paddingBottom: 50,
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1B2A4A',
    marginBottom: 10,
  },

  descricao: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 22,
    marginBottom: 22,
  },

  card: {
    paddingVertical: 22,
    borderTopWidth: 1,
    borderColor: '#D1D5DB',
    marginBottom: 16,
  },

  cabecalhoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 18,
  },

  cardTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1B2A4A',
    marginBottom: 8,
  },

  campo: {
    marginBottom: 15,
  },

  label: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '600',
    marginBottom: 7,
  },

  pickerContainer: {
    borderBottomWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: '#F5F5F5',
    minHeight: 54,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },

  seletorDesabilitado: {
    backgroundColor: '#F1F5F9',
    opacity: 0.65,
  },

  seletorTexto: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
  },

  seletorPlaceholder: {
    color: '#6B7280',
  },

  modalFundo: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.35)',
  },

  modalFora: {
    flex: 1,
  },

  modalConteudo: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 22,
    height: '75%',
  },

  modalCabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },

  modalTitulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1B2A4A',
  },

  busca: {
    borderBottomWidth: 1,
    borderColor: '#94A3B8',
    paddingHorizontal: 10,
    paddingVertical: 14,
    fontSize: 16,
    color: '#111827',
    marginBottom: 12,
  },

  opcao: {
    paddingVertical: 17,
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },

  opcaoTexto: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },

  listaVazia: {
    textAlign: 'center',
    color: '#6B7280',
    marginTop: 30,
  },

  botao: {
    backgroundColor: '#1B2A4A',
    borderRadius: 5,
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },

  botaoDesativado: {
    opacity: 0.6,
  },

  botaoTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

  erro: {
    flexDirection: 'row',
    backgroundColor: '#FEF2F2',
    borderLeftWidth: 3,
    borderLeftColor: '#DC2626',
    padding: 14,
    marginTop: 18,
    gap: 10,
  },

  erroTexto: {
    flex: 1,
    color: '#DC2626',
    fontSize: 13,
  },

  resultados: {
    marginTop: 28,
  },

  tituloResultado: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#1B2A4A',
    marginBottom: 16,
  },

  foto: {
    width: '100%',
    height: 210,
    marginVertical: 15,
  },

  semFoto: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },

  linkFoto: {
    color: '#2563EB',
    fontSize: 12,
    marginBottom: 15,
  },

  textoSecundario: {
    color: '#6B7280',
    fontSize: 13,
    lineHeight: 21,
    marginTop: 6,
  },

  preco: {
    fontSize: 32,
    color: '#1B2A4A',
    fontWeight: 'bold',
    marginVertical: 10,
  },

  periodo: {
    color: '#6B7280',
    marginBottom: 15,
  },

  textoResultado: {
    fontSize: 17,
    fontWeight: '600',
    color: '#111827',
    marginVertical: 7,
  },
});
