const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Research = require('../models/Research');
const connectDB = require('../config/db');

dotenv.config();
connectDB();

const sampleData = [
  {
    studentName: "Rahul Verma",
    email: "rahul@uni.edu",
    title: "Oral History: Migration Tales",
    abstract: "Recorded interviews with 15 Gadia Lohar elders regarding their migration routes during the 1990s.",
    community: "Gadia Lohar",
    type: "interview",
    status: "approved",
    fileUrl: "uploads/sample-audio.mp3",
    datasetSize: "145 MB",
    batch: "2023"
  },
  {
    studentName: "Priya Singh",
    email: "priya@uni.edu",
    title: "Van Gujjar Settlement Survey",
    abstract: "Socio-economic survey data covering 50 households in the Shivalik range.",
    community: "Van Gujjar",
    type: "survey",
    status: "approved",
    fileUrl: "uploads/survey-data.csv",
    datasetSize: "4.2 MB",
    batch: "2024"
  },
  {
    studentName: "Amit Kumar",
    email: "amit@uni.edu",
    title: "Craftsmanship in High Res",
    abstract: "Photo documentation of the traditional tool-making process.",
    community: "Bhoksa",
    type: "photo",
    status: "approved",
    fileUrl: "uploads/photos.zip",
    datasetSize: "1.2 GB",
    batch: "2023"
  }
];

const importData = async () => {
  try {
    // Clear existing data to avoid duplicates (optional)
    // await Research.deleteMany(); 
    
    await Research.create(sampleData);
    console.log('Field Data Imported!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();