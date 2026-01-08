# Unheard India - Ethnography Research Platform

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/Gauravkumar260/Ethnography-research-project)
[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.21-green)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-4.22-lightgrey)](https://expressjs.com/)

> A comprehensive digital platform documenting the rich heritage, cultural practices, and untold stories of India's marginalized and overlooked communities, including the Gadia Lohar nomadic blacksmiths and Bhoksa tribes.

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Pages & Routes](#pages--routes)
- [Components](#components)
- [Troubleshooting](#troubleshooting)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

---

## 🌟 About

**Unheard India** is an ethnographic research platform built to preserve, document, and share the rich cultural heritage of India's marginalized communities. The platform leverages modern web technologies to create an accessible, interactive digital archive that brings these communities' stories to life through multimedia content, research data, and community-driven documentation.

### Purpose

The project aims to:
- **Preserve Cultural Heritage**: Document traditional practices, art forms, and oral histories before they disappear
- **Amplify Marginalized Voices**: Provide a platform for communities that have been historically underrepresented  
- **Support Research**: Offer researchers and academics a comprehensive resource for ethnographic studies
- **Educate**: Raise awareness about India's diverse cultural tapestry among students and the general public
- **Foster Community Engagement**: Enable direct participation from community members in documenting their own heritage

---

## ✨ Features

### Core Features
- 📚 **Community Documentation**: Detailed profiles of various communities with rich multimedia content
- 🖼️ **Image Gallery**: High-quality photo galleries showcasing cultural artifacts, daily life, and traditional practices
- 🎥 **Documentary Section**: Curated documentaries and video content about featured communities
- 🔍 **Research Data Management**: Structured storage and retrieval of ethnographic research data
- 📝 **Student Submissions**: Platform for students to submit their fieldwork and research findings
- 📱 **Fully Responsive Design**: Optimized for all devices from mobile to desktop
- 🔐 **Secure Authentication**: User registration and login with JWT-based authentication
- 👥 **Admin Panel**: Comprehensive dashboard for content management and moderation
- 📞 **Contact System**: Direct communication channel for inquiries and collaboration
- 🏷️ **Ethics Guidelines**: Detailed ethical guidelines for research conduct with indigenous communities
- 🌐 **About & Information Pages**: Comprehensive information about the project's mission and goals

### Technical Features
- 🚀 **Server-Side Rendering**: Next.js App Router for optimal performance and SEO
- 💾 **File Upload System**: Multer-based file handling for images and documents
- 🔄 **RESTful API**: Well-structured API endpoints for all CRUD operations  
- 🎨 **Modern UI Components**: Built with Radix UI and Tailwind CSS for beautiful, accessible interfaces
- 🧩 **Component Library**: Extensive library of reusable React components
- 📊 **Data Visualization**: Charts and visualizations using Recharts
- 🗂️ **Database Integration**: MongoDB with Mongoose ODM for data persistence
- 🔒 **Security**: Helmet.js and CORS configuration for enhanced security

---

## 🛠️ Tech Stack

### Frontend

| Technology | Version | Description |
|------------|---------|-------------|
| **Next.js** | 16.1.1 | React framework with App Router for server-side rendering |
| **React** | 19.2.3 | UI library for building interactive interfaces |
| **TypeScript** | 5 | Static typing for improved code quality and developer experience |
| **Tailwind CSS** | 3.4.1 | Utility-first CSS framework for rapid UI development |
| **Radix UI** | Latest | Unstyled, accessible component primitives |
| **Axios** | 1.13.2 | Promise-based HTTP client for API requests |
| **Lucide React** | 0.562.0 | Beautiful, consistent icons |
| **React Hook Form** | 7.69.0 | Performant form handling with validation |
| **Date-fns** | 3.6.0 | Modern date utility library |
| **Recharts** | 3.6.0 | Composable charting library |
| **Sonner** | 2.0.7 | Toast notification system |
| **Next Themes** | 0.4.6 | Dark mode support |
| **Embla Carousel** | 8.6.0 | Lightweight carousel component |

### Backend

| Technology | Version | Description |
|------------|---------|-------------|
| **Node.js** | 18+ | JavaScript runtime |
| **Express.js** | 4.22.1 | Web application framework |
| **MongoDB** | Latest | NoSQL database |
| **Mongoose** | 8.21.0 | MongoDB object modeling tool |
| **Multer** | 2.0.2 | Middleware for handling multipart/form-data (file uploads) |
| **JWT** | 9.0.3 | JSON Web Token for authentication |
| **Bcrypt.js** | 3.0.3 | Password hashing |
| **CORS** | 2.8.5 | Cross-origin resource sharing |
| **Dotenv** | 16.6.1 | Environment variable management |
| **Colors** | 1.4.0 | Console output styling |

### Development Tools

- **ESLint**: Code linting and quality checks
- **PostCSS**: CSS transformations
- **Autoprefixer**: Automatic vendor prefixing
- **Nodemon**: Auto-restart development server
- **Postman**: API testing and documentation
- **Git & GitHub**: Version control and collaboration

---

## 📁 Project Structure

```
Ethnography-research-project/
├── client/                       # Next.js frontend application
│   ├── public/                   # Static assets
│   │   ├── next.svg
│   │   └── vercel.svg
│   ├── src/
│   │   ├── app/                  # Next.js App Router pages
│   │   │   ├── about/            # About page
│   │   │   ├── admin-panel/      # Admin dashboard
│   │   │   ├── communities/      # Communities listing
│   │   │   ├── contact/          # Contact form
│   │   │   ├── documentaries/    # Documentary showcase
│   │   │   ├── ethics-guidelines/# Research ethics
│   │   │   ├── login/            # Authentication page
│   │   │   ├── research/         # Research data page
│   │   │   ├── student-submission/ # Student submissions
│   │   │   ├── favicon.ico       # Site favicon
│   │   │   ├── layout.tsx        # Root layout
│   │   │   └── page.tsx          # Homepage
│   │   ├── components/           # Reusable React components
│   │   │   └── ui/               # UI component library
│   │   ├── lib/                  # Utilities and helpers
│   │   │   └── api.ts            # API client configuration
│   │   └── styles/               # Global styles
│   │       └── globals.css
│   ├── .env.example              # Environment variables template
│   ├── .gitignore                # Git ignore rules
│   ├── eslint.config.mjs         # ESLint configuration
│   ├── next-env.d.ts             # Next.js TypeScript declarations
│   ├── next.config.ts            # Next.js configuration
│   ├── package.json              # Frontend dependencies
│   ├── postcss.config.mjs        # PostCSS configuration
│   ├── README.md                 # Frontend documentation
│   ├── tailwind.config.ts        # Tailwind CSS configuration
│   └── tsconfig.json             # TypeScript configuration
│
├── server/                       # Express backend application
│   ├── config/                   # Configuration files
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/              # Route handlers (business logic)
│   │   ├── authController.js     # Authentication logic
│   │   ├── communityController.js# Community CRUD operations
│   │   └── researchController.js # Research data handling
│   ├── middlewares/              # Custom middleware
│   │   └── upload.js             # File upload configuration
│   ├── models/                   # MongoDB schemas
│   │   ├── User.js               # User model
│   │   ├── Community.js          # Community model
│   │   └── Research.js           # Research model
│   ├── routes/                   # API route definitions
│   │   ├── auth.js               # Auth routes
│   │   ├── communities.js        # Community routes
│   │   └── research.js           # Research routes
│   ├── scripts/                  # Utility scripts
│   │   └── seed.js               # Database seeding
│   ├── uploads/                  # File storage directory
│   │   └── .gitkeep
│   ├── .env.example              # Environment variables template
│   ├── .gitignore                # Git ignore rules
│   ├── package.json              # Backend dependencies
│   ├── server.js                 # Main entry point
│   ├── test.html                 # API test page
│   ├── Unheard-India-API.postman_collection.json        # Full Postman collection
│   └── Unheard-India-API-SIMPLE.postman_collection.json # Simplified Postman collection
│
├── .gitignore                    # Root git ignore
└── README.md                     # This file
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v18.x or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** - Package manager
- **MongoDB** - Database
  - Option 1: [MongoDB Community Server](https://www.mongodb.com/try/download/community) (local installation)
  - Option 2: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (cloud database - recommended for deployment)
- **Git** - Version control system

### Installation

Follow these steps to set up the project locally:

#### 1. Clone the Repository

```bash
git clone https://github.com/Gauravkumar260/Ethnography-research-project.git
cd Ethnography-research-project
```

#### 2. Setup Backend (Server)

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your configuration
nano .env  # or use your preferred editor

# Add your MongoDB URI in .env:
# For local MongoDB:
# MONGO_URI=mongodb://localhost:27017/unheard_india
# 
# For MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/unheard_india
```

**Server Environment Variables (.env)**:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/unheard_india
CLIENT_URL=http://localhost:3000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_here
```

#### 3. Setup Frontend (Client)

Open a new terminal window:

```bash
# Navigate to client directory (from project root)
cd client

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env if needed
nano .env
```

**Client Environment Variables (.env)**:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Running the Application

#### Development Mode

1. **Start the Backend Server** (Terminal 1):
   ```bash
   cd server
   npm start
   # or for auto-reload during development:
   npm run dev
   ```
   Server will be running at `http://localhost:5000`

2. **Start the Frontend** (Terminal 2):
   ```bash
   cd client
   npm run dev
   ```
   Frontend will be running at `http://localhost:3000`

3. **Access the Application**:
   - **Frontend**: [http://localhost:3000](http://localhost:3000)
   - **Backend API**: [http://localhost:5000](http://localhost:5000)
   - **API Health Check**: [http://localhost:5000/](http://localhost:5000) (should return: `{"message": "Unheard India API is running..."}`)

#### Production Mode

1. **Build the Frontend**:
   ```bash
   cd client
   npm run build
   npm start
   ```

2. **Run the Backend**:
   ```bash
   cd server
   NODE_ENV=production npm start
   ```

---

## 🔐 Environment Variables

### Server Configuration (`server/.env`)

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port number | `5000` | Yes |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/unheard_india` | Yes |
| `CLIENT_URL` | Frontend URL (for CORS) | `http://localhost:3000` | Yes |
| `NODE_ENV` | Environment mode | `development` or `production` | Yes |
| `JWT_SECRET` | Secret key for JWT tokens | `your_secret_key` | Yes |

### Client Configuration (`client/.env`)

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:5000/api` | Yes |

**Note**: All environment variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Never put sensitive credentials in these variables.

---

## 📡 API Documentation

The project includes comprehensive Postman collections for testing all API endpoints:

### Postman Collections

- **Full Collection**: `server/Unheard-India-API.postman_collection.json` - Complete API with all endpoints and examples
- **Simplified Collection**: `server/Unheard-India-API-SIMPLE.postman_collection.json` - Basic endpoints for quick testing

### Main API Endpoints

#### Base URL
```
http://localhost:5000/api
```

#### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new user | No |
| POST | `/auth/login` | User login | No |
| GET | `/auth/me` | Get current user info | Yes |
| PUT | `/auth/update` | Update user profile | Yes |

**Request Body (Register/Login)**:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe" // only for register
}
```

#### Community Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/communities` | Get all communities | No |
| GET | `/communities/:id` | Get community by ID | No |
| POST | `/communities` | Create new community | Yes (Admin) |
| PUT | `/communities/:id` | Update community | Yes (Admin) |
| DELETE | `/communities/:id` | Delete community | Yes (Admin) |
| POST | `/communities/:id/images` | Upload community images | Yes (Admin) |

**Community Schema**:
```json
{
  "name": "Community Name",
  "description": "Detailed description",
  "location": "Geographic location",
  "population": 5000,
  "language": "Primary language",
  "traditions": ["tradition1", "tradition2"],
  "images": ["image1.jpg", "image2.jpg"],
  "documentaries": [{
    "title": "Documentary Title",
    "url": "https://youtube.com/...",
    "description": "Documentary description"
  }]
}
```

#### Research Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/research` | Get all research data | No |
| GET | `/research/:id` | Get research by ID | No |
| POST | `/research` | Submit research data | Yes |
| PUT | `/research/:id` | Update research data | Yes |
| DELETE | `/research/:id` | Delete research data | Yes (Admin) |

**Research Schema**:
```json
{
  "title": "Research Title",
  "researcher": "Researcher Name",
  "community": "community_id",
  "fieldworkDates": {
    "start": "2025-01-01",
    "end": "2025-01-31"
  },
  "methodology": "Research methodology",
  "findings": "Key findings",
  "documents": ["doc1.pdf", "doc2.pdf"],
  "status": "draft" // or "published"
}
```

---

## 🏛️ Pages & Routes

### Frontend Routes

| Route | Page | Description | Auth Required |
|-------|------|-------------|---------------|
| `/` | Homepage | Landing page with project overview | No |
| `/about` | About | Project mission, goals, and team information | No |
| `/communities` | Communities | Browse all documented communities | No |
| `/communities/[id]` | Community Detail | Detailed view of specific community | No |
| `/documentaries` | Documentaries | Video content and documentaries | No |
| `/research` | Research | Browse research data and findings | No |
| `/research/[id]` | Research Detail | Detailed research paper view | No |
| `/student-submission` | Student Form | Submit student research work | No |
| `/contact` | Contact | Contact form for inquiries | No |
| `/ethics-guidelines` | Ethics | Research ethics guidelines | No |
| `/login` | Login/Register | User authentication | No |
| `/admin-panel` | Admin Dashboard | Content management (CRUD operations) | Yes (Admin) |

---

## 🧩 Components

The project uses a comprehensive component library built with **Radix UI** and **Tailwind CSS**:

### UI Components (`client/src/components/ui/`)

- **accordion**: Collapsible content sections
- **alert**: Notification and alert messages  
- **avatar**: User profile pictures
- **button**: Interactive buttons with variants
- **card**: Content containers
- **carousel**: Image/content carousels
- **checkbox**: Form checkboxes
- **dialog**: Modal dialogs
- **dropdown-menu**: Dropdown navigation menus
- **form**: Form components with React Hook Form
- **input**: Text input fields
- **label**: Form field labels
- **navigation-menu**: Site navigation
- **popover**: Floating content panels
- **progress**: Progress indicators
- **radio-group**: Radio button groups
- **scroll-area**: Scrollable containers
- **select**: Dropdown select inputs
- **separator**: Visual dividers
- **tabs**: Tabbed interfaces
- **textarea**: Multi-line text inputs
- **toast**: Toast notifications (Sonner)
- **tooltip**: Contextual tooltips

All components are fully typed with TypeScript and follow accessibility best practices.

---

## 🔧 Troubleshooting

### Common Issues and Solutions

#### 1. Network Error or Connection Refused

**Symptoms**: Frontend cannot connect to backend

**Solutions**:
- Ensure the backend server is running on port 5000
- Check `NEXT_PUBLIC_API_URL` in `client/.env` matches your backend URL
- Verify CORS settings in `server/server.js` include your frontend URL
- Check if any firewall is blocking the connection

```bash
# Test backend is running
curl http://localhost:5000/
```

#### 2. MongoDB Connection Failed

**Symptoms**: Server crashes on start with MongoDB error

**Solutions**:
- Verify MongoDB is running: `sudo systemctl status mongod` (Linux) or check MongoDB Compass
- Check `MONGO_URI` in `server/.env` is correct
- For MongoDB Atlas:
  - Verify your IP is whitelisted
  - Check username/password are correct
  - Ensure cluster is running
- Test connection:
  ```bash
  # For local MongoDB
  mongosh mongodb://localhost:27017/unheard_india
  ```

#### 3. Images Not Loading

**Symptoms**: Uploaded images don't display

**Solutions**:
- Ensure `NEXT_PUBLIC_API_URL` is correctly set
- Check server is serving static files from `/uploads` directory
- Verify file permissions on `server/uploads/` directory
- Check browser console for CORS errors

#### 4. TypeScript Errors

**Symptoms**: Type errors during development or build

**Solutions**:
- Run `npm install` to ensure all dependencies are installed
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check `tsconfig.json` configuration
- Clear Next.js cache: `rm -rf .next`
- Recent fix applied for Calendar TypeScript errors (already resolved)

#### 5. Port Already in Use

**Symptoms**: Error: "Port 3000/5000 is already in use"

**Solutions**:
- Find and kill the process:
  ```bash
  # Linux/Mac
  lsof -ti:3000 | xargs kill
  lsof -ti:5000 | xargs kill
  
  # Windows
  netstat -ano | findstr:3000
  taskkill /PID <PID> /F
  ```
- Or use different ports in environment variables

#### 6. File Upload Fails

**Symptoms**: File upload returns error

**Solutions**:
- Check file size limits in `server/middlewares/upload.js`
- Verify `server/uploads/` directory exists and has write permissions
- Check disk space on server
- Review file type restrictions

---

## 🌐 Deployment

### Recommended Deployment Stack

- **Frontend**: [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/)
- **Backend**: [Render](https://render.com/) or [Railway](https://railway.app/)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Free M0 tier available)
- **File Storage**: Consider cloud storage (AWS S3, Cloudinary) for production

### Quick Deployment Guide

#### 1. MongoDB Atlas Setup

1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free M0 cluster (512MB storage, shared RAM)
3. Database Access:
   - Create database user with password
   - Save credentials securely
4. Network Access:
   - Add IP: `0.0.0.0/0` (allow access from anywhere)
   - For production, specify your backend server IP
5. Get connection string:
   - Click "Connect" > "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

#### 2. Deploy Backend (Render)

1. Sign up at [render.com](https://render.com/)
2. Create "New Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `unheard-india-api`
   - **Root Directory**: `server`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: Free

5. Environment Variables (Add in Render dashboard):
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/unheard_india
   CLIENT_URL=https://your-frontend-url.vercel.app
   PORT=5000
   NODE_ENV=production
   JWT_SECRET=your_production_jwt_secret
   ```

6. Deploy and note your backend URL (e.g., `https://unheard-india-api.onrender.com`)

#### 3. Deploy Frontend (Vercel)

1. Sign up at [vercel.com](https://vercel.com/)
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

4. Environment Variables:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com/api
   ```

5. Deploy

#### 4. Update CORS

After frontend deployment:
1. Go to Render dashboard
2. Update `CLIENT_URL` environment variable with your Vercel URL
3. Restart the backend service

### Deployment Checklist

- [ ] MongoDB Atlas cluster created and configured
- [ ] Database user created with strong password
- [ ] Network access configured (IP whitelist)
- [ ] Backend deployed on Render/Railway
- [ ] Backend environment variables configured
- [ ] Frontend deployed on Vercel/Netlify
- [ ] Frontend environment variables configured
- [ ] CORS updated with production URLs
- [ ] API endpoints tested (use Postman)
- [ ] File uploads working
- [ ] Authentication flow tested
- [ ] Database connection verified
- [ ] SSL/HTTPS enabled (automatic on Vercel/Render)

### Performance Optimization

1. **Frontend**:
   - Enable Next.js image optimization
   - Implement lazy loading for images
   - Use dynamic imports for large components
   - Enable gzip compression

2. **Backend**:
   - Add database indexing for frequently queried fields
   - Implement caching (Redis) for expensive queries
   - Use CDN for static file serving
   - Compress API responses

3. **Database**:
   - Create indexes on query fields
   - Implement pagination for large datasets
   - Use projections to limit returned fields
   - Monitor query performance

---

## 🤝 Contributing

Contributions are welcome and appreciated! Whether it's bug reports, feature requests, documentation improvements, or code contributions.

### How to Contribute

1. **Fork the Repository**
   ```bash
   # Click the Fork button on GitHub
   # Clone your fork
   git clone https://github.com/YOUR_USERNAME/Ethnography-research-project.git
   cd Ethnography-research-project
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   # or for bug fixes
   git checkout -b fix/bug-description
   ```

3. **Make Your Changes**
   - Write clean, documented code
   - Follow existing code style
   - Add comments for complex logic
   - Update documentation if needed

4. **Test Your Changes**
   ```bash
   # Run the application locally
   # Test all affected features
   # Ensure no regressions
   ```

5. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   # Use conventional commit messages:
   # feat: new feature
   # fix: bug fix
   # docs: documentation
   # style: formatting
   # refactor: code restructuring
   # test: adding tests
   # chore: maintenance
   ```

6. **Push to Your Fork**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Open a Pull Request**
   - Go to the original repository on GitHub
   - Click "New Pull Request"
   - Select your branch
   - Provide clear description of changes
   - Link any related issues

### Development Guidelines

- **Code Style**:
  - Use TypeScript for new frontend code
  - Follow ESLint configuration
  - Use meaningful variable and function names
  - Keep functions small and focused

- **Commit Messages**:
  - Use conventional commits format
  - Write clear, descriptive messages
  - Reference issue numbers when applicable

- **Documentation**:
  - Update README for new features
  - Add JSDoc comments for functions
  - Document API changes
  - Include examples where helpful

- **Testing**:
  - Test all new features thoroughly
  - Check responsive design
  - Verify API endpoints
  - Test edge cases

### Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help newcomers learn
- Credit others' work

### Areas for Contribution

- **Features**: New functionality, UI improvements
- **Bug Fixes**: Resolve existing issues
- **Documentation**: Improve guides, add tutorials
- **Testing**: Add test coverage
- **Performance**: Optimize code, queries
- **Accessibility**: Improve ARIA labels, keyboard navigation
- **Internationalization**: Add multi-language support
- **Security**: Identify and fix vulnerabilities

---

## 📝 License

This project is created for **educational and research purposes**. 

### Usage Terms

- Free to use for academic research
- Free to use for educational purposes
- Attribution required when using or adapting code
- Commercial use requires permission

For specific licensing questions, please contact the author.

---

## 👤 Author

**Gaurav Kumar**

- **GitHub**: [@Gauravkumar260](https://github.com/Gauravkumar260)
- **Location**: Haridwar, Uttarakhand, India
- **Project**: Ethnography Research Documentation Platform
- **Role**: Full-Stack Developer & Researcher

### About the Developer

This project was developed as part of ethnographic research to document and preserve the cultural heritage of India's marginalized communities. The platform combines technical expertise with anthropological research to create a meaningful digital archive.

---

##  Acknowledgments

Special thanks to:

- **Communities**: The Gadia Lohar, Bhoksa, and other indigenous communities who shared their stories and trusted us with their cultural heritage
- **Research Advisors**: Academic mentors who guided the ethnographic research methodology
- **Open Source Community**: Developers and contributors of the amazing tools and libraries used in this project
  - [Next.js Team](https://nextjs.org/) - For the incredible React framework
  - [Vercel](https://vercel.com/) - For hosting and deployment tools
  - [MongoDB](https://www.mongodb.com/) - For the flexible database solution
  - [Radix UI](https://www.radix-ui.com/) - For accessible component primitives
  - [Tailwind CSS](https://tailwindcss.com/) - For the utility-first CSS framework
  - [Shadcn/ui](https://ui.shadcn.com/) - For beautiful component designs
- **Beta Testers**: Students and researchers who provided valuable feedback
- **Documentation Inspiration**: Open source projects with excellent documentation

---

## 📌 Quick Links

- **Live Demo**: [Coming Soon]
- **Documentation**: This README
- **Issues**: [GitHub Issues](https://github.com/Gauravkumar260/Ethnography-research-project/issues)
- **Pull Requests**: [GitHub PRs](https://github.com/Gauravkumar260/Ethnography-research-project/pulls)
- **Project Board**: [GitHub Projects](https://github.com/Gauravkumar260/Ethnography-research-project/projects)

---

## 📈 Project Statistics

- **Languages**: TypeScript (81.6%), JavaScript (16.6%), CSS (1.5%), HTML (0.3%)
- **Deployments**: 10+ successful deployments
- **Status**: Active Development
- **Version**: 1.0.0
- **Last Updated**: January 2026

---

## 🚀 Future Roadmap

- [ ] Multi-language support (Hindi, regional languages)
- [ ] Advanced search and filtering
- [ ] Interactive maps showing community locations
- [ ] Video testimonials from community members
- [ ] Mobile app (React Native)
- [ ] Offline mode for field researchers
- [ ] Data export functionality (PDF, CSV)
- [ ] Social media integration
- [ ] Community forums
- [ ] Advanced analytics dashboard

---

<div align="center">

### ⭐ If you find this project valuable, please consider giving it a star!

**Made with ❤️ for preserving cultural heritage**

**Last Updated**: January 2026

For issues, questions, or collaboration inquiries, please [open an issue](https://github.com/Gauravkumar260/Ethnography-research-project/issues) on GitHub.

---

© 2026 Gaurav Kumar. All rights reserved.

</div>
