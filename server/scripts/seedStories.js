const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const Story = require('../models/Story');
const connectDB = require('../config/db');

dotenv.config();
connectDB();

const stories = [
  {
    communityId: 'gadia-lohar',
    title: 'The Vow of Chittorgarh',
    storyType: 'oral_history',
    content: "Our ancestors were the weapon makers of Maharana Pratap. When the fort of Chittorgarh fell, we took a vow: we would never sleep on a bed, never light a lamp at night, and never live in a settled home until our land was free. Centuries have passed, but the vow remains in our blood.",
    narrator: 'Elder Bhairon Singh',
    recordedBy: 'Dr. Priya Sharma',
    tags: ['history', 'identity']
  },
  {
    communityId: 'van-gujjar',
    title: 'The Buffalo Knows the Way',
    storyType: 'migration',
    content: "We do not need maps. The old buffalo leading the herd remembers the path from her mother. She knows where the water springs are hidden in the high Himalayas. We simply follow her tail.",
    narrator: 'Gulzar Bibi',
    recordedBy: 'Rahul Kumar',
    tags: ['nature', 'migration']
  },
  {
    communityId: 'banjara',
    title: 'Embroidery as a Language',
    storyType: 'craft',
    content: "Every stitch in our Lambani clothes tells a story. The mirror reflects evil eyes away. The cowrie shells represent prosperity. A woman's dress is not just cloth; it is her biography written in thread.",
    narrator: 'Shanti Devi',
    recordedBy: 'Anjali Verma',
    tags: ['craft', 'women']
  }
];

const importData = async () => {
  try {
    await Story.deleteMany();
    await Story.insertMany(stories);
    console.log('Stories Imported!'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

importData();