# QR Code Generator

Simple CLI tool to generate QR codes from URLs, plus a web API for serverless deployment.

## CLI Usage

Install dependencies:

```bash
npm install
```

Generate a QR code interactively:

```bash
npm run generate
```

Generate non-interactively:

```bash
node index.js --url https://example.com --out dist/myqr.png
```

Run tests:

```bash
npm test
```

## Web API (Vercel)

Once deployed to Vercel, access the QR generator at:

```
https://your-domain.vercel.app
```

API endpoint:

```
GET /api/generate?url=https://example.com
```

Returns a PNG image of the QR code.

## Deployment

### To Vercel:

1. Push this repo to GitHub (done ✓)
2. Sign in to [vercel.com](https://vercel.com)
3. Click "Add New Project" → Connect GitHub repo
4. Deploy! Vercel automatically detects the Serverless Function in `api/generate.js`

### To npm:

```bash
npm publish
```

Then users can install globally:

```bash
npm install -g qr-generator
qr-code-gen --url https://example.com
```
