const Joi = require('joi');

const skinTypeRule = Joi.string().valid('oleosa', 'seca', 'mista', 'normal');
const concernsRule = Joi.array()
  .items(Joi.string().valid('acne', 'manchas', 'hidratacao', 'ressecamento'))
  .min(1);
const routineRule = Joi.string().valid('completa', 'so-noite', 'minimalista');

const signupSchema = Joi.object({
  name: Joi.string().min(2).max(80),
  nome: Joi.string().min(2).max(80),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(64),
  senha: Joi.string().min(6).max(64),
  skinType: skinTypeRule,
  pele: skinTypeRule,
  age: Joi.number().integer().min(10).max(100),
  idade: Joi.number().integer().min(10).max(100),
  concerns: concernsRule,
  preocupacoes: concernsRule,
  routinePreference: routineRule,
  rotina: routineRule
})
  .or('name', 'nome')
  .or('password', 'senha')
  .or('skinType', 'pele')
  .or('age', 'idade')
  .or('concerns', 'preocupacoes')
  .or('routinePreference', 'rotina');

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string(),
  senha: Joi.string()
}).or('password', 'senha');

const resendVerificationSchema = Joi.object({
  email: Joi.string().email().required()
});

const regenerateSchema = Joi.object({
  skinType: skinTypeRule,
  pele: skinTypeRule,
  age: Joi.number().integer().min(10).max(100),
  idade: Joi.number().integer().min(10).max(100),
  concerns: concernsRule,
  preocupacoes: concernsRule,
  routinePreference: routineRule,
  rotina: routineRule
})
  .or('skinType', 'pele')
  .or('age', 'idade')
  .or('concerns', 'preocupacoes')
  .or('routinePreference', 'rotina');

const normalizeQuizPayload = (body) => ({
  name: body.name ?? body.nome,
  email: body.email,
  password: body.password ?? body.senha,
  skinType: body.skinType ?? body.pele,
  age: body.age ?? body.idade,
  concerns: body.concerns ?? body.preocupacoes,
  routinePreference: body.routinePreference ?? body.rotina
});

module.exports = {
  signupSchema,
  loginSchema,
  resendVerificationSchema,
  regenerateSchema,
  normalizeQuizPayload
};
