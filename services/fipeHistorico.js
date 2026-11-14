
const BASE = 'https://fipe.parallelum.com.br/api/v2/cars';

async function consultar(url) {
  const resposta = await fetch(url);

  if (resposta.status === 429) {
    throw new Error('Limite de consultas da FIPE atingido.');
  }

  if (!resposta.ok) {
    throw new Error(`Erro na API FIPE: ${resposta.status}`);
  }

  return resposta.json();
}

export function buscarMarcas() {
  return consultar(`${BASE}/brands`);
}

export function buscarModelos(marcaId) {
  return consultar(
    `${BASE}/brands/${encodeURIComponent(marcaId)}/models`
  );
}

export function buscarAnos(marcaId, modeloId) {
  return consultar(
    `${BASE}/brands/${encodeURIComponent(marcaId)}/models/${encodeURIComponent(modeloId)}/years`
  );
}

export function buscarHistorico(codigoFipe, anoId) {
  return consultar(
    `${BASE}/${encodeURIComponent(codigoFipe)}/years/${encodeURIComponent(anoId)}/history`
  );
}

export function buscarDetalhes(marcaId, modeloId, anoId) {
  return consultar(
    `${BASE}/brands/${encodeURIComponent(marcaId)}/models/${encodeURIComponent(modeloId)}/years/${encodeURIComponent(anoId)}`
  );
}

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
