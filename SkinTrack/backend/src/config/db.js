const mongoose = require('mongoose');
const { mongoUri } = require('./env');

const connectDB = async () => {
  if (!mongoUri) {
    throw new Error('MONGODB_URI não configurado');
  }

  console.log('Conectando ao MongoDB...');
  await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 15000
  });
  console.log('MongoDB conectado com sucesso.');
};

module.exports = connectDB;
