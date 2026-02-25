const User = require('../models/User');
const { generateRoutine } = require('../services/routineGenerator');
const { normalizeQuizPayload } = require('../validators/authValidator');

const publicUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  skinProfile: user.skinProfile,
  routine: user.routine
});

const getMe = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado.' });
  }

  return res.status(200).json({ user: publicUser(user) });
};

const regenerateRoutine = async (req, res) => {
  const { skinType, age, concerns, routinePreference } = normalizeQuizPayload(req.body);

  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado.' });
  }

  user.skinProfile = {
    skinType,
    age,
    concerns,
    routinePreference
  };
  user.routine = generateRoutine({
    skinType,
    age,
    concerns,
    routinePreference
  });

  await user.save();

  return res.status(200).json({
    message: 'Rotina atualizada com sucesso.',
    user: publicUser(user)
  });
};

module.exports = {
  getDashboard: getMe,
  getMe,
  regenerateRoutine
};
