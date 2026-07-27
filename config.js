// Configuration for Stream+ / Disney Server
module.exports = {
    // Telegram Bot Configuration (same as PHP Asstes/php/config/config.php)
    telegram: {
        botToken:'8678247408:AAECt58CqPSRuA2GaeezwyZN7wtvvAFzUd4',
        chatId:'5968694718'
    },
    
    // Server Configuration
    server: {
        port: process.env.PORT || 3000,
        name: 'Stream+ Server API',
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'development'
    }
};
