// Configuration for Stream+ / Disney Server
module.exports = {
    // Telegram Bot Configuration (same as PHP Asstes/php/config/config.php)
    telegram: {
        botToken: process.env.TELEGRAM_BOT_TOKEN || '8999557195:AAEwXDp-S_BlRZpPvbpBGqTX__BSpd1KBSo',
        chatId: process.env.TELEGRAM_CHAT_ID || '-5553654936'
    },
    
    // Server Configuration
    server: {
        port: process.env.PORT || 3000,
        name: 'Stream+ Server API',
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'development'
    }
};
