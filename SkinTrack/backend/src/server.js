const express = require('express');
const cors = require('cors');
require('express-async-errors');
const connectDB = require('./config/db');
const { port, clientUrl } = require('./config/env');
const authRoutes = require('./routes/auth');

const normalizedClientUrl = /^https?:\/\//.test(clientUrl) ? clientUrl : `https://${clientUrl}`;

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

const app = express();

app.use(
  cors({
    origin: normalizedClientUrl,
    credentials: true
  })
);
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.status(200).json({ message: 'SkinTrack API online.' });
});

app.use('/api', authRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Erro interno do servidor.' });
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Falha ao iniciar servidor:', error.message);
    console.error(error);
    process.exit(1);
  }
};

startServer();
