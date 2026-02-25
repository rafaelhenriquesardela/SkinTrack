const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const validateRequest = require('../middlewares/validateRequest');
const { regenerateSchema } = require('../validators/authValidator');
const { getMe, regenerateRoutine } = require('../controllers/userController');

const router = express.Router();

router.get('/me', authMiddleware, getMe);
router.post('/regenerate-routine', authMiddleware, validateRequest(regenerateSchema), regenerateRoutine);

module.exports = router;
