# React Native — exercícios e projetos

Repositório de estudos de React Native com exercícios práticos organizados em projetos independentes. Cada pasta numerada tem suas próprias dependências, configurações Expo e comandos.

## Projetos

| Pasta | Projeto | Conteúdo |
| --- | --- | --- |
| [`01_app`](./01_app) | Primeiro app | Estrutura básica de uma aplicação Expo e renderização de componentes. |
| [`02_variaveis`](./02_variaveis) | Variáveis e lógica | Variáveis, operações, média, condicionais e `switch`. |
| [`03_componentes`](./03_componentes) | Componentes | Componentes reutilizáveis, props e listas com `FlatList`. |
| [`04_soma`](./04_soma) | Soma | Exercício de composição de componentes para realizar uma soma. |
| [`05_to_do_app`](./05_to_do_app) | To-do app | Lista de tarefas com telas de início e detalhes e navegação. |
| [`06_lista_de_tarefas`](./06_lista_de_tarefas) | Agenda escolar | Agenda diária com tarefas, horários, categorias, importância e filtros. |

## Requisitos

- [Node.js](https://nodejs.org/) e npm, em versões compatíveis com o Expo SDK do projeto escolhido.
- Git para clonar o repositório.
- Um navegador para executar a versão Web.
- Opcional: Android Studio e um emulador Android, ou Expo Go em um dispositivo compatível com o SDK usado.
- Para executar no simulador iOS, macOS e Xcode.

Os projetos usam versões diferentes do Expo SDK: `01_app` a `03_componentes` usam SDK 54; `04_soma` a `06_lista_de_tarefas` usam SDK 57. Confira a documentação do SDK do projeto caso precise configurar emuladores ou solucionar incompatibilidades do Expo Go.

## Preparar e executar

Cada exercício é independente. Entre na pasta desejada e instale as dependências daquele projeto:

```bash
cd 06_lista_de_tarefas
npm ci
```

Para iniciar o servidor Expo:

```bash
npm start
```

Para executar diretamente em uma plataforma:

```bash
npm run web
npm run android
npm run ios
```

`npm run ios` requer macOS e Xcode. Para Android, inicie um emulador compatível antes de executar o comando. Também é possível iniciar com `npm start` e seguir as opções e o QR code apresentados pelo Expo.

Repita a instalação de dependências dentro de cada pasta de projeto quando for trabalhar em outro exercício. Não instale dependências na raiz do repositório.

## Tecnologias

- React Native e React.
- Expo para desenvolvimento e execução multiplataforma.
- TypeScript nos projetos que possuem arquivos `.ts` e `.tsx`.
- React Native Web nos projetos com suporte à Web.
- npm e `package-lock.json` para instalar dependências de forma reproduzível.

As versões variam entre os projetos; consulte o `package.json` e o `package-lock.json` de cada pasta.

## Organização dos projetos

Os arquivos de entrada e pastas podem variar conforme o exercício. Em geral, cada projeto pode conter:

- `App.tsx`: componente principal da aplicação.
- `index.ts`: entrada usada pelo Expo.
- `package.json` e `package-lock.json`: dependências e scripts.
- `app.json`: configuração do aplicativo Expo.
- `tsconfig.json`: configuração do TypeScript.
- `assets/`: imagens, ícones e outros recursos.
- `src/`: componentes, telas e tipos, quando aplicável.

## Sobre este repositório

O objetivo é registrar a evolução dos estudos — da estrutura inicial e lógica básica até componentes reutilizáveis, navegação e aplicações práticas. Os projetos permanecem separados para que cada um tenha seu próprio ambiente e ponto de entrada.
