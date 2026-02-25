# 📝 Todo List - Aplicação MERN

Uma aplicação completa de gerenciamento de tarefas construída com MongoDB, Express, React e Node.js.

## ✨ Recursos

- ✅ Criar novas tarefas
- ✏️ Editar tarefas existentes
- 🗑️ Deletar tarefas
- ☑️ Marcar tarefas como concluídas
- 🏷️ Categorizar tarefas por prioridade (Baixa, Média, Alta)
- 📅 Definir datas de vencimento
- 📱 Interface responsiva e moderna

## 🛠️ Tech Stack

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- Cors
- Dotenv

**Frontend:**
- React 18
- Axios
- CSS3

## 📋 Pré-requisitos

- Node.js (v14 ou superior)
- npm ou yarn
- MongoDB instalado e em execução

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone <seu-repositorio>
cd MERN-Test
```

### 2. Instale as dependências do Backend

```bash
cd backend
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na pasta `backend`:

```bash
# Linux/Mac
cp .env.example .env

# Windows
copy .env.example .env
```

Edite o arquivo `.env` se necessário:

```
MONGODB_URI=mongodb://localhost:27017/mern-todo
PORT=5000
NODE_ENV=development
```

### 4. Instale as dependências do Frontend

Abra um novo terminal na raiz do projeto:

```bash
cd frontend
npm install
```

## ▶️ Execução

### Terminal 1 - Servidor Backend

```bash
cd backend
npm run dev
```

O servidor estará rodando em `http://localhost:5000`

### Terminal 2 - Aplicação Frontend

```bash
cd frontend
npm start
```

A aplicação abrirá automaticamente em `http://localhost:3000`

## 📚 Endpoints da API

### GET `/api/tasks`
Retorna todas as tarefas

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Exemplo de tarefa",
    "description": "Descrição da tarefa",
    "completed": false,
    "priority": "high",
    "dueDate": "2024-03-01",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### GET `/api/tasks/:id`
Retorna uma tarefa específica pelo ID

### POST `/api/tasks`
Cria uma nova tarefa

**Body:**
```json
{
  "title": "Minha tarefa",
  "description": "Descrição opcional",
  "priority": "medium",
  "dueDate": "2024-03-01"
}
```

### PUT `/api/tasks/:id`
Atualiza uma tarefa existente

**Body:**
```json
{
  "title": "Tarefa atualizada",
  "description": "Nova descrição",
  "completed": true,
  "priority": "low",
  "dueDate": "2024-03-15"
}
```

### DELETE `/api/tasks/:id`
Deleta uma tarefa

## 📁 Estrutura do Projeto

```
MERN-Test/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── taskController.js
│   │   ├── models/
│   │   │   └── Task.js
│   │   ├── routes/
│   │   │   └── taskRoutes.js
│   │   └── server.js
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.js
│   │   │   ├── TaskForm.css
│   │   │   ├── TaskList.js
│   │   │   ├── TaskList.css
│   │   │   ├── TaskItem.js
│   │   │   └── TaskItem.css
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── .gitignore
└── README.md
```

## 🎨 Customização

### Temas
Você pode customizar as cores editando o arquivo `frontend/src/index.css`:

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Prioridades
As prioridades podem ser modificadas em `backend/src/models/Task.js`:

```javascript
priority: {
  type: String,
  enum: ['low', 'medium', 'high'],
  default: 'medium',
}
```

## 🐛 Troubleshooting

### MongoDB não conecta
- Certifique-se de que MongoDB está em execução
- Verifique se a URI em `.env` está correta

### Porta 5000 já em uso
Altere a porta no arquivo `.env` ou use:
```bash
npm run dev -- --port 3001
```

### CORS erros
Certifique-se de que o proxy está configurado em `frontend/package.json`:
```json
"proxy": "http://localhost:5000"
```

## 📝 Desenvolvedores

Criado com ❤️ para gerenciamento de tarefas eficiente.

## 📄 Licença

Este projeto está sob licença ISC.
