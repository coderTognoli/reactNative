# Agenda Escolar

Uma agenda digital com visual de planner em papel. Organize tarefas por dia, horário, categoria, importância e status.

## Requisitos

- [Node.js](https://nodejs.org/) com npm.
- Git, para clonar o repositório.
- Um navegador para executar a versão web.
- Opcional: Android Studio e um emulador Android, ou o app Expo Go em um dispositivo.
- Para executar no simulador iOS, é necessário macOS com Xcode.

O projeto usa Expo SDK 57, React Native e TypeScript. As versões exatas das dependências estão registradas em `package-lock.json`.

## Preparar o ambiente

1. Clone o repositório e entre na pasta do projeto:

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd 06_lista_de_tarefas
   ```

   Substitua `<URL_DO_REPOSITORIO>` pelo endereço HTTPS ou SSH do repositório no GitHub.

2. Instale as dependências:

   ```bash
   npm ci
   ```

   `npm ci` instala as versões do arquivo de lock e ajuda a manter o ambiente consistente.

3. Inicie o Expo:

   ```bash
   npm start
   ```

   O Expo Dev Tools mostra as opções para abrir o app na web, em um emulador ou em um dispositivo conectado.

## Executar por plataforma

### Web

```bash
npm run web
```

Abra no navegador o endereço local informado pelo Expo.

### Android

Com um emulador aberto no Android Studio:

```bash
npm run android
```

Também é possível iniciar o servidor com `npm start` e ler o QR code pelo Expo Go, se a versão do Expo Go instalada for compatível com o SDK do projeto.

### iOS

Em um Mac com Xcode instalado:

```bash
npm run ios
```

## Funcionalidades

- Navegação entre dias e seleção de um dia da semana.
- Criação e edição de tarefas com título, notas, horário, categoria, importância e status.
- Visualização dos horários livres e ocupados entre 05h e 23h.
- Filtros recolhíveis por categoria, status e importância.
- Ações rápidas para concluir, reabrir ou excluir tarefas.
- Confirmação temporária após adicionar uma tarefa.

As tarefas ficam em memória durante a execução do app. Ao recarregar ou fechar a aplicação, elas não são mantidas.

## Estrutura do projeto

```text
App.tsx
src/
  components/  # formulário, filtros, lista, tarefas e horários
  screens/     # tela principal da agenda
```

## Fonte

A interface usa a fonte [Permanent Marker](https://fonts.google.com/specimen/Permanent+Marker), carregada pelo pacote `@expo-google-fonts/permanent-marker`.
