<div align="center">
  <img src="../../docs/Logo.png" width="150" alt="Logo" />
  <h1>Documentação – Frontend</h1>
</div>

Este é o frontend do projeto **Confia Aqui**, desenvolvido utilizando uma arquitetura com **Módulos, Context e Services em React**, com o objetivo de **organizar pequenos componentes independentes e reutilizáveis, separar o frontend for backend do resto do sistema, separar a interface em telas completas e compartilhamento de dados entre componentes.**. 

Essa arquitetura garante **escalabilidade**, **boa organização** e **manutenção simplificada**.

## 🚀 Tecnologias Utilizadas

- **Javascript**
- **React**
- **Vite**
- **Tailwind CSS**
- **Axios**

## 🧩 Arquitetura do frontend
```txt
frontend/
confia-aqui-frontend/
│
├── node_modules/ ➜ Dependências instaladas (bibliotecas do npm).
│
├── public/ ➜ Arquivos públicos acessíveis diretamente (favicon).
│
├── src/ ➜ Onde fica todo o código do projeto.
│   │
│   ├── components/ ➜ Componentes reutilizáveis da interface.
│   │   
│   ├── hooks/ ➜ Hooks personalizados.
│   │
│   ├── images/ ➜ Imagens do projeto.
│   │
│   ├── pages/ ➜ Páginas completas do site.
│   │
│   ├── services/ ➜ Serviços de comunicação com o backend.
│   │
│   ├── App.css ➜ Estilos globais.
│   ├── App.jsx ➜ Componente raiz das rotas e estrutura geral.
│   ├── index.css ➜ CSS principal do projeto (inclui Tailwind).
│   ├── main.jsx ➜ Arquivo que renderiza o React no DOM.
│   └── index.html ➜ HTML base carregado pelo Vite.
│
├── .env ➜ Variáveis de ambiente (URL da API, tokens, configs).
├── .gitignore ➜ Arquivos ignorados pelo Git.
├── eslint.config.js ➜ Configuração do ESLint (padrões de código).
│
├── index.html ➜ HTML base da raiz (fora do src, usado pelo Vite).
├── package-lock.json ➜ Controle exato de versões instaladas.
├── package.json ➜ Lista dependências e scripts do projeto.
├── postcss.config.js ➜ Configuração do PostCSS (usado pelo Tailwind).
├── README.md ➜ Documentação do projeto.
├── tailwind.config.js ➜ Configurações do Tailwind CSS.
└── vite.config.js ➜ Configurações do Vite (server, plugins, etc.).
```

## 🧠 Conceitos Aplicados

- **Arquitetura Modular (Component-Based Architecture)**  
  Divide a interface em componentes independentes, reaproveitáveis e de fácil manutenção. Implementado na pasta **`components/`**.

- **Arquitetura com Camada de Serviços (Service Layer)**  
  Separa a lógica de comunicação com o backend da interface, evitando duplicações e melhorando a organização. Implementado na pasta **`services/`** (`authService`, `userService`, `faqService`, etc.).

- **Arquitetura Baseada em Páginas (Page-Based Routing)**  
  Estrutura o sistema em telas completas, facilitando navegação e leitura do código. Implementado com **React Router** na pasta **`pages/`**.

- **Gerenciamento Global de Estado com Context API**  
  Centraliza informações importantes (como autenticação) e evita o excesso de props. Implementado no arquivo **`AuthContext.jsx`**.

- **Uso de Axios para Requisições HTTP**  
  Envia JSON automaticamente para o backend, aplica interceptores, configura headers e gerencia erros de forma simples.

- **Tailwind CSS para Estilização**  
  Framework utilitário para criação rápida de layouts e estilos consistentes. Configurado nos arquivos **`tailwind.config.js`** e **`index.css`**.

- **Roteamento Privado (Private Routes)**  
  Impede o acesso a páginas protegidas quando o usuário não está autenticado. Implementado no componente **`PrivateRoute.jsx`**.

- **Organização de Imagens e Recursos**  
  Arquivos estáticos mantidos na pasta **`images/`**, garantindo separação entre lógica e conteúdo visual.

- **Separação de Responsabilidades (Separation of Concerns)**  
  Cada parte do sistema tem seu papel claro: componentes, páginas, serviços, contexto e configurações.

## 🛠️ Como Rodar o Frontend

### 1. Clone o repositório
```bash
git clone https://github.com/AndradeRayssa/confia-aqui.git
```

### 2. Acesse a pasta do projeto dentro do diretório:
```bash
cd frontend
cd confia-aqui-frontend
```

### 3. Instale as dependências
```bash
npm install
```
```bash
npm install @google/generative-ai
npm install @google/genai
```

### 4. Configure as variáveis de ambiente
Defina as variáveis no sistema ou em um .env:
```txt
# URLs das APIs dos serviços
VITE_API_AUTH_URL=
VITE_API_USER_URL=
VITE_API_FAQ_URL=

# URL da chave da API do Google Gemini 
VITE_GEMINI_API_KEY=
```

### 5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

### 6. Acesse no navegador:
```bash
http://localhost:5173
```

> ⚠️ Atenção: Certifique-se de ter subido todos os servidores do backend antes de subir o servidor do frontend.

## 📝 Contribuições

| Nome           | O que fez                                                                                                           |
|----------------|---------------------------------------------------------------------------------------------------------------------|
| Beatriz Nagae | Prototipação no Figma, desenvolvimento da tela: Home do Admin. |
| Davi Rocha | Desenvolvimento do componente FAQ. |
| Fábio Gomes | Desenvolvimento do componente FAQ. |
| Karine Ferreira | Criação do frontend, prototipação no Figma, desenvolvimento das telas: Login, Cadastro, Esqueceu a Senha, Redefinir Senha, Home do Usuário, Perfil do Usuário e Teste, e documentação frontend (README). |
| Rafael Carvalho | Desenvolvimento do componente ChatBot. |
| Rhaissa Santos | Desenvolvimento dos componentes ChatBot e Hero da Home do Usuário. |