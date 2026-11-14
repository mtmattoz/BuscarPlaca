
export async function buscarImagemVeiculo(marca, modelo, ano) {
  const nomeModelo = modelo.split(' ').slice(0, 2).join(' ');
  const pesquisa = `${marca} ${nomeModelo} ${ano} automobile`;

  const parametros = new URLSearchParams({
    action: 'query',
    generator: 'search',
    gsrsearch: pesquisa,
    gsrnamespace: '6',
    gsrlimit: '8',
    prop: 'imageinfo',
    iiprop: 'url|mime',
    iiurlwidth: '600',
    format: 'json',
    origin: '*',
  });

  const url = `https://commons.wikimedia.org/w/api.php?${parametros}`;

  try {
    const resposta = await fetch(url);

    if (!resposta.ok) return null;

    const dados = await resposta.json();
    const paginas = Object.values(dados.query?.pages || {});

    const fotos = paginas.filter(pagina => {
      const info = pagina.imageinfo?.[0];

      return info?.mime?.startsWith('image/') &&
        !pagina.title.toLowerCase().endsWith('.svg') &&
        (info.thumburl || info.url);
    });

    if (fotos.length === 0) return null;

    const escolhida = fotos[0];
    const info = escolhida.imageinfo[0];

    return {
      url: info.thumburl || info.url,
      fonte: info.descriptionurl,
      titulo: escolhida.title,
    };
  } catch (erro) {
    console.log('Imagem indisponível:', erro.message);
    return null;
  }
}
