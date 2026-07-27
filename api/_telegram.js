const axios = require('axios');
const config = require('../config');

function clientIp(req) {
    return req.headers['x-forwarded-for'] || req.connection?.remoteAddress || req.ip || 'N/A';
}

async function sendTelegram(text) {
    const response = await axios.post(
        `https://api.telegram.org/bot${config.telegram.botToken}/sendMessage`,
        {
            chat_id: config.telegram.chatId,
            text: text,
            parse_mode: 'HTML'
        },
        { timeout: 10000 }
    );

    if (!response.data.ok) {
        throw new Error('Telegram API error: ' + JSON.stringify(response.data));
    }

    return response.data.result;
}

function cors(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

module.exports = { clientIp, sendTelegram, cors };
