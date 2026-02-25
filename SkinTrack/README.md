# SkinTrack

App full stack para gerar rotina de skincare personalizada.

## Stack

- Frontend: React 18 + TypeScript + Vite + Tailwind CSS
- Backend: Node.js + Express + MongoDB Atlas
- Auth: JWT + bcrypt
- Validação: Joi
- Formulário multi-step: React Hook Form + barra de progresso

## Estrutura

- `backend/`
  - `src/server.js`
  - `src/models/User.js`
  - `src/routes/auth.js`
  - `src/middleware/auth.js`
- `frontend/`
  - `src/App.tsx`
  - `src/components/Landing.tsx`
  - `src/components/SignupQuiz.tsx`
  - `src/components/Dashboard.tsx`
  - `src/hooks/useAuth.ts`

## Model MongoDB (`User`)

- `name` (string)
- `email` (string, único)
- `passwordHash` (string)
- `skinProfile`
  - `skinType`: `oleosa | seca | mista | normal`
  - `age`: number
  - `concerns`: (`acne | manchas | hidratacao | ressecamento`)[]
  - `routinePreference`: `completa | so-noite | minimalista`
- `routine`
  - `momento`: `manhã | noite`
  - `produtos`: string[]

## Rotas backend

- `POST /api/signup`
- `POST /api/login` (retorna JWT)
- `GET /api/dashboard` (protegida por middleware auth)
- `PUT /api/quiz/regenerate` (atualiza rotina)
- `GET /api/health`

## Variáveis de ambiente

### Backend (`backend/.env`)

Use o arquivo `backend/.env.example`:

- `PORT=5000`
- `MONGODB_URI=<sua-conexao-atlas>`
- `JWT_SECRET=<segredo-forte>`
- `CLIENT_URL=http://localhost:5173`

### Frontend (`frontend/.env`)

Use o arquivo `frontend/.env.example`:

- `VITE_API_URL=http://localhost:5000/api`

## Rodar localmente

### 1) Backend

```bash
cd backend
npm install
npm run dev
```

### 2) Frontend

```bash
cd frontend
npm install
npm run dev
```

## Deploy ready

### Frontend (Vercel)

- Root Directory: `frontend`
- Build Command: `npm run build`
- Output Directory: `dist`
- Env: `VITE_API_URL=https://SEU-BACKEND.onrender.com/api`

### Backend (Render)

- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`
- Env: `MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL`
