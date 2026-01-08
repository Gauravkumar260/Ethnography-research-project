# Unheard India - Ethnography Research Platform

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/Gauravkumar260/Ethnography-research-project)

A digital platform documenting the heritage and stories of India's overlooked communities, including the Gadia Lohar nomadic blacksmiths and Bhoksa tribes.

## 📋 Table of Contents
- [About](#about)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Troubleshooting](#troubleshooting)
- [Deployment](#deployment)
- [Contributing](#contributing)

## 🌟 About

Unheard India is an ethnographic research platform designed to preserve and share the rich cultural heritage of marginalized communities across India. The project combines modern web technologies with anthropological research to create an accessible digital archive.

### Key Features
- 📚 Community documentation with rich multimedia content
- 🖼️ Image gallery for cultural artifacts and daily life
- 🔍 Research data management
- 📱 Responsive design for all devices
- 🔐 Secure authentication system

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16.1.1 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI**: React 19

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **File Upload**: Multer
- **Security**: CORS, Helmet

### Tools
- **API Testing**: Postman collections included
- **Version Control**: Git & GitHub

## 📁 Project Structure

```
Ethnography-research-project/
├── client/                 # Next.js frontend application
│   ├── public/            # Static assets (images, icons)
│   ├── src/
│   │   ├── app/          # Next.js App Router pages
│   │   │   ├── page.tsx  # Homepage
│   │   │   └── communities/
│   │   │       └── page.tsx  # Communities listing
│   │   └── lib/          # Utilities and API client
│   │       └── api.ts    # API integration
│   ├── .env.example      # Environment variables template
│   ├── next.config.ts    # Next.js configuration
│   ├── tailwind.config.ts # Tailwind CSS configuration
│   └── package.json      # Client dependencies
│
├── server/                # Express backend application
│   ├── config/           # Database configuration
│   ├── controllers/      # Route handlers (business logic)
│   ├── middlewares/      # Custom middleware (file upload)
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API route definitions
│   ├── scripts/          # Utility scripts
│   ├── uploads/          # File storage directory
│   ├── server.js         # Main entry point
│   ├── .env.example      # Environment variables template
│   └── package.json      # Server dependencies
│
└── README.md             # This file
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18.x or higher
- **npm** or **yarn**
- **MongoDB** (local installation or Atlas account)

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/Gauravkumar260/Ethnography-research-project.git
cd Ethnography-research-project
```

#### 2. Setup Backend (Server)
```bash
cd server
npm install

# Copy environment template
cp .env.example .env

# Edit .env file and add your MongoDB URI
nano .env  # or use your preferred editor

# Start the server
npm start
# Server will run on http://localhost:5000
```

#### 3. Setup Frontend (Client)
Open a new terminal:
```bash
cd client
npm install

# Copy environment template
cp .env.example .env

# Edit .env if needed (default values should work for local development)
nano .env

# Start the development server
npm run dev
# Client will run on http://localhost:3000
```

#### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/ should return `{"message": "Unheard India API is running..."}`

## 🔐 Environment Variables

### Server Configuration (`server/.env`)
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/unheard_india
# For MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/unheard_india

CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

### Client Configuration (`client/.env`)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 📡 API Documentation

The project includes comprehensive Postman collections for API testing:

- **Full Collection**: `server/Unheard-India-API.postman_collection.json`
- **Simplified Collection**: `server/Unheard-India-API-SIMPLE.postman_collection.json`

### Main API Endpoints

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

#### Communities
- `GET /api/communities` - Get all communities
- `POST /api/communities` - Create new community
- `GET /api/communities/:id` - Get community by ID
- `PUT /api/communities/:id` - Update community
- `DELETE /api/communities/:id` - Delete community

#### Research
- `GET /api/research` - Get research data
- `POST /api/research` - Add research data

## 🔧 Troubleshooting

For detailed troubleshooting steps, see `TROUBLESHOOTING.md` (available in Drive folder).

### Common Issues

#### Issue: "Network Error" or "Connection Refused"
**Solution:**
1. Ensure server is running on port 5000
2. Check `NEXT_PUBLIC_API_URL` in `client/.env`
3. Verify CORS settings in `server/server.js`

#### Issue: Images Not Loading
**Solution:**
- Ensure `NEXT_PUBLIC_API_URL` is correctly set
- Check that server is serving static files from `/uploads`

#### Issue: Server Crashes on Start
**Solution:**
- Verify MongoDB is running
- Check `MONGO_URI` in `server/.env`
- Ensure MongoDB connection string is correct

#### Issue: TypeScript Errors
**Solution:**
- Run `npm install` to ensure all dependencies are installed
- Check `tsconfig.json` configuration
- Recent fix applied for Calendar TypeScript errors

## 🌐 Deployment

### Recommended Deployment Stack
- **Frontend**: Vercel or Netlify
- **Backend**: Render or Railway
- **Database**: MongoDB Atlas (Free tier available)

### Quick Deployment Guide

#### 1. MongoDB Atlas Setup
1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free M0 cluster
3. Create database user with password
4. Whitelist IP: `0.0.0.0/0` for cloud deployments
5. Copy connection string

#### 2. Deploy Server (Render)
1. Sign up at [render.com](https://render.com)
2. Create "New Web Service"
3. Connect your GitHub repository
4. Settings:
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `node server.js`
5. Add environment variables:
   - `MONGO_URI`: Your Atlas connection string
   - `CLIENT_URL`: Your Vercel URL (add after step 3)
   - `PORT`: 5000
   - `NODE_ENV`: production

#### 3. Deploy Client (Vercel)
1. Sign up at [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Settings:
   - Root Directory: `client`
   - Framework: Next.js
   - Build Command: `npm run build`
4. Add environment variable:
   - `NEXT_PUBLIC_API_URL`: Your Render URL + `/api`
5. Deploy

#### 4. Update CORS
After client deployment, update `CLIENT_URL` in Render environment variables with your Vercel URL.

### Deployment Checklist
- [ ] MongoDB Atlas cluster created
- [ ] Environment variables configured
- [ ] Server deployed and running
- [ ] Client deployed and accessible
- [ ] CORS configured correctly
- [ ] API endpoints tested
- [ ] File uploads working
- [ ] Database connection verified

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style
- Write clear commit messages
- Add comments for complex logic
- Test your changes locally
- Update documentation as needed

## 📝 License

This project is created for educational and research purposes.

## 👤 Author

**Gaurav Kumar**
- GitHub: [@Gauravkumar260](https://github.com/Gauravkumar260)
- Location: Haridwar, Uttarakhand, India

## 🙏 Acknowledgments

- Communities who shared their stories
- Open source contributors
- Next.js and Express.js communities

---

**Last Updated**: January 2026

For issues or questions, please open an issue on GitHub.
