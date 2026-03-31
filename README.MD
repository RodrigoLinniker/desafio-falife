# Desafio React Native Falife

Aplicativo de controle das escolas públicas e de suas turmas

---

## 🚀 Tecnologias

- [React Native](https://reactnative.dev/) — Framework principal para o desenvolvimento mobile
- [Expo](https://expo.dev/) — Para facilitar build e deploy do app
- [TypeScript](https://www.typescriptlang.org/) — Tipagem estática para maior segurança no código
- [Expo Router](https://expo.github.io/router/) — Navegação entre telas e rotas dinâmicas
- [Axios](https://axios-http.com/) — Comunicação com a API
- [React Query](https://tanstack.com/query/latest) — Gerenciamento de cache, requisições e estado assíncrono
- [NativeWind](https://nativewind.dev/) — Estilização rápida e responsiva

---

## 🔧 Instalação e execução

### Pré-requisitos

- Node.js (>= 24.14.1)
- Expo SDK 54
- Yarn ou NPM
- Android Studio ou Xcode configurado
- Emulador ou dispositivo físico

### Passos

```bash
# Clonar o repositório
git clone https://github.com/RodrigoLinniker/desafio-falife.git

# Entrar no diretório
cd desafio-falife

# Instalar dependências
yarn install
# ou
npm install

#Rodar projeto
yarn start

# Rodar no Android
yarn android

# Rodar no iOS
yarn ios
```

---

### Decisões técnicas

- **React Native com Expo** — Simplifica o desenvolvimento mobile e permite builds rápidos em Android e iOS sem configuração complexa.
- **React Query** — Gerencia requisições assíncronas, cache de dados e scroll infinito de notícias de forma eficiente, garantindo atualização automática da interface.
- **Axios com Interceptors e Toasts** — Centraliza o tratamento de erros da API, exibindo mensagens de toast para o usuário em caso de falhas ou ausência de conexão.
- **NativeWind** — Facilita a estilização rápida e responsiva, mantendo consistência visual em todo o app.
- **Estrutura modular** — Separação entre hooks, controllers e componentes para manter o código organizado, testável e escalável.
