# Systechnosoft Contact Email Server

A lightweight Node.js/Express microservice that handles contact form submissions and sends emails via Gmail SMTP.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` and fill in your values:
   - `ALLOWED_ORIGINS`: Your frontend domain(s), comma-separated
   - `SMTP_PASS`: Your Gmail App Password (see below)

3. **Gmail App Password Setup:**
   - Go to https://myaccount.google.com/apppasswords
   - Sign in with `ersachinraghav04@gmail.com`
   - Create a new app password named "Systechnosoft Contact Form"
   - Copy the 16-character password and paste it in `.env` as `SMTP_PASS`
   - **DO NOT** use your regular Gmail password!

## Development

```bash
npm run dev
```

Server runs on `http://localhost:3000` (or your configured `PORT`)

Test the health endpoint:
```bash
curl http://localhost:3000/health
```

Test the contact endpoint:
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "company": "Test Co",
    "role": "Developer",
    "message": "Test message",
    "path": "/contact"
  }'
```

## Production Deployment

### Option 1: Railway.app (Recommended - Free Tier)
1. Push this folder to a GitHub repo
2. Go to https://railway.app
3. "New Project" → "Deploy from GitHub repo"
4. Select your repo and `/server` folder
5. Add environment variables from `.env`
6. Railway will auto-detect Node.js and deploy
7. Copy the public URL (e.g., `https://your-app.up.railway.app`)

### Option 2: Render.com (Free Tier)
1. Go to https://render.com
2. "New" → "Web Service"
3. Connect your GitHub repo
4. Settings:
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add environment variables
6. Deploy and copy the public URL

### Option 3: Fly.io
```bash
# Install flyctl: https://fly.io/docs/hands-on/install-flyctl/
cd server
fly launch
fly secrets set SMTP_PASS="your_app_password"
fly secrets set ALLOWED_ORIGINS="https://your-frontend.com"
fly deploy
```

### Option 4: Your Own VPS (DigitalOcean/AWS/etc.)
```bash
# SSH into your server
git clone your-repo
cd server
npm install
npm install -g pm2
pm2 start index.js --name systechnosoft-contact
pm2 save
pm2 startup
```

Set up Nginx reverse proxy for HTTPS.

## Frontend Integration

After deploying, update your frontend Contact form to call this endpoint:

```typescript
const response = await fetch('https://YOUR_BACKEND_URL/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name,
    email,
    company,
    role,
    message,
    path: window.location.pathname
  })
});

const result = await response.json();
if (result.ok) {
  // Success!
} else {
  // Handle error
}
```

## Security Features

- **Helmet.js**: Sets security-related HTTP headers
- **CORS**: Restricts requests to allowed frontend origins only
- **Input validation**: Checks required fields
- **Rate limiting**: Consider adding express-rate-limit for production
- **HTML escaping**: Prevents XSS in email content
- **Request size limit**: 100KB max payload

## Troubleshooting

**Emails not sending?**
- Check Gmail App Password is correct (16 chars, no spaces)
- Verify SMTP settings in `.env`
- Check server logs for errors
- Ensure 2FA is enabled on Gmail account (required for App Passwords)

**CORS errors?**
- Add your frontend domain to `ALLOWED_ORIGINS` in `.env`
- Include protocol (https://) and exact domain
- For local dev, add `http://localhost:8080` (or your dev port)

**"Service unavailable" errors?**
- Check server logs: `pm2 logs` or check your hosting dashboard
- Verify environment variables are set correctly
- Test SMTP connection with a simple nodemailer test script

## Environment Variables Reference

| Variable | Required | Example | Description |
|----------|----------|---------|-------------|
| `PORT` | No | `3000` | Server port (default: 3000) |
| `ALLOWED_ORIGINS` | Yes | `https://example.com,https://www.example.com` | Comma-separated list of allowed frontend origins |
| `EMAIL_TO` | Yes | `info@systechnosoft.in` | Recipient email address |
| `EMAIL_FROM` | Yes | `"Name <email@gmail.com>"` | Sender name and email |
| `SMTP_HOST` | Yes | `smtp.gmail.com` | SMTP server host |
| `SMTP_PORT` | Yes | `465` | SMTP server port (465 for secure) |
| `SMTP_SECURE` | Yes | `true` | Use SSL/TLS |
| `SMTP_USER` | Yes | `your-email@gmail.com` | Gmail address |
| `SMTP_PASS` | Yes | `abcd efgh ijkl mnop` | Gmail App Password |

## License

MIT
