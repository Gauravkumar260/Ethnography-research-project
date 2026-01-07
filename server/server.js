const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// --- DEBUGGING IMPORTS ---
// We try to require them here to see which one is undefined
const authRoutes = require('./routes/authRoutes');
const researchRoutes = require('./routes/researchRoutes');
const docRoutes = require('./routes/docRoutes');
const communityRoutes = require('./routes/communityRoutes');
const { errorHandler } = require('./middlewares/errorMiddleware');

console.log("Auth Routes:", authRoutes ? "Loaded" : "FAILED (Undefined)");
console.log("Research Routes:", researchRoutes ? "Loaded" : "FAILED (Undefined)");
console.log("Doc Routes:", docRoutes ? "Loaded" : "FAILED (Undefined)");
console.log("Community Routes:", communityRoutes ? "Loaded" : "FAILED (Undefined)");
console.log("Error Handler:", errorHandler ? "Loaded" : "FAILED (Undefined)");
// -------------------------

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static Folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
// Note: We use the variables we imported above to ensure they are valid
app.use('/api/auth', authRoutes);
app.use('/api/research', researchRoutes);
app.use('/api/docs', docRoutes);
app.use('/api/communities', communityRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Unheard India API is running...' });
});

// Fix: Ensure errorHandler is actually a function before using it
if (errorHandler) {
    app.use(errorHandler);
} else {
    console.log("WARNING: errorHandler is not loaded correctly. Check errorMiddleware.js".red);
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.yellow.bold);
});