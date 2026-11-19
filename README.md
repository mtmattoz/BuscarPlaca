# BuscarPlaca

**Aplicativo de consulta e comparação de veículos, desenvolvido com React Native e Expo.**

## Sobre o projeto

O BuscarPlaca é um aplicativo mobile desenvolvido para facilitar a consulta de informações de veículos por meio da placa.

A aplicação permite pesquisar placas brasileiras, tanto no padrão antigo quanto no Mercosul, e visualizar informações como marca, modelo, ano, cor, combustível e outros dados disponíveis na API.

Além disso, o aplicativo apresenta valores de referência da Tabela FIPE e mantém um histórico das consultas realizadas.

O projeto também conta com uma funcionalidade de comparação entre dois veículos, permitindo analisar a evolução dos preços ao longo dos anos, visualizar imagens dos modelos selecionados e identificar a porcentagem de valorização ou desvalorização de cada veículo.

## Motivação

Sempre gostei de carros e tive curiosidade de conhecer diferentes modelos, versões e características dos veículos que vejo no dia a dia.

Foi a partir desse interesse que surgiu a ideia de criar o BuscarPlaca, unindo minha curiosidade pelo mundo automotivo com a oportunidade de colocar em prática meus conhecimentos em desenvolvimento mobile.

O objetivo foi desenvolver uma aplicação simples, intuitiva e funcional que permitisse consultar informações de veículos de maneira rápida, além de possibilitar uma análise da evolução de seus valores no mercado automotivo.

## Funcionalidades

- **Início:** apresentação do aplicativo, acesso rápido à consulta e resumo do histórico.
- **Consultar:** pesquisa de veículos pela placa, com validação dos padrões brasileiro antigo e Mercosul.
- **Resultado:** exibição das informações retornadas pela API, incluindo os valores disponíveis da Tabela FIPE.
- **Comparar:** seleção de dois veículos por marca, modelo e ano, permitindo comparar seus valores, visualizar imagens e analisar o histórico de preços por meio de um gráfico de linhas.
- **Histórico:** armazenamento local das consultas, permitindo visualizar novamente os resultados e excluir registros.
- **Sobre:** apresentação do projeto, sua motivação e tecnologias utilizadas.

O aplicativo também possui indicadores de carregamento, tratamento de erros e navegação por menus inferior e lateral.

## Comparação de veículos

A funcionalidade de comparação permite selecionar dois veículos de diferentes marcas, modelos, versões e anos.

A partir dos veículos selecionados, o aplicativo realiza consultas às APIs externas para obter os valores atuais da Tabela FIPE, o histórico de preços disponível e imagens de referência dos modelos.

Os dados históricos são organizados cronologicamente e apresentados em um gráfico de linhas, no qual cada linha representa um dos veículos selecionados.

A porcentagem de valorização ou desvalorização é calculada com base na diferença entre o valor inicial e o valor final do período analisado.

A fórmula utilizada é:

Variação (%) = ((Valor final - Valor inicial) / Valor inicial) × 100

Resultados negativos representam desvalorização, enquanto resultados positivos representam valorização.

A comparação considera os períodos disponíveis em comum para os dois veículos, permitindo analisar a evolução de seus preços ao longo dos anos.

## Tecnologias utilizadas

- **React Native:** desenvolvimento da interface mobile.
- **Expo:** configuração e execução do aplicativo.
- **JavaScript:** linguagem de programação.
- **Expo Router:** navegação baseada em arquivos (File-Based Routing).
- **Stack, Tabs e Drawer:** organização da navegação entre telas.
- **Fetch API:** realização de requisições HTTP.
- **AsyncStorage:** armazenamento local do histórico.
- **React Hooks:** gerenciamento de estado e efeitos com `useState`, `useEffect` e `useFocusEffect`.
- **StyleSheet e Flexbox:** estilização e organização das interfaces.
- **SafeAreaView:** respeito às áreas seguras dos dispositivos móveis.
- **React Native Chart Kit:** construção do gráfico de comparação dos veículos.
- **React Native SVG:** suporte à renderização dos gráficos.
- **Ionicons:** utilização de ícones nas interfaces e nos menus de navegação.
- **Modal e FlatList:** criação dos seletores de marcas, modelos e anos, com possibilidade de pesquisa.

## APIs utilizadas

### Parallelum

Responsável pela consulta de informações de veículos por meio da placa, obtenção dos valores atuais da Tabela FIPE e busca de marcas, modelos e anos disponíveis para comparação.

https://fipe.parallelum.com.br/

### FipeData

Responsável pela obtenção do histórico de preços dos veículos.

A API permite consultar registros históricos utilizando o código FIPE e o ano-modelo do veículo. Esses dados são utilizados para calcular a porcentagem de valorização ou desvalorização e construir o gráfico de comparação.

https://fipe.zuirx.com/

### Wikimedia Commons

Responsável pela busca de imagens de referência dos veículos selecionados na tela de comparação.

A pesquisa é realizada utilizando informações como marca, modelo e ano do veículo.

https://commons.wikimedia.org/

Todas as integrações são realizadas utilizando `fetch`, com tratamento de respostas, erros e estados de carregamento.

Os dados apresentados dependem da disponibilidade das APIs. Os valores da Tabela FIPE são referências de mercado, os períodos históricos dependem dos registros disponíveis e as imagens possuem caráter ilustrativo.

## Navegação

O aplicativo utiliza o Expo Router com File-Based Routing, em que a navegação é organizada de acordo com os arquivos e diretórios do projeto.

Foram utilizados três tipos de navegadores:

- **Stack:** responsável pela navegação entre as telas principais e a tela de resultado.
- **Tabs:** responsável pelo menu inferior do aplicativo.
- **Drawer:** responsável pelo menu lateral, permitindo acessar as principais funcionalidades.

## Armazenamento local

O armazenamento das consultas é realizado utilizando AsyncStorage, permitindo que os dados permaneçam salvos no dispositivo mesmo após o fechamento do aplicativo.

O usuário pode acessar consultas anteriores sem realizar uma nova requisição à API, excluir registros individualmente ou limpar todo o histórico.

## Componentização

O projeto utiliza componentes separados e reutilizáveis para melhorar a organização do código e facilitar sua manutenção.

- **CardFipe:** responsável por apresentar os valores de referência da Tabela FIPE na tela de resultado.
- **GraficoDesvalorizacao:** responsável por receber os dados históricos dos veículos e apresentar a evolução percentual dos preços em um gráfico de linhas.
- **Seletor:** responsável pela seleção de marcas, modelos e anos dos veículos.
- **FotoVeiculo:** responsável pela exibição das imagens dos veículos na tela de comparação.

Também foram criados serviços separados para realizar requisições às APIs e gerenciar o armazenamento local.

## Organização do projeto

```text
BuscarPlaca/
├── app/
│   ├── _layout.js
│   ├── resultado.js
│   └── (drawer)/
│       ├── _layout.js
│       └── (tabs)/
│           ├── _layout.js
│           ├── index.js
│           ├── consulta.js
│           ├── comparar.js
│           ├── historico.js
│           └── sobre.js
├── components/
│   ├── CardFipe.js
│   └── GraficoDesvalorizacao.js
├── services/
│   ├── veiculos.js
│   ├── historico.js
│   ├── fipeHistorico.js
│   └── imagensVeiculos.js
├── assets/
├── utils/
├── app.json
├── package.json
└── README.md
```

## Como executar

É necessário ter o Node.js instalado e utilizar o Expo Go no dispositivo móvel.

**1. Clone o repositório:**

```bash
git clone https://github.com/mtmattoz/BuscarPlaca.git
```

**2. Acesse a pasta do projeto:**

```bash
cd BuscarPlaca
```

**3. Instale as dependências:**

```bash
npm install
```

**4. Inicie o Expo:**

```bash
npx expo start --tunnel
```

**5.** Abra o Expo Go no celular e escaneie o QR Code apresentado no terminal.

## Apoio de Inteligência Artificial

Durante o desenvolvimento, foi utilizado o ChatGPT (OpenAI, GPT-6) como ferramenta de apoio para explicação de conceitos, configuração do ambiente, sugestões para resolução de erros, escolha de ícones, procura de APIs, estudo de recursos complementares aos conteúdos apresentados na disciplina e revisão gramatical dos textos.

## Desenvolvedores

**Mateus de Mattos e Lucas Diniz**

**GitHub:** https://github.com/mtmattoz/BuscarPlaca