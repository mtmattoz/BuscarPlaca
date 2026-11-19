
const BASE = 'https://fipe.parallelum.com.br/api/v2';
const CARROS = `${BASE}/cars`;

const FIPE_HISTORICO = 'https://fipe.zuirx.com/api/consulta';

const MESES = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

async function consultar(url) {
  const resposta = await fetch(url);

  if (resposta.status === 429) {
    throw new Error('Limite de consultas da FIPE atingido.');
  }

  if (resposta.status === 402) {
    throw new Error('Esta consulta exige um plano pago.');
  }

  if (!resposta.ok) {
    throw new Error(`Erro na API FIPE: ${resposta.status}`);
  }

  return resposta.json();
}

// BUSCAR MARCAS
export function buscarMarcas() {
  return consultar(`${CARROS}/brands`);
}

// BUSCAR MODELOS
export function buscarModelos(marcaId) {
  return consultar(`${CARROS}/brands/${marcaId}/models`);
}

// BUSCAR ANOS
export function buscarAnos(marcaId, modeloId) {
  return consultar(
    `${CARROS}/brands/${marcaId}/models/${modeloId}/years`
  );
}

// BUSCAR DETALHES
export function buscarDetalhes(marcaId, modeloId, anoId) {
  return consultar(
    `${CARROS}/brands/${marcaId}/models/${modeloId}/years/${anoId}`
  );
}

// BUSCAR HISTÓRICO PELA NOVA API
export async function buscarHistorico(codigoFipe, anoId) {
  const [ano, combustivel] = String(anoId).split('-');

  const combustiveis = {
    '1': 'g',
    '2': 'a',
    '3': 'd',
  };

  const sigla = combustiveis[combustivel];

  const url =
    `${FIPE_HISTORICO}?fipe=${encodeURIComponent(codigoFipe)}` +
    `&ano_modelo=${ano}&limit=1000`;

  const dados = await consultar(url);

  if (!Array.isArray(dados)) {
    throw new Error('Histórico de preços indisponível.');
  }

  const registros = dados.filter(item =>
    Number(item.ano_modelo) === Number(ano) &&
    (!sigla ||
      String(item.sigla_combustivel).toLowerCase() === sigla)
  );

  const priceHistory = registros.map(item => ({
    reference:
      Number(item.ano_referencia) * 100 +
      Number(item.mes_referencia),

    month:
      `${MESES[item.mes_referencia - 1]} de ${item.ano_referencia}`,

    price: Number(item.valor_centavos) / 100,
  }));

  console.log('Código FIPE:', codigoFipe);
  console.log('Registros históricos:', priceHistory.length);

  return { priceHistory };
}

// CONVERTER PREÇO
export function converterPreco(preco) {
  if (typeof preco === 'number') return preco;

  if (typeof preco !== 'string') return NaN;

  return Number(
    preco
      .replace(/[^\d,.-]/g, '')
      .replace(/\./g, '')
      .replace(',', '.')
  );
}

// ORGANIZAR HISTÓRICO
export function prepararHistorico(dados) {
  if (!Array.isArray(dados?.priceHistory)) return [];

  return dados.priceHistory
    .map(item => ({
      referencia: Number(item.reference),
      mes: item.month,
      preco: converterPreco(item.price),
    }))
    .filter(item =>
      Number.isFinite(item.referencia) &&
      Number.isFinite(item.preco) &&
      item.preco > 0
    )
    .sort((a, b) => a.referencia - b.referencia);
}

// COMPARAR HISTÓRICOS
export function compararHistoricos(historicoA, historicoB) {
  const mapaB = new Map(
    historicoB.map(item => [item.referencia, item])
  );

  const comuns = historicoA
    .filter(item => mapaB.has(item.referencia))
    .map(item => ({
      mes: item.mes,
      referencia: item.referencia,
      precoA: item.preco,
      precoB: mapaB.get(item.referencia).preco,
    }));

  if (comuns.length < 2) return [];

  const inicialA = comuns[0].precoA;
  const inicialB = comuns[0].precoB;

  return comuns.map(item => ({
    ...item,
    variacaoA: ((item.precoA / inicialA) - 1) * 100,
    variacaoB: ((item.precoB / inicialB) - 1) * 100,
  }));
}
