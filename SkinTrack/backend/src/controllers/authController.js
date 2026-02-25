const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { jwtSecret } = require('../config/env');
const { generateRoutine } = require('../services/routineGenerator');
const { normalizeQuizPayload } = require('../validators/authValidator');

const signToken = (userId) => jwt.sign({ id: userId }, jwtSecret, { expiresIn: '7d' });

const publicUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  skinProfile: user.skinProfile,
  routine: user.routine
});

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

  const user = await User.create({
    name,
    email,
    passwordHash,
    skinProfile: {
      skinType,
      age,
      concerns,
      routinePreference
    },
    routine
  });

  const token = signToken(user._id.toString());

  return res.status(201).json({
    token,
    user: publicUser(user)
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

  const token = signToken(user._id.toString());

  return res.status(200).json({
    token,
    user: publicUser(user)
  });
};

module.exports = {
  signup,
  login
};
