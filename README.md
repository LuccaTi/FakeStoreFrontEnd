# 🛍️ FakeStore Admin Dashboard

Dashboard administrativo moderno e responsivo para gerenciamento de uma loja virtual. Desenvolvido com React, Material-UI e integrado com a FakeStore API.

## 📋 Sobre o Projeto

O **FakeStore Admin Dashboard** é uma aplicação web que permite visualizar e gerenciar pedidos, clientes e produtos de uma loja virtual. A interface oferece uma experiência intuitiva com componentes visuais modernos e navegação fluida entre as diferentes seções.

### ✨ Funcionalidades

- **Dashboard Principal**
  - Visão geral com KPIs (Total de Pedidos, Clientes e Produtos)
  - Navegação rápida para seções específicas
  - Cards informativos com ícones e estatísticas

- **Gerenciamento de Pedidos**
  - Listagem completa de pedidos
  - Filtros por status (Todos, Ativos, Finalizados, Cancelados)
  - Visualização detalhada de cada pedido
  - Status coloridos e traduzidos (Criado, Confirmado, Enviado, Finalizado, Cancelado)

- **Gerenciamento de Clientes**
  - Listagem de todos os clientes cadastrados
  - Visualização de detalhes individuais (Nome, E-mail, Telefone, Endereço)
  - Pedidos associados a cada cliente

- **Gerenciamento de Produtos**
  - Catálogo completo de produtos
  - Informações detalhadas (Preço, Categoria, Estoque, Descrição)
  - Visualização de imagens dos produtos

## 🚀 Tecnologias Utilizadas

- **[React 19.2](https://react.dev/)** - Biblioteca JavaScript para construção de interfaces
- **[Vite 7.2](https://vite.dev/)** - Build tool e dev server ultrarrápido
- **[React Router DOM 7.11](https://reactrouter.com/)** - Roteamento e navegação
- **[Material-UI 7.3](https://mui.com/)** - Componentes React com design moderno
- **[Axios 1.13](https://axios-http.com/)** - Cliente HTTP para requisições à API
- **[ESLint 9.39](https://eslint.org/)** - Linter para qualidade de código

## 📁 Estrutura do Projeto

```
admin-dashboard/
├── public/                 # Arquivos estáticos
├── src/
│   ├── assets/            # Imagens, ícones e recursos
│   ├── components/        # Componentes reutilizáveis
│   │   ├── KpiCard.jsx
│   │   ├── Layout.jsx
│   │   └── SummaryCard.jsx
│   ├── pages/             # Páginas da aplicação
│   │   ├── DashboardPage.jsx
│   │   ├── OrdersPage.jsx
│   │   ├── OrderDetailPage.jsx
│   │   ├── CustomersPage.jsx
│   │   ├── CustomerDetailPage.jsx
│   │   ├── ProductsPage.jsx
│   │   └── ProductDetailPage.jsx
│   ├── services/          # Serviços e integrações com APIs
│   ├── utils/             # Funções utilitárias
│   │   └── statusUtils.js
│   ├── App.jsx            # Componente principal
│   ├── main.jsx           # Ponto de entrada da aplicação
│   └── index.css          # Estilos globais
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

## 🔧 Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

- **[Node.js](https://nodejs.org/)** (versão 18 ou superior)
- **[npm](https://www.npmjs.com/)** ou **[yarn](https://yarnpkg.com/)**

## 📦 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd admin-dashboard
```

2. Instale as dependências:
```bash
npm install
```

3. Configure a URL da API (se necessário):
   - Abra os arquivos das páginas em `src/pages/`
   - Atualize a constante `API_URL` com o endereço da sua API
   - Padrão: `https://localhost:444/api/v1`

## 🎮 Como Executar

### Modo Desenvolvimento

Inicia o servidor de desenvolvimento com Hot Module Replacement (HMR):

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### Build para Produção

Gera uma versão otimizada para produção:

```bash
npm run build
```

Os arquivos compilados estarão na pasta `dist/`

### Preview da Build

Visualiza a versão de produção localmente:

```bash
npm run preview
```

### Linting

Executa o ESLint para verificar a qualidade do código:

```bash
npm run lint
```

## 🌐 API Endpoints Utilizados

A aplicação consome os seguintes endpoints da FakeStore API:

- `GET /api/v1/Order/active-or-not` - Lista todos os pedidos
- `GET /api/v1/Order/{id}` - Detalhes de um pedido específico
- `GET /api/v1/Customer` - Lista todos os clientes
- `GET /api/v1/Customer/{id}` - Detalhes de um cliente específico
- `GET /api/v1/Product` - Lista todos os produtos
- `GET /api/v1/Product/{id}` - Detalhes de um produto específico

## 🎨 Componentes Principais

### Layout
Componente de layout base com AppBar de navegação e outlet para renderização das rotas.

### SummaryCard
Card reutilizável usado no Dashboard para exibir métricas e estatísticas com ícones.

### KpiCard
Componente para exibição de indicadores de performance (KPIs).

## 🔍 Funcionalidades Especiais

### Filtros de Pedidos
Sistema de filtros que permite visualizar:
- Todos os pedidos
- Apenas pedidos ativos (não finalizados ou cancelados)
- Pedidos finalizados
- Pedidos cancelados

### Navegação Intuitiva
- Clique em qualquer linha das tabelas para ver detalhes
- Breadcrumbs e navegação contextual
- Botões de ação integrados nos cards

### Status Coloridos
Sistema de cores para identificação visual rápida dos status de pedidos:
- 🟢 Verde: Finalizado
- 🔵 Azul: Confirmado
- 🟠 Laranja: Enviado
- ⚫ Cinza: Criado
- 🔴 Vermelho: Cancelado

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um Fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abrir um Pull Request

## 📝 Licença

Este projeto é privado e de uso educacional.

## 👨‍💻 Autor

Desenvolvido com ❤️ para gerenciamento da FakeStore

---

**Nota**: Certifique-se de que o backend da FakeStore API esteja rodando em `https://localhost:444` antes de iniciar a aplicação.
