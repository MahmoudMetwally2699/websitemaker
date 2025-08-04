# Backend Deployment Guide for Vercel

## Prerequisites
- Vercel account
- MongoDB Atlas connection string
- Built project (`npm run build`)

## Deployment Steps

### 1. Build the Project
```bash
npm run build
```

### 2. Deploy to Vercel
```bash
# Install Vercel CLI if not already installed
npm install -g vercel

# Deploy
vercel
```

### 3. Set Environment Variables
In your Vercel dashboard, go to your project settings and add:

**Environment Variables:**
- `MONGODB_URI`: Your MongoDB Atlas connection string
- `NODE_ENV`: `production`

Example:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/websitecreation?retryWrites=true&w=majority
NODE_ENV=production
```

### 4. Update Frontend Environment
After deployment, update your frontend's `.env.local`:
```
NEXT_PUBLIC_API_URL=https://your-backend-url.vercel.app
```

## Configuration Files

### vercel.json
- Configures Vercel deployment
- Routes all requests to the NestJS app
- Sets up Node.js environment

### .vercelignore
- Excludes unnecessary files from deployment
- Keeps deployment size minimal

## Troubleshooting

### Common Issues:
1. **Build Errors**: Ensure `dist/` folder exists after build
2. **Environment Variables**: Check MongoDB connection string in Vercel dashboard
3. **CORS Issues**: Update CORS origin in `main.ts` to include your Vercel URL

### CORS Configuration
Update `src/main.ts` after deployment:
```typescript
app.enableCors({
  origin: [
    'http://localhost:3000',
    'https://your-frontend-url.vercel.app',
    'https://your-backend-url.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
});
```

## Production URL
After deployment, your API will be available at:
```
https://your-project-name.vercel.app
```

API endpoints:
- `POST /sections/generate`
- `GET /sections/:id`
- `GET /sections`
