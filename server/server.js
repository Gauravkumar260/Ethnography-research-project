const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// --- DEBUGGING IMPORTS ---
// This helps us verify all files exist before the server tries to start
const authRoutes = require('./routes/authRoutes');
const researchRoutes = require('./routes/researchRoutes'); 
const communityRoutes = require('./routes/communityRoutes');
// const docRoutes = require('./routes/docRoutes'); // Uncomment if you have this file

const { errorHandler } = require('./middlewares/errorMiddleware');

console.log("------------------------------------------------");
console.log("Auth Routes:      ", authRoutes ? "✅ Loaded" : "❌ FAILED");
console.log("Research Routes:  ", researchRoutes ? "✅ Loaded" : "❌ FAILED");
console.log("Community Routes: ", communityRoutes ? "✅ Loaded" : "❌ FAILED");
// console.log("Doc Routes:       ", docRoutes ? "✅ Loaded" : "❌ FAILED");
console.log("Error Handler:    ", errorHandler ? "✅ Loaded" : "❌ FAILED");
console.log("------------------------------------------------");
// -------------------------

// 1. Config & Database
const startServer = async () => {
  try {
    dotenv.config();
    await connectDB();
const app = express();

// 2. Middlewares
app.use(cors()); // Allow Frontend to communicate
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: false }));

// 3. Static Folder (Crucial for displaying images/PDFs)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 4. Routes
app.use('/api/auth', authRoutes);

// ✅ MASTER RESEARCH ROUTE
// This single route handles: Thesis, Publications, AND Field Data (Interviews, Surveys, etc.)
// Do NOT add a separate '/api/field-data' route.
app.use('/api/research', researchRoutes);

app.use('/api/communities', communityRoutes);

// app.use('/api/docs', docRoutes); // Uncomment if needed

// 5. Base Route
app.get('/', (req, res) => {
  res.json({ message: 'Unheard India API is running...' });
});

// 6. Error Handling
if (errorHandler) {
    app.use(errorHandler);
} else {
    console.log("WARNING: errorHandler is not loaded correctly.".red);
}

// 7. Start Server
 const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`.yellow.bold);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();