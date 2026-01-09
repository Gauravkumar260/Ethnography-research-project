const mongoose = require('mongoose');
const Community = require('../models/Community');
require('dotenv').config();

const communities = [
  {
    name: 'Gadia Lohar',
    slug: 'gadia-lohar',
    // ✅ REQUIRED FIELDS ADDED
    state: 'Rajasthan',
    region: 'North India',
    heroImage: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=1080',
    subtitle: 'Iron artisans carrying 500 years of heritage',
    intro: 'The Gadia Lohar are a community of wandering blacksmiths who spend their lives moving from village to village in their signature bullock carts.',
    location: 'Rajasthan, India',
    population: 8000,
    language: 'Marwari, Hindi',
    traditions: ['Nomadic blacksmithing', 'Iron tool crafting', 'Traditional metalwork'],
    description: 'Iron artisans carrying 500 years of heritage amidst instability and strength',
    sections: {
      history: {
        title: 'Origins & Legend',
        content: 'They trace their lineage to the warriors of Maharana Pratap...'
      },
      craft: {
        title: 'The Art of Iron',
        content: 'Using simple tools and mobile furnaces...'
      }
    },
    insights: ['Traditionally nomadic', 'Experts in repairing agricultural tools'],
    galleryImages: [
      'https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=1080',
      'https://images.unsplash.com/photo-1623357247199-b5e97b20acb6?q=80&w=1080'
    ]
  },
  {
    name: 'Bhoksa',
    slug: 'bhoksa',
    // ✅ REQUIRED FIELDS ADDED
    state: 'Uttarakhand',
    region: 'North India',
    heroImage: 'https://images.unsplash.com/photo-1623357247199-b5e97b20acb6?q=80&w=1080',
    subtitle: 'Indigenous people of the Terai',
    intro: 'The Bhoksa tribe resides in the foothills of the Himalayas, maintaining a deep connection to the land and agriculture.',
    location: 'Uttarakhand, India',
    population: 15000,
    language: 'Bhoksa, Hindi',
    traditions: ['Traditional farming', 'Forest conservation', 'Herbal medicine'],
    description: 'A community navigating modern challenges while preserving ancestral wisdom',
    sections: {
      culture: { title: 'Social Structure', content: 'Matriarchal influence is strong in their society...' }
    },
    insights: ['Registered Scheduled Tribe', 'Facing displacement challenges'],
    galleryImages: []
  },
  {
    name: 'Jaunsar',
    slug: 'jaunsar',
    // ✅ REQUIRED FIELDS ADDED
    state: 'Uttarakhand',
    region: 'North India',
    heroImage: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=1080',
    subtitle: 'Keepers of the Pandava legacy',
    intro: 'Inhabitants of the Jaunsar-Bawar region, known for their unique cultural practices distinct from neighboring Garhwal.',
    location: 'Uttarakhand, India',
    population: 120000,
    language: 'Jaunsari, Hindi',
    traditions: ['Polyandry', 'Mountain agriculture', 'Folk music and dance'],
    description: 'Himalayan communities with unique polyandrous traditions and rich folklore',
    sections: {
      festivals: { title: 'Magh Mela', content: 'Their biggest festival involving animal sacrifice and folk dance.' }
    },
    insights: ['Unique polyandrous history', 'Rich folklore tradition'],
    galleryImages: []
  },
  {
    name: 'Banjara',
    slug: 'banjara',
    // ✅ REQUIRED FIELDS ADDED
    state: 'Telangana',
    region: 'South/Central India',
    heroImage: 'https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?q=80&w=1080',
    subtitle: 'The vibrant travelers of India',
    intro: 'Historically the trading community that moved grain and salt across the subcontinent on oxen.',
    location: 'Multiple states across India',
    population: 500000,
    language: 'Lambadi, Hindi',
    traditions: ['Nomadic trading', 'Embroidery', 'Folk songs'],
    description: 'Nomadic traders whose vibrant culture moves with their journeys',
    sections: {
      art: { title: 'Lambani Embroidery', content: 'Famous for their colorful clothes with mirrors and embroidery.' }
    },
    insights: ['Rich oral tradition', 'Distinctive colorful attire'],
    galleryImages: []
  },
  {
    name: 'Van Gujjar',
    slug: 'van-gujjar',
    // ✅ REQUIRED FIELDS ADDED
    state: 'Uttarakhand',
    region: 'North India',
    heroImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1080',
    subtitle: 'Forest dwelling buffalo herders',
    intro: 'A nomadic pastoral community that migrates with their buffalo herds to the alpine pastures in summer.',
    location: 'Uttarakhand, Himachal Pradesh',
    population: 70000,
    language: 'Gujari, Hindi',
    traditions: ['Buffalo herding', 'Forest dwelling', 'Seasonal migration'],
    description: 'Forest dwellers balancing conservation challenges with traditional livelihoods',
    sections: {
      livelihood: { title: 'Milk Economy', content: 'Their economy revolves around buffalo milk...' }
    },
    insights: ['Transhumance migration pattern', 'Experts in forest ecology'],
    galleryImages: []
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    await Community.deleteMany({});
    console.log('Cleared existing communities');
    
    const createdCommunities = await Community.insertMany(communities);
    console.log(`✅ Seeded ${createdCommunities.length} communities successfully`);
    
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seedDatabase();