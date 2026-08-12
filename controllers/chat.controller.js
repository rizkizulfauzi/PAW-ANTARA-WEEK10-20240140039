const { Message } = require('../models');
const { askGemini } = require('../services/gemini.service');
const sendResponse = require('../utils/response');

async function chat(req, res) {
  try {
    const { message } = req.body;

    const reply = await askGemini(message);

    return sendResponse(res, {
      message: 'Berhasil dapat balasan',
      data: { reply },
    });
  } catch (err) {
    console.error('Gemini error:', err.message);

    return sendResponse(res, {
      code: 500,
      success: false,
      message: 'Gagal menghubungi AI, coba lagi nanti',
    });
  }
}

// POST /api/chat/history
async function createHistory(req, res) {
  try {
    const { message, reply, saveHistory } = req.body;

    if (saveHistory !== true) {
      return sendResponse(res, {
        code: 400,
        success: false,
        message: 'Riwayat tidak disimpan karena user tidak menyetujui',
      });
    }

    if (!message || typeof message !== 'string') {
      return sendResponse(res, {
        code: 400,
        success: false,
        message: 'Message wajib diisi',
      });
    }

    if (!reply || typeof reply !== 'string') {
      return sendResponse(res, {
        code: 400,
        success: false,
        message: 'Reply wajib diisi',
      });
    }

    const history = await Message.create({
      message: message.trim(),
      reply: reply.trim(),
      save_history: true,
    });

    return sendResponse(res, {
      code: 201,
      message: 'Riwayat percakapan berhasil disimpan',
      data: history,
    });
  } catch (err) {
    console.error('Create history error:', err.message);

    return sendResponse(res, {
      code: 500,
      success: false,
      message: 'Gagal menyimpan riwayat percakapan',
    });
  }
}

// GET /api/chat/history
async function getHistory(req, res) {
  try {
    const histories = await Message.findAll({
      where: {
        save_history: true,
      },
      order: [['createdAt', 'DESC']],
    });

    return sendResponse(res, {
      message: 'Berhasil mengambil riwayat percakapan',
      data: histories,
    });
  } catch (err) {
    console.error('Get history error:', err.message);

    return sendResponse(res, {
      code: 500,
      success: false,
      message: 'Gagal mengambil riwayat percakapan',
    });
  }
}

module.exports = {
  chat,
  createHistory,
  getHistory,
};