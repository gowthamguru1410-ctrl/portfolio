# Environment Variables Setup

For security and flexibility, store sensitive information in environment variables.

## Local Development

Create a `.env.local` file in your project root:

```bash
cd my-portfolio
touch .env.local
```

Add your variables to `.env.local`:

```
# Contact Information
VITE_EMAIL=your.email@gmail.com
VITE_PHONE=+1 (234) 567-890
VITE_LOCATION=City, Country

# Social Media
VITE_LINKEDIN_URL=https://linkedin.com/in/yourprofile
VITE_GITHUB_URL=https://github.com/yourusername
VITE_GITHUB_USERNAME=yourusername

# Optional: Analytics
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# Optional: Form Handler (for future contact form)
VITE_API_URL=https://api.example.com
```

## Usage in React

Import and use in your components:

```javascript
// Hero.jsx
const email = import.meta.env.VITE_EMAIL
const linkedin = import.meta.env.VITE_LINKEDIN_URL

// Example
<a href={`mailto:${email}`}>
  {email}
</a>
```

## Deployment

### Vercel
1. Go to Project Settings → Environment Variables
2. Add variables for production:
   - `VITE_EMAIL`
   - `VITE_PHONE`
   - `VITE_LOCATION`
   - `VITE_LINKEDIN_URL`
   - `VITE_GITHUB_URL`

### Netlify
1. Go to Site Settings → Build & Deploy → Environment
2. Add the same variables

### Firebase
1. Create `.env.production` file
2. Or set via Firebase Console

## Important Security Notes

⚠️ **DO NOT commit `.env.local` to Git!**

Your `.gitignore` should already include:
```
.env.local
.env.*.local
```

✅ **Safe to commit:** `.env.example` (with dummy values)

Example `.env.example`:
```
VITE_EMAIL=your.email@gmail.com
VITE_PHONE=+1 (234) 567-890
VITE_LOCATION=City, Country
VITE_LINKEDIN_URL=https://linkedin.com/in/yourprofile
VITE_GITHUB_URL=https://github.com/yourusername
```

## Vite Notes

- Variable names must start with `VITE_`
- Access via `import.meta.env.VITE_*`
- Variables are embedded at build time
- Great for configuration across environments

---

For more info: https://vitejs.dev/guide/env-and-modes.html
