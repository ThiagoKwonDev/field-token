# FieldToken Frontend

Uma aplicação React moderna para gerenciamento de ativos e tokenização no sistema FieldToken.

## 🚀 Tecnologias

- **React 18** - Biblioteca para interfaces de usuário
- **TypeScript** - Superset tipado do JavaScript
- **Vite** - Build tool e dev server ultra-rápido
- **Tailwind CSS** - Framework CSS utilitário
- **Axios** - Cliente HTTP para requisições à API
- **Lucide React** - Biblioteca de ícones moderna

## 📋 Funcionalidades

- **Dashboard** - Visão geral de ativos e tokens com métricas importantes
- **Gestão de Ativos** - Cadastro e listagem de ativos rurais
- **Tokenização** - Conversão de ativos em tokens digitais
- **Gestão de Tokens** - Visualização e filtragem de tokens gerados
- **Interface Responsiva** - Otimizada para desktop e mobile

## 🛠️ Instalação e Execução

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone <seu-repositorio>
cd fieldtoken-frontend

# Instale as dependências
npm install

# Execute em modo de desenvolvimento
npm run dev
```

### Build para Produção
```bash
# Gera build otimizado
npm run build

# Preview do build de produção
npm run preview
```

## 🌐 Deploy na Azure

Este projeto está configurado para deploy automático na Azure Static Web Apps usando GitHub Actions.

### Configuração do Deploy

1. **Crie um Azure Static Web App** no portal da Azure
2. **Configure o repositório GitHub** durante a criação
3. **Adicione o secret** `AZURE_STATIC_WEB_APPS_API_TOKEN` no GitHub
4. **Push para a branch main/master** para trigger automático do deploy

### Workflow do GitHub Actions

O arquivo `.github/workflows/azure-static-web-apps.yml` contém:
- Build automático da aplicação React
- Deploy para Azure Static Web Apps
- Suporte a Pull Requests com preview deployments

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── Header.tsx      # Cabeçalho e navegação
│   ├── Dashboard.tsx   # Dashboard principal
│   ├── AtivosManager.tsx   # Gestão de ativos
│   └── TokensManager.tsx   # Gestão de tokens
├── services/           # Serviços e API
│   └── api.ts         # Cliente Axios e endpoints
├── types/             # Definições TypeScript
│   └── index.ts       # Interfaces e tipos
├── App.tsx            # Componente principal
└── main.tsx           # Entry point da aplicação
```

## 🔧 Configuração da API

A aplicação está configurada para usar a API FieldToken:
- **Produção**: `https://api.fieldtoken.com/v1`
- **Sandbox**: `https://sandbox.fieldtoken.com/v1`

Para alterar o endpoint, edite o arquivo `src/services/api.ts`.

## 🎨 Design System

- **Cores Primárias**: Verde (#10B981), Azul (#3B82F6), Laranja (#F59E0B)
- **Tipografia**: Sistema de fontes nativo com hierarquia clara
- **Espaçamento**: Sistema baseado em 8px
- **Componentes**: Cards modernos com sombras e animações

## 📱 Responsividade

A aplicação é totalmente responsiva com breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para suporte técnico, entre em contato:
- Email: suporte@fieldtoken.com
- Website: https://fieldtoken.com