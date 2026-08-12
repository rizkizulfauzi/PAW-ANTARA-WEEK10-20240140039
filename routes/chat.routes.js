const express = require('express');
const router = express.Router();

const validateChatInput = require('../middlewares/validateChatInput.middleware');

const {
  chat,
  createHistory,
  getHistory,
} = require('../controllers/chat.controller');

// Chat AI
router.post('/', validateChatInput, chat);

// Simpan history
router.post('/history', createHistory);

// Ambil history
router.get('/history', getHistory);

module.exports = router;