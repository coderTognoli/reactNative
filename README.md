# React Native: exercícios e anotações

Repositório criado para acompanhar meus estudos de React Native por meio de pequenos projetos práticos. Cada pasta numerada representa uma etapa independente do aprendizado.

## Estrutura do repositório

| Pasta | Conteúdo | Conceitos praticados |
| --- | --- | --- |
| [`01_app`](01_app) | Primeiro aplicativo | Estrutura inicial de um app Expo, componentes básicos, estilos e exibição de dados |
| [`02_variaveis`](02_variaveis) | Exercícios com variáveis | Declaração de variáveis, operações matemáticas, média, condicionais e `switch` |
| [`03_componentes`](03_componentes) | Uso de componentes | Componentes reutilizáveis, props, lista de pessoas com `FlatList` e execução para Web |

Os projetos são mantidos separados para que cada exercício tenha sua própria configuração, dependências e ponto de entrada. O repositório `reactNative` é a pasta principal que reúne todos eles.

## Arquivos importantes

Cada miniprojeto possui alguns arquivos de configuração próprios:

- `App.tsx`: tela principal e ponto de partida da aplicação.
- `index.ts`: entrada usada pelo Expo para iniciar o app.
- `package.json`: dependências, scripts e metadados do projeto.
- `package-lock.json`: registra as versões exatas instaladas pelo npm.
- `app.json`: configurações do aplicativo Expo.
- `tsconfig.json`: configurações do TypeScript.
- `assets/`: imagens e ícones usados pelo Expo.
- `.gitignore`: impede que dependências, caches, builds e arquivos sensíveis sejam publicados.

### Por que existem `AGENTS.md`, `CLAUDE.md` e `.claude/`?

Esses arquivos são instruções de desenvolvimento para ferramentas de inteligência artificial e agentes de código:

- `AGENTS.md`: orienta agentes que trabalham no projeto, indicando cuidados e regras locais.
- `CLAUDE.md`: referencia as instruções específicas do `AGENTS.md` para ferramentas compatíveis com esse formato.
- `.claude/settings.json`: configurações locais relacionadas ao uso dessas ferramentas.

Eles não fazem parte da execução do aplicativo. Servem para manter as mesmas orientações quando o código é analisado ou alterado com auxílio de agentes de programação.

## Tecnologias e ferramentas

- **React Native**: criação das interfaces para dispositivos móveis.
- **Expo 54**: ambiente e ferramentas para desenvolver e executar os aplicativos.
- **React 19.1**: biblioteca usada pela interface dos projetos.
- **TypeScript**: tipagem e organização do código (`.ts` e `.tsx`).
- **React Native Web**: execução do terceiro projeto no navegador.
- **Node.js e npm**: instalação de dependências e execução dos scripts.
- **Git e GitHub**: controle de versões e publicação do repositório.
- **Visual Studio Code**: editor utilizado no desenvolvimento.
- **PowerShell**: terminal utilizado no ambiente Windows.

## Como executar um projeto

Entre na pasta do exercício desejado e instale as dependências:

```powershell
cd 03_componentes
npm install
```

Inicie o projeto no navegador:

```powershell
npm run web
```

Para iniciar o servidor Expo sem escolher uma plataforma:

```powershell
npm start
```

Os mesmos comandos podem ser usados nas pastas `01_app` e `02_variaveis`. Cada projeto possui seus próprios scripts `start`, `android`, `ios` e `web`.

## Objetivo

Registrar a evolução do aprendizado em React Native, partindo da criação de uma aplicação simples e avançando para lógica básica e composição de componentes reutilizáveis.
