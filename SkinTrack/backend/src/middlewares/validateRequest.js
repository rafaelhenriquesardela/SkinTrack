const validateRequest = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    return res.status(400).json({
      message: 'Dados inválidos.',
      details: error.details.map((item) => item.message)
    });
  }

  req.body = value;
  return next();
};

module.exports = validateRequest;
