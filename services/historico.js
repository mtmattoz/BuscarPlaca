
import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE_HISTORICO = '@buscarplaca:historico';

export async function listarHistorico() {
  const dados = await AsyncStorage.getItem(CHAVE_HISTORICO);
  return dados ? JSON.parse(dados) : [];
}

export async function salvarHistorico(placa, veiculo) {
  const historico = await listarHistorico();

  const novaConsulta = {
    placa,
    veiculo,
    data: new Date().toISOString(),
  };

  const atualizado = [
    novaConsulta,
    ...historico.filter(item => item.placa !== placa),
  ];

  await AsyncStorage.setItem(
    CHAVE_HISTORICO,
    JSON.stringify(atualizado)
  );
}

export async function excluirHistorico(placa) {
  const historico = await listarHistorico();

  const atualizado = historico.filter(
    item => item.placa !== placa
  );

  await AsyncStorage.setItem(
    CHAVE_HISTORICO,
    JSON.stringify(atualizado)
  );
}

export async function limparHistorico() {
  await AsyncStorage.removeItem(CHAVE_HISTORICO);
}
