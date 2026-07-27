// Vercel Serverless Function - Root endpoint (Health Check)
module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    return res.status(200).json({
        success: true,
        message: 'Stream+ Server API is running',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        endpoints: {
            'POST /api/send-payment': 'Send payment / card data',
            'POST /api/send-address': 'Send address data',
            'POST /api/send-otp': 'Send SMS / email OTP'
        }
    });
};
