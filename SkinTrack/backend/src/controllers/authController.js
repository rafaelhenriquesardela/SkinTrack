const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { jwtSecret, apiBaseUrl } = require('../config/env');
const { generateRoutine } = require('../services/routineGenerator');
const { sendVerificationEmail } = require('../services/emailService');
const { normalizeQuizPayload } = require('../validators/authValidator');

const signToken = (userId) => jwt.sign({ id: userId }, jwtSecret, { expiresIn: '7d' });

const publicUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  emailVerified: user.emailVerified,
  skinProfile: user.skinProfile,
  routine: user.routine
});

const createEmailVerificationToken = () => {
  const rawToken = crypto.randomBytes(32).toString('hex');
  const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

  return {
    rawToken,
    tokenHash,
    expiresAt
  };
};

const buildVerificationUrl = (rawToken) => `${apiBaseUrl}/api/verify-email?token=${rawToken}`;

const signup = async (req, res) => {
  const { name, email, password, skinType, age, concerns, routinePreference } = normalizeQuizPayload(req.body);

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(409).json({ message: 'Email já cadastrado.' });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const routine = generateRoutine({
    skinType,
    age,
    concerns,
    routinePreference
  });

  const { rawToken, tokenHash, expiresAt } = createEmailVerificationToken();

  const user = await User.create({
    name,
    email,
    passwordHash,
    emailVerified: false,
    emailVerificationTokenHash: tokenHash,
    emailVerificationExpiresAt: expiresAt,
    skinProfile: {
      skinType,
      age,
      concerns,
      routinePreference
    },
    routine
  });

  try {
    await sendVerificationEmail({
      to: user.email,
      name: user.name,
      verificationUrl: buildVerificationUrl(rawToken)
    });
  } catch (error) {
    console.error('Falha ao enviar e-mail de verificação:', error.message);
  }

  return res.status(201).json({
    message: 'Cadastro criado. Verifique seu e-mail para ativar a conta.',
    email: user.email
  });
};

const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password ?? req.body.senha;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Credenciais inválidas.' });
  }

  const validPassword = await bcrypt.compare(password, user.passwordHash);
  if (!validPassword) {
    return res.status(401).json({ message: 'Credenciais inválidas.' });
  }

  if (!user.emailVerified) {
    return res.status(403).json({
      message: 'Conta não verificada. Confirme seu e-mail para continuar.',
      code: 'EMAIL_NOT_VERIFIED'
    });
  }

  const token = signToken(user._id.toString());

  return res.status(200).json({
    token,
    user: publicUser(user)
  });
};

const verifyEmail = async (req, res) => {
  const rawToken = req.query.token;

  if (!rawToken) {
    return res.status(400).send('Token de verificação ausente.');
  }

  const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');

  const user = await User.findOne({
    emailVerificationTokenHash: tokenHash,
    emailVerificationExpiresAt: { $gt: new Date() }
  });

  if (!user) {
    return res.status(400).send('Token inválido ou expirado.');
  }

  user.emailVerified = true;
  user.emailVerificationTokenHash = null;
  user.emailVerificationExpiresAt = null;
  await user.save();

  return res.status(200).send('E-mail verificado com sucesso! Sua conta foi ativada.');
};

const resendVerification = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(200).json({ message: 'Se o e-mail existir, enviaremos uma nova verificação.' });
  }

  if (user.emailVerified) {
    return res.status(200).json({ message: 'Esta conta já está verificada.' });
  }

  const { rawToken, tokenHash, expiresAt } = createEmailVerificationToken();

  user.emailVerificationTokenHash = tokenHash;
  user.emailVerificationExpiresAt = expiresAt;
  await user.save();

  await sendVerificationEmail({
    to: user.email,
    name: user.name,
    verificationUrl: buildVerificationUrl(rawToken)
  });

  return res.status(200).json({ message: 'E-mail de verificação reenviado.' });
};

module.exports = {
  signup,
  login,
  verifyEmail,
  resendVerification
};
