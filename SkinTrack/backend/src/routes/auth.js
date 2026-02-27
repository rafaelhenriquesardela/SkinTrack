const express = require('express');
const { signup, login, verifyEmail, resendVerification } = require('../controllers/authController');
const { getDashboard, regenerateRoutine } = require('../controllers/userController');
const validateRequest = require('../middlewares/validateRequest');
const auth = require('../middleware/auth');
const { signupSchema, loginSchema, regenerateSchema, resendVerificationSchema } = require('../validators/authValidator');

const router = express.Router();

router.post('/signup', validateRequest(signupSchema), signup);
router.post('/login', validateRequest(loginSchema), login);
router.get('/verify-email', verifyEmail);
router.post('/resend-verification', validateRequest(resendVerificationSchema), resendVerification);
router.get('/dashboard', auth, getDashboard);
router.put('/quiz/regenerate', auth, validateRequest(regenerateSchema), regenerateRoutine);

module.exports = router;
