# Website Idea Generator

A full-stack application that generates website sections based on user ideas using Next.js 14+ (App Router), NestJS, and MongoDB.

## 🏗️ Project Structure

```
website-idea-generator/
├── frontend/                 # Next.js 14+ with App Router
│   ├── app/
│   │   ├── page.tsx         # Main form page
│   │   ├── preview/[id]/    # Dynamic preview page
│   │   ├── api/             # API routes
│   │   │   ├── generate/    # Generate sections endpoint
│   │   │   └── sections/    # Fetch sections endpoint
│   │   ├── components/      # React components
│   │   └── types/           # TypeScript interfaces
│   └── package.json
└── backend/                 # NestJS API server
    ├── src/
    │   ├── sections/        # Sections module
    │   │   ├── controllers/ # API controllers
    │   │   ├── services/    # Business logic
    │   │   ├── schemas/     # MongoDB schemas
    │   │   └── dto/         # Data transfer objects
    │   └── app.module.ts    # Main app module
    └── package.json
```

## 🚀 Features

- **Form Input**: Simple form to enter website ideas
- **Dynamic Section Generation**: Creates 3 dummy sections (Hero, About, Contact)
- **MongoDB Storage**: Persists data using Mongoose ODM
- **Preview System**: Dynamic routing to preview generated sections
- **Loading States**: Loading spinners and error handling
- **Responsive Design**: Built with Tailwind CSS
- **Type Safety**: Full TypeScript support
- **CORS Configured**: Frontend ↔ Backend communication

## 🛠️ Tech Stack

### Frontend
- **Next.js 14+** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **React Hook Form** for form handling

### Backend
- **NestJS** with TypeScript
- **MongoDB** with Mongoose ODM
- **Class Validator** for input validation
- **CORS** enabled for frontend communication

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- MongoDB (local installation or MongoDB Atlas)

## 🔧 Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd website-idea-generator
```

### 2. Install Frontend Dependencies
```bash
cd frontend
npm install
```

### 3. Install Backend Dependencies
```bash
cd ../backend
npm install
```

### 4. Environment Configuration

#### Backend (.env)
```bash
cd backend
cp .env.example .env
```

Edit `.env`:
```env
MONGODB_URI=mongodb://localhost:27017/website-idea-generator
PORT=3001
```

For MongoDB Atlas:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/website-idea-generator?retryWrites=true&w=majority
```

#### Frontend (.env.local)
```bash
cd ../frontend
```

Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 🚀 Running the Application

### Start MongoDB (if running locally)
```bash
mongod
```

### Start the Backend (Terminal 1)
```bash
cd backend
npm run start:dev
```
Backend will run on: http://localhost:3001

### Start the Frontend (Terminal 2)
```bash
cd frontend
npm run dev
```
Frontend will run on: http://localhost:3000

## 📱 Usage

1. **Open the application**: Navigate to http://localhost:3000
2. **Enter website idea**: Type your idea (e.g., "Landing page for bakery")
3. **Submit form**: Click "Generate Sections"
4. **View results**: See the generated sections and preview them
5. **Preview page**: Click on preview links to see detailed section views

## 🎯 API Endpoints

### Backend (NestJS) - http://localhost:3001

- `POST /sections/generate` - Generate sections from idea
- `GET /sections/:id` - Get sections by ID
- `GET /sections` - Get all sections

### Frontend (Next.js) - http://localhost:3000

- `POST /api/generate` - Proxy to backend generate endpoint
- `GET /api/sections/:id` - Proxy to backend sections endpoint

## 📊 Data Structure

```typescript
interface WebsiteIdea {
  id: string;
  idea: string;
  sections: Section[];
  createdAt: string;
}

interface Section {
  name: string;
  content: string;
  type: 'hero' | 'about' | 'contact';
}
```

## 🔍 MongoDB Collections

### `websiteIdeas`
```javascript
{
  _id: ObjectId,
  idea: String,
  sections: [{
    name: String,
    content: String,
    type: String // 'hero' | 'about' | 'contact'
  }],
  createdAt: Date,
  updatedAt: Date
}
```

## 🏗️ Project Architecture

### Frontend (Next.js App Router)
- **App Router**: Modern Next.js routing system
- **Server Components**: Optimized rendering
- **API Routes**: Built-in API endpoints
- **TypeScript**: Full type safety

### Backend (NestJS)
- **Modular Architecture**: Feature-based modules
- **Dependency Injection**: NestJS DI container
- **MongoDB Integration**: Mongoose ODM
- **Validation**: Class-validator decorators

## 🐛 Development

### Frontend Development
```bash
cd frontend
npm run dev        # Development server
npm run build      # Production build
npm run lint       # Run ESLint
```

### Backend Development
```bash
cd backend
npm run start:dev  # Development with hot reload
npm run build      # Production build
npm run test       # Run tests
```

## 🔧 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check MONGODB_URI in .env file
   - Verify network connectivity for Atlas

2. **CORS Issues**
   - Verify NEXT_PUBLIC_API_URL in frontend .env.local
   - Check backend CORS configuration in main.ts

3. **Port Conflicts**
   - Frontend: 3000, Backend: 3001
   - Change ports in package.json scripts if needed

4. **TypeScript Errors**
   - Run `npm run build` to check for type errors
   - Ensure all dependencies are installed

## 📝 Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Backend
- `npm run start:dev` - Development with hot reload
- `npm run start` - Start production server
- `npm run build` - Build for production
- `npm run test` - Run unit tests

## 🚀 Deployment

### Frontend (Vercel)
1. Push to GitHub
2. Connect Vercel to repository
3. Add environment variables
4. Deploy

### Backend (Railway/Heroku)
1. Add MongoDB Atlas connection string
2. Set environment variables
3. Deploy backend API
4. Update frontend API URL

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review the MongoDB and NestJS documentation
