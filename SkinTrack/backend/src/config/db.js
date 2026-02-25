const mongoose = require('mongoose');
const { mongoUri } = require('./env');

const connectDB = async () => {
  if (!mongoUri) {
    throw new Error('MONGODB_URI não configurado');
  }

  await mongoose.connect(mongoUri);
  console.log('MongoDB conectado com sucesso.');
};

module.exports = connectDB;
