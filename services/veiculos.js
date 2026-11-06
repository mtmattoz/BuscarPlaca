export async function buscarVeiculo(placa) {
  const url = `https://fipe.parallelum.com.br/api/v2/plates/${placa}`;

  const resposta = await fetch(url);

  if (!resposta.ok) {
    throw new Error('Não foi possível consultar o veículo.');
  }

  return await resposta.json();
}