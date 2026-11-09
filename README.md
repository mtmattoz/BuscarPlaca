# BuscarPlaca

**Aplicativo de consulta de veículos pela placa, desenvolvido com React Native e Expo.**

## Sobre o projeto

O BuscarPlaca é um aplicativo mobile desenvolvido para facilitar a consulta de informações de veículos por meio da placa.

A aplicação permite pesquisar placas brasileiras, tanto no padrão antigo quanto no Mercosul, e visualizar informações como marca, modelo, ano, cor, combustível e outros dados disponíveis na API.

Além disso, o aplicativo apresenta valores de referência da Tabela FIPE e mantém um histórico das consultas realizadas.

## Motivação

Sempre gostei de carros e tive curiosidade de conhecer diferentes modelos, versões e características dos veículos que vejo no dia a dia.

Foi a partir desse interesse que surgiu a ideia de criar o BuscarPlaca, unindo minha curiosidade pelo mundo automotivo com a oportunidade de colocar em prática meus conhecimentos em desenvolvimento mobile.

O objetivo foi desenvolver uma aplicação simples, intuitiva e funcional que permitisse consultar informações de veículos de maneira rápida.

## Funcionalidades

- **Início:** apresentação do aplicativo, acesso rápido à consulta e resumo do histórico.
- **Consultar:** pesquisa de veículos pela placa, com validação dos padrões brasileiro antigo e Mercosul.
- **Resultado:** exibição das informações retornadas pela API, incluindo os valores disponíveis da Tabela FIPE.
- **Histórico:** armazenamento local das consultas, permitindo visualizar novamente os resultados e excluir registros.
- **Sobre:** apresentação do projeto, sua motivação e tecnologias utilizadas.

O aplicativo também possui indicadores de carregamento, tratamento de erros e navegação por menus inferior e lateral.

## Tecnologias utilizadas

- **React Native:** desenvolvimento da interface mobile.
- **Expo:** configuração e execução do aplicativo.
- **JavaScript:** linguagem de programação.
- **Expo Router:** navegação baseada em arquivos (File-Based Routing).
- **Stack, Tabs e Drawer:** organização da navegação entre telas.
- **Fetch API:** realização de requisições HTTP.
- **AsyncStorage:** armazenamento local do histórico.
- **React Hooks:** gerenciamento de estado e efeitos com `useState` e `useEffect`.
- **StyleSheet e Flexbox:** estilização e organização das interfaces.

## API utilizada

O aplicativo utiliza a API da Parallelum para consultar informações de veículos por meio da placa.

A integração é realizada utilizando `fetch`, com tratamento de respostas, erros e estados de carregamento.

Os dados apresentados dependem da disponibilidade da API. Os valores da Tabela FIPE são referências de mercado e podem variar conforme a versão e as características do veículo.

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
│           ├── historico.js
│           └── sobre.js
├── components/
│   └── CardFipe.js
├── services/
│   ├── veiculos.js
│   └── historico.js
├── assets/
├── app.json
└── package.json
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

Durante o desenvolvimento, foi utilizado o ChatGPT (OpenAI, GPT-6) como ferramenta de apoio para explicação de conceitos, configuração do ambiente, sugestões nos erros, escolha de ícones, estudo de recursos complementares aos conteúdos que não foram apresentados na disciplina e revisão gramatical dos textos.

##  Desenvolvedores

**Mateus de Mattos e Lucas Diniz**

**GitHub:** https://github.com/mtmattoz/BuscarPlaca
